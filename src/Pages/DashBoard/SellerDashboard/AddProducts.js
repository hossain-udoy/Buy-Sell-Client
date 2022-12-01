import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const date = new Date();
  const options = {
    day: "numeric",
    year: "numeric",
    month: "long",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  const { register, handleSubmit } = useForm();

  const addProduct = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImageKey}`,
      { method: "POST", body: formData }
    )
      .then((res) => res.json())
      .then((img) => {
        if (img.success) {
          const addedProducts = {
            name: data.name,
            location: data.location,
            originalPrice: data.originalPrice,
            resailPrice: data.resailPrice,
            category: data.category,
            posted: currentDate,
            year: data.year,
            sellerName: user?.displayName,
            condition: data.condition,
            image: img.data.url,
            Status: "available",
            verified: "false",
            email: user?.email,
          };

          fetch("https://buy-sell-server-khaki.vercel.app/tvCollection", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addedProducts),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.acknowledged) {
                toast.success("product added successfully");
                navigate("/dashboard/allProducts");
              }
            });
        }
      });
  };

  return (
    <div className="mt-10 sm:mt-0">
      <form onSubmit={handleSubmit(addProduct)}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  TV name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  {...register("name", { required: "Name is required" })}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="resailPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Resale Price
                </label>
                <input
                  type="text"
                  name="resailPrice"
                  id="resailPrice"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  {...register("resailPrice", {
                    required: "price is required",
                  })}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Original Price
                </label>
                <input
                  type="text"
                  name="originalPrice"
                  id="originalPrice"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  {...register("originalPrice", {
                    required: "price is required",
                  })}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="photo"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  {...register("image", { required: "Photo is required" })}
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  autoComplete="category"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  {...register("category")}
                >
                  <option value="Samsung" defaultValue>
                    Samsung
                  </option>
                  <option value="LG">LG</option>
                  <option value="Sony">Sony</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Usage year/month
                </label>
                <input
                  type="text"
                  name="year"
                  id="year"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  {...register("year")}
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700"
                >
                  Condition
                </label>

                <select
                  id="condition"
                  name="condition"
                  autoComplete="condition"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  {...register("condition")}
                >
                  <option value="Fair" defaultValue>
                    Fair
                  </option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
