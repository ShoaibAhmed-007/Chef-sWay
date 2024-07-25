import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    } else {
      console.log("Enter Valid Credentials");
    }
  };
  const onChangeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div>
        <div
          className="flex flex-col justify-center items-center w-full"
          style={{ height: "42.2em" }}
        >
          <form
            onSubmit={onSubmitHandle}
            className="flex flex-col gap-2 justify-center items-center border border-black p-4"
          >
            <label htmlFor="email" className="mb-2">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChangeHandler}
                className="border border-black p-2 ml-2"
              />
            </label>
            <label htmlFor="password" className="mb-2">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChangeHandler}
                className="border border-black p-2 ml-2"
              />
            </label>
            <button type="submit" className="bg-green-700 py-2 px-6 rounded">
              Login
            </button>
            <Link to="/signup" className="bg-blue-700 py-2 px-2 rounded">
              New user
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
