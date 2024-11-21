import { apiSlice} from "./apiSlice";
import { MOVIE_URL, UPLOAD_URL } from "../constants";

export const moviesApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        getAllMovies: builder.query({
            query:()=> (
                {
                url: `${MOVIE_URL}/all-movies`,
                })
        }),

        createMovie: builder.mutation({
            query:(newMovie)=>({
                url: `${MOVIE_URL}/createMovie`,
                method:'POST',
                body: newMovie
            })
        }),

        updateMovie: builder.mutation({
            query:({id,data})=>({
                url: `${MOVIE_URL}/updateMovie/${id}`,
                method: 'PUT',
                body: data,
            })
        }),

        addMovieReview: builder.mutation({
            query:({id, rating, comment})=>({
                url: `${MOVIE_URL}/${id}/reviews`,
                method: 'POST',
                body: {rating, comment},
            })
        }),

        deleteMovie: builder.mutation({
            query:(id)=>({
                url: `${MOVIE_URL}/delete-movie/${id}`,
                method: 'DELETE',
            })
        }),

        deleteComment: builder.mutation({
            query: ({movieId, reviewId})=>({
                url: `${MOVIE_URL}/delete-comment`,
                method: 'DELETE',
                body: {movieId, reviewId},
            })
        }),

        getSpecificMovie: builder.query({
            query: (id)=>({
                url: `${MOVIE_URL}/specificMovie/${id}`,

            })
        }),

        uploadImage: builder.mutation({

            query:(formData)=>({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: formData

            })
        }),

        getNewMovies: builder.query({
            query:()=>({
                url: `${MOVIE_URL}/new-movies`
            })
        }),

        getTopMovies: builder.query({
            query: () => ({
                url: `${MOVIE_URL}/top-movies`
            })
        }),

        getRandomMovie : builder.query({
            query:()=> ({
                url: `${MOVIE_URL}/random-movies`,
                
            })
        }),

    })
})

export const {useGetAllMoviesQuery, useCreateMovieMutation,useUpdateMovieMutation, useAddMovieReviewMutation, useDeleteCommentMutation, useDeleteMovieMutation, useGetSpecificMovieQuery, useUploadImageMutation, useGetNewMoviesQuery, useGetTopMoviesQuery,useGetRandomMovieQuery} = moviesApi;