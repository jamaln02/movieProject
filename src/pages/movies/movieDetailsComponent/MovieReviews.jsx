import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../../../redux-system/redux-slices/moviesSlice/movieDetailsSlice";
import { getMovieReviews } from "../../../redux-system/redux-slices/moviesSlice/movieReviewsSlice";
import { Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import ReactShowMoreText from "react-show-more-text";
import { FaStar } from "react-icons/fa";

const MovieReviews = () => {
  const { movieid } = useParams();
  const { movieDetailsdata } = useSelector((state) => state.moviesDetails);
  const { movieReviewsData } = useSelector((state) => state.movieReview);
  const navigate = useNavigate();
  console.log(movieReviewsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetails(movieid));
    dispatch(getMovieReviews(movieid));
  }, [movieid]);
  return (
    <div className="mt-20 container mx-auto">
      <div className="flex p-5 items-center gap-4">
        <div className="w-20">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetailsdata?.poster_path}`}
            alt="movie poster"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-gray-700 text-2xl font-bold dark:text-gray-100">
            {movieDetailsdata?.title}{" "}
            <span className="text-gray-400 text-xl">
              ({movieDetailsdata?.release_date.split("-")[0]})
            </span>
          </h1>
          <Link
            onClick={() => navigate(-1)}
            variant="text"
            className="flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <IoIosArrowRoundBack />
            <span className="text-sm font-light ">Back to main</span>
          </Link>
        </div>
      </div>
      <div className="">
        <Tabs className="my-10 " value={"Reviews"}>
          <TabsHeader
            className="rounded-none border-b-2 border-[#9C27B0] text-[#9C27B0] text-lg font-semibold bg-transparent w-1/4"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            Reviews ({movieReviewsData?.length}){" "}
          </TabsHeader>
          {movieReviewsData?.map((ele, ind) => (
            <TabsBody
              key={ind}
              className=" bg-blue-gray-300  flex gap-10 rounded-xl flex-col lg:flex-row  items-center lg:items-start my-5 "
            >
              {ele?.author_details?.avatar_path != null ? (
                <div className="content-center m-3 p-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.author_details?.avatar_path}`}
                    alt="logo"
                    className="rounded-full w-[100px] h-[100px]"
                  />
                </div>
              ) : (
                <div className="w-[100px] h-[100px] rounded-full bg-gray-700 text-center text-white text-xl font-semibold content-center m-3">
                  {ele?.author.charAt(0)}
                </div>
              )}

              <div className="text-white text-lg space-x-1 my-5">
                <div className="mb-3 flex items-center ">
                  {" "}
                  <span className="font-bold text-xl ">A review by </span>{" "}
                  <span className="text-light-blue-700 font-semibold text-lg mx-2">
                    {ele?.author}
                  </span>
                  <span className="border-2 px-[0.2em] py-0 m-2 rounded-md flex items-center gap-2 font-thin ms-8 text-sm">
                    <span>
                      <FaStar />
                    </span>
                    {ele?.author_details?.rating}.0
                  </span>
                </div>
                Written by{" "}
                <span className="text-light-blue-700 font-semibold text-lg">
                  {ele?.author}
                </span>{" "}
                on{" "}
                <span className="text-light-blue-700 font-semibold text-lg">
                  {new Date(ele?.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <div className="text-xl text-blue-800 font-semibold my-3">
                  content :{" "}
                </div>
                <div className="w-full text-base my-2">
                  <ReactShowMoreText
                    lines={5}
                    more="Show more"
                    width={610}
                    less="Show less"
                    className="content-css"
                    anchorClass="show-more-less-clickable text-light-blue-700 underline cursor-pointer	"
                    expanded={false}
                    truncatedEndingComponent={"  ... "}
                  >
                    {ele.content}
                  </ReactShowMoreText>
                </div>
              </div>
            </TabsBody>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MovieReviews;
