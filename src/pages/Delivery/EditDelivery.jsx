import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CreateRecipe.module.css";
// import PageHead from "../../components/ReusedComponent/PageHead";
import pageHeadIcon from "../../assets/icons/procurements_icon.svg";
import RecipeForm from "./RecipeForm";
import { useRecipeForm } from "../../hooks/UseRecipeForm";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";

const EditDelivery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipeToEdit = location.state?.recipe;
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
  } = useRecipeForm(recipeToEdit);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!creationDate) {
      alert("Please select a date of creation.");
      return;
    }

    const recipeData = {
      id: recipeToEdit?.id,
      name: recipeName,
      productName,
      type: recipeType,
      date: creationDate,
      ingredients,
      totalPrice: getTotalPrice(),
    };

    console.log("Updating Recipe:", recipeData);
    navigate("/recipe-list");
  };

  return (
    <div className={styles.addRecipeContainer}>
      <PageHead
        title="Edit Delivery"
        description="Modify existing recipe"
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

export default EditDelivery;
