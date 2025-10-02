import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/RecipeProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const RecipeDetails = () => {
  const { data, setData } = useContext(RecipesContext);
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [favorite, setFavorite] = useState(JSON.parse(localStorage.getItem("fav")) || []);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const foundRecipe = data.find(r => String(r.id) === String(params.id));
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        toast.error("Recipe not found");
        navigate("/recipes");
      }
      setLoading(false);
    }
  }, [data, params.id, navigate]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: recipe || {
      RecipeName: "",

      RecipeDetails: "",
      RecipeImage: "",
      RecipeCategory: "Breakfast",
      RecipeIngredient: "",
    },
  });

  useEffect(() => {
    if (recipe) {
      reset(recipe);
    }
  }, [recipe, reset]);

  const UpdateHandler = (updatedRecipe) => {
    const index = data.findIndex(r => String(r.id) === String(params.id));
    if (index === -1) return;
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], ...updatedRecipe };
    setData(updatedData);
    localStorage.setItem("recipe", JSON.stringify(updatedData));
    toast.success("Recipe Updated");
    reset(updatedRecipe);

  };

  const DeleteHandler = () => {
    const filteredData = data.filter(r => String(r.id) !== String(params.id));
    setData(filteredData);
    localStorage.setItem("recipe", JSON.stringify(filteredData));
    toast.error("Recipe Deleted");
    navigate("/recipes")

  };

  const favHandler = () => {
    if (!favorite.find(f => String(f.id) === String(recipe.id))) {
      const updatedFav = [...favorite, recipe];
      setFavorite(updatedFav);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
    }
  };

  const unfavHandler = () => {
    const updatedFav = favorite.filter(f => String(f.id) !== String(recipe.id));
    setFavorite(updatedFav);
    localStorage.setItem("fav", JSON.stringify(updatedFav));

  };

  if (loading || !recipe) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-orange-900 font-bold text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-2 sm:p-8 bg-amber-50 flex flex-col md:flex-row gap-6 md:gap-10 relative">
      {/* LEFT SIDE - IMAGE & TITLE */}
      <div className="flex-1 flex flex-col items-center md:items-start gap-4 md:gap-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-orange-900 text-center md:text-left break-words">
          {recipe.RecipeName}
        </h1>
        {typeof recipe.RecipeImage === "string" && recipe.RecipeImage.trim() !== "" && (
          <>
            <img
              src={recipe.RecipeImage}
              alt={recipe.RecipeName}
              className="w-full max-w-xs sm:max-w-md h-[50vh] rounded-lg shadow-lg object-cover"
            />
            <div className="w-full flex justify-start mt-1">
              {favorite.find(f => String(f.id) === String(recipe.id)) ? (
                <i onClick={unfavHandler}
                  className="cursor-pointer text-3xl sm:text-4xl text-amber-700 ri-heart-fill hover:scale-110 transition-transform"
                ></i>
              ) : (
                <i
                  onClick={favHandler}
                  className="cursor-pointer text-3xl sm:text-4xl text-amber-700 ri-heart-line hover:scale-110 transition-transform"
                ></i>
              )}
            </div>
          </>
        )}
        <h2 className='text-amber-900 font-medium text-2xl text-start  '>Recipe Details.</h2>
        <h3 className='-mt-4 text-start '>{recipe.RecipeDetails}</h3>
        <h2 className='text-amber-900 font-medium text-2xl text-start'>Recipe Ingredients.</h2>
        <h3 className='-mt-4 text-start'>{recipe.RecipeIngredient}</h3>
      </div>

      {/* RIGHT SIDE - FORM */}
      <form
        onSubmit={handleSubmit(UpdateHandler)}
        className="flex-1 flex flex-col gap-3 sm:gap-4 p-2 sm:p-6 bg-white rounded-xl shadow-md"
        >
        <label className='text-center text-4xl font-bold'>Update Recipe.</label>
        <label className="font-semibold text-gray-700">Recipe Name</label>
        <input
          {...register('RecipeName')}
          placeholder="Enter Recipe Name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 text-base"
        />

        <label className="font-semibold text-gray-700">Image URL</label>
        <input
          {...register('RecipeImage')}
          type="url"
          placeholder="Enter Image URL"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 text-base"
        />

        <label className="font-semibold text-gray-700">Category</label>
        <select
          {...register('RecipeCategory')}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 text-base"
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Dessert">Dessert</option>
          <option value="Snacks">Snacks</option>
          <option value="Dinner">Dinner</option>
        </select>

        <label className="font-semibold text-gray-700">Details</label>
        <textarea
          {...register('RecipeDetails')}
          placeholder="Enter Details"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 text-base resize-none h-20 sm:h-24"
        />

        <label className="font-semibold text-gray-700">Ingredients</label>
        <textarea
          {...register('RecipeIngredient')}
          placeholder="Enter Ingredients"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 text-base h-20 sm:h-32 resize-none overflow-auto scrollbar-hide"
        />

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2">
          <button
            type="submit"
            className="w-full sm:w-auto py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Update Recipe
          </button>
          <button
            type="button"
            onClick={handleSubmit(DeleteHandler)}
            className="w-full sm:w-auto py-2 px-4 bg-red-900 text-white rounded hover:bg-red-700 transition"
          >
            Delete Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeDetails;