import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockAndInventory from "./pages/StockAndInventory/StockAndInventory";
import AppLayout from "./components/ReusedComponent/AppLayout";
import Login from "./pages/login/Login";
import RegisterDevice from "./pages/login/RegisterDevice";

import RecipeCreator from "./pages/CreateEditRecipe/CreateRecipe";
import RecipeList from "./pages/RecipeList/RecipeList";
import EditRecipe from "./pages/CreateEditRecipe/EditRecipe";
import UseRecipe from "./pages/UtilizeRecipe/UseRecipe";
import UpdateStock from "./pages/UpdateStock/UpdateStock";
import DeliveryCreator from "./pages/Delivery/CreateDelivery";
import DeliveryList from "./pages/Delivery/DeliveryList";
import Dashboard from "./pages/Dashboard/Dashboard";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register-device" element={<RegisterDevice />} />
          <Route element={<AppLayout />}>
            <Route path="/stock" element={<StockAndInventory />} />
            <Route path="/stock/update-stock" element={<UpdateStock />} />

            <Route path="/recipe-list" element={<RecipeList />} />
            <Route path="/recipe-list/add-recipe" element={<RecipeCreator />} />
            <Route
              path="/recipe-list/edit-recipe/:id"
              element={<EditRecipe />}
            />
            <Route path="/recipe-list/use-recipe/:id" element={<UseRecipe />} />

            <Route path="/delivery-list" element={<DeliveryList />} />
            <Route
              path="/delivery-list/add-delivery"
              element={<DeliveryCreator />}
            />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
