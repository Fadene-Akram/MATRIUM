import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to manage the product form state, including quantity, total amount, stock status, and recipe details.
 *
 * @param {Object} [recipe] - The recipe data to pre-fill the form (if available).
 * @param {string} [recipe.productName] - The name of the product associated with the recipe.
 * @param {string} [recipe.category] - The category of the product.
 * @param {string} [recipe.name] - The name of the recipe.
 * @param {number} [recipe.totalPrice] - The unit price of the product.
 *
 * @returns {Object} - The state and methods related to the product form.
 * @returns {string} productId - The ID of the product.
 * @returns {Function} setProductId - Function to set the product ID.
 * @returns {number} quantity - The quantity of the product.
 * @returns {Function} setQuantity - Function to set the quantity of the product.
 * @returns {number} unitPrice - The unit price of the product.
 * @returns {string} category - The category of the product.
 * @returns {string} productName - The name of the product.
 * @returns {number} totalAmount - The total amount (quantity * unitPrice).
 * @returns {Function} setTotalAmount - Function to set the total amount.
 * @returns {string} status - The stock status of the product (e.g., "Out of Stock", "Low in Stock", "In Stock").
 * @returns {Function} setStatus - Function to set the stock status.
 * @returns {string} recipeName - The name of the recipe associated with the product.
 * @returns {Function} onSubmit - Function to handle form submission.
 *
 */
const useProductForm = (recipe) => {
  const navigate = useNavigate();

  const unitPrice = recipe?.totalPrice || 0;
  const productName = recipe?.productName || "";
  const category = recipe?.category || "";
  const recipeName = recipe?.name || "";

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState("Out of Stock");

  /**
   * Handles form submission and logs the product data to the console.
   * Navigates to the recipe list page after submission.
   *
   * @param {Event} event - The form submission event.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const ProductData = {
      productId,
      quantity,
      productName,
      unitPrice,
      category,
      totalAmount,
      status,
      recipeName,
    };
    console.log("Updating Recipe:", ProductData);
    navigate("/recipe-list");
  };

  /**
   * Handles quantity change, updates total amount, and sets stock status based on quantity.
   *
   * @param {string} newQuantity - The new quantity of the product.
   */
  const handleQuantityChange = (newQuantity) => {
    const qty = parseInt(newQuantity, 10) || 0;
    setQuantity(qty);
    setTotalAmount(qty * unitPrice);

    if (qty === 0) setStatus("Out of Stock");
    else if (qty < 10) setStatus("Low in Stock");
    else setStatus("Available");
  };

  return {
    productId,
    setProductId,
    quantity,
    setQuantity: handleQuantityChange,
    unitPrice,
    category,
    productName,
    totalAmount,
    setTotalAmount,
    status,
    setStatus,
    recipeName,
    onSubmit,
  };
};

export default useProductForm;
