import { baseApi } from "@/redux/baseApi";

export interface GetExpertsQueryParams {
  sort_by?: string;
  search?: string;
  price_min?: number;
  price_max?: number;
}

const expertRouteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExperts: builder.query({
      query: (params?: GetExpertsQueryParams) => ({
        url: "/experts/",
        method: "GET",
        params,
      }),
    }),
    getSingleExpert: builder.query({
      query: (id) => ({
        url: `/experts/${id}/`,
        method: "GET",
      }),
      providesTags: ["ExpertProfile"],
    }),
    getSingleExpertDurationAndTime: builder.query({
      query: (id) => ({
        url: `/session-durations/?expert_id=${id}`,
        method: "GET",
      }),
      providesTags: ["ExpertProfile"],
    }),
    getSingleExpertAvailability: builder.query({
      query: (id) => ({
        url: `/experts/${id}/availability/`,
        method: "GET",
      }),
      providesTags: ["ExpertProfile", "Availability"],
    }),
    getSingleExpertSlots: builder.query({
      query: ({ id, date, duration_minutes }) => ({
        url: `/experts/${id}/available-slots/?date=${date}&duration_minutes=${duration_minutes}`,
        method: "GET",
      }),
      providesTags: ["Availability"],
    }),
  }),
});
export const {
  useGetAllExpertsQuery,
  useGetSingleExpertQuery,
  useGetSingleExpertDurationAndTimeQuery,
  useGetSingleExpertAvailabilityQuery,
  useGetSingleExpertSlotsQuery,
} = expertRouteApi;
