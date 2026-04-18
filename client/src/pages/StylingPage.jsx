import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    key: "faceShape",
    question: "What’s your face shape?",
    options: ["Round", "Oval", "Square", "Heart", "Diamond"],
  },
  {
    key: "occasion",
    question: "What’s the occasion?",
    options: ["Daily", "Festive", "Wedding", "Party"],
  },
  {
    key: "skinTone",
    question: "Your skin tone? (optional)",
    options: ["Fair", "Medium", "Dusky"],
  },
  {
    key: "bodyType",
    question: "Your body type? (optional)",
    options: ["Slim", "Curvy", "Petite", "Plus Size"],
  },
];

function StylingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate(); 

  const current = questions[step];

  const handleSelect = (value) => {
    setAnswers({ ...answers, [current.key]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Final Answers:", answers);
      navigate("/style-result", {
        state: answers,
      });
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-[80vh] bg-[#f3eee9] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md text-center">

        {/* Progress */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="h-2 bg-[#2f4f4f] rounded-full"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-[#2f4f4f] mb-6">
          {current.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {current.options.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className={`border rounded-xl py-3 transition 
                ${
                  answers[current.key] === item
                    ? "bg-[#2f4f4f] text-white"
                    : "border-gray-300 hover:bg-[#f8f5f2]"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-gray-500"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="bg-[#2f4f4f] text-white px-6 py-2 rounded-full hover:bg-[#3d6363]"
          >
            {step === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default StylingPage;