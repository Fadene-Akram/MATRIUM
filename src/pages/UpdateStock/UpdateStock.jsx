import styles from "./UpdateStock.module.css";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import PageHead from "../../components/ReusedComponent/Page Head/PageHead";
import pageHeadIcon from "../../assets/icons/stock_and_enventory_icon.svg";
import imagephoto from "../../assets/icons/camera.png";
import { addProduct } from "../../api/Api";

/**
 * UpdateStock is a component that provides a form to add new stock items.
 * It allows users to upload a photo, enter product details, and submit the form.
 *
 * @component
 * @example
 * // Example usage
 * <UpdateStock />
 */
function UpdateStock() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const qtyPurchased = watch("qtyPurchased") || 0;
  const unitPrice = watch("unitPrice") || 0;
  const totalAmount = parseFloat(qtyPurchased) * parseFloat(unitPrice) || 0;

  /**
   * Handles form submission by sending the data to the API.
   * @param {Object} formData - The data from the form submission.
   */
  const onSubmit = async (formData) => {
    try {
      // Prepare the product data
      const productData = {
        product_name: formData.productName, // Changed from productName to name
        category: formData.category,
        unit_price: parseFloat(formData.unitPrice), // Changed from unitPrice to price
        supplier: formData.supplier,
        productId: formData.productId,
        qty_purchased: parseInt(formData.qtyPurchased), // Changed from qtyPurchased to quantity
        // totalAmount: totalAmount,
        image: formData.photo ? `/path/to/images/${formData.photo.name}` : null, // Changed from photoPath to image
      };

      // Log the data being sent
      console.log("Sending data to API:", productData);

      // Call the API
      const response = await addProduct(productData);
      console.log("API Response:", response);

      // Show success message
      alert("Item Added Successfully!");

      // Reset the form
      reset();
    } catch (error) {
      // Enhanced error logging
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });

      // More informative error message to the user
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to add item";
      alert(
        `Error: ${errorMessage}. Please check the console for more details.`
      );
    }
  };

  /**
   * Handles file input changes and validates the file size.
   * If the file is valid, it sets the file in the form data.
   *
   * @param {Event} e - The file input change event.
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setValue("photo", file); // Set the file in the form data
    } else {
      alert("File size should be 2MB or less.");
    }
  };

  return (
    <div className={styles["mainContainer"]}>
      <PageHead
        title="Stocks and Inventories"
        description="Update stock and inventory table"
        icon={pageHeadIcon}
      />
      <NavLink
        to={"/stock"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          padding: "20px 5%",
          textDecoration: "none",
          color: "Black",
          fontSize: "19px",
          textDecorationLine: "underline",
        }}
      >
        Back
      </NavLink>
      <div className={styles["update-stock-container"]}>
        <h2 className={styles["h2"]}>Add New Item</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["form-layout"]}
        >
          {/* Column 1: Photo Upload and Add Item Button */}
          <div className={styles["column-left"]}>
            <div className={styles["photo-container"]}>
              <div className={styles["photo-upload"]}>
                <label htmlFor="photo">
                  <div className={styles["upload-box"]}>
                    {watch("photo") ? (
                      <img
                        src={URL.createObjectURL(watch("photo"))}
                        alt="Uploaded"
                      />
                    ) : (
                      <div>
                        <img src={imagephoto} alt="Upload img" />
                        <div className={styles["lightFont"]}>Upload</div>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                />
                <div className={styles["lightFont"]}>Allowed format</div>
                <div>JPG, JPEG, and PNG</div>
                <div className={styles["lightFont"]}> Max file size</div>
                <div>2MB</div>
                {errors.photo && (
                  <p className={styles["error"]}>{errors.photo.message}</p>
                )}
              </div>
            </div>
            <button type="submit" className={styles["add-item-btn"]}>
              Add Item
            </button>
          </div>

          {/* Column 2: Product Name, Category, Unit Price, Supplier */}
          <div className={styles["column"]}>
            <div className={styles["form-group"]}>
              <label>Product Name</label>
              <input
                type="text"
                {...register("productName", {
                  required: "Product Name is required.",
                })}
                placeholder="Enter product name"
              />
              {errors.productName && (
                <p className={styles["error"]}>{errors.productName.message}</p>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label>Category</label>
              <select
                {...register("category", { required: "Category is required." })}
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Stationery">Stationery</option>
              </select>
              {errors.category && (
                <p className={styles["error"]}>{errors.category.message}</p>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label>Unit Price</label>
              <input
                type="number"
                step="0.01"
                {...register("unitPrice", {
                  required: "Unit Price is required.",
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Unit Price must be greater than 0.",
                })}
                placeholder="Enter amount"
              />
              {errors.unitPrice && (
                <p className={styles["error"]}>{errors.unitPrice.message}</p>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label>Supplier</label>
              <input
                type="text"
                {...register("supplier", { required: "Supplier is required." })}
                placeholder="Enter supplier name"
              />
              {errors.supplier && (
                <p className={styles["error"]}>{errors.supplier.message}</p>
              )}
            </div>
          </div>

          {/* Column 3: Product ID, QTY Purchased, Total Amount */}
          <div className={styles["column"]}>
            <div className={styles["form-group"]}>
              <label>Product ID</label>
              <input
                type="text"
                {...register("productId", {
                  required: "Product ID is required.",
                })}
                placeholder="Enter ID"
              />
              {errors.productId && (
                <p className={styles["error"]}>{errors.productId.message}</p>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label>QTY Purchased</label>
              <input
                type="number"
                {...register("qtyPurchased", {
                  required: "Quantity Purchased is required.",
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= 0 || "Quantity Purchased must be greater than 0.",
                })}
                placeholder="Enter quantity"
                min={0}
              />
              {errors.qtyPurchased && (
                <p className={styles["error"]}>{errors.qtyPurchased.message}</p>
              )}
            </div>
            <div className={styles["form-group"]}>
              <label>Total Amount</label>
              <input
                type="text"
                value={`$${totalAmount.toFixed(2)}`}
                disabled
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStock;
