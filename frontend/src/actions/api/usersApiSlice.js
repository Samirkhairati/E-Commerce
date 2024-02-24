import { apiSlice } from "./apiSlice";
import { UPLOAD_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    uploadFile: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/`,
        method: "POST",
        body: file,
      }),
    }),
    
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
//   useGetUserDetailsQuery,
} = userApiSlice;