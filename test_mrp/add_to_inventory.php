<?php
require_once 'database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_name = $_POST['product_name'];
    $category = $_POST['category'];
    $qty_available = $_POST['qty_available'];
    $unit_price = $_POST['unit_price'];
    $total_amount = $_POST['total_amount'];
    $status = $_POST['status'];
    $image = $_POST['image'];

    $result = addInventoryItem($image,$product_name, $category, $qty_available, $unit_price, $total_amount, $status);

    if ($result === true) {
        echo "Product added to inventory successfully!";
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
    <title>Add to Inventory</title>
</head>
<body>
<h1>Add Product to Inventory</h1>
<form method="POST">

   <label for="image">Image (URL):</label>
   <input type="text" name="image" required><br>

    <label for="product_name">Product Name:</label>
    <input type="text" name="product_name" required><br>

    <label for="category">Category:</label>
    <input type="text" name="category" required><br>

    <label for="qty_available">Quantity Available:</label>
    <input type="number" name="qty_available" required><br>

    <label for="unit_price">Unit Price:</label>
    <input type="number" name="unit_price" required><br>

    <label for="total_amount">Total Amount:</label>
    <input type="number" name="total_amount" required><br>

    <label for="status">Status:</label>
    <input type="text" name="status" required><br>

    

    <button type="submit">Add to Inventory</button>
</form>
</body>
</html>
