import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  getMoviesPage,
  increment,
} from "../../redux-system/redux-slices/moviesSlice/moviesPageSlice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import ReactLoading from "react-loading";
const Movies = () => {
  const { moviesPageData } = useSelector((state) => state.moviesPage);
  const { moviesPageLoading } = useSelector((state) => state.moviesPage);
  const { count } = useSelector((state) => state.moviesPage);
  console.log(count);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMoviesPage(count));
  }, [count]);

  return (
    <div className="pt-24 h-full">
      {moviesPageLoading ? (
        <ReactLoading
          className="mx-auto h-screen"
          type={"bubbles"}
          color={"blue"}
          height={"50%"}
          width={"50%"}
        />
      ) : (
        <div>
          {" "}
          <div className="text-center text-2xl font-bold">
            <h1>MOVIES</h1>
            <h1>
              PAGE NUMBER <span className="text-light-blue-500">{count}</span>{" "}
              FROM <span className="text-light-blue-500">{500}</span>
            </h1>
          </div>
          <div className="flex flex-wrap justify-evenly gap-5">
            {moviesPageData.map((ele, ind) => (
              <div key={ind}>
                <Card className="mt-6 w-72 h-full bg-gray-700 text-white">
                  <CardHeader
                    floated={false}
                    color="transparent"
                    className="h-80"
                  >
                    {ele.backdrop_path ? (
                      <img
                        src={`https://media.themoviedb.org/t/p/w220_and_h330_face${ele.backdrop_path}`}
                        alt="card-image"
                        className="w-full"
                      />
                    ) : (
                      <img
                        src={`https://media.themoviedb.org/t/p/w220_and_h330_face${ele.poster_path}`}
                        alt="card-image"
                        className="w-full"
                      />
                    )}
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue"
                      className="mb-2 text-center"
                    >
                      {ele.title}
                    </Typography>
                    <div className="flex justify-between items-center ">
                      <>
                        Rate:{" "}
                        <span className="text-blue-700 font-semibold text-lg">
                          {ele.vote_average}
                        </span>
                      </>

                      <StarRatings
                        className="flex"
                        rating={ele.vote_average}
                        starRatedColor="yellow"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                        name="rating"
                      />
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0 text-center">
                    <Link to={`/movie/${ele.id}/title/${ele.title}`}>
                      <Button
                        color="light-blue"
                        variant="outlined"
                        className="hover:bg-light-blue-500 hover:text-white font-semibold text-sm "
                      >
                        Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-16 gap-5 items-center ">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => dispatch(decrement(count))}
              disabled={count === 1}
              className="dark:border-white"
            >
              <ArrowLeftIcon
                strokeWidth={2}
                className="h-4 w-4 dark:text-white "
              />
            </IconButton>
            <Typography color="gray" className="font-normal dark:text-white">
              Page{" "}
              <strong className="text-gray-900 dark:text-white">{count}</strong>{" "}
              of{"  "}
              <strong className="text-gray-900 dark:text-white">500</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => dispatch(increment(count))}
              disabled={count === 500}
              className="dark:border-white"
            >
              <ArrowRightIcon
                strokeWidth={2}
                className="h-4 w-4 dark:text-white"
              />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
