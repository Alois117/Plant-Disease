import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How does AgriCare AI diagnose plant diseases?",
    answer:
      "AgriCare AI uses advanced image recognition powered by deep learning to identify plant diseases and suggest effective treatments."
  },
  {
    question: "Is my data safe when I upload a photo?",
    answer:
      "Yes. We process your images securely and do not store them permanently. Your privacy is our priority."
  },
  {
    question: "Do I need an account to use the service?",
    answer:
      "No account is required to get plant disease predictions. We aim to make the tool as accessible as possible."
  },
  {
    question: "What kind of plants can be diagnosed?",
    answer:
      "We currently support a wide range of crops including tomatoes, peppers, maize, and many others from the PlantVillage dataset."
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="mt-24 md:px-20" id="FAQ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
           Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Here are some of the most common questions users ask about AgriCare AI.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 border border-green-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center text-green-800 font-medium text-lg hover:bg-green-50"
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
