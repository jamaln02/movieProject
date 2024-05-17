import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../redux-system/redux-slices/moviesSlice/movieSlice";
import { getAllSeries } from "../../redux-system/redux-slices/seriesSlice/seriesSlice";
import HomeSliders from "./component/HomeSliders";
import TopContent from "./component/TopContent";
import HomeHeader from "./component/Header";

const Home = () => {
  const { movies } = useSelector((state) => state.movies);
  const { series } = useSelector((state) => state.series);
  const { topMovies } = useSelector((state) => state.movies);
  const { topSeries } = useSelector((state) => state.series);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getAllSeries());
  }, []);

  return (
    <div className="pt-20  dark:text-white">
      <HomeHeader />
      <HomeSliders data={movies} name={"movies"} />
      <HomeSliders data={series} name={"series"} />
      <TopContent data={topMovies} name={"movies"} />
      <TopContent data={topSeries} name={"series"} />
    </div>
  );
};

export default Home;
