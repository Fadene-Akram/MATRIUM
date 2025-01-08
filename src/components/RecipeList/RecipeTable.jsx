/**
 * @file RecipeTable.jsx
 * @description This component renders a paginated table of recipes, allowing users to view, delete, edit, and use recipes.
 * It also includes a modal to display recipe details.
 */

import { useState, useEffect } from "react";
import RecipeListRow from "./RecipeListRow";
import RecipeDetailsModal from "./RecipeDetailsModal"; // Import the modal component
import styles from "./RecipeTable.module.css";
import { useNavigate } from "react-router-dom";

/**
 * RecipeTable Component
 * @component
 * @description This component provides a table for displaying recipes, with functionality for pagination, modal viewing, and navigation to recipe-related actions.
 */

function RecipeTable() {
  // State for managing recipe data
  const [recipeListData, setrecipeListData] = useState([]); // Stores the list of recipes
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks errors

  // Modal-related state
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks modal visibility
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Stores the currently selected recipe

  // Pagination-related state
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const recipiesPerPage = 6; // Number of recipes displayed per page

  const navigate = useNavigate(); // Initialize navigation functionality

  /**
   * Fetches recipe data from a local JSON file.
   * @function fetchStockData
   * @async
   */
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await import("../../data/recipiesList.json");
        setrecipeListData(response.default);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch recipes data");
        setIsLoading(false);
        console.error("Error fetching recipes data:", err);
      }
    };

    fetchStockData();
  }, []);

  /**
   * Deletes a recipe from the list.
   * @function deleteRecipe
   * @param {number} id - The ID of the recipe to delete.
   * @param {Event} event - The triggering event.
   */
  function deleteRecipe(id, event) {
    event.stopPropagation();
    setrecipeListData((prevData) =>
      prevData.filter((recipe) => recipe.id !== id)
    );
  }

  /**
   * Views the details of a recipe.
   * @function viewDetailsRecipe
   * @param {number} id - The ID of the recipe to view.
   * @param {Event} event - The triggering event.
   */
  function viewDetailsRecipe(id, event) {
    event.stopPropagation();
    const recipe = recipeListData.find((recipe) => recipe.id === id);
    if (recipe) {
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
    } else {
      console.error("Recipe not found");
    }
  }

  /**
   * Edits a recipe by navigating to the edit page.
   * @function editRecipe
   * @param {number} id - The ID of the recipe to edit.
   * @param {Event} event - The triggering event.
   */
  function editRecipe(id, event) {
    event.stopPropagation();
    const recipe = recipeListData.find((recipe) => recipe.id === id);
    if (recipe) {
      navigate(`/edit-recipe/${id}`, { state: { recipe } });
    } else {
      console.error("Recipe not found");
    }
  }

  /**
   * Closes the recipe details modal.
   * @function closeModal
   */
  function closeModal() {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  }

  /**
   * Navigates to the "use recipe" page.
   * @function toUseRecipe
   * @param {number} id - The ID of the recipe to use.
   */
  function toUseRecipe(id) {
    const recipe = recipeListData.find((recipe) => recipe.id === id);
    if (recipe) {
      navigate(`/use-recipe/${id}`, { state: { recipe } });
    } else {
      console.error("Recipe not found");
    }
  }

  // Calculate pagination indices
  const indexOfLastProduct = currentPage * recipiesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - recipiesPerPage;
  const currentProducts = recipeListData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  /**
   * Handles pagination to the previous page.
   * @function handlePreviousPage
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  /**
   * Handles pagination to the next page.
   * @function handleNextPage
   */
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

      {/* Recipe Table Header */}
      <div className={styles.table}>
        <div className={styles.headerRow}>
          <div className={styles.column}>Id</div>
          <div className={styles.column}>Recipe Name</div>
          <div className={styles.column}>Product Name</div>
          <div className={styles.column}>Type</div>
          <div className={styles.column}>Date</div>
          <div className={styles.column}>Total Price</div>
          <div className={styles.column}>Actions</div>
        </div>

        {/* Recipe Table Rows */}
        {currentProducts.map((recipe, index) => (
          <RecipeListRow
            key={index}
            rowInformation={recipe}
            onDeleteAction={(e) => deleteRecipe(recipe.id, e)}
            onViewDetailsAction={(e) => viewDetailsRecipe(recipe.id, e)}
            onEditAction={(e) => editRecipe(recipe.id, e)}
            onUseRecipe={() => toUseRecipe(recipe.id)}
            isEditable={recipe.type === "variable"}
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
