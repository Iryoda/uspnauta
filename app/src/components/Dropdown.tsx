import { useState } from 'react';
import { ViewProps } from 'react-native';

import { ScrollView, TouchableOpacity, View } from 'react-native';
import Typography from './Typography';

type DrowpDownSelectProps = ViewProps & {
  label?: string;
  current: string;
  setCurrent: (state: string) => void;
  options: string[];
  className: string;
};

/**
 * Precisa colocar um zIndex no componente pai
 */
const DrowpDownSelect = ({
  options,
  current,
  setCurrent,
  label,
  className: cname,
}: DrowpDownSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View className={`z-40 ${cname}`}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <View className="flex flex-row items-start  border-black border rounded-lg p-2">
          <View className="flex flex-row justify-between w-full">
            <Typography.H3>
              {label && `${label}: `}
              {current}
            </Typography.H3>

            <Typography.Span className={`${open && 'rotate-180'}`}>▲</Typography.Span>
          </View>

          {open && (
            <ScrollView className="absolute mt-12 w-full bg-white dark:bg-stone-900 border border-black rounded-lg">
              {options.map((opt, i) => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => {
                    setCurrent(opt);
                    setOpen(false);
                  }}
                  className="py-1">
                  <Typography.Span
                    className={`${opt === current && 'text-blue-600 dark:text-indigo-700'} ${
                      i !== options.length - 1 && 'border-b border-b-gray-300'
                    } p-1 dark:border-stone-600`}>
                    {opt}
                  </Typography.Span>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DrowpDownSelect;
