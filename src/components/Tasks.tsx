import { useEffect, useState } from 'react';
import '../styles/tasks.css';
import { ITasks, UserDataProps } from '../utils/types';
import SingleTask from './SingleTask';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import ErrorPage from '../pages/ErrorPage';

const Tasks: React.FC<UserDataProps> = ({userData}) => {
    const [tasks, setTasks] = useState<ITasks[]>([]);

    if (!userData) {
        return <ErrorPage />
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.post('/user/tasks', { telegramId: userData.telegramId });
                if (response.data.success) {
                    setTasks(response.data.tasks);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [userData?.telegramId]);


    const sortedTasks = [...tasks].sort((a,b) => {
        const statusOrder = { 'claim' : 1, 'blocked': 2, 'done': 3};
        return statusOrder[a.status] - statusOrder[b.status]
    });
    
    const animatedPropsOnEnter = useSpring({
        from: { opacity: 0, transform: 'scale(0.5)', backgroundColor: '#19193D' },
        to: { opacity: 1, transform: 'scale(1)', backgroundColor: '#19193D' },
        config: { tension: 200, friction: 30 }
    });

    return (
        <animated.div style={animatedPropsOnEnter} className='tasks'>
            <div className='text_section'>
                <h1>Cyber Knight Tasks</h1>
                <h2>You will receive CBK$ by completing the task.</h2>
            </div>

            <div className='tasks_section'>
                {sortedTasks.map((singleTask) => (
                    <SingleTask key={singleTask._id} telegramId={userData.telegramId} singleTask={singleTask} />
                ))}
            </div>
        </animated.div>
    );
};

export default Tasks;
