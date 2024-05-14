import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieRecommendations } from "../../../redux-system/redux-slices/moviesSlice/movieRecommendationsSlice";
import { Link, useParams } from "react-router-dom";

const MovieDetailsRecommendations = () => {
  const { movieid, moviename } = useParams();
  const { movieRecommendationsData } = useSelector(
    (state) => state.moviesRecommendation
  );
  console.log(movieRecommendationsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieRecommendations(movieid));
  }, [movieid]);
  return (
    <div className="mx-10 my-10">
      <div className="text-2xl text-light-blue-500 font-semibold my-5">
        Recommendations
      </div>
      <div className="flex w-full ">
        <div className="flex flex-nowrap snap-x overflow-x-scroll">
          <div className="flex">
            {movieRecommendationsData?.map((contant, ind) => (
              <div
                key={ind}
                className="bg-gray-700 text-white mx-1 scroll-m-1 w-[16em]  flex flex-col justify-between py-3 rounded-md px-2"
              >
                <div>
                  {contant?.backdrop_path ? (
                    <Link to={`/movie/${contant?.id}/title/${contant?.title}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contant?.backdrop_path}`}
                        alt="logo"
                        className=""
                      />
                    </Link>
                  ) : (
                    <Link to={`/movie/${contant?.id}/title/${contant?.title}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contant?.poster_path}`}
                        alt="logo"
                        className=""
                      />
                    </Link>
                  )}
                </div>
                <div className="flex items-center justify-between mb-0 pb-0 ">
                  <h1 className="text-lg font-medium">{contant.title}</h1>
                  <p className="text-light-blue-700 font-semibold">
                    {Math.round(contant.vote_average * 10)}%
                  </p>
                </div>
              </div>
            ))}
            {/* <div className="p-5 bg-gray-700 text-white mx-1  text-center content-center">
              <Link>
                show more{" "}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="text-3xl"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                  ></path>
                </svg>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsRecommendations;
