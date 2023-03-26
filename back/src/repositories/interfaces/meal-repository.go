package interfaces

type MealRepositoryInterface interface {
	GetMeals() ([]byte, error)
	Set(key string, value []byte) error
}
