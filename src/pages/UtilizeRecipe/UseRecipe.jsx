import PageHead from "../../components/ReusedComponent/Page Head/PageHead";
import styles from "./UseRecipe.module.css";
import pageHeadIcon from "../../assets/icons/procurements_icon.svg";
import ProductForm from "../../components/UtilizeRecipe/UtilizeRecipeForm";
import useProductForm from "../../hooks/UseProductForm";
import { useLocation } from "react-router-dom";

function UseRecipe() {
  const location = useLocation();
  const recipeToUse = location.state?.recipe;
  // console.log("Recipe to edit:", recipeToUse);

  const {
    productId,
    setProductId,
    quantity,
    setQuantity,
    unitPrice,
    category,
    productName,
    totalAmount,
    setTotalAmount,
    status,
    setStatus,
    recipeName,
    onSubmit,
  } = useProductForm(recipeToUse);

  return (
    <div className={styles.useRecipeListContainer}>
      <PageHead
        title="Use Recipe"
        description="Use recipe to create a product"
        icon={pageHeadIcon}
      />
      <ProductForm
        productId={productId}
        setProductId={setProductId}
        quantity={quantity}
        setQuantity={setQuantity}
        unitPrice={unitPrice}
        category={category}
        productName={productName} // Props to access unit price from a recipe
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
        status={status}
        setStatus={setStatus}
        recipeName={recipeName}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default UseRecipe;
