import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../Components/Products/Loader/Loader";

const Advertise = () => {
  const { data: advertise, isLoading } = useQuery({
    queryKey: ["advertiseTv"],
    queryFn: () =>
      fetch(`https://buy-sell-server-khaki.vercel.app/advertiseTv`).then(
        (res) => res.json()
      ),
  });
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {advertise?.length > 0 && (
        <>
          <h1 className="pb-5 text-3xl font-semibold pl-2 border-t pt-5 text-center">
            Advertise Products
          </h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 mb-12 gap-5">
            {advertise?.map((furniture) => {
              const {
                name,
                image,
                location,
                category,
                resailPrice,
                originalPrice,
                year,
                posted,
                sellerName,
                verified,
                email,
                sellerImage,
                Status,
                condition,
                description,
              } = furniture;
              return (
                <div className=" rounded-md shadow-lg shadow-slate-500">
                  <img
                    src={image}
                    alt=""
                    className="object-cover object-center w-full rounded-t-md h-72 "
                  />

                  <div className="sm:text-[13px] text-[12px] flex flex-col gap-1 mt-2 font-semibold">
                    <div className="px-2 ">
                      <p className="text-black">
                        OriginalPrice:
                        <span className="text-black pl-2 font-semibold ">
                          ${originalPrice}
                        </span>
                      </p>
                    </div>
                    <div className="px-2">
                      <p className="text-black">
                        ReSalePrice:
                        <span className="font-semibold pl-2 text-black">
                          ${resailPrice}
                        </span>
                      </p>
                    </div>
                    <div className=" px-2 text-black">
                      <p className="text-black">Name: {name}</p>
                    </div>
                    <div className="px-2 text-black">
                      <p className="text-black">
                        Uses of:
                        <span className="text-black font-bold pl-2 ">
                          {" "}
                          {year}
                        </span>
                      </p>
                    </div>
                    <div className="px-2">
                      <p className="text-black">
                        Category:{" "}
                        {category ? (
                          <span className="pl-2 text-black">{category}</span>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                    <div className="px-2">
                      <p className="text-black">
                        Status:{" "}
                        {Status ? (
                          <span className="pl-2 text-black">{Status}</span>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                    <div className=" px-2 ">
                      <p className="text-black">
                        Condition:
                        {condition ? (
                          <span className="pl-2 text-black">{condition}</span>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                    <div className="  px-2 ">
                      <p className="text-justify">
                        <span className="font-bold text-black">
                          Description:
                        </span>
                        {description ? (
                          <span className="pl-2  text-black">
                            {description}
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                  </div>
                  <fieldset className="border border-gray-700 rounded-sm mb-4 mt-4  mx-5">
                    <legend className="font-semibold text-black">Seller</legend>
                    <figcaption className="flex items-center  pl-4 space-x-2">
                      <div className="relative">
                        <img
                          title={sellerName}
                          alt=""
                          className="rounded-full w-9 h-9"
                          src={sellerImage}
                        />
                        {verified === "true" && (
                          <img
                            title="This Seller is Verified"
                            className="absolute w-4 h-4 top-0 -right-1  rounded-full"
                            src={verified}
                            alt=""
                          />
                        )}
                      </div>
                      <div className="font-medium text-black text-left">
                        <div title={email}>{sellerName}</div>
                        <div className="  flex items-center   text-black">
                          <span title="Location">{location} </span>
                        </div>
                      </div>
                    </figcaption>
                    <div className="flex gap-1 pb-1 pl-4">
                      <span
                        title="Published Date"
                        className="text-sm font-semibold text-black"
                      >
                        {posted}
                      </span>
                    </div>
                  </fieldset>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Advertise;
