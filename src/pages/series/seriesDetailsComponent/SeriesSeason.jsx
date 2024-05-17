import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSeriesDetails } from "../../../redux-system/redux-slices/seriesSlice/seriesDetailsSlice";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getSeriesSeason } from "../../../redux-system/redux-slices/seriesSlice/seriesSeasonSlice";
import { FaRegStar } from "react-icons/fa";
const SeriesSeason = () => {
  const { seriesid, seriesname, seasonid } = useParams();
  const { seriesDetailsdata } = useSelector((state) => state.seriesDetail);
  const { seriesSeasonData } = useSelector((state) => state.seriesSeasons);
  const { seriesSeasonLoading } = useSelector((state) => state.seriesSeasons);
  let seasonDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeriesDetails(seriesid));
    dispatch(getSeriesSeason({ seriesid, seasonid }));
  }, [seriesid]);
  return (
    <div className="md:mt-20 mt-14 container mx-auto">
      {" "}
      <div className="flex p-5 items-center gap-4 ">
        <div className="w-20">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${seriesDetailsdata?.poster_path}`}
            alt="movie poster"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-gray-700 md:text-2xl text-lg font-bold dark:text-gray-100">
            {seriesDetailsdata?.name}{" "}
            <span className="text-gray-400 md:text-xl text-base">
              ({seasonid})
            </span>
          </h1>
          <Link
            onClick={() => navigate(-1)}
            variant="text"
            className="flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <IoIosArrowRoundBack />
            <span className="text-xs md:text-sm font-light ">Back to main</span>
          </Link>
        </div>
      </div>
      <div>
        {seriesSeasonData?.episodes.map((ele, ind) => (
          <div key={ind}>
            <div className="flex flex-col md:flex-row mt-5 mx-5 mb-2 justify-evenly gap-4 bg-gray-700 rounded-md  md:w-11/12 ">
              <div className="rounded-md lg:w-[15%] md:w-[80%]  ">
                {ele?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.poster_path}`}
                    alt="poster logo"
                    className="rounded-md w-fit"
                  />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.still_path}`}
                    alt="poster logo"
                    className="rounded-md w-fit"
                  />
                )}
              </div>
              <div className="flex flex-col md:p-2 text-white lg:w-2/3 text-center">
                <div className="flex flex-col  md:flex-row gap-1 items-center ">
                  <span className="font-bold m-2 text-2xl text-light-blue-500">
                    {ele?.episode_number}
                  </span>
                  <span className="flex items-center lg:ms-10 border-2 rounded-md bg-white text-gray-700 font-bold h-[25px]">
                    <span>
                      <FaRegStar />
                    </span>
                    <span>{ele?.vote_average}</span>
                  </span>
                  <span className="mx-4 font-bold text-lg  lg:text-2xl">
                    {ele?.name}
                  </span>
                </div>
                {ele?.overview ? (
                  <div className="md:mt-5 mt-2 text-base lg:text-lg">
                    {ele?.overview}
                  </div>
                ) : (
                  <div className="md:mt-5 mt-2">
                    There is no Overview for this Season
                  </div>
                )}
              </div>

              <div className="lg:w-1/5  p-2 md:p-5 text-light-blue-500 font-bold text-center">
                <span className="block">
                  {
                    (seasonDate = new Date(ele.air_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    ))
                  }
                </span>
                {ele?.runtime && (
                  <span>
                    {ele?.runtime}
                    {"  "}min
                  </span>
                )}
              </div>
            </div>
            <div className="text-light-blue-500 mx-10 mt-0">
              <Link
                to={`/tv/${seriesid}/season/${seasonid}/episode/${ele.episode_number}`}
              >
                Full Cast & Crew
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesSeason;
