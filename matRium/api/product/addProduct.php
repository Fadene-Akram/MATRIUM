<?php
require_once '../../config/db.php';
require_once '../../config/constants.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['product_name'], $data['category'], $data['qty_purchased'], $data['unit_price'], $data['supplier'])) {
        echo json_encode(["status" => "error", "message" => "Missing required fields."]);
        exit;
    }

    $product_name = $data['product_name'];
    $category = $data['category'];
    $qty_purchased = $data['qty_purchased'];
    $unit_price = $data['unit_price'];
    $supplier = $data['supplier'];
    $image = isset($data['image']) ? $data['image'] : null; 

    $result = addStockItem($product_name, $category, $qty_purchased, $unit_price, $supplier, $image);

    if ($result === true) {
        echo json_encode(["status" => "success", "message" => "Product added successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => $result]);
    }
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request method."]);
exit;

function addStockItem($product_name, $category, $qty_purchased, $unit_price, $supplier, $image) {
    global $conn;

    $total_amount = $qty_purchased * $unit_price;

    $status = 'in stock'; // Default
    if ($qty_purchased == 0) {
        $status = 'out of stock';
    } elseif ($qty_purchased < 100) {
        $status = 'low in stock';
    }

    $sql = "INSERT INTO stock (product_name, category, qty_purchased, unit_price, total_amount, supplier, status, image, last_updated) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ssiddsss", $product_name, $category, $qty_purchased, $unit_price, $total_amount, $supplier, $status, $image);

    if ($stmt->execute()) {
        return true;
    } else {
        return "Error: " . $stmt->error;
    }
}
?>
