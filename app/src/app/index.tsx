import { useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { keys } from '../config/queryKeys';

import dayjs, { Dayjs } from 'dayjs';

import { DayMeal } from '../interfaces/DayMeal';
import MealService from '../services/MealService';

import Container from '../components/Container';
import MealDisplay from '../components/MealHandler';
import Typography from '../components/Typography';
import OptionsCard from '../components/OptionCard';
import Arrow from '../components/Arrow';

import { Tabs } from 'expo-router';

import { weekdayTranslator } from '../utils/weekdayTranslator';
import { useSettings } from '../hooks/useSettings';
import DrowpDownSelect from '../components/Dropdown';
import { availableRestaurants } from '../config/restaurants';

type MealMap = {
  [restaurant: string]: DayMeal[];
};

const Home = () => {
  const { settings, updateSettings } = useSettings();

  const [currentRestaurant, setCurrentRestaurant] = useState<string>('Central');
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const [meals, setMeals] = useState({} as MealMap);

  const { isLoading, isSuccess } = useQuery({
    queryKey: [keys.meal.getAll],
    queryFn: MealService.getMeal,
    onSuccess: (m) => {
      const map: MealMap = {};

      m.forEach((meal) => {
        if (map[meal.restaurant]) {
          map[meal.restaurant].push(meal);
          return;
        }

        map[meal.restaurant] = [meal];
      });

      setMeals(map);
    },
  });

  const currentMeal = useMemo(() => {
    if (!meals[currentRestaurant]) return;

    return meals[currentRestaurant].find(
      (meal) => meal.date === dayjs(currentDate).format('DD/MM')
    );
  }, [currentRestaurant, currentDate, isSuccess, meals]);

  if (isLoading && !currentMeal) return;

  return (
    <Container>
      <Tabs.Screen options={{ title: 'Cardapio' }} />

      <View className="flex w-full flex-row items-center justify-between">
        <Arrow
          disabled={dayjs(currentDate).day() === 1}
          action="decrease"
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />

        <Typography.H1>
          {weekdayTranslator(currentMeal?.weekday)}, {dayjs(currentDate).format('DD/MM')}
        </Typography.H1>

        <Arrow
          disabled={dayjs(currentDate).day() === 0}
          action="increase"
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />
      </View>

      <DrowpDownSelect
        current={currentRestaurant}
        setCurrent={setCurrentRestaurant}
        options={availableRestaurants}
        cname="pt-2"
      />

      <View className="z-0 pt-4">
        <Typography.H2>opções</Typography.H2>

        <View className="flex flex-row px-2 pt-1">
          <OptionsCard
            enabled={settings.vegan}
            changeState={() => updateSettings({ vegan: !settings.vegan })}>
            vegano
          </OptionsCard>
        </View>
      </View>

      {isLoading && !currentMeal ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View className="pt-4">
            <Typography.H2>almoço</Typography.H2>

            <View className="pt-4">
              <MealDisplay vegan={settings.vegan} daytime="lunch" meal={currentMeal!} />
            </View>
          </View>

          <View>
            <Typography.H2 className="text-xl">janta</Typography.H2>

            <View className="pt-4">
              <MealDisplay vegan={settings.vegan} daytime="dinner" meal={currentMeal!} />
            </View>
          </View>
        </>
      )}
    </Container>
  );
};

export default Home;
