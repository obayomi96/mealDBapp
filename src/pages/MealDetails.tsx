import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { extractIngredients } from "../utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import CustomTable from "../components/CustomTable";
import { AppDispatch, RootState } from "../store/store";
import {
  clearSelectedMeal,
  fetchSimilarMeals,
  fetchSingleMealDetails
} from "../store/slices/meal";

const mealDetailsTableColumn: ColumnDef<any>[] = [
  {
    header: "Similar Meals",
    accessorKey: "strMeal",
    cell: ({ row }: any): React.ReactElement => {
      const { strMealThumb, strMeal } = row.original;
      return (
        <div className="flex items-center gap-x-2">
          <div className="w-auto h-[2rem] flex justify-center items-center">
            <img
              alt=""
              src={strMealThumb || "/free_img.jpg"}
              className="rounded-full w-[1.875rem] h-[1.875rem]"
              width={30}
              height={30}
            />
          </div>
          <div>{strMeal || ""}</div>
        </div>
      );
    }
  }
];

const MealDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMeal, similarMeals } = useSelector(
    (state: RootState) => state.meals
  );
  const [ingredientsList, setIngredientsList] = useState<any>();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleMealDetails(id));
    }
    return () => {
      dispatch(clearSelectedMeal());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedMeal) {
      setIngredientsList(extractIngredients(selectedMeal));
      dispatch(fetchSimilarMeals(selectedMeal.strCategory));
    }
  }, [selectedMeal, dispatch]);

  return (
    <>
      <Link
        className="text-lg font-semibold my-5 px-6 md:px-12 hover:opacity-75 text-[#302f2f]"
        to="/"
      >
        Back
      </Link>

      <div className="w-full h-auto flex justify-center flex-wrap md:flex-nowrap p-5 gap-x-2 mx-auto">
        <div className="max-w-2xl rounded shadow-lg px-2">
          <img
            className="w-full"
            src={selectedMeal?.strMealThumb || "/free_img.jpg"}
            alt="Meal thumbnail"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {selectedMeal?.strMeal || ""}
            </div>
            <p className="text-gray-700 text-base">
              {selectedMeal?.strInstructions}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            {ingredientsList?.map((item: string, index: number) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{item}
              </span>
            ))}
          </div>
          <div className="w-full overflow-y-scroll mt-4 mx-4">
            <CustomTable
              columns={mealDetailsTableColumn}
              data={similarMeals || []}
              tableTopSearchFieldPlaceholderText="Search meal"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MealDetails;
