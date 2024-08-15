import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

type CartItem = {
  _id: string;
  name: string;
  weight: string;
  price: number;
  img: string;
  get_offer: string;
  categories: string[];
  details: string;
  how_to_use: string;
  rating: number;
};

type ShippingAddress = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type UserOrder = {
  _id: string;
  userEmail: string;
  shippingAddress: ShippingAddress;
  totalPrice: number;
  orderDate: string;
  cart: CartItem[];
};

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>You must be logged in to view this page.</div>;
  }

  const res = await fetch(
    `${process.env.BACKEND_URL}/orders?email=${session?.user?.email}`
  );
  const orders: UserOrder[] = await res.json();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
        <h2 className="text-xl font-semibold mb-4">
          User Email: {session?.user?.email}
        </h2>

        {orders.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider">
                  Shipping Address
                </th>
                <th className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.cart.map((item) => (
                      <div key={item._id}>
                        <p className="font-semibold">{item.name}</p>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div>
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zip}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
