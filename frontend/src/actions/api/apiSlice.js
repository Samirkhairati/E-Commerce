import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'
const baseQuery = fetchBaseQuery(
    {
        baseUrl: BASE_URL,
        // credentials: 'include',
        // prepareHeaders: (headers) => {
        //     headers.set('Content-Type', 'application/json');
        //     headers.set('Accept', 'application/json');
        //     headers.set('Origin', import.meta.env.VITE_BACKEND_URL || 'http://localhost:6969');
        //     return headers;
        // },
    }
)

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    endpoints: () => ({})
})