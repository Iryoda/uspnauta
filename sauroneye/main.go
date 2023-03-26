package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/bradfitz/gomemcache/memcache"
	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/chromedp"
)

func handleRucardUrl(id int) string {
	return "https://uspdigital.usp.br/rucard/Jsp/cardapioSAS.jsp?codrtn=" + strconv.Itoa(id)
}

type DayMeal struct {
	Lunch      MealPlate `json:"lunch"`
	Dinner     MealPlate `json:"dinner"`
	Date       string    `json:"date"`
	Weekday    string
	Restaurant string
}

type MealPlate struct {
	Open bool `json:"open"`

	Base    string `json:"base"`
	Meat    string `json:"meat"`
	Vegan   string `json:"vegan"`
	Extra   string `json:"extra"`
	Salad   string `json:"salad"`
	Dessert string `json:"dessert"`

	Date     string `json:"date"`
	Calories string `json:"calories"`
}

func main() {
	url := os.Getenv("MEMCHACHED_URL")

	if url == "" {
		url = "localhost:11211"
	}

	cache := memcache.New(url)

	links := map[string]string{
		"Central": handleRucardUrl(6),
		"PUSP-C":  handleRucardUrl(7),
		"Física":  handleRucardUrl(8),
		"Química": handleRucardUrl(9),
	}

	meals := []DayMeal{}

	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	ctx, cancel = context.WithTimeout(ctx, 10*time.Second)
	defer cancel()

	for restaurant, link := range links {
		if err := chromedp.Run(ctx,
			chromedp.Navigate(link),
			chromedp.WaitNotVisible(`.menuHeader`)); err != nil {
			panic(err)
		}

		HandleGetValues(ctx, restaurant, &meals)
	}

	// Make json
	json, err := json.Marshal(meals)
	if err != nil {
		panic(err)
	}

	err = cache.Set(&memcache.Item{Key: "meals", Value: json})
	if err != nil {
		panic(err)
	}
}

func HandleCaloriesText(text string) string {
	return strings.Split(strings.Split(text, ": ")[1], " ")[0]
}

func HandleGetValues(ctx context.Context, rest string, meals *[]DayMeal) {
	var nodes []*cdp.Node

	if err := chromedp.Run(ctx, chromedp.Nodes("tr[class=itensCardapio]", &nodes)); err != nil {
		panic(err)
	}

	for _, node := range nodes {
		var currentMealDate string
		dayMeal := DayMeal{
			Restaurant: rest,
		}

		weekday := node.AttributeValue("id")

		dayMeal.Weekday = strings.Title(weekday)

		queryStringDate := "#dia" + strings.Title(weekday)

		if err := chromedp.Run(ctx, chromedp.Text(queryStringDate, &currentMealDate)); err != nil {
			panic(err)
		}

		splittedDate := strings.Split(currentMealDate, ": ")

		if len(splittedDate) > 1 {
			dayMeal.Date = splittedDate[1]
		}

		var lunchTableText string
		var dinnerTableText string

		queryStringLunch := "#almoco" + strings.Title(weekday)
		queryStringDinner := "#jantar" + strings.Title(weekday)

		if err := chromedp.Run(ctx, chromedp.Text(queryStringLunch, &lunchTableText)); err != nil {
			panic(err)
		}

		if err := chromedp.Run(ctx, chromedp.Text(queryStringDinner, &dinnerTableText)); err != nil {
			panic(err)
		}

		if lunch, err := BuildMealFromText(lunchTableText); err == nil {
			var calorieText string

			queryStringCalorieLunch := "#kcal" + strings.Title(weekday) + "A"

			if err := chromedp.Run(ctx, chromedp.Text(queryStringCalorieLunch, &calorieText)); err != nil {
				panic(err)
			}

			lunch.Calories = HandleCaloriesText(calorieText)

			dayMeal.Lunch = lunch
		}

		if dinner, err := BuildMealFromText(dinnerTableText); err == nil {
			var calorieText string

			queryStringCalorieDinner := "#kcal" + strings.Title(weekday) + "J"

			if err := chromedp.Run(ctx, chromedp.Text(queryStringCalorieDinner, &calorieText)); err != nil {
				panic(err)
			}

			dinner.Calories = HandleCaloriesText(calorieText)

			dayMeal.Lunch = dinner
		}

		*meals = append(*meals, dayMeal)
	}
}

func BuildMealFromText(text string) (MealPlate, error) {
	res := strings.Split(text, "\n")

	// Rever isso aqui certeza que está ignorando
	// algum valido
	if len(res) < 4 {
		return MealPlate{
			Open: false,
		}, errors.New("Closed")
	}

	meal := MealPlate{
		Open:    true,
		Base:    res[0],
		Meat:    res[1],
		Vegan:   strings.Split(res[2], ": ")[1],
		Salad:   res[3],
		Dessert: res[4],
		Extra:   res[5],
	}

	return meal, nil
}
