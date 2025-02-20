import React from 'react'

function MealCard({meal}: any) {
  return (
  <div className="w-full rounded overflow-hidden shadow-lg cursor-pointer hover:opacity-75">
    <img className="w-full" src={meal?.strMealThumb || "/free_img.jpg"} alt="Meal thumbnail"/>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{meal?.strMeal || ""}</div>
      <p className="text-gray-700 text-base">
      Category : {meal?.strCategory || ""}
      </p>
      <p className="text-gray-700 text-base">
      Cousine: {meal?.strArea || ""}
      </p>
    </div>
</div>
  )
}

export default MealCard
