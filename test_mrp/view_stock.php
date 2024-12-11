<?php
require_once 'database.php';
$stock_items = getStockItems();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Stock</title>
</head>
<body>
<h1>Stock Items</h1>
<table border="1">
    <tr>
        <th>Stock ID</th>
        <th>Product Name</th>
        <th>Category</th>
        <th>Quantity Purchased</th>
        <th>Unit Price</th>
        <th>Total Amount</th>
        <th>Supplier</th>
        <th>Image</th>
        <th>Status</th>
        <th>Last Updated</th>
    </tr>
    <?php foreach ($stock_items as $item): ?>
        <tr>
            <td><?= $item['stock_id'] ?></td>
            <td><?= $item['product_name'] ?></td>
            <td><?= $item['category'] ?></td>
            <td><?= $item['qty_purchased'] ?></td>
            <td><?= $item['unit_price'] ?></td>
            <td><?= $item['total_amount'] ?></td>
            <td><?= $item['supplier'] ?></td>
            <td><img src="<?= $item['image'] ?>" alt="Product Image" style="width: 50px; height: 50px;"></td>
            <td><?= $item['status'] ?></td>
            <td><?= $item['last_updated'] ?></td>
        </tr>
    <?php endforeach; ?>
</table>
</body>
</html>
