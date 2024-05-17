import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

const MovieAndSeriesSearch = () => {
  const { searchvalue } = useParams();

  const { movieSearchResults } = useSelector((state) => state.searchResult);
  const { seriesSearchResults } = useSelector((state) => state.searchResult);

  return (
    <div className="mt-24">
      <div className="text-center text-2xl">
        search for{" "}
        <span className="text-light-blue-500 font-bold">{searchvalue}</span>
      </div>

      <div className="mt-10 grid grid-cols-13 gap-2 text-center">
        <div className="md:col-span-4 md:col-end-4 mt-2">
          <div className="text-2xl uppercase mt-2">movies</div>
          <div className="flex  flex-wrap justify-evenly gap-5 ">
            {movieSearchResults?.map((ele, ind) => (
              <div key={ind}>
                <Card className="mt-6 w-64 h-[28em] bg-gray-700 text-white ">
                  <CardHeader
                    floated={false}
                    color="transparent"
                    className="h-56"
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
                      variant="h6"
                      color="blue"
                      className="mb-2 text-center"
                    >
                      <span className="uppercase text-white font-medium">
                        title :{" "}
                      </span>
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
        </div>

        <div className="md:col-span-4 md:col-start-7 mt-2">
          <div className="text-2xl uppercase mt-2">series</div>
          <div className="flex  flex-wrap justify-evenly gap-5 ">
            {seriesSearchResults?.map((ele, ind) => (
              <div key={ind}>
                <Card className="mt-6 w-64 h-[28em] bg-gray-700 text-white ">
                  <CardHeader
                    floated={false}
                    color="transparent"
                    className="h-56"
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
                      variant="h6"
                      color="blue"
                      className="mb-2 text-center"
                    >
                      <span className="uppercase text-white font-medium">
                        title :{" "}
                      </span>
                      {ele.name}
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
                    <Link to={`/tv/${ele.id}/name/${ele.name}`}>
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
        </div>
      </div>
      {movieSearchResults?.length == 0 && seriesSearchResults?.length == 0 && (
        <div className="text-center text-2xl font-bold mt-10">
          sorry there is no results about{" "}
          <span className="text-red-500">{searchvalue}</span>
        </div>
      )}
    </div>
  );
};

export default MovieAndSeriesSearch;
