import { View } from 'react-native';

const Container: React.FCWC = ({ children }) => (
  <View className="z-0 flex-1 bg-white px-4 pt-8 dark:bg-slate-800">{children}</View>
);

export default Container;
