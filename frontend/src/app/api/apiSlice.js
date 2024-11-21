import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";
import {BASE_URL, USERS_URL} from "../constants";

export const apiSlice = createApi({
    baseQuery : fetchBaseQuery({baseUrl:BASE_URL}),
    endpoints:(builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url: ` ${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query : (data)=>({
                url: USERS_URL,
            method: 'POST',
            body: data,
            })
        }),
        logoutApi:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST'
            })
        }),
        updateProfile: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body:data,
            }),
        }),

        getUsers: builder.query({
            query:()=>({
                url: USERS_URL,
            })
        }),

    }),
});

export const {useLoginMutation, useRegisterMutation, useLogoutApiMutation, useUpdateProfileMutation, useGetUsersQuery } =apiSlice
