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
