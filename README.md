# 🌿 AgriCare AI – Smart Plant Health Diagnosis Platform

🚀 Live Site: [https://agricareai.vercel.app](https://agricareai.vercel.app)  
🔧 Backend API: [https://agricare-backend-ciht.onrender.com](https://agricare-backend-ciht.onrender.com)  
📦 Backend Repository: [GitHub - agricare-backend](https://github.com/Alois117/agricare-backend)

---

## 📖 Overview

**AgriCare AI** is a smart and user-friendly plant health diagnosis system that empowers farmers and agricultural enthusiasts to detect plant diseases in real-time by simply uploading a photo of the affected plant leaf. It combines the power of Artificial Intelligence (AI), a modern web interface, and cloud deployment to deliver intelligent agricultural support.

---

## 🎯 Purpose & Importance

Farming communities, especially in rural or underserved regions, often struggle with delayed diagnosis of plant diseases, leading to major crop losses. **AgriCare AI** addresses this issue by:
- Providing **fast, AI-powered diagnosis** with suggested treatments.
- Reducing dependence on physical consultations.
- Offering **accessible, web-based support** using smartphones or laptops.
- Contributing to **food security** through informed crop protection.

---

## ⚙️ System Architecture

The system is divided into two main components:

### 🔵 Frontend: `agricare-frontend`
- **Framework:** React with TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **Features:**
  - Image upload interface for farmers
  - Instant feedback on plant health
  - Clean, mobile-friendly UI
  - Result section with prediction, confidence, suggested treatment, and source

> **Hosted on Vercel:**  
> [https://agricareai.vercel.app](https://agricareai.vercel.app)

---

### 🟢 Backend: `agricare-backend`
- **Framework:** Flask (Python)
- **Model Training:** TensorFlow (Keras)
- **Dataset:** [PlantVillage Dataset](https://www.kaggle.com/datasets)
- **Key Technologies:**
  - Preprocessing with OpenCV and NumPy
  - Trained a Convolutional Neural Network (CNN)
  - Deployed a lightweight `.h5` model
  - Image analysis also integrates the [Plant.id API](https://web.plant.id/plant-identification-api/) as a secondary opinion
  - Confidence threshold logic to compare results and choose best diagnosis

> **Hosted on Render:**  
> [https://agricare-backend-ciht.onrender.com](https://agricare-backend-ciht.onrender.com)  
> **Repository:**  
> [https://github.com/Alois117/agricare-backend](https://github.com/Alois117/agricare-backend)

---

### 💡 Why Backend Was Pushed Separately

We decided to host the backend in a **separate GitHub repository** to maintain:
- **Clear project separation:** Frontend (React) vs Backend (Flask/Python)
- **Modularity and scalability:** Easier maintenance and updates
- **Independent deployment pipelines:** Frontend on Vercel, Backend on Render
- **Security and testing workflows:** Better control over API secrets, requirements, and model files

---

## 🧠 AI & Model Training Details

- **Framework:** TensorFlow with Keras
- **Model:** CNN trained on preprocessed PlantVillage images
- **Accuracy:** ~96% on test data
- **Classes:** 15 disease categories across different crops
- **Optimization:** Applied image augmentation, dropout, and tuning
- **Model Exported As:** `model.h5` used in Flask API

---

## 🧪 Key Features

- 📷 **Plant Image Upload**
- 🔍 **AI-Based Disease Detection**
- 📊 **Confidence Scoring**
- 💊 **Suggested Treatment & Prevention**
- 🌍 **Hybrid Prediction (Custom Model + Plant.id API)**
- 🔄 **Live Feedback Without Reload**
- 🌱 **Farmer-friendly UX Design**

---

## 🛠 Future Improvements

Here’s what’s planned to enhance the platform:

- 🔁 **Real-time chat support** for agronomist consultation
- 🔐 **User accounts** to save diagnosis history
- 🌦️ **Weather-based disease prediction integration**
- 📱 **Mobile app version (Flutter/React Native)**
- 📚 **Knowledge center** for prevention, symptoms, and care
- 🧠 **Model optimization for Edge AI** (Raspberry Pi or mobile inference)
- 📈 **Admin dashboard** to analyze common regional diseases

---

## 🧾 How to Contribute

1. Clone the frontend or backend repository
2. Setup locally with instructions from each `README.md`
3. Submit pull requests for:
   - UI improvement
   - Model refinement
   - Feature expansion

---

## 👨‍💻 Developer

**Alois Mbithi**  
Computer Science Graduate | AI & Full Stack Developer  
📧 Email: [aloismbithi01@gmail.com]  
🌐 GitHub: [https://github.com/Alois117](https://github.com/Alois117)

---

## 📜 License

MIT License – Feel free to use, modify, and distribute with attribution.

---

> _"Empowering Farmers. One Leaf at a Time."_ 🌾
