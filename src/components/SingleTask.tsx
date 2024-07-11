import axios from "axios";
import { ISingleTaskProps } from "../utils/types";

const SingleTask: React.FC<ISingleTaskProps> = ({ singleTask, telegramId }) => {

    const getButtonClass = () => {
        switch (singleTask.status) {
            case 'done':
                return 'btn-done';
            case 'claim':
                return 'btn-claim';
            case 'blocked':
                return 'btn-blocked';
            default:
                return '';
        }
    };

    const getTaskClass = () => {
        switch (singleTask.status) {
            case 'done':
                return 'single_task--done';
            case 'claim':
                return 'single_task--claim';
            case 'blocked':
                return 'single_task--blocked';
            default:
                return '';
        }
    };

    const handleClaim = async () => {
        if (singleTask.status === 'claim') {
            try {
                const response = await axios.post('http://localhost:3000/user/claim-task', { telegramId, taskId: singleTask._id });
                if (response.data.success) {
                    singleTask.status = 'done';
                }
            } catch (error) {
                console.error('Error claiming task:', error);
            }
        } else if (singleTask.status === 'blocked' && singleTask.link) {
            window.open(singleTask.link, '_blank');

            // Assume user has completed the task and update status to 'claim'
            try {
                const response = await axios.post('http://localhost:3000/user/update-task-status', { telegramId, taskId: singleTask._id, newStatus: 'claim' });
                if (response.data.success) {
                    singleTask.status = 'claim';
                }
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        }
    };

    return (
        <div className={`single_task ${getTaskClass()}`}>
            <div className="single_task1">
                <img loading="lazy" src={singleTask.img} alt={singleTask.title} />
                <div className="single_task_textsection">
                    <h3>{singleTask.title}</h3>
                    <p>{singleTask.task_text}</p>
                </div>
            </div>

            <button className={getButtonClass()} disabled={singleTask.status === 'blocked'} onClick={handleClaim}>
                {singleTask.status === 'claim' ? 'Claim' : singleTask.status === 'done' ? '' : 'Blocked'}
            </button>
        </div>
    )
}

export default SingleTask;