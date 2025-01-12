// /**
//  * @file RecipeTable.jsx
//  * @description This component renders a paginated table of recipes, allowing users to view, delete, edit, and use recipes.
//  * It also includes a modal to display recipe details.
//  */

// import { useState, useEffect } from "react";
// import RecipeListRow from "./RecipeListRow";
// import RecipeDetailsModal from "./RecipeDetailsModal"; // Import the modal component
// import styles from "./RecipeTable.module.css";
// import { useNavigate } from "react-router-dom";

// /**
//  * RecipeTable Component
//  * @component
//  * @description This component provides a table for displaying recipes, with functionality for pagination, modal viewing, and navigation to recipe-related actions.
//  */

// function RecipeTable() {
//   // State for managing recipe data
//   const [recipeListData, setrecipeListData] = useState([]); // Stores the list of recipes
//   const [isLoading, setIsLoading] = useState(true); // Tracks loading state
//   const [error, setError] = useState(null); // Tracks errors

//   // Modal-related state
//   const [isModalOpen, setIsModalOpen] = useState(false); // Tracks modal visibility
//   const [selectedRecipe, setSelectedRecipe] = useState(null); // Stores the currently selected recipe

//   // Pagination-related state
//   const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
//   const recipiesPerPage = 6; // Number of recipes displayed per page

//   const navigate = useNavigate(); // Initialize navigation functionality

//   /**
//    * Fetches recipe data from a local JSON file.
//    * @function fetchStockData
//    * @async
//    */
//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const response = await import("../../data/recipiesList.json");
//         setrecipeListData(response.default);
//         setIsLoading(false);
//       } catch (err) {
//         setError("Failed to fetch recipes data");
//         setIsLoading(false);
//         console.error("Error fetching recipes data:", err);
//       }
//     };

//     fetchStockData();
//   }, []);

//   /**
//    * Deletes a recipe from the list.
//    * @function deleteRecipe
//    * @param {number} id - The ID of the recipe to delete.
//    * @param {Event} event - The triggering event.
//    */
//   function deleteRecipe(id, event) {
//     event.stopPropagation();
//     setrecipeListData((prevData) =>
//       prevData.filter((recipe) => recipe.id !== id)
//     );
//   }

//   /**
//    * Views the details of a recipe.
//    * @function viewDetailsRecipe
//    * @param {number} id - The ID of the recipe to view.
//    * @param {Event} event - The triggering event.
//    */
//   function viewDetailsRecipe(id, event) {
//     event.stopPropagation();
//     const recipe = recipeListData.find((recipe) => recipe.id === id);
//     if (recipe) {
//       setSelectedRecipe(recipe);
//       setIsModalOpen(true);
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   /**
//    * Edits a recipe by navigating to the edit page.
//    * @function editRecipe
//    * @param {number} id - The ID of the recipe to edit.
//    * @param {Event} event - The triggering event.
//    */
//   function editRecipe(id, event) {
//     event.stopPropagation();
//     const recipe = recipeListData.find((recipe) => recipe.id === id);
//     if (recipe) {
//       navigate(`/recipe-list/edit-recipe/${id}`, { state: { recipe } });
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   /**
//    * Closes the recipe details modal.
//    * @function closeModal
//    */
//   function closeModal() {
//     setIsModalOpen(false);
//     setSelectedRecipe(null);
//   }

//   /**
//    * Navigates to the "use recipe" page.
//    * @function toUseRecipe
//    * @param {number} id - The ID of the recipe to use.
//    */
//   function toUseRecipe(id) {
//     const recipe = recipeListData.find((recipe) => recipe.id === id);
//     if (recipe) {
//       navigate(`/recipe-list/use-recipe/${id}`, { state: { recipe } });
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   // Calculate pagination indices
//   const indexOfLastProduct = currentPage * recipiesPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - recipiesPerPage;
//   const currentProducts = recipeListData.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   /**
//    * Handles pagination to the previous page.
//    * @function handlePreviousPage
//    */
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   /**
//    * Handles pagination to the next page.
//    * @function handleNextPage
//    */
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

//       {/* Recipe Table Header */}
//       <div className={styles.table}>
//         <div className={styles.headerRow}>
//           <div className={styles.column}>Id</div>
//           <div className={styles.column}>Recipe Name</div>
//           <div className={styles.column}>Product Name</div>
//           <div className={styles.column}>Type</div>
//           <div className={styles.column}>Date</div>
//           <div className={styles.column}>Total Price</div>
//           <div className={styles.column}>Actions</div>
//         </div>

//         {/* Recipe Table Rows */}
//         {currentProducts.map((recipe, index) => (
//           <RecipeListRow
//             key={index}
//             rowInformation={recipe}
//             onDeleteAction={(e) => deleteRecipe(recipe.id, e)}
//             onViewDetailsAction={(e) => viewDetailsRecipe(recipe.id, e)}
//             onEditAction={(e) => editRecipe(recipe.id, e)}
//             onUseRecipe={() => toUseRecipe(recipe.id)}
//             isEditable={recipe.type === "variable"}
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

// import { useState } from "react";
// import RecipeListRow from "./RecipeListRow";
// import RecipeDetailsModal from "./RecipeDetailsModal";
// import styles from "./RecipeTable.module.css";
// import { useNavigate } from "react-router-dom";
// import { fetchRecipes } from "../../api/Api";
// import { useQuery } from "@tanstack/react-query";

// function RecipeTable() {
//   const navigate = useNavigate(); // Initialize navigation functionality

//   // Modal-related state
//   const [isModalOpen, setIsModalOpen] = useState(false); // Tracks modal visibility
//   const [selectedRecipe, setSelectedRecipe] = useState(null); // Stores the currently selected recipe

//   // Pagination-related state
//   const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
//   const recipesPerPage = 6; // Number of recipes displayed per page

//   // React Query hook for fetching recipe data
//   const {
//     data: recipeListData,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["recipes"],
//     queryFn: fetchRecipes,
//   });

//   console.log("Recipe List Data:", recipeListData);
//   /**
//    * Deletes a recipe from the list.
//    */
//   function deleteRecipe(id, event) {
//     event.stopPropagation();
//     console.log(`Delete recipe with ID: ${id}`);
//   }

//   /**
//    * Views the details of a recipe.
//    */
//   function viewDetailsRecipe(id, event) {
//     event.stopPropagation();
//     const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
//     if (recipe) {
//       setSelectedRecipe(recipe);
//       setIsModalOpen(true);
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   /**
//    * Edits a recipe by navigating to the edit page.
//    */
//   function editRecipe(id, event) {
//     event.stopPropagation();
//     const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
//     if (recipe) {
//       navigate(`/recipe-list/edit-recipe/${id}`, { state: { recipe } });
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   /**
//    * Closes the recipe details modal.
//    */
//   function closeModal() {
//     setIsModalOpen(false);
//     setSelectedRecipe(null);
//   }

//   /**
//    * Navigates to the "use recipe" page.
//    */
//   function toUseRecipe(id) {
//     const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
//     if (recipe) {
//       navigate(`/recipe-list/use-recipe/${id}`, { state: { recipe } });
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   // Calculate pagination indices
//   const indexOfLastProduct = currentPage * recipesPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - recipesPerPage;
//   const currentProducts =
//     recipeListData?.data?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

//   /**
//    * Handles pagination to the previous page.
//    */
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   /**
//    * Handles pagination to the next page.
//    */
//   const handleNextPage = () => {
//     if (currentPage * recipesPerPage < (recipeListData?.length || 0))
//       setCurrentPage(currentPage + 1);
//   };

//   if (isLoading) {
//     return <div className={styles.loadingContainer}>Loading...</div>;
//   }

//   if (error) {
//     return <div className={styles.errorContainer}>{error.message}</div>;
//   }

//   return (
//     <div className={styles.recipeListContainer}>
//       <h2 className={styles.title}>Recipe List</h2>

//       {/* Recipe Table Header */}
//       <div className={styles.table}>
//         <div className={styles.headerRow}>
//           <div className={styles.column}>Id</div>
//           <div className={styles.column}>Recipe Name</div>
//           <div className={styles.column}>Product Name</div>
//           <div className={styles.column}>Type</div>
//           <div className={styles.column}>Date</div>
//           <div className={styles.column}>Total Price</div>
//           <div className={styles.column}>Actions</div>
//         </div>

//         {/* Recipe Table Rows */}
//         {currentProducts.map((recipe, index) => (
//           <RecipeListRow
//             key={index}
//             rowInformation={recipe}
//             onDeleteAction={(e) => deleteRecipe(recipe.id, e)}
//             onViewDetailsAction={(e) => viewDetailsRecipe(recipe.id, e)}
//             onEditAction={(e) => editRecipe(recipe.id, e)}
//             onUseRecipe={() => toUseRecipe(recipe.id)}
//             isEditable={recipe.type === "variable"}
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
//           disabled={
//             currentPage * recipesPerPage >= (recipeListData?.length || 0)
//           }
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

// import { useState } from "react";
// import RecipeListRow from "./RecipeListRow";
// import RecipeDetailsModal from "./RecipeDetailsModal";
// import styles from "./RecipeTable.module.css";
// import { useNavigate } from "react-router-dom";
// import { fetchRecipes } from "../../api/Api";
// import { useQuery } from "@tanstack/react-query";
// import DeleteModal from "./DeleteModal";

// function RecipeTable() {
//   const navigate = useNavigate();

//   // Modal-related state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [recipeToDelete, setRecipeToDelete] = useState(null);

//   // Pagination-related state
//   const [currentPage, setCurrentPage] = useState(1);
//   const recipesPerPage = 6;

//   // React Query hook for fetching recipe data
//   const {
//     data: recipeListData,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["recipes"],
//     queryFn: fetchRecipes,
//   });

//   console.log("Recipe List Data:", recipeListData);

//   // Function to delete the recipe
//   function deleteRecipe(id) {
//     console.log(`Delete recipe with ID: ${id}`);
//     // Proceed with actual deletion logic here, like API call.
//     setIsDeleteModalOpen(false); // Close the delete confirmation modal
//     setRecipeToDelete(null); // Clear the recipe to delete
//   }

//   // Opens the delete confirmation modal
//   function openDeleteModal(recipe, event) {
//     event.stopPropagation();
//     setRecipeToDelete(recipe);
//     setIsDeleteModalOpen(true);
//   }

//   // Cancels the delete operation
//   function cancelDelete() {
//     setIsDeleteModalOpen(false);
//     setRecipeToDelete(null);
//   }

//   // View details of a recipe
//   function viewDetailsRecipe(id, event) {
//     event.stopPropagation();
//     const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
//     if (recipe) {
//       setSelectedRecipe(recipe);
//       setIsModalOpen(true);
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   // Edit a recipe by navigating to the edit page
//   function editRecipe(id, event) {
//     event.stopPropagation();
//     const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
//     if (recipe) {
//       navigate(`/recipe-list/edit-recipe/${id}`, { state: { recipe } });
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   // Close the recipe details modal
//   function closeModal() {
//     setIsModalOpen(false);
//     setSelectedRecipe(null);
//   }

//   // Navigate to the "use recipe" page
//   function toUseRecipe(id) {
//     const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
//     if (recipe) {
//       navigate(`/recipe-list/use-recipe/${id}`, { state: { recipe } });
//     } else {
//       console.error("Recipe not found");
//     }
//   }

//   // Calculate pagination indices
//   const indexOfLastProduct = currentPage * recipesPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - recipesPerPage;
//   const currentProducts =
//     recipeListData?.data?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

//   // Handle pagination to the previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // Handle pagination to the next page
//   const handleNextPage = () => {
//     if (currentPage * recipesPerPage < (recipeListData?.length || 0))
//       setCurrentPage(currentPage + 1);
//   };

//   if (isLoading) {
//     return <div className={styles.loadingContainer}>Loading...</div>;
//   }

//   if (error) {
//     return <div className={styles.errorContainer}>{error.message}</div>;
//   }

//   return (
//     <div className={styles.recipeListContainer}>
//       <h2 className={styles.title}>Recipe List</h2>

//       {/* Recipe Table Header */}
//       <div className={styles.table}>
//         <div className={styles.headerRow}>
//           <div className={styles.column}>Id</div>
//           <div className={styles.column}>Recipe Name</div>
//           <div className={styles.column}>Product Name</div>
//           <div className={styles.column}>Type</div>
//           <div className={styles.column}>Date</div>
//           <div className={styles.column}>Total Price</div>
//           <div className={styles.column}>Actions</div>
//         </div>

//         {/* Recipe Table Rows */}
//         {currentProducts.map((recipe, index) => (
//           <RecipeListRow
//             key={index}
//             rowInformation={recipe}
//             onDeleteAction={(e) => openDeleteModal(recipe, e)} // Open delete modal on delete click
//             onViewDetailsAction={(e) => viewDetailsRecipe(recipe.id, e)}
//             onEditAction={(e) => editRecipe(recipe.id, e)}
//             onUseRecipe={() => toUseRecipe(recipe.id)}
//             isEditable={recipe.type === "variable"}
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
//           disabled={
//             currentPage * recipesPerPage >= (recipeListData?.length || 0)
//           }
//         >
//           Next
//         </button>
//       </div>

//       {/* Recipe Details Modal */}
//       {isModalOpen && selectedRecipe && (
//         <RecipeDetailsModal recipe={selectedRecipe} onClose={closeModal} />
//       )}

//       {/* Delete Confirmation Modal */}
//       <DeleteModal
//         isOpen={isDeleteModalOpen}
//         recipeToDelete={recipeToDelete}
//         onDelete={deleteRecipe}
//         onCancel={cancelDelete}
//       />
//     </div>
//   );
// }

// export default RecipeTable;

import { useState } from "react";
import RecipeListRow from "./RecipeListRow";
import RecipeDetailsModal from "./RecipeDetailsModal";
import styles from "./RecipeTable.module.css";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../../api/Api";
import { useQuery } from "@tanstack/react-query";
import DeleteModal from "./DeleteModal";
import { deleteRecipe as deleteRecipeAPI } from "../../api/Api";

function RecipeTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  const {
    data: recipeListData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  async function deleteRecipe(id) {
    try {
      console.log(`Delete recipe with ID: ${id}`);
      await deleteRecipeAPI(id);
      setIsDeleteModalOpen(false);
      setRecipeToDelete(null);
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  }

  function openDeleteModal(recipe, event) {
    event.stopPropagation();
    setRecipeToDelete(recipe);
    setIsDeleteModalOpen(true);
  }

  function cancelDelete() {
    setIsDeleteModalOpen(false);
    setRecipeToDelete(null);
  }

  function viewDetailsRecipe(id, event) {
    event.stopPropagation();
    const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
    if (recipe) {
      setSelectedRecipe(recipe);
      setIsModalOpen(true);
    } else {
      console.error("Recipe not found");
    }
  }

  function editRecipe(id, event) {
    event.stopPropagation();
    const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
    console.log(recipe);
    if (recipe) {
      navigate(`/recipe-list/edit-recipe/${id}`, { state: { recipe } });
    } else {
      console.error("Recipe not found");
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  }

  function toUseRecipe(id) {
    const recipe = recipeListData?.data?.find((recipe) => recipe.id === id);
    if (recipe) {
      navigate(`/recipe-list/use-recipe/${id}`, { state: { recipe } });
    } else {
      console.error("Recipe not found");
    }
  }

  // Updated pagination logic
  const indexOfLastProduct = currentPage * recipesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - recipesPerPage;
  const currentProducts =
    recipeListData?.data?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalRecipes = recipeListData?.data?.length || 0;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage * recipesPerPage < totalRecipes) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error.message}</div>;
  }

  return (
    <div className={styles.recipeListContainer}>
      <h2 className={styles.title}>Recipe List</h2>

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

        {currentProducts.map((recipe, index) => (
          <RecipeListRow
            key={index}
            rowInformation={recipe}
            onDeleteAction={(e) => openDeleteModal(recipe, e)}
            onViewDetailsAction={(e) => viewDetailsRecipe(recipe.id, e)}
            onEditAction={(e) => editRecipe(recipe.id, e)}
            onUseRecipe={() => toUseRecipe(recipe.id)}
            isEditable={recipe.type === "variable"}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.paginationBtn}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span
          className={styles.pageNumber}
        >{`Page ${currentPage} of ${Math.ceil(
          totalRecipes / recipesPerPage
        )}`}</span>
        <button
          className={styles.paginationBtn}
          onClick={handleNextPage}
          disabled={currentPage * recipesPerPage >= totalRecipes}
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedRecipe && (
        <RecipeDetailsModal recipe={selectedRecipe} onClose={closeModal} />
      )}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        recipeToDelete={recipeToDelete}
        onDelete={deleteRecipe}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default RecipeTable;
