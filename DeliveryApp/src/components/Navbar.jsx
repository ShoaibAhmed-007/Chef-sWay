import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between items-center bg-green-900 p-3">
        <div className="flex flex-row gap-3 items-center">
          <div className="text-3xl text-white">FoodApp</div>
          <Link className="text-xl text-white" to="/">
            Home
          </Link>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <button className="text-base bg-white rounded px-2 py-1">
            Login
          </button>
          <button className="text-base bg-white rounded px-2 py-1">
            Signup
          </button>
        </div>
      </nav>
    </>
  );
}