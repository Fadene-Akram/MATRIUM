import React from "react";
import styles from "./UtilizeRecipeForm.module.css";

/**
 * ProductForm component allows users to input and manage product details in a recipe.
 * It displays product information and includes fields for product ID, quantity, unit price, total amount, and status.
 *
 * @component
 * @example
 * const productData = {
 *   productId: '123',
 *   setProductId: (id) => {},
 *   quantity: 5,
 *   setQuantity: (quantity) => {},
 *   unitPrice: 20,
 *   category: 'Ingredient',
 *   productName: 'Tomato',
 *   totalAmount: 100,
 *   setTotalAmount: (amount) => {},
 *   setStatus: (status) => {},
 *   status: 'Available',
 *   recipeName: 'Salad',
 *   onSubmit: (e) => {}
 * };
 *
 * <ProductForm {...productData} />
 *
 * @param {Object} props - The component props
 * @param {string} props.productId - The ID of the product
 * @param {Function} props.setProductId - Function to update product ID
 * @param {number} props.quantity - The quantity of the product
 * @param {Function} props.setQuantity - Function to update quantity
 * @param {number} props.unitPrice - The unit price of the product
 * @param {string} props.category - The product category
 * @param {string} props.productName - The product name
 * @param {number} props.totalAmount - The total amount for the product (calculated)
 * @param {Function} props.setTotalAmount - Function to update total amount
 * @param {Function} props.setStatus - Function to update product status
 * @param {string} props.status - The current status of the product
 * @param {string} props.recipeName - The recipe name
 * @param {Function} props.onSubmit - The submit handler for the form
 *
 * @returns {JSX.Element} A form element for managing product details
 */
const ProductForm = ({
  productId,
  setProductId,
  quantity,
  setQuantity,
  unitPrice,
  category,
  productName,
  totalAmount,
  setTotalAmount,
  setStatus,
  status,
  recipeName,
  onSubmit,
}) => {
  console.log(ProductForm);

  return (
    <form className={styles.productForm} onSubmit={onSubmit}>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Recipe Name</label>
          <input
            type="text"
            value={recipeName}
            readOnly
            className={`${styles.input} ${styles.readOnly}`}
          />
        </div>
      </div>
      <div className={` ${styles.productInfo}`}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Product Name</label>
          <input
            type="text"
            value={productName}
            readOnly
            className={`${styles.input} ${styles.readOnly}`}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Category</label>
          <input
            type="text"
            value={category}
            readOnly
            className={`${styles.input} ${styles.readOnly}`}
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter product ID"
            className={styles.input}
            required
          />
        </div>
      </div>

      <div className={` ${styles.productInfo}`}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Unit Price</label>
          <input
            type="number"
            value={unitPrice}
            readOnly
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className={styles.input}
            required
            min={0}
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Total Amount</label>
          <input
            type="number"
            value={totalAmount}
            readOnly
            className={`${styles.input} ${styles.readOnly}`}
            onChange={setTotalAmount}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Status</label>
          <input
            type="text"
            value={status}
            readOnly
            className={`${styles.input} ${styles.readOnly}`}
            onChange={setStatus}
          />
        </div>
      </div>

      <button type="submit" className={styles.saveButton}>
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
