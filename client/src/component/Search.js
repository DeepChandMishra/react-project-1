
import React, { useState } from "react";
import axios from "axios";

const Search = ({ fetchData, setData, apiUrl }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await axios.get(
          `${apiUrl}/api/users?searchTerm=${searchTerm}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      fetchData();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    fetchData();
  };

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="bg-white border border-gray-300 rounded-md py-2 px-4 text-lg shadow-sm w-80"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-300" // Removed fixed width
      >
        Search
      </button>
      <button
        onClick={handleClear}
        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-300" // Removed fixed width
      >
        Clear
      </button>
    </>
  );
};

export default Search;
