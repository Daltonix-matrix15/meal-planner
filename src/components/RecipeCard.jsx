import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function RecipeCard({ meal, isFavorite, onToggleFavorite }) {
  return (
    <div className="group relative bg-zinc-900/80 rounded-2xl overflow-hidden border border-zinc-800/80 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-zinc-700 hover:shadow-2xl flex flex-col">
      {/* Image & Overlay Container */}
      <div className="relative w-full h-52 overflow-hidden bg-zinc-800">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        {meal.strCategory && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-amber-400 rounded-full">
            {meal.strCategory}
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(meal);
          }}
          aria-label="Favorite recipe"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer ${
            isFavorite
              ? "bg-rose-600 border-rose-500 text-white"
              : "bg-black/60 border-white/10 text-white hover:bg-rose-600 hover:border-rose-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight line-clamp-1 group-hover:text-amber-400 transition-colors">
            {meal.strMeal}
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            {meal.strArea ? `${meal.strArea} Cuisine` : "Delicious Recipe"}
          </p>
        </div>

        {/* Action Link */}
        <Link
          to={`/recipe/${meal.idMeal}`}
          className="w-full py-2.5 px-4 bg-zinc-800 hover:bg-amber-600 hover:text-white text-zinc-200 font-medium text-sm rounded-xl text-center transition-colors duration-200 block"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}
