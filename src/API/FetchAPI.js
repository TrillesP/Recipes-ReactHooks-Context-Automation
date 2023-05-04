export async function APIDrinks(query, value) {
    const URLDrinks = `https://www.thecocktaildb.com/api/json/v1/1/${query}${value}`;
    const response = await fetch(URLDrinks);
    const data = await response.json();
    return data.drinks;
  }

export async function APIMeals(query, value) {
    const URLMeals = `https://www.themealdb.com/api/json/v1/1/${query}${value}`;
    const response = await fetch(URLMeals);
    const data = await response.json();
    return data.meals;
}