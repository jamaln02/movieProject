import React, { useEffect } from "react";
import { Tabs, TabsHeader, TabsBody } from "@material-tailwind/react";
import ReactShowMoreText from "react-show-more-text";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSeriesReviews } from "../../../redux-system/redux-slices/seriesSlice/seriesReviewsSlice";

const SocialSeriesDetails = () => {
  const { seriesid, seriesname } = useParams();

  const { seriesReviewsData } = useSelector((state) => state.seriesReview);
  console.log(seriesReviewsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeriesReviews(seriesid));
  }, [seriesid]);
  return (
    <div className="px-10">
      <div className="text-2xl font-medium text-light-blue-500">Social</div>
      <div className="">
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
          {seriesReviewsData?.length == 0 && (
            <TabsBody className=" bg-gray-700 rounded-xl">
              <div className="text-white text-lg space-x-1 px-8 py-4">
                We don't have any reviews for{" "}
                <span className="text-light-blue-500 font-bold">
                  {seriesname}
                </span>
              </div>
            </TabsBody>
          )}
          {seriesReviewsData
            ?.filter((ele, ind) => ind < 1)
            .map((ele, ind) => (
              <TabsBody
                key={ind}
                className=" bg-gray-700 flex gap-10 rounded-xl flex-col lg:flex-row p-5 items-center lg:items-start"
              >
                <div className="w-[75px] h-[75px] rounded-full bg-gray-400 text-center text-white text-xl font-semibold content-center m-3">
                  {ele?.author.charAt(0)}
                </div>
                <div className="text-white text-lg space-x-1 my-5">
                  <div>
                    {" "}
                    <span className="font-bold text-2xl">A review by</span>{" "}
                    <span className="text-light-blue-700 font-semibold text-xl">
                      {ele?.author}
                    </span>
                  </div>
                  Written by{" "}
                  <span className="text-light-blue-700 font-semibold text-xl">
                    {ele?.author}
                  </span>{" "}
                  on{" "}
                  <span className="text-light-blue-700 font-semibold text-xl">
                    {new Date(ele?.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <div className="text-xl text-blue-800 font-semibold">
                    content :{" "}
                  </div>
                  <div className="w-full text-base">
                    <ReactShowMoreText
                      lines={5}
                      more="Show more"
                      width={512}
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
      {seriesReviewsData?.length > 0 && (
        <div className="text-light-blue-500 m-2 font-medium ">
          <Link to={`/tv/${seriesid}/name/${seriesname}}/reviews`}>
            Read All Reviews
          </Link>
        </div>
      )}
    </div>
  );
};

export default SocialSeriesDetails;
