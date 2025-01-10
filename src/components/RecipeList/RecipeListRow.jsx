import styles from "./RecipeListRow.module.css";
import editIcon from "../../assets/icons/edit-icon.svg";
import viewIcon from "../../assets/icons/eye-icon.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";

/**
 * RecipeListRow Component
 *
 * This component represents a single row in the recipe list table. It displays recipe details
 * such as ID, name, product name, type, date created, and total price. It also provides actions
 * like edit, view details, and delete for each recipe.
 *
 * @param {Object} props - Component props
 * @param {Object} props.rowInformation - The data object for a single recipe row
 * @param {number} props.rowInformation.id - The ID of the recipe
 * @param {string} props.rowInformation.name - The name of the recipe
 * @param {string} props.rowInformation.productName - The product name associated with the recipe
 * @param {string} props.rowInformation.type - The type of the recipe (e.g., "variable")
 * @param {number} props.rowInformation.totalPrice - The total price of the recipe
 * @param {string} props.rowInformation.dateCreated - The date when the recipe was created
 * @param {Function} props.onDeleteAction - Callback function for the delete action
 * @param {Function} props.onViewDetailsAction - Callback function for the view details action
 * @param {Function} props.onUseRecipe - Callback function triggered when the row is clicked
 * @param {Function} [props.onEditAction] - Callback function for the edit action (only available for variable recipes)
 *
 * @returns {JSX.Element} A row component for displaying recipe information and actions
 */
function RecipeListRow({
  rowInformation,
  onDeleteAction,
  onViewDetailsAction,
  onUseRecipe,
  onEditAction,
}) {
  const { id, name, productName, type, totalPrice, dateCreated } =
    rowInformation;

  return (
    <div className={styles.rowTableContainer} onClick={onUseRecipe}>
      <div className={styles.idColumn}>{id}</div>
      <div className={styles.column}>{name}</div>
      <div className={styles.column}>{productName}</div>
      <div className={styles.column}>{type}</div>
      <div className={styles.column}>{dateCreated}</div>
      <div className={styles.column}>{totalPrice}</div>
      <div className={styles.actionColumn}>
        {type === "variable" && (
          <div onClick={onEditAction} role="button" aria-label="Edit Recipe">
            <img src={editIcon} alt="Edit Recipe" width={20} />
          </div>
        )}
        <div
          onClick={onViewDetailsAction}
          role="button"
          aria-label="View Recipe Details"
        >
          <img src={viewIcon} alt="View Recipe Details" width={20} />
        </div>
        <div onClick={onDeleteAction} role="button" aria-label="Delete Recipe">
          <img
            src={deleteIcon}
            alt="Delete Recipe"
            width={20}
            style={{ color: "red" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeListRow;
