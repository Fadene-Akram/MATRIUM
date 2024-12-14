import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockAndInventory from "./pages/StockAndInventory/StockAndInventory";
import AppLayout from "./components/ReusedComponent/AppLayout";
import UpdateStock from "./components/StockAndInventory/UpdateStock/UpdateStock";
import Login from "./components/login/Login";
import RegisterDevice from "./components/login/RegisterDevice";
import PurchaseOrder from "./components/receipt/PurchaseOrder";
import PurchaseOrdersList from "./components/receipt/PurchaseOrdersList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register-device" element={<RegisterDevice />} />
        <Route path="/purshased-order-list" element={<PurchaseOrdersList />} />
        <Route path="/purchase-order" element={<PurchaseOrder />} />
        <Route element={<AppLayout />}>
          <Route index element={<StockAndInventory />} />
          <Route path="/update-stock" element={<UpdateStock />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;