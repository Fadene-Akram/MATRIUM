function addRecipe($name, $description, $created_by) {
    global $conn;

    $stmt = $conn->prepare("INSERT INTO recipe (name, description, created_by) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $name, $description, $created_by);

    if ($stmt->execute()) {
        return $conn->insert_id; // Return the new recipe's ID
    } else {
        return "Error adding recipe: " . $stmt->error; // Error message
    }
}
