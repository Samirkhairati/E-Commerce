
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

    // getAllProducts: builder.query({
    //   query: () => `${PRODUCT_URL}/all`,
    // }),

    // getProductDetails: builder.query({
    //   query: (productId) => ({
    //     url: `${PRODUCT_URL}/${productId}`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    // updateProduct: builder.mutation({
    //   query: (data) => ({
    //     url: `${PRODUCT_URL}/${data.productId}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),

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
} = productApiSlice;