import React, { useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

interface Item {
  _id: string;
  item_name: string;
  expiery_date: string;
  quantity_left: number;
  current_stock: number;
}

const SearchInventory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // To store the search input
  const [results, setResults] = useState<Item[]>([]); // To store search results
  const [loading, setLoading] = useState<boolean>(false); // To show a loading state
  const [error, setError] = useState<string | null>(null); // To display errors

  // Optimized function to handle search input with debounce
  const debouncedSearch = debounce(async (query: string) => {
    // Skip searching when input is empty
    if (query.trim() === '') {
      setResults([]); // Clear results if search query is empty
      setLoading(false);
      return;
    }
    
    setLoading(true); // Start loading
    setError(null); // Reset error

    try {
      let url = import.meta.env.VITE_Base_Url || 'http://localhost:3000';
      url = url + `/bo/apis/inventory/searchItem?q=${query}`;
      const response = await axios.get(url);
      setResults(response.data.data); // Set the results to state
    } catch (err) {
      setError('An error occurred while searching.'); // Handle error
    } finally {
      setLoading(false); // End loading
    }
  }, 300); // Debounce with 300ms delay

  // Function to handle input change
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update search query
    debouncedSearch(query); // Call debounced search function
  };

  return (
    <div className="p-5">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for an item..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)} // Trigger search on input change
        className="px-4 py-2 w-72 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black" // Text color set to black
      />

      {/* Show Loading State */}
      {loading && <p className="mt-3 text-blue-600">Loading...</p>}

      {/* Show Error */}
      {error && <p className="mt-3 text-red-600">{error}</p>}

      {/* Display Results */}
      <div className="mt-5">
        {results.length > 0 ? (
          results.map((item: Item) => (
            <div
              key={item._id}
              className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {item.item_name}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Expiry Date:</span>{' '}
                {item.expiery_date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Quantity Left:</span>{' '}
                {item.current_stock}
              </p>
            </div>
          ))
        ) : (
          !loading &&
          searchQuery && (
            <p className="mt-4 text-gray-600">No results found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchInventory;
