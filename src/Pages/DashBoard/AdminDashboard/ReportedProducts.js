import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../Components/ConfirmationModal";
import Loader from "../../../Components/Products/Loader/Loader";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const ReportedProducts = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const {
    data: allReports,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reports", user?.email],
    queryFn: () =>
      fetch(
        `https://buy-sell-server-khaki.vercel.app/reports?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("access-token")}`,
          },
        }
      ).then((res) => res.json()),
  });
  if (isLoading) {
    return <Loader />;
  }
  console.log(deleteProduct?.reportedId);
  const handleRemoveProduct = () => {
    setLoading(true);
    fetch(
      `https://buy-sell-server-khaki.vercel.app/tv/${deleteProduct?.reportedId}?email=${user?.email}`,
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
          // setLoading(false)
          fetch(
            `https://buy-sell-server-khaki.vercel.app/reports/${deleteProduct?._id}?email=${user?.email}`,
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
                refetch();
                toast.success(
                  `${deleteProduct?.productName} deleted Product successful.`,
                  { duration: 2000 }
                );
              }
            });
        }
      });
  };
  const handleReportDelete = (report) => {
    // setLoading(true)
    fetch(
      `https://buy-sell-server-khaki.vercel.app/reports/${report?._id}?email=${user?.email}`,
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
          toast.success(`${report?.productName} deleted report successfully.`, {
            duration: 2000,
          });
          refetch();
        }
      });
  };
  const closeModal = () => {
    setDeleteProduct(null);
  };
  return (
    <div>
      {allReports?.length > 0 ? (
        <>
          <h1 className="text-3xl pl-3 font-semibold pb-4">
            All Reports : {allReports?.length}
          </h1>
          <div className="grid  sm:grid-cols-2">
            {allReports.map((report) => {
              const {
                UserName,
                image,
                productName,
                reason,
                reportDate,
                userImage,
                _id,
              } = report;
              return (
                <>
                  {" "}
                  <div key={_id} className="p-2">
                    <div className="card xl:w-[300px] bg-base-100 shadow-xl">
                      <figure>
                        <img
                          src={image}
                          className="h-[220px] w-full object-cover"
                          alt="product"
                        />
                      </figure>
                      <div className=" px-2 py-3 ">
                        <h2 className="card-title pb-3">{productName}</h2>
                        <p className="h-16 pb-4 overflow-y-scroll">{reason}</p>
                        <div className="flex pt-5 justify-center  items-center">
                          <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={userImage}
                            alt="Avatar  "
                          />
                          <div className="text-sm">
                            <p className="text-gray-900 leading-none">
                              {UserName}
                            </p>
                            <p className="text-gray-600">{reportDate}</p>
                          </div>
                        </div>
                        <div className="card-actions pt-5 justify-center">
                          <label
                            htmlFor="confirm-modal"
                            onClick={() => setDeleteProduct(report)}
                            className="btn bg-gray-500 text-white border-none btn-sm"
                          >
                            Product Delete{" "}
                          </label>
                          <label
                            onClick={() => handleReportDelete(report)}
                            className="btn btn-sm bg-gray-500 text-white border-none"
                          >
                            Report Delete
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <h1 className="sm:text-3xl text-xl font-bold  text-red-400 mt-16 lg:ml-4">
          No Reports were Found!
        </h1>
      )}
      {deleteProduct && (
        <ConfirmationModal
          successAction={handleRemoveProduct}
          closeModal={closeModal}
          title={`Are you sure You want to delete?`}
          message={`If you want to delete "${deleteProduct.productName}". It can't be recover.`}
        />
      )}
    </div>
  );
};

export default ReportedProducts;
