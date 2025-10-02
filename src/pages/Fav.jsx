import React, { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { RecipesContext } from "../context/RecipeProvider";

const Fav = () => {
    const { data } = useContext(RecipesContext); // all current recipes

  const favorite = (JSON.parse(localStorage.getItem("fav")) || []).filter(
    (recipe) =>
      recipe &&
      recipe.id &&
      data.some((r) => r.id === recipe.id) // only keep if recipe still exists
  );

  const renderRecipes = favorite.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-6xl  mx-auto text-center mb-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl  font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text">
          Your Favorite Recipes
        </h1>
        <p className="text-gray-600 mt-2">
          All the recipes you’ve marked as favorite are saved here.
        </p>
      </div>

      <div className="max-w-6xl mx-auto ">
        {favorite.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {renderRecipes}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">
              No Favorites Found
            </h2>
            <p className="text-gray-500 mt-2">
              Start adding recipes to your favorites to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fav;
