import { useState, useEffect } from "react";
import {
  searchMeals,
  getCategories,
  filterByCategory,
} from "../services/mealApi";
import RecipeCard from "../components/RecipeCard";
import CategoryPills from "../components/CategoryPills";
import { Search, UtensilsCrossed } from "lucide-react";

export default function Home({ favorites, onToggleFavorite }) {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Fetch categories and initial meals once on mount
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
    loadInitialMeals();
  }, []);

  const loadInitialMeals = async () => {
    setLoading(true);
    try {
      const data = await searchMeals(""); // Empty string loads default meals
      setMeals(data);
    } catch (error) {
      console.error("Failed to load initial meals:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle category selection separately
  const handleSelectCategory = async (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Clear search text when picking category
    setLoading(true);

    try {
      if (category === "") {
        const data = await searchMeals("");
        setMeals(data);
      } else {
        const data = await filterByCategory(category);
        setMeals(data);
      }
    } catch (error) {
      console.error("Failed to filter category:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSelectedCategory(""); // Reset category selection when searching text
    setLoading(true);

    try {
      const data = await searchMeals(searchTerm);
      setMeals(data);
    } catch (error) {
      console.error("Failed to search meals:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Banner & Search Input */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
          Discover Delicious <span className="text-amber-400">Recipes</span>
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          Browse through hundreds of culinary ideas, search your cravings, and
          save your favorites.
        </p>

        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center shadow-2xl"
        >
          <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search recipes (e.g. Chicken, Pasta, Curry)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-28 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category Pills Navigation */}
      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800/50"
            />
          ))}
        </div>
      ) : meals.length > 0 ? (
        /* Recipe Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => {
            const isFavorite = favorites.some(
              (fav) => fav.idMeal === meal.idMeal,
            );
            return (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/60 max-w-md mx-auto">
          <UtensilsCrossed className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-zinc-300 mb-1">
            No recipes found
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            Try searching for something else or pick a different category.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              handleSelectCategory("");
            }}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
