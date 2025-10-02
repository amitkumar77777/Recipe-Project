import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const { RecipeName, RecipeDetails, RecipeCategory, RecipeImage, RecipeIngredient, id } = props.recipe;

  return (
    <div className="mt-2 sm:mt-4">
      <Link
        to={`/recipes/details/${id}`}
        className="block bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02]"
      >
        {/* Recipe Image */}
        {typeof RecipeImage === "string" && RecipeImage.trim() !== "" && (
          <img
            className="w-full h-36 sm:h-48 object-cover rounded-t-xl sm:rounded-t-2xl"
            src={RecipeImage}
            alt={RecipeName}
          />
        )}

        {/* Content */}
        <div className="p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 text-center">
          {/* Title */}
          <h1 className="text-base sm:text-xl font-bold text-orange-800 truncate">
            {RecipeName}
          </h1>

          {/* Details */}
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
            {typeof RecipeDetails === "string" ? RecipeDetails.slice(0, 100) : ""}
            ...
            <span className="text-blue-500 font-medium"> More</span>
          </p>

      
          {/* Category Badge */}
          <span className="w-fit bg-orange-100 text-orange-700 text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
            {RecipeCategory}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
