import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import styles from "./UpdateStockList.module.css";

/**
 * UpdateStockList component renders a button that, when clicked, navigates to the update stock page.
 *
 * @returns {JSX.Element} The rendered update stock list component with a button to navigate to the update stock page.
 */
function UpdateStockList() {
  const navigate = useNavigate(); // Initialize navigation

  /**
   * Handle the navigation to the "update-stock" page.
   *
   * @function
   */
  const handleNavigate = () => {
    navigate("/stock/update-stock"); // Navigate to UpdateStock route
  };

  return (
    <div className={styles.updateStockContainer}>
      <p>Update Stock List</p>
      <button onClick={handleNavigate}>Update Stock</button>
    </div>
  );
}

export default UpdateStockList;
