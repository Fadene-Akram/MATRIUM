function addIngredientsToRecipe($recipe_id, $ingredients) {
    global $conn;

    $query = "INSERT INTO recipe_ingredients (recipe_id, product_id, quantity) VALUES (?, ?, ?)";

    $conn->begin_transaction();

    try {
        $stmt = $conn->prepare($query);
        if ($stmt === false) {
            throw new Exception("Failed to prepare the SQL statement.");
        }

        foreach ($ingredients as $ingredient) {
            $product_id = $ingredient['product_id'];
            $quantity = $ingredient['quantity'];

            $stmt->bind_param("iii", $recipe_id, $product_id, $quantity);

            if (!$stmt->execute()) {
                throw new Exception("Failed to execute the SQL statement.");
            }
        }

        $conn->commit();

        return "Ingredients added successfully to the recipe.";
    } catch (Exception $e) {
        $conn->rollback();
        return "Error adding ingredients: " . $e->getMessage();
    }
}
