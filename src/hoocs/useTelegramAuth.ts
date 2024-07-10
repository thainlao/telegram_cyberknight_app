import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUserData } from '../utils/types';
                    
const useTelegramAuth = () => {
    const [userData, setUserData] = useState<IUserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [canCollect, setCanCollect] = useState<boolean>(false);
    const [nextAvailableTime, setNextAvailableTime] = useState<Date | null>(null);

    useEffect(() => {
        const tg = window.Telegram.WebApp;
        tg.ready();
        const initData = tg.initDataUnsafe;

        axios.post('http://localhost:3000/auth/telegram', initData)
            .then(response => {
                if (response.data.success) {
                    console.log('User authenticated successfully');
                    setUserData(response.data.user);
                    checkCollectionStatus(response.data.user.telegramId);  // Добавлено здесь
                } else {
                    console.log('Authentication failed');
                }
            })
            .catch(err => {
                console.error('Error during authentication', err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const checkCollectionStatus = (telegramId: string) => {
        console.log(`Checking collection status for telegramId: ${telegramId}`);
        axios.post('http://localhost:3000/user/collection-status', { telegramId })
            .then(response => {
                console.log('Collection status response:', response.data);
                setCanCollect(response.data.canCollect);
                setNextAvailableTime(response.data.nextAvailableTime ? new Date(response.data.nextAvailableTime) : null);
            })
            .catch((error) => {
                console.log(error);
                setError('Error checking collection status');
            });
    };

    return { userData, loading, error, nextAvailableTime, checkCollectionStatus, canCollect };
};

export default useTelegramAuth;
