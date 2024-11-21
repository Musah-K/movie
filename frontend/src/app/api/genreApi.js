import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

const genreApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createGenre: builder.mutation({
            query:(creategenre)=>({
                url:`${GENRE_URL}`,
                method:"POST",
                body:creategenre
            })
        }),
        updateGenre : builder.mutation({
            query:({id, updategenre})=>({
                url:`${GENRE_URL}/${id}`,
                method: 'PUT',
                body: updategenre,
            })
        }),
        deleteGenre : builder.mutation({
            query:(id)=>({
                url:`${GENRE_URL}/${id}`,
                method: 'DELETE'
            })
        }),
        allGenres: builder.query({
            query:()=>({
                url:`${GENRE_URL}/genres`,

            })
        })
    })
})

export {genreApi};
export const {useAllGenresQuery, useCreateGenreMutation, useDeleteGenreMutation, useUpdateGenreMutation} = genreApi;