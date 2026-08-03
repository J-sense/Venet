import { assessmentSteps } from "../data/assessmentData";
import { useAssessment } from "../hooks/useAssessment";
import { useNavigate } from "react-router";
import { useSubmitAssessmentMutation } from "@/redux/features/assessment/assessment.api";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function AssessmentWizard({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const navigate = useNavigate();
  const {
    currentStep,
    answers,
    updateAnswer,
    goToNext,
    goToPrevious,
    getFormattedPayload,
  } = useAssessment(4);
  const [submitAssessment, { isLoading }] = useSubmitAssessmentMutation();

  const handleSubmit = async () => {
    const payload = getFormattedPayload();
    console.log("Submitting assessment payload:", payload);

    try {
      const responseData = await submitAssessment(payload);
      console.log(responseData);
      if (responseData.data?.success) {
        toast.success(responseData.data.details);
        onComplete();
        navigate("/subscription-suggestions", {
          state: { assessmentResponse: responseData.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const stepBackgrounds = [
    "/expertBG.png", // Health & Fitness
    "/assesmentMental.png", // Mental Wellness
    "/assessmentEducation.png", // Educational Interests
    "/assessmentCareer.png", // Career Development
  ];

  const stepBgClasses = [
    "bg-cover bg-center", // 1. Health & Fitness
    "bg-[length:110%_90%] bg-center", // 2. Mental Wellness (smaller width/height)
    "bg-cover bg-center", // 3. Educational Interests
    "bg-cover bg-center", // 4. Career Development
  ];

  const stepOpacities = [
    "opacity-20", // 1. Health & Fitness
    "opacity-50", // 2. Mental Wellness (more visible)
    "opacity-20", // 3. Educational Interests
    "opacity-20", // 4. Career Development
  ];

  return (
    <div className="relative w-full overflow-hidden min-h-[600px] flex justify-center">
      {/* Smooth Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-[#0B1120]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="relative mb-6 flex items-center justify-center">
            {/* Outer Pulsing Glow Ring */}
            <div className="absolute w-24 h-24 rounded-full bg-blue-600/30 animate-ping" />
            <div className="absolute w-20 h-20 rounded-full bg-blue-500/20 blur-md" />
            {/* Spinning Ring */}
            <div className="relative size-16 rounded-full border-4 border-slate-700/60 border-t-blue-500 animate-spin flex items-center justify-center" />
            <Sparkles className="absolute size-7 text-blue-400 animate-pulse" />
          </div>
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
            Submitting Your Assessment...
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
            Analyzing your responses and generating your personalized program
            recommendations.
          </p>
        </div>
      )}

      {/* Dynamic Background Image */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-in-out bg-no-repeat ${stepBgClasses[currentStep - 1]} ${stepOpacities[currentStep - 1]}`}
        style={{
          backgroundImage: `url('${stepBackgrounds[currentStep - 1]}')`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 p-4 sm:p-8 md:p-12 w-full max-w-4xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-6 sm:mb-8 mt-2 sm:mt-0">
          <h1 className="text-white text-2xl sm:text-3xl font-bold font-['Inter'] mb-2 sm:mb-3">
            Free Assessment
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-normal px-2">
            Answer these questions to help us recommend the best programs for
            you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-colors ${step <= currentStep ? "bg-blue-600" : "bg-slate-700"}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-white text-lg sm:text-xl font-semibold">
              {assessmentSteps[currentStep - 1].title}
            </h2>
            <span className="text-slate-500 text-xs sm:text-sm">
              Step {currentStep} of 4
            </span>
          </div>

          {assessmentSteps[currentStep - 1].questions.map((q) => (
            <div
              key={q.id}
              className="bg-slate-800/30 p-4 sm:p-5 rounded-xl border border-slate-700/30"
            >
              <p className="text-slate-200 mb-3 sm:mb-4 text-sm sm:text-base leading-snug sm:leading-normal">
                {q.text}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => updateAnswer(q.id, true)}
                  className={`py-2.5 sm:py-3 rounded-lg font-medium border transition-all text-sm sm:text-base ${answers[q.id] === true ? "bg-blue-600 border-blue-500" : "bg-transparent border-slate-600 text-slate-400 hover:border-slate-500"}`}
                >
                  True
                </button>
                <button
                  onClick={() => updateAnswer(q.id, false)}
                  className={`py-2.5 sm:py-3 rounded-lg font-medium border transition-all text-sm sm:text-base ${answers[q.id] === false ? "bg-red-900/40 border-red-900 text-red-400" : "bg-transparent border-slate-600 text-slate-400 hover:border-slate-500"}`}
                >
                  False
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 mt-8 sm:mt-10 mb-4 sm:mb-0">
          <button
            onClick={goToPrevious}
            className="text-slate-400 hover:text-white py-2"
          >
            Back
          </button>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={currentStep === 4 ? handleSubmit : goToNext}
              disabled={isLoading}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors order-2 sm:order-1 py-2 sm:py-0 disabled:opacity-50"
            >
              {currentStep === 4
                ? isLoading
                  ? "Submitting..."
                  : "Skip & Submit"
                : "Skip Section"}
            </button>
            <button
              onClick={currentStep === 4 ? handleSubmit : goToNext}
              disabled={isLoading}
              className="bg-blue-600 text-white w-full sm:w-auto px-8 md:px-12 py-3.5 sm:py-3 rounded-full font-bold hover:bg-blue-700 transition-all order-1 sm:order-2 disabled:opacity-50"
            >
              {currentStep === 4
                ? isLoading
                  ? "Submitting..."
                  : "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

