import React from 'react';
import { Link } from 'react-router-dom';

const MovieTabs = ({loadingMovieReview, userInfo, submitHandler, rating, setRating, comment, setComment, movie}) => {
  return (
    <div>
        <section>
            {userInfo ? (
                <form onSubmit={submitHandler}>
                    <div className="my-2">
                        <label htmlFor="comment" className='block text-lg mb-2'>Write Your Review</label>
                        <textarea name="comment" id="comment" rows="3" cols="12"  required value={comment} onChange={(e)=>setComment(e.target.value)} 
                        className='p-2 border rounded-lg xl:w-[40rem] text-black'/>
                                      
                    </div>
                    <div className="my-2">
                        <label htmlFor="rating" className='block text-lg mb-2'>Rate the Movie</label>
                        <input type="text" required value={rating} onChange={(e)=>setRating(e.target.value)}
                        className='p-2 rounded' placeholder='Rate from 1 - 5' />
                        
                       
                    </div>

                    <button type='submit' className='bg-teal-600 text-white py-2 px-3 rounded-lg'>Submit</button>


                </form>) : (<p>Please <Link to="/">Sign In</Link> to write a review.</p>)}
        </section>

        <section className='mt-[3rem]'>
            <div>{movie?.reviews.length === 0 && <p>No reviews</p>}</div>

                <div>
                    {movie?.reviews.map(review => (<div 
                    key={review._id} className='bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]'>
                        <div className='flex justify-between'>
                            <strong className='text-[#B0B0B0]'>{review.name}</strong>
                            <p className='text-[#B0B0B0]'>{review.createdAt.substring(0,10)}</p>
                        </div>

                        <p className='my-4'>{review.comment}</p>
                </div>))}
            </div>
        </section>
    </div>
  )
}

export default MovieTabs