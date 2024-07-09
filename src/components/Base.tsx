import React, { useState } from 'react';
import '../styles/base.css';
import lock from '../assets/icons8-lock-50.png';
import { useSpring, animated } from 'react-spring';
import { UserDataProps } from '../utils/types';

const Base: React.FC<UserDataProps> = ({ userData }) => {
    const [buttonBlocked, setButtonBlocked] = useState<boolean>(false);

    const handleCollect = () => {
        if (!buttonBlocked) {
            userData.cbkCoins += 10;

            setButtonBlocked(true);

            setTimeout(() => {
                setButtonBlocked(false);
            }, 2000);
        }
    };

    const animatedProps = useSpring({
        count: userData.cbkCoins,
        config: { tension: 100, friction: 100, duration: 1500 },
    });

    const animatedPropsOnEnter = useSpring({
        from: { opacity: 0, transform: 'scale(0.5)', backgroundColor: '#19193D' },
        to: { opacity: 1, transform: 'scale(1)', backgroundColor: '#19193D' },
        config: { tension: 200, friction: 30 }
    });

    return (
        <animated.div style={animatedPropsOnEnter} className='base'>
            <section className='useravatar_section'>
                <h1>{userData.username}</h1>
                <img className='avatar' src='https://i.imgur.com/SLFXGf9.png' loading='lazy' alt='avatar'/>
            </section>

            <div className='collect_section'>
                <h3>Collect <span>CBK$</span></h3>
                
                <animated.h4 style={{ fontSize: '3.5rem', fontWeight: 500 }}>
                    {animatedProps.count.interpolate((val: number) => val.toFixed(1))}
                </animated.h4>
            </div>

            <button 
                className={`collect_button ${buttonBlocked ? 'blocked' : ''}`}
                onClick={handleCollect}
            >
                COLLECT CBK$
                {buttonBlocked && (
                    <>
                        <img src={lock} alt="lock" />
                    </>
                )}
            </button>
        </animated.div>
    );
};

export default Base;
