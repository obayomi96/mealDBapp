import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMeals,
  getMealcategories,
  filterMeals,
  getSingleMealDetails
} from "../../api/meal";
import { MealDetailProp } from "../../types/common";

interface MealsState {
  mealsList: MealDetailProp[];
  mealCategories: any[];
  selectedMeal: MealDetailProp | null;
  similarMeals: MealDetailProp[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MealsState = {
  mealsList: [],
  mealCategories: [],
  selectedMeal: null,
  similarMeals: [],
  isLoading: false,
  error: null
};

// Async Thunks
export const fetchMeals = createAsyncThunk(
  "meals/fetchMeals",
  async (searchTerm: string) => {
    const response = await getMeals(searchTerm);
    return response;
  }
);

export const fetchMealCategories = createAsyncThunk(
  "meals/fetchMealCategories",
  async () => {
    const response = await getMealcategories();
    return response;
  }
);

export const fetchSingleMealDetails = createAsyncThunk(
  "meals/fetchSingleMealDetails",
  async (id: string) => {
    const response = await getSingleMealDetails(id);
    if (response === "Invalid ID") return "Meal not found";
    return response;
  }
);

export const fetchSimilarMeals = createAsyncThunk(
  "meals/fetchSimilarMeals",
  async (category: string) => {
    const response = await filterMeals("", category);
    return response;
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<MealDetailProp>) => {
      state.mealsList.unshift(action.payload);
    },
    clearSelectedMeal: state => {
      state.selectedMeal = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMeals.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mealsList = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch meals";
      })
      .addCase(fetchMealCategories.fulfilled, (state, action) => {
        state.mealCategories = action.payload;
      })
      .addCase(fetchSingleMealDetails.fulfilled, (state, action) => {
        state.selectedMeal = action.payload;
      })
      .addCase(fetchSimilarMeals.fulfilled, (state, action) => {
        state.similarMeals = action.payload;
      });
  }
});

export const { addMeal, clearSelectedMeal } = mealsSlice.actions;
export default mealsSlice.reducer;
