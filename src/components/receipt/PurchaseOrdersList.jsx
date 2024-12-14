import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "../../context/OrdersContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./PurchaseOrdersList.module.css"; // Import CSS file

const PurchaseOrdersList = () => {
  const { orders, setOrders } = useContext(OrdersContext);
  const [showOpenOrders, setShowOpenOrders] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addOrder = () => {
    navigate("/purchase-order");
  };

  const markAsDone = (orderNumber) => {
    const updatedOrders = orders.map((order) =>
      order.orderNumber === orderNumber ? { ...order, status: "done" } : order
    );
    setOrders(updatedOrders);
  };

  const exportTable = () => {
    if (!orders.length) {
      setError("No orders available to export.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Purchase Orders Report", 14, 15);

    const columns = [
      "Created Date",
      "Order Number",
      "Supplier",
      "Total Order Value (DA)",
      "Expected Arrival",
      "Delivery Status",
    ];

    const rows = (showOpenOrders ? openOrders : doneOrders).map((order) => [
      order.createdDate,
      order.orderNumber,
      order.supplier,
      order.totalOrderValue.toFixed(2),
      order.expectedArrival,
      order.delivery,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 25,
    });

    doc.save("purchase_orders_report.pdf");
  };

  const totalOrders = orders.length;
  const totalCost = orders.reduce(
    (sum, order) => sum + (order.totalOrderValue || 0),
    0
  );

  const openOrders = orders.filter((order) => order.status !== "done");
  const doneOrders = orders.filter((order) => order.status === "done");

  return (
    <div className="container">
      <h1 className="header">Purchase Orders List</h1>

      {error && <p className="error">{error}</p>}

      <div className="buttons-container">
        <button className="button add-button" onClick={addOrder}>
          Add Order
        </button>
        <button className="button export-button" onClick={exportTable}>
          Export Table
        </button>
      </div>

      <p>Total Orders: {totalOrders}</p>
      <p>Total Costs: {totalCost.toFixed(2)} DA</p>

      <div className="filter-buttons">
        <button
          className={`button filter-button ${
            showOpenOrders ? "active-filter" : ""
          }`}
          onClick={() => setShowOpenOrders(true)}
        >
          Open Orders
        </button>
        <button
          className={`button filter-button ${
            !showOpenOrders ? "active-filter" : ""
          }`}
          onClick={() => setShowOpenOrders(false)}
        >
          Done Orders
        </button>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Created Date</th>
            <th>Order Number</th>
            <th>Supplier</th>
            <th>Total Order Value (DA)</th>
            <th>Expected Arrival</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          {(showOpenOrders ? openOrders : doneOrders).map((order, index) => (
            <tr key={index}>
              <td>{order.createdDate}</td>
              <td>{order.orderNumber}</td>
              <td>{order.supplier}</td>
              <td>{order.totalOrderValue.toFixed(2)} DA</td>
              <td>{order.expectedArrival}</td>
              <td>
                <select
                  value={order.delivery}
                  onChange={(e) => {
                    const newDeliveryStatus = e.target.value;
                    const updatedOrders = orders.map((o) =>
                      o.orderNumber === order.orderNumber
                        ? { ...o, delivery: newDeliveryStatus }
                        : o
                    );
                    setOrders(updatedOrders);
                    if (newDeliveryStatus === "received all") {
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
