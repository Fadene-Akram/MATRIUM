<?php
session_start();
require_once '../../config/db.php';
require_once '../../config/constants.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$action = $_GET['action'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($action === 'register') {
        $username = $data['username'];
        $password = $data['password'];
        $user_role = $data['user_role'];
        $mac_address = $data['mac_address'];

        $response = registerNewUser($username, $password, $user_role, $mac_address);
        echo json_encode(["message" => $response]);
        exit;

    } elseif ($action === 'checkAccess') {
        $mac_address = $data['mac_address'];

        $response = checkUserAccessAPI($mac_address);
        echo json_encode($response);
        exit;

    } elseif ($action === 'authenticateAdmin') {
        $username = $data['username'];
        $password = $data['password'];

        $response = authenticateAdmin($username, $password);
        echo json_encode($response);
        exit;

    } else {
        echo json_encode(["error" => "Invalid action"]);
        exit;
    }
}

echo json_encode(["error" => "Invalid request method"]);
exit;

function checkUserAccessAPI($mac_address) {
    global $conn;

    $stmt = $conn->prepare("SELECT user_id FROM users WHERE fingerprint = ?");
    $stmt->bind_param("s", $mac_address);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        return ["message" => "Access granted"];
    } else {
        return ["message" => "Access denied"];
    }
}

function registerNewUser($username, $password, $user_role, $mac_address) {
    global $conn;

    $stmt = $conn->prepare("SELECT fingerprint FROM users WHERE fingerprint = ?");
    $stmt->bind_param("s", $mac_address);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        return "This device is already registered.";
    }

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO users (username, password, user_role, fingerprint) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $hashed_password, $user_role, $mac_address);

    if ($stmt->execute()) {
        return "New user registered successfully.";
    } else {
        return "Error: " . $stmt->error;
    }
}

function authenticateAdmin($username, $password) {
    global $conn;

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND user_role = 'manager'");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $admin = $result->fetch_assoc();

        if ($password === $admin['password']) {
            return ['status' => 'success', 'admin_data' => $admin];
        } else {
            return ['status' => 'error', 'message' => 'Incorrect password!'];
        }
    } else {
        return ['status' => 'error', 'message' => 'Admin user not found!'];
    }
}

function getAllUsers() {
    global $conn;

    $stmt = $conn->prepare("SELECT user_id, username, user_role, fingerprint FROM users");
    $stmt->execute();
    
    $result = $stmt->get_result();
    $users = $result->fetch_all(MYSQLI_ASSOC);

    return $users;
}

?>
