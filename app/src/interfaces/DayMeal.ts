import { Meal } from './Meal';

export type DayMeal = {
  lunch: Meal;
  dinner: Meal;
  date: string;
  weekday: string;
  restaurant: string;
};
