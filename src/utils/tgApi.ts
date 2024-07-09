import axios from 'axios';

export const fetchTelegramUserData = async (initData: string) => {
    try {
        console.log('Making request to fetch user data:', initData);
        const response = await axios.get('http://localhost:3000/auth', {
            params: {
                initData: initData
            },
            withCredentials: true
        });

        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};