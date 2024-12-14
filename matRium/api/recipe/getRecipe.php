<?php
require_once '../../config/db.php';
require_once '../../config/constants.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $recipes = getRecipes();

    if ($recipes) {
        echo json_encode(["status" => "success", "data" => $recipes]);
    } else {
        echo json_encode(["status" => "error", "message" => "No recipes found."]);
    }
    exit;
}

echo json_encode(["status" => "error", "message" => "Invalid request method"]);
exit;

function getRecipes() {
    global $conn;

    $stmt = $conn->prepare("
        SELECT r.recipe_id, r.name AS recipe_name, r.description, r.created_at, u.username AS created_by 
        FROM recipe r 
        JOIN users u ON r.created_by = u.user_id 
        ORDER BY r.created_at DESC
    ");
    $stmt->execute();
    $recipes = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    foreach ($recipes as &$recipe) {
        $stmt = $conn->prepare("
            SELECT s.product_name AS ingredient_name, ri.quantity 
            FROM recipe_ingredients ri
            JOIN stock s ON ri.product_id = s.product_id
            WHERE ri.recipe_id = ?
        ");
        $stmt->bind_param("i", $recipe['recipe_id']);
        $stmt->execute();
        $recipe['ingredients'] = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    return $recipes;
}
?>
