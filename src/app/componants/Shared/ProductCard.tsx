"use client";
import Image from "next/image";
import React, { useState } from "react";
import { product } from "@/type";
import Button from "./Button";
import Modal from "../Modal/Modal";
import { useCart } from "../Context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: product | undefined }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart`);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10" onClick={handleImageClick}>
          <Image
            width={120}
            height={120}
            src={product.img}
            alt={product.name}
            className="rounded-xl cursor-pointer"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{product.name}</h2>
          <p>${product.price}</p>
          <p>${product.get_offer.slice(10)}</p>
          <div className="card-actions">
            <Button onClick={handleAddToCart}>add to cart</Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {product.name}
        </h2>
        <div className="flex justify-center mb-4">
          <Image
            width={240}
            height={240}
            src={product.img}
            alt={product.name}
            className="rounded-lg"
          />
        </div>
        <p className="text-lg text-gray-600 mb-2">Price: ${product.price}</p>
        <p className="text-md text-green-500 font-semibold mb-2">
          {product.get_offer}
        </p>
        <p className="text-sm text-gray-500">{product.details}</p>
      </Modal>
    </div>
  );
};

export default ProductCard;
