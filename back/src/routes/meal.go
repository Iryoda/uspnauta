package routes

import (
	"github.com/iryoda/uspnauta/src/controllers"
	"github.com/iryoda/uspnauta/src/repositories/interfaces"
	"github.com/labstack/echo/v4"
)

func HandleMeal(e *echo.Echo, mr interfaces.MealRepositoryInterface) {
	g := e.Group("meal")

	mealController := controllers.MealController{
		MealRepository: mr,
	}

	g.GET("/all", mealController.GetMeal)
}
