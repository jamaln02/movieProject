import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCreditsDetails } from "../../redux-system/redux-slices/seriesSlice/seriesDetailsCreditsSlice";
import ReactLoading from "react-loading";
import SeriesDetailsHeader from "./seriesDetailsComponent/SeriesDetailsHeader";
import SeriesDetailsBody from "./seriesDetailsComponent/SeriesDetailsBody";
import LastSeason from "./seriesDetailsComponent/LastSeason";
import SocialSeriesDetails from "./seriesDetailsComponent/SocialSeriesDetails";

const SeriesDetails = () => {
  const { seriesid } = useParams();

  const { seriesDetailsLoading } = useSelector(
    (state) => state.seriesCreditsDetail
  );
  const { seriesCreditsDetailsLoading } = useSelector(
    (state) => state.seriesCreditsDetail
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCreditsDetails(seriesid));
  }, [seriesid]);

  return (
    <div>
      {seriesDetailsLoading && seriesCreditsDetailsLoading ? (
        <ReactLoading
          className="mx-auto h-screen"
          type={"dots"}
          color={"blue"}
          height={"50%"}
          width={"50%"}
        />
      ) : (
        <div className="">
          <SeriesDetailsHeader />;
          <div className="md:grid md:grid-cols-8">
            <div className="col-span-6 col-end-7">
              <SeriesDetailsBody />
              <LastSeason />
              <SocialSeriesDetails />
              {/* <MediaMovieDetails />
            <PartOfCollection />
            <MovieDetailsRecommendations /> */}
            </div>
            <div className=" col-start-7 col-end-13">
              {/* <MovieDetailsSidBar /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SeriesDetails;
