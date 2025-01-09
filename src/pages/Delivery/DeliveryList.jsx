import styles from "./RecipeList.module.css";
import DeliveryTable from "../../components/DeliveryList/DeliveryTable";
import { useNavigate } from "react-router-dom";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";
import DeliveryLogo from "../../assets/icons/logistic_icon.svg";

const DeliveryList = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleNavigate = () => {
    navigate("/delivery-list/add-delivery"); // Navigate to UpdateStock route
  };
  return (
    <div className={styles.recipeListContainer}>
      <PageHead
        title="Delivery"
        description="View and manage your Delivery"
        icon={DeliveryLogo}
      />

      <div className={styles.updateStockContainer}>
        <p>Create a Delivery</p>
        <button onClick={handleNavigate}>Add Delivery to the list</button>
      </div>

      <DeliveryTable />
      <footer className={styles.footer} style={{ textAlign: "center" }}>
        CopyRight 2025 MATRIUM. All rights reserved
      </footer>
    </div>
  );
};

export default DeliveryList;
