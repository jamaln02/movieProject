import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import ReactShowMoreText from "react-show-more-text";
import { FaStar } from "react-icons/fa";
import { getSeriesDetails } from "../../../redux-system/redux-slices/seriesSlice/seriesDetailsSlice";
import { getSeriesReviews } from "../../../redux-system/redux-slices/seriesSlice/seriesReviewsSlice";

const SeriesReviews = () => {
  const { seriesid, seriesname } = useParams();
  const { seriesDetailsdata } = useSelector((state) => state.seriesDetail);

  const { seriesReviewsData } = useSelector((state) => state.seriesReview);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeriesDetails(seriesid));
    dispatch(getSeriesReviews(seriesid));
  }, [seriesid]);
  return (
    <div className="mt-20 container mx-auto ">
      <div className="flex p-5 items-center gap-4 ">
        <div className="w-20">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${seriesDetailsdata?.poster_path}`}
            alt="movie poster"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-gray-700 text-2xl font-bold dark:text-gray-100">
            {seriesDetailsdata?.name}{" "}
            <span className="text-gray-400 text-xl">
              ({seriesDetailsdata?.first_air_date?.split("-")[0]})
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
      <div className="p-5 ">
        <Tabs className="my-10 " value={"Reviews"}>
          <TabsHeader
            className="rounded-none border-b-2 border-[#9C27B0] text-[#9C27B0] text-lg font-semibold bg-transparent w-1/4"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            Reviews ({seriesReviewsData?.length}){" "}
          </TabsHeader>
          {seriesReviewsData?.map((ele, ind) => (
            <TabsBody
              key={ind}
              className=" bg-blue-gray-900  flex gap-2 md:gap-10 rounded-xl flex-col lg:flex-row  items-center lg:items-start my-5 "
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

              <div className="text-white text-lg space-x-1 my-2 md:my-5 text-center lg:text-start px-5">
                <div className="mb-3 flex flex-col md:flex-row items-center justify-center lg:justify-normal ">
                  {" "}
                  <span className="font-bold text-xl ">A review by </span>{" "}
                  <span className="text-light-blue-700 font-semibold text-lg m-2">
                    {ele?.author}
                  </span>
                  {ele?.author_details?.rating && (
                    <span className="border-2 px-[0.2em] py-0 m-2 rounded-md flex items-center gap-2 font-thin md:ms-8 text-sm">
                      <span>
                        <FaStar />
                      </span>
                      {ele?.author_details?.rating}.0
                    </span>
                  )}
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
                <div className="w-full text-base my-2 ">
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

export default SeriesReviews;
