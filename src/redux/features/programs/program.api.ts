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
        url: "/programs/02ed108d-1636-4acd-acd9-c85a30100fbc",
        method: "GET",
      }),
    }),
    healthAndFitnessProgram: builder.query({
      query: () => ({
        url: "/programs/086fde4d-87d9-4191-ac82-61ced65f51ee",
        method: "GET",
      }),
    }),
    careerProgramme: builder.query({
      query: () => ({
        url: "/programs/6f9df1d7-a70b-4355-add7-2df64157bfd8",
        method: "GET",
      }),
    }),
    mentalHealthProgram: builder.query({
      query: () => ({
        url: "/programs/b5eaae2d-e8b0-4bc5-b4e3-d1ed08408018",
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
