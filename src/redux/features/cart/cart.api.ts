import { baseApi } from "@/redux/baseApi";
import type { ICartItem } from "./cartSlice";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    syncCart: builder.mutation<
      { success: boolean; message?: string; details?: string },
      { program_ids: string[] }
    >({
      query: (body) => ({
        url: "/cart/items/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    addToCartApi: builder.mutation<
      { success: boolean; message?: string },
      | { program_ids?: string[]; program_id?: string; title?: string }
      | ICartItem
    >({
      query: (item) => {
        let program_ids: string[] = [];
        if ("program_ids" in item && Array.isArray(item.program_ids)) {
          program_ids = item.program_ids;
        } else if ("program_id" in item && item.program_id) {
          program_ids = [item.program_id];
        } else {
          program_ids = ["02ed108d-1636-4acd-acd9-c85a30100fbc"];
        }

        return {
          url: "/cart/items/",
          method: "POST",
          body: { program_ids },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    clearCartApi: builder.mutation<
      { success: boolean; message?: string },
      { item_id?: string; program_id?: string; title?: string } | void
    >({
      query: (body) => ({
        url: "/cart/clear/",
        method: "POST",
        body: body || {},
      }),
      invalidatesTags: ["Cart"],
    }),
    getCartApi: builder.query<{ data: ICartItem[] }, void>({
      query: () => ({
        url: "/cart/",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addToCartMultiple: builder.mutation({
      query: (userInfo) => ({
        url: "/cart/items/",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["Cart"],
    }),
    getAllCartItems: builder.query({
      query: () => ({
        url: "/cart/",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    removeSingleCartItem: builder.mutation({
      query: (cartId) => ({
        url: `/cart/items/${cartId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    removeAllItemFromCart: builder.mutation({
      query: () => ({
        url: `/cart/clear/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    proceedToCheckOut: builder.mutation({
      query: () => ({
        url: "/checkout/create-session/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSyncCartMutation,
  useAddToCartApiMutation,
  useClearCartApiMutation,
  useGetCartApiQuery,
  useAddToCartMultipleMutation,
  useGetAllCartItemsQuery,
  useRemoveSingleCartItemMutation,
  useProceedToCheckOutMutation,
  useRemoveAllItemFromCartMutation,
} = cartApi;
