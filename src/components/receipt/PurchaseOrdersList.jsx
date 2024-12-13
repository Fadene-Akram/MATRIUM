import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrdersContext } from './OrdersContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PurchaseOrdersList = () => {
  const { orders, setOrders } = useContext(OrdersContext);
  const [showOpenOrders, setShowOpenOrders] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addOrder = () => {
    navigate('/purchase-order');
  };

  const markAsDone = (orderNumber) => {
    const updatedOrders = orders.map(order =>
      order.orderNumber === orderNumber ? { ...order, status: 'done' } : order
    );
    setOrders(updatedOrders);
  };

  const exportTable = () => {
    if (!orders.length) {
      setError('No orders available to export.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text('Purchase Orders Report', 14, 15);

    // Define table columns
    const columns = [
      'Created Date',
      'Order Number',
      'Supplier',
      'Total Order Value (DA)',
      'Expected Arrival',
      'Delivery Status',
    ];

    // Define table rows based on filtered orders
    const rows = (showOpenOrders ? openOrders : doneOrders).map(order => [
      order.createdDate,
      order.orderNumber,
      order.supplier,
      order.totalOrderValue.toFixed(2),
      order.expectedArrival,
      order.delivery,
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 25,
    });

    // Save the PDF
    doc.save('purchase_orders_report.pdf');
  };

  const totalOrders = orders.length;
  const totalCost = orders.reduce((sum, order) => sum + (order.totalOrderValue || 0), 0);

  const openOrders = orders.filter(order => order.status !== 'done');
  const doneOrders = orders.filter(order => order.status === 'done');

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: '20px auto',
      maxWidth: '1200px',
      color: '#333',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#0056b3',
    },
    button: {
      padding: '10px 20px',
      margin: '5px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    addButton: {
      backgroundColor: '#0056b3',
      color: '#fff',
    },
    exportButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    filterButton: {
      backgroundColor: '#e9ecef',
      color: '#0056b3',
      border: '1px solid #0056b3',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    th: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
    },
    td: {
      border: '1px solid #ddd',
      padding: '10px',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      margin: '10px 0',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Purchase Orders List</h1>

      {error && <p style={styles.error}>{error}</p>}

      <div>
        <button style={{ ...styles.button, ...styles.addButton }} onClick={addOrder}>Add Order</button>
        <button style={{ ...styles.button, ...styles.exportButton }} onClick={exportTable}>Export Table</button>
      </div>

      <p>Total Orders: {totalOrders}</p>
      <p>Total Costs: {totalCost.toFixed(2)} DA</p>

      <div>
        <button
          style={{ ...styles.button, ...styles.filterButton }}
          onClick={() => setShowOpenOrders(true)}
        >
          Open Orders
        </button>
        <button
          style={{ ...styles.button, ...styles.filterButton }}
          onClick={() => setShowOpenOrders(false)}
        >
          Done Orders
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Created Date</th>
            <th style={styles.th}>Order Number</th>
            <th style={styles.th}>Supplier</th>
            <th style={styles.th}>Total Order Value (DA)</th>
            <th style={styles.th}>Expected Arrival</th>
            <th style={styles.th}>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {(showOpenOrders ? openOrders : doneOrders).map((order, index) => (
            <tr key={index}>
              <td style={styles.td}>{order.createdDate}</td>
              <td style={styles.td}>{order.orderNumber}</td>
              <td style={styles.td}>{order.supplier}</td>
              <td style={styles.td}>{order.totalOrderValue.toFixed(2)} DA</td>
              <td style={styles.td}>{order.expectedArrival}</td>
              <td style={styles.td}>
                <select
                  value={order.delivery}
                  onChange={(e) => {
                    const newDeliveryStatus = e.target.value;
                    const updatedOrders = orders.map(o =>
                      o.orderNumber === order.orderNumber ? { ...o, delivery: newDeliveryStatus } : o
                    );
                    setOrders(updatedOrders);
                    if (newDeliveryStatus === 'received all') {
                      markAsDone(order.orderNumber);
                    }
                  }}
                >
                  <option value="not received">Not Received</option>
                  <option value="received some">Received Some</option>
                  <option value="received all">Received All</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrdersList;
