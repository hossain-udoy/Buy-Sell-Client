import React from "react";
import { Link } from "react-router-dom";
const CategoryCard = ({ categori }) => {
  const { image, category } = categori;
  return (
    <div className="shadow-md shadow-teal-600">
      <div className=" rounded-lg p-4 shadow-sm shadow-indigo-100">
        <img
          alt="Home"
          src={image}
          className="h-56 w-full rounded-md object-cover"
        />

        <div className="mt-2">
          <dl>
            <div className="text-center">
              <Link to={`/category/${category}`}>
                <h1 className="font-medium text-lg w-28 text-center btn bg-teal-500 text-white">
                  {category}
                </h1>
              </Link>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
