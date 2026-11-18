import { Link, useLocation } from "react-router-dom";
import { Utensils, Heart } from "lucide-react";

export default function Navbar({ favoritesCount }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xl font-bold text-white tracking-tight group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 transition-transform group-hover:scale-105">
            <Utensils className="w-5 h-5" />
          </div>
          <span>
            Flavor<span className="text-amber-400">Verse</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "bg-zinc-800 text-amber-400"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Explore
          </Link>

          <Link
            to="/favorites"
            className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              location.pathname === "/favorites"
                ? "bg-zinc-800 text-amber-400"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                {favoritesCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
