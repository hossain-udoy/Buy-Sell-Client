import React from "react";
import "./Banner.css";

const Banner = ({ slide }) => {
  const { image, id, prev, next } = slide;
  //   className="carousel-item relative w-full"
  return (
    <div
      id={`slide${id}`}
      className="carousel-item relative w-full"
      data-bs-ride="carousel"
    >
      {/* <!-- Inner --> */}

      {/* <!-- Single item --> */}
      <div className="carousel-item active relative float-left w-full">
        <div className="carousel-img"></div>
        <img
          src={image}
          alt=""
          className="h-[600px] overflow-hidden w-[100vw] rounded-xl"
        />
        <div className="carousel-caption hidden md:block absolute bottom-1/3 text-center left-1/4 media">
          <h5 className="text-3xl text-teal-600 mb-5 ">
            Here You Can Find Best Used Tv With Suitable Price.
            <br />
            These Products are not used more than two years.
          </h5>
          <a
            href="/"
            className="rounded  bg-teal-600 px-3 py-3 text-sm font-medium text-white shadow sm:w-auto"
          >
            Get Started
          </a>
        </div>
      </div>
      {/* <!-- Controls --> */}
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle">
          ❯
        </a>
      </div>
      {/* <!-- Indicators --> */}
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4"></div>

      {/* <!-- Inner --> */}
    </div>
  );
};

export default Banner;
