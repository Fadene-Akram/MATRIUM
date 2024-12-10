import PageHead from "../../components/ReusedComponent/PageHead";
import StatisticCards from "../../components/StockAndInventory/StatisticCards";
import StockList from "../../components/StockAndInventory/StockList";
import UpdateStockList from "../../components/StockAndInventory/UpdateStockList";
import styles from "./StockAndInventory.module.css";
function StockAndInventory() {
  return (
    <div className={styles.mainStockInventory}>
      <PageHead
        title="Stocks and Inventories"
        description="Update stock and inventory table"
        icon="src/assets/icons/stock_and_enventory_icon.svg"
      />
      <StatisticCards />
      <UpdateStockList />
      <StockList />
      <footer className={styles.footer}>
        CopyRight 2024 MATRIUM. All rights reserved
      </footer>
    </div>
  );
}

export default StockAndInventory;
