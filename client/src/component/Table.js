import React, { useState } from "react";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Table = ({ data, fetchData }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleUpdateClick = (id) => {
    setUserId(id);
    setShowUpdate(true);
  };

  const handleClose = () => {
    setShowUpdate(false);
    setUserId(null);
  };

  const handleDeleteClick = (id) => {
    console.log("Deleting user with ID:", id);
    DeleteUser(id, fetchData);
  };

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-500 bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-600 w-1/12 px-4 py-2">ID</th>
            <th className="border border-gray-600 w-3/12 px-4 py-2">Name</th>
            <th className="border border-gray-600 w-2/12 px-4 py-2">Age</th>
            <th className="border border-gray-600 w-3/12 px-4 py-2">
              Phone Number
            </th>
            <th className="border border-gray-600 w-4/12 px-4 py-2">Address</th>
            <th className="border border-gray-600 w-2/12 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr
                key={item.id}
                className="border-b transition duration-200 hover:bg-blue-100 hover:scale-95"
              >
                <td className="border border-gray-600 w-1/12 px-4 py-2">
                  {index + 1 + indexOfFirstItem}
                </td>
                <td className="border border-gray-600 w-3/12 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-600 w-2/12 px-4 py-2">
                  {item.age}
                </td>
                <td className="border border-gray-600 w-3/12 px-4 py-2">
                  {item.phoneno}
                </td>
                <td className="border border-gray-600 w-4/12 px-4 py-2">
                  {item.address}
                </td>
                <td className="border border-gray-600 w-2/12 px-4 py-2">
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleUpdateClick(item.id)}
                      className="text-blue-500 bg-blue-100 hover:bg-blue-300 px-3 py-1 rounded transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="text-red-500 bg-red-100 hover:bg-red-300 ml-2 px-3 py-1 rounded transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border border-gray-600 px-4 py-2 text-center"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: () => <ArrowBackIcon className="text-white" />,
                next: () => <ArrowForwardIcon className="text-white" />,
              }}
              sx={{
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "blue",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
              {...item}
            />
          )}
        />
      </div>

      {/* Update User Modal */}
      <UpdateUser
        showUpdate={showUpdate}
        onClose={handleClose}
        userId={userId}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Table;
