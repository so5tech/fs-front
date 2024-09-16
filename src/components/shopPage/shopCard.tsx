import React, { useState } from 'react';
import './shop.css';
import { ShopItem } from './types';

type TaskDetailsProps = {
    item: ShopItem;
    onAddToCart: (_id: string,name: string, quantity: number) => void;
};

const ShopCard: React.FC<TaskDetailsProps> = ({ item, onAddToCart }) => {
    const [quantity, setQuantity] = useState(item?.quantity || 1);

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToCart = () => {
        onAddToCart(item?._id, item?.item_name, quantity);
    };

    // Check if the item is out of stock
    const isOutOfStock = (item.status === "Out_of_Stock" || item.current_stock <= 0);
    return (
        <div className="shop-details">
            <img src={item?.image_link} className="image-style" alt={item?.item_name} /> 
            <h3>{item?.item_name}</h3>
            <p>{item?.discription}</p>
            <p><strong>Quantity Left:</strong> {item.current_stock}</p>
            <p><strong>{isOutOfStock?"Out of Stock": "In_Stock"}</strong> </p>

            {/* Numeric input for adjusting quantity */}
            <div className={`quantity-control ${isOutOfStock ? 'disabled' : ''}`}>
                <button onClick={handleDecrease} disabled={isOutOfStock}>-</button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    disabled={isOutOfStock}
                />
                <button onClick={handleIncrease} disabled={isOutOfStock}>+</button>
            </div>
            
            {/* Add to Cart Button */}
            <button 
                onClick={handleAddToCart} 
                className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}`}
                disabled={isOutOfStock}
            >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ShopCard;


