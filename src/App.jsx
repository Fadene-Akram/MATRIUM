import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockAndInventory from "./pages/StockAndInventory/StockAndInventory";
import AppLayout from "./components/ReusedComponent/AppLayout";
import UpdateStock from "./components/StockAndInventory/UpdateStock/UpdateStock";
import Login from "./pages/login/Login";
import RegisterDevice from "./pages/login/RegisterDevice";
import PurchaseOrder from "./pages/Purchase Orders List/PurchaseOrder";
import PurchaseOrdersList from "./pages/Purchase Orders List/PurchaseOrdersList";
import { OrdersProvider } from "../src/context/OrdersContext";
import RecipeCreator from "./pages/RecipeList/CreateRecipe";
import RecipeList from "./pages/RecipeList/RecipeList";
import EditRecipe from "./pages/RecipeList/EditRecipe";
function App() {
  return (
    <BrowserRouter>
      <OrdersProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/purchase-orders-list"
            element={<PurchaseOrdersList />}
          />
          <Route element={<AppLayout />}>
            <Route path="/register-device" element={<RegisterDevice />} />
            <Route path="/purchase-order" element={<PurchaseOrder />} />
            <Route path="/stock" element={<StockAndInventory />} />
            <Route path="/update-stock" element={<UpdateStock />} />
            <Route path="/add-recipe" element={<RecipeCreator />} />
            <Route path="/recipe-list" element={<RecipeList />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          </Route>
        </Routes>
      </OrdersProvider>
    </BrowserRouter>
  );
}

export default App;
