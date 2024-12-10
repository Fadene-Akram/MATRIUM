import StatisticCard from "../ReusedComponent/StatisticCard";
import styles from "./StatisticCards.module.css";

function StatisticCards() {
  return (
    <div className={styles.statisticCardsContainer}>
      <StatisticCard
        number={15}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Categories"
        color={"blue"}
      />
      <StatisticCard
        number={800}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Total items"
        color={"orange"}
      />
      <StatisticCard
        number={5000000}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Total item cost"
        color={"purple"}
      />
      <StatisticCard
        number={200}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Items low in stock"
        color={"yellow"}
      />
    </div>
  );
}

export default StatisticCards;
