
import '../styles/mates.css';
import { IFriend, UserDataProps } from '../utils/types';
import SingleFrien from './SingleFrien';
import knight from '../assets/knight.png';
import { useSpring, animated } from 'react-spring';
import React, { useState } from 'react';

const Mates: React.FC<UserDataProps> = ({userData}) => {

    if (!userData) {
        return (
            <div>Error</div>
        )
    }

    const animatedPropsOnEnter = useSpring({
        from: { opacity: 0, transform: 'scale(0.5)', backgroundColor: '#000000' },
        to: { opacity: 1, transform: 'scale(1)', backgroundColor: '#000000' },
        config: { tension: 200, friction: 30 }
    });

    const [inviteButtonText, setInviteButtonText] = useState('Invite');

    const handleInviteClick = async () => {
        if (userData) {
            const referralLink = `http://localhost:3000/telegram?referrerId=${userData.telegramId}`;
            try {
                await navigator.clipboard.writeText(referralLink);
                setInviteButtonText('Copied');
                setTimeout(() => {
                    setInviteButtonText('Invite');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    return (
        <animated.div style={animatedPropsOnEnter} className='mates'>
            <div className='matestext_section'>
                <section>
                    <img src={knight} alt='knight'/>
                    <h1>C<span>y</span>ber<span>_</span>F<span>a</span>m</h1>
                </section>

                <h2>invite your friends to get more <span>CBK$</span></h2>
                <h2>10% + 150 <span>CBK$</span></h2>
                <div className='star star1'></div>
                <div className='plus-sign'></div>
            </div>


            <button className='invitefrien' onClick={handleInviteClick}>{inviteButtonText}</button>

            <section className='friendssection'>
            <div className='star star2'></div>
            <div className='star star3'></div>
                <h1>{userData.friends.length} mates</h1>
                {userData?.friends.length > 0 ? (
                    userData.friends.map((friend: IFriend) => (
                        <SingleFrien key={friend._id} friend={friend} />
                    ))
                ) : (
                    <p>You haven't invited any friends yet.</p>
                )}
            </section>
        </animated.div>
    );
};

export default Mates;
