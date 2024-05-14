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
import AllPersonsDetails from "./pages/persons/AllPersonsDetails";
import MovieReviews from "./pages/movies/movieDetailsComponent/MovieReviews";
import AllCollections from "./pages/movies/movieDetailsComponent/AllCollections";
import Footer from "./component/Footer";
import SeriesReviews from "./pages/series/seriesDetailsComponent/SeriesReviews";

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

        <Route path="/series" element={<Series />} />
        <Route
          path="/series/:seriesid/name/:seriesname"
          element={<SeriesDetails />}
        />
        <Route path="/tv/:seriesid/name/:seriesname/cast" />
        <Route
          path="/person/:personid/name/:personname"
          element={<PersonDetails />}
        />
        <Route path="/tv/seriesid/name/:seriesname/season/:seasonid" />
        <Route path="/tv/:seriesid/name/:seriesname/seasons" />
        <Route
          path="/tv/:seriesid/name/:seriesname/reviews"
          element={<SeriesReviews />}
        />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
