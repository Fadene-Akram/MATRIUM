<?php
require_once '../../config/db.php';
require_once '../../config/constants.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data['name'] ?? null;
    $description = $data['description'] ?? null;
    $created_by = $data['created_by'] ?? null;

    if (!$name || !$description || !$created_by) {
        echo json_encode(["error" => "Missing required fields."]);
        exit;
    }

    $recipe_id = addRecipe($name, $description, $created_by);

    if (is_numeric($recipe_id)) {
        echo json_encode(["message" => "Recipe added successfully.", "recipe_id" => $recipe_id]);
    } else {
        echo json_encode(["error" => $recipe_id]); 
    }
    exit;
}

echo json_encode(["error" => "Invalid request method"]);
exit;

function addRecipe($name, $description, $created_by) {
    global $conn;

    $stmt = $conn->prepare("INSERT INTO recipe (name, description, created_by) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $name, $description, $created_by);

    if ($stmt->execute()) {
        return $conn->insert_id; 
    } else {
        return "Error adding recipe: " . $stmt->error; 
    }
}
?>
