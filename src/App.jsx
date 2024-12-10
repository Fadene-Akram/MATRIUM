import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockAndInventory from "./pages/StockAndInventory/StockAndInventory";
import AppLayout from "./components/ReusedComponent/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<StockAndInventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
