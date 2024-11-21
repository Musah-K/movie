import React from 'react';
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import {useGetTopMoviesQuery, useGetAllMoviesQuery} from "../../../../app/api/moviesApi";
import { useGetUsersQuery } from "../../../../app/api/apiSlice";

const Main = () => {

const {data: topMovies} = useGetTopMoviesQuery();
const {data: visitors} = useGetUsersQuery();
const {data: allMovies} = useGetAllMoviesQuery();


const totalCommentLength = allMovies?.map(m => m.numReviews);
const sumOfCommentsLength = totalCommentLength?.reduce((acc,length)=> acc + length, 0);

  return (
    <div>
      <section className="flex justify-around">
        <div className="mt-10 ml-[14rem]">
          <div className="flex -translate-x-4">
            <SecondaryCard pill="Users" content={visitors?.length} info="20.2k more than usual" gradient="from-teal-500 to-lime-400" /> 

            <SecondaryCard pill="Comments" content={sumOfCommentsLength} info="742.8k more than usual" gradient="from-[#CCC514] to-[#CDCB8E]"  />

            <SecondaryCard pill="Movies" content={allMovies?.length} info="372+ more than usual" gradient="from-green-500 to-lime-400" /> 


          </div>

          <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
            <p>Top Content</p>
            <p>Comments</p>
        </div>

          {topMovies?.map(m =>(
            <VideoCard  key={m._id} image={m.image} title={m.name} date={m.year} comment={m.numReviews} />
          ))}

        </div>

        <div>
          <RealTimeCard />
        </div>

      </section>
    </div>
  )
}

export default Main;