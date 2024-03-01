
import { ORDER_URL } from "../routes";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getProducts: builder.query({
    //   query: ({ keyword, page }) => ({
    //     url: `${PRODUCT_URL}`,
    //     params: { keyword, page },
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ["Products"],
    // }),

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
      providesTags: ["Products"],
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
      invalidatesTags: ["Product"],
    }),

    // deleteProduct: builder.mutation({
    //   query: (productId) => ({
    //     url: `${PRODUCT_URL}/${productId}`,
    //     method: "DELETE",
    //   }),
    //   providesTags: ["Product"],
    // }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useMarkProductAsDeliveredMutation,
  useGetUserOrdersQuery
} = productApiSlice;