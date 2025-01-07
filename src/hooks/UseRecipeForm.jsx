import { useState, useEffect } from "react";

export const useRecipeForm = (initialRecipe) => {
  const [stockItems, setStockItems] = useState([]);
  const [recipeType, setRecipeType] = useState(initialRecipe?.type || "fixed");
  const [recipeName, setRecipeName] = useState(initialRecipe?.name || "");
  const [productName, setProductName] = useState(
    initialRecipe?.productName || ""
  );
  const [creationDate, setCreationDate] = useState(
    initialRecipe?.dateCreated || ""
  );
  const [ingredients, setIngredients] = useState(
    initialRecipe?.ingredients || [
      { stockId: "", quantity: "", unit: "", price: 0 },
    ]
  );

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await import("../data/Dummy_Product.json");
        setStockItems(response.default);
      } catch (error) {
        console.error("Error loading stock data:", error);
      }
    };
    fetchStockData();
  }, []);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { stockId: "", quantity: "", unit: "", price: 0 },
    ]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        const updatedIngredient = { ...ingredient, [field]: value };

        if (field === "stockId") {
          const stockItem = stockItems.find((item) => item.productId === value);
          updatedIngredient.unit = stockItem?.unit || "";
          const price =
            stockItem?.unitPrice?.replace("₦", "").replace(",", "") || 0;
          updatedIngredient.price = calculatePrice(
            updatedIngredient.quantity,
            parseFloat(price)
          );
        } else if (field === "quantity") {
          const stockItem = stockItems.find(
            (item) => item.productId === ingredient.stockId
          );
          const price =
            stockItem?.unitPrice?.replace("₦", "").replace(",", "") || 0;
          updatedIngredient.price = calculatePrice(value, parseFloat(price));
        }

        return updatedIngredient;
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const calculatePrice = (quantity, unitPrice) => {
    return quantity ? parseFloat(quantity) * unitPrice : 0;
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  const getTotalPrice = () => {
    return ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
  };

  return {
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
    setIngredients,
    addIngredient,
    removeIngredient,
    updateIngredient,
    calculatePrice,
    formatPrice,
    getTotalPrice,
  };
};
