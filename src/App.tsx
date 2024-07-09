import friendIcon from './assets/icons8-friends-50.png';
import taskIcon from './assets/icons8-tasks-24.png';
import homeIcon from './assets/icons8-home-24.png';
import { useEffect, useState } from "react";
import Base from "./components/Base";
import Tasks from "./components/Tasks";
import Mates from "./components/Mates";
import './styles/mainbody.css';
import { fetchTelegramUserData } from './utils/tgApi';

function App() {
  const [activeComponent, setActiveComponent] = useState('Base');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initData = urlParams.get('initData')

    if (initData) {
      fetchTelegramUserData(initData)
        .then(data => {
          setUserData(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  console.log(userData);
  }, []);
  
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
  </div>
  )
}

export default App
