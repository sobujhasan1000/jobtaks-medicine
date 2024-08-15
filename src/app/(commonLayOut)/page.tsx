"use server";
import CarusolSet from "../componants/Carusol/CarusolSet";
import OfferMedicine from "../componants/offer/OfferMedicine";
import BestSell from "../componants/BestSell/BestSell";
import Products from "../componants/products/Products";
import { product } from "@/type";
import NewProducts from "../componants/NewProducts/NewProducts";

export default async function Home() {
  const res = await fetch(`${process.env.BACKEND_URL}/medicines`);
  const products: product[] = await res.json();
  console.log(products);
  return (
    <div>
      <CarusolSet></CarusolSet>
      <OfferMedicine></OfferMedicine>
      <Products products={products} />
      <NewProducts products={products} />
      <BestSell products={products} />
    </div>
  );
}
