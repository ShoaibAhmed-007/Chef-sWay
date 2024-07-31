import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartContext } from "./ContextReducer";

export default function Navbar({ visible }) {
  const { state } = useCartContext();
  const location = useLocation();
  const clickHandle = () => {
    localStorage.removeItem("authToken");
  };
  return (
    <>
      <nav className="flex justify-between items-center bg-green-900 p-3">
        <div className="flex gap-3 items-center">
          <div className="text-3xl text-white">Chef'sWay</div>
          <Link className="text-xl text-white" to="/">
            Home
          </Link>
          {localStorage.getItem("authToken") ? (
            <div
              className="flex justify-between items-center"
              style={{ width: "80em" }}
            >
              {location.pathname !== "/myOrders" && (
                <Link className="text-xl text-white" to="/myOrders">
                  My Orders
                </Link>
              )}
              {location.pathname !== "/myOrders" ? (
                <>
                  <div className="flex justify-center items-center gap-4">
                    <button
                      className="text-base bg-white rounded px-2 py-1 flex gap-2 justify-center items-center"
                      onClick={() => visible(true)}
                    >
                      My Cart
                      <span
                        className="bg-red-900 w-5 text-sm"
                        style={{ borderRadius: "100%" }}
                      >
                        {state.length}
                      </span>
                    </button>
                    <Link
                      className="text-base bg-white rounded px-2 py-1"
                      to="/login"
                      onClick={clickHandle}
                    >
                      Signout
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex justify-end items-center"
                    style={{ width: "80em" }}
                  >
                    <Link
                      className="text-base bg-white rounded px-2 py-1"
                      to="/login"
                      onClick={clickHandle}
                    >
                      Signout
                    </Link>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {location.pathname !== "/login" &&
              location.pathname !== "/signup" ? (
                <>
                  <div className="flex justify-end" style={{ width: "80em" }}>
                    <div className="flex flex-row gap-3 items-center">
                      <Link
                        className="text-base bg-white rounded px-2 py-1"
                        to="/login"
                      >
                        Login
                      </Link>

                      <Link
                        className="text-base bg-white rounded px-2 py-1"
                        to="/signup"
                      >
                        Signup
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
}
