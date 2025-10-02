import { nanoid } from 'nanoid'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { RecipesContext } from '../context/RecipeProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(RecipesContext);
  const { register, handleSubmit, reset , formState: { errors }} = useForm();

  const submitHandler = (recipe) => {
    const mappedRecipe = {
      id: nanoid(),
      RecipeName: recipe.recipeName,
      ChefName: recipe.chefName,
      RecipeImage: recipe.image,
      RecipeCategory: recipe.categories,
      RecipeDetails: recipe.description,
      RecipeIngredient: recipe.ingredients,
    };
    const copydata = [...data];
    copydata.push(mappedRecipe);
    setData(copydata);
    localStorage.setItem("recipe", JSON.stringify(copydata));
    toast.success("New Recipe Created");
    reset();
    navigate("/recipes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex flex-col lg:flex-row items-center justify-center px-6 py-12 gap-12">
      
      {/* Left Side Image */}
      <div className="hidden lg:block w-1/2 ">
        <img
          className="rounded-3xl object-cover w-full h-[600px] shadow-lg"
          src="https://plus.unsplash.com/premium_vector-1737047236495-4efe6101f0a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlY2lwZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Recipe Illustration"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-xl p-8 lg:p-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create a New Recipe!
        </h1>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-6"
        >
          <input
            {...register("recipeName",{ required: "Recipe Details cannot be empty" })}
            type="text"
            placeholder="Enter Recipe Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-sm"
          />
  

          <input
            {...register("chefName",{ required: "Recipe Details cannot be empty" })}
            type="text"
            placeholder="Enter Chef Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-sm"
          />

          <input
            {...register("image",{ required: "Recipe Details cannot be empty" })}
            type="url"
            placeholder="Enter Image URL"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-sm"
          />

          <select
            {...register("categories",{ required: "Recipe Details cannot be empty" })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-sm"
          >
            <option value="BreakFast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="Dinner">Dinner</option>
          </select>

          <textarea
            {...register("description",{ required: "Recipe Details cannot be empty" })}
            placeholder="Enter Description"
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-sm"
          />

          <textarea
            {...register("ingredients",{ required: "Recipe Details cannot be empty" })}
            placeholder="Enter Ingredients"
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-sm"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
