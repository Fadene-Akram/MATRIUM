import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./StockList.module.css";
import StockRow from "./StockRow";
import { fetchProducts } from "../../api/Api";

/**
 * StockList component fetches and displays a list of products in a paginated table format.
 * It handles loading state, error handling, and pagination logic.
 *
 * @returns {JSX.Element} The rendered stock list component with pagination controls.
 */
function StockList() {
  const productsPerPage = 6; // Number of products displayed per page
  const [currentPage, setCurrentPage] = useState(1); // Current page in pagination

  // Fetch products using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    onError: (error) => {
      console.error("Error fetching products:", error.message);
    },
  });

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>; // Shows loading message if data is being fetched
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        {error.message || "Failed to fetch products"}
      </div>
    ); // Displays error message if fetching fails
  }

  const stockData = data?.items || []; // Fetched product data
  console.log("Stock Data:", stockData);

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
          <StockRow
            rowInformation={product}
            key={product.product_id || index}
          />
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
