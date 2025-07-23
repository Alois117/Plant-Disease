// src/pages/Index.tsx

import { useState } from "react";
import heroImage from "../assets/background.jpg";
import Header from "../components/Header";
import PlantUpload from "../components/PlantUpload";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import AboutUs from "../components/AboutUs";
import ScrollToTop from "../components/ScrollToTop";

function Index() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <main className="min-h-screen bg-[#fefce8] px-6 md:px-20 py-6">
      {/* Header */}
      <Header />
      <div className="blur-target">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 pt-28 md:pt-32">
        {/* Text */}
        <section className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-green-700">
            🌿 Your Plants Deserve Expert Care
          </h2>
          <p className="text-lg text-gray-700 max-w-xl">
            Welcome to AgriCare AI — your knowledgeable friend who happens to be a plant genius.
            Let’s check your plants' health together!
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-lg transition duration-200 shadow-lg cursor-pointer"
          >
            Start Scanning 🌱
          </button>
        </section>

        {/* Image */}
        <section className="md:w-1/2 mb-10 md:mb-0">
          <img
            src={heroImage}
            alt="Healthy Plant Illustration"
            className="w-full max-w-md mx-auto drop-shadow-xl animate-fade-in-up"
          />
        </section>
      </div>

      {/* Upload component */}
      {showUpload && (
        <section className="mt-12 px-4 py-8 rounded-xl">
          <PlantUpload />
        </section>
      )}

      {/* Sections below the fold */}
      <HowItWorks />
      <AboutUs />
      <FAQ />
      <ScrollToTop />
      <Footer />
      </div>
    </main>
  );
}

export default Index;
