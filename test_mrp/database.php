<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mrp";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to register a new user (signup)
function registerUser($username, $password, $role, $email) {
    global $conn;

    // Encrypt password before storing it
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Check if the username already exists
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        return "username_exists"; // Username already exists
    }

    // Insert the new user
    $stmt = $conn->prepare("INSERT INTO users (username, password, user_role, email) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $hashed_password, $role, $email);

    if ($stmt->execute()) {
        // Automatically log the user in after successful signup
        $user_id = $stmt->insert_id; // Get the new user's ID
        $_SESSION['user_id'] = $user_id;
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $role;

        return "success"; // Registration successful
    } else {
        return "error"; // Registration failed
    }
}

// Function to handle user login
function loginUser($username, $password) {
    global $conn;

    $stmt = $conn->prepare("SELECT user_id, password, user_role FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($user_id, $hashed_password, $role);
        $stmt->fetch();
        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $role;
            return true;
        }
    }
    return false;
}

// Function to check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Function to get the role of the current user
function getUserRole() {
    return isset($_SESSION['role']) ? $_SESSION['role'] : null;
}

// Function to fetch all stock items
function getStockItems() {
    global $conn;
    $result = $conn->query("SELECT * FROM stock");
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Function to fetch all inventory items
function getInventoryItems() {
    global $conn;
    $result = $conn->query("SELECT * FROM inventory");
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Function to add a new stock item
function addStockItem($product_name, $category, $qty_purchased, $unit_price, $supplier, $image) {
    global $conn; // Assuming $conn is your database connection

    // Calculate total amount
    $total_amount = $qty_purchased * $unit_price;

    // Prepare SQL query
    $sql = "INSERT INTO stock (product_name, category, qty_purchased, unit_price, total_amount, supplier, image, status, last_updated) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'available', CURRENT_TIMESTAMP)";
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param("ssiddss", $product_name, $category, $qty_purchased, $unit_price, $total_amount, $supplier, $image);

    // Execute query
    if ($stmt->execute()) {
        return true;
    } else {
        return "Error: " . $stmt->error;
    }
}

// Function to add a new inventory item
function addInventoryItem($image,$product_name, $category, $qty_available, $unit_price, $status) {
    global $conn; // Assuming $conn is your database connection

    // Calculate total amount
    $total_amount = $qty_available * $unit_price;

    // Prepare SQL query
    $sql = "INSERT INTO inventory (image,product_name, category, qty_available, unit_price, total_amount, status, last_updated) 
            VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bind_param("ssiddss", $image, $product_name, $category, $qty_available, $unit_price, $total_amount, $status);

    // Execute query
    if ($stmt->execute()) {
        return true;
    } else {
        return "Error: " . $stmt->error;
    }
}

