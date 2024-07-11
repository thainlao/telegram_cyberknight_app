import axios from 'axios';

export const fetchUserData = async (username: string) => {
    try {
        const response = await axios.post('http://localhost:3000/user/api/get-user-by-username', { usernames: [username] });
        if (response.data.success) {
            return response.data.users[0]; // Assuming the response contains an array of users
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};