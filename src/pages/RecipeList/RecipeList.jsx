/**
 * @file RecipeList.jsx
 * @description This component renders a page that displays a list of recipes and provides functionality to add new recipes.
 * It includes a page header, a table to display recipes, and a button for navigation to the recipe creation page.
 */

import styles from "./RecipeList.module.css";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";
import RecipeTable from "../../components/RecipeList/RecipeTable";
import { useNavigate } from "react-router-dom";

/**
 * RecipesList Component
 * @component
 * @description This component provides an interface for viewing, managing, and adding recipes.
 * It includes a page header, a table to display recipes, and a navigation button to add new recipes.
 */
const RecipesList = () => {
  const navigate = useNavigate(); // Initialize navigation functionality

  /**
   * Handles navigation to the recipe creation page.
   * @function handleNavigate
   */
  const handleNavigate = () => {
    navigate("/recipe-list/add-recipe"); // Navigate to the "Add Recipe" route
  };

  return (
    <div className={styles.recipeListContainer}>
      {/* Render the page header with a title, description, and icon */}
      <PageHead
        title="Recipes"
        description="View and manage your recipes"
        icon="src/assets/icons/payroll_icon.svg"
      />

      <div className={styles.updateStockContainer}>
        {/* Render a button to navigate to the recipe creation page */}
        <p>Create a recipe</p>
        <button onClick={handleNavigate}>Add Recipe to the list</button>
      </div>

      {/* Render the recipe table */}
      <RecipeTable />
    </div>
  );
};

export default RecipesList;
