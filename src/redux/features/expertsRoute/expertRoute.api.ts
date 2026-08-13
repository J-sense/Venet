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
    }),
  }),
});
export const { useGetAllExpertsQuery, useGetSingleExpertQuery } =
  expertRouteApi;
