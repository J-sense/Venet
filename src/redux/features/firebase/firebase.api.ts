import { baseApi } from "@/redux/baseApi";

interface RegisterDeviceRequest {
    token: string;
    platform: "web";
}

const firebaseNotificationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        registerDevice: builder.mutation({
            query: (data: RegisterDeviceRequest) => ({
                url: "/notifications/register-device/",
                method: "POST",
                data,
            }),
        }),
    }),
});

export const {
    useRegisterDeviceMutation,
} = firebaseNotificationsApi;