import styles from "./StockRow.module.css";

function StockRow({ rowInformation }) {
  const {
    sn,
    image,
    productName,
    productId,
    category,
    qtyPurchased,
    unitPrice,
    totalAmount,
    inStock,
    supplier,
    status,
  } = rowInformation;

  return (
    <div className={styles.rowTableContainer}>
      <div className={styles.column}>{sn}</div>
      <div className={styles.column}>
        <img src={image} alt={productName} className={styles.image} />
      </div>
      <div className={styles.column}>{productName}</div>
      <div className={styles.column}>{productId}</div>
      <div className={styles.column}>{category}</div>
      <div className={styles.column}>{qtyPurchased}</div>
      <div className={styles.column}>{unitPrice}</div>
      <div className={styles.column}>{totalAmount}</div>
      <div className={styles.column}>{inStock}</div>
      <div className={styles.column}>{supplier}</div>
      <div
        className={`${styles.column} ${
          styles[status.toLowerCase().replace(" ", "").replace(" ", "")]
        }}`}
      >
        {status}
      </div>
    </div>
  );
}

export default StockRow;
