import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "../../context/OrdersContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styled from "styled-components";
import MenueBar from "../../components/ReusedComponent/MenueBar"; // Importing MenueBar component
import PageHead from "../../components/ReusedComponent/PageHead";

const Container = styled.div`
  display: flex; /* Flex container to accommodate MenueBar and content side by side */
`;

const Content = styled.div`
  padding: 20px;

  color: #333;
  background-color: #f8f9fd;
  flex-grow: 1; /* Allow content to take up remaining space */
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #5584ce;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &.add {
    background-color: #5584ce;
    color: white;
  }

  &.export {
    background-color: #eaf2ff;
    color: #5584ce;
  }
`;

const Error = styled.p`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#5584ce" : "#eaf2ff")};
  color: ${(props) => (props.active ? "white" : "#5584ce")};
  border: 1px solid #5584ce;
  border-radius: 5px;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #5584ce;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

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

    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Purchase Orders Report", 14, 15);

    // Define table columns
    const columns = [
      "Created Date",
      "Order Number",
      "Supplier",
      "Total Order Value (DA)",
      "Expected Arrival",
      "Delivery Status",
    ];

    // Define table rows based on filtered orders
    const rows = (showOpenOrders ? openOrders : doneOrders).map((order) => [
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
    <Container>
      <MenueBar /> {/* Adding MenueBar to the layout */}
      <Content>
        <PageHead
          title="Purchase Orders List"
          description="Create and add purshase order"
          icon="src/assets/icons/stock_and_enventory_icon.svg"
        />
        <Header>Purchase Orders List</Header>

        {error && <Error>{error}</Error>}

        <ButtonsContainer>
          <Button className="add" onClick={addOrder}>
            Add Order
          </Button>
          <Button className="export" onClick={exportTable}>
            Export Table
          </Button>
        </ButtonsContainer>

        <p>Total Orders: {totalOrders}</p>
        <p>Total Costs: {totalCost.toFixed(2)} DA</p>

        <FilterButtons>
          <FilterButton
            active={showOpenOrders}
            onClick={() => setShowOpenOrders(true)}
          >
            Open Orders
          </FilterButton>
          <FilterButton
            active={!showOpenOrders}
            onClick={() => setShowOpenOrders(false)}
          >
            Done Orders
          </FilterButton>
        </FilterButtons>

        <OrdersTable>
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
        </OrdersTable>
      </Content>
    </Container>
  );
};

export default PurchaseOrdersList;
