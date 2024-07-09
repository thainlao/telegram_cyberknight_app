import friendIcon from './assets/icons8-friends-50.png';
import taskIcon from './assets/icons8-tasks-24.png';
import homeIcon from './assets/icons8-home-24.png';
import { useEffect, useState } from "react";
import Base from "./components/Base";
import Tasks from "./components/Tasks";
import Mates from "./components/Mates";
import './styles/mainbody.css';
import axios from 'axios';

function App() {
  const [activeComponent, setActiveComponent] = useState('Base');
  
  const renderComponent = () => {
      switch (activeComponent) {
          case 'Base':
              return <Base />
          case 'Tasks':
              return <Tasks />;
          case 'Mates':
              return <Mates />;
          default:
              return <Base />;
      }
  };

    useEffect(() => {
      const tg = window.Telegram.WebApp;
      tg.ready();
      if (!tg.initDataUnsafe || !tg.initDataUnsafe.user) {
          console.error('Invalid Telegram initialization data:', tg.initDataUnsafe);
          return;
      }
      const { id, username, chat_instance, chat_type, auth_date, hash } = tg.initDataUnsafe;
      const dataToSend = {
          user: {
              id: id,
              username: username,
          },
          chat_instance: chat_instance,
          chat_type: chat_type,
          auth_date: auth_date,
          hash: hash,
      };
      axios.post('http://localhost:3000/auth/telegram', dataToSend)
          .then(response => {
              if (response.data.success) {
                  console.log('User authenticated successfully', response.data.user);
              } else {
                  console.log('Authentication failed');
              }
          })
          .catch(error => {
              console.error('Error during authentication', error);
          });
  }, []);

  return (
    <div className='mainpage'>
      <div className='content-container'>
          {renderComponent()}
      </div>
      <section className='buttons'>
                <button 
                    className={activeComponent === 'Base' ? 'active' : ''}
                    onClick={() => setActiveComponent('Base')}>
                    Base
                    <img 
                    className={activeComponent === 'Base' ? 'active' : ''} 
                    src={homeIcon} 
                    alt="Home Icon" />
                </button>

                <button 
                    className={activeComponent === 'Tasks' ? 'active' : ''}
                    onClick={() => setActiveComponent('Tasks')}
                >
                    Tasks
                    <img
                    className={activeComponent === 'Tasks' ? 'active' : ''} 
                    src={taskIcon} 
                    alt="Tasks Icon" />
                </button>
                
                <button 
                    className={activeComponent === 'Mates' ? 'active' : ''}
                    onClick={() => setActiveComponent('Mates')}
                >
                    Mates
                    <img 
                    className={activeComponent === 'Mates' ? 'active' : ''}
                    src={friendIcon} 
                    alt="Friends Icon" />
                </button>
      </section>
      <h6 
      style={{color: 'white', fontSize: '1rem', fontWeight: '100'}}
      >version 09.07.2024 (2)</h6>
  </div>
  )
}

export default App
