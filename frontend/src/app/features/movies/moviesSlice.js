import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:'movies',
    initialState: {
        moviesFilter :{
            searchTerm: '',
            selectedGenre:'',
            selectedYear:'',
            selectedSort: [],
        },
        filtedMovies: [],
        movieYears: [],
        uniqueYear : []
    },

    reducers:{
        setMoviesFilter: (state, action)=> {
            state.moviesFilter = {...state.moviesFilter, ...action.payload}
        },

        setFilterdMovies: (state, action) => {
            state.filtedMovies = action.payload
        },

        setMovieYear: (state, action) =>{
            state.movieYears = action.payload;
        },

        setUniqueYear:(state, action) =>{
            state.uniqueYear = action.payload;
        }
    }
     
});

export const {setMoviesFilter, setFilterdMovies, setMovieYear, setUniqueYear } = movieSlice.actions;

export default movieSlice.reducer;
