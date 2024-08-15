// context/CartContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { product } from "@/type";
import { toast } from "react-toastify";

interface CartContextType {
  cart: product[];
  addToCart: (product: product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<product[]>([]);

  const addToCart = (product: product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    toast.success("clear this product");
  };

  const clearCart = () => {
    setCart([]);
    toast.success("clear all products");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
