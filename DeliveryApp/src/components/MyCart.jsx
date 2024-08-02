import { useCartContext } from "./ContextReducer";

export default function MyCart({ visible, setVisible, myOrders }) {
  let totalPrice = 0;
  const { state, dispatch } = useCartContext();

  function decreaseQuantity(item) {
    dispatch({ type: "DECREASE_QUANTITY", payload: item.id });
  }

  function increaseQuantity(item) {
    dispatch({ type: "INCREASE_QUANTITY", payload: item.id });
  }

  function deleteItem(item) {
    dispatch({ type: "DELETE", payload: item.id });
  }
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  function confirmOrder() {
    myOrders(state);
    const saveOrder = async () => {
      let res = await fetch(`${API_BASE_URL}api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          orderData: state,
        }),
      });
      const json = await res.json();
      console.log(json);
    };
    saveOrder();
    dispatch({ type: "RESET" });
  }

  if (!visible) {
    return null;
  }

  if (state.length === 0) {
    return (
      <div
        className="fixed top-0 right-0 w-full h-full flex justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <div className="bg-white p-10 flex flex-col h-4/5 justify-between w-3/4 md:w-1/2 items-center gap-4 rounded-lg">
          <div className="text-xl">No items in the cart</div>
          <div className="flex justify-end gap-4 w-full mt-12">
            <button
              className="bg-red-700 py-2 px-4 text-xl rounded text-white"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 right-0 w-full h-full flex justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div className="bg-white p-10 flex flex-col h-4/5 justify-between w-3/4 md:w-1/2 items-center gap-4 rounded-lg overflow-scroll overflow-x-hidden">
        {state.map((item) => {
          totalPrice += item.price;
          return (
            <div
              key={item.id}
              className="flex items-center w-full p-4 gap-4 border-2 border-gray-300 rounded-lg bg-gray-50"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-32 h-24 rounded"
              />
              <div className="flex flex-col flex-grow gap-2">
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="text-md">Quantity: {item.quantity}</div>
                <div className="text-md">Size: {item.size}</div>
                <div className="text-md">Price: Rs.{item.price}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => decreaseQuantity(item)}
                  className="bg-red-700 px-2 text-white text-xl rounded"
                >
                  -
                </button>
                <button
                  onClick={() => increaseQuantity(item)}
                  className="bg-blue-700 px-2 text-white text-xl rounded"
                >
                  +
                </button>
                <button
                  onClick={() => deleteItem(item)}
                  className="bg-gray-700 px-2 text-white text-xl rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between w-full items-center mt-4">
          <div className="font-bold text-xl">
            Total Price: <span className="font-normal">Rs. {totalPrice}</span>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-red-700 py-2 px-4 text-xl rounded text-white"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-700 py-2 px-4 text-xl rounded text-white"
              onClick={() => confirmOrder()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
