import { apiSlice } from "./apiSlice";
import { UPLOAD_URL } from "../constants";

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    uploadFile: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    getFile: builder.query({
      query: () => ({
        url: '/api/upload/',
      }),
      keepUnusedDataFor: 5,
    }),
  }),

})

export const {
  useUploadFileMutation,
  useGetFileQuery
} = uploadApiSlice;