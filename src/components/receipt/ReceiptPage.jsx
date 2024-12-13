import React from 'react';
import './ReceiptPage.css';

const ReceiptPage = () => {
  const receiptDetails = {
    number: '#12345',
    date: '12-Dec-2024',
    supplier: 'ABC Supplies Co.',
    status: 'Pending',
  };

  const items = [
    { id: 1, name: 'Widget A', description: 'Example Widget', quantity: 10, unitPrice: 5 },
    { id: 2, name: 'Gadget B', description: 'Example Gadget', quantity: 5, unitPrice: 20 },
  ];

  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div className="receipt-page">
      <header className="receipt-header">
        <h1>Receipt Details</h1>
      </header>
      <div className="receipt-summary">
        <h2>Summary</h2>
        <p><strong>Receipt Number:</strong> {receiptDetails.number}</p>
        <p><strong>Date:</strong> {receiptDetails.date}</p>
        <p><strong>Supplier:</strong> {receiptDetails.supplier}</p>
        <p><strong>Status:</strong> {receiptDetails.status}</p>
      </div>
      <div className="receipt-items">
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
        </div>
      </div>
      <div className="actions">
        <button className="btn print">Print Receipt</button>
        <button className="btn export">Export as PDF</button>
        <button className="btn confirm">Confirm Receipt</button>
      </div>
    </div>
  );
};

export default ReceiptPage;
