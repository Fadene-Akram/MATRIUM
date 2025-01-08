import StatisticCard from "../ReusedComponent/Statistic Cards/StatisticCard";
import styles from "./StatisticCards.module.css";

/**
 * StatisticCards component renders a set of cards displaying different stock statistics.
 * Each card shows a number, an icon, a description, and some comparison data with a positive or negative change.
 *
 * @returns {JSX.Element} The rendered set of statistic cards.
 */
function StatisticCards() {
  return (
    <div className={styles.statisticCardsContainer}>
      <StatisticCard
        number={15}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Categories"
        color={"blue"}
        positiveChangement={true}
        comparisonText={"2 more than last year"}
      />
      <StatisticCard
        number={800}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Total items"
        color={"orange"}
        positiveChangement={false}
        comparisonText={"2 less than last year"}
      />
      <StatisticCard
        number={50000}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Total item cost"
        color={"purple"}
        positiveChangement={true}
        comparisonText={"2 more than last year"}
      />
      <StatisticCard
        number={200}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Items low in stock"
        color={"yellow"}
        positiveChangement={false}
        comparisonText={"2 less than last year"}
      />
    </div>
  );
}

export default StatisticCards;
