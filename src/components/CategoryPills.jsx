export default function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none w-full max-w-4xl mx-auto mb-8 px-2">
      <button
        onClick={() => onSelectCategory("")}
        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
          selectedCategory === ""
            ? "bg-amber-500 text-zinc-950 font-semibold shadow-lg shadow-amber-500/20"
            : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
        }`}
      >
        All Recipes
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.strCategory;
        return (
          <button
            key={cat.idCategory}
            onClick={() => onSelectCategory(cat.strCategory)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              isSelected
                ? "bg-amber-500 text-zinc-950 font-semibold shadow-lg shadow-amber-500/20"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            {cat.strThumb && (
              <img
                src={cat.strThumb}
                alt=""
                className="w-5 h-5 rounded-full object-cover"
              />
            )}
            {cat.strCategory}
          </button>
        );
      })}
    </div>
  );
}
