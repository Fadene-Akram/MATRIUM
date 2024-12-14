import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockAndInventory from "./pages/StockAndInventory/StockAndInventory";
import AppLayout from "./components/ReusedComponent/AppLayout";
import UpdateStock from "./components/StockAndInventory/UpdateStock/UpdateStock";
import Login from "./components/login/Login";
import RegisterDevice from "./components/login/RegisterDevice";
import PurchaseOrder from "./components/receipt/PurchaseOrder";
import PurchaseOrdersList from "./components/receipt/PurchaseOrdersList";
import { OrdersProvider } from '../src/context/OrdersContext';
function App() {
  return (
    <BrowserRouter>
      <OrdersProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register-device" element={<RegisterDevice />} />
        <Route path="/purchase-orders-list" element={<PurchaseOrdersList />} />
        <Route path="/purchase-order" element={<PurchaseOrder />} />
        <Route element={<AppLayout />}>
          <Route path="/stock" element={<StockAndInventory />} />
          <Route path="/update-stock" element={<UpdateStock />} />
        </Route>
      </Routes>
      </OrdersProvider>
    </BrowserRouter>
  );
}

export default App;