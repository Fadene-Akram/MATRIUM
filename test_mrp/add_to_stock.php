<?php
require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_name = $_POST['product_name'];
    $category = $_POST['category'];
    $qty_purchased = $_POST['qty_purchased'];
    $unit_price = $_POST['unit_price'];
    $supplier = $_POST['supplier'];
    $image = $_POST['image'];

    $result = addStockItem($product_name, $category, $qty_purchased, $unit_price, $supplier, $image);

    if ($result === true) {
        echo "Product added to stock successfully!";
    } else {
        echo $result;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add to Stock</title>
</head>
<body>
<h1>Add Product to Stock</h1>
<form method="POST">
    <label for="product_name">Product Name:</label>
    <input type="text" name="product_name" required><br>

    <label for="category">Category:</label>
    <input type="text" name="category" required><br>

    <label for="qty_purchased">Quantity Purchased:</label>
    <input type="number" name="qty_purchased" required><br>

    <label for="unit_price">Unit Price:</label>
    <input type="number" name="unit_price" required><br>

    <label for="supplier">Supplier:</label>
    <input type="text" name="supplier" required><br>

    <label for="image">Image (URL):</label>
    <input type="text" name="image" required><br>

    <button type="submit">Add to Stock</button>
</form>
</body>
</html>
