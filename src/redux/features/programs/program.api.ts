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
        url: "/programs/educational-services-program/",
        method: "GET",
      }),
    }),
    healthAndFitnessProgram: builder.query({
      query: () => ({
        url: "/programs/health-fitness-program/",
        method: "GET",
      }),
    }),
    careerProgramme: builder.query({
      query: () => ({
        url: "/programs/career-preparation-program/",
        method: "GET",
      }),
    }),
    mentalHealthProgram: builder.query({
      query: () => ({
        url: "/programs/mental-health-program/",
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
