import styles from "./DeliveryListRow.module.css";

function DeliveryListRow({
  rowInformation,
  onDeleteAction,
  onViewDetailsAction,
  onViewDeliveryAction,
}) {

  const { orderId, customerName, deliveryAddress, type, status, deliveryType } =
    rowInformation;

  return (
    <div className={styles.rowTableContainer} onClick={onViewDeliveryAction}>
      <div className={styles.idColumn}>{orderId}</div>
      <div className={styles.column}>{customerName}</div>
      <div className={styles.column}>{deliveryAddress}</div>
      <div className={styles.column}>{rowInformation.deliveryDate}</div>
      <div className={styles.column}>{deliveryType}</div>
      <div className={styles.column}>{status}</div>
      <div className={styles.actionColumn}>

        <div onClick={onViewDetailsAction}>
          <img src="src/assets/icons/eye-icon.svg" alt="details" width={20} />
        </div>
        <div onClick={onDeleteAction}>
          <img
            src="src/assets/icons/delete-icon.svg"
            alt="delete"
            width={20}
            style={{ color: "red" }}
          />
        </div>
      </div>
    </div>
  );
}

export default DeliveryListRow;
