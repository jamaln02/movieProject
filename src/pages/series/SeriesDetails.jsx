import React from "react";
import { useParams } from "react-router-dom";

const SeriesDetails = () => {
  const { seriesid, seriesname } = useParams();

  return <div>SeriesDetails</div>;
};

export default SeriesDetails;
