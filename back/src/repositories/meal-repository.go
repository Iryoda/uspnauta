package repositories

import "github.com/bradfitz/gomemcache/memcache"

type MealRepository struct {
	Client *memcache.Client
}

func (mr MealRepository) GetMeals() ([]byte, error) {
	object, err := mr.Client.Get("meals")
	if err != nil {
		return []byte{}, err
	}

	return object.Value, nil
}

func (mr MealRepository) Set(key string, value []byte) error {
	err := mr.Client.Set(&memcache.Item{
		Key:   key,
		Value: value,
	})

	return err
}
