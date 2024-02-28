import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../routes";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.categoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    getCategories: builder.query({
      query: () => `${CATEGORY_URL}/`,
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    readCategories: builder.query({
      query: (categoryId) => `${CATEGORY_URL}/${categoryId}`,
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useReadCategoriesQuery
} = categoryApiSlice;