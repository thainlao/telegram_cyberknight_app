import { Iprops } from "../utils/types";

const SingleTask: React.FC<Iprops> = ({ singleTask }) => {

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

    return (
        <div className={`single_task ${getTaskClass()}`}>
            <div className="single_task1">
                <img loading="lazy" src={singleTask.img} alt={singleTask.title} />
                <div className="single_task_textsection">
                    <h3>{singleTask.title}</h3>
                    <p>{singleTask.task_text}</p>
                </div>
            </div>

            <button className={getButtonClass()} disabled={singleTask.status === 'blocked'}>
                {singleTask.status === 'claim' ? 'Claim' : singleTask.status === 'done' ? '' : 'Claim'}
            </button>
        </div>
    )
}

export default SingleTask;