import { Route, Routes } from "react-router-dom";
import { Header } from "./component/Header";
import Home from "./pages/home";
import Movies from "./pages/movies";
import Series from "./pages/series";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieDetails from "./pages/movies/MovieDetails";
import SeriesDetails from "./pages/series/SeriesDetails";
import PersonDetails from "./pages/persons/PersonDetails";
import AllPersonsDetails from "./pages/persons/AllPersonsMovieDetails";
import MovieReviews from "./pages/movies/movieDetailsComponent/MovieReviews";
import AllCollections from "./pages/movies/movieDetailsComponent/AllCollections";
import Footer from "./component/Footer";
import SeriesReviews from "./pages/series/seriesDetailsComponent/SeriesReviews";
import BackdropsSocial from "./pages/movies/movieDetailsComponent/BackdropsSocial";
import AllSeriesPersonsDetails from "./pages/persons/AllPersonsSeriesDetails";
import SeriesSeason from "./pages/series/seriesDetailsComponent/SeriesSeason";
import EpisodeDetails from "./pages/series/seriesDetailsComponent/EpisodeDetails";
import AllSeriesSeasons from "./pages/series/seriesDetailsComponent/AllSeriesSeasons";

import MovieAndSeriesSearch from "./pages/search/MovieAndSeriesSearch";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="bg-blue-gray-50 dark:bg-gray-900 dark:text-white">
      <div className=" flex justify-center ">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route
          path="/movie/:movieid/title/:moviename"
          element={<MovieDetails />}
        />
        <Route
          path="/movie/:movieid/title/:moviename/cast"
          element={<AllPersonsDetails />}
        />
        <Route
          path="/movie/:movieid/title/:moviename/reviews"
          element={<MovieReviews />}
        />
        <Route
          path="/collection/:movieid/title/:moviename"
          element={<AllCollections />}
        />
        <Route
          path="/movie/:movieid/title/:moviename/images/backdrops"
          element={<BackdropsSocial />}
        />

        <Route path="/series" element={<Series />} />
        <Route
          path="/tv/:seriesid/name/:seriesname"
          element={<SeriesDetails />}
        />
        <Route
          path="/tv/:seriesid/name/:seriesname/cast"
          element={<AllSeriesPersonsDetails />}
        />
        <Route
          path="/person/:personid/name/:personname"
          element={<PersonDetails />}
        />
        <Route
          path="/tv/:seriesid/name/:seriesname/seasons"
          element={<AllSeriesSeasons />}
        />

        <Route
          path="/tv/:seriesid/name/:seriesname/season/:seasonid"
          element={<SeriesSeason />}
        />
        <Route
          path="/tv/:seriesid/season/:seasonid/episode/:episodeid"
          element={<EpisodeDetails />}
        />
        <Route
          path="/tv/:seriesid/name/:seriesname/reviews"
          element={<SeriesReviews />}
        />
        <Route
          path="/search/for/:searchvalue"
          element={<MovieAndSeriesSearch />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
