// DeleteUser.js
import axios from 'axios';

const DeleteUser = async (id, fetchData) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
        return; 
    }
    
    try {
        const response = await axios.delete('http://localhost:4000/api/users/delete', {
            data: { id },
        });
        alert(response.data.message); 
        fetchData();
    } catch (error) {
        alert(error.response.data.error || 'Failed to delete user'); 
    }
};

export default DeleteUser;
