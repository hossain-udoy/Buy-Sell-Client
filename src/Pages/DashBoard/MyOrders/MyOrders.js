import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import Loader from "../../../Components/Products/Loader/Loader";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const MyOrders = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [removeCardProduct, setRemoveCardProduct] = useState(null);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: () =>
      fetch(`https://buy-sell-server-khaki.vercel.app/booking/${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("access-token")}`,
        },
      }).then((res) => res.json()),
  });
  const handleRemoveCardProduct = () => {
    setLoading(true);
    fetch(
      `https://buy-sell-server-khaki.vercel.app/booking/${removeCardProduct?._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          setLoading(false);
          toast.success(
            `"${removeCardProduct?.productName}" deleted successfully.`,
            { duration: 2000 }
          );
          refetch();
        } else {
          toast.error(`${result.message}.`, { duration: 2000 });
        }
      });
  };
  const closeModal = () => {
    setRemoveCardProduct(null);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {orders?.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold pb-5">
            My Orders : {orders?.length}
          </h1>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id}>
                    <th> {idx + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              title="product image"
                              src={order?.image}
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div title="product Name" className="font-bold">
                            {order?.productName}
                          </div>
                          <div
                            title="Seller Email"
                            className="text-sm opacity-50"
                          >
                            {order?.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td> ${order?.price}</td>
                    <td>
                      <label htmlFor="confirm-modal">
                        <BsTrash
                          title="remove product"
                          onClick={() => setRemoveCardProduct(order)}
                          className="cursor-pointer text-red-500 text-lg"
                        />
                      </label>
                    </td>
                    <td>
                      {order?.paid === true ? (
                        <button disabled className="btn btn-sm">
                          Paid
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className="italic font-semibold text-sm">
                            Pending
                          </p>
                          <Link to={`/dashboard/payment/${order._id}`}>
                            <button className="bg-primary btn btn-sm border-none text-black hover:text-white">
                              Pay
                            </button>
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {removeCardProduct && (
            <ConfirmationModal
              successAction={handleRemoveCardProduct}
              closeModal={closeModal}
              title={`Are you sure You want to delete?`}
              message={`If you want to delete "${removeCardProduct.productName}". It can't be recover.`}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="sm:text-4xl text-2xl lg:pt-12 text-center lg:text-left pt-10 lg:pl-8 font-semibold text-red-500">
            Order were Not Found !
          </h1>
          <Link className="underline" to="/">
            Get Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
