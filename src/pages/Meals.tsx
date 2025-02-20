import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

import MealCard from "../components/MealCard";
import SearchField from "../components/SearchField";
import CustomDropdown from "../components/CustomDropdown";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { showToast, ToastType } from "../components/CustomToast";
import { AppDispatch, RootState } from "../store/store";
import { addMeal, fetchMealCategories, fetchMeals } from "../store/slices/meal";

function Meals() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { mealsList, mealCategories, isLoading } = useSelector(
    (state: RootState) => state.meals
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewMealModalOpen, setIsNewMealModalOpen] = useState(false);
  const [filters, setFilters] = useState<{ area: string }>({ area: "" });

  useEffect(() => {
    dispatch(fetchMeals(searchTerm));
    dispatch(fetchMealCategories());
  }, [searchTerm, dispatch]);

  const handleSearchSubmit = () => {
    dispatch(fetchMeals(searchTerm ?? ""));
  };

  const handleFilterMeals = (value: string) => {
    setFilters({ area: value });
    dispatch(fetchMeals(value ?? ""));
  };

  const formik = useFormik({
    initialValues: {
      strMeal: "",
      strCategory: "",
      strArea: "",
      strMealThumb: ""
    },
    validationSchema: Yup.object({
      strMeal: Yup.string().required("Meal name is required"),
      strCategory: Yup.string().required("Meal category is required"),
      strArea: Yup.string().required("Meal area is required")
    }),
    onSubmit: async values => {
      const newMeal: any = {
        idMeal: Date.now().toString(),
        ...values
      };
      dispatch(addMeal(newMeal));
      showToast("Meal added successfully!", ToastType.SUCCESS);
      setIsNewMealModalOpen(false);
      formik.resetForm();
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("strMealThumb", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto">
      <div className="w-full px-6 md:px-12 flex items-center justify-between mx-auto my-6 flex-wrap md:flex-nowrap gap-y-5 md:gap-y-0">
        <div className="w-full md:w-[30.3125rem]">
          <SearchField
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            setValue={() => setSearchTerm("")}
            handleClickSearch={handleSearchSubmit}
            placeholder="Search meal"
            className="h-[2.5rem] bg-[#eee] rounded-lg shadow-md"
          />
        </div>

        <div className="h-[2.5rem]">
          <CustomDropdown
            optionsList={mealCategories.map((item: any) => ({
              label: item.strCategory,
              value: item.strCategory
            }))}
            name="area"
            value={filters?.area || ""}
            onChange={e => {
              setFilters(prevFilters => ({
                ...prevFilters,
                area: e.target.value || ""
              }));
              handleFilterMeals(e.target.value);
            }}
            placeholder="Filter by"
          />
        </div>
      </div>

      <div className="w-auto flex justify-end text-[grey] px-6 md:px-12 my-5 hover:opacity-75 cursor-pointer font-medium">
        Add new meal
      </div>

      <div className="w-full flex items-center justify-evenly flex-wrap gap-5 border-t border-t-[#ddd] py-5 px-6">
        {mealsList?.length ? (
          mealsList?.map((item: any) => (
            <div
              key={item.idMeal}
              className="w-full md:w-[25rem] cursor-pointer"
              onClick={() => navigate(`/meal/${item.idMeal}`)}
            >
              <MealCard meal={item} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <Dialog
        open={isNewMealModalOpen}
        onClose={() => setIsNewMealModalOpen(false)}
        aria-labelledby="meal-dialog-title"
      >
        <DialogTitle id="meal-dialog-title">Meal details</DialogTitle>
        <DialogContent>
          <div className="">
            <TextField
              label="Meal name"
              name="strMeal"
              placeholder="Enter meal name"
              inputClass="h-[3.5rem]"
              value={formik.values.strMeal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.strMeal ? formik.errors.strMeal : ""}
            />
          </div>

          <div className="my-2">
            <TextField
              label="Meal category"
              name="strCategory"
              placeholder="Enter meal name"
              inputClass="h-[3.5rem]"
              value={formik.values.strCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.strCategory ? formik.errors.strCategory : ""
              }
            />
          </div>

          <div className="">
            <TextField
              label="Meal area"
              name="strArea"
              placeholder="Enter meal name"
              inputClass="h-[3.5rem]"
              value={formik.values?.strArea}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched?.strArea ? formik.errors?.strArea : ""}
            />
          </div>

          <div className="mt-4">
            <label className="block font-medium">Meal Image</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            {formik.values?.strMealThumb && (
              <img
                src={formik.values?.strMealThumb}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover"
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-full flex justify-between items-center gap-x-2">
            <Button
              onClick={() => setIsNewMealModalOpen(false)}
              label="Close"
              additionalClassname={`w-1/2 text-[red] bg-[#eee] w-[8rem]`}
            />
            <Button
              onClick={formik.handleSubmit}
              label="Save meal"
              loading={isLoading}
              additionalClassname={`w-1/2 text-[grey] bg-[#eee] w-[8rem]`}
            />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Meals;
