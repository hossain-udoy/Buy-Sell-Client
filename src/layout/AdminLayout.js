import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { MdReportGmailerrorred } from "react-icons/md";
import { BsPersonBoundingBox } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import Navbar from "../Shared/Navbar/Navbar";
import { AuthContext } from "../context/AuthProvider/AuthProvider";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);
  const [signInUser, setSignInUser] = useState({});
  useEffect(() => {
    fetch(`https://buy-sell-server-khaki.vercel.app/user/${user?.email}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setSignInUser(result);
      });
  }, [user?.email]);
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex md:flex-row flex-col">
        <div className=" md:w-1/4 flex h-screen flex-col justify-between border-r bg-white">
          <div className="px-4 py-6">
            <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
              {signInUser?.role === "admin" && (
                <>
                  <Link
                    to="/dashboard/allbuyers"
                    className="flex items-center rounded-lg  px-4 py-2 text-gray-700"
                  >
                    <div className="text-xl">
                      <BsPersonBoundingBox></BsPersonBoundingBox>
                    </div>

                    <span className="ml-3 text-sm font-medium">
                      {" "}
                      All Buyers{" "}
                    </span>
                  </Link>

                  <Link
                    to="/dashboard/allsellers"
                    className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <div className="text-xl">
                      <BsPersonBoundingBox></BsPersonBoundingBox>
                    </div>

                    <span className="ml-3 text-sm font-medium">
                      {" "}
                      All Sellers
                    </span>
                  </Link>

                  <Link
                    to="/dashboard/allReports"
                    className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <div className="text-xl">
                      <MdReportGmailerrorred></MdReportGmailerrorred>
                    </div>
                    <span className="ml-3 text-sm font-medium">
                      Reported Items
                    </span>
                  </Link>
                </>
              )}
              <Link
                to="/dashboard/"
                className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
              >
                <div className="text-xl">
                  <MdProductionQuantityLimits></MdProductionQuantityLimits>
                </div>

                <span className="ml-3 text-sm font-medium"> My Orders </span>
              </Link>

              {signInUser?.role === "seller" && (
                <>
                  <Link
                    to="/dashboard/addProducts"
                    className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
                  >
                    <div className="text-xl">
                      <MdAddShoppingCart></MdAddShoppingCart>
                    </div>

                    <span className="ml-3 text-sm font-medium">
                      Add a Product
                    </span>
                  </Link>

                  <Link
                    to="/dashboard/allProducts"
                    className="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <div className="text-xl">
                      <FaProductHunt></FaProductHunt>
                    </div>

                    <span className="ml-3 text-sm font-medium">
                      {" "}
                      All Products
                    </span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>

        <div className="md:w-3/4 m-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
