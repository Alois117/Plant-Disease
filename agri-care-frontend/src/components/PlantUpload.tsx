// src/components/PlantUpload.tsx

import { useState } from "react";
import { FaCamera, FaUpload, FaTimes, FaLeaf } from "react-icons/fa";

function PlantUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      // reset results
      setResult(null); 
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  const handleScan = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to connect to server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 border border-green-100">
      <h2 className="text-2xl font-semibold text-green-800 text-center">
        🌱 Let’s check your plant health
      </h2>

      {/* Image preview */}
      {preview && (
        <div className="w-60 h-40 mx-auto aspect-square rounded-lg overflow-hidden border border-green-300">
          <img
            src={preview}
            alt="Plant preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        {!preview ? (
          <>
            <label className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl flex items-center justify-center transition duration-200">
              <FaUpload className="mr-2" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <button
              type="button"
              className="flex-1 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-xl flex items-center justify-center transition duration-200"
              onClick={() => alert("📷 Camera capture coming soon!")}
            >
              <FaCamera className="mr-2" />
              Take Photo
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="flex-1 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-xl flex items-center justify-center transition duration-200"
              onClick={handleCancel}
            >
              <FaTimes className="mr-2" />
              Cancel
            </button>

            <button
              type="button"
              className="flex-1 cursor-pointer bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-xl flex items-center justify-center transition duration-200"
              onClick={handleScan}
            >
              <FaLeaf className="mr-2" />
              {loading ? "Scanning..." : "Scan Plant"}
            </button>
          </>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="mt-6 text-sm bg-green-50 border border-green-200 p-4 rounded-lg">
          {result.error ? (
            <p className="text-red-500">❌ {result.error}</p>
          ) : (
            <>
              <p><strong>Disease:</strong> {result.final_prediction}</p>
              <p><strong>Confidence:</strong> {result.final_confidence}</p>
              <p><strong>Scientific Name:</strong> {result.scientific_name}</p>
              <p><strong>Organic Treatment:</strong> {result.organic_treatment}</p>
              <p><strong>Prevention:</strong> {result.prevention}</p> 
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PlantUpload;
