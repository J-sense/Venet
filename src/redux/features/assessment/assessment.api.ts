import { baseApi } from "@/redux/baseApi";

export interface AssessmentAnswerItem {
  question_id: number;
  answer: boolean;
}

export interface SubmitAssessmentPayload {
  answers: AssessmentAnswerItem[];
}

const assessmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssessmentQuestions: builder.query({
      query: () => ({
        url: "/assessment/questions/",
        method: "GET",
      }),
    }),
    submitAssessment: builder.mutation({
      query: (data: SubmitAssessmentPayload) => ({
        url: "/assessment/submit/",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useGetAllAssessmentQuestionsQuery,
  useSubmitAssessmentMutation,
} = assessmentApi;

