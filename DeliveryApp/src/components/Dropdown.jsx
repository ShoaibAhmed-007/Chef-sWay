import React from "react";
import { useState } from "react";

export default function Dropdown({ options }) {
  const [isVisibleDropdown, setDropdown] = useState(false);
  return (
    <>
      {/* <div className="dropdown relative">
        <button
          onClick={() => {
            setDropdown((prev) => !prev);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
        >
          {options[0].label}
        </button>
        <div
          className={`dropdown-menu mt-2 rounded shadow-lg ${
            isVisibleDropdown ? "block" : "hidden"
          }`}
        >
          {options.slice(1).map((opt, idx) => {
            return (
              <div
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                key={idx}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      </div> */}
      <span>{options[0].label}</span>
      <select name="selectQ" id="">
        {options.slice(1).map((opt) => {
          return <option value={opt.value}>{opt.label}</option>;
        })}
      </select>
    </>
  );
}
