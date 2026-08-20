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
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useMyPurchaseProgrammeQuery,
} = userProfileApi;
