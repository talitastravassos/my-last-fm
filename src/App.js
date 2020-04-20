import { Button, makeStyles } from '@material-ui/core';
import { AllInclusive } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import Box from './components/Box';
import Input from './components/Input';
import SelectInput from './components/SelectInput';
import { LastFMContext } from './context/LastFMContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

function App() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [numberOfArtists, setNumberOfArtists] = useState(5);

  const {
    action: { getUsernameData, formatMessage },
    state: { userData, message },
  } = useContext(LastFMContext);

  useEffect(() => {
    console.log(userData);

    if (userData) {
      formatMessage(numberOfArtists);
    }

  }, [userData, formatMessage, numberOfArtists]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getUsernameData(username);
  };

  return (
    <div className='App'>
      <h1>My Last Week FM</h1>
      <div>
        <form onSubmit={handleSubmit} className={classes.root}>
          <div style={{ display: 'flex' }}>
            <Input
              name={'username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={'Your LastFM Username'}
              label={'LastFM Username'}
            />
            <SelectInput
              value={numberOfArtists}
              label={'Artists'}
              items={[5, 10, 15, 20, 30]}
              onChange={(e) => setNumberOfArtists(e.target.value)}
            />
          </div>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            endIcon={<AllInclusive />}
            size='large'
          >
            Go
					</Button>
        </form>
      </div>
      <div className='box-container'>
        {userData && message ? <Box message={message} /> : <></>}
      </div>
    </div>
  );
}

export default App;
