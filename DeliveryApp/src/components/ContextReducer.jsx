import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (
        action.payload.quantity === "Select Quantity" ||
        action.payload.quantity === "" ||
        action.payload.size === "" ||
        action.payload.size === "Select Size"
      ) {
        return [...state];
      } else if (
        state.find(
          (obj) =>
            obj.id === action.payload.id && obj.size === action.payload.size
        )
      ) {
        return state.map((innerObj) => {
          if (
            innerObj.id === action.payload.id &&
            innerObj.size === action.payload.size
          ) {
            return {
              ...innerObj,
              price: parseInt(innerObj.price) + parseInt(action.payload.price),
              quantity:
                parseInt(innerObj.quantity) + parseInt(action.payload.quantity),
            };
          } else {
            return innerObj;
          }
        });
      } else {
        return [
          ...state,
          {
            id: action.payload.id,
            name: action.payload.name,
            img: action.payload.img,
            price: action.payload.price,
            size: action.payload.size,
            quantity: action.payload.quantity,
          },
        ];
      }
    case "INCREASE_QUANTITY":
      return state.map((innerObj) => {
        if (innerObj.id === action.payload) {
          return {
            ...innerObj,
            price:
              parseInt(innerObj.price) +
              parseInt(innerObj.price / innerObj.quantity),
            quantity: parseInt(innerObj.quantity) + 1,
          };
        } else {
          return innerObj;
        }
      });

    case "DECREASE_QUANTITY":
      return state.reduce((acc, innerObj) => {
        if (innerObj.id === action.payload) {
          if (innerObj.quantity > 1) {
            return [
              ...acc,
              {
                ...innerObj,
                price:
                  parseInt(innerObj.price) -
                  parseInt(innerObj.price / innerObj.quantity),
                quantity: parseInt(innerObj.quantity) - 1,
              },
            ];
          } else {
            return acc;
          }
        } else {
          return [...acc, innerObj];
        }
      }, []);
    case "DELETE":
      return state.filter((obj) => obj.id !== action.payload);
    case "RESET":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("cartState")) || [];
  const [state, dispatch] = useReducer(reducer, initialState);

  const customDispatch = (action) => {
    const newState = reducer(state, action);
    localStorage.setItem("cartState", JSON.stringify(newState));
    dispatch(action);
  };

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ dispatch: customDispatch, state }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
