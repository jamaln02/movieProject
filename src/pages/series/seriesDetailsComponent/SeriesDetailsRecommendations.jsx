import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSeriesRecommendations } from "../../../redux-system/redux-slices/seriesSlice/seriesRecommendationsSlice";

const SeriesDetailsRecommendations = () => {
  const { seriesid, seriesname } = useParams();
  const { seriesRecommendationsData } = useSelector(
    (state) => state.seriesRecommendation
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeriesRecommendations(seriesid));
  }, [seriesid]);
  return (
    <div className="mx-10 my-10">
      <div className="text-2xl text-light-blue-500 font-semibold my-5">
        Recommendations
      </div>
      <div className="flex w-full ">
        <div className="flex flex-nowrap snap-x overflow-x-scroll">
          <div className="flex">
            {seriesRecommendationsData?.map((contant, ind) => (
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
                    <Link to={`/series/${contant?.id}/name/${contant?.name}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contant?.poster_path}`}
                        alt="logo"
                        className=""
                      />
                    </Link>
                  )}
                </div>
                <div className="flex items-center justify-between mb-0 pb-0 ">
                  <h1 className="text-lg font-medium">{contant.name}</h1>
                  <p className="text-light-blue-700 font-semibold">
                    {Math.round(contant.vote_average * 10)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsRecommendations;
