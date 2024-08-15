import React from "react";
import ProductCard from "../Shared/ProductCard";
import { product } from "@/type";

const BestSell = ({ products }: { products: product[] }) => {
  return (
    <div className="p-6 bg-green-200 ">
      <h1 className="p-2 text-2xl">Best seller</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(8, 12).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSell;
