import React, { useContext } from 'react'
import { RecipesContext } from '../context/RecipeProvider';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const { data } = useContext(RecipesContext);

  const renderRecipes = data.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
  ));

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 ">

      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
          Explore Recipes!
        </h1>
        <p className="text-gray-600 mt-2">
          Discover and share amazing cooking ideas
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2    lg:grid-cols-3 gap-6">
            {renderRecipes}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">No Recipes Found</h2>
            <p className="text-gray-500 mt-2">
              Start by adding your first recipe!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recipes
