import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Settings = {
  vegan: boolean;
  dark: boolean;
};

type SettingsContextProps = {
  settings: Settings;
  updateSettings: (state: Settings) => void;
};

const defaultSettings: Settings = {
  vegan: false,
  dark: true,
};

const SettingsContext = createContext({} as SettingsContextProps);

export const SettingsProvider: React.FCWC = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const handleGetItem = async () => {
      const settingsFromStorage = await AsyncStorage.getItem('@UspNauta/settings');

      console.log(settingsFromStorage);

      if (!settingsFromStorage) return;

      setSettings(JSON.parse(settingsFromStorage));
    };

    handleGetItem();
  }, []);

  const updateSettings = async (state: Settings) => {
    const newSettings = { ...settings, ...state };

    setSettings(newSettings);

    await AsyncStorage.setItem('@UspNauta/settings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
