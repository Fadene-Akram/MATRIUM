import React from "react";
import styles from "./DeleteModal.module.css";

function DeleteModal({ isOpen, recipeToDelete, onDelete, onCancel }) {
  if (!isOpen || !recipeToDelete) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.deleteModal}>
        <p>Are you sure you want to delete this recipe?</p>
        <div className={styles.deleteModalbtn}>
          <button
            onClick={() => onDelete(recipeToDelete.id)}
            className={styles.deletebtn}
          >
            Yes, Delete
          </button>
          <button onClick={onCancel} className={styles.cancelbtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
