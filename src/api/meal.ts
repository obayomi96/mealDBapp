import axios from "axios";
import { API_URL } from "../utils/consts";

export const getMeals = async (searchTerm?: string) => {
  try {
    const response: any = await axios.get(
      `${API_URL}/search.php?s=${searchTerm}`
    );
    if (response.data?.meals) {
      return response?.data?.meals;
    }
  } catch (err) {
    return err;
  }
};

export const filterMeals = async (filterTerm: string, category: string) => {
  try {
    const queryParams = new URLSearchParams();

    if (filterTerm) queryParams.append("a", filterTerm.toString());
    if (category) queryParams.append("c", category.toString());

    const response: any = await axios.get(
      `${API_URL}/filter.php?${
        filterTerm ? "a=" + filterTerm : "c=" + category
      }`
    );
    if (response.data?.meals) {
      return response?.data?.meals;
    }
  } catch (err) {
    return err;
  }
};

export const getSingleMealDetails = async (mealId: string) => {
  try {
    const response: any = await axios.get(`${API_URL}/lookup.php?i=${mealId}`);
    if (response.data?.meals) {
      return response?.data?.meals;
    }
  } catch (err) {
    return err;
  }
};

export const getMealcategories = async () => {
  try {
    const response: any = await axios.get(`${API_URL}/categories.php`);
    if (response.data?.categories) {
      return response?.data?.categories;
    }
  } catch (err) {
    return err;
  }
};
