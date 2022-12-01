import React from "react";
import Advertise from "./Advertise/Adverteise";
import BannerItem from "./Banner/BannerItem";
import Category from "./Category/Category";
import WhyUs from "./WhyUs/WhyUs";

const Home = () => {
  return (
    <div>
      <BannerItem></BannerItem>
      <div className="mx-7">
        <Advertise></Advertise>
      </div>
      <Category></Category>
      <WhyUs></WhyUs>
    </div>
  );
};

export default Home;
