package main

import (
	"os"

	"github.com/bradfitz/gomemcache/memcache"
	"github.com/iryoda/uspnauta/src/repositories"
	"github.com/iryoda/uspnauta/src/routes"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	url := os.Getenv("MEMCHACHED_URL")

	if url == "" {
		url = "localhost:11211"
	}

	cache := memcache.New(url)

	mealRepository := repositories.MealRepository{
		Client: cache,
	}

	routes.HandleMeal(e, mealRepository)

	e.Logger.Fatal(e.Start(":1323"))
}
