import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import jsPDF AutoTable plugin
import styles from "./RecipeDetailsModal.module.css";

/**
 * RecipeDetailsModal Component
 *
 * This component displays detailed information about a recipe in a modal. It allows
 * users to view recipe details, including its ingredients, and provides an option
 * to download the recipe details as a PDF file.
 *
 * @param {Object} props - Component props
 * @param {Object} props.recipe - The recipe object containing details to display
 * @param {number} props.recipe.id - The ID of the recipe
 * @param {string} props.recipe.name - The name of the recipe
 * @param {string} props.recipe.type - The type of the recipe
 * @param {string} props.recipe.productName - The product name associated with the recipe
 * @param {number} props.recipe.totalPrice - The total price of the recipe
 * @param {string} props.recipe.dateCreated - The date the recipe was created
 * @param {Array} props.recipe.ingredients - List of ingredients in the recipe
 * @param {string} props.recipe.ingredients[].name - Name of the ingredient
 * @param {number} props.recipe.ingredients[].quantity - Quantity of the ingredient
 * @param {string} props.recipe.ingredients[].unit - Unit of the ingredient
 * @param {number} props.recipe.ingredients[].price - Price of the ingredient
 * @param {Function} props.onClose - Callback function to close the modal
 *
 * @returns {JSX.Element|null} The Recipe Details Modal component
 */
function RecipeDetailsModal({ recipe, onClose }) {
  if (!recipe) return null;

  /**
   * Generates a PDF containing recipe details and ingredients and downloads it.
   */
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Set font for the document
    doc.setFont("helvetica", "normal");

    // Add a title to the document
    doc.setFontSize(18);
    doc.text("Recipe Details", 14, 20);

    // Add recipe details in a table format
    doc.setFontSize(12);
    const recipeDetails = [
      ["ID", recipe.id],
      ["Name", recipe.name],
      ["Type", recipe.type],
      ["Product Name", recipe.productName],
      ["Total Price", recipe.totalPrice],
      ["Date Created", recipe.dateCreated],
    ];

    doc.autoTable({
      startY: 30,
      head: [["Attribute", "Value"]],
      body: recipeDetails,
      theme: "grid",
      margin: { left: 14, right: 14 },
    });

    // Add a title for the ingredients section
    doc.setFontSize(14);
    doc.text("Ingredients:", 14, doc.lastAutoTable.finalY + 10);

    // Add ingredients in a table format
    const ingredients = recipe.ingredients.map((ingredient, index) => [
      index + 1,
      ingredient.name,
      ingredient.quantity,
      ingredient.unit,
      `$${ingredient.price}`,
    ]);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [["#", "Name", "Quantity", "Unit", "Price"]],
      body: ingredients,
      theme: "grid",
      margin: { left: 14, right: 14 },
    });

    // Save the document
    doc.save(`${recipe.name}_details.pdf`);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h3 className={styles.modalTitle}>Recipe Details</h3>
        <div className={styles.details}>
          <div className={styles.detailsInformation}>
            <p>
              <strong>ID:</strong> {recipe.id}
            </p>
            <p>
              <strong>Name:</strong> {recipe.name}
            </p>
            <p>
              <strong>Product Name:</strong> {recipe.productName}
            </p>
            <p>
              <strong>Type:</strong> {recipe.type}
            </p>
            <p>
              <strong>Total Price:</strong> {recipe.totalPrice}
            </p>
            <p>
              <strong>Date Created:</strong> {recipe.dateCreated}
            </p>
          </div>
          <ul className={styles.ingredientContainer}>
            <h4>Ingredients</h4>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className={styles.ingredient}>
                - {ingredient.name} - {ingredient.quantity} {ingredient.unit} ($
                {ingredient.price})
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons for actions */}
        <div className={styles.actions}>
          <button className={styles.downloadBtn} onClick={downloadPDF}>
            Download as PDF
          </button>
          <button className={styles.closeBtn} onClick={onClose}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailsModal;
