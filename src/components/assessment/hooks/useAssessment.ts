import { useState } from "react";

export const useAssessment = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  console.log(answers);
  const goToNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const goToPrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateAnswer = (questionId: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return { currentStep, answers, updateAnswer, goToNext, goToPrevious };
};
