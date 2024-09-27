import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./component/Table";
import AddUser from "./component/AddUser";
import Search from "./component/Search"; // Import the Search component
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);
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

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <h1 className="text-white text-5xl font-bold text-center mb-4">People Hub</h1>
      <p className="text-gray-300 text-lg text-center mb-4">Find and manage users easily</p>
      
      {/* Combined Add User Button and Search Section */}
      <div className="flex mb-4 space-x-2 justify-center">
        <button
          onClick={handleShowData}
          className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition duration-300" // Removed fixed width
        >
          Add user
        </button>
        <Search 
          fetchData={fetchData} 
          setData={setData} 
          apiUrl={apiUrl} 
        />
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
