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
      enabled ? 'bg-blue-200 dark:bg-indigo-700' : 'bg-gray-100 dark:bg-slate-700'
    }`}
    onPress={() => changeState()}>
    <Typography.Span>{children}</Typography.Span>
  </TouchableOpacity>
);

export default OptionsCard;
