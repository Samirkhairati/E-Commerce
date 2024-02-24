import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.categoryId}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data}`,
        method: "DELETE",
      }),
    }),

    getCategories: builder.query({
      query: () => `${CATEGORY_URL}/`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} = categoryApiSlice;