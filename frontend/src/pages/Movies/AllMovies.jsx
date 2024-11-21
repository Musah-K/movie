import React, {useEffect} from 'react';
import { useGetAllMoviesQuery } from '../../App/api/moviesApi';
import { useAllGenresQuery } from '../../App/api/genreApi';
import { useGetNewMoviesQuery, useGetTopMoviesQuery, useGetRandomMovieQuery } from '../../App/api/moviesApi';
import MovieCard from './MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import banner from '../../assets/download.jpg';
import {setMoviesFilter, setFilterdMovies, setMovieYear, setUniqueYear } from '../../App/features/movies/moviesSlice'

const AllMovie = () => {

  const dispatch = useDispatch();
  const {data} = useGetAllMoviesQuery();
  const {data: genres} = useAllGenresQuery();
  const {data:newMovies} =useGetNewMoviesQuery();
  const {data: randomMovies} = useGetRandomMovieQuery();
  const {data: topMovies} = useGetTopMoviesQuery();

  const {moviesFilter, filtedMovies } =useSelector(state => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(()=>{

    dispatch(setFilterdMovies(data || []));
    dispatch(setMovieYear(movieYears));
    dispatch(setUniqueYear(uniqueYears));

  },[data, dispatch]);


  const handleSearchChange = (e) =>{
    dispatch(setMoviesFilter({searchTerm: e.target.value}));

    const filtedMovies = data.filter(movie => movie.name.toLowerCase().includes(e.target.value.toLowerCase()));

    dispatch(setFilterdMovies(filtedMovies));
  };

  const handleGenreClick =(genreId) =>{
    const filterByGenre = data.filter(movie => movie.genre === genreId);
    dispatch(setFilterdMovies(filterByGenre));
  };

  const handleYearChange = year =>{
    const filtedYear = data.filter(movie => movie.year === +year);
    dispatch(setFilterdMovies(filtedYear));
  };

  const handleSortChange = (selectedValue) => {

    // dispatch(setMoviesFilter({ selectedSort: selectedValue }));

      switch(selectedValue){

        case "new":
           dispatch(setFilterdMovies(newMovies))
          break;

        case "top": 
          dispatch(setFilterdMovies(topMovies))
          break;

        case "random": 
          dispatch(setFilterdMovies(randomMovies))
          break;

        default:
          dispatch(setFilterdMovies([]))
          break;

      }
  };



  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]'>

      <>
      <section className='mb-10'>

        <div className='relative h-[39rem] w-screen mb-10 flex items-center justify-center bg-cover'
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
        > 
          <div className='absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60'></div>

          <div className='relative z-10 text-center text-white mt-[10rem]' >
            <h1 className='text-8xl font-bold mb-4'>The Movies Hub</h1>
            <p className='text-2xl'>
              Cinematic Odyssey: Unveiling the magic of Movies
            </p>
          </div>

          <section className='absolute -bottom-[5rem]'>
            <input type="text"
            className='w-[100%] h-[5rem] border px-10 outline-none rounded' placeholder='Search Movie' value={moviesFilter.seachTerm}
            onChange={handleSearchChange}
             />
             <section className='mt-[2rem] sorts-container ml-[10rem] w-[30rem]'>
              <select className='border p-2 rounded text-black' value={moviesFilter.selectedGenre} onChange={(e)=>handleGenreClick(e.target.value)}>
                <option value="">Genres</option>
                {genres?.map(g=>( <option key={g._id} value={g._id}>{g.name}</option>))}
              </select>

              <select className='border p-2 rounded text-black ml-2'  value={moviesFilter.selectedYear} onChange={(e)=>handleYearChange(e.target.value)}>
                <option value="">Year</option>
                {uniqueYears?.map(y=>(<option key={y} value={y}>{y}</option>))}
              </select>

              <select className='border p-2 rounded text-black ml-2'  
              // value={moviesFilter.selectedSort}
              onChange={(e)=>handleSortChange(e.target.value)}
              >

                <option value="">Sort By</option>
                <option value="new">New Movies</option>
                <option value="top">Top Movies</option>
                <option value="random">Random Movies</option>

              </select>

             </section>

          </section>

        </div>

        <section className='mt-[10rem] w-screen flex justify-center items-center flex-wrap'>
          {filtedMovies?.map(m=>(<MovieCard key={m._id} movie={m} />))}
        </section>


      </section></>
    </div>
  )
}

export default AllMovie;