import { baseApi } from "@/redux/baseApi";

const expertAvailabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpertAvailability: builder.mutation({
      query: (data) => ({
        url: "/experts/dashboard/availability/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "Availability"],
    }),
    getExpertAvailabiltiy: builder.query({
      query: (data) => ({
        url: "/experts/dashboard/availability/",
        method: "GET",
        data,
      }),
      providesTags: ["ExpertProfile", "Availability"],
    }),
    getSingleExpertAvailability: builder.query({
      query: (id) => ({
        url: `/experts/${id}/availability/`,
        method: "GET",
      }),
      providesTags: ["ExpertProfile", "Availability"],
    }),
  }),
});

export const {
  useCreateExpertAvailabilityMutation,
  useGetExpertAvailabiltiyQuery,
  useGetSingleExpertAvailabilityQuery,
} = expertAvailabilityApi;
