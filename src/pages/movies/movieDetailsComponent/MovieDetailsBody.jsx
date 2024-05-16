import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const MovieDetailsBody = () => {
  const { movieCreditsDetailsdata } = useSelector(
    (state) => state.moviesCreditsDetails
  );
  const { movieid, moviename } = useParams();
  const cast = movieCreditsDetailsdata?.cast;
  return (
    <div className=" my-10 px-10">
      <div className="">
        <h1 className="py-5 text-2xl font-semibold text-light-blue-500">
          Top Billed Cast
        </h1>
        <div className="flex w-full ">
          <div className="flex flex-nowrap snap-x overflow-x-scroll">
            <div className="flex ">
              {cast
                ?.filter((ele, ind) => ele.profile_path != null && ind < 10)
                ?.map((contant, ind) => (
                  <div
                    key={ind}
                    className="bg-gray-700 text-white mx-1 scroll-m-1 w-[12em]"
                  >
                    <div>
                      <Link to={`/person/${contant.id}/name/${contant.name}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contant.profile_path}`}
                          alt="logo"
                          className=""
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-3 p-2">
                      <Link to={`/person/${contant.id}/name/${contant.name}`}>
                        <h1 className="text-lg font-medium">{contant.name}</h1>
                      </Link>
                      <p>{contant.character}</p>
                    </div>
                  </div>
                ))}
              <div className="p-5 bg-gray-700 text-white mx-1  text-center content-center">
                <Link to={`/movie/${movieid}/title/${moviename}/cast`}>
                  show more{" "}
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1 16"
                    className="text-3xl "
                    height="1em"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-light-blue-500 m-2 font-medium ">
          <Link to={`/movie/${movieid}/title/${moviename}/cast`}>
            Full Cast & Crew
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsBody;
