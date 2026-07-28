import { baseApi } from "@/redux/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register/",
        method: "POST",
        data: userInfo,
      }),
    }),
    registerExpert: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register/",
        method: "POST",
        data: userInfo,
      }),
    }),
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login/email/",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/password/reset/",
        method: "POST",
        data: userInfo,
      }),
    }),
    resendOTP: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/resend-otp/",
        method: "POST",
        data: userInfo,
      }),
    }),
    userSecurityPasswordChange: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/password/change/old/",
        method: "POST",
        data: userInfo,
      }),
    }),
    forgetPasswordUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/password/forgot/",
        method: "POST",
        data: userInfo,
      }),
    }),

    myProfile: builder.query({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useLoginUserMutation,
  useMyProfileQuery,
  useForgetPasswordUserMutation,
  useUserSecurityPasswordChangeMutation,
  useRegisterExpertMutation,
} = authApi;
