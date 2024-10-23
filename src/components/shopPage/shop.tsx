import React, { useState, useEffect } from 'react';
import './shop.css';
import ShopCard from './shopCard';
import { CartItem, ShopItem } from './types';
import Cart from './cart'; // Import the Cart component
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";



const ShopHome: React.FC = () => {
    const [user, setUser] = useState({ user: { name: "", _id: "", token: "", image: "" } });
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const user = {
    //     name: 'John Doe',
    //     image: 'https://via.placeholder.com/50' // Replace with the actual user image URL
    // };
    const navigate = useNavigate();

    async function Logout(e: any) {
        e.preventDefault();
        try {
          localStorage.removeItem('user');
          navigate("/", { replace: true });
        }
        catch (e) {
          console.log(e)
        }
      }

    const handleToggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };
    const [items, setItems] = useState<ShopItem[]>([
        {
            _id: "1",
            item_name: "Lemon",
            discription: "Finish the quarterly financial report.",
            quantity: 10,
            expiery_date: "2024-08-10",
            image_link: "https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyeSUyMGl0ZW18ZW58MHx8MHx8fDA%3D",
            group: "In_Stock",
            status: "In_Stock",
            quantity_left: 60,
            current_stock: 0
        }
    ]);



    const [searchQuery, setSearchQuery] = useState<string>(''); // To store the search input
    // const [results, setResults] = useState<ShopItem[]>([]); // To store search results
    const [loading, setLoading] = useState<boolean>(false); // To show a loading state
    const [error, setError] = useState<string | null>(null); // To display errors
    const handleSearch = async (query: string) => {
        if (loading || error) {
            alert("please wait");
        }
        setLoading(true); // Start loading
        setError(null); // Reset error
        setSearchQuery(query); // Update search query

        try {
            if (query.length === 0) {
                let url = import.meta.env.VITE_Base_Url || "http://localhost:3000"
                url = url + "/bo/apis/inventory/getitems"

                const fetchData = async () => {
                    try {
                        const response: any = await axios.get(url, {
                            //   headers: { Authorization: `Bearer ${user?.token}` }
                        });
                        setItems(response.data.data);
                    } catch (err) {
                        console.log("error fetching item", err);
                    }
                }
                fetchData();
            } else {
                // Send search request to backend
                let url = import.meta.env.VITE_Base_Url || "http://localhost:3000"
                url = url + `/bo/apis/inventory/searchItem?q=${query}`
                const response = await axios.get(url);
                setItems(response.data.data); // Set the results to state
            }

        } catch (err) {
            setError('An error occurred while searching.'); // Handle error
        } finally {
            setLoading(false); // End loading
        }
    };



    const handleAddToCart = async (item_id: any, item_name: any, quantity: any) => {
        console.log(`Adding ${quantity} of item ${item_name} ${item_id} to the cart`);

        // Use the state updater function to update cartItems
        setCartItems(prevItems => {
            const itemExists = prevItems.find(item => item.item_id === item_id && item.item_name === item_name);

            let updatedItems: CartItem[];

            if (itemExists) {
                // If item exists, update quantity
                updatedItems = prevItems.map(item =>
                    item.item_id === item_id && item.item_name === item_name
                        ? { ...item, quantity: quantity } // Update quantity
                        : item
                );
            } else {
                // If item does not exist, add it to the array
                updatedItems = [...prevItems, { item_id, item_name, quantity }];
            }

            // Perform the API request with updatedItems
            (async () => {
                let url = import.meta.env.VITE_Base_Url || "http://localhost:3000";
                url = `${url}/bo/apis/cart`;

                const item_list = updatedItems.map(item => ({
                    item_id: item.item_id,
                    item_name: item.item_name,
                    quantity: item.quantity
                }));

                const body = {
                    user_id: user?.user._id,
                    item_list: item_list,
                    is_delete: false
                };

                try {
                    const response = await axios.post(url, body, {
                        headers: { Authorization: `Bearer 123` }
                    });
                    console.log('Response:', response.data);
                } catch (error) {
                    console.error('Error adding to cart:', error);
                }
            })();

            return updatedItems; // Return the updated items to set the state
        });

    };
    useEffect(() => {
        let url = import.meta.env.VITE_Base_Url || "http://localhost:3000"
        url = url + "/bo/apis/inventory/getitems"

        const fetchData = async () => {
            try {
                const response: any = await axios.get(url, {
                    //   headers: { Authorization: `Bearer ${user?.token}` }
                });
                setItems(response.data.data);
            } catch (err) {
                console.log("error fetching item", err);
            }
        }
        fetchData();

    }, [!items]);




    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const toggleCart = () => {

        let url = import.meta.env.VITE_Base_Url || "http://localhost:3000";
        url = `${url}/bo/apis/cart/${user.user._id}`;
        const fetchData = async () => {
            try {
                // Example async operation (e.g., fetching data from an API)
                const response: any = await axios.get(url
                    // , {
                    // headers: { Authorization: `Bearer ${user.user?.token}` }
                    // }
                );
                setCartItems(response.data.data[0].item_list)
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
        fetchData();

        setCartOpen(!cartOpen);

    }
    const inStockItems = items.filter(item => item?.current_stock);
    const outOfStockItems = items.filter(item => !item?.current_stock);
    console
    return (
        <div className="shop-home p-4">
            <div>
                <div className="shop-nav flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Daily Needs</h2>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            className="search-input px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search for an item..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)} // Trigger search on input change
                        />
                        <button className="cart-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={toggleCart}>
                            Cart
                        </button>
                        <div className="relative">
                            {user.user.image ? (
                                <img
                                    src={user.user.image}
                                    alt="User"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    onClick={handleToggleDropdown}
                                />
                            ) : (
                                <div
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white cursor-pointer"
                                    onClick={handleToggleDropdown}
                                >
                                    {user.user.name.charAt(0)} {/* Display first letter of the user's name */}
                                </div>
                            )}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                                    <div className="py-2 px-4 text-gray-700">
                                        <p className="font-semibold">{user.user.name}</p>
                                        <button className="text-blue-600 hover:underline" onClick={() => alert('Navigating to My Orders')}>
                                            My Orders
                                        </button>
                                        <button className="text-red-600 hover:underline" onClick={Logout}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {cartOpen && (
                    <Cart items={cartItems} onClose={toggleCart} />
                )}
            </div>

            <div className="items-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {inStockItems.map(item => (
                    <ShopCard key={item._id} item={item} onAddToCart={handleAddToCart} />
                ))}

                <div className="item-separator col-span-full text-center my-4">
                    <span className="text-lg font-semibold">Out of Stock Items</span>
                </div>

                {outOfStockItems.map(item => (
                    <ShopCard key={item._id} item={item} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>


    );
}

export default ShopHome;
