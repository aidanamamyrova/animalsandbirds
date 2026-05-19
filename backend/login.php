<?php
session_start();
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Электрондук почта жана сырсөздү толтуруңуз"]);
    exit();
}

$sql = "SELECT id, first_name, last_name, school, class, email, password, role FROM users WHERE email = ?";
$params = array($email);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "SQL error"]);
    exit();
}

$user = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_school'] = $user['school'];
    $_SESSION['user_class'] = $user['class'];
    $_SESSION['user_role'] = $user['role'];
    
    echo json_encode([
        "success" => true, 
        "message" => "Кош келиңиз, " . $user['first_name'] . "!",
        "user" => [
            "id" => $user['id'],
            "name" => $user['first_name'] . ' ' . $user['last_name'],
            "email" => $user['email'],
            "school" => $user['school'],
            "class" => $user['class'],
            "role" => $user['role']
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Электрондук почта же сырсөз туура эмес"]);
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>