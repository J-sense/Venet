import { baseApi } from "@/redux/baseApi";

const expertAvailabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpertAvailability: builder.mutation({
      query: (data) => ({
        url: "/experts/dashboard/availability/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ExpertProfile"],
    }),
    getExpertAvailabiltiy: builder.query({
      query: (data) => ({
        url: "/experts/dashboard/availability/",
        method: "GET",
        data,
      }),
      providesTags: ["ExpertProfile"],
    }),
  }),
});

export const {
  useCreateExpertAvailabilityMutation,
  useGetExpertAvailabiltiyQuery,
} = expertAvailabilityApi;
