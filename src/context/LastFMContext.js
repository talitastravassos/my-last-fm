import React, { createContext, useState } from 'react';
import api from '../services/api';

export const LastFMContext = createContext();

export default function LastFMProvider(props) {
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState();

  const getUsernameData = async (username) => {
    try {
      const response = await api.get(
        `?method=user.getweeklyartistchart&user=${username}&api_key=${process.env.REACT_APP_LASTFM_API_KEY}&format=json`
      );
      // console.log(response)

      if (response) {
        setUserData(response.data.weeklyartistchart.artist);
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
      let message = `My Week on LastFM:${userData.map((artist, index) =>
        index < until ? formatArtist(artist) : ''
      )}`;

      message = message.slice(0, message.lastIndexOf(')') + 1).concat('.');

      setMessage(message);
    }
  };

  const value = {
    action: {
      getUsernameData,
      formatMessage,
    },
    state: {
      userData,
      message,
    },
  };

  return <LastFMContext.Provider value={value} {...props} />;
}
