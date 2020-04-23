import React, { createContext, useState } from 'react';
import api from '../services/api';

export const LastFMContext = createContext();

export default function LastFMProvider(props) {
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState();
  const [period, setPeriod] = useState({
    label: 'Week',
    value: '7day',
  });

  const getUsernameData = async (username) => {
    try {
      const response = await api.get(
        `?method=user.gettopartists&user=${username}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json&period=${period.value}`
      );
      console.log(response);

      if (response) {
        setUserData(response.data.topartists.artist);
      }
    } catch (error) {
      setUserData(undefined);
      console.log(error);
    }
  };

  const formatArtist = (artist) => {
    return ` ${artist.name} (${artist.playcount})`;
  };

  const formatMessage = (until = 5) => {
    if (userData) {
      let message = `My ${period.label} on LastFM:${userData.map((artist, index) =>
        index < until ? formatArtist(artist) : ''
      )}`;

      message = message.slice(0, message.lastIndexOf(')') + 1).concat('.');

      setMessage(message);
    }
  };

  // React.useEffect(() => {
  //   console.log(period)
  // }, [period])

  const value = {
    action: {
      getUsernameData,
      formatMessage,
      setPeriod,
    },
    state: {
      userData,
      message,
      period,
    },
  };

  return <LastFMContext.Provider value={value} {...props} />;
}
