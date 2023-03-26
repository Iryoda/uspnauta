package entities

type DayMeal struct {
	Lunch      MealPlate `json:"lunch"`
	Dinner     MealPlate `json:"dinner"`
	Date       string    `json:"date"`
	Weekday    string    `json:"weekday"`
	Restaurant string    `json:"restaurant"`
}
