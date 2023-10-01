import { Text, TouchableOpacity, View } from 'react-native';
import { DayMeal } from '../interfaces/DayMeal';
import Typography from './Typography';

type MealHandler = {
  meal: DayMeal;
  daytime: 'lunch' | 'dinner';
  vegan: boolean;
};

const MealDisplay = ({ meal, daytime, vegan }: MealHandler) => {
  console.log(meal);

  if (!meal || !meal[daytime]) return <></>;

  return (
    <View>
      {meal[daytime].open && (
        <>
          <View className="flex flex-row items-center justify-between">
            <Typography.Span className="w-[33%] break-all text-center">
              {meal[daytime].base}
            </Typography.Span>
            {vegan ? (
              <Typography.Span className="w-[33%] break-all text-center">
                {meal[daytime].vegan}
              </Typography.Span>
            ) : (
              <Typography.Span className="w-[33%] break-all text-center">
                {meal[daytime].meat}
              </Typography.Span>
            )}
            <Typography.Span className="w-[33%] break-all text-center">
              {meal[daytime].salad}
            </Typography.Span>
          </View>

          <TouchableOpacity className="pt-2">
            <Text className="pt-8 text-center text-blue-700 dark:text-indigo-300">Ver mais</Text>
          </TouchableOpacity>
        </>
      )}

      {!meal[daytime].open && <Typography.Span className="text-center">Fechado</Typography.Span>}
    </View>
  );
};

export default MealDisplay;
