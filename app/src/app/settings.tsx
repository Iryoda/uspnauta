import { Tabs } from 'expo-router';
import { ScrollView, View } from 'react-native';

import Container from '../components/Container';
import SettingOptions from '../components/SettingOption';
import Typography from '../components/Typography';

import { useSettings } from '../hooks/useSettings';
import { translateSettings } from '../utils/translateSettings';

const Settings = () => {
  const { settings, updateSettings } = useSettings();

  return (
    <Container>
      <Tabs.Screen options={{ title: 'Configuracões' }} />

      <Typography.H1 className="pb-7">configurações</Typography.H1>

      <ScrollView>
        {Object.entries(settings).map(([key, value]) => (
          <View key={key} className="h-9">
            <SettingOptions
              name={translateSettings[key]}
              option={value}
              onPress={() => updateSettings({ [key]: !settings[key] })}
            />
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};

export default Settings;
