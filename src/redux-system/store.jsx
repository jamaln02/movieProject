import { configureStore } from "@reduxjs/toolkit";
import { movies } from "./redux-slices/moviesSlice/movieSlice";
import { series } from "./redux-slices/seriesSlice/seriesSlice";
import { moviesPage } from "./redux-slices/moviesSlice/moviesPageSlice";
import { seriesPage } from "./redux-slices/seriesSlice/seriesPageSlice";
import { moviesDetails } from "./redux-slices/moviesSlice/movieDetailsSlice";
import { moviesCreditsDetails } from "./redux-slices/moviesSlice/movieDetailsCreditsSlice";
import { moviesRecommendation } from "./redux-slices/moviesSlice/movieRecommendationsSlice";
import { collectionDetails } from "./redux-slices/moviesSlice/partOfCollectionSlice";
import { personDetail } from "./redux-slices/personSlice/personDetailsSlice";
import { movieReview } from "./redux-slices/moviesSlice/movieReviewsSlice";
const store = configureStore({
  reducer: {
    movies,
    series,
    moviesPage,
    seriesPage,
    moviesDetails,
    moviesCreditsDetails,
    moviesRecommendation,
    collectionDetails,
    personDetail,
    movieReview,
  },
});

export default store;
