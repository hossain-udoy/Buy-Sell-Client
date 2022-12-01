import React from "react";
import logo from "../../assets/verified.jpg";

const ProductCard = ({ data, setBooked, setReported }) => {
  const {
    name,
    image,
    location,
    resailPrice,
    originalPrice,
    sellerName,
    year,
    posted,
    condition,
    description,
    Status,
  } = data;
  const handleBooked = () => {
    setBooked(data);
  };
  const handleReport = () => {
    setReported(data);
  };
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-md shadow-teal-500">
        <figure className="border-r-4 lg:p-0 p-5 mt-5">
          <img src={image} className="w-96  mt-10" alt="Tv" />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">{name}</h2>

          <div className="flex flex-col gap-y-2 justify-between mb-3">
            <h2 className="card-title">Location :{location}</h2>
            <h2 className="text-sm">Posted : {posted}</h2>
            <h2 className="text-sm">Status : {Status}</h2>

            <h2 className="text-sm font-bold">
              Original Price : $ {originalPrice}
            </h2>
            <h2 className="text-sm font-bold">
              Resale Price : $ {resailPrice}
            </h2>
            <h2 className="text-sm font-bold">Years Of Use : {year}</h2>
            <div className="flex justify-start items-center">
              <h2 className="text-sm font-bold">Owner : {sellerName}</h2>
              <img src={logo} className="w-8" alt="" />
            </div>
            <h2 className="text-sm font-bold">Condition : {condition}</h2>
            <h2 className="text-sm font-bold">Description : {description}</h2>
          </div>
          <div className="card-actions justify-center items-center">
            <div className="flex justify-evenly gap-5">
              <label
                onClick={handleBooked}
                htmlFor="booking-modal"
                className="btn bg-teal-500"
              >
                Book Now
              </label>
              <label
                onClick={handleReport}
                htmlFor="report-modal"
                className="btn bg-teal-500"
              >
                Report
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
