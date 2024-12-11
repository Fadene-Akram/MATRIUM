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

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php"); // Redirect to login page if not logged in
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MRP System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        h1 {
            margin-bottom: 20px;
        }
        .menu {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        .menu a {
            text-decoration: none;
            color: white;
            background-color: #007bff;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 18px;
            transition: background-color 0.3s ease;
        }
        .menu a:hover {
            background-color: #0056b3;
        }
        .logout {
            margin-top: 20px;
        }
        .logout a {
            text-decoration: none;
            color: white;
            background-color: red;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 18px;
            transition: background-color 0.3s ease;
        }
        .logout a:hover {
            background-color: darkred;
        }
    </style>
</head>
<body>
    <h1>Welcome to the MRP System</h1>
    <p>Hello, <?php echo htmlspecialchars($_SESSION['username']); ?>! Select an action below:</p>
    <div class="menu">
        <a href="add_to_stock.php">Add to Stock</a>
        <a href="add_to_inventory.php">Add to Inventory</a>
        <a href="view_stock.php">View Stock</a>
        <a href="view_inventory.php">View Inventory</a>
    </div>
    <div class="logout">
        <a href="logout.php">Logout</a>
    </div>
</body>
</html>
