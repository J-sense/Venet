import { baseApi } from "@/redux/baseApi";



const expertProfile = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        expertProfile: builder.query({
            query: () => ({
                url: "/auth/expert-profile/",
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

export const { useExpertProfileQuery } = expertProfile;

