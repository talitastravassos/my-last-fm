import React from 'react';
import './App.scss';
import { LastFMContext } from './context/LastFMContext';

function App() {
  const [username, setUsername] = React.useState('');
  const {
    action: { getUsernameData },
    state: { userData },
  } = React.useContext(LastFMContext);

  React.useEffect(() => {
    console.log(userData);
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
    </div>
  );
}

export default App;
