import { baseApi } from "@/redux/baseApi";

export interface UserProfile {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  image: string | null;
  address1: string | null;
  phone1: string | null;
  specialty: string | null;
  years_of_experience: number | string | null;
  hourly_rate: number | string | null;
  location?: string | null;
  open_to?: string | null;
  bio?: string | null;
  skills?: string[] | null;
  all_agreements_accepted: boolean;
}

export interface UserProfileResponse {
  success: boolean;
  details: string;
  code: string;
  status_code: number;
  data: UserProfile;
}

const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation<
      UserProfileResponse,
      FormData | Partial<UserProfile>
    >({
      query: (data) => ({
        url: "/auth/profile/update/",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    myPurchaseProgramme: builder.query({
      query: (data) => ({
        url: "/my-programs/",
        method: "GET",
        data,
      }),
    }),
    getMyTalentPortal: builder.query({
      query: (data) => ({
        url: "/subscriptions/plans/",
        method: "GET",
        data,
      }),
    }),
    getMyPurchaseTalentPortal: builder.query({
      query: (data) => ({
        url: "/subscriptions/",
        method: "GET",
        data,
      }),
      providesTags: ["TalentPortal"],
    }),
    purchaseTalentPortal: builder.mutation({
      query: (plan_id) => ({
        url: `subscriptions/${plan_id}/create-session/`,
        method: "POST",
      }),
      invalidatesTags: ["TalentPortal"],
    }),
    getBillingData: builder.query({
      query: () => ({
        url: "/subscriptions/billing-history/",
        method: "GET",
      }),
      providesTags: ["TalentPortal"],
    }),
    cancelSubscription: builder.mutation({
      query: (subscriptionId: string) => ({
        url: `/subscriptions/${subscriptionId}/cancel/`,
        method: "POST",
      }),
      invalidatesTags: ["TalentPortal"],
    }),
    retryPurchaseTalentPortal: builder.mutation({
      query: (plan_id) => ({
        url: `/subscriptions/${plan_id}/retry/`,
        method: "POST",
      }),
      invalidatesTags: ["TalentPortal"],
    }),
    retryPurchaseAfterCancelTalentPortal: builder.mutation({
      query: (plan_id) => ({
        url: `/subscriptions/${plan_id}/reactivate/`,
        method: "POST",
      }),
      invalidatesTags: ["TalentPortal"],
    }),
    getTalentPortalUserProfile: builder.query({
      query: (data) => ({
        url: "/talent-portal/profile/",
        method: "GET",
        data,
      }),
      providesTags: ["TalentPortal"],
    }),
    manualResumeForm: builder.mutation({
      query: (data) => ({
        url: `/resume/generate/manual/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Resume", "TalentPortal"],
    }),
    generatePdfAfterManualSubmit: builder.mutation({
      query: (resumeId) => ({
        url: `/resume/${resumeId}/pdf/`,
        method: "POST",
      }),
      invalidatesTags: ["Resume", "TalentPortal"],
    }),
    uploadPdfForAiGenerate: builder.mutation({
      query: (data) => ({
        url: `/resume/upload/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Resume", "TalentPortal"],
    }),
    generetateResumeBy: builder.mutation({
      query: (data) => ({
        url: `/resume/generate/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Resume", "TalentPortal"],
    }),
    generetateCoverLetterBy: builder.mutation({
      query: (data) => ({
        url: `/cover-letters/generate/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Resume", "TalentPortal"],
    }),
    getAllResumeList: builder.query({
      query: () => ({
        url: "/resume/list/",
        method: "GET",
      }),
      providesTags: ["Resume", "TalentPortal"],
    }),
    startProgrameQuestions: builder.query({
      query: (program_id) => ({
        url: `/programs/${program_id}/plan/questions/`,
        method: "GET",
      }),
    }),
    submitProgramPlan: builder.mutation({
      query: ({ program_id, data }) => ({

        url: `/programs/${program_id}/plan/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["ProgramPlan"],
    }),
    getProgramPlan: builder.query({
      query: (program_id) => ({
        url: `/programs/${program_id}/plan/`,
        method: "GET",
      }),
      providesTags: ["ProgramPlan"],
    }),
    toggleTaskCompletion: builder.mutation({
      query: ({ program_id, data }) => ({
        url: `/programs/${program_id}/plan/tasks/toggle/`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["ProgramPlan"],
    }),
    getUserDashboard: builder.query({
      query: () => ({
        url: `/auth/dashboard/`,
        method: "GET",

      }),

    }),
    getAllCertificate: builder.query({
      query: () => ({
        url: "/certificates/",
        method: "GET",
      }),
      providesTags: ["ProgramPlan"],
    })

  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useMyPurchaseProgrammeQuery,
  useGetMyTalentPortalQuery,
  useGetMyPurchaseTalentPortalQuery,
  usePurchaseTalentPortalMutation,
  useGetBillingDataQuery,
  useCancelSubscriptionMutation,
  useRetryPurchaseTalentPortalMutation,
  useRetryPurchaseAfterCancelTalentPortalMutation,
  useGetTalentPortalUserProfileQuery,
  useManualResumeFormMutation,
  useGeneratePdfAfterManualSubmitMutation,
  useUploadPdfForAiGenerateMutation,
  useGeneretateResumeByMutation,
  useGeneretateCoverLetterByMutation,
  useGetAllResumeListQuery,
  useStartProgrameQuestionsQuery,
  useSubmitProgramPlanMutation,
  useGetProgramPlanQuery,
  useToggleTaskCompletionMutation,
  useGetUserDashboardQuery,
  useGetAllCertificateQuery
} = userProfileApi;
