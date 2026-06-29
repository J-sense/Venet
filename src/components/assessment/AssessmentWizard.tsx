import { assessmentSteps } from "@/constents";
import { useAssessment } from "@/utils/useAssessment";
import { useNavigate } from "react-router";

export default function AssessmentWizard({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const navigate = useNavigate();
  const { currentStep, answers, updateAnswer, goToNext, goToPrevious } =
    useAssessment(4);
  const handleSubmit = () => {
    onComplete();
    navigate("/subscription-suggestions");
  };
  const stepBackgrounds = [
    "/expertBG.png", // Health & Fitness
    "/expertBG.png", // Mental Wellness
    "/expertBG.png", // Educational Interests
    "/expertBG.png", // Career Development
  ];

  return (
    <div className="relative w-full overflow-hidden min-h-[600px] flex justify-center">
      {/* Dynamic Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url('${stepBackgrounds[currentStep - 1]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 p-8 md:p-12 w-full max-w-4xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold font-['Inter'] mb-3">
            Free Assessment
          </h1>
          <p className="text-slate-400 text-sm font-normal">
            Answer these questions to help us recommend the best programs for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-colors ${step <= currentStep ? "bg-blue-600" : "bg-slate-700"}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-white text-xl font-semibold">
              {assessmentSteps[currentStep - 1].title}
            </h2>
            <span className="text-slate-500 text-sm">
              Step {currentStep} of 4
            </span>
          </div>

          {assessmentSteps[currentStep - 1].questions.map((q) => (
            <div
              key={q.id}
              className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/30"
            >
              <p className="text-slate-200 mb-4">{q.text}</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => updateAnswer(q.id, true)}
                  className={`py-3 rounded-lg font-medium border transition-all ${answers[q.id] === true ? "bg-blue-600 border-blue-500" : "bg-transparent border-slate-600 text-slate-400 hover:border-slate-500"}`}
                >
                  True
                </button>
                <button
                  onClick={() => updateAnswer(q.id, false)}
                  className={`py-3 rounded-lg font-medium border transition-all ${answers[q.id] === false ? "bg-red-900/40 border-red-900 text-red-400" : "bg-transparent border-slate-600 text-slate-400 hover:border-slate-500"}`}
                >
                  False
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={goToPrevious}
            className="text-slate-400 hover:text-white"
          >
            Back
          </button>
          <button
            onClick={currentStep === 4 ? handleSubmit : goToNext}
            className="bg-blue-600 text-white px-12 py-3 rounded-full font-bold hover:bg-blue-700 transition-all"
          >
            {currentStep === 4 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
