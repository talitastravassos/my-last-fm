import { Button, makeStyles } from '@material-ui/core';
import { AllInclusive, Edit, Twitter } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import Box from './components/Box';
import Input from './components/Input';
import SelectInput from './components/SelectInput';
import { LastFMContext } from './context/LastFMContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
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
  const [isEdit, setIsEdit] = useState(false);

  const {
    action: { getUsernameData, formatMessage, setPeriod, setMessage },
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
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            endIcon={<AllInclusive />}
          >
            Go
					</Button>
        </form>
        {userData && message ? (
          <>
            <Box message={message} disabled={isEdit} setMessage={setMessage} />
            <div className='buttons-container'>
              {!isEdit ? (
                <Button
                  variant='contained'
                  color='secondary'
                  endIcon={<Edit />}
                  onClick={() => setIsEdit(!isEdit)}
                >
                  Edit
                </Button>
              ) : (
                  <></>
                )}
              <Button variant='contained' color='primary' endIcon={<Twitter />}>
                Tweet
							</Button>
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
