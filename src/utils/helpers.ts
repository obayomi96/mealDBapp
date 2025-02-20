export const extractIngredients = (meal: Record<string, any>): string[] => {
  return Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key].trim() !== "")
    .map((key) => meal[key]);
};
