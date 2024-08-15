"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../Context/CartContext";
import Button from "../Shared/Button";
import { User } from "@/type";

interface CheckoutProps {
  user: User; // Add the correct prop type
}

const Checkout = ({ user }: CheckoutProps) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Calculate the total price
  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle order submission
  const handleOrder = async () => {
    try {
      const orderData = {
        cart,
        shippingAddress,
        totalPrice,
        useremail: user.email, // Attach the logged-in user's ID
      };

      // Send POST request to backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/orders`,
        orderData
      );

      // Show success message
      toast.success(response.data.message);

      clearCart(); // Clear cart after order is placed
    } catch (error) {
      // Show error message
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Shipping Address Form */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={shippingAddress.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                placeholder="Address"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                placeholder="City"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="state"
                value={shippingAddress.state}
                onChange={handleChange}
                placeholder="State"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="zip"
                value={shippingAddress.zip}
                onChange={handleChange}
                placeholder="ZIP Code"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                placeholder="Country"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Cart Items */}
          {cart.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between mb-6 border-b pb-4"
            >
              <div className="flex items-center">
                <Image
                  src={product.img}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <Button
                onClick={() => removeFromCart(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Total Price and Buttons */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <div className="mt-6 flex justify-center gap-4">
              <Button
                onClick={handleOrder}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
              >
                Place Order
              </Button>
              <Button
                onClick={clearCart}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
