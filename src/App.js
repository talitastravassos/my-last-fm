import { Button, makeStyles, TextField } from '@material-ui/core';
import { AllInclusive } from '@material-ui/icons';
import React from 'react';
import './App.scss';
import Box from './components/Box';
import { LastFMContext } from './context/LastFMContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },

  cssLabel: {
    '&:not(hover):not($disabled):not($cssFocused):not($error)': {
      color: '#d92323',
    },
    '&$cssFocused': {
      color: '#d92323',
    },
  },
  cssOutlinedInput: {
    '&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: '#d92323', //default
    },
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: '#d92323', //hovered
    },
    '&$cssFocused $notchedOutline': {
      borderColor: '#f71414', //focused
    },
  },
  notchedOutline: {},
  cssFocused: {
    color: '#d92323',
  },
  error: {},
  disabled: {},
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
      <div className='container-input'>
        <form onSubmit={handleSubmit} className={classes.root}>
          <TextField
            label='Your LastFM Username'
            placeholder='Your LastFM Username'
            name='username'
            value={username}
            variant='outlined'
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              }
            }}
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
