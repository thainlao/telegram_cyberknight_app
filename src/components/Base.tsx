import { useState } from 'react';
import '../styles/base.css';
import lock from '../assets/icons8-lock-50.png';
import { useSpring, animated } from 'react-spring';

const Base = () => {
    const [userCoins, setUserCoins] = useState<number>(10)
    const [buttonBlocked, setButtonBlocked] = useState<boolean>(false);

    const handleCollect = () => {
        if (!buttonBlocked) {
            const newCoins = userCoins + 10;
            setUserCoins(newCoins);
            
            setButtonBlocked(true);

            setTimeout(() => {
                setButtonBlocked(false);
            }, 2000);
        }
    };

    const animatedProps = useSpring({
        count: userCoins,
        config: { tension: 100, friction: 100, duration: 1500 },
    });

    return (
        <div className='base'>
            
            <section className='useravatar_section'>
                <h1>User Name</h1>
                <div className='avatar'>
                    <h2>UN</h2>
                </div>
            </section>

            <div className='collect_section'>
                <h3>Collect <span>CBK$</span></h3>
                
                <animated.h4 style={{ fontSize: '3rem', fontWeight: 800 }}>
                    {animatedProps.count.interpolate((val: number) => val.toFixed(1))}
                </animated.h4>
            </div>
            <div className='dark-bg'></div>
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
        </div>
    );
};

export default Base;
