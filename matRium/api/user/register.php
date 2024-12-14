 <?php

// require_once '../../config/db.php';
// require_once '../../config/constants.php';

// function registerUser($username, $password, $role, $email) {
//     global $conn;

//     $hashed_password = password_hash($password, PASSWORD_BCRYPT);
//     $fingerprint = generateDeviceFingerprint();

//     $stmt = $conn->prepare("SELECT user_id FROM users WHERE username = ?");
//     $stmt->bind_param("s", $username);
//     $stmt->execute();
//     $stmt->store_result();

//     if ($stmt->num_rows > 0) {
//         echo json_encode(["status" => "username_exists"]);
//         return;
//     }

//     $stmt = $conn->prepare("INSERT INTO users (username, password, user_role, email) VALUES (?, ?, ?, ?)");
//     $stmt->bind_param("ssss", $username, $hashed_password, $role, $email);

//     if ($stmt->execute()) {
//         $user_id = $stmt->insert_id;
//         $stmt = $conn->prepare("INSERT INTO devices (user_id, fingerprint) VALUES (?, ?)");
//         $stmt->bind_param("is", $user_id, $fingerprint);
//         $stmt->execute();

//         $_SESSION['user_id'] = $user_id;
//         $_SESSION['username'] = $username;
//         $_SESSION['role'] = $role;

//         echo json_encode(["status" => "success"]);
//     } else {
//         echo json_encode(["status" => "error"]);
//     }
// }

?> 