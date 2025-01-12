import axios from "axios";

// const BASE_URL = "https://matrium-backend.vercel.app";

// // Fetch all recipes
// export const fetchRecipes = async () => {
//   const { data } = await axios.get(`${BASE_URL}/getRecipes`);
//   return data;
// };

// // Add a new recipe
// export const addRecipe = async (recipe) => {
//   const { data } = await axios.post(`${BASE_URL}/addRecipe`, recipe);
//   return data;
// };

// // Fetch all products
// export const fetchProducts = async () => {
//   const { data } = await axios.get(`${BASE_URL}/getProduct`);
//   return data;
// };

// // Add a new product
// export const addProduct = async (product) => {
//   const { data } = await axios.post(`${BASE_URL}/createProduct`, product);
//   return data;
// };

const BASE_URL = "https://my-matrium-backend.vercel.app";

// Fetch all recipes
export const fetchRecipes = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/getRecipes`);
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes.");
  }
};

// Add a new recipe
export const addRecipe = async (recipe) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/addRecipe`, recipe);
    return data;
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw new Error("Failed to add recipe.");
  }
};

// Fetch all products
export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/getProduct`);
    // console.log("API response:", data); // Debugging API response structure
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};

// Add a product
export const addProduct = async (product) => {
  try {
    console.log("Request payload:", product); // Log the request payload

    const response = await axios.post(`${BASE_URL}/createProduct`, product);
    // console.log("API response:", response.data); // Log successful response

    return response.data;
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      requestData: error.config?.data,
    });

    // Throw error with more specific message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        error.response.data?.message || `Server error: ${error.response.status}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

// Fetch all Annalytics
export const fetchAnalytics = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/analytics`);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};

// Delete recipe

export const deleteRecipe = async (recipeId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/deleteRecipe/${recipeId}`);
    // console.log("API response:", data); // Debugging API response structure
    return data;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw new Error("Failed to delete recipe.");
  }
};

// barchart stockUpdates
export const fetchStockUpdates = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/stockUpdates`);
    return data.stockUpdates; // Extract the stockUpdates property
  } catch (error) {
    console.error("Error fetching stockUpdates:", error);
    throw new Error("Failed to fetch stockUpdates.");
  }
};
// barchart stockUpdates
export const fetchLineChartUpdates = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/finances`);
    return data.finances; // Extract the stockUpdates property
  } catch (error) {
    console.error("Error fetching stockUpdates:", error);
    throw new Error("Failed to fetch stockUpdates.");
  }
};

// deliveries data
export const fetchDeliveries = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/getDelivery`);
    // console.log("API response:", data); // Debugging API response structure
    return data;
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    throw new Error("Failed to fetch deliveries.");
  }
};

export const updateRecipe = async (recipeId, recipeData) => {
  try {
    const { data } = await axios.put(
      `${BASE_URL}/updateRecipe/${recipeId}`,
      recipeData
    );
    return data;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw new Error("Failed to update recipe.");
  }
};
