// import { useState, useEffect } from "react";

// export const useRecipeForm = (initialRecipe) => {
//   const [stockItems, setStockItems] = useState([]);
//   const [recipeType, setRecipeType] = useState(initialRecipe?.type || "fixed");
//   const [recipeName, setRecipeName] = useState(initialRecipe?.name || "");
//   const [productName, setProductName] = useState(
//     initialRecipe?.productName || ""
//   );
//   const [creationDate, setCreationDate] = useState(
//     initialRecipe?.dateCreated || ""
//   );

//   // Load stock items first
//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         const response = await import("../data/Dummy_Product.json");
//         setStockItems(response.default);
//       } catch (error) {
//         console.error("Error loading stock data:", error);
//       }
//     };
//     fetchStockData();
//   }, []);

//   // Initialize ingredients after stock items are loaded
//   const [ingredients, setIngredients] = useState(() => {
//     if (!initialRecipe?.ingredients) {
//       return [{ stockId: "", quantity: "", unit: "", price: 0 }];
//     }

//     return initialRecipe.ingredients.map((ingredient) => {
//       // Find matching stock item by name
//       const matchingStock = stockItems.find(
//         (stock) => stock.productName === ingredient.name
//       );

//       return {
//         stockId: matchingStock?.productId || "",
//         quantity: ingredient.quantity || "",
//         unit: ingredient.unit || "",
//         price: ingredient.price || 0,
//       };
//     });
//   });

//   // Update ingredients when stock items are loaded
//   useEffect(() => {
//     if (stockItems.length > 0 && initialRecipe?.ingredients) {
//       setIngredients(
//         initialRecipe.ingredients.map((ingredient) => {
//           const matchingStock = stockItems.find(
//             (stock) => stock.productName === ingredient.name
//           );

//           return {
//             stockId: matchingStock?.productId || "",
//             quantity: ingredient.quantity || "",
//             unit: ingredient.unit || "",
//             price: ingredient.price || 0,
//           };
//         })
//       );
//     }
//   }, [stockItems, initialRecipe]);

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

//   return {
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
//     setIngredients,
//     addIngredient,
//     removeIngredient,
//     updateIngredient,
//     calculatePrice,
//     formatPrice,
//     getTotalPrice,
//   };
// };

/**
 * Custom hook to manage recipe form state, including stock items, recipe details, ingredients, and calculations.
 *
 * @param {Object} [initialRecipe] - The initial recipe data (if available) to pre-fill the form.
 * @param {string} [initialRecipe.type] - The recipe type (e.g., "fixed").
 * @param {string} [initialRecipe.name] - The name of the recipe.
 * @param {string} [initialRecipe.productName] - The product name associated with the recipe.
 * @param {string} [initialRecipe.dateCreated] - The date the recipe was created.
 * @param {string} [initialRecipe.category] - The category of the recipe.
 * @param {Array<Object>} [initialRecipe.ingredients] - The ingredients for the recipe, with each ingredient including its name, quantity, unit, and price.
 *
 * @returns {Object} - The state and methods related to the recipe form.
 * @returns {Array} stockItems - The list of stock items available for the recipe.
 * @returns {string} recipeType - The type of the recipe (e.g., "fixed").
 * @returns {Function} setRecipeType - Function to set the recipe type.
 * @returns {string} recipeName - The name of the recipe.
 * @returns {Function} setRecipeName - Function to set the recipe name.
 * @returns {string} productName - The product name associated with the recipe.
 * @returns {Function} setProductName - Function to set the product name.
 * @returns {string} creationDate - The date when the recipe was created.
 * @returns {Function} setCreationDate - Function to set the creation date.
 * @returns {string} category - The category of the recipe.
 * @returns {Function} setCategory - Function to set the category.
 * @returns {Array<Object>} ingredients - The list of ingredients used in the recipe.
 * @returns {Function} setIngredients - Function to set the ingredients.
 * @returns {Function} addIngredient - Function to add a new ingredient to the list.
 * @returns {Function} removeIngredient - Function to remove an ingredient from the list.
 * @returns {Function} updateIngredient - Function to update an ingredient in the list.
 * @returns {Function} calculatePrice - Function to calculate the price of an ingredient based on quantity and unit price.
 * @returns {Function} formatPrice - Function to format the price as a currency string.
 * @returns {Function} getTotalPrice - Function to calculate the total price of the recipe ingredients.
 */
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/Api";

export const useRecipeForm = (initialRecipe) => {
  const [recipeType, setRecipeType] = useState(initialRecipe?.type || "fixed");
  const [recipeName, setRecipeName] = useState(initialRecipe?.name || "");
  const [productName, setProductName] = useState(
    initialRecipe?.productName || ""
  );
  const [creationDate, setCreationDate] = useState(
    initialRecipe?.dateCreated || ""
  );
  const [category, setCategory] = useState(initialRecipe?.category || "");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const stockItems = data?.items || [];

  const [ingredients, setIngredients] = useState(() => {
    if (!initialRecipe?.ingredients) {
      return [{ stockId: "", quantity: "", unit: "", price: 0 }];
    }

    return initialRecipe.ingredients.map((ingredient) => {
      const matchingStock = stockItems.find(
        (stock) => stock.productName === ingredient.name
      );

      return {
        stockId: matchingStock?.productId || "",
        quantity: ingredient.quantity || "",
        unit: ingredient.unit || "",
        price: ingredient.price || 0,
      };
    });
  });

  useEffect(() => {
    if (stockItems.length > 0 && initialRecipe?.ingredients) {
      setIngredients(
        initialRecipe.ingredients.map((ingredient) => {
          const matchingStock = stockItems.find(
            (stock) => stock.productName === ingredient.name
          );

          return {
            stockId: matchingStock?.productId || "",
            quantity: ingredient.quantity || "",
            unit: ingredient.unit || "",
            price: ingredient.price || 0,
          };
        })
      );
    }
  }, [stockItems, initialRecipe]);

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

  if (isLoading) {
    return { loading: true, stockItems: [] };
  }

  if (isError) {
    return { error: error.message, stockItems: [] };
  }

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
    category,
    setCategory,
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
