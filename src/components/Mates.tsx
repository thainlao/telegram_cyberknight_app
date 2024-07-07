
import '../styles/mates.css';
import { IFriend } from '../utils/types';
import SingleFrien from './SingleFrien';
import knight from '../assets/knight.png';

const Mates = () => {
    const friends: IFriend[] =([
        {
            _id: '1',
            friendavatar: '',
            friendName: 'IWWFLY',
            friendFriends: 5,
            firendCBK: 31.845
        },
        {
            _id: '2',
            friendavatar: '',
            friendName: 'GVolkov_01',
            friendFriends: 2,
            firendCBK: 50
        },
        {
            _id: '3',
            friendName: 'kkkatttya_v',
            friendavatar: '',
            friendFriends: 0,
            firendCBK: 11.179
        },
        {
            _id: '1',
            friendavatar: '',
            friendName: 'IWWFLY',
            friendFriends: 5,
            firendCBK: 31.845
        },
        {
            _id: '1',
            friendavatar: '',
            friendName: 'IWWFLY',
            friendFriends: 5,
            firendCBK: 31.845
        },
        {
            _id: '3',
            friendName: 'kkkatttya_v',
            friendavatar: 'https://i.imgur.com/RLRmjZS.png',
            friendFriends: 0,
            firendCBK: 11.179
        }
    ])



    return (
        <div className='mates'>
            <div className='matestext_section'>
                <section>
                    <img src={knight} alt='knight'/>
                    <h1>C<span>y</span>ber<span>_</span>F<span>a</span>m</h1>
                </section>

                <h2>invite your friends to get more <span>CBK$</span></h2>
                <div className='star star1'></div>
                <div className='plus-sign'></div>
            </div>

            <div className='claim_section'>
                <h2>CBK$</h2>
                <button>Claim</button>
            </div>
            <p>You'll get 10% CBK from your friends</p>
            <button className='invitefrien'>Invite</button>

            <section className='friendssection'>
            <div className='star star2'></div>
            <div className='star star3'></div>
                <h1>{friends.length} mates</h1>
                {friends.map((friend: IFriend) => (
                    <SingleFrien key={friend._id} friend={friend} />
                ))}
            </section>
        </div>
    );
};

export default Mates;
