import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Signup() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("/login");
    }
    if (!json.success) {
      alert(json.errors[0].msg);
    }
  };

  const onChangeHandle = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-300">
        <div className="flex flex-col justify-center items-center w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Signup</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChangeHandle}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChangeHandle}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-700 mb-2">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChangeHandle}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="geolocation" className="text-gray-700 mb-2">
                Address:
              </label>
              <input
                type="text"
                id="geolocation"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChangeHandle}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Signup
            </button>
            <Link
              to="/login"
              className="text-center text-blue-600 hover:underline mt-4"
            >
              Already a user? Login
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
