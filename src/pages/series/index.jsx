import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

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
import {
  getSeriesPage,
  decrement,
  increment,
} from "../../redux-system/redux-slices/seriesSlice/seriesPageSlice";

const Series = () => {
  const { seriesPageData } = useSelector((state) => state.seriesPage);
  const { seriesPageLoading } = useSelector((state) => state.seriesPage);
  const { count } = useSelector((state) => state.seriesPage);
  console.log(count);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeriesPage(count));
  }, [count]);

  return (
    <div className="pt-24 mt-3 h-full">
      {seriesPageLoading ? (
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
            <h1>SERIES</h1>
            <h1>
              PAGE NUMBER <span className="text-light-blue-500">{count}</span>{" "}
              FROM <span className="text-light-blue-500">{500}</span>
            </h1>
          </div>
          <div className="flex flex-wrap justify-evenly gap-5">
            {seriesPageData.map((ele, ind) => (
              <div key={ind}>
                <Card className="mt-6 w-72 h-full bg-gray-700 text-white">
                  <CardHeader
                    floated={false}
                    color="transparent"
                    className="h-80"
                  >
                    <img
                      src={`https://media.themoviedb.org/t/p/w220_and_h330_face${ele.backdrop_path}`}
                      alt="card-image"
                      className="w-full"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography
                      variant="h5"
                      color="blue"
                      className="mb-2 text-center"
                    >
                      {ele.name}
                    </Typography>
                    <div className="flex justify-between items-center ">
                      <>
                        Rate:{" "}
                        <span className="text-blue-700 font-semibold text-lg">
                          {ele.vote_average}
                        </span>
                      </>
                      <div>
                        <StarRatings
                          className="flex"
                          rating={ele.vote_average}
                          starRatedColor="yellow"
                          // changeRating={changeRating}
                          numberOfStars={5}
                          starDimension="20px"
                          starSpacing="2px"
                          name="rating"
                        />
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="pt-0 text-center">
                    <Link to={`/series/${ele.id}/name/${ele.name}`}>
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
          <div className="flex justify-center py-16 gap-5 items-center">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => dispatch(decrement(count))}
              disabled={count === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-gray-900">{count}</strong> of{"  "}
              <strong className="text-gray-900">500</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => dispatch(increment(count))}
              disabled={count === 500}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Series;
