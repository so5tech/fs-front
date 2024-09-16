import React, { useEffect, useState } from 'react';
import './shop.css';
import axios from 'axios';

type CartProps = {
    items: { item_id: string; item_name: string; quantity: number }[];
    onClose: () => void;
};

const Cart: React.FC<CartProps> = ({ items, onClose }) => {
  console.log(items, "items")
    const [user, setUser] = useState({ user: {name: "", _id:"", token:""} });
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
        <div className="cart-sidebar" style={{ width: cartWidth }}>
            <h3>Your Cart</h3>
            <button className="close-btn" onClick={onClose}>Close</button>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <li key={item.item_id}>
                            {item.item_name}
                            <div className="quantity-control">
                                <button onClick={() => handleDecrease(item.item_id)}>-</button>
                                <input
                                    type="number"
                                    value={quantities[item.item_id]}
                                    onChange={(e) => handleQuantityChange(item.item_id, Number(e.target.value))}
                                />
                                <button onClick={() => handleIncrease(item.item_id)}>+</button>
                                {/* <button onClick={() => handleDelete(item._id)}>Delete</button> */}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className='pyt-bt'>
  {payment === "Not Selected" ? (
    <button onClick={handleProceedToPayment}>Proceed To Payment</button>
  ) : payment === "Selection Stage" ? (
    <div>
      <p>Select Payment Method:</p>
      <div>
        <label>
          <input 
            type="radio" 
            name="paymentMethod" 
            value="UPI" 
            // onChange={handlePaymentMethod} // Handle selection logic here
          />
          UPI
        </label>
      </div>
      <div>
        <label>
          <input 
            type="radio" 
            name="paymentMethod" 
            value="cash_on_delevery" 
            // onChange={handlePaymentMethod} // Handle selection logic here
          />
          Cash On Delevery
        </label>
      </div>
      <button onClick={handlePaymentMethod}>Confirm Payment Method & Place Order</button>
    </div>
  ) : payment === "Place Order" ? (
    <div>
      <p>Order Placed</p>
      
   </div>
  ) : null}
</div>

        </div>
    );
};

export default Cart;
