import { Button, makeStyles } from '@material-ui/core';
import { AllInclusive } from '@material-ui/icons';
import React from 'react';
import './App.scss';
import Box from './components/Box';
import Input from './components/Input';
import { LastFMContext } from './context/LastFMContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
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
  const [username, setUsername] = React.useState('');
  const {
    action: { getUsernameData, formatMessage },
    state: { userData, message },
  } = React.useContext(LastFMContext);

  React.useEffect(() => {
    console.log(userData);
    if (userData) {
      formatMessage(10);
    }
  }, [userData, formatMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getUsernameData(username);
  };

  return (
    <div className='App'>
      <h1>My Last Week FM</h1>
      <div className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.root}>
          <Input
            name={'username'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={'Your LastFM Username'}
            label={'LastFM Username'}
          />
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
