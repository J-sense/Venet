import { baseApi } from "@/redux/baseApi";

const userSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSession: builder.query({
      query: () => ({
        url: "experts/sessions/",
        method: "GET",
      }),
      providesTags: ["User", "UserSession"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile/update/",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["User"],
    }),
    getServerTime: builder.query({
      query: () => ({
        url: "/server-time/",
        method: "GET",
      }),
    }),
    getChatHistory: builder.query({
      query: (sessionId: string) => ({
        url: `sessions/${sessionId}/chat-history/`,
        method: "GET",
      }),
    }),
    getChatContacts: builder.query({
      query: () => ({
        url: `/chat/contacts/`,
        method: "GET",
      }),
    }),
    sendFile: builder.mutation({
      query: (formData: FormData) => ({
        url: "chat/send-file/",
        method: "POST",
        data: formData,
      }),
    }),
    createReview: builder.mutation({
      query: (data: {
        session: string;
        rating: number;
        comment?: string;
        is_recommended?: boolean;
      }) => ({
        url: "/experts/reviews/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["UserSession"],
    }),
    getAllReviews: builder.query({
      query: (id) => ({
        url: `/experts/${id}/reviews/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserSessionQuery,
  useGetServerTimeQuery,
  useGetChatHistoryQuery,
  useSendFileMutation,
  useGetChatContactsQuery,
  useCreateReviewMutation,
  useGetAllReviewsQuery,
} = userSessionApi;
