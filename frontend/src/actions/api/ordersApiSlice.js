
import { ORDER_URL } from "../routes";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllOrders: builder.query({
      query: () => `${ORDER_URL}`,
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),

    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Order"],
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    markProductAsDelivered: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }), 
      invalidatesTags: ["Order"],
    }),

  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useMarkProductAsDeliveredMutation,
  useGetUserOrdersQuery
} = productApiSlice;