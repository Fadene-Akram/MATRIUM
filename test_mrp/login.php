<?php
session_start();
include 'database.php';

// Generate CSRF token if not set
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    if (hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        if ($username && $password) {
            if (loginUser($username, $password)) {
                $_SESSION['username'] = $username;
                header('Location: index.php'); // Redirect to index page after login
                exit;
            } else {
                $error = "Invalid username or password.";
            }
        } else {
            $error = "Please fill in all fields.";
        }
    } else {
        $error = "Invalid CSRF token.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="POST" action="login.php">
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        <label for="username">Username:</label>
        <input type="text" name="username" required><br>
        <label for="password">Password:</label>
        <input type="password" name="password" required><br>
        <button type="submit" name="login">Login</button>
    </form>
    <p><a href="signup.php">Sign Up</a></p>
</body>
</html>
