import React, { useState } from 'react';
import axios from 'axios';

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

  // Function to handle search input
  const handleSearch = async (query: string) => {
    setLoading(true); // Start loading
    setError(null); // Reset error
    setSearchQuery(query); // Update search query

    try {
      // Send search request to backend
      let url = import.meta.env.VITE_Base_Url || "http://localhost:3000"
        url = url + `/bo/apis/inventory/searchItem?q=${query}`
      const response = await axios.get(url);
      setResults(response.data.data); // Set the results to state
    } catch (err) {
      setError('An error occurred while searching.'); // Handle error
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for an item..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)} // Trigger search on input change
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />

      {/* Show Loading State */}
      {loading && <p>Loading...</p>}

      {/* Show Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Results */}
      <div>
        {results.length > 0 ? (
          results.map((item: Item) => (
            <div key={item._id} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
              <h3>{item.item_name}</h3>
              <p>Expiry Date: {item.expiery_date}</p>
              <p>Quantity Left: {item.current_stock}</p>
            </div>
          ))
        ) : (
          !loading && searchQuery && <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchInventory;
