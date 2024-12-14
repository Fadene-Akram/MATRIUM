import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "../../context/OrdersContext";
import "./PurchaseOrder.css";
import PageHead from "../../components/ReusedComponent/PageHead";

const PurchaseOrder = () => {
  const [items, setItems] = useState([
    {
      item: "",
      quantity: 1,
      uom: "pcs",
      price: 0,
      tax: 0,
      expectedArrival: "",
    },
  ]);
  const [supplier, setSupplier] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [expectedArrival, setExpectedArrival] = useState("");
  const [createdDate, setCreatedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [shipTo, setShipTo] = useState("");
  const [additionalExpenses, setAdditionalExpenses] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { orders, setOrders } = useContext(OrdersContext);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        item: "",
        quantity: 1,
        uom: "pcs",
        price: 0,
        tax: 0,
        expectedArrival: "",
      },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const totalTax = items.reduce(
    (sum, item) => sum + (item.quantity * item.price * item.tax) / 100,
    0
  );
  const total = subtotal + totalTax + parseFloat(additionalExpenses);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !supplier ||
      !orderNumber ||
      !expectedArrival ||
      !shipTo ||
      items.some((item) => !item.item)
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    const newOrder = {
      supplier,
      orderNumber,
      expectedArrival,
      createdDate,
      shipTo,
      items,
      additionalExpenses,
      additionalInfo,
      totalUnits,
      subtotal,
      totalTax,
      totalOrderValue: total,
      status: "open",
      delivery: "not received",
    };

    setOrders([...orders, newOrder]);
    navigate("/purchase-orders-list");
  };

  return (
    <div className="purchase-order-container">
      <PageHead
        title="Stocks and Inventories"
        description="Update stock and inventory table"
        icon="src/assets/icons/stock_and_enventory_icon.svg"
      />
      <h1 className="purchase-order-title">Create Purchase Order</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="purchase-order-form">
        <div className="form-group">
          <label>Supplier *</label>
          <input
            type="text"
            placeholder="Select or create supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Order Number *</label>
          <input
            type="text"
            placeholder="Enter order number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Expected Arrival *</label>
          <input
            type="date"
            value={expectedArrival}
            onChange={(e) => setExpectedArrival(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Created Date</label>
          <input
            type="date"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ship To *</label>
          <input
            type="text"
            placeholder="Enter shipping location"
            value={shipTo}
            onChange={(e) => setShipTo(e.target.value)}
          />
        </div>
        <div className="items-section">
          <label>Items *</label>
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>UoM</th>
                <th>Price (DA)</th>
                <th>Total (DA)</th>
                <th>Tax (%)</th>
                <th>Expected Arrival</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter item name"
                      value={item.item}
                      onChange={(e) =>
                        handleItemChange(index, "item", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.uom}
                      onChange={(e) =>
                        handleItemChange(index, "uom", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>{(item.quantity * item.price).toFixed(2)} DA</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.tax}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "tax",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={item.expectedArrival}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "expectedArrival",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="add-btn" onClick={addItem}>
            + Add Item
          </button>
        </div>
        <div className="form-group">
          <label>Additional Expenses</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={additionalExpenses}
            onChange={(e) => setAdditionalExpenses(parseFloat(e.target.value))}
          />
        </div>
        <div className="summary">
          <p>Total Units: {totalUnits} pcs</p>
          <p>Subtotal: {subtotal.toFixed(2)} DA</p>
          <p>Tax: {totalTax.toFixed(2)} DA</p>
          <p>
            <strong>Total: {total.toFixed(2)} DA</strong>
          </p>
        </div>
        <div className="form-group">
          <label>Additional Information</label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Add any extra information here"
          />
        </div>
        <button type="submit" className="submit-btn">
          Save Order
        </button>
      </form>
    </div>
  );
};

export default PurchaseOrder;
