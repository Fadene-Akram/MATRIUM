import { useState, useEffect } from "react";
import RecipeListRow from "./RecipeListRow";
import RecipeDetailsModal from "./RecipeDetailsModal"; // Import the modal component
import styles from "./RecipeTable.module.css";
import { useNavigate } from "react-router-dom";

// function RecipeTable() {
//   const [recipeListData, setrecipeListData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const recipiesPerPage = 6;

//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const response = await import("../../data/recipiesList.json");
//         setrecipeListData(response.default);
//         setIsLoading(false);
//       } catch (err) {
//         setError("Failed to fetch recipies data");
//         setIsLoading(false);
//         console.error("Error fetching recipies data:", err);
//       }
//     };

//     fetchStockData();
//   }, []);

//   function deleteRecipe(id) {
//     setrecipeListData((prevData) =>
//       prevData.filter((recipe) => recipe.id !== id)
//     );
//   }

//   function viewDetailsRecipe(id) {
//     const recipe = recipeListData.find((recipe) => recipe.id === id);
//     if (recipe) {
//       setSelectedRecipe(recipe); // Set the selected recipe for modal
//       setIsModalOpen(true); // Open the modal
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   // Close the modal
//   function closeModal() {
//     setIsModalOpen(false);
//     setSelectedRecipe(null);
//   }

//   // Calculate the index of the first and last product to display
//   const indexOfLastProduct = currentPage * recipiesPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - recipiesPerPage;
//   const currentProducts = recipeListData.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   // Pagination: go to the previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // Pagination: go to the next page
//   const handleNextPage = () => {
//     if (currentPage * recipiesPerPage < recipeListData.length)
//       setCurrentPage(currentPage + 1);
//   };

//   if (isLoading) {
//     return <div className={styles.loadingContainer}>Loading...</div>;
//   }

//   if (error) {
//     return <div className={styles.errorContainer}>{error}</div>;
//   }

//   return (
//     <div className={styles.recipeListContainer}>
//       <h2 className={styles.title}>Recipe List</h2>
//       <div className={styles.table}>
//         {/* Table Header */}
//         <div className={styles.headerRow}>
//           <div className={styles.column}>id</div>
//           <div className={styles.column}>Recipe Name</div>
//           <div className={styles.column}>Type</div>
//           <div className={styles.column}>Date</div>
//           <div className={styles.column}>Total Price</div>
//           <div className={styles.column}>Actions</div>
//         </div>
//         {/* Table Rows (based on pagination) */}
//         {currentProducts.map((recipe, index) => (
//           <RecipeListRow
//             rowInformation={recipe}
//             onDeleteAction={() => deleteRecipe(recipe.id)}
//             onViewDetailsAction={() => viewDetailsRecipe(recipe.id)}
//             key={index}
//           />
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
//           disabled={currentPage * recipiesPerPage >= recipeListData.length}
//         >
//           Next
//         </button>
//       </div>

//       {/* Recipe Details Modal */}
//       {isModalOpen && selectedRecipe && (
//         <RecipeDetailsModal recipe={selectedRecipe} onClose={closeModal} />
//       )}
//     </div>
//   );
// }

// export default RecipeTable;

function RecipeTable() {
  const [recipeListData, setrecipeListData] = useState([]);
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
        const response = await import("../../data/recipiesList.json");
        setrecipeListData(response.default);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch recipies data");
        setIsLoading(false);
        console.error("Error fetching recipies data:", err);
      }
    };

    fetchStockData();
  }, []);

  function deleteRecipe(id) {
    setrecipeListData((prevData) =>
      prevData.filter((recipe) => recipe.id !== id)
    );
  }

  function viewDetailsRecipe(id) {
    const recipe = recipeListData.find((recipe) => recipe.id === id);
    if (recipe) {
      setSelectedRecipe(recipe); // Set the selected recipe for modal
      setIsModalOpen(true); // Open the modal
    } else {
      console.error("Recipe not found");
    }
  }

  function editRecipe(id) {
    const recipe = recipeListData.find((recipe) => recipe.id === id);
    if (recipe) {
      // Navigate to RecipeCreator with recipe data
      navigate(`/edit-recipe/${id}`, { state: { recipe } });
    } else {
      console.error("Recipe not found");
    }
  }

  // Close the modal
  function closeModal() {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  }

  // Calculate the index of the first and last product to display
  const indexOfLastProduct = currentPage * recipiesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - recipiesPerPage;
  const currentProducts = recipeListData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination: go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Pagination: go to the next page
  const handleNextPage = () => {
    if (currentPage * recipiesPerPage < recipeListData.length)
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
      <h2 className={styles.title}>Recipe List</h2>
      <div className={styles.table}>
        {/* Table Header */}
        <div className={styles.headerRow}>
          <div className={styles.column}>Id</div>
          <div className={styles.column}>Recipe Name</div>
          <div className={styles.column}>product Name</div>
          <div className={styles.column}>Type</div>
          <div className={styles.column}>Date</div>
          <div className={styles.column}>Total Price</div>
          <div className={styles.column}>Actions</div>
        </div>
        {/* Table Rows (based on pagination) */}
        {currentProducts.map((recipe, index) => (
          <RecipeListRow
            rowInformation={recipe}
            onDeleteAction={() => deleteRecipe(recipe.id)}
            onViewDetailsAction={() => viewDetailsRecipe(recipe.id)}
            onEditAction={() => editRecipe(recipe.id)} // Add edit action
            key={index}
            isEditable={recipe.type === "variable"} // Pass editable state based on type
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
          disabled={currentPage * recipiesPerPage >= recipeListData.length}
        >
          Next
        </button>
      </div>

      {/* Recipe Details Modal */}
      {isModalOpen && selectedRecipe && (
        <RecipeDetailsModal recipe={selectedRecipe} onClose={closeModal} />
      )}
    </div>
  );
}

export default RecipeTable;
