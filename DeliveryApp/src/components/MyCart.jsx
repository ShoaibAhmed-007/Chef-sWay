import { useCartContext } from "./ContextReducer";

export default function MyCart({ visible, setVisible, setOrders }) {
  let totalPrice = 0;
  const { state, dispatch } = useCartContext();
  console.log(state);

  function decreaseQuantity(item) {
    dispatch({ type: "DECREASE_QUANTITY", payload: item.id });
  }

  function increaseQuantity(item) {
    dispatch({ type: "INCREASE_QUANTITY", payload: item.id });
  }

  function deleteItem(item) {
    dispatch({ type: "DELETE", payload: item.id });
  }
  function confirmOrder() {
    setOrders = state;
    const saveOrder = async () => {
      let res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          orderData: setOrders,
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
        <div className="bg-white p-20 flex flex-col h-4/5 justify-between w-full items-center gap-4 overflow-scroll">
          <div>No items in the cart</div>
          <div className="flex justify-end gap-4 w-full mt-12">
            <button
              className="bg-red-700 py-2 px-4 text-3xl rounded"
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
    <>
      <div
        className="fixed top-0 right-0 w-full h-full flex justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <div className="bg-white p-20 flex flex-col h-4/5 justify-between w-full items-center gap-4 overflow-scroll">
          {state.map((item) => {
            totalPrice += item.price;
            return (
              <>
                <div
                  className="flex items-center h-fit p-2 gap-4 border-2 border-black rounded-lg"
                  style={{ width: "80em" }}
                >
                  <img src={item.img} alt={item.name} className="w-44 h-24" />
                  <div>
                    <div className="text-xl w-52">{item.name}</div>
                  </div>
                  <div className="flex gap-4 w-96">
                    <div>Quantity: {item.quantity}</div>
                    <div>Size: {item.size}</div>
                    <div>Price: {item.price}</div>
                  </div>
                  <div className="flex gap-4 w-96 justify-end">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="bg-red-700  px-4 text-3xl rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="bg-blue-700 px-4 text-3xl rounded"
                    >
                      +
                    </button>
                    <button onClick={() => deleteItem(item)}>Delete</button>
                  </div>
                </div>
              </>
            );
          })}
          <div className="flex justify-between w-full items-center">
            <div className="w-96 font-bold text-2xl">
              Total Price: <span className="font-normal">{totalPrice}</span>
            </div>
            <div className="flex justify-end gap-4 w-full mt-12">
              <button
                className="bg-red-700 py-2 px-4 text-3xl rounded"
                onClick={() => setVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-700 py-2 px-4 text-3xl rounded"
                onClick={() => confirmOrder()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
