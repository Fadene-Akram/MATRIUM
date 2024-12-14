<?php
require_once '../../config/db.php';
require_once '../../config/constants.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['action']) && $_GET['action'] === 'categories') {
        $categories = calculateStockCategories();
        echo json_encode(["status" => "success", "total_categories" => $categories]);
        exit;
    }

    if (isset($_GET['action']) && $_GET['action'] === 'stock_value') {
        $stock_value = calculateStockValue();
        echo json_encode(["status" => "success", "total_value" => $stock_value]);
        exit;
    }

    if (isset($_GET['action']) && $_GET['action'] === 'total_items') {
        $total_items = calculateTotalItems();
        echo json_encode(["status" => "success", "total_items" => $total_items]);
        exit;
    }

    if (isset($_GET['action']) && $_GET['action'] === 'items_low_in_stock') {
        $items_low_in_stock = calculateItemsLowInStock();
        echo json_encode(["status" => "success", "items_low_in_stock" => $items_low_in_stock]);
        exit;
    }

    echo json_encode(["status" => "error", "message" => "Invalid action."]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request method."]);
exit;

function calculateStockCategories() {
    global $conn;

    $result = $conn->query("SELECT COUNT(DISTINCT category) AS total_categories FROM stock");
    $row = $result->fetch_assoc();
    return $row['total_categories'];
}

function calculateStockValue() {
    global $conn;

    $result = $conn->query("SELECT SUM(total_amount) AS total_value FROM stock");
    $row = $result->fetch_assoc();
    return $row['total_value'];
}

function calculateTotalItems() {
    global $conn;

    $result = $conn->query("SELECT COUNT(*) AS total_items FROM stock");
    $row = $result->fetch_assoc();

    return $row['total_items'];
}


function calculateItemsLowInStock() {
    global $conn;

    $sql = "SELECT COUNT(*) AS items_low_in_stock FROM stock WHERE status = 'low in stock'";
    error_log("SQL Query: " . $sql);

    $result = $conn->query($sql);

    if (!$result) {
        error_log("SQL Error: " . $conn->error);
        return 0; 
    }

    $row = $result->fetch_assoc();
    error_log("Query Result: " . json_encode($row));

    return isset($row['items_low_in_stock']) ? $row['items_low_in_stock'] : 0;
}


?>
