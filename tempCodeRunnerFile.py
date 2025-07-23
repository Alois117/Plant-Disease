from flask import Flask, request, jsonify
import os
import numpy as np
import cv2
import requests
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import logging
from werkzeug.utils import secure_filename
from datetime import datetime

# Disable unnecessary logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
logging.getLogger('tensorflow').setLevel(logging.ERROR)

# Constants
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model and labels
model = load_model("plant_disease_model.h5")
CATEGORIES = sorted(os.listdir("PlantVillage"))  # Must match training classes

# Plant.id API Configuration
PLANT_ID_API_URL = "https://plant.id/api/v3/identification"
PLANT_ID_API_KEY = "9WLQDQZKwzMYAwo3HU0fxFKwi5TwxdIxNTMRcuzExnmEQ2vcg4"  # Replace with your actual key

# Confidence threshold for overriding predictions
CONFIDENCE_THRESHOLD = 75.0  # Minimum confidence percentage to trust a prediction

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

# Local treatment database (fallback)
TREATMENTS = {
    "Pepper__bell___Bacterial_spot": {
        "scientific_name": "Xanthomonas campestris pv. vesicatoria",
        "organic": "Apply copper-based bactericides weekly. Remove infected leaves.",
        "chemical": "Streptomycin sulfate sprays",
        "prevention": "Use disease-free seeds and rotate crops every 2 years",
        "sources": ["PlantVillage Dataset", "Cornell Cooperative Extension"]
    },
    "Tomato_Early_Blight": {
        "scientific_name": "Alternaria solani",
        "organic": "Copper fungicides + neem oil applications",
        "chemical": "Chlorothalonil or mancozeb fungicides",
        "prevention": "Avoid overhead watering, stake plants for air circulation",
        "sources": ["PlantVillage API", "University of Minnesota Extension"]
    },
    "default": {
        "organic": "Remove infected plant parts. Improve air circulation.",
        "chemical": "Consult local agricultural extension",
        "prevention": "Sanitize tools between plants"
    }
}

def preprocess_image(image_path):
    """Resize and normalize image for model prediction."""
    img = cv2.imread(image_path)
    img = cv2.resize(img, (64, 64))  # Must match training input size
    img = img.astype('float32') / 255.0
    img = img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img

def predict_disease(image_path):
    """Predict disease using Keras model."""
    img = preprocess_image(image_path)
    prediction = model.predict(img)
    index = np.argmax(prediction)
    label = CATEGORIES[index]
    confidence = round(float(np.max(prediction)) * 100, 2)
    print(f"\n[Model] Prediction: {label} ({confidence}%)")
    return label, confidence

def get_plant_id_prediction(image_path):
    """Get prediction from Plant.id API"""
    try:
        with open(image_path, 'rb') as img_file:
            response = requests.post(
                PLANT_ID_API_URL,
                files=[
                    ('images', (os.path.basename(image_path), img_file.read())),
                    ('health', (None, 'all')),
                    ('similar_images', (None, 'true'))
                ],
                headers={'Api-Key': PLANT_ID_API_KEY},
                timeout=20
            )

        if response.status_code in [200, 201]:  # Accept 200 and 201
            return response.json()
        else:
            print(f"API Error {response.status_code}: {response.text}")
            return None
            
    except Exception as e:
        print(f"API Call Failed: {str(e)}")
        return None

def get_treatment_from_plantid(access_token):
    """Get detailed treatment information from Plant.id API."""
    try:
        details_url = f"{PLANT_ID_API_URL}/{access_token}?details=local_name,description,treatment"
        response = requests.get(
            details_url, 
            headers={"Api-Key": PLANT_ID_API_KEY},
            timeout=10
        )
        
        if response.status_code == 200:
            details = response.json()
            if 'result' in details and 'disease' in details['result']:
                disease = details['result']['disease']
                treatment = disease.get('treatment', {})
                return {
                    "organic_treatment": treatment.get('organic', ['Not specified'])[0],
                    "chemical_treatment": treatment.get('chemical', ['Not specified'])[0],
                    "prevention": treatment.get('prevention', ['Not specified'])[0],
                    "sources": ["Plant.id API"]
                }
    except Exception as e:
        print(f"[Plant.id Details] Error: {str(e)}")
    
    return None

def get_treatment(disease_key):
    """Get treatment from local database with enhanced info."""
    disease_key = disease_key.strip()
    treatment = TREATMENTS.get(disease_key, TREATMENTS["default"])
    
    # Format disease name for display
    display_name = disease_key.replace("__", " ").replace("_", " ").title()
    
    return {
        "disease_name": display_name,
        "scientific_name": treatment.get("scientific_name", "Unknown"),
        "organic_treatment": treatment["organic"],
        "chemical_treatment": treatment.get("chemical", ""),
        "prevention": treatment["prevention"],
        "sources": treatment.get("sources", [])
    }

def determine_best_prediction(your_pred, your_conf, plantid_pred, plantid_conf):
    """
    Determine the best prediction based on confidence levels.
    
    Args:
        your_pred: Your model's prediction
        your_conf: Your model's confidence (percentage)
        plantid_pred: Plant.id API's prediction
        plantid_conf: Plant.id API's confidence (percentage)
        
    Returns:
        tuple: (selected_prediction, selected_confidence, source)
    """
    # If either prediction is missing, return the available one
    if not plantid_pred:
        return your_pred, your_conf, "your_model"
    if not your_pred:
        return plantid_pred, plantid_conf, "plantid_api"
    
    # If one prediction is above threshold and the other isn't, choose the confident one
    if your_conf >= CONFIDENCE_THRESHOLD and plantid_conf < CONFIDENCE_THRESHOLD:
        return your_pred, your_conf, "your_model"
    if plantid_conf >= CONFIDENCE_THRESHOLD and your_conf < CONFIDENCE_THRESHOLD:
        return plantid_pred, plantid_conf, "plantid_api"
    
    # If both are above threshold, choose the higher confidence
    if your_conf >= CONFIDENCE_THRESHOLD and plantid_conf >= CONFIDENCE_THRESHOLD:
        if your_conf >= plantid_conf:
            return your_pred, your_conf, "your_model"
        else:
            return plantid_pred, plantid_conf, "plantid_api"
    
    # If neither meets the threshold, return your model's prediction as fallback
    return your_pred, your_conf, "your_model_fallback"

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # Secure filename and save
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    try:
        # Step 1: Get your model's prediction
        your_label, your_confidence = predict_disease(file_path)
        
        # Step 2: Get Plant.id API prediction
        plantid_response = get_plant_id_prediction(file_path)
        
        # Initialize variables for Plant.id data
        plantid_disease_name = None
        plantid_disease_confidence = 0.0
        plantid_plant_name = None
        plantid_plant_confidence = 0.0
        
        # Extract Plant.id predictions if available
        if plantid_response and 'result' in plantid_response:
            result = plantid_response['result']
            
            # Plant classification
            if 'classification' in result and result['classification']['suggestions']:
                plant_suggestion = result['classification']['suggestions'][0]
                plantid_plant_name = plant_suggestion['name']
                plantid_plant_confidence = round(plant_suggestion['probability'] * 100, 2)
            
            # Disease detection
            if 'disease' in result and result['disease']['suggestions']:
                disease_suggestion = result['disease']['suggestions'][0]
                plantid_disease_name = disease_suggestion['name']
                plantid_disease_confidence = round(disease_suggestion['probability'] * 100, 2)
        
        # Determine the best prediction
        best_disease, best_confidence, source = determine_best_prediction(
            your_label, your_confidence,
            plantid_disease_name, plantid_disease_confidence
        )
        
        # Get treatment information
        if source.startswith("plantid"):
            treatment = get_treatment_from_plantid(plantid_response['access_token']) or get_treatment(best_disease)
        else:
            treatment = get_treatment(best_disease)
        
        # Prepare response
        response = {
            "timestamp": datetime.now().isoformat(),
            "final_prediction": best_disease,
            "final_confidence": f"{best_confidence}%",
            "prediction_source": source,
            "your_prediction": your_label,
            "your_confidence": f"{your_confidence}%",
            "plantid_prediction": plantid_disease_name,
            "plantid_confidence": f"{plantid_disease_confidence}%" if plantid_disease_name else "N/A",
            "plant_name": plantid_plant_name or "Unknown",
            "plant_confidence": f"{plantid_plant_confidence}%" if plantid_plant_name else "N/A",
            "api_used": "Plant.id API v3",
            "status": "success",
            **treatment
        }
        
        # Add warnings if needed
        if not plantid_response:
            response["warning"] = "Plant.id API unavailable - using model prediction"
        elif source == "your_model_fallback":
            response["warning"] = f"Neither prediction met confidence threshold ({CONFIDENCE_THRESHOLD}%) - using model prediction"
        
        return jsonify(response), 200

    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "An error occurred during processing",
            "status": "error",
            "timestamp": datetime.now().isoformat()
        }), 500
        
    finally:
        # Clean up uploaded file
        if os.path.exists(file_path):
            os.remove(file_path)

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({
        "status": "active",
        "service": "Plant Disease Detection API",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": bool(model),
        "plantid_api_configured": bool(PLANT_ID_API_KEY != "9WLQDQZKwzMYAwo3HU0fxFKwi5TwxdIxNTMRcuzExnmEQ2vcg4"),
        "confidence_threshold": f"{CONFIDENCE_THRESHOLD}%"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)