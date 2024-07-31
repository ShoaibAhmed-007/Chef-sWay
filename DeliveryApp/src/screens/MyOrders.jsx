import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MyCart from "../components/MyCart";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const myOrders = async () => {
    let result = await fetch("http://localhost:3000/api/getOrders", {
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
      <div className="p-10 flex flex-col gap-6">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white"
              key={index}
            >
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4">
                  Order Date: {order.orderDate}
                </h2>
                <h2 className="text-xl font-semibold mb-4">
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
          <div>No orders found.</div>
        )}
      </div>
    </>
  );
}
