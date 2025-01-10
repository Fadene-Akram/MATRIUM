/* // RecipeForm.js
import styles from "./CreateRecipe.module.css";

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
  stockItems,
  formatPrice,
  getTotalPrice,
  onSubmit,
}) => (
  <form className={styles.addRecipeForm} onSubmit={onSubmit}>
    <div className={styles.formRow}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Customer Name</label>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter Customer name"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Delivery Address</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter deliveryAddress"
          className={styles.input}
          required
        />
      </div>
      <div className={styles.typeGroup}>
        <label className={styles.label}>Delivery Type</label>
        <select
          value={recipeType}
          onChange={(e) => setRecipeType(e.target.value)}
          className={styles.select}
        >
          <option value="Express">Express Delivery</option>
          <option value="Standard">Standard Delivery</option>
        </select>
      </div>
    </div>

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
      <label className={styles.label}>Products</label>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={styles.ingredientRow}>
          <select
            value={ingredient.stockId}
            onChange={(e) => updateIngredient(index, "stockId", e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Select Product</option>
            {stockItems.map((item) => (
              <option
                key={item.productId}
                value={item.productId}
                disabled={item.status !== "In stock"}
              >
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
            disabled={recipeType === "variable"}
            required={recipeType !== "variable"}
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
        + Add Product
      </button>
      <div className={styles.totalCost}>
        Total Cost: {formatPrice(getTotalPrice())}
      </div>
    </div>

    <div className={styles.buttonGroup}>
      <button type="submit" className={styles.saveButton}>
        Save Recipe
      </button>
    </div>
  </form>
);

export default RecipeForm;
 */

// RecipeForm.js
import styles from "./CreateRecipe.module.css";

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
  stockItems,
  formatPrice,
  getTotalPrice,
  onSubmit,
}) => {
  const calculateExpectedDeliveryDate = () => {
    const creation = new Date(creationDate);
    if (recipeType === "Express") {
      creation.setDate(creation.getDate() + 3);
    } else if (recipeType === "Standard") {
      creation.setDate(creation.getDate() + 7);
    }else{
      creation.setDate(creation.getDate() + 7);
    }
    return creation.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  return (
    <form className={styles.addRecipeForm} onSubmit={onSubmit}>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Customer Name</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Enter Customer name"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Delivery Address</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter deliveryAddress"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.typeGroup}>
          <label className={styles.label}>Delivery Type</label>
          <select
            value={recipeType}
            onChange={(e) => setRecipeType(e.target.value)}
            className={styles.select}
          >
            <option value="Standard">Standard Delivery</option>
            <option value="Express">Express Delivery</option>
          </select>
        </div>
      </div>

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

      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Expected Delivery Date</label>
          <input
            type="text"
            value={creationDate ? calculateExpectedDeliveryDate() : ""}
            className={styles.input}
            readOnly
          />
        </div>
      </div>

      <div>
        <label className={styles.label}>Products</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientRow}>
            <select
              value={ingredient.stockId}
              onChange={(e) => updateIngredient(index, "stockId", e.target.value)}
              className={styles.select}
              required
            >
              <option value="">Select Product</option>
              {stockItems.map((item) => (
                <option
                  key={item.productId}
                  value={item.productId}
                  disabled={item.status !== "In stock"}
                >
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
              disabled={recipeType === "variable"}
              required={recipeType !== "variable"}
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
          + Add Product
        </button>
        <div className={styles.totalCost}>
          Total Cost: {formatPrice(getTotalPrice())}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.saveButton}>
          Save Recipe
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
