import { baseApi } from "@/redux/baseApi";


const firebaseNotificationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query({
            query: (page: number = 1) => ({
                url: `/notifications/?page=${page}`,
                method: "GET",
            }),
            providesTags: ["Notifications" as any],
        }),
        markNotificationsRead: builder.mutation({
            query: (data?: { id?: string | number }) => ({
                url: "/notifications/mark-read/",
                method: "POST",
                data: data || {},
            }),
            invalidatesTags: ["Notifications" as any],
        }),
    }),
});

export const {
    useGetAllNotificationsQuery,
    useMarkNotificationsReadMutation,
} = firebaseNotificationsApi;

export const useMarkAllNotificationsReadMutation = useMarkNotificationsReadMutation;