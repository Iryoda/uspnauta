import { Tabs } from 'expo-router';

import Container from '../components/Container';

const Settings = () => {
  return (
    <Container>
      <Tabs.Screen options={{ title: 'Config' }} />
    </Container>
  );
};

export default Settings;
