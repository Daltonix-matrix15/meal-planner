const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchMeals = async (query = "") => {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.meals || [];
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories || [];
};

export const filterByCategory = async (category) => {
  const response = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
  );
  const data = await response.json();
  return data.meals || [];
};

export const getMealById = async (id) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  const meal = data.meals ? data.meals[0] : null;

  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return { ...meal, ingredients };
};
