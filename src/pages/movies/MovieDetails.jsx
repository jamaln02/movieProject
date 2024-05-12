import React, { useEffect } from "react";
import MovieDetailsHeader from "./movieDetailsComponent/MovieDetailsHeader";
import MovieDetailsBody from "./movieDetailsComponent/MovieDetailsBody";
import MovieDetailsSidBar from "./movieDetailsComponent/MovieDetailsSidBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import SocialMovieDetails from "./movieDetailsComponent/SocialMovieDetails";
import MediaMovieDetails from "./movieDetailsComponent/MediaMovieDetails";
import PartOfCollection from "./movieDetailsComponent/PartOfCollection";
import { getCreditsDetails } from "../../redux-system/redux-slices/moviesSlice/movieDetailsCreditsSlice";
import MovieDetailsRecommendations from "./movieDetailsComponent/MovieDetailsRecommendations";

const MovieDetails = () => {
  const { movieid } = useParams();

  const { movieDetailsLoading } = useSelector(
    (state) => state.moviesCreditsDetails
  );
  const { movieCreditsDetailsLoading } = useSelector(
    (state) => state.moviesCreditsDetails
  );
  const { movieCreditsDetailsdata } = useSelector(
    (state) => state.moviesCreditsDetails
  );

  console.log(movieCreditsDetailsdata);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCreditsDetails(movieid));
  }, [movieid]);

  return (
    <div>
      {movieDetailsLoading && movieCreditsDetailsLoading ? (
        <ReactLoading
          className="mx-auto h-screen"
          type={"dots"}
          color={"blue"}
          height={"50%"}
          width={"50%"}
        />
      ) : (
        <div className="">
          <MovieDetailsHeader />
          <div className="md:grid md:grid-cols-8">
            <div className="col-span-6 col-end-7">
              <MovieDetailsBody />
              <SocialMovieDetails />
              <MediaMovieDetails />
              <PartOfCollection />
              <MovieDetailsRecommendations />
            </div>
            <div className=" col-start-7 col-end-13">
              <MovieDetailsSidBar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
