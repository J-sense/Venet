import { baseApi } from "@/redux/baseApi";

const programApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allPrograms: builder.query({
      query: () => ({
        url: "/programs/",
        method: "GET",
      }),
    }),
    educationServiceProgram: builder.query({
      query: () => ({
        url: "/programs/b3b61c6a-616a-44a1-a90c-1b1fb3fc413f",
        method: "GET",
      }),
    }),
    healthAndFitnessProgram: builder.query({
      query: () => ({
        url: "/programs/f95c519e-dc8e-4288-abc3-42f337d5aab7",
        method: "GET",
      }),
    }),
    careerProgramme: builder.query({
      query: () => ({
        url: "/programs/7280701a-82e7-4cea-bb16-52fc895fa5c3",
        method: "GET",
      }),
    }),
    mentalHealthProgram: builder.query({
      query: () => ({
        url: "/programs/658f5358-d440-46ad-8228-3786467b458c",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useAllProgramsQuery,
  useEducationServiceProgramQuery,
  useMentalHealthProgramQuery,
  useCareerProgrammeQuery,
  useHealthAndFitnessProgramQuery,
} = programApi;
