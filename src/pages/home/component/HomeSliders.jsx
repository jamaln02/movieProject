import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const HomeSliders = ({ data, name }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container mx-auto">
      <div className="uppercase font-semibold md:mx-16 text-2xl text-light-blue-500 text-center md:text-start">
        {name}
      </div>
      <div className="mx-14 py-10">
        <Slider {...settings}>
          {data.map((content, index) => (
            <div key={index}>
              <Link
                to={
                  content.title
                    ? `/movie/${content.id}/title/${content.title}`
                    : `/tv/${content.id}/name/${content.name}`
                }
              >
                {content.backdrop_path ? (
                  <img
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face${content.backdrop_path}`}
                    alt="logo"
                    width={330}
                    className="p-2"
                  />
                ) : (
                  <img
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face${content.poster_path}`}
                    alt="logo"
                    width={330}
                    className="p-2"
                  />
                )}
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeSliders;
