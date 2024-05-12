import React, { useEffect } from "react";
import { Tabs, TabsHeader, TabsBody } from "@material-tailwind/react";
import ReactShowMoreText from "react-show-more-text";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieReviews } from "../../../redux-system/redux-slices/moviesSlice/movieReviewsSlice";

const SocialMovieDetails = () => {
  const { movieid, moviename } = useParams();

  const { movieReviewsData } = useSelector((state) => state.movieReview);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieReviews(movieid));
  }, [movieid]);
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
            Reviews ({movieReviewsData?.length}){" "}
          </TabsHeader>
          {movieReviewsData
            ?.filter((ele, ind) => ind < 1)
            .map((ele, ind) => (
              <TabsBody
                key={ind}
                className=" bg-blue-gray-300 flex gap-10 rounded-xl flex-col lg:flex-row p-5 items-center lg:items-start"
              >
                <div className="w-[75px] h-[75px] rounded-full bg-gray-700 text-center text-white text-xl font-semibold content-center m-3">
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
      {movieReviewsData?.length > 0 && (
        <div className="text-light-blue-500 m-2 font-medium ">
          <Link to={`/movie/${movieid}/title/${moviename}}/reviews`}>
            Read All Reviews
          </Link>
        </div>
      )}
    </div>
  );
};

export default SocialMovieDetails;
