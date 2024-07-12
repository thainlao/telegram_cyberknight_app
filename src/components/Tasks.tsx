import { useEffect, useState } from 'react';
import '../styles/tasks.css';
import { ITasks, UserDataProps } from '../utils/types';
import SingleTask from './SingleTask';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import ErrorPage from '../pages/ErrorPage';

const Tasks: React.FC<UserDataProps> = ({userData}) => {
    const [tasks, setTasks] = useState<ITasks[]>([]);
    const [canCollect, setCanCollect] = useState<boolean>(false);
    const [nextAvailableTime, setNextAvailableTime] = useState<Date | null>(null);

    if (!userData) {
        return <ErrorPage />
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.post('http://localhost:3000/user/tasks', { telegramId: userData.telegramId });
                if (response.data.success) {
                    setTasks(response.data.tasks);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const fetchCollectionStatus = async () => {
            try {
                const response = await axios.post('http://localhost:3000/user/collection-status', { telegramId: userData.telegramId });
                if (response.data.canCollect) {
                    setCanCollect(true);
                } else {
                    setCanCollect(false);
                    setNextAvailableTime(new Date(response.data.nextAvailableTime));
                }
            } catch (error) {
                console.error('Error fetching collection status:', error);
            }
        };

        fetchTasks();
        fetchCollectionStatus();
    }, [userData.telegramId]);


    const sortedTasks = [...tasks].sort((a,b) => {
        const statusOrder = { 'claim' : 1, 'open': 2, 'blocked': 3, 'done': 4};
        return statusOrder[a.status] - statusOrder[b.status]
    });
    
    const animatedPropsOnEnter = useSpring({
        from: { opacity: 0, transform: 'scale(0.5)', backgroundColor: '#19193D' },
        to: { opacity: 1, transform: 'scale(1)', backgroundColor: '#19193D' },
        config: { tension: 200, friction: 30 }
    });

    const handleCollectReward = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/collect-coins', { telegramId: userData.telegramId });
            if (response.data.success) {
                setCanCollect(false);
                setNextAvailableTime(new Date(response.data.dailyRewardCooldown));
                // Update user's CBK coins
                // Optionally show a success message
            } else {
                // Optionally show an error message
            }
        } catch (error) {
            console.error('Error collecting daily reward:', error);
        }
    };

    const getTimeRemaining = (endTime: Date) => {
        const total = Date.parse(endTime.toString()) - Date.parse(new Date().toString());
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <animated.div style={animatedPropsOnEnter} className='tasks'>
            <div className='text_section'>
                <h1>Cyber Knight Tasks</h1>
                <h2>You will receive <span>CBK$</span> by completing the task.</h2>
            </div>

            <button
                className={`daily_reward ${canCollect ? 'able' : 'disable'}`}
                onClick={handleCollectReward}
                disabled={!canCollect}
            >
                {canCollect ? 'Get Daily Reward!' : `Next reward in: ${getTimeRemaining(nextAvailableTime as Date)}`}
            </button>

            <div className='tasks_section'>
                {sortedTasks.map((singleTask) => (
                    <SingleTask key={singleTask._id} telegramId={userData.telegramId} singleTask={singleTask} />
                ))}
            </div>
        </animated.div>
    );
};

export default Tasks;
