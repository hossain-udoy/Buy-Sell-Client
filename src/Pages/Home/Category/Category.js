import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`https://buy-sell-server-khaki.vercel.app/categoryCollection`)
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl my-5 font-bold">TV CATEGORIES</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-7 ">
        {categories.map((category) => (
          <CategoryCard key={category._id} categori={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Category;
