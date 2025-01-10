import { useNavigate } from "react-router-dom";
import styles from "./CreateRecipe.module.css";

import pageHeadIcon from "../../assets/icons/logistic_icon.svg";
import RecipeForm from "./RecipeForm";
import { useRecipeForm } from "../../hooks/UseRecipeForm";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";

const DeliveryCreator = () => {
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
    addIngredient,
    removeIngredient,
    updateIngredient,
    formatPrice,
    getTotalPrice,
  } = useRecipeForm();

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
    navigate("/Delivery-list");
  };

  return (
    <div className={styles.addRecipeContainer}>
      <PageHead
        title="Create a Delivery"
        description="Create a usable Delivery"
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
      />
    </div>
  );
};
export default DeliveryCreator;
