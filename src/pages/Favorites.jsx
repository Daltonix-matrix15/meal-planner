import RecipeCard from "../components/RecipeCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Favorites({ favorites, onToggleFavorite }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-500 fill-current" />
            Your Saved Favorites
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Quick access to all your bookmarked recipes.
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium">
          {favorites.length} {favorites.length === 1 ? "Recipe" : "Recipes"}
        </span>
      </div>

      {/* Grid or Empty State */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-zinc-800/60 max-w-md mx-auto">
          <Heart className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-zinc-300 mb-1">
            No favorites saved yet
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            Explore recipes and click the heart icon to save them here.
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold rounded-xl text-sm transition-colors inline-block"
          >
            Explore Recipes
          </Link>
        </div>
      )}
    </div>
  );
}
