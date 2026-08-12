import { baseApi } from "@/redux/baseApi";

const expertProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    expertProfile: builder.query({
      query: () => ({
        url: "/auth/expert-profile/",
        method: "GET",
      }),
      providesTags: ["ExpertProfile"],
    }),
    updateExpertProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/expert-profile/update/",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
  }),
});

export const { useExpertProfileQuery, useUpdateExpertProfileMutation } = expertProfileApi;
