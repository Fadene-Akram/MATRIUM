import { useState, useEffect } from "react";
import DeliveryListRow from "./DeliveryListRow";
import DeliveryDetailsModal from "./DeliveryDetailsModal"; // Import the modal component
import styles from "./DeliveryTable.module.css";
import { useNavigate } from "react-router-dom";



function DeliveryTable() {
  const [DeliveryListData, setDeliveryListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recipiesPerPage = 6;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await import("../../data/DeliveriesList.json");
        setDeliveryListData(response.default);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch Delivery data");
        setIsLoading(false);
        console.error("Error fetching Delivery data:", err);
      }
    };

    fetchStockData();
  }, []);

  function deleteRecipe(id,event) {
    event.stopPropagation();
    setDeliveryListData((prevData) =>
      prevData.filter((recipe) => recipe.orderId !== id)
    );
  }

  function viewDetailsDelivery(id,event) {
    event.stopPropagation();
    const recipe = DeliveryListData.find((recipe) => recipe.orderId === id);
    if (recipe) {
      setSelectedRecipe(recipe); // Set the selected recipe for modal
      setIsModalOpen(true); // Open the modal
    } else {
      console.error("Delivery not found");
    }
  }


/*   function viewDetailsDeliveryPage(id) {
    const recipe = DeliveryListData.find((recipe) => recipe.orderId === id);
  
    if (recipe) {
      navigate("/view-delivery", { state: { recipe } }); // Pass recipe as state
     
    } else {
      console.error("Delivery not found");
    }
  } */
  


  // Close the modal
  function closeModal() {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  }

  // Calculate the index of the first and last product to display
  const indexOfLastProduct = currentPage * recipiesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - recipiesPerPage;
  const currentProducts = DeliveryListData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination: go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Pagination: go to the next page
  const handleNextPage = () => {
    if (currentPage * recipiesPerPage < DeliveryListData.length)
      setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  return (
    <div className={styles.recipeListContainer}>
      <h2 className={styles.title}>Delivery List</h2>
      <div className={styles.table}>
        {/* Table Header */}
        <div className={styles.headerRow}>
          <div className={styles.column}>Id</div>
          <div className={styles.column}>Customer Name</div>
          <div className={styles.column}>Delivery Address</div>
          <div className={styles.column}>Delivery Date</div>
          <div className={styles.column}>Delivery Type</div>
          <div className={styles.column}>status</div>
          <div className={styles.column}>Actions</div>
        </div>
        {/* Table Rows (based on pagination) */}
        {currentProducts.map((recipe, index) => (
          <DeliveryListRow
            rowInformation={recipe}
            onDeleteAction={(e) => deleteRecipe(recipe.orderId,e)}
            onViewDetailsAction={(e) => viewDetailsDelivery(recipe.orderId,e)}
           /*  onViewDeliveryAction={() => viewDetailsDeliveryPage(recipe.orderId)} */
            key={index}
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
          disabled={currentPage * recipiesPerPage >= DeliveryListData.length}
        >
          Next
        </button>
      </div>

      {/* Recipe Details Modal */}
      {isModalOpen && selectedRecipe && (
        <DeliveryDetailsModal recipe={selectedRecipe} onClose={closeModal} />
      )}
    </div>
  );
}

export default DeliveryTable;

