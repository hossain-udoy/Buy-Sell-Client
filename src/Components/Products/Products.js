import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import ReportModal from "./ReportModal";

const Products = () => {
  const datas = useLoaderData();
  const [booked, setBooked] = useState(null);
  const [reported, setReported] = useState(null);
  console.log(booked);

  return (
    <div>
      <div className="grid grid-cols-1 m-10 gap-y-10 ">
        <h1 className="text-center text-3xl my-5">{datas[0].category} TV</h1>
        {datas.map((data) => (
          <div key={data._id}>
            <ProductCard
              setReported={setReported}
              setBooked={setBooked}
              data={data}
            ></ProductCard>
          </div>
        ))}
      </div>
      {booked && (
        <ProductModal booked={booked} setBooked={setBooked}></ProductModal>
      )}
      {reported && (
        <ReportModal
          reported={reported}
          setReported={setReported}
        ></ReportModal>
      )}
    </div>
  );
};

export default Products;
