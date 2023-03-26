package entities

type MealPlate struct {
	Open bool `json:"open"`

	Base    string `json:"base,omitempt"`
	Meat    string `json:"meat"`
	Vegan   string `json:"vegan"`
	Extra   string `json:"extra"`
	Salad   string `json:"salad"`
	Dessert string `json:"dessert"`

	Calories string `json:"calories"`
}
