import { product } from "@/type";
import ProductCard from "../Shared/ProductCard";

const NewProducts = ({ products }: { products: product[] }) => {
  return (
    <div className="p-6 ">
      <h1 className="py-4 text-2xl font-bold ">New product</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.slice(4, 8).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
