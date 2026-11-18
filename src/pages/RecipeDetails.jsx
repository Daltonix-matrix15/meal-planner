import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMealById } from "../services/mealApi";
import Loader from "../components/Loader";
import { ArrowLeft, Heart, Globe, Video, CheckCircle2 } from "lucide-react";

export default function RecipeDetails({ favorites, onToggleFavorite }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealById(id)
      .then((data) => setMeal(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!meal) {
    return (
      <div className="text-center py-32 text-zinc-400">
        <p className="text-xl">Recipe not found.</p>
        <Link to="/" className="text-amber-400 underline mt-2 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);
  const youtubeEmbedUrl = meal.strYoutube
    ? meal.strYoutube.replace("watch?v=", "embed/")
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Explore
      </Link>

      {/* Hero Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="relative h-80 md:h-[400px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40" />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {meal.strCategory && (
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="px-3 py-1 bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-zinc-500" /> {meal.strArea}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              {meal.strMeal}
            </h1>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-4">
              {meal.strInstructions}
            </p>
          </div>

          <button
            onClick={() => onToggleFavorite(meal)}
            className={`w-full py-3 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isFavorite
                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20"
                : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Saved to Favorites" : "Save to Favorites"}
          </button>
        </div>
      </div>

      {/* Ingredients & Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-3xl h-fit">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" /> Ingredients
          </h3>
          <ul className="space-y-3">
            {meal.ingredients.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm py-2 border-b border-zinc-800/60 last:border-0"
              >
                <span className="text-zinc-300 font-medium">{item.name}</span>
                <span className="text-amber-400/90 text-xs bg-amber-500/10 px-2.5 py-1 rounded-lg">
                  {item.measure}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-8 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-4">Instructions</h3>
          <div className="space-y-4 text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
            {meal.strInstructions}
          </div>

          {youtubeEmbedUrl && (
            <div className="mt-8 pt-8 border-t border-zinc-800">
              <h4 className="text-md font-semibold text-white mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-500" /> Video Tutorial
              </h4>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <iframe
                  src={youtubeEmbedUrl}
                  title={meal.strMeal}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
