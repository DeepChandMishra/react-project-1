import React, { useState } from "react";
import axios from "axios";

function AddUser({ showData, onClose, fetchData }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phoneno: "",
    address: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setSuccessMessage(""); // Clear the message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:4000/api/createUser`;
      await axios.post(url, formData);
      setSuccessMessage("User added successfully!"); // Set the success message
      fetchData(); 
      setFormData({ name: "", age: "", phoneno: "", address: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <>
      {showData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/3 my-8">
            <h1 className="text-lg mb-3 text-center font-bold">User Info</h1>
            {successMessage && (
              <p className="text-green-600 text-center mb-4">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-1"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-1"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phoneno"
                  value={formData.phoneno}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-1"
                  required
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1 font-medium">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-1"
                  required
                ></textarea>
              </div>
              <div className="flex justify-between mt-3">
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-1 px-3 rounded shadow hover:bg-purple-500 transition"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-red-600 underline"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddUser;
