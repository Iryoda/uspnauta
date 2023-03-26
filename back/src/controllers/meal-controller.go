package controllers

import (
	"net/http"

	"github.com/iryoda/uspnauta/src/repositories/interfaces"
	"github.com/iryoda/uspnauta/src/services"
	"github.com/labstack/echo/v4"
)

type MealController struct {
	MealRepository interfaces.MealRepositoryInterface
}

func (mc MealController) GetMeal(c echo.Context) error {
	getMealService := services.GetMealService{
		MealRepository: mc.MealRepository,
	}

	meals := getMealService.GetWeekMeal()

	return c.JSON(http.StatusOK, meals)
}
