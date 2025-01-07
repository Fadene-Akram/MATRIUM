import React from "react";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import styles from "./RecipeDetailsModal.module.css";

function RecipeDetailsModal({ recipe, onClose }) {
  if (!recipe) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    // Title
    doc.setFontSize(18);
    doc.text("Recipe Details", 14, 20);

    // Recipe details
    doc.setFontSize(12);
    doc.text(`ID: ${recipe.id}`, 14, 30);
    doc.text(`Name: ${recipe.name}`, 14, 40);
    doc.text(`Type: ${recipe.type}`, 14, 50);
    doc.text(`Total Price: ${recipe.totalPrice}`, 14, 60);
    doc.text(`Date Created: ${recipe.dateCreated}`, 14, 70);

    // Save the PDF
    doc.save(`${recipe.name}_details.pdf`);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h3>Recipe Details</h3>
        <div className={styles.details}>
          <p>
            <strong>ID:</strong> {recipe.id}
          </p>
          <p>
            <strong>Name:</strong> {recipe.name}
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

// import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
// import styles from "./RecipeDetailsModal.module.css";

// function RecipeDetailsModal({ recipe, onClose }) {
//   if (!recipe) return null;

//   const downloadPDF = () => {
//     const doc = new jsPDF();

//     doc.setFont("helvetica", "normal");

//     // Title
//     doc.setFontSize(18);
//     doc.text("Recipe Details", 14, 20);

//     // Recipe details
//     doc.setFontSize(12);
//     doc.text(`ID: ${recipe.id}`, 14, 30);
//     doc.text(`Name: ${recipe.name}`, 14, 40);
//     doc.text(`Type: ${recipe.type}`, 14, 50);
//     doc.text(`Total Price: ${recipe.totalPrice}`, 14, 60);
//     doc.text(`Date Created: ${recipe.dateCreated}`, 14, 70);

//     // Save the PDF
//     doc.save(`${recipe.name}_details.pdf`);
//   };

//   const handleEditClick = () => {
//     // Logic for editing the recipe
//     console.log("Edit button clicked");
//     // Implement the edit functionality here, like redirecting to an edit page or opening an editable form
//   };

//   return (
//     <div className={styles.modal}>
//       <div className={styles.modalContent}>
//         <span className={styles.closeButton} onClick={onClose}>
//           &times;
//         </span>
//         <h3>Recipe Details</h3>
//         <div className={styles.details}>
//           <p>
//             <strong>ID:</strong> {recipe.id}
//           </p>
//           <p>
//             <strong>Name:</strong> {recipe.name}
//           </p>
//           <p>
//             <strong>Type:</strong> {recipe.type}
//           </p>
//           <p>
//             <strong>Total Price:</strong> {recipe.totalPrice}
//           </p>
//           <p>
//             <strong>Date Created:</strong> {recipe.dateCreated}
//           </p>
//         </div>

//         {/* Buttons for actions */}
//         <div className={styles.actions}>
//           <button className={styles.downloadBtn} onClick={downloadPDF}>
//             Download as PDF
//           </button>
//           {recipe.isEditable && (
//             <button className={styles.editBtn} onClick={handleEditClick}>
//               Edit
//             </button>
//           )}
//           <button className={styles.closeBtn} onClick={onClose}>
//             Go Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecipeDetailsModal;
