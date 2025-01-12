import { useNavigate } from "react-router-dom";
import styles from "./CreateRecipe.module.css";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";
import pageHeadIcon from "../../assets/icons/procurements_icon.svg";
import RecipeForm from "../../components/CreateEditRecipe/RecipeForm";
import { useRecipeForm } from "../../hooks/UseRecipeForm";
import { addRecipe } from "../../api/Api";

/**
 * CreateRecipe component for creating a new recipe.
 * It handles the creation of a recipe and its submission to be added to the recipe list.
 *
 * @component
 * @example
 * return <CreateRecipe />;
 */
const CreateRecipe = () => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    stockItems = [],
    recipeType,
    setRecipeType,
    recipeName,
    setRecipeName,
    productName,
    setProductName,
    creationDate,
    setCreationDate,
    ingredients,
    category,
    setCategory,
    addIngredient,
    removeIngredient,
    updateIngredient,
    formatPrice,
    getTotalPrice,
  } = useRecipeForm();

  /**
   * Handle the form submission when creating a recipe.
   * Validates the creation date and prepares the new recipe data to be submitted.
   *
   * @param {Object} e - The event object
   */

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // Add safety check before rendering
  if (!Array.isArray(stockItems)) {
    return <div>Loading stock items...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!creationDate) {
      alert("Please select a date of creation.");
      return;
    }

    const recipeData = {
      name: recipeName,
      productName,
      type: recipeType,
      dateCreated: creationDate,
      ingredients,
      // totalPrice: getTotalPrice(),
      // category: category,
    };

    try {
      console.log("Recipe data:", recipeData);
      await addRecipe(recipeData);
      // Show success message
      alert("Recipe added successfully!");
      // Navigate to recipe list
      navigate("/recipe-list");
    } catch (error) {
      // Show error message
      alert(error.message);
    }
  };

  return (
    <div className={styles.addRecipeContainer}>
      <PageHead
        title="Create a Recipe"
        description="Create a usable Recipe"
        icon={pageHeadIcon}
      />
      <RecipeForm
        recipeType={recipeType}
        setRecipeType={setRecipeType}
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        productName={productName}
        setProductName={setProductName}
        creationDate={creationDate}
        setCreationDate={setCreationDate}
        ingredients={ingredients}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        updateIngredient={updateIngredient}
        stockItems={stockItems}
        formatPrice={formatPrice}
        getTotalPrice={getTotalPrice}
        onSubmit={handleSubmit}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};

export default CreateRecipe;
