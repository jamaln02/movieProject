import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

const TopContent = ({ data, name }) => {
  console.log(data);
  return (
    <div className="container mx-auto my-10 ">
      <div className="uppercase text-2xl md:mx-16 text-light-blue-500 font-semibold my-4 md:text-start text-center">
        Top {name}
      </div>
      <div className="flex flex-wrap justify-evenly items-center container mx-auto gap-5">
        {data.map((ele, ind) => (
          <Card className="mt-6 w-72 bg-gray-700 text-white" key={ind}>
            <CardHeader floated={false} color="transparent" className="h-80">
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
                {ele.title || ele.name}
              </Typography>
              <div className="flex justify-between items-center">
                {" "}
                <>
                  Rate:{" "}
                  <span className="text-blue-700 font-semibold text-lg">
                    {ele.vote_average}
                  </span>
                </>{" "}
                <StarRatings
                  className="flex"
                  rating={ele.vote_average / 1.7}
                  starRatedColor="yellow"
                  // changeRating={changeRating}
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0 text-center">
              <Link
                to={
                  ele.title
                    ? `/movie/${ele.id}/title/${ele.title}`
                    : `/series/${ele.id}/title/${ele.name}`
                }
              >
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
        ))}
      </div>
    </div>
  );
};

export default TopContent;
