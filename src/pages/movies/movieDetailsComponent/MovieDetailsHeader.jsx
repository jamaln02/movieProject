import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../../../redux-system/redux-slices/moviesSlice/movieDetailsSlice";
import { AiFillFileAdd } from "react-icons/ai";
import { IoStarOutline } from "react-icons/io5";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import axios from "axios";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
const MovieDetailsHeader = () => {
  const { movieid, moviename } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieDetailsdata } = useSelector((state) => state.moviesDetails);
  const { movieDetailsLoading } = useSelector((state) => state.moviesDetails);
  const { movieCreditsDetailsdata } = useSelector(
    (state) => state.moviesCreditsDetails
  );
  const [videosKey, setVideoKey] = useState("");

  const getVideoKey = () => {
    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieid}/videos`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjUwNmVjNjNjMDE4MWY4NzQ2ZmQzMzg1ODA5ZjYyNyIsInN1YiI6IjY2MmFiMzk0YjUxM2E4MDExZTNlYmQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FuwTTRjzMMrktYqWyHBVf8EyrhigIi654qnc_5JdjCU",
      },
    }).then((data) =>
      setVideoKey(
        data.data.results.filter((ele, ind) => {
          ind < 1;
          return ele.type == "Trailer" || ind < 1;
        })
      )
    );
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  useEffect(() => {
    dispatch(getMovieDetails(movieid));
    getVideoKey();
  }, [movieid]);

  return (
    <div>
      {movieDetailsLoading ? (
        <ReactLoading
          className="mx-auto h-screen"
          type={"dots"}
          color={"blue"}
          height={"50%"}
          width={"50%"}
        />
      ) : (
        <div
          style={{
            backgroundPositionX: "right",
            backgroundSize: "cover",
            backgroundImage: `
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.9) 2%,
              rgba(0, 0, 0, 0.5494747899159666) 90%,
              rgba(255, 255, 255, 0) 100%
            ),url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDetailsdata?.backdrop_path}}")`,
          }}
          className="after: grad pt-3 md:bg-right"
        >
          <div className="md:pt-24 pt-14">
            <div className="text-center text-light-blue-500 md:text-3xl text-lg font-semibold tracking-wide">
              MovieDetails
            </div>
          </div>
          <div className="flex md:flex-row justify-center md:items-start items-center container mx-auto flex-wrap flex-col">
            <div className="md:w-2/5  md:ps-10 w-1/2 h-full">
              <img
                src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetailsdata?.poster_path}`}
                alt="poster-img"
                className="  md:w-3/4 "
              />
            </div>
            <div className="md:text-start w-4/5 md:w-3/5 md:mt-3 md:p-1 text-white text-center">
              <div className="  md:text-3xl text-lg">
                {movieDetailsdata?.title}
              </div>
              <div className="">
                {movieDetailsdata?.release_date} (
                {movieDetailsdata?.original_language}) 👉
                {movieDetailsdata?.genres.map((ele) => (
                  <span key={ele.id}>{ele.name}</span>
                ))}
                👈{Math.floor(movieDetailsdata?.runtime / 60)}h{" "}
                {movieDetailsdata?.runtime % 60}
                min
              </div>
              <div className="md:mt-6 p-1">
                <span className="md:text-3xl text-lg text-light-blue-500 font-semibold">
                  Over View :
                </span>
                <span className="mb-1 md:mx-2 mx-1 md:h-full md:tracking-wide tracking-tight md:leading-10 leading-6 md:text-xl text-base">
                  {movieDetailsdata?.overview}
                </span>
              </div>
              <div className="md:mt-6 mt-2">
                <span className="md:text-3xl text-lg text-light-blue-500 font-semibold">
                  Casting :
                </span>
              </div>
              <div className="">
                <div className=" ">
                  <div className="flex  justify-evenly md:text-lg text-sm text-center md:mt-5 mt-2">
                    {" "}
                    {movieCreditsDetailsdata?.cast
                      .filter((ele, ind) => ele.cast_id < 3 || ind < 3)
                      .map((cont, ind) => (
                        <div key={ind} className="flex flex-col gap-2">
                          <h1>{cont.name} </h1>
                          <h1 className="text-yellow-500">Acting</h1>
                        </div>
                      ))}
                  </div>
                  <div className="flex justify-evenly md:text-lg text-sm text-center md:mt-5 mt-2">
                    {" "}
                    {movieCreditsDetailsdata?.crew
                      .filter(
                        (ele, ind) => ele.department == "Production" && ind < 4
                      )
                      .map((cont, ind) => (
                        <div key={ind} className="flex flex-col gap-2">
                          <h1>{cont.name} </h1>
                          <h1 className="text-yellow-500 ">Production</h1>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-evenly items-center md:pt-5 pt-2 flex-wrap mt-2">
                <div className="md:text-2xl text-lg text-green-600 ">
                  <AiFillFileAdd />
                </div>
                <div className="text-yellow-600 md:text-2xl text-lg">
                  <IoStarOutline />
                </div>
                <div className="md:text-2xl text-lg text-red-500 cursor-pointer">
                  <BsFillPlayCircleFill onClick={handleOpen} />
                  <Dialog open={open} handler={handleOpen}>
                    <DialogBody className="vid">
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${
                          videosKey && videosKey[0]?.key
                        }`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="vid"
                      ></iframe>
                    </DialogBody>
                  </Dialog>
                </div>
              </div>

              <div className="text-center md:py-5 py-2">
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
        </div>
      )}
    </div>
  );
};
export default MovieDetailsHeader;
