import friendIcon from './assets/icons8-friends-50.png';
import taskIcon from './assets/icons8-tasks-24.png';
import homeIcon from './assets/icons8-home-24.png';
import { useState } from "react";
import Base from "./components/Base";
import Tasks from "./components/Tasks";
import Mates from "./components/Mates";
import './styles/mainbody.css';
import useTelegramAuth from './hoocs/useTelegramAuth';
import ErrorComponents from './pages/ErrorComponents';

function App() {
  const [activeComponent, setActiveComponent] = useState('Base');
  const { userData, loading, error, canCollect, nextAvailableTime, checkCollectionStatus } = useTelegramAuth();

  const renderComponent = () => {
      switch (activeComponent) {
          case 'Base':
              return <Base userData={userData} canCollect={canCollect} nextAvailableTime={nextAvailableTime} checkCollectionStatus={checkCollectionStatus} />
          case 'Tasks':
              return <Tasks userData={userData}/>;
          case 'Mates':
              return <Mates userData={userData}/>;
          default:
              return <Base userData={userData} canCollect={canCollect} nextAvailableTime={nextAvailableTime} checkCollectionStatus={checkCollectionStatus} />
      }
  };

  if (loading) {
    return <span className='loader'></span>;
  }

  if (error) {
    return <ErrorComponents />
  }
    
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
      >version 10.07.2024 (5)</h6>
  </div>
  )
}

export default App
