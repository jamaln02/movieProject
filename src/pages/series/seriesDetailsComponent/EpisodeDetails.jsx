import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getCastAndCrew,
  getEpisodeDetails,
} from "../../../redux-system/redux-slices/seriesSlice/episodeDetailsSlice";
import { IoIosArrowRoundBack } from "react-icons/io";

const EpisodeDetails = () => {
  const { seriesid, seasonid, episodeid } = useParams();

  const { episodeDetailsData } = useSelector((state) => state.episodeDetail);
  const { castAndCrewData } = useSelector((state) => state.episodeDetail);
  console.log(castAndCrewData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEpisodeDetails({ seriesid, seasonid, episodeid }));
    dispatch(getCastAndCrew({ seriesid, seasonid, episodeid }));
  }, [episodeid]);

  return (
    <div className="mt-20 ">
      <div className="flex p-5 items-center gap-4 ">
        <div className="w-20">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${episodeDetailsData?.still_path}`}
            alt="movie poster"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-gray-700 text-2xl font-bold dark:text-gray-100">
            {episodeDetailsData?.name}{" "}
            <span className="text-gray-400 text-xl">
              ({episodeDetailsData?.air_date.split("-")[0]})
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
      <div className=" p-2">
        <h1 className="text-3xl font-bold text-blue-700 p-3">Cast & Crew </h1>
        <h1 className="text-2xl font-bold p-5">
          Cast{" "}
          <span className="text-light-blue-500">
            {castAndCrewData?.cast?.length}
          </span>
        </h1>
        <div className="flex flex-wrap justify-evenly items-center gap-4">
          {castAndCrewData?.cast?.map((ele, ind) => (
            <div
              key={ind}
              className="flex items-center w-2/3 md:w-2/5  lg:justify-normal lg:w-3/12 bg-gray-700  gap-4 lg:gap-1 rounded-md"
            >
              {ele.profile_path ? (
                <Link to={`/person/${ele.id}/name/${ele.name}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele.profile_path}`}
                    alt="profile photo"
                    width={120}
                    className="rounded-md"
                  />
                </Link>
              ) : (
                <Link to={`/person/${ele.id}/name/${ele.name}`}>
                  <img
                    src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                    alt="profile photo"
                    width={140}
                    className="rounded-md"
                  />
                </Link>
              )}

              <div className="">
                <h1 className="text-lg text-white font-semibold text-center">
                  <Link to={`/person/${ele.id}/name/${ele.name}`}>
                    {ele?.name}
                  </Link>
                </h1>
                <p className="text-gray-300 dark:text-gray-200 text-center">
                  {ele.character}
                </p>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold p-5">
          Crew{" "}
          <span className="text-light-blue-500">
            {castAndCrewData?.crew?.length}
          </span>
        </h1>

        <div className="flex flex-wrap justify-evenly items-center gap-4">
          {castAndCrewData?.crew.length !== 0 ? (
            castAndCrewData?.crew?.map((contatnt) => (
              <div
                key={contatnt.credit_id}
                className="flex items-center w-2/3 md:w-2/5  lg:justify-normal lg:w-3/12 bg-gray-700 gap-4 lg:gap-1 rounded-md"
              >
                {contatnt.profile_path ? (
                  <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contatnt?.profile_path}`}
                      alt="profile photo"
                      width={120}
                      className="rounded-md"
                    />
                  </Link>
                ) : (
                  <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                    <img
                      src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                      alt="profile photo"
                      width={140}
                      className="rounded-md"
                    />
                  </Link>
                )}

                <div className="w-3/4 ">
                  <h1 className="text-lg text-white font-semibold text-center">
                    <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                      {contatnt?.name}
                    </Link>
                  </h1>

                  <p className="text-gray-300 text-center">
                    {contatnt?.character}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-lg">
              There are no crew records added to{" "}
              <span className="text-light-blue-500">
                {episodeDetailsData?.name}
              </span>
              .
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
