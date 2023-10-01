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
    let result = currentDate;

    if (action === 'decrease') {
      result = dayjs(currentDate).subtract(1, 'day');
    }

    if (action === 'increase') {
      result = dayjs(currentDate).add(1, 'day');
    }

    setCurrentDate(result);
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={() => handleChangeDate(action)}>
      <Typography.H3 className={`text-white ${disabled && 'text-black dark:white'}`}>
        {`${action === 'increase' ? '>' : '<'}`}
      </Typography.H3>
    </TouchableOpacity>
  );
};

export default Arrow;
