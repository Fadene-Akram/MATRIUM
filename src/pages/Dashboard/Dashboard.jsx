import StatisticCards from "../../components/StockAndInventory/StatisticCards";
import Notification from "../../components/DahboardComponents/Notification";
import FinancesChart from "../../components/DahboardComponents/FinancesChart";
import StockUpdatesChart from "../../components/DahboardComponents/StockUpdatesChart";
import styles from "./Dashboard.module.css";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";

function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <PageHead
        title="Dashboard"
        description=""
        icon="src/assets/icons/dashboard_icon.svg"
      />
      <StatisticCards />
      {/* <Notification /> */}
      <FinancesChart />
      <StockUpdatesChart />
      <footer className={styles.footer}>
        CopyRight 2025 MATRIUM. All rights reserved
      </footer>
    </div>
  );
}

export default Dashboard;
