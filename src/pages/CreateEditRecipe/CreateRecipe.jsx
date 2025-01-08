import { useNavigate } from "react-router-dom";
import styles from "./CreateRecipe.module.css";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";
import pageHeadIcon from "../../assets/icons/procurements_icon.svg";
import RecipeForm from "../../components/CreateEditRecipe/RecipeForm";
import { useRecipeForm } from "../../hooks/UseRecipeForm";

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
    stockItems,
    recipeType,
    setRecipeType,
    recipeName,
    setRecipeName,
    productName,
    setProductName,
    creationDate,
    setCreationDate,
    ingredients,
    Category, // Category for the recipe
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!creationDate) {
      alert("Please select a date of creation.");
      return;
    }

    const recipeData = {
      name: recipeName,
      productName,
      type: recipeType,
      date: creationDate,
      ingredients,
      totalPrice: getTotalPrice(),
    };

    console.log("Creating Recipe:", recipeData);
    navigate("/recipe-list");
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
        setCategory={Category} // Pass Category to RecipeForm
      />
    </div>
  );
};

export default CreateRecipe;
