/* import { BrowserRouter, Route, Routes } from "react-router-dom";
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
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StockAndInventory from "./pages/StockAndInventory/StockAndInventory";
import UpdateStock from "./components/StockAndInventory/UpdateStock/UpdateStock.jsx"; // Import UpdateStock page
import AppLayout from "./components/ReusedComponent/AppLayout";
// Import the AppLogin component
import React from 'react';

import Login from './components/login/Login';
import RegisterDevice from './components/login/RegisterDevice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for authentication pages */}
   
        {/* Main app layout and routes */}
        <Route element={<AppLayout />}>
          <Route index element={<StockAndInventory />} />
          <Route path="update-stock" element={<UpdateStock />} />
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

