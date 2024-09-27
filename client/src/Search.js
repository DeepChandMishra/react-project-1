// Search.js
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useSearch = (setData, fetchData, apiUrl) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(`${apiUrl}/api/users`, {
          params: { searchTerm }
        });
        setData(response.data); // Update state with search results
        toast.success('Search results fetched successfully!');
      } catch (error) {
        console.error("Error fetching search results:", error);
        toast.error('Failed to fetch search results.');
      }
    } else {
      fetchData(); // Fetch all data if searchTerm is empty
    }
  };

  const handleClear = () => {
    setSearchTerm(""); // Clear search term
    fetchData(); // Re-fetch all data
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleClear,
  };
};

export default useSearch;
