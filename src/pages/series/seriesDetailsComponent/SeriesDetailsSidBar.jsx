import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { getSeriesDetails } from "../../../redux-system/redux-slices/seriesSlice/seriesDetailsSlice";

const SeriesDetailsSidBar = () => {
  const { seriesid } = useParams();
  const { seriesDetailsdata } = useSelector((state) => state.seriesDetail);
  const [keyWords, setKeyWords] = useState(null);
  const [seriesSocial, setSeriesSocial] = useState(null);
  const dispatch = useDispatch();

  const getKeyWords = () => {
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${seriesid}/keywords`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
      },
    }).then((res) => {
      setKeyWords(res.data.results);
    });
  };
  const getSeriesSocial = () => {
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${seriesid}/external_ids`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
      },
    }).then((res) => setSeriesSocial(res.data));
  };
  useEffect(() => {
    dispatch(getSeriesDetails(seriesid));
    getSeriesSocial();
    getKeyWords();
  }, [seriesid]);

  return (
    <div className="px-2 my-10 flex flex-col justify-evenly items-center md:items-start">
      <div className="flex justify-evenly w-full ">
        <div>
          {seriesSocial?.facebook_id ? (
            <Link to={`https://www.facebook.com/${seriesSocial?.facebook_id}`}>
              {" "}
              <FaFacebook className="text-2xl text-light-blue-500 " />
            </Link>
          ) : (
            <FaFacebook className="text-2xl text-light-blue-500 " />
          )}
        </div>
        <div>
          {seriesSocial?.twitter_id ? (
            <Link to={`https://twitter.com/${seriesSocial.twitter_id}`}>
              <FaTwitter className="text-2xl text-light-blue-500 " />
            </Link>
          ) : (
            <FaTwitter className="text-2xl text-light-blue-500 " />
          )}
        </div>
        <div>
          {seriesSocial?.instagram_id ? (
            <Link to={`https://www.instagram.com/${seriesSocial.instagram_id}`}>
              <FaInstagram className="text-2xl text-light-blue-500 " />
            </Link>
          ) : (
            <FaInstagram className="text-2xl text-light-blue-500 " />
          )}
        </div>
        <div>
          <AiOutlineHome className="text-2xl text-light-blue-500 " />
        </div>
      </div>
      <div className="flex flex-col justify-evenly gap-2 my-10">
        <div>
          <h1 className="text-white text-xl drop-shadow-3xl">Status</h1>
          <p className="text-light-blue-500 text-lg my-2">
            {seriesDetailsdata?.status}
          </p>
        </div>
        <div>
          <h1 className="text-white text-xl drop-shadow-3xl">
            Original Language
          </h1>
          <p className="text-light-blue-500 text-lg my-2 uppercase">
            {seriesDetailsdata?.original_language}
          </p>
        </div>
        <div>
          <h1 className="text-white text-xl drop-shadow-3xl">Networks</h1>
          {seriesDetailsdata?.networks.length !== 0 ? (
            <p className="text-light-blue-500 text-lg my-2 w-full">
              {seriesDetailsdata?.networks.map((ele, index) => (
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.logo_path}`}
                  alt="logo"
                  width={20}
                  key={index}
                />
              ))}
            </p>
          ) : (
            <p className="text-light-blue-500 text-lg my-2">-</p>
          )}
        </div>
        <div>
          <h1 className="text-white text-xl drop-shadow-3xl">type</h1>
          {seriesDetailsdata?.type != "" ? (
            <p className="text-light-blue-500 text-lg my-2">
              {seriesDetailsdata?.type}
            </p>
          ) : (
            <p className="text-light-blue-500 text-lg my-2">-</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-light-blue-500 text-3xl font-bold mb-5">
          Keywords
        </h1>
        <div>
          {keyWords?.map((ele, ind) => (
            <Button
              key={ind}
              className=" hover:-translate-y-1 hover:scale-110 dark:bg-gray-600 hover:bg-gray-600 hover:text-light-blue-500 p-2 m-1"
            >
              {ele.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsSidBar;
