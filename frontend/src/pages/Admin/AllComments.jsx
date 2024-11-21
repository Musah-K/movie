import React from 'react';
import {useDeleteCommentMutation, useGetAllMoviesQuery} from "../../App/api/moviesApi";
import { toast } from 'react-toastify';

const AllComments = () => {

    const {data: movies, refetch} = useGetAllMoviesQuery();
    const [deleteComment,{isError, isLoading, error}] = useDeleteCommentMutation(); 

    const handleDeleteComment = async({movieId, reviewId})=>{

        try {
            await deleteComment({movieId, reviewId}).unwrap();
            toast.success("Comment deleted");
            refetch();
        
        } catch (error) {

            console.log(isError)
            console.log(isLoading)
            console.error("Error deleting comment:", error || isError.message || isLoading.message)
        }

    }



  return (
    <div>
        {movies?.map(m => (
            <section key={m._id} className='flex flex-col justify-center items-center'>
                {m?.reviews.map(review =>(
                    <div key={review._id} className='bg-[#1A1A1A] rounded w-[50%] mt-[2rem] p-4'>
                        <div className='flex justify-between'>
                            <strong className='text-[#B0B0B0'>{review.name}</strong>
                            <p className='text-[#B0B0B0'>{review.createdAt.substring(0,10)}</p>
                        </div>

                        <p>{review.comment}</p>
                        <button  className="text-red-500" onClick={()=>handleDeleteComment({movieId: m._id, reviewId:review._id})}>Delete</button>
                    </div>
                ))}
            </section>
        ))}
    </div>
  )
}

export default AllComments;