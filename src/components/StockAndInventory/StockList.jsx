import { useState, useEffect } from "react";
import styles from "./StockList.module.css";
import StockRow from "./StockRow";

/**
 * StockList component fetches and displays a list of products in a paginated table format.
 * It handles loading state, error handling, and pagination logic.
 *
 * @returns {JSX.Element} The rendered stock list component with pagination controls.
 */

function StockList() {
  const [stockData, setStockData] = useState([]); // Holds the stock data fetched from the server
  const [isLoading, setIsLoading] = useState(true); // Represents the loading state
  const [error, setError] = useState(null); // Holds any error encountered during data fetching

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Current page in pagination
  const productsPerPage = 6; // Number of products displayed per page

  useEffect(() => {
    /**
     * Fetches stock data asynchronously from a local JSON file.
     * Sets the stock data state, loading state, and handles errors.
     *
     * @async
     */
    const fetchStockData = async () => {
      try {
        const response = await import("../../data/Dummy_Product.json");
        setStockData(response.default); // Sets stock data to state
        setIsLoading(false); // Sets loading to false once data is fetched
      } catch (err) {
        setError("Failed to fetch stock data"); // Sets error if fetching fails
        setIsLoading(false);
        console.error("Error fetching stock data:", err); // Logs error in the console
      }
    };

    fetchStockData(); // Calls fetch function when the component mounts
  }, []);

  // Calculate the index of the first and last product to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = stockData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  /**
   * Handles navigating to the previous page in the pagination.
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1); // Decreases the current page if not the first page
  };

  /**
   * Handles navigating to the next page in the pagination.
   */
  const handleNextPage = () => {
    if (currentPage * productsPerPage < stockData.length)
      setCurrentPage(currentPage + 1); // Increases the current page if there are more products to show
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>; // Shows loading message if data is being fetched
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>; // Displays error message if fetching fails
  }

  return (
    <div className={styles.stockListContainer}>
      <h2 className={styles.title}>Stock List</h2>
      <div className={styles.table}>
        {/* Table Header */}
        <div className={styles.headerRow}>
          <div className={styles.column}>S/N</div>
          <div className={styles.column}>Image</div>
          <div className={styles.column}>Product Name</div>
          <div className={styles.column}>Product ID</div>
          <div className={styles.column}>Category</div>
          <div className={styles.column}>Qty Purchased</div>
          <div className={styles.column}>Unit Price</div>
          <div className={styles.column}>Total Amount</div>
          <div className={styles.column}>Supplier</div>
          <div className={styles.column}>Status</div>
        </div>
        {/* Table Rows (based on pagination) */}
        {currentProducts.map((product, index) => (
          <StockRow rowInformation={product} key={product.sn || index} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className={styles.pageNumber}>{`Page ${currentPage}`}</span>
        <button
          className={styles.paginationBtn}
          onClick={handleNextPage}
          disabled={currentPage * productsPerPage >= stockData.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StockList;

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import styles from "./StockList.module.css";
// import StockRow from "./StockRow";
// import axios from "axios";

// /**
//  * StockList component fetches and displays a list of products in a paginated table format.
//  * It handles loading state, error handling, and pagination logic using React Query.
//  *
//  * @returns {JSX.Element} The rendered stock list component with pagination controls.
//  */

// function StockList() {
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1); // Current page in pagination
//   const productsPerPage = 6; // Number of products displayed per page

//   // Fetch stock data using React Query
//   const {
//     data: stockData,
//     isLoading,
//     error,
//   } = useQuery(
//     ["stockData", currentPage],
//     async () => {
//       const response = await axios.get(
//         `/api/stock?page=${currentPage}&limit=${productsPerPage}`
//       );
//       return response.data;
//     },
//     {
//       keepPreviousData: true, // Keeps the previous page data while fetching the next page
//     }
//   );

//   /**
//    * Handles navigating to the previous page in the pagination.
//    */
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   /**
//    * Handles navigating to the next page in the pagination.
//    */
//   const handleNextPage = () => {
//     setCurrentPage((prev) => prev + 1);
//   };

//   if (isLoading) {
//     return <div className={styles.loadingContainer}>Loading...</div>; // Shows loading message if data is being fetched
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         Failed to fetch stock data: {error.message}
//       </div>
//     ); // Displays error message if fetching fails
//   }

//   return (
//     <div className={styles.stockListContainer}>
//       <h2 className={styles.title}>Stock List</h2>
//       <div className={styles.table}>
//         {/* Table Header */}
//         <div className={styles.headerRow}>
//           <div className={styles.column}>S/N</div>
//           <div className={styles.column}>Image</div>
//           <div className={styles.column}>Product Name</div>
//           <div className={styles.column}>Product ID</div>
//           <div className={styles.column}>Category</div>
//           <div className={styles.column}>Qty Purchased</div>
//           <div className={styles.column}>Unit Price</div>
//           <div className={styles.column}>Total Amount</div>
//           <div className={styles.column}>Supplier</div>
//           <div className={styles.column}>Status</div>
//         </div>
//         {/* Table Rows */}
//         {stockData?.products?.map((product, index) => (
//           <StockRow rowInformation={product} key={product.sn || index} />
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className={styles.pagination}>
//         <button
//           className={styles.paginationBtn}
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className={styles.pageNumber}>{`Page ${currentPage}`}</span>
//         <button
//           className={styles.paginationBtn}
//           onClick={handleNextPage}
//           disabled={stockData?.products.length < productsPerPage}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default StockList;
