import { baseApi } from "@/redux/baseApi";

const userSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSession: builder.query({
      query: () => ({
        url: "experts/sessions/?status=SCHEDULED",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile/update/",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserSessionQuery } = userSessionApi;
