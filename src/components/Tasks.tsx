import '../styles/tasks.css';
import { ITasks, Status } from '../utils/types';
import SingleTask from './SingleTask';

const Tasks = () => {
    const tasks: ITasks[] = ([
        {
            _id: '1',
            img: 'https://i.imgur.com/SLFXGf9.png',
            title: 'Complete Profile',
            task_text: 'Complete Your 1st task',
            status: 'blocked' as Status
        },
        {
            _id: '2',
            img: 'https://i.imgur.com/RLRmjZS.png',
            title: 'First Mission',
            task_text: 'Complete your second task.',
            status: 'claim' as Status
        },
        {
            _id: '3',
            img: 'https://i.imgur.com/zd75TN9.png',
            title: 'Third Mission',
            task_text: 'Complete your third task.',
            status: 'done' as Status
        },
        
    ]);

    const sortedTasks = [...tasks].sort((a,b) => {
        const statusOrder = { 'claim' : 1, 'blocked': 2, 'done': 3};
        return statusOrder[a.status] - statusOrder[b.status]
    });
    

    return (
        <div className='tasks'>
            <div className='text_section'>
                <h1>Cyber Knight Tasks</h1>
                <h2>You will receive CBK$ by completing the task.</h2>
            </div>

            <div className='tasks_section'>
                {sortedTasks.map((singleTask) => (
                    <SingleTask key={singleTask._id} singleTask={singleTask} />
                ))}
            </div>
        </div>
    );
};

export default Tasks;
