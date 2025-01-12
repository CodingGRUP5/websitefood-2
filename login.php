<?php
// Initialize variables
$username = $password = "";
$username_err = $password_err = "";

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validate username
    if (empty($_POST["username"])) {
        $username_err = "Username is required.";
    } else {
        $username = trim($_POST["username"]);
    }

    // Validate password
    if (empty($_POST["password"])) {
        $password_err = "Password is required.";
    } else {
        $password = trim($_POST["password"]);
    }

    // If no errors, check credentials
    if (empty($username_err) && empty($password_err)) {
        // Normally, you would fetch the user from a database.
        // For simplicity, let's hardcode a username and password.
        $valid_username = "user123";
        $valid_password = "password123"; // In a real-world scenario, this should be hashed.

        if ($username == $valid_username && $password == $valid_password) {
            // Redirect to dashboard or home page if credentials are correct
            header("location: dashboard.php");
            exit();
        } else {
            // Set error message if login fails
            $username_err = "Invalid username or password.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }
        .login-container h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        .login-container .form-group {
            margin-bottom: 15px;
        }
        .login-container .form-group input {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        .login-container .form-group span {
            color: red;
            font-size: 0.9em;
        }
        .login-container .btn {
            background-color: #092215;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            width: 100%;
            font-size: 1.1em;
            cursor: pointer;
        }
        .login-container .btn:hover {
            background-color: #2d5023;
        }
        .login-container .forgot-password {
            text-align: right;
            margin-top: 10px;
        }
        .login-container .forgot-password a {
            text-decoration: none;
            color: #092215;
            font-size: 0.9em;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <h2>Login</h2>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
            
            <!-- Username Field -->
            <div class="form-group">
                <input type="text" name="username" placeholder="Username" value="<?php echo $username; ?>">
                <span><?php echo $username_err; ?></span>
            </div>

            <!-- Password Field -->
            <div class="form-group">
                <input type="password" name="password" placeholder="Password">
                <span><?php echo $password_err; ?></span>
            </div>

            <!-- Login Button -->
            <button type="submit" class="btn">Login</button>

            <!-- Forgot Password Link -->
            <div class="forgot-password">
                <a href="#">Forgot password?</a>
            </div>
        </form>
    </div>

</body>
</html>
