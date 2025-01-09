import PageHead from "../../components/ReusedComponent/Page Head/PageHead";
import StatisticCards from "../../components/StockAndInventory/StatisticCards";
import StockList from "../../components/StockAndInventory/StockList";
import UpdateStockList from "../../components/StockAndInventory/UpdateStockList";
import styles from "./StockAndInventory.module.css";

/**
 * StockAndInventory component renders the stock management page.
 * It includes a page header, statistics cards, stock list, and an update section.
 * The footer contains copyright information.
 *
 * @returns {JSX.Element} The rendered StockAndInventory page.
 */

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
        CopyRight 2025 MATRIUM. All rights reserved
      </footer>
    </div>
  );
}

export default StockAndInventory;
