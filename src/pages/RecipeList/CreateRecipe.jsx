// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import styles from "./RecipeCreator.module.css";
// import PageHead from "../../components/ReusedComponent/PageHead";
// import pageHeadIcon from "../../assets/icons/procurements_icon.svg";

// const RecipeCreator = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const editMode = Boolean(location.state?.recipe);
//   const recipeToEdit = location.state?.recipe;
//   console.log(recipeToEdit);

//   const [stockItems, setStockItems] = useState([]);
//   const [recipeType, setRecipeType] = useState(recipeToEdit?.type || "fixed");
//   const [recipeName, setRecipeName] = useState(recipeToEdit?.name || "");
//   const [productName, setProductName] = useState(
//     recipeToEdit?.productName || ""
//   ); // New state for product name
//   const [creationDate, setCreationDate] = useState(
//     recipeToEdit?.dateCreated || ""
//   );
//   const [ingredients, setIngredients] = useState(
//     recipeToEdit?.ingredients || [
//       { stockId: "", quantity: "", unit: "", price: 0 },
//     ]
//   );

//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const response = await import("../../data/Dummy_Product.json");
//         setStockItems(response.default);
//       } catch (error) {
//         console.error("Error loading stock data:", error);
//       }
//     };
//     fetchStockData();
//   }, []);

//   const addIngredient = () => {
//     setIngredients([
//       ...ingredients,
//       { stockId: "", quantity: "", unit: "", price: 0 },
//     ]);
//   };

//   const removeIngredient = (index) => {
//     setIngredients(ingredients.filter((_, i) => i !== index));
//   };

//   const updateIngredient = (index, field, value) => {
//     const newIngredients = ingredients.map((ingredient, i) => {
//       if (i === index) {
//         const updatedIngredient = { ...ingredient, [field]: value };

//         if (field === "stockId") {
//           const stockItem = stockItems.find((item) => item.productId === value);
//           updatedIngredient.unit = stockItem?.unit || "";
//           const price =
//             stockItem?.unitPrice?.replace("₦", "").replace(",", "") || 0;
//           updatedIngredient.price = calculatePrice(
//             updatedIngredient.quantity,
//             parseFloat(price)
//           );
//         } else if (field === "quantity") {
//           const stockItem = stockItems.find(
//             (item) => item.productId === ingredient.stockId
//           );
//           const price =
//             stockItem?.unitPrice?.replace("₦", "").replace(",", "") || 0;
//           updatedIngredient.price = calculatePrice(value, parseFloat(price));
//         }

//         return updatedIngredient;
//       }
//       return ingredient;
//     });
//     setIngredients(newIngredients);
//   };

//   const calculatePrice = (quantity, unitPrice) => {
//     return quantity ? parseFloat(quantity) * unitPrice : 0;
//   };

//   const formatPrice = (price) => {
//     return `${price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
//   };

//   const getTotalPrice = () => {
//     return ingredients.reduce(
//       (total, ingredient) => total + ingredient.price,
//       0
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!creationDate) {
//       alert("Please select a date of creation.");
//       return;
//     }

//     const recipeData = {
//       id: recipeToEdit?.id, // Include ID if editing
//       name: recipeName,
//       productName, // Include product name
//       type: recipeType,
//       date: creationDate,
//       ingredients,
//       totalPrice: getTotalPrice(),
//     };

//     if (editMode) {
//       // Handle update logic here
//       console.log("Updating Recipe:", recipeData);
//       navigate("/recipe-list"); // Navigate back to recipe list
//     } else {
//       // Handle create logic here
//       console.log("Creating Recipe:", recipeData);
//       navigate("/recipe-list");
//     }
//   };

//   return (
//     <div className={styles.addRecipeContainer}>
//       <PageHead
//         title={editMode ? "Edit Recipe" : "Create a Recipe"}
//         description={
//           editMode ? "Modify existing recipe" : "Create a usable Recipe"
//         }
//         icon={pageHeadIcon}
//       />
//       <form className={styles.addRecipeForm} onSubmit={handleSubmit}>
//         <div className={styles.formRow}>
//           <div className={styles.inputGroup}>
//             <label className={styles.label}>Recipe Name</label>
//             <input
//               type="text"
//               value={recipeName}
//               onChange={(e) => setRecipeName(e.target.value)}
//               placeholder="Enter recipe name"
//               className={styles.input}
//               required
//             />
//           </div>
//           <div className={styles.inputGroup}>
//             <label className={styles.label}>Product Name</label>
//             <input
//               type="text"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)} // Handle product name input
//               placeholder="Enter product name"
//               className={styles.input}
//               required
//             />
//           </div>
//           <div className={styles.typeGroup}>
//             <label className={styles.label}>Recipe Type</label>
//             <select
//               value={recipeType}
//               onChange={(e) => setRecipeType(e.target.value)}
//               className={styles.select}
//               disabled={editMode} // Disable type change in edit mode
//             >
//               <option value="fixed">Fixed Recipe</option>
//               <option value="variable">Variable Recipe</option>
//             </select>
//           </div>
//         </div>

//         <div className={styles.formRow}>
//           <div className={styles.inputGroup}>
//             <label className={styles.label}>Date of Creation</label>
//             <input
//               type="date"
//               value={creationDate}
//               onChange={(e) => setCreationDate(e.target.value)}
//               className={styles.inputdate}
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className={styles.label}>Ingredients</label>
//           {ingredients.map((ingredient, index) => (
//             <div key={index} className={styles.ingredientRow}>
//               <select
//                 value={ingredient.stockId}
//                 onChange={(e) =>
//                   updateIngredient(index, "stockId", e.target.value)
//                 }
//                 className={styles.select}
//                 required
//               >
//                 <option value="">Select ingredient</option>
//                 {stockItems.map((item) => (
//                   <option
//                     key={item.productId}
//                     value={item.productId}
//                     disabled={item.status !== "In stock"}
//                   >
//                     {item.productName}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 value={ingredient.quantity}
//                 onChange={(e) =>
//                   updateIngredient(index, "quantity", e.target.value)
//                 }
//                 className={`${styles.quantityInput} ${
//                   recipeType === "variable" ? styles.disabled : ""
//                 }`}
//                 disabled={recipeType === "variable" && !editMode}
//                 required={recipeType !== "variable"}
//               />
//               <div className={styles.unitDisplay}>
//                 {ingredient.unit ||
//                   (ingredient.stockId &&
//                     stockItems
//                       .find((item) => item.productId === ingredient.stockId)
//                       ?.qtyPurchased.split(" ")
//                       .pop())}
//               </div>
//               <div className={styles.priceDisplay}>
//                 {formatPrice(ingredient.price)}
//               </div>
//               <button
//                 type="button"
//                 onClick={() => removeIngredient(index)}
//                 className={styles.removeButton}
//                 disabled={ingredients.length === 1}
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className={styles.footerRow}>
//           <button
//             type="button"
//             onClick={addIngredient}
//             className={styles.addButton}
//           >
//             + Add Ingredient
//           </button>
//           <div className={styles.totalCost}>
//             Total Cost: {formatPrice(getTotalPrice())}
//           </div>
//         </div>

//         <div className={styles.buttonGroup}>
//           <button type="submit" className={styles.saveButton}>
//             {editMode ? "Update Recipe" : "Save Recipe"}
//           </button>
//           {editMode && (
//             <button
//               type="button"
//               className={styles.cancelButton}
//               onClick={() => navigate("/recipe-list")}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RecipeCreator;

import { useNavigate } from "react-router-dom";
import styles from "./CreateRecipe.module.css";
import PageHead from "../../components/ReusedComponent/PageHead";
import pageHeadIcon from "../../assets/icons/procurements_icon.svg";
import RecipeForm from "./RecipeForm";
import { useRecipeForm } from "../../hooks/UseRecipeForm";

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
      />
    </div>
  );
};
export default CreateRecipe;
