import { TouchableOpacity, View } from 'react-native';
import Typography from './Typography';

type SettingOptions = {
  name: string;
  option: boolean;
  onPress: () => void;
};

const SettingOptions = ({ name, option, onPress }: SettingOptions) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View className="flex h-6 flex-row items-center justify-between">
        <Typography.Span>{name}</Typography.Span>
        <Typography.Span className="text-blue-600 dark:text-purple-600">
          {option ? 'ativado' : 'desativado'}
        </Typography.Span>
      </View>
    </TouchableOpacity>
  );
};

export default SettingOptions;
