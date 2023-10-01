import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View, ScrollView } from 'react-native';

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
import DrowpDownSelect from '../components/Dropdown';

import { Tabs } from 'expo-router';

import { weekdayTranslator } from '../utils/weekdayTranslator';
import { useSettings } from '../hooks/useSettings';
import { availableRestaurants } from '../config/restaurants';
import { TouchableOpacity } from 'react-native-gesture-handler';

type MealMap = {
  [restaurant: string]: DayMeal[];
};

const Home = () => {
  const { settings, updateSettings } = useSettings();

  const [currentRestaurant, setCurrentRestaurant] = useState<string>('Central');
  const [currentDayTime, setCurrentDayTime] = useState<string>('Almoco');
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [meals, setMeals] = useState({} as MealMap);

  useEffect(() => {
    const currentHour = dayjs(new Date()).hour();

    if (currentHour > 17) setCurrentDayTime('Janta');
  }, []);

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

  if (settings.mode) {
    return (
      <Container>
        <Tabs.Screen options={{ title: 'Cardápio' }} />

        <View className="absolute bottom-4 right-4 z-50">
          <TouchableOpacity
            className="rounded-full bg-black p-6 dark:bg-indigo-700"
            onPress={() =>
              updateSettings({
                mode: !settings.mode,
              })
            }
          />
        </View>

        <View className="flex flex-row w-full justify-between bg-black rounded-lg p-2 py-4">
          <Typography.H3 className="text-white capitalize">
            {weekdayTranslator(currentMeal?.weekday)}, {dayjs(currentDate).format('DD/MM')}
          </Typography.H3>

          <View className="flex flex-row justify-between w-20">
            <Arrow
              disabled={dayjs(currentDate).day() === 1}
              action="decrease"
              setCurrentDate={setCurrentDate}
              currentDate={currentDate}
            />
            <Arrow
              disabled={dayjs(currentDate).day() === 0}
              action="increase"
              setCurrentDate={setCurrentDate}
              currentDate={currentDate}
            />
          </View>
        </View>

        <View className="pt-4">
          <DrowpDownSelect
            current={currentDayTime}
            setCurrent={setCurrentDayTime}
            options={['Almoco', 'Janta']}
            className="pt-2"
          />
        </View>

        {isLoading && !currentMeal ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
          </View>
        ) : (
          <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
            {Object.entries(meals).map(([restaurant, daymeal]) => (
              <View className="pt-4" key={restaurant}>
                <Typography.H3>{restaurant}</Typography.H3>

                <View>
                  <View className="pt-4">
                    <MealDisplay
                      vegan={settings.vegan}
                      daytime={currentDayTime === 'Janta' ? 'dinner' : 'lunch'}
                      meal={daymeal.find((d) => d.date === dayjs(currentDate).format('DD/MM'))!}
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <Tabs.Screen options={{ title: 'Cardápio' }} />

      <View className="absolute bottom-4 right-4">
        <TouchableOpacity
          className="rounded-full bg-black p-6 dark:bg-indigo-700"
          onPress={() =>
            updateSettings({
              mode: !settings.mode,
            })
          }
        />
      </View>

      <View className="flex flex-row w-full justify-between bg-black rounded-lg p-2 py-4">
        <Typography.H3 className="text-white capitalize">
          {weekdayTranslator(currentMeal?.weekday)}, {dayjs(currentDate).format('DD/MM')}
        </Typography.H3>

        <View className="flex flex-row justify-between w-20">
          <Arrow
            disabled={dayjs(currentDate).day() === 1}
            action="decrease"
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
          />
          <Arrow
            disabled={dayjs(currentDate).day() === 0}
            action="increase"
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
          />
        </View>
      </View>

      <View className="pt-4">
        <DrowpDownSelect
          current={currentRestaurant}
          setCurrent={setCurrentRestaurant}
          options={availableRestaurants}
          className="pt-4"
        />
      </View>

      <View className="z-0 pt-8">
        <Typography.H3>opções</Typography.H3>

        <View className="flex flex-row px-2 pt-4">
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
          <View className="pt-8">
            <Typography.H2>almoço</Typography.H2>

            <View className="pt-4">
              <MealDisplay vegan={settings.vegan} daytime="lunch" meal={currentMeal!} />
            </View>
          </View>

          <View className="pt-8">
            <Typography.H2>janta</Typography.H2>

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
