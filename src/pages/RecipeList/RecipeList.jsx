import styles from "./RecipeList.module.css";
import PageHead from "../../components/ReusedComponent/PageHead";
import RecipeTable from "../../components/RecipeList/RecipeTable";
import { useNavigate } from "react-router-dom";

const RecipesList = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleNavigate = () => {
    navigate("/add-recipe"); // Navigate to UpdateStock route
  };
  return (
    <div className={styles.recipeListContainer}>
      <PageHead
        title="Recipes"
        description="View and manage your recipes"
        icon="src/assets/icons/payroll_icon.svg"
      />

      <div className={styles.updateStockContainer}>
        <p>Create a recipe</p>
        <button onClick={handleNavigate}>Add Recipe to the list</button>
      </div>

      <RecipeTable />
    </div>
  );
};

export default RecipesList;
