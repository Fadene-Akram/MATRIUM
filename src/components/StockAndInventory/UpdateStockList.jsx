/* import styles from "./UpdateStockList.module.css";

function UpdateStockList() {
  return (
    <div className={styles.updateStockContainer}>
      <p>Update Stock List</p>
      <button>Update Stock</button>
    </div>
  );
}

export default UpdateStockList;
 */
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import styles from "./UpdateStockList.module.css";

function UpdateStockList() {
  const navigate = useNavigate(); // Initialize navigation

  const handleNavigate = () => {
    navigate("/update-stock"); // Navigate to UpdateStock route
  };

  return (
    <div className={styles.updateStockContainer}>
      <p>Update Stock List</p>
      <button onClick={handleNavigate}>Update Stock</button>
    </div>
  );
}

export default UpdateStockList;
