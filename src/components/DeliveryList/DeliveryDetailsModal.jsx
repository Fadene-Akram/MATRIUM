import React from "react";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import styles from "./DeliveryDetailsModal.module.css";

function DeliveryDetailsModal({ recipe, onClose }) {
  if (!recipe) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Set font
    doc.setFont("helvetica", "normal");
  
    // Title
    doc.setFontSize(18);
    doc.text("Order Details", 14, 20);
  
    // Recipe details
    doc.setFontSize(12);
    const recipeDetails = [
      { label: "Order ID", value: recipe.orderId },
      { label: "Customer Name", value: recipe.customerName },
      { label: "Delivery Address", value: recipe.deliveryAddress },
      { label: "Delivery Date", value: recipe.deliveryDate },
      { label: "Status", value: recipe.status },
      { label: "Delivery Type", value: recipe.deliveryType },
    ];
  
    // Colors
    const headerColor = [30, 144, 255]; // Dodger Blue
    const rowColor = [240, 248, 255]; // Alice Blue
    const borderColor = [0, 0, 0]; // Black
  
    // Draw table headers
    const tableX = 14;
    let tableY = 40;
  
    doc.setFillColor(...headerColor);
    doc.setTextColor(255, 255, 255);
    doc.rect(tableX, tableY, 180, 10, "F");
    doc.text("Field", tableX + 2, tableY + 7);
    doc.text("Details", tableX + 92, tableY + 7);
  
    // Draw rows for delivery information
    tableY += 10;
    doc.setTextColor(0, 0, 0); // Reset text color
    recipeDetails.forEach((item, index) => {
      doc.setFillColor(...(index % 2 === 0 ? rowColor : [255, 255, 255])); // Alternate row colors
      doc.rect(tableX, tableY, 180, 10, "F"); // Draw cell background
      doc.setDrawColor(...borderColor);
      doc.rect(tableX, tableY, 180, 10); // Draw cell border
  
      doc.text(item.label, tableX + 2, tableY + 7); // Field name
      doc.text(item.value.toString(), tableX + 92, tableY + 7); // Field value
  
      tableY += 10;
    });
  
    // Add section for products
    doc.setFontSize(14);
    tableY += 10;
    doc.text("Products", 14, tableY);
    tableY += 6;
  
    // Draw table headers for products
    doc.setFontSize(12);
    doc.setFillColor(...headerColor);
    doc.setTextColor(255, 255, 255);
    doc.rect(tableX, tableY, 180, 10, "F");
    doc.text("ID", tableX + 2, tableY + 7);
    doc.text("Name", tableX + 20, tableY + 7);
    doc.text("Product Name", tableX + 60, tableY + 7);
    doc.text("Type", tableX + 120, tableY + 7);
    doc.text("Total Price", tableX + 150, tableY + 7);
  
    // Draw rows for products
    tableY += 10;
    doc.setTextColor(0, 0, 0); // Reset text color
    recipe.products.forEach((product, index) => {
      doc.setFillColor(...(index % 2 === 0 ? rowColor : [255, 255, 255])); // Alternate row colors
      doc.rect(tableX, tableY, 180, 10, "F"); // Draw cell background
      doc.setDrawColor(...borderColor);
      doc.rect(tableX, tableY, 180, 10); // Draw cell border
  
      doc.text(product.id.toString(), tableX + 2, tableY + 7); // ID
      doc.text(product.name, tableX + 20, tableY + 7); // Name
      doc.text(product.productName, tableX + 60, tableY + 7); // Product Name
      doc.text(product.type, tableX + 120, tableY + 7); // Type
      doc.text(product.totalPrice.toString(), tableX + 150, tableY + 7); // Total Price
  
      tableY += 10;
    });
  
    // Save the PDF
    doc.save(`${recipe.customerName}_details.pdf`);
  };
  
  

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
       
 {/*        <div className={styles.details}>
  <p>
    <strong>Order ID:</strong> {recipe.orderId}
  </p>
  <p>
    <strong>Customer Name:</strong> {recipe.customerName}
  </p>
  <p>
    <strong>Delivery Address:</strong> {recipe.deliveryAddress}
  </p>
  <p>
    <strong>Delivery Date:</strong> {recipe.deliveryDate}
  </p>
  <p>
    <strong>Status:</strong> {recipe.status}
  </p>
  <p>
    <strong>Delivery Type:</strong> {recipe.deliveryType}
  </p>

  <div className={styles.products}>
    <h3>Products:</h3>
    {recipe.products.map((product, index) => (
      <div key={product.id} className={styles.product}>
        <p>
          <strong>Product {index + 1}:</strong>
        </p>
        <p>
          <strong>ID:</strong> {product.id}
        </p>
        <p>
          <strong>Name:</strong> {product.name}
        </p>
        <p>
          <strong>Product Name:</strong> {product.productName}
        </p>
        <p>
          <strong>Type:</strong> {product.type}
        </p>
        <p>
          <strong>Total Price:</strong> ${product.totalPrice}
        </p>
        <p>
          <strong>Date Created:</strong> {product.dateCreated}
        </p>
      </div>
    ))}
  </div>
</div> */}


<div className={styles.addRecipeContainer}>
  {recipe ? (
    <div className={styles.deliveryContainer}>
      {/* Customer Information Section */}
      <h2>Customer Information</h2>
      <p><strong>Customer Name:</strong> {recipe.customerName}</p>
      <p><strong>Delivery Address:</strong> {recipe.deliveryAddress}</p>
      <p><strong>Delivery Date:</strong> {recipe.deliveryDate}</p>
      <p><strong>Delivery Type:</strong> {recipe.deliveryType}</p>
      <p><strong>Status:</strong> {recipe.status}</p>

      {/* Products Section */}
      <h2>Products</h2>
      {recipe.products.length > 0 ? (
        <ul>
          {recipe.products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p><strong>Product Name:</strong> {product.productName}</p>
              <p><strong>Type:</strong> {product.type}</p>
              <p><strong>Total Price:</strong> ${product.totalPrice.toLocaleString()}</p>
              <p><strong>Date Created:</strong> {product.dateCreated}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noProducts}>No products available for this delivery.</p>
      )}
    </div>
  ) : (
    <p>No delivery data available.</p>
  )}
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

export default DeliveryDetailsModal;

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
