import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Products from "../../Components/Products/Products";
import AdminLayout from "../../layout/AdminLayout";
import Main from "../../layout/Main";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Registeration from "../../Pages/Registeration/Registeration";
import Buyers from "../../Pages/DashBoard/Buyers/Buyers";
import Sellers from "../../Pages/DashBoard/Sellers/Sellers";
import AddProducts from "../../Pages/DashBoard/SellerDashboard/AddProducts";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ReportedProducts from "../../Pages/DashBoard/AdminDashboard/ReportedProducts";
import MyOrders from "../../Pages/DashBoard/MyOrders/MyOrders";
import AllProducts from "../../Pages/DashBoard/AllProducts/AllProducts";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import Notfound from "../../Pages/NotFound/NotFound";
import Payment from "../../Pages/DashBoard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registeration",
        element: <Registeration></Registeration>,
      },
      {
        path: "/category/:id",
        loader: async ({ params }) =>
          fetch(
            `https://buy-sell-server-khaki.vercel.app/tvCollection/${params.id}`
          ),
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/",
    element: (
      <PrivateRoute>
        <AdminLayout></AdminLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoute>
            <Buyers></Buyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoute>
            <Sellers></Sellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allReports",
        element: (
          <AdminRoute>
            <ReportedProducts></ReportedProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addProducts",
        element: (
          <SellerRoute>
            <AddProducts></AddProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment />,
        loader: async ({ params }) =>
          fetch(
            `https://buy-sell-server-khaki.vercel.app/singleOrder/${params.id}`
          ),
      },
      {
        path: "/dashboard/allProducts",
        element: (
          <SellerRoute>
            <AllProducts></AllProducts>
          </SellerRoute>
        ),
      },
    ],
  },
]);

export default router;
