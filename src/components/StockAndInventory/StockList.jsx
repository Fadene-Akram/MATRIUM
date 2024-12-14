import { useState, useEffect } from "react";
import styles from "./StockList.module.css";
import StockRow from "./StockRow";

function StockList() {
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await import("../../data/Dummy_Product.json");
        setStockData(response.default);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch stock data");
        setIsLoading(false);
        console.error("Error fetching stock data:", err);
      }
    };

    fetchStockData();
  }, []);

  // Calculate the index of the first and last product to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = stockData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination: go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Pagination: go to the next page
  const handleNextPage = () => {
    if (currentPage * productsPerPage < stockData.length)
      setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
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
          {/* <div className={styles.column}>In Stock</div> */}
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

// import { useQuery } from "@tanstack/react-query";
// import styles from "./StockList.module.css";
// import StockRow from "./StockRow";
// import { useState } from "react";

// // Function to fetch the stock data from the backend
// const fetchStockData = async () => {
//   const response = await fetch("/api/product/getProduct.php"); // Adjust the endpoint to your backend
//   if (!response.ok) {
//     throw new Error("Failed to fetch stock data");
//   }
//   return response.json();
// };

// function StockList() {
//   // Fetching stock data with React Query
//   const {
//     data: stockData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["stockData"],
//     queryFn: fetchStockData,
//   });

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6;

//   // Calculate the index of the first and last product to display
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts =
//     stockData?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

//   // Pagination: go to the previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // Pagination: go to the next page
//   const handleNextPage = () => {
//     if (currentPage * productsPerPage < stockData?.length)
//       setCurrentPage(currentPage + 1);
//   };

//   if (isLoading) {
//     return <div className={styles.loadingContainer}>Loading...</div>;
//   }

//   if (error) {
//     return <div className={styles.errorContainer}>{error.message}</div>;
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
//         {/* Table Rows (based on pagination) */}
//         {currentProducts.map((product, index) => (
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
//           disabled={currentPage * productsPerPage >= stockData?.length}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default StockList;

// import { useQuery } from "@tanstack/react-query";
// import styles from "./StockList.module.css";
// import StockRow from "./StockRow";
// import { useState } from "react";

// // Function to fetch the stock data from the backend
// const fetchStockData = async () => {
//   const response = await fetch("/api/algeriepost/api/product/hello.php");

//   if (!response.ok) {
//     throw new Error("Failed to fetch stock data: " + response.statusText);
//   }

//   const contentType = response.headers.get("content-type");
//   if (contentType && contentType.includes("application/json")) {
//     return response.json();
//   } else {
//     throw new Error("Expected JSON, but got: " + contentType);
//   }
// };

// function StockList() {
//   // Fetching stock data with React Query
//   const {
//     data: stockData,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["stockData"],
//     queryFn: fetchStockData,
//   });

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6;

//   // Calculate the index of the first and last product to display
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts =
//     stockData?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

//   // Pagination: go to the previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // Pagination: go to the next page
//   const handleNextPage = () => {
//     if (currentPage * productsPerPage < stockData?.length)
//       setCurrentPage(currentPage + 1);
//   };

//   if (isLoading) {
//     return <div className={styles.loadingContainer}>Loading...</div>;
//   }

//   if (error) {
//     return <div className={styles.errorContainer}>{error.message}</div>;
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
//         {/* Table Rows (based on pagination) */}
//         {currentProducts.map((product, index) => (
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
//           disabled={currentPage * productsPerPage >= stockData?.length}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default StockList;
