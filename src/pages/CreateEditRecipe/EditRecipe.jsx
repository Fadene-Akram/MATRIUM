// import { useLocation, useNavigate } from "react-router-dom";
// import styles from "./CreateRecipe.module.css";
// import PageHead from "../../components/ReusedComponent/PageHead";
// import RecipeForm from "./RecipeForm";
// import { useRecipeForm } from "../../hooks/UseRecipeForm";
// import pageHeadIcon from "../../assets/icons/procurements_icon.svg";

// const EditRecipe = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const recipeToEdit = location.state?.recipe;
//   console.log("Recipe to edit:", recipeToEdit);
//   const {
//     stockItems,
//     recipeType,
//     setRecipeType,
//     recipeName,
//     setRecipeName,
//     productName,
//     setProductName,
//     creationDate,
//     setCreationDate,
//     ingredients,
//     addIngredient,
//     removeIngredient,
//     updateIngredient,
//     formatPrice,
//     getTotalPrice,
//   } = useRecipeForm(recipeToEdit);
//   //   console.log(ingredients);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!creationDate) {
//       alert("Please select a date of creation.");
//       return;
//     }

//     const recipeData = {
//       id: recipeToEdit?.id,
//       name: recipeName,
//       productName,
//       type: recipeType,
//       date: creationDate,
//       ingredients,
//       totalPrice: getTotalPrice(),
//     };

//     console.log("Updating Recipe:", recipeData);
//     navigate("/recipe-list");
//   };

//   return (
//     <div className={styles.addRecipeContainer}>
//       <PageHead
//         title="Edit Recipe"
//         description="Modify existing recipe"
//         icon={pageHeadIcon}
//       />
//       <RecipeForm
//         recipeType={recipeType}
//         setRecipeType={setRecipeType}
//         recipeName={recipeName}
//         setRecipeName={setRecipeName}
//         productName={productName}
//         setProductName={setProductName}
//         creationDate={creationDate}
//         setCreationDate={setCreationDate}
//         ingredients={ingredients}
//         addIngredient={addIngredient}
//         removeIngredient={removeIngredient}
//         updateIngredient={updateIngredient}
//         stockItems={stockItems}
//         formatPrice={formatPrice}
//         getTotalPrice={getTotalPrice}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default EditRecipe;

import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CreateRecipe.module.css";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";
import RecipeForm from "../../components/CreateEditRecipe/RecipeForm";
import { useRecipeForm } from "../../hooks/UseRecipeForm";
import pageHeadIcon from "../../assets/icons/procurements_icon.svg";

/**
 * EditRecipe component for modifying an existing recipe.
 * It handles retrieving the recipe details to be edited, and submitting the updated data.
 *
 * @component
 * @example
 * return <EditRecipe />;
 */
const EditRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipeToEdit = location.state?.recipe;

  // Destructure category and setCategory from the useRecipeForm hook
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
    category, // Category for the recipe
    setCategory, // Function to set category for the recipe
    addIngredient,
    removeIngredient,
    updateIngredient,
    formatPrice,
    getTotalPrice,
  } = useRecipeForm(recipeToEdit);

  /**
   * Handle the form submission when updating a recipe.
   * Validates the creation date and then prepares the updated recipe data
   * to be sent to the server or displayed elsewhere.
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
      id: recipeToEdit?.id,
      name: recipeName,
      productName,
      type: recipeType,
      date: creationDate,
      ingredients,
      category, // Include category in the submitted data
      totalPrice: getTotalPrice(),
    };

    console.log("Updating Recipe:", recipeData);
    navigate("/recipe-list");
  };

  return (
    <div className={styles.addRecipeContainer}>
      <PageHead
        title="Edit Recipe"
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
        category={category} // Pass category to RecipeForm
        setCategory={setCategory} // Pass setCategory to RecipeForm
      />
    </div>
  );
};

export default EditRecipe;
