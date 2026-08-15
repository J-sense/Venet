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
    addSpecializations: builder.mutation({
      query: (data) => ({
        url: "/experts/specializations/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    updateSpecializations: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/experts/specializations/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    deleteSpecialization: builder.mutation({
      query: (id) => ({
        url: `/experts/specializations/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    addEducation: builder.mutation({
      query: (data) => ({
        url: "/experts/education/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    updateEducation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/experts/education/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/experts/education/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    addAchievement: builder.mutation({
      query: (data) => ({
        url: "/experts/achievements/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    updateAchievement: builder.mutation({
      query: ({ id, data }) => ({
        url: `/experts/achievements/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    deleteAchievement: builder.mutation({
      query: (id) => ({
        url: `/experts/achievements/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    addCertification: builder.mutation({
      query: (data) => ({
        url: "/experts/certifications/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    updateCertification: builder.mutation({
      query: ({ id, data }) => ({
        url: `/experts/certifications/${id}/`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
    deleteCertification: builder.mutation({
      query: (id) => ({
        url: `/experts/certifications/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ExpertProfile", "User"],
    }),
  }),
});

export const {
  useExpertProfileQuery,
  useUpdateExpertProfileMutation,
  useAddSpecializationsMutation,
  useUpdateSpecializationsMutation,
  useDeleteSpecializationMutation,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useAddAchievementMutation,
  useUpdateAchievementMutation,
  useDeleteAchievementMutation,
  useAddCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
} = expertProfileApi;
