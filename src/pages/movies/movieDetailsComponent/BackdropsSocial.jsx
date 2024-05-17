import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../../../redux-system/redux-slices/moviesSlice/movieDetailsSlice";
import { getBackDropsAndPosters } from "../../../redux-system/redux-slices/moviesSlice/movieMediaSlice";

const BackdropsSocial = () => {
  const { movieid } = useParams();

  const { movieDetailsdata } = useSelector((state) => state.moviesDetails);

  const backdropsAndPosterData = useSelector((state) => state.moviesMedia);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetails(movieid));
    dispatch(getBackDropsAndPosters(movieid));
  }, [movieid]);
  return (
    <div className="mt-20">
      <div className="flex p-5 items-center gap-4">
        <div className="w-20">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetailsdata?.poster_path}`}
            alt="movie poster"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-gray-700 text-2xl font-bold dark:text-gray-100">
            {movieDetailsdata?.title}{" "}
            <span className="text-gray-400 text-xl">
              ({movieDetailsdata?.release_date.split("-")[0]})
            </span>
          </h1>
          <Link
            onClick={() => navigate(-1)}
            variant="text"
            className="flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <IoIosArrowRoundBack />
            <span className="text-sm font-light ">Back to main</span>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <h1 className="text-light-blue-500 text-2xl">Social</h1>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BackdropsSocial;
