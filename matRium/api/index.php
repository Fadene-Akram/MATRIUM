<?php
require_once '../config/db.php';
require_once '../api/product/functions.php';
require_once '../api/product/addProduct.php';
require_once '../api/product/getProduct.php';
require_once '../api/user/authenticate.php';
require_once '../api/user/register.php';
require_once '../api/recipe/getRecipe.php';
require_once '../api/recipe/addRecipe.php';
require_once '../api/user/getUsers.php'; 

// Set headers for the API
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Parse the endpoint and method
$endpoint = $_GET['endpoint'] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
error_log("Endpoint value: " . $endpoint);

switch ($method) {
    // Handle GET requests
    case 'GET':
        if ($endpoint === 'getUsers') {
            // Return all users
            echo json_encode(getAllUsers()); 
            exit;
        }

        if ($endpoint === 'getRecipes') {
            echo json_encode(getRecipes());
            exit;
        }

        if ($endpoint === 'getStockItems') {
            // Return all stock items
            echo json_encode(getStockItems());
            exit;
        }

        if ($endpoint === 'categories') {
            $categories = calculateStockCategories();
            echo json_encode(["status" => "success", "total_categories" => $categories]);
            exit;
        }

        if ($endpoint === 'stock_value') {
            $stock_value = calculateStockValue();
            echo json_encode(["status" => "success", "total_value" => $stock_value]);
            exit;
        }
        if ($endpoint === 'total_items') {
            $total_items = calculateTotalItems();
            echo json_encode(["status" => "success", "total_items" => $total_items]);
            exit;
        }

        if ($endpoint === 'items_low_in_stock') {
            $low_in_stock = calculateItemsLowInStock();
            echo json_encode(["status" => "success", "low_in_stock" => $low_in_stock]);
            exit;
        }
        
        

        break;

    case 'POST':
        if ($endpoint === 'addUser') {
            $data = json_decode(file_get_contents("php://input"), true);
            echo json_encode(registerNewUser($data['username'], $data['password'], $data['user_role'], $data['mac_address']));
            exit;
        }

        if ($endpoint === 'addRecipe') {
            $data = json_decode(file_get_contents("php://input"), true);
            echo json_encode(addRecipe($data['name'], $data['description'], $data['created_by']));
            exit;
        }

        if ($endpoint === 'addProduct') {
            $data = json_decode(file_get_contents("php://input"), true);
            echo json_encode(addStockItem($data['product_name'], $data['category'], $data['qty_purchased'], $data['unit_price'], $data['supplier'], $data['image']));
            exit;
        }

        if ($endpoint === 'authenticateAdmin') {
            $data = json_decode(file_get_contents("php://input"), true);
            echo json_encode(authenticateAdmin($data['username'], $data['password']));
            exit;
        }
        
        break;

    case 'PUT':
        break;

    case 'DELETE':
        break;

    case 'OPTIONS':
        break;

    default:
        echo json_encode(["error" => "Invalid request method or endpoint"]);
        exit;
}

?>
