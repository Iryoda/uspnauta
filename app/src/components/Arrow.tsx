import dayjs, { Dayjs } from 'dayjs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Typography from './Typography';

type ArrowProps = {
  currentDate: Dayjs;
  action: 'increase' | 'decrease';
  disabled: boolean;
  setCurrentDate: (state: Dayjs) => void;
};

const Arrow = ({ currentDate, setCurrentDate, action, disabled }: ArrowProps) => {
  const handleChangeDate = (action: 'decrease' | 'increase') => {
    if (action === 'decrease') {
      const result = dayjs(currentDate).subtract(1, 'day');
      setCurrentDate(result);
    }

    if (action === 'increase') {
      const result = dayjs(currentDate).add(1, 'day');
      setCurrentDate(result);
    }
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={() => handleChangeDate(action)}>
      <Typography.H2 className={`${disabled && 'text-gray-200 dark:text-gray-700'}`}>
        {`${action === 'increase' ? '>' : '<'}`}
      </Typography.H2>
    </TouchableOpacity>
  );
};

export default Arrow;
