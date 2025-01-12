import styles from "./StockRow.module.css";
import defaultPhoto from "../../assets/images/product_6.png";
/**
 * StockRow component renders a row in the stock list table, displaying
 * details of a single product, including its image, name, price, and status.
 *
 * @param {Object} rowInformation - The product data to display in the row.
 * @param {string} rowInformation.sn - The serial number of the product.
 * @param {string} rowInformation.image - The image URL of the product.
 * @param {string} rowInformation.productName - The name of the product.
 * @param {string} rowInformation.productId - The product ID.
 * @param {string} rowInformation.category - The category of the product.
 * @param {number} rowInformation.qtyPurchased - The quantity of the product purchased.
 * @param {number} rowInformation.unitPrice - The unit price of the product.
 * @param {number} rowInformation.totalAmount - The total amount for the product.
 * @param {string} rowInformation.supplier - The supplier of the product.
 * @param {string} rowInformation.status - The status of the product (e.g., "In Stock", "Out of Stock").
 *
 * @returns {JSX.Element} The rendered stock row component.
 */
function StockRow({ rowInformation }) {
  const {
    id,
    image,
    productName,
    productId,
    category,
    qtyPurchased,
    unitPrice,
    totalAmount,
    supplier,
    status,
  } = rowInformation;

  // Format the status by removing spaces and converting it to lowercase
  const formattedStatus = status.toLowerCase().replace(/\s+/g, ""); // Remove all spaces

  return (
    <div className={styles.rowTableContainer}>
      <div className={styles.column}>{id}</div>
      <div className={styles.column}>
        <img
          src={image || defaultPhoto}
          alt={`${productName}-img`}
          className={styles.image}
        />
      </div>
      <div className={styles.column}>{productName}</div>
      <div className={styles.column}>{productId}</div>
      <div className={styles.column}>{category}</div>
      <div className={styles.column}>{qtyPurchased}</div>
      <div className={styles.column}>{unitPrice}</div>
      <div className={styles.column}>{totalAmount}</div>
      <div className={styles.column}>{supplier}</div>
      <div
        className={`${styles.column} ${styles[formattedStatus]}`} // Use formattedStatus here
      >
        {status}
      </div>
    </div>
  );
}

export default StockRow;
