import { Route, Routes } from "react-router-dom";
import Meals from "./pages/Meals";
import MealDetails from "./pages/MealDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Meals />} />
      <Route path="/meal/:id" element={<MealDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
