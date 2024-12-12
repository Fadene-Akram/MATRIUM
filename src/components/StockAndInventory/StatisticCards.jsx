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
        number={5000000}
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

// import { useQuery } from "@tanstack/react-query";
// import StatisticCard from "../ReusedComponent/StatisticCard";
// import styles from "./StatisticCards.module.css";

// // Function to fetch the statistics data
// const fetchStatistics = async () => {
//   const response = await fetch("/api/statistics"); // Adjust the endpoint to your backend
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// };

// function StatisticCards() {
//   const { data, isLoading, error } = useQuery(["statistics"], fetchStatistics);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data</div>;
//   }

//   return (
//     <div className={styles.statisticCardsContainer}>
//       <StatisticCard
//         number={data.categories}
//         icon="src/assets/icons/stock_and_enventory_icon.svg"
//         description="Categories"
//         color={"blue"}
//         positiveChangement={data.categoriesChange > 0}
//         comparisonText={data.categoriesComparisonText} // Directly using the backend string
//       />
//       <StatisticCard
//         number={data.totalItems}
//         icon="src/assets/icons/stock_and_enventory_icon.svg"
//         description="Total items"
//         color={"orange"}
//         positiveChangement={data.totalItemsChange > 0}
//         comparisonText={data.totalItemsComparisonText} // Directly using the backend string
//       />
//       <StatisticCard
//         number={data.totalItemCost}
//         icon="src/assets/icons/stock_and_enventory_icon.svg"
//         description="Total item cost"
//         color={"purple"}
//         positiveChangement={data.totalItemCostChange > 0}
//         comparisonText={data.totalItemCostComparisonText} // Directly using the backend string
//       />
//       <StatisticCard
//         number={data.itemsLowInStock}
//         icon="src/assets/icons/stock_and_enventory_icon.svg"
//         description="Items low in stock"
//         color={"yellow"}
//         positiveChangement={data.itemsLowInStockChange > 0}
//         comparisonText={data.itemsLowInStockComparisonText} // Directly using the backend string
//       />
//     </div>
//   );
// }

// export default StatisticCards;

// {
//   "categories": 15,
//   "categoriesComparisonText": "2 more than last year",
//   "totalItems": 800,
//   "totalItemsComparisonText": "2 less than last year",
//   "totalItemCost": 5000000,
//   "totalItemCostComparisonText": "2 more than last year",
//   "itemsLowInStock": 200,
//   "itemsLowInStockComparisonText": "2 less than last year"
// }
