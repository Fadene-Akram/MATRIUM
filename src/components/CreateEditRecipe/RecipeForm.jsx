import styles from "../../pages/CreateEditRecipe/CreateRecipe.module.css";

/**
 * Recipe form component for creating or editing a recipe, allowing users to input recipe details, ingredients, and category.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.recipeType - The type of the recipe (either "fixed" or "variable").
 * @param {Function} props.setRecipeType - Function to set the recipe type.
 * @param {string} props.recipeName - The name of the recipe.
 * @param {Function} props.setRecipeName - Function to set the recipe name.
 * @param {string} props.productName - The name of the product.
 * @param {Function} props.setProductName - Function to set the product name.
 * @param {string} props.creationDate - The creation date of the recipe.
 * @param {Function} props.setCreationDate - Function to set the creation date.
 * @param {Array} props.ingredients - List of ingredients for the recipe.
 * @param {Function} props.addIngredient - Function to add a new ingredient to the recipe.
 * @param {Function} props.removeIngredient - Function to remove an ingredient from the recipe.
 * @param {Function} props.updateIngredient - Function to update an ingredient's details.
 * @param {Array} props.stockItems - List of available stock items for ingredient selection.
 * @param {Function} props.formatPrice - Function to format the price of an ingredient or total cost.
 * @param {Function} props.getTotalPrice - Function to calculate the total price of the recipe.
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {string} props.category - The category of the recipe.
 * @param {Function} props.setCategory - Function to set the category of the recipe.
 *
 * @returns {JSX.Element} The rendered RecipeForm component.
 */
const RecipeForm = ({
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
  stockItems = [],
  formatPrice,
  getTotalPrice,
  onSubmit,
  category,
  setCategory, // New prop for category state
}) => (
  <form className={styles.addRecipeForm} onSubmit={onSubmit}>
    <div className={styles.formRow}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Recipe Name</label>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter recipe name"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.typeGroup}>
        <label className={styles.label}>Recipe Type</label>
        <select
          value={recipeType}
          onChange={(e) => setRecipeType(e.target.value)}
          className={styles.select}
        >
          <option value="fixed">Fixed Recipe</option>
          <option value="variable">Variable Recipe</option>
        </select>
      </div>
    </div>

    {/* Category Input Field */}
    {/* <div className={styles.formRow}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          className={styles.inputdate}
          required
        />
      </div>
    </div> */}

    <div className={styles.formRow}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Date of Creation</label>
        <input
          type="date"
          value={creationDate}
          onChange={(e) => setCreationDate(e.target.value)}
          className={styles.inputdate}
          required
        />
      </div>
    </div>

    <div>
      <label className={styles.label}>Ingredients</label>
      {ingredients?.map((ingredient, index) => (
        <div key={index} className={styles.ingredientRow}>
          <select
            value={ingredient.stockId}
            onChange={(e) => updateIngredient(index, "stockId", e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Select ingredient</option>
            {Array.isArray(stockItems) &&
              stockItems.map((item) => (
                <option key={item.productId} value={item.productId}>
                  {item.productName}
                </option>
              ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) =>
              updateIngredient(index, "quantity", e.target.value)
            }
            className={`${styles.quantityInput} ${
              recipeType === "variable" ? styles.disabled : ""
            }`}
            required={recipeType !== "variable"}
            min={0}
          />
          <div className={styles.unitDisplay}>
            {ingredient.unit ||
              (ingredient.stockId &&
                stockItems
                  .find((item) => item.productId === ingredient.stockId)
                  ?.qtyPurchased.split(" ")
                  .pop())}
          </div>
          <div className={styles.priceDisplay}>
            {formatPrice(ingredient.price)}
          </div>
          <button
            type="button"
            onClick={() => removeIngredient(index)}
            className={styles.removeButton}
            disabled={ingredients.length === 1}
          >
            ✕
          </button>
        </div>
      ))}
    </div>

    <div className={styles.footerRow}>
      <button
        type="button"
        onClick={addIngredient}
        className={styles.addButton}
      >
        + Add Ingredient
      </button>
      {/* <div className={styles.totalCost}>
        Total Cost: {formatPrice(getTotalPrice())}
      </div> */}
    </div>

    <div className={styles.buttonGroup}>
      <button type="submit" className={styles.saveButton}>
        Save Recipe
      </button>
    </div>
  </form>
);

export default RecipeForm;
