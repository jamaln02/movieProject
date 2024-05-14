import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionsDetails } from "../../../redux-system/redux-slices/moviesSlice/partOfCollectionSlice";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../../../redux-system/redux-slices/moviesSlice/movieDetailsSlice";
import { getCreditsDetails } from "../../../redux-system/redux-slices/moviesSlice/movieDetailsCreditsSlice";

const AllCollections = () => {
  const { movieid, moviename } = useParams();
  const { collectionsDetailsData } = useSelector(
    (state) => state.collectionDetails
  );
  const { movieCreditsDetailsdata } = useSelector(
    (state) => state.moviesCreditsDetails
  );
  const { movieDetailsdata } = useSelector((state) => state.moviesDetails);
  console.log(movieDetailsdata);
  const collectionsid = movieDetailsdata?.belongs_to_collection?.id;
  console.log(collectionsDetailsData);
  console.log(movieCreditsDetailsdata);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCreditsDetails(movieid));
    dispatch(getMovieDetails(movieid));
    if (movieDetailsdata != null) {
      dispatch(getCollectionsDetails(collectionsid));
    }
  }, [movieid, collectionsid]);

  return (
    <div className="container mx-auto mt-16 tracking-wide">
      {/* --------------------------------------------- */}
      {/* header of collection */}
      {/* ----------------------------------------------- */}
      <div className="flex flex-col lg:flex-row items-center text-center lg:items-start lg:text-start gap-6 dark:text-white p-16 ">
        <div className="w-3/4  lg:w-1/4 ">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${collectionsDetailsData?.poster_path}`}
            alt="poster logo"
          />
        </div>
        <div className="w-2/3 ">
          <div className="my-3">
            <h1 className="text-3xl font-semibold ">
              {collectionsDetailsData?.name}
            </h1>
          </div>
          <div>
            {movieDetailsdata?.genres.map((ele, ind) => (
              <span className="m-1" key={ind}>
                {ele.name},
              </span>
            ))}
          </div>
          <div>
            <h1 className="text-light-blue-500 text-2xl font-medium my-3">
              Overview :-
            </h1>
            <p className="text-base">{collectionsDetailsData?.overview}</p>
          </div>
          <div>
            <h1 className="text-light-blue-500 text-2xl font-medium my-3">
              Number of Movies :{" "}
              <span className="dark:text-white text-black">
                {collectionsDetailsData?.parts?.length}
              </span>
            </h1>
          </div>
          <div>
            <h1 className="text-light-blue-500 text-2xl font-medium my-4">
              Revenue :{" "}
              <span className="dark:text-white text-black">
                $ {movieDetailsdata?.revenue.toLocaleString()}
              </span>
            </h1>
          </div>
        </div>
      </div>
      {/* end header collection */}
      {/* ---------------------------------------------------- */}

      {/* feature cast & crew  */}

      <div className="mt-20 container mx-auto text-white">
        <h1 className="text-3xl text-light-blue-500 font-semibold mx-5">
          Featured Cast
        </h1>
        <div className="flex flex-wrap justify-evenly items-center gap-4 w-9/12 mt-10">
          {movieCreditsDetailsdata?.cast
            ?.filter((ele) => ele.popularity > 1.9)
            ?.map((contatnt) => (
              <div
                key={contatnt.credit_id}
                className="flex items-center w-2/3 md:w-2/5  lg:justify-normal lg:w-3/12 bg-gray-700 gap-4 lg:gap-1 rounded-md "
              >
                {contatnt.profile_path ? (
                  <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contatnt?.profile_path}`}
                      alt="profile photo"
                      width={50}
                      className="rounded-md "
                    />
                  </Link>
                ) : (
                  <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                    <img
                      src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                      alt="profile photo"
                      width={80}
                      className="rounded-md"
                    />
                  </Link>
                )}

                <div className="w-3/4 ">
                  <h1 className="text-lg text-white font-semibold text-center">
                    <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                      {contatnt?.name}
                    </Link>
                  </h1>

                  <p className="text-gray-300 text-center">
                    {contatnt?.character}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* <div className="grid lg:grid-cols-10 md:grid-cols-6 gap-8 pe-20 ps-10 py-10 ">
          {movieCreditsDetailsdata?.cast
            ?.filter((content, ind) => {
              return content.popularity > 1.9;
            })
            .map((ele, ind) => (
              <div key={ind} className="col-span-3 ">
                <div className=" flex bg-gray-700 rounded-md w-fit h-fit">
                  {ele.profile_path ? (
                    <Link to={`/person/${ele.id}/name/${ele.name}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele.profile_path}`}
                        alt=""
                        className="rounded-md w-2/4"
                      />
                    </Link>
                  ) : (
                    <Link to={`/person/${ele.id}/name/${ele.name}`}>
                      {" "}
                      <img
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                        alt=""
                        className="rounded-md w-2/4"
                      />
                    </Link>
                  )}
                  <div className=" mx-5 my-1">
                    <h1 className="my-1 font-semibold">
                      <Link to={`/person/${ele.id}/name/${ele.name}`}>
                        {ele.name}
                      </Link>
                    </h1>
                    <p className="font-extralight ">{ele.character}</p>
                  </div>
                </div>
              </div>
            ))}
        </div> */}
      </div>
      <div className="mt-20 container mx-auto text-white">
        <h1 className="text-3xl text-light-blue-500 font-semibold mx-5">
          Featured Crew
        </h1>

        <div className="flex flex-wrap justify-evenly items-center gap-4 w-9/12 mt-10">
          {movieCreditsDetailsdata?.crew
            ?.filter((ele, ind) => ele.popularity > 1.9 && ind < 15)
            ?.map((contatnt) => (
              <div
                key={contatnt.credit_id}
                className="flex items-center w-2/3 md:w-2/5  lg:justify-normal lg:w-3/12 bg-gray-700 gap-4 lg:gap-1 rounded-md "
              >
                {contatnt.profile_path ? (
                  <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${contatnt?.profile_path}`}
                      alt="profile photo"
                      width={50}
                      className="rounded-md "
                    />
                  </Link>
                ) : (
                  <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                    <img
                      src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                      alt="profile photo"
                      width={80}
                      className="rounded-md"
                    />
                  </Link>
                )}

                <div className="w-3/4 ">
                  <h1 className="text-lg text-white font-semibold text-center">
                    <Link to={`/person/${contatnt.id}/name/${contatnt.name}`}>
                      {contatnt?.name}
                    </Link>
                  </h1>

                  <p className="text-gray-300 text-center">
                    {contatnt?.character}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* <div className="grid lg:grid-cols-10 md:grid-cols-6 gap-8 pe-20 ps-10 py-10">
          {movieCreditsDetailsdata?.crew
            ?.filter((content, ind) => {
              return content.popularity > 1.9 && ind < 15;
            })
            .map((ele, ind) => (
              <div key={ind} className="col-span-3">
                <div className=" flex bg-gray-700 rounded-md h-full w-full">
                  {ele.profile_path ? (
                    <Link to={`/person/${ele.id}/name/${ele.name}`}>
                      {" "}
                      <img
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele.profile_path}`}
                        alt=""
                        className="rounded-md w-2/4"
                      />
                    </Link>
                  ) : (
                    <Link to={`/person/${ele.id}/name/${ele.name}`}>
                      <img
                        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}
                        alt=""
                        className="rounded-md w-1/4"
                      />
                    </Link>
                  )}
                  <div className=" me-5 my-1">
                    <h1 className="my-1 font-semibold">
                      <Link to={`/person/${ele.id}/name/${ele.name}`}>
                        {ele.name}
                      </Link>
                    </h1>
                    <p className="font-extralight ">{ele.job}</p>
                  </div>
                </div>
              </div>
            ))}
        </div> */}
      </div>

      {/* end feature cast & crew  */}
      {/* -------------------------------------------------------- */}
      {/* movies  ----- */}
      <div className="text-white">
        <h1 className="text-light-blue-500 text-2xl font-bold text-center lg:text-start">
          {collectionsDetailsData?.parts?.length} movies
        </h1>
        <div className="flex gap-4 flex-col lg:flex-col md:flex-row p-12 md:p-1">
          {collectionsDetailsData?.parts?.map((ele, ind) => (
            <div
              key={ind}
              className="flex flex-col lg:flex-row items-center lg:items-start bg-gray-700 m-5 rounded-md gap-1 w-[95%] "
            >
              <div className="lg:w-1/6 w-full ">
                {ele?.poster_path ? (
                  <Link to={`/movie/${movieid}/title/${moviename}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.poster_path}`}
                      alt=""
                      className="rounded-md lg:w-3/4"
                    />
                  </Link>
                ) : (
                  <Link to={`/movie/${movieid}/title/${moviename}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ele?.poster_path}`}
                      alt=""
                      className="rounded-md w-3/4"
                    />
                  </Link>
                )}
              </div>
              <div className="w-4/5 my-5">
                <h1 className="text-xl font-semibold my-3">
                  <Link to={`/movie/${movieid}/title/${moviename}`}>
                    {ele?.title}
                  </Link>
                </h1>
                <p className="text-gray-400 my-1">{ele?.release_date}</p>
                <p className="my-1 text-sm">{ele?.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCollections;
