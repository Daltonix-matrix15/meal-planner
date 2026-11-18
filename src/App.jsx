import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import RecipeDetails from "./pages/RecipeDetails";

export default function App() {
  // 1. Initialize favorites state from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("flavorverse_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Persist favorites to localStorage whenever the array changes
  useEffect(() => {
    localStorage.setItem("flavorverse_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 3. Toggle favorite handler
  const handleToggleFavorite = (meal) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.idMeal === meal.idMeal);
      if (exists) {
        return prev.filter((item) => item.idMeal !== meal.idMeal);
      } else {
        return [...prev, meal];
      }
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-zinc-950">
        <NavBar favoritesCount={favorites.length} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetails
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
