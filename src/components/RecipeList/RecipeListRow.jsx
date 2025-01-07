import styles from "./RecipeListRow.module.css";

function RecipeListRow({
  rowInformation,
  onDeleteAction,
  onViewDetailsAction,
  onEditAction, // Add the onEditAction prop
}) {
  const { id, name, productName, type, totalPrice, dateCreated } =
    rowInformation;

  return (
    <div className={styles.rowTableContainer}>
      <div className={styles.idColumn}>{id}</div>
      <div className={styles.column}>{name}</div>
      <div className={styles.column}>{productName}</div>
      <div className={styles.column}>{type}</div>
      <div className={styles.column}>{dateCreated}</div>
      <div className={styles.column}>{totalPrice}</div>
      <div className={styles.actionColumn}>
        {type === "variable" && (
          <div onClick={onEditAction}>
            <img src="src/assets/icons/edit-icon.svg" alt="edit" width={20} />
          </div>
        )}
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

export default RecipeListRow;
