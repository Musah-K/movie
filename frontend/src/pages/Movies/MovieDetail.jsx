import React,{ useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {toast } from 'react-toastify';
import {useGetSpecificMovieQuery, useAddMovieReviewMutation} from '../../App/api/moviesApi';
import MovieTabs from './MovieTabs';


const MovieDetail = () => {
  const {id: movieId} = useParams();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const {data:movie, refetch} = useGetSpecificMovieQuery(movieId);
  const {userInfo} = useSelector(state => state.auth);
  const [createReview, {isLoading:loadingMovieReview}] = useAddMovieReviewMutation();

  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();
      refetch();

      toast.success("Review created successifully")

    } catch (error) {
      console.error(error);
      toast.error(error.data || error.message);

    }
  }


  return (
    <>
      <div>
        <Link to='/' className='text-white font-semibold hover:underline ml-[20rem]'>Go Back</Link>
      </div>
      <div className='mt-[2rem]'>
        <div className="flex justify-center items-center">
          <img src={movie?.image} alt={movie?.name} className='w-[40%] rounded' />
        </div>

        <div className="container flex justify-between ml-[2rem] mt-[3rem]">

          <section>
            <h2 className='text-5xl my-4 font-extrabold'>{movie?.name}</h2>
            <p className='my-4 xl:w-[35rem] lg:w-[35rem] md:w-[35rem]'>{movie?.detail}</p>
          </section>

          <div className='mr-[3rem]'>
            <p className='text-2xl font-semibold'>
              Release Date: {movie?.year}
            </p>

            <div>
              {movie?.cast.map(c=>(<ul key={c._id}>
                <li className='mt-[1rem]'>{c}</li>
              </ul>))}
            </div>

          </div>

        </div>

        <div className='container ml-[2rem] mt-5'>
          <MovieTabs loadingMovieReview={loadingMovieReview} userInfo={userInfo}
           submitHandler={submitHandler} 
           rating={rating} setRating={setRating} comment={comment} setComment={setComment} movie={movie}></MovieTabs>
        </div>


      </div>
    </>
  )
}

export default MovieDetail;