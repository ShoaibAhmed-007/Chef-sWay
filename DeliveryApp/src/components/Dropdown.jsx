import React, { useEffect, useState } from "react";

import { useCartContext } from "./ContextReducer";

export default function Dropdown({ card }) {
  const { dispatch, state } = useCartContext();

  const [selectedText, setSelectedText] = useState("");
  const [selectedValue, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);

    handleOptionChange(e);
  };
  const handleOptionChange = (e) => {
    const selectedOptionText = e.target.options[e.target.selectedIndex].text;
    if (
      selectedOptionText != "Select Quantity" &&
      selectedOptionText != "Select Size"
    ) {
      setSelectedText(selectedOptionText);
    } else {
      setSelectedText("");
    }
  };
  const [selectedQuantity, setQuantity] = useState("");
  const handleChange1 = (e) => {
    setQuantity(e.target.value);
  };
  const totalPrice = () => {
    if (isNaN(selectedQuantity) || isNaN(selectedValue)) {
      return 0;
    } else {
      return selectedQuantity * selectedValue;
    }
  };

  useEffect(() => {
    console.log(state, "State");
    console.log(selectedText, "Size");
  }, [state, selectedText]);

  const handleCart = async () => {
    await dispatch({
      type: "ADD",
      payload: {
        id: card._id,
        img: card.img,
        name: card.name,
        price: totalPrice(),
        size: selectedText,
        quantity: selectedQuantity,
      },
    });
    setValue("");
    setQuantity("");
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center gap-4">
        <div className="flex justify-between w-64 items-center">
          <select
            className="text-center"
            name="selectQ"
            value={selectedQuantity}
            onChange={handleChange1}
            id=""
          >
            <option>Select Quantity</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>

          <select
            name="selectS"
            className="text-center"
            value={selectedValue}
            onChange={handleChange}
            id=""
          >
            <option>Select Size</option>
            {card.options.map((opt) => {
              return Object.entries(opt).map(([key, value]) => {
                return (
                  <option value={value}>
                    {key[0].toUpperCase() + key.slice(1)}
                  </option>
                );
              });
            })}
          </select>
        </div>
        <div className="flex justify-between w-64 items-center">
          <div>Total Price:{totalPrice()}</div>
          <button className="bg-blue-600 rounded p-2" onClick={handleCart}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
