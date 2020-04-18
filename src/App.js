import React from 'react';
import './App.scss';
import api from "./services/api";

function App() {
  const [username, setUsername] = React.useState('');

  // React.useEffect(() => {
  //   console.log(username)
  // }, [username])

  const handleSubmit = async (event) => {
    event.preventDefault()
    // http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=rj&api_key=YOUR_API_KEY&format=json
    const response = await api.get(`?method=user.getweeklyartistchart&user=${username}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`)

    console.log(response)
  }

  return (
    <div className='App'>
      <h1>My Last Week FM</h1>
      <div className='container-input'>
        <form onSubmit={handleSubmit} className="form">
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
