import { useFonts } from 'expo-font';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

import {
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_700Bold,
  Mulish_600SemiBold,
} from '@expo-google-fonts/mulish';

import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import AppProvider from '../hooks';
import { useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';

const TabBarBg = () => <View className="h-full w-full bg-white dark:bg-slate-800" />;

const HomeLayout = () => {
  const { settings } = useSettings();

  const { colorScheme, setColorScheme } = useColorScheme();

  const [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_600SemiBold,
    Mulish_500Medium,
    Mulish_700Bold,
  });

  useEffect(() => {
    if (settings) setColorScheme(settings.dark ? 'dark' : 'light');
  }, [settings, settings?.dark]);

  if (!fontsLoaded) return null;

  return (
    <AppProvider>
      <StatusBar
        hidden={false}
        translucent={true}
        style={colorScheme === 'dark' ? 'light' : 'dark'}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarBackground: () => <TabBarBg />,
        }}
      />
    </AppProvider>
  );
};

export default HomeLayout;
