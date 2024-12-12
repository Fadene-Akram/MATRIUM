
/* 
import React, { useState } from 'react';
import styles from './UpdateStock.module.css';

function UpdateStock() {
  const [formData, setFormData] = useState({
    productName: '',
    productId: '',
    category: '',
    qtyPurchased: '',
    unitPrice: '',
    supplier: '',
    photo: null,
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'qtyPurchased' || name === 'unitPrice') {
      const qty = parseFloat(formData.qtyPurchased || 0);
      const price = parseFloat(formData.unitPrice || 0);
      setTotalAmount(qty * price);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      setFormData({ ...formData, photo: file });
    } else {
      alert('File size should be 2MB or less.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Item Added Successfully!');
  };

  return (
    <div className={styles['update-stock-container']}>
      <h2>Update Stock</h2>
      <p>Add new item to stocks</p>
      <form onSubmit={handleSubmit}>
        <div className={styles['photo-upload']}>
          <label htmlFor="photo">
            <div className={styles['upload-box']}>
              {formData.photo ? (
                <img  src={URL.createObjectURL(formData.photo)}  alt="Uploaded" />
              ) : (
                <span>
                   <img src='src/assets/icons/camera.png' alt='upload img'/>
                   <div>upload image</div>
                </span>
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
   
          <div>Allowed format</div>
          <div>JPG, JPEG, and PNG </div>
          <div>Max file size</div>
          <div>2MB</div>
        </div>

        <div className={styles['form-group-row']}>
          <div className={styles['form-group']}>
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label>Product ID</label>
            <input
              type="text"
              name="productId"
              placeholder="Enter ID"
              value={formData.productId}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles['form-group-row']}>
          <div className={styles['form-group']}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>
          <div className={styles['form-group']}>
            <label>QTY Purchased</label>
            <input
              type="number"
              name="qtyPurchased"
              placeholder="Enter quantity"
              value={formData.qtyPurchased}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles['form-group-row']}>
          <div className={styles['form-group']}>
            <label>Unit Price</label>
            <input
              type="number"
              name="unitPrice"
              placeholder="Enter amount"
              value={formData.unitPrice}
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-group']}>
            <label>Total Amount</label>
            <input
              type="text"
              value={`$${totalAmount.toFixed(2)}`}
              disabled
            />
          </div>
        </div>

        <div className={styles['form-group']}>
          <label>Supplier</label>
          <input
            type="text"
            name="supplier"
            placeholder="Enter supplier name"
            value={formData.supplier}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles['add-item-btn']}>
          Add Item
        </button>
      </form>
    </div>
  );
}

export default UpdateStock;
 */

import React, { useState } from 'react';
import styles from './UpdateStock.module.css';
import PageHead from '../../ReusedComponent/PageHead';

function UpdateStock() {
  const [formData, setFormData] = useState({
    productName: '',
    productId: '',
    category: '',
    qtyPurchased: '',
    unitPrice: '',
    supplier: '',
    photo: null,
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'qtyPurchased' || name === 'unitPrice') {
      const qty = parseFloat(formData.qtyPurchased || 0);
      const price = parseFloat(formData.unitPrice || 0);
      setTotalAmount(qty * price);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
      setFormData({ ...formData, photo: file });
    } else {
      alert('File size should be 2MB or less.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Item Added Successfully!');
  };

  return (
    <div className={styles['mainContainer']} >
      <PageHead
        title="Stocks and Inventories"
        description="Update stock and inventory table"
        icon="src/assets/icons/stock_and_enventory_icon.svg"
      />
    <div className={styles['update-stock-container']}>
       
      <h2 className={styles['h2']}>Add New Item</h2>
      <form onSubmit={handleSubmit} className={styles['form-layout']}>
        {/* Column 1: Photo Upload and Add Item Button */}
        <div className={styles['column-left']}>
          <div className={styles['photo-container']}>
          <div className={styles['photo-upload']}>
            <label htmlFor="photo">
              <div className={styles['upload-box']}>
                {formData.photo ? (
                  <img src={URL.createObjectURL(formData.photo)} alt="Uploaded" />
                ) : (
                  <div>
                     <img src="src/assets/icons/camera.png" alt="Upload img" />
                     <div className={styles['lightFont']}>upload up</div>
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
            <div className={styles['lightFont']}>Allowed format</div>
            <div>JPG, JPEG, and PNG</div>
            <div className={styles['lightFont']}> Max file size</div>
            <div>2MB</div>
            </div>
          </div>
          <button type="submit" className={styles['add-item-btn']}>
            Add Item
          </button>
        </div>

        {/* Column 2: Product Name, Category, Unit Price, Supplier */}
        <div className={styles['column']}>
          <div className={styles['form-group']}>
            <label >Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              required
              
            />
          </div>
          <div className={styles['form-group']}>
            <label >Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Stationery">Stationery</option>
            </select>
          </div>
          <div className={styles['form-group']}>
            <label >Unit Price</label>
            <input
              type="number"
              name="unitPrice"
              placeholder="Enter amount"
              value={formData.unitPrice}
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-group']}>
            <label >Supplier</label>
            <input
              type="text"
              name="supplier"
              placeholder="Enter supplier name"
              value={formData.supplier}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Column 3: Product ID, QTY Purchased, Total Amount */}
        <div className={styles['column']}>
          <div className={styles['form-group']}>
            <label >Product ID</label>
            <input
              type="text"
              name="productId"
              placeholder="Enter ID"
              value={formData.productId}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles['form-group']}>
            <label >QTY Purchased</label>
            <input
              type="number"
              name="qtyPurchased"
              placeholder="Enter quantity"
              value={formData.qtyPurchased}
              onChange={handleChange}
            />
          </div>
          <div className={styles['form-group']}>
            <label >Total Amount</label>
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
