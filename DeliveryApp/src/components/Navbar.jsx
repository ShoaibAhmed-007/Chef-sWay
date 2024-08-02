import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartContext } from "./ContextReducer";

export default function Navbar({ visible }) {
  const { state, dispatch } = useCartContext();
  const location = useLocation();

  const clickHandle = async () => {
    localStorage.removeItem("authToken");
    await dispatch({
      type: "RESET",
    });
  };

  return (
    <nav className="flex justify-between items-center bg-green-900 p-4">
      <div className="flex items-center gap-6">
        <Link className="text-3xl text-white font-bold" to="/">
          Chef'sWay
        </Link>
      </div>
      <div className="flex items-center gap-6">
        {localStorage.getItem("authToken") ? (
          <>
            {location.pathname !== "/myOrders" && (
              <Link className="text-xl text-white" to="/myOrders">
                My Orders
              </Link>
            )}
            {location.pathname !== "/myOrders" && (
              <button
                className="text-base bg-white rounded px-4 py-2 flex gap-2 items-center"
                onClick={() => visible(true)}
              >
                My Cart
                <span className="bg-red-900 text-white w-5 h-5 text-center text-sm rounded-full">
                  {state.length}
                </span>
              </button>
            )}
            <Link
              className="text-base bg-white rounded px-4 py-2"
              to="/login"
              onClick={clickHandle}
            >
              Signout
            </Link>
          </>
        ) : (
          location.pathname !== "/login" &&
          location.pathname !== "/signup" && (
            <div className="flex items-center gap-4">
              <Link
                className="text-base bg-white rounded px-4 py-2"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="text-base bg-white rounded px-4 py-2"
                to="/signup"
              >
                Signup
              </Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
}
