import React from 'react';

import { FaHeart, FaSearch, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const AddRecipeHandler=()=>{
    navigate("/create")
  }

  const recipeHandler = () => {
    navigate("/recipes");
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4">
          Discover & Share <span className="text-orange-500">Recipes</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Explore thousands of delicious recipes, save your favorites, and share your culinary creations with the world.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={recipeHandler} 
           className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            <FaSearch /> Explore Recipes
          </button>
          <button onClick={AddRecipeHandler} className="flex items-center gap-2 border border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
            <FaUpload /> Add Recipe
          </button>
        </div>
        {/* Hero Images */}
        <div className="flex flex-wrap justify-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1657143377606-ad2f0b790fc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlY2lwZXN8ZW58MHx8MHx8fDA%3D"
            alt="Delicious Recipe"
            className="w-full md:w-[48%] rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
          <img
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1153&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cooking"
            className="w-full md:w-[48%] rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaHeart className="text-orange-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Save Favorites</h3>
          <p className="text-gray-600">Keep track of your favorite recipes and access them anytime.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaUpload className="text-orange-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Share Recipes</h3>
          <p className="text-gray-600">Upload your culinary creations and inspire other food lovers.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <FaSearch className="text-orange-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Discover New Dishes</h3>
          <p className="text-gray-600">Explore a wide variety of recipes from around the world.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
