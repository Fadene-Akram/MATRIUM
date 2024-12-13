function getStockItems() {
    global $conn;
    $result = $conn->query("SELECT * FROM stock");
    return $result->fetch_all(MYSQLI_ASSOC);
}

function getInventoryItems() {
    global $conn;
    $result = $conn->query("SELECT * FROM inventory");
    return $result->fetch_all(MYSQLI_ASSOC);
}
