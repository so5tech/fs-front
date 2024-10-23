import React, { useEffect, useState } from 'react';
import './shop.css';
import axios from 'axios';

type CartProps = {
  items: { item_id: string; item_name: string; quantity: number }[];
  onClose: () => void;
};

const Cart: React.FC<CartProps> = ({ items, onClose }) => {
  console.log(items, "items")
  const [user, setUser] = useState({ user: { name: "", _id: "", token: "" } });
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    items?.reduce((acc, item) => ({ ...acc, [item.item_id]: item.quantity }), {})
  );
  console.log(quantities, "ldfjld")
  // State to manage the sidebar width
  const [cartWidth, setCartWidth] = useState<string>('300px'); // Default width

  const handleIncrease = (id: string) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1
    }));
  };

  //   const handleDelete = (id: string) => {
  //     setQuantities(prevQuantities => ({
  //         ...prevQuantities,
  //         [id]: 0
  //     }));
  // };

  const handleDecrease = (id: string) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 1 ? prevQuantities[id] - 1 : 1
    }));
  };

  const handleQuantityChange = (id: string, value: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: value
    }));
  };
  const [payment, setPayment] = useState<String>("Not Selected")
  const handleProceedToPayment = () => {
    // Set the cart width to a new value on button click
    setCartWidth('600px'); // Change the width to 600px
    setPayment("Selection Stage")
  };
  const handlePaymentMethod = async () => {
    const updateCartStatus = async () => {
      let url = import.meta.env.VITE_Base_Url || "http://localhost:3000"
      url = url + `/bo/apis/cart/${user.user._id}/Confermed`
      const cartUpdated = await axios.put(url);
      alert(cartUpdated.data.message)
    }
    await updateCartStatus()
    setPayment("Place Order")
  };

  return (
    <div className={`cart-sidebar bg-white p-6 shadow-lg fixed left-0 top-0 h-full z-50 transition-all`} style={{ width: cartWidth }}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Your Cart</h3>
        <button className="text-red-500 hover:text-red-700 transition duration-150" onClick={onClose}>
          Close
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {items.map(item => (
            <li key={item.item_id} className="flex justify-between items-center border-b pb-2">

              <div className="quantity-control flex items-center space-x-2 ml-4 mr-0"> {/* Set right margin to zero */}
                <span className="text-gray-800 flex-1">{item.item_name}</span> {/* Ensures full name is displayed */}
                <div className="flex items-center ml-auto space-x-2"> {/* Aligns quantity controls to the right */}
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition duration-150"
                    onClick={() => handleDecrease(item.item_id)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={quantities[item.item_id]}
                    onChange={(e) => handleQuantityChange(item.item_id, Number(e.target.value))}
                  />
                  <button
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition duration-150"
                    onClick={() => handleIncrease(item.item_id)}
                  >
                    +
                  </button>
                </div>
              </div>

            </li>
          ))}
        </ul>
      )}

      <div className="payment-section mt-6">
        {payment === "Not Selected" ? (
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleProceedToPayment}
          >
            Proceed To Payment
          </button>
        ) : payment === "Selection Stage" ? (
          <div className="mt-4 space-y-2">
            <p className="text-lg font-semibold">Select Payment Method:</p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  className="mr-2"
                // onChange={handlePaymentMethod} // Handle selection logic here
                />
                <span>UPI</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash_on_delevery"
                  className="mr-2"
                // onChange={handlePaymentMethod} // Handle selection logic here
                />
                <span>Cash On Delivery</span>
              </label>
            </div>
            <button
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
              onClick={handlePaymentMethod}
            >
              Confirm Payment Method & Place Order
            </button>
          </div>
        ) : payment === "Place Order" ? (
          <div className="mt-4">
            <p className="text-lg text-green-600 font-semibold">Order Placed</p>
          </div>
        ) : null}
      </div>
    </div>


  );
};

export default Cart;
