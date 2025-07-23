// src/components/AboutUs.tsx

import aboutImage from "../assets/about.jpg"; 

function AboutUs() {
  return (
    <section className="mt-24 md:px-20" id="about">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Image Left */}
        <div className="md:w-1/2">
          <img
            src={aboutImage}
            alt="AI inspecting plants"
            className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
          />
        </div>

        {/* Text Right */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            About AgriCare AI
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            AgriCare AI is a smart plant health diagnosis tool that empowers
            farmers, gardeners, and agricultural experts to detect crop diseases
            using artificial intelligence.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to make plant care easier, faster, and more accurate by
            blending deep learning with plant pathology knowledge — accessible to
            everyone, from smallholders to agronomists.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
