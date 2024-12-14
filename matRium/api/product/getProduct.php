<?php
require_once '../../config/db.php';
require_once '../../config/constants.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all stock items
    $stockItems = getStockItems();
    echo json_encode(["status" => "success", "stock_items" => $stockItems]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request method."]);
exit;

function getStockItems() {
    global $conn;
    $result = $conn->query("SELECT * FROM stock");
    return $result->fetch_all(MYSQLI_ASSOC);
}
?>
