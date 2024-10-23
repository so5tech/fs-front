import React, { useState } from 'react';
import { ShopItem } from './types';

type TaskDetailsProps = {
    item: ShopItem;
    onAddToCart: (_id: string, name: string, quantity: number) => void;
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

    const isOutOfStock = item.status === 'Out_of_Stock' || item.current_stock <= 0;

    return (
        <div className="shop-details w-72 h-196 p-4 border rounded-lg shadow-md flex flex-col justify-between">
            {/* Image Section */}
            <div className="w-full h-40 bg-gray-200 mb-4 flex items-center justify-center">
                {item?.image_link ? (
                    <img 
                        src={item.image_link} 
                        className="w-full h-full object-cover rounded-lg" 
                        alt={item?.item_name} 
                    />
                ) : (
                    <span className="text-gray-500">No Image Available</span>
                )}
            </div>

            {/* Item Name & Description */}
            <h3 className="text-lg font-bold text-center mb-2">{item?.item_name}</h3>
            <p className="text-gray-700 text-center mb-2">{item?.discription}</p>
            <p className="text-center mb-2 font-semibold">
                <strong>Quantity Left:</strong> {item.current_stock}
            </p>

            {/* Stock Status */}
            <p className={`text-center font-semibold mb-4 ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                {isOutOfStock ? 'Out of Stock' : 'In Stock'}
            </p>

            {/* Quantity Control (Centered) */}
            <div className={`flex items-center justify-center space-x-2 mb-4 ${isOutOfStock ? 'opacity-50' : ''}`}>
                <button 
                    onClick={handleDecrease} 
                    disabled={isOutOfStock} 
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                >
                    -
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    disabled={isOutOfStock}
                    className="w-12 p-1 text-center border rounded"
                />
                <button 
                    onClick={handleIncrease} 
                    disabled={isOutOfStock} 
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                >
                    +
                </button>
            </div>

            {/* Add to Cart Button */}
            <button 
                onClick={handleAddToCart} 
                className={`w-full py-2 text-white font-semibold rounded-lg transition ${
                    isOutOfStock ? 'bg-red-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={isOutOfStock}
            >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ShopCard;
