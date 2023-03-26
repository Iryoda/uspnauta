import api from '../config/api';

import { DayMeal } from '../interfaces/DayMeal';

export default class MealService {
  static async getMeal(): Promise<DayMeal[]> {
    const { data } = await api.get('meal/all');

    return data;
  }
}
