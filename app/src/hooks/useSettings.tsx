import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Settings = {
  vegan: boolean;
};

type SettingsContextProps = {
  settings: Settings;
  updateSettings: (state: Settings) => void;
};

const SettingsContext = createContext({} as SettingsContextProps);

export const SettingsProvider: React.FCWC = ({ children }) => {
  const [settings, setSettings] = useState({} as Settings);

  useEffect(() => {
    const handleGetItem = async () => {
      const settingsFromStorage = await AsyncStorage.getItem('@UspNauta/settings');

      if (!settingsFromStorage) return {} as Settings;

      return JSON.parse(settingsFromStorage);
    };

    handleGetItem();
  }, []);

  const updateSettings = (state: Settings) => {
    setSettings({ ...settings, ...state });

    AsyncStorage.setItem('@UspNauta/settings', JSON.stringify(settings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
