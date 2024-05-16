import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSeriesSeason } from "../../../redux-system/redux-slices/seriesSlice/seriesSeasonSlice";

const LastSeason = () => {
  const { seriesid, seriesname } = useParams();
  const { seriesDetailsdata } = useSelector((state) => state.seriesDetail);

  const seasonnum = seriesDetailsdata?.seasons?.length - 1;
  const { seriesSeasonData } = useSelector((state) => state.seriesSeasons);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeriesSeason({ seriesid, seasonnum }));
  }, [seriesid, seasonnum]);
  return (
    <div className="container mx-auto flex flex-col px-10 my-5">
      <h1 className="py-5 text-2xl font-semibold text-light-blue-500">
        Last Season
      </h1>
      <div>
        <div className="flex flex-col lg:flex-row  justify-evenly lg:justify-normal bg-gray-700 rounded-md md:w-2/3 lg:w-full">
          <div className="lg:w-1/4  rounded-md">
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${seriesSeasonData?.poster_path}`}
              alt="poster logo"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col p-5 text-white">
            <div className="flex flex-col  lg:flex-row gap-1 items-center">
              <span className="font-bold m-2 text-xl">
                <Link
                  to={`/tv/${seriesid}/name/${seriesname}/season/${seasonnum}`}
                >
                  {seriesSeasonData?.name}
                </Link>
              </span>
              <span className="flex items-center lg:ms-10 border-2 rounded-md bg-white text-gray-700 font-bold h-[25px]">
                <span>
                  <FaRegStar />
                </span>
                <span>{seriesSeasonData?.vote_average}</span>
              </span>
              <span className="mx-4 font-bold text-lg">
                {seriesSeasonData?.air_date?.split("-")[0]} ||{" "}
                {seriesSeasonData?.episodes?.length} Episodes
              </span>
            </div>
            {seriesSeasonData?.overview ? (
              <div className="mt-5">{seriesSeasonData?.overview}</div>
            ) : (
              <div className="mt-5">There is no Overview for this Season</div>
            )}
          </div>
        </div>
      </div>
      <div className="text-light-blue-500 p-2">
        <Link to={`/tv/${seriesid}/name/${seriesname}/seasons`}>
          View All Seasons
        </Link>
      </div>
    </div>
  );
};

export default LastSeason;
