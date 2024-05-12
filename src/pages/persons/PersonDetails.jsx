import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDetailsActorKnownFor,
  getPersonDetails,
} from "../../redux-system/redux-slices/personSlice/personDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import ReactLoading from "react-loading";
import { Button } from "@material-tailwind/react";
import axios from "axios";

const PersonDetails = () => {
  const [socialIds, setSocialIds] = useState(null);
  const { personid, personname } = useParams();
  const { personDetailsData } = useSelector((state) => state.personDetail);
  const { personDetailsLoading } = useSelector((state) => state.personDetail);
  const { actorKnownFor } = useSelector((state) => state.personDetail);
  const [knownFor] = actorKnownFor;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getExternalIds = () => {
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/person/${personid}/external_ids`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
      },
    }).then((res) => setSocialIds(res.data));
  };

  useEffect(() => {
    dispatch(getPersonDetails(personid));
    getExternalIds();
    dispatch(getDetailsActorKnownFor(personname));
  }, [personid, personname]);
  return (
    <div className="pt-[5.2em]  container mx-auto">
      {personDetailsLoading ? (
        <ReactLoading
          className="mx-auto h-screen"
          type={"dots"}
          color={"blue"}
          height={"50%"}
          width={"50%"}
        />
      ) : (
        <div>
          {[personDetailsData]?.map((ele, ind) => (
            <div
              key={ind}
              className="lg:grid lg:grid-cols-5 gap-3 text-center lg:text-start mx-10 md:mx-1"
            >
              <div className="col-span-2">
                <div className="lg:w-9/12 w-full flex justify-center items-center">
                  {ele?.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.profile_path}`}
                      alt="actor photo"
                      className="rounded-lg "
                    />
                  ) : (
                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" />
                  )}
                </div>
                <div className="flex justify-evenly items-center mt-8 lg:w-3/4 ">
                  <div>
                    {socialIds?.facebook_id ? (
                      <Link
                        to={`https://www.instagram.com/${socialIds?.facebook_id}`}
                      >
                        {" "}
                        <FaFacebook className="text-2xl text-light-blue-500 " />
                      </Link>
                    ) : (
                      <FaFacebook className="text-2xl text-light-blue-500 " />
                    )}
                  </div>
                  <div>
                    {socialIds?.twitter_id ? (
                      <Link to={`https://twitter.com/${socialIds?.twitter_id}`}>
                        {" "}
                        <FaTwitter className="text-2xl text-light-blue-500 " />
                      </Link>
                    ) : (
                      <FaTwitter className="text-2xl text-light-blue-500 " />
                    )}
                  </div>
                  <div>
                    {socialIds?.instagram_id ? (
                      <Link
                        to={`https://www.instagram.com/${socialIds?.instagram_id}`}
                      >
                        {" "}
                        <FaInstagram className="text-2xl text-light-blue-500 " />
                      </Link>
                    ) : (
                      <FaInstagram className="text-2xl text-light-blue-500 " />
                    )}
                  </div>
                  <div className="text-2xl text-light-blue-500 ">
                    {socialIds?.tiktok_id ? (
                      <Link
                        to={`https://www.tiktok.com/${socialIds?.tiktok_id}`}
                      >
                        {" "}
                        <FaTiktok />
                      </Link>
                    ) : (
                      <FaTiktok />
                    )}
                  </div>
                  <div className="text-2xl text-light-blue-500 ">
                    {socialIds?.youtube_id ? (
                      <Link
                        to={`https://www.youtube.com/${socialIds?.youtube_id}`}
                      >
                        {" "}
                        <FaYoutube />
                      </Link>
                    ) : (
                      <FaYoutube />
                    )}
                  </div>
                  <div>
                    <AiOutlineHome className="text-2xl text-light-blue-500 " />
                  </div>
                </div>
                <div className="my-5">
                  <h1 className=" text-white text-2xl drop-shadow-3xl">
                    Personal Info
                  </h1>
                  <div>
                    <h1 className=" mt-2 text-white text-xl drop-shadow-3xl">
                      Known For
                    </h1>
                    <p className="text-light-blue-500 text-lg my-2">
                      {ele?.known_for_department
                        ? ele?.known_for_department
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-white text-xl drop-shadow-3xl">
                      Known Credits
                    </h1>
                    <p className="text-light-blue-500 text-lg my-2">
                      {knownFor?.known_for.length
                        ? knownFor?.known_for.length
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-white text-xl drop-shadow-3xl">
                      Gender
                    </h1>
                    {ele?.gender == 2 ? (
                      <p className="text-light-blue-500 text-lg my-2">Male</p>
                    ) : ele?.gender == 1 ? (
                      <p className="text-light-blue-500 text-lg my-2">Female</p>
                    ) : (
                      <p className="text-light-blue-500 text-lg my-2">
                        Not set / not specified
                      </p>
                    )}
                  </div>
                  <div>
                    <h1 className="text-white text-xl drop-shadow-3xl">
                      Birthday
                    </h1>
                    <p className="text-light-blue-500 text-lg my-2">
                      {ele?.birthday ? ele?.birthday : "-"}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-white text-xl drop-shadow-3xl">
                      Place of Birth
                    </h1>
                    <p className="text-light-blue-500 text-lg my-2">
                      {ele?.place_of_birth ? ele?.place_of_birth : "-"}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-white text-xl drop-shadow-3xl">
                      Also Known As
                    </h1>
                    {ele?.also_known_as
                      ? ele?.also_known_as.map((contatnt, num) => (
                          <div key={num}>
                            <p className="text-light-blue-500 text-lg my-2">
                              {contatnt}
                            </p>
                          </div>
                        ))
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="col-span-3 text-center lg:text-start">
                <div className="text-xl md:text-3xl text-white drop-shadow-3xl my-2 font-bold">
                  {personDetailsData?.name}
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl text-light-blue-500 mt-10 mb-4 font-semibold">
                    Biography
                  </h1>
                  {personDetailsData?.biography ? (
                    <p className="text-gray-700 dark:text-white my-6 md:text-lg md:leading-8 md:my-10 lg:w-4/5">
                      {personDetailsData?.biography}
                    </p>
                  ) : (
                    <p className="text-gray-700 dark:text-white my-6 md:text-lg md:leading-8 md:my-10 lg:w-4/5">
                      We don't have a biography for{" "}
                      <span className="text-light-blue-500">
                        {personDetailsData?.name}
                      </span>
                    </p>
                  )}
                </div>
                <div>
                  <h1 className="text-lg md:text-2xl text-light-blue-500 mt-10 mb-4 font-semibold my-6">
                    Known For
                  </h1>
                  <div className="flex flex-nowrap snap-x overflow-x-scroll my-6">
                    <div className="flex my-7">
                      {knownFor?.known_for?.map((contant, ind) => (
                        <div
                          key={ind}
                          className="rounded-lg bg-blue-gray-300 text-white mx-1 scroll-m-1 w-[11em]"
                        >
                          <div>
                            <Link
                              to={`/movie/${contant?.id}/title/${contant?.title}`}
                            >
                              {contant.backdrop_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contant?.backdrop_path}`}
                                  alt="logo"
                                  className="rounded-lg p-[0.082em]"
                                />
                              ) : (
                                <img
                                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contant?.poster_path}`}
                                  alt="logo"
                                  className="rounded-lg p-[0.082em]"
                                />
                              )}
                            </Link>
                          </div>
                          <div className="flex flex-col items-center justify-between gap-3 p-2">
                            <Link
                              to={`/movie/${contant?.id}/title/${contant?.title}`}
                            >
                              <h1 className="text-lg font-medium text-center p-5">
                                {contant?.title}
                              </h1>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center md:py-20 py-2">
                  {" "}
                  <Button
                    onClick={() => navigate(-1)}
                    color="light-blue"
                    variant="outlined"
                    className="hover:bg-light-blue-500 hover:text-white font-semibold md:text-sm text-xs"
                  >
                    Back Step
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonDetails;
