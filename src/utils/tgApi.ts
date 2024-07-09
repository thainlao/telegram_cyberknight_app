import axios from 'axios';

export const fetchTelegramUserData = async (initData: string) => {
    try {
        const response = await axios.get('http://localhost:3000/auth', {
            params: {
                initData: initData
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};