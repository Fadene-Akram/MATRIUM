import MenueBar from "../../components/ReusedComponent/MenueBar";
import PageHead from "../../components/ReusedComponent/PageHead";
import StatisticCards from "../../components/StockAndInventory/StatisticCards";
import UpdateStockList from "../../components/StockAndInventory/UpdateStockList";
import styles from "./StockAndInventory.module.css";
function StockAndInventory() {
  return (
    <div className={styles.stockAndInventoryContainer}>
      <MenueBar />
      <div className={styles.mainStockInventory}>
        <PageHead
          title="Stocks and Inventories"
          description="Update stock and inventory table"
          icon="src/assets/icons/stock_and_enventory_icon.svg"
        />
        <StatisticCards />
        <UpdateStockList />
      </div>
    </div>
  );
}

export default StockAndInventory;
