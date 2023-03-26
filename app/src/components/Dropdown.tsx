import { useState } from 'react';
import { ViewProps } from 'react-native';

import { ScrollView, TouchableOpacity, View } from 'react-native';
import Typography from './Typography';

type DrowpDownSelectProps = ViewProps & {
  label?: string;
  current: string;
  setCurrent: (state: string) => void;
  options: string[];
  cname: string;
};

/**
 * Precisa colocar um zIndex no componente pai
 */
const DrowpDownSelect = ({ options, current, setCurrent, label, cname }: DrowpDownSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View className={`z-40 ${cname}`}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <View className="flex flex-row items-start justify-between">
          <Typography.Span className={`${open && 'rotate-180'}`}>▲</Typography.Span>

          <Typography.H2>
            {label && `${label}: `}
            {current}
          </Typography.H2>

          <View></View>
        </View>

        {open && (
          <ScrollView className="absolute mt-8 w-full bg-white dark:bg-slate-800">
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => {
                  setCurrent(opt);
                  setOpen(false);
                }}>
                <Typography.Span
                  className={`${
                    opt === current && 'text-blue-600 dark:text-indigo-600'
                  } border-b border-b-gray-300 p-1 dark:border-gray-600`}>
                  {opt}
                </Typography.Span>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DrowpDownSelect;
