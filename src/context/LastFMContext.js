import React, { createContext, useState } from 'react';
import api from '../services/api';

export const LastFMContext = createContext();

export default function LastFMProvider(props) {
  const [userData, setUserData] = useState();

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
      console.log(error);
    }
  };

  const value = {
    action: {
      getUsernameData,
    },
    state: {
      userData,
    },
  };

  return <LastFMContext.Provider value={value} {...props} />;
}
