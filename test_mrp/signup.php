<?php
session_start();
include 'database.php';

// Generate CSRF token if not set
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup'])) {
    if (hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);
        $role = trim($_POST['role']);
        $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);

        if ($username && $password && $role && $email) {
            if (registerUser($username, $password, $role, $email)) {
                $_SESSION['username'] = $username;
                header('Location: index.php'); // Redirect to index page after signup
                exit;
            } else {
                $error = "Error registering user. Username might already exist.";
            }
        } else {
            $error = "Please fill in all fields correctly.";
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
    <title>Sign Up</title>
</head>
<body>
    <h2>Sign Up</h2>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="POST" action="signup.php">
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        <label for="username">Username:</label>
        <input type="text" name="username" required><br>
        <label for="password">Password:</label>
        <input type="password" name="password" required><br>
        <label for="role">Role:</label>
        <select name="role" required>
            <option value="manager">Manager</option>
            <option value="agent">Agent</option>
        </select><br>
        <label for="email">Email:</label>
        <input type="email" name="email" required><br>
        <button type="submit" name="signup">Sign Up</button>
    </form>
    <p><a href="login.php">Login</a></p>
</body>
</html>
