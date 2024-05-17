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
import { seriesDetail } from "./redux-slices/seriesSlice/seriesDetailsSlice";
import { seriesCreditsDetail } from "./redux-slices/seriesSlice/seriesDetailsCreditsSlice";
import { seriesSeasons } from "./redux-slices/seriesSlice/seriesSeasonSlice";
import { seriesReview } from "./redux-slices/seriesSlice/seriesReviewsSlice";
import { moviesMedia } from "./redux-slices/moviesSlice/movieMediaSlice";
import { seriessMedia } from "./redux-slices/seriesSlice/seriesMediaSlice";
import { seriesRecommendation } from "./redux-slices/seriesSlice/seriesRecommendationsSlice";
import { episodeDetail } from "./redux-slices/seriesSlice/episodeDetailsSlice";
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
    seriesDetail,
    seriesCreditsDetail,
    seriesSeasons,
    seriesReview,
    moviesMedia,
    seriessMedia,
    seriesRecommendation,
    episodeDetail,
  },
});

export default store;
