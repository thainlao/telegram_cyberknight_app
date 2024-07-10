import { useState, useEffect } from 'react';
import axios from 'axios';

const useTelegramAuth = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.ready();
        const initData = tg.initDataUnsafe;

        axios.post('http://localhost:3000/auth/telegram', initData)
            .then(response => {
                if (response.data.success) {
                    console.log('User authenticated successfully');
                    setUserData(response.data.user); // Store user data in state
                } else {
                    console.log('Authentication failed');
                }
            })
            .catch(err => {
                console.error('Error during authentication', err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { userData, loading, error };
};

export default useTelegramAuth;