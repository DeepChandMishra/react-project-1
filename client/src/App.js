import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./component/Table";
import AddUser from "./component/AddUser";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showData, setShowData] = useState(false);

  const PORT = 4000;
  const apiUrl = `http://localhost:${PORT}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/all`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowData = () => {
    setShowData(true);
  };

  const handleCloseModal = () => {
    setShowData(false);
  };

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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <h1 className="text-white text-5xl font-bold text-center mb-4">
        People Hub
      </h1>
      <p className="text-gray-300 text-lg text-center mb-4">
        Find and manage users easily
      </p>
      <div className="flex mb-4 space-x-2 justify-center">
        <button
          onClick={handleShowData}
          className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-300"
        >
          Add user
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="bg-white border border-gray-300 rounded-md py-2 px-4 text-lg shadow-sm w-80"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-300"
        >
          Clear
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-4xl">
        <Table data={data} fetchData={fetchData} />

        {/* AddUser controls */}
        <AddUser
          showData={showData}
          onClose={handleCloseModal}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default App;
