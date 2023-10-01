import { TouchableOpacity } from 'react-native';
import Typography from './Typography';

type OptionsCardProps = {
  enabled: boolean;
  changeState: () => void;
  children: React.ReactNode;
};

const OptionsCard = ({ enabled, changeState, children }: OptionsCardProps) => (
  <TouchableOpacity
    className={`rounded-full p-1 px-3 ${
      enabled ? 'bg-black dark:bg-white' : 'bg-gray-100 dark:bg-stone-700'
    }`}
    onPress={() => changeState()}>
    <Typography.Span className={`${enabled ? 'text-white' : 'text-black'}`}>
      {children}
    </Typography.Span>
  </TouchableOpacity>
);

export default OptionsCard;
