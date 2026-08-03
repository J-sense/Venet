import { useState } from "react";
import { assessmentSteps } from "../data/assessmentData";

export interface AssessmentAnswerItem {
  question_id: number;
  answer: boolean;
}

export interface AssessmentPayload {
  answers: AssessmentAnswerItem[];
}

export const useAssessment = (totalSteps: number) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const goToNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const goToPrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateAnswer = (questionId: number | string, value: boolean) => {
    const numericId =
      typeof questionId === "number"
        ? questionId
        : parseInt(String(questionId).replace(/\D/g, ""), 10);
    setAnswers((prev) => ({ ...prev, [numericId]: value }));
  };

  const getFormattedPayload = (): AssessmentPayload => {
    const formattedAnswers: AssessmentAnswerItem[] = [];

    assessmentSteps.forEach((step) => {
      step.questions.forEach((q) => {
        const qId =
          typeof q.id === "number"
            ? q.id
            : parseInt(String(q.id).replace(/\D/g, ""), 10);
        formattedAnswers.push({
          question_id: qId,
          answer: answers[qId] ?? false,
        });
      });
    });

    return { answers: formattedAnswers };
  };

  return {
    currentStep,
    answers,
    updateAnswer,
    goToNext,
    goToPrevious,
    getFormattedPayload,
  };
};

