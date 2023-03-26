package services

import (
	"encoding/json"

	"github.com/iryoda/uspnauta/src/entities"
	"github.com/iryoda/uspnauta/src/repositories/interfaces"
)

type GetMealService struct {
	MealRepository interfaces.MealRepositoryInterface
}

func (s GetMealService) GetWeekMeal() []entities.DayMeal {
	meals, err := s.MealRepository.GetMeals()
	if err != nil {
		panic(err)
	}

	var result []entities.DayMeal

	err = json.Unmarshal(meals, &result)
	if err != nil {
		panic(err)
	}

	return result
}
