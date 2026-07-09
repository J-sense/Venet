import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const assessmentData: Record<string, string[]> = {
  "mental-health": [
    "How would you rate your current stress level?",
    "Do you practice any mindfulness or meditation?",
    "What mental health goals would you like to achieve?",
    "How often do you feel anxious or overwhelmed?",
    "Describe your current sleep patterns.",
    "What activities help you relax?",
    "Do you have a support system of friends or family?",
    "What is your primary trigger for stress?",
  ],
  "health-&-fitness": [
    "What are your primary health goals?",
    "Do you have any injuries or medical conditions?",
    "How many days per week can you physically exercise?",
    "What is your current diet like?",
    "How many hours of sleep do you get on average?",
    "Do you have access to gym equipment?",
    "How much water do you drink daily?",
    "What is your biggest obstacle to staying fit?",
  ],
  "career-accelerator": [
    "What is your ultimate career goal?",
    "How satisfied are you with your current role?",
    "What skills would you most like to develop?",
    "How comfortable are you with public speaking and networking?",
    "When was the last time you updated your resume?",
    "Do you have an active LinkedIn profile?",
    "What is your biggest challenge in job searching?",
    "Are you looking to change industries or stay in your current field?",
  ],
  "education-services": [
    "What subjects or skills are you most interested in learning?",
    "What is your preferred learning style (e.g., visual, auditory, hands-on)?",
    "How many hours per week can you dedicate to studying?",
    "What is your highest level of completed education?",
    "Do you prefer self-paced courses or live instruction?",
    "What are your main obstacles to learning new things?",
    "Are you learning for career advancement or personal interest?",
    "Do you need a certificate of completion for your goals?",
  ],
};

const programTitles: Record<string, string> = {
  "mental-health": "Mental Health Program",
  "health-&-fitness": "Health & Fitness Program",
  "career-accelerator": "Career Accelerator",
  "education-services": "Education Services",
};

export default function ProgramAssessment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const questions = assessmentData[id || ""] || assessmentData["mental-health"];
  const programTitle = programTitles[id || ""] || "Program Assessment";
  const totalSteps = questions.length;

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit assessment
      const submissionPayload = {
        programId: id,
        programTitle: programTitle,
        answers: answers,
        agreedToDisclaimer: agreedToDisclaimer,
      };
      console.log("Submitting Assessment:", submissionPayload);

      navigate(`/dashboard/user/program/${id || "mental-health"}/roadmap`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(`/dashboard/user/program/${id}`);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [currentStep]: e.target.value,
    });
  };
  console.log(answers);
  const isNextDisabled =
    !agreedToDisclaimer ||
    !(answers[currentStep] && answers[currentStep].trim().length > 0);
  const tooltipMessage = !agreedToDisclaimer
    ? "Please agree to the disclaimer before proceeding."
    : "Please answer the current question before proceeding.";
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10  max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <span className="text-blue-500 text-sm font-bold tracking-wider uppercase mb-2 block">
          {programTitle}
        </span>
        <h1 className=" text-[#FFFFFF] text-5xl font-medium mb-2">
          Detailed Assessment
        </h1>
        <p className="text-[#9F9FA9] text-md font-['inter']">
          Help us create your personalized health roadmap by answering these
          questions.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#155DFC1A] border border-blue-900/40 p-6 rounded-xl mb-8">
        <h3 className="text-blue-400 font-semibold flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#51A2FF] block"></span>{" "}
          Disclaimer
        </h3>
        <p className="text-[#90A1B9] text-sm mb-4 leading-relaxed">
          Your responses will be used to generate a personalized health roadmap.
          This tool does not constitute medical advice, diagnosis, or treatment.
          Always consult with a qualified health provider with any questions you
          may have regarding a medical condition.
        </p>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            checked={agreedToDisclaimer}
            onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
          />
          <span className="text-sm text-slate-300">
            I understand and agree to the disclaimer. I acknowledge that this is
            a supplementary tool and not a replacement for professional advice.
          </span>
        </label>
      </div>

      {/* Question Card */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-6 md:p-8">
        <div className="flex justify-between text-sm text-[#90A1B9] mb-4">
          <span>
            Question {currentStep} of {totalSteps}
          </span>
          <span>
            {currentStep}/{totalSteps}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#1E293B] h-1.5 rounded-full mb-8">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-white mb-6">
          {questions[currentStep - 1]}
        </h2>

        {/* Text Area */}
        <textarea
          className="w-full placeholder:text-[#FFFFFF80] bg-[#19273C] border border-[#2A374A] rounded-xl p-4 text-white placeholder-[#62748E] focus:outline-none focus:border-blue-500 min-h-[150px] resize-none mb-8"
          placeholder="Type your answer here..."
          value={answers[currentStep] || ""}
          onChange={handleAnswerChange}
        />

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleBack}
            className="bg-[#334155] hover:bg-[#2A374A] text-white px-8 py-6 rounded-full font-medium transition-all"
          >
            Back
          </Button>

          <div className="relative flex-1 group">
            <Button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-6 rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === totalSteps ? "Submit Assessment" : "Next"}
            </Button>

            {isNextDisabled && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                <div className="bg-gray-500 text-white text-xs px-3 py-2 rounded-md whitespace-nowrap">
                  {tooltipMessage}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
