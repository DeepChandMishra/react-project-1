// DeleteUser.js
import axios from 'axios';

const DeleteUser = async (id, fetchData, setSuccessMessage) => {
    try {
        const response = await axios.delete('http://localhost:4000/api/users/delete', {
            data: { id },
        });
        setSuccessMessage(response.data.message); // Set success message
        fetchData();
    } catch (error) {
        alert(error.response.data.error || 'Failed to delete user'); 
    }
};

export default DeleteUser;
