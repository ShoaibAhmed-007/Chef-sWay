import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

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
      navigate("/");
    }
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
  };

  const onChangeHandle = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col justify-center items-center w-full"
        style={{ height: "42.2em" }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 justify-center items-center border border-black p-4"
        >
          <label htmlFor="name" className="mb-2">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChangeHandle}
              className="border border-black p-2 ml-2"
            />
          </label>
          <label htmlFor="email" className="mb-2">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChangeHandle}
              value={credentials.email}
              className="border border-black p-2 ml-2"
            />
          </label>
          <label htmlFor="password" className="mb-2">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              onChange={onChangeHandle}
              value={credentials.password}
              className="border border-black p-2 ml-2"
            />
          </label>
          <label htmlFor="address" className="mb-2">
            Address:
            <input
              type="text"
              id="address"
              name="geolocation"
              onChange={onChangeHandle}
              value={credentials.geolocation}
              className="border border-black p-2 ml-2"
            />
          </label>
          <button type="submit" className="bg-green-700 py-2 px-6 rounded">
            Signup
          </button>
          <Link to="/login" className="bg-blue-700 py-2 px-2 rounded">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
