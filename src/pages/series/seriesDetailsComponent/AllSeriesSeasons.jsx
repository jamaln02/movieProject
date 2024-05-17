import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSeriesDetails } from "../../../redux-system/redux-slices/seriesSlice/seriesDetailsSlice";
import { FaRegStar } from "react-icons/fa";

const AllSeriesSeasons = () => {
  const { seriesid, seriesname } = useParams();
  const { seriesDetailsdata } = useSelector((state) => state.seriesDetail);
  console.log(seriesDetailsdata);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let seasonDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  useEffect(() => {
    dispatch(getSeriesDetails(seriesid));
  }, [seriesid]);
  return (
    <div className="mt-20">
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
              ({seriesDetailsdata?.first_air_date.split("-")[0]})
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
      <div className="">
        {seriesDetailsdata?.seasons.map((ele, ind) => (
          <div key={ind} className="ms-10 ">
            <div className="flex flex-col md:flex-row mt-5 mx-5 mb-2 lg:gap-4 bg-gray-700 rounded-md w-3/4 md:w-5/6 lg:w-11/12 p-2 md:p-0">
              <div className="rounded-md">
                {ele?.poster_path ? (
                  <Link
                    to={`/tv/${seriesid}/name/${seriesname}/season/${ele?.season_number}`}
                  >
                    {" "}
                    <img
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.poster_path}`}
                      alt="poster logo"
                      className="rounded-md w-fit lg:w-[150px]"
                    />
                  </Link>
                ) : (
                  <Link
                    to={`/tv/${seriesid}/name/${seriesname}/season/${ele?.season_number}`}
                  >
                    <img
                      src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                      alt="poster logo"
                      className="rounded-md w-fit lg:w-[170px]"
                    />
                  </Link>
                )}
              </div>
              <div className="flex flex-col md:p-2 text-white md:w-11/12 lg:w-5/6 text-center lg:text-start lg:mt-10 md:justify-around justify-normal">
                <div className="flex lg:flex-row gap-1 md:gap-4 items-center p-2 flex-wrap md:flex-nowrap justify-evenly md:justify-normal">
                  <span className="mx-2 font-bold text-base  md:text-xl lg:text-2xl text-nowrap">
                    {ele?.name}
                  </span>
                  {ele.vote_average !== 0 && (
                    <span className="flex items-center px-4  lg:ms-8 border-2 rounded-md bg-white text-gray-700 font-bold h-[25px]">
                      <span>
                        <FaRegStar />
                      </span>
                      <span>{ele?.vote_average}</span>
                    </span>
                  )}
                  <span className="text-lg lg:mx-2">
                    {ele?.air_date !== null && ele?.air_date?.split("-")[0]}
                  </span>{" "}
                  |{" "}
                  <span className="font-bold md:mx-2 text-nowrap">
                    {ele?.episode_count} Episodes
                  </span>
                </div>

                <div className=" text-base md:text-lg ">
                  Season{" "}
                  <span className="text-light-blue-500 font-bold">
                    {ele?.season_number}
                  </span>{" "}
                  of{" "}
                  <span className="underline underline-offset-4 mx-1">
                    {seriesDetailsdata?.name}
                  </span>{" "}
                  premiered on
                  <span className="text-light-blue-500 mx-2 md:mx-3 font-bold">
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
                </div>
                {ele?.overview ? (
                  <div className="md:mt-5 mt-2 text-base md:text-lg">
                    {ele?.overview}
                  </div>
                ) : (
                  <div className="md:my-5 my-2">
                    There is no Overview for this Season.
                  </div>
                )}
              </div>

              {/* <div className="lg:w-1/5 p-2 md:p-5 text-light-blue-500 font-bold text-center">
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
              </div> */}
            </div>
            <div className="text-light-blue-500 mx-10 mt-0">
              {/* <Link
                to={`/tv/${seriesid}/season/${seasonid}/episode/${ele.episode_number}`}
              >
                Full Cast & Crew
              </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSeriesSeasons;
