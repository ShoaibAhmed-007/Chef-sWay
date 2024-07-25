import React from "react";

export default function Dropdown({ options }) {
  return (
    <>
      <span>Select Quantity</span>
      <select name="selectQ" id="">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <span>Select Size</span>
      <select name="selectS" id="">
        {options.map((opt) => {
          return Object.entries(opt).map(([key, value]) => {
            return <option value={value}>{key}</option>
          });
        })}
      </select>
      <div>Total Price:</div>
    </>
  )
}
