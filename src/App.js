import React from 'react';
import './App.scss';
import Box from './components/Box';
import { LastFMContext } from './context/LastFMContext';

function App() {
  const [username, setUsername] = React.useState('');
  const {
    action: { getUsernameData, formatMessage },
    state: { userData, message },
  } = React.useContext(LastFMContext);

  React.useEffect(() => {
    console.log(userData);
    if (userData) {
      formatMessage(10)
    }
  }, [userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getUsernameData(username);
  };

  return (
    <div className='App'>
      <h1>My Last Week FM</h1>
      <div className='container-input'>
        <form onSubmit={handleSubmit} className='form'>
          <label htmlFor='username'>Your LastFM Username</label>
          <input
            type='text'
            placeholder='Your LastFM Username'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type='submit'>GO</button>
        </form>
      </div>
      <div className="box-container">
        {(userData && message) ? <Box message={message} /> : <></>}
      </div>
    </div>
  );
}

export default App;
