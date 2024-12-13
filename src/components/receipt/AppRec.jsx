import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrdersProvider } from './OrdersContext';
import PurchaseOrdersList from './PurchaseOrdersList';
import PurchaseOrder from './PurchaseOrder';

function App() {
  return (
    <OrdersProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PurchaseOrdersList />} />
          <Route path="/purchase-order" element={<PurchaseOrder />} />
        </Routes>
      </Router>
    </OrdersProvider>
  );
}

export default App;
