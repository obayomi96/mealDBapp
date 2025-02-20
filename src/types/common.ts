import { Id, ToastOptions } from "react-toastify";

export type ToastFunction = {
  success: (content: React.ReactNode, options?: ToastOptions) => Id;
  error: (content: React.ReactNode, options?: ToastOptions) => Id;
  info: (content: React.ReactNode, options?: ToastOptions) => Id;
  warn: (content: React.ReactNode, options?: ToastOptions) => Id;
};

export interface MealDetailProp {
  strMeal: "";
  strMealThumb: "";
  strInstructions: string;
  ingridents: string[];
  strCategory: string;
}
