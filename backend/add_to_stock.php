function addStockItem($product_name, $category, $qty_purchased, $unit_price, $supplier, $image) {
    global $conn;

    $total_amount = $qty_purchased * $unit_price;

    $status = 'in stock'; // Default
    if ($qty_purchased == 0) {
        $status = 'out of stock';
    } elseif ($qty_purchased < 100) {
        $status = 'low in stock';
    }

    $sql = "INSERT INTO stock (product_name, category, qty_purchased, unit_price, total_amount, supplier, image, status, last_updated) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ssiddss", $product_name, $category, $qty_purchased, $unit_price, $total_amount, $supplier, $image, $status);

    if ($stmt->execute()) {
        return true;
    } else {
        return "Error: " . $stmt->error;
    }
}
