import StatisticCard from "../ReusedComponent/StatisticCard";
import styles from "./StatisticCards.module.css";

function StatisticCards() {
  return (
    <div className={styles.statisticCardsContainer}>
      <StatisticCard
        number={15}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Categories"
      />
      <StatisticCard
        number={800}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Total items"
      />
      <StatisticCard
        number={5000000}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Total item cost"
      />
      <StatisticCard
        number={200}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="items low in stock"
      />
    </div>
  );
}

export default StatisticCards;
