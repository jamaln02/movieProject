import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBackDropsAndPosters } from "../../../redux-system/redux-slices/seriesSlice/seriesMediaSlice";
import { getSeriesVideos } from "../../../redux-system/redux-slices/seriesSlice/seriesMediaSlice";

const MediaSeriesDetails = () => {
  const { seriesid, seriesname } = useParams();
  const [activeTab, setActiveTab] = useState("videos");

  const { videosData } = useSelector((state) => state.seriessMedia);
  console.log(videosData);
  const { backdropsAndPosterData } = useSelector((state) => state.seriessMedia);

  const backDrops = backdropsAndPosterData?.backdrops;
  const posters = backdropsAndPosterData?.posters;
  const videos = videosData?.results;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeriesVideos(seriesid));
    dispatch(getBackDropsAndPosters(seriesid));
  }, [seriesid]);

  const data = [
    {
      label: `VIDEOS (${videos?.length})`,
      value: "videos",
      desc: videos,
    },
    {
      label: `BACKDROPS (${backDrops?.length})`,
      value: "backdrops",
      desc: backDrops,
    },
    {
      label: `POSTERS (${posters?.length})`,
      value: "posters",
      desc: posters,
    },
  ];

  return (
    <div className="px-10 my-10">
      <div className="text-2xl font-medium text-light-blue-500">Media</div>
      <div>
        <Tabs value={activeTab} className="">
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-[#9C27B0] text-[#9C27B0] shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={
                  activeTab === value
                    ? " text-[#9C27B0] text-[0.8em] md:text-base dark:font-bold"
                    : "text-[0.7em]  md:text-base dark:text-white "
                }
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="flex flex-nowrap  snap-x">
            {data.map(({ value, desc }) => (
              <TabPanel
                key={value}
                value={value}
                className={
                  activeTab === value
                    ? "scroll-m-0 flex overflow-x-scroll"
                    : "c"
                }
              >
                {value == "videos" ? (
                  videos
                    ?.filter((element, ind) => ind < 15)
                    ?.map((ele, ind) => (
                      <iframe
                        key={ind}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${ele.key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="vid "
                      ></iframe>
                    ))
                ) : value == "backdrops" ? (
                  <div className="flex overflow-x-scroll">
                    {backDrops
                      ?.filter((ele, ind) => ind < 6)
                      ?.map((contant, ind) => (
                        <div key={ind} className="bg-gray-700 text-white mx-1 ">
                          <div>
                            <img
                              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contant.file_path}`}
                              alt="logo"
                              className="max-w-[300px] "
                            />
                          </div>
                        </div>
                      ))}
                    <div className=" bg-gray-700 text-white mx-1  text-center content-center p-16">
                      <Link
                        to={`/series/${seriesid}/name/${seriesname}/images/backdrops`}
                      >
                        show more{" "}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          className="text-3xl"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  value == "posters" && (
                    <div className="flex overflow-x-scroll">
                      {posters
                        ?.filter((ele, ind) => ind < 10)
                        ?.map((contant, ind) => (
                          <div
                            key={ind}
                            className="bg-gray-700 text-white mx-1 "
                          >
                            <div>
                              <img
                                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contant.file_path}`}
                                alt="logo"
                                className="max-w-[300px] "
                              />
                            </div>
                          </div>
                        ))}
                      <div className=" bg-gray-700 text-white mx-1  text-center content-center p-16">
                        <Link
                          to={`/series/${seriesid}/name/${seriesname}/images/posters`}
                        >
                          show more{" "}
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 16 16"
                            className="text-3xl"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )
                )}
                <div />
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default MediaSeriesDetails;
