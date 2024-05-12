import { Button } from "@material-tailwind/react";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionsDetails } from "../../../redux-system/redux-slices/moviesSlice/partOfCollectionSlice";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";

const PartOfCollection = () => {
  const { movieid } = useParams();
  const { movieDetailsdata } = useSelector((state) => state.moviesDetails);

  const collectionsid = movieDetailsdata?.belongs_to_collection?.id;

  const { collectionsDetailsData } = useSelector(
    (state) => state.collectionDetails
  );
  const { collectionsDetailsLoading } = useSelector(
    (state) => state.collectionDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (movieDetailsdata != null) {
      dispatch(getCollectionsDetails(collectionsid));
    }
  }, [collectionsid, movieid]);

  return (
    <div>
      {movieDetailsdata?.belongs_to_collection == null ||
      collectionsDetailsLoading ? (
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
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            backgroundImage: `
        linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.7) 2%,
          rgba(0, 0, 0, 0.5894747899159666) 95%,
          rgba(255, 255, 255, 0) 100%
        ),
        url("https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${collectionsDetailsData?.backdrop_path}}")`,
          }}
          className="my-10 flex flex-col justify-evenly items-center mx-14 "
        >
          <div className="text-white text-3xl my-5 p-5">
            Part of {collectionsDetailsData?.name}
          </div>
          <div className="text-light-blue-500 text-xl my-2 ">Includes : </div>
          {collectionsDetailsData?.parts?.map((ele, ind) => (
            <div key={ind} className="text-white font-bold my-2 p-2">
              <span className="text-light-blue-500 font-semibold">
                {ind + 1}:
              </span>
              {ele?.title}
            </div>
          ))}
          <Button
            variant="outlined"
            className="rounded-full text-base font-bold text-light-blue-500 border-white hover:bg-white my-5 p-2"
          >
            VIEW THE COLLECTION
          </Button>
        </div>
      )}
    </div>
  );
};

export default PartOfCollection;
