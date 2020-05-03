import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { FaLastfm, FaTwitter } from 'react-icons/fa';
import './App.scss';
import Box from './components/Box';
import Input from './components/Input';
import SelectInput from './components/SelectInput';
import { LastFMContext } from './context/LastFMContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
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

const numberArtistsOptions = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '15',
    value: 15,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '30',
    value: 30,
  },
];

// 'overall', '7day', '1month', '3month', '6month', '12month'
const periodOptions = [
  {
    label: 'Week',
    value: '7day',
  },
  {
    label: 'Month',
    value: '1month',
  },
  {
    label: '3 Months',
    value: '3month',
  },
  {
    label: '6 Months',
    value: '6month',
  },
  {
    label: 'Year',
    value: '12month',
  },
  {
    label: 'Overall',
    value: 'overall',
  },
];

function App() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [numberOfArtists, setNumberOfArtists] = useState({
    label: '5',
    value: 5,
  });

  const {
    action: { getUsernameData, formatMessage, setPeriod },
    state: { userData, message, period },
  } = useContext(LastFMContext);

  useEffect(() => {
    console.log(userData);
    // console.log(numberOfArtists)

    if (userData) {
      formatMessage(numberOfArtists.value);
    }
  }, [userData, formatMessage, numberOfArtists]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getUsernameData(username);
  };

  return (
    <div className='App'>
      <h1>My Last FM</h1>
      <div style={{ margin: '3rem' }}>
        <form onSubmit={handleSubmit} className={classes.root}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Input
              name={'username'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={'Your LastFM Username'}
              label={'LastFM Username'}
            />
            <SelectInput
              value={numberOfArtists.value}
              label={'Artists'}
              items={numberArtistsOptions}
              onChange={(e) =>
                setNumberOfArtists({
                  ...numberOfArtists,
                  value: e.target.value,
                })
              }
            />
            <SelectInput
              value={period.value}
              label={'Period'}
              items={periodOptions}
              onChange={(e) => {
                let newLabel = periodOptions.filter(
                  (item) => e.target.value === item.value
                );
                setPeriod({
                  label: newLabel[0].label,
                  value: e.target.value,
                });
              }}
            />
          </div>
          <button type='submit' className='btn-search'>
            <span>Search</span>
            <FaLastfm />
          </button>
        </form>
        {userData && message ? (
          <>
            <Box message={message} />
            <div className='buttons-container'>
              <a
                href={
                  'https://twitter.com/intent/tweet?hashtags=mylastfm&text=' +
                  message
                }
                target='_blank'
                rel='noopener noreferrer'
                className='btn-twitter'
              >
                <span>Tweet</span>
                <FaTwitter />
              </a>
            </div>
          </>
        ) : (
            <></>
          )}
      </div>
    </div>
  );
}

export default App;
