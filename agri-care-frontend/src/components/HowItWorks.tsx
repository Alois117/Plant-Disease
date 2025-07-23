// src/components/HowItWorks.tsx

import { FaCamera, FaRobot, FaStethoscope, FaLeaf } from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="bg-[#f0fdf4] mt-32 py-16 px-6 md:px-20" id="howitworks">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">
        How AgriCare AI Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-green-200 transition">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <FaCamera className="text-green-600 text-2xl mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">1. Capture</h3>
          <p className="text-gray-600">
            Take or upload a photo of your plant leaf using your phone or device.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-green-200 transition">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <FaRobot className="text-green-600 text-2xl mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">2. Analyze</h3>
          <p className="text-gray-600">
            Our AI will analyze the image to detect potential diseases.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-green-200 transition">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <FaStethoscope className="text-green-600 text-2xl mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">3. Diagnose</h3>
          <p className="text-gray-600">
            Get diagnosis with the disease name and confidence score.
          </p>
        </div>

        {/* Step 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-green-200 transition">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
            <FaLeaf className="text-green-600 text-2xl mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">4. Treat</h3>
          <p className="text-gray-600">
            Receive organic and chemical treatment options.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
