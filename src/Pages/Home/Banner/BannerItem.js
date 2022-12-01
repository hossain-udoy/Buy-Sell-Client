import React from "react";
import Banner from "./Banner";
import img1 from "../../../assets/Samsung.jpg";
import img2 from "../../../assets/LG.jpg";
import img3 from "../../../assets/Sony.jpg";

const bannerData = [
  {
    image: img1,
    prev: 3,
    id: 1,
    next: 2,
  },
  {
    image: img2,
    prev: 1,
    id: 2,
    next: 3,
  },
  {
    image: img3,
    prev: 2,
    id: 3,
    next: 1,
  },
];

const BannerItem = () => {
  return (
    <div className="carousel w-full py-10">
      {bannerData.map((slide) => (
        <Banner key={slide.id} slide={slide}></Banner>
      ))}
    </div>
  );
};

export default BannerItem;
