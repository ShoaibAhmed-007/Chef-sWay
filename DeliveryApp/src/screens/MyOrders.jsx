import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const myOrders = async () => {
    let result = await fetch(`${API_BASE_URL}api/getOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });
    const json = await result.json();
    console.log(json.orderData);
    setOrders(json.orderData);
  };

  useEffect(() => {
    myOrders();
  }, []);

  const calculateTotalPrice = (orderData) => {
    return orderData.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Navbar />
      <div className="p-10 min-h-screen bg-gray-300">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              className="border border-gray-300 shadow-lg rounded-lg p-6 mb-6 bg-white"
              key={index}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </h2>
                <h2 className="text-xl font-semibold">
                  Total Price: Rs. {calculateTotalPrice(order.orderData)}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {order.orderData.length > 0 ? (
                  order.orderData.map((ord, idx) => (
                    <div
                      className="border border-gray-200 shadow-sm rounded-lg p-4 flex gap-6 items-center bg-gray-50"
                      key={idx}
                    >
                      <img
                        src={ord.img}
                        alt={ord.name}
                        className="w-32 h-20 object-cover rounded"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-medium">Name: {ord.name}</p>
                        <p className="text-lg">Quantity: {ord.quantity}</p>
                        <p className="text-lg">Price: Rs.{ord.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items found for this order.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-xl font-medium">
            No orders found.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
