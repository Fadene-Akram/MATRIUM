import React from "react";
import { useQuery } from "@tanstack/react-query";
import StatisticCard from "../ReusedComponent/Statistic Cards/StatisticCard";
import styles from "./StatisticCards.module.css";
import { fetchAnalytics } from "../../api/Api";
// import { fetchAnalytics } from "../../api"; // Ensure this function is correctly imported

/**
 * StatisticCards component renders a set of cards displaying different stock statistics.
 * Uses React Query to fetch analytics data from the API.
 *
 * @returns {JSX.Element} The rendered set of statistic cards.
 */
function StatisticCards() {
  const {
    data: analyticsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.statisticCardsContainer}>
      <StatisticCard
        number={analyticsData.total_categories}
        // number={123}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Categories"
        color="blue"
        positiveChangement={true} // Modify this logic based on comparison data
        comparisonText={"2 more than last year"}
      />
      <StatisticCard
        number={analyticsData.total_items}
        // number={345}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Total items"
        color="orange"
        positiveChangement={false} // Modify this logic based on comparison data
        comparisonText={"2 less than last year"}
      />
      <StatisticCard
        number={analyticsData.total_item_cost}
        // number={563}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Total cost"
        color="purple"
        positiveChangement={true} // Modify this logic based on comparison data
        comparisonText={"Increase in value"}
      />
      <StatisticCard
        number={analyticsData.low_stock_items}
        // number={234}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Item low in stock"
        color="yellow"
        positiveChangement={false} // Modify this logic based on comparison data
        comparisonText={"2 less than last year"}
      />
      <StatisticCard
        number={analyticsData.out_of_stock_items}
        // number={76}
        icon="src/assets/icons/stock_and_enventory_icon.svg"
        description="Items out of stock"
        color="red"
        positiveChangement={false} // Modify this logic based on comparison data
        comparisonText={"No change"}
      />
    </div>
  );
}

export default StatisticCards;
