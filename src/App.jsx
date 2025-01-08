import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockAndInventory from "./pages/StockAndInventory/StockAndInventory";
import AppLayout from "./components/ReusedComponent/AppLayout";
import Login from "./pages/login/Login";
import RegisterDevice from "./pages/login/RegisterDevice";

import { OrdersProvider } from "../src/context/OrdersContext";
import RecipeCreator from "./pages/CreateEditRecipe/CreateRecipe";
import RecipeList from "./pages/RecipeList/RecipeList";
import EditRecipe from "./pages/CreateEditRecipe/EditRecipe";
import UseRecipe from "./pages/UtilizeRecipe/UseRecipe";
import UpdateStock from "./pages/UpdateStock/UpdateStock";
import DeliveryCreator from "./pages/Delivery/CreateDelivery";
import DeliveryList from "./pages/Delivery/DeliveryList";
import EditDelivery from "./pages/Delivery/EditDelivery";
function App() {
  return (
    <BrowserRouter>
      <OrdersProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register-device" element={<RegisterDevice />} />
          <Route element={<AppLayout />}>
            <Route path="/stock" element={<StockAndInventory />} />
            <Route path="/update-stock" element={<UpdateStock />} />
            <Route path="/recipe-list" element={<RecipeList />} />
            <Route path="/add-recipe" element={<RecipeCreator />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            <Route path="/use-recipe/:id" element={<UseRecipe />} />
            <Route path="/add-delivery" element={<DeliveryCreator />} />
            <Route path="/delivery-list" element={<DeliveryList />} />
            <Route path="/edit-delivery/:id" element={<EditDelivery />} />
          </Route>
        </Routes>
      </OrdersProvider>
    </BrowserRouter>
  );
}

export default App;
