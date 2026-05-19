<?php
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$first_name = $data['first_name'] ?? '';
$last_name = $data['last_name'] ?? '';
$school = $data['school'] ?? '';
$class = $data['class'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Валидация
if (empty($first_name) || empty($last_name) || empty($school) || empty($class) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Бардык талааларды толтуруңуз"]);
    exit();
}

// Проверка email
$sql = "SELECT id FROM users WHERE email = ?";
$params = array($email);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    echo json_encode(["success" => false, "message" => "SQL error"]);
    exit();
}

if (sqlsrv_has_rows($stmt)) {
    echo json_encode(["success" => false, "message" => "Бул электрондук почта буга катталган"]);
    exit();
}
sqlsrv_free_stmt($stmt);

// Добавление школы если нет
$sql = "SELECT id FROM schools WHERE name = ?";
$params = array($school);
$stmt = sqlsrv_query($conn, $sql, $params);

if (sqlsrv_has_rows($stmt)) {
    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
    $school_id = $row['id'];
} else {
    sqlsrv_free_stmt($stmt);
    $sql = "INSERT INTO schools (name) VALUES (?)";
    $params = array($school);
    $stmt = sqlsrv_query($conn, $sql, $params);
    $school_id = sqlsrv_insert_id($conn);
}
sqlsrv_free_stmt($stmt);

// Добавление класса
$sql = "SELECT id FROM classes WHERE school_id = ? AND class_name = ?";
$params = array($school_id, $class);
$stmt = sqlsrv_query($conn, $sql, $params);

if (!sqlsrv_has_rows($stmt)) {
    sqlsrv_free_stmt($stmt);
    $sql = "INSERT INTO classes (school_id, class_name) VALUES (?, ?)";
    $params = array($school_id, $class);
    $stmt = sqlsrv_query($conn, $sql, $params);
}
sqlsrv_free_stmt($stmt);

// Хеширование пароля
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Создание пользователя
$sql = "INSERT INTO users (first_name, last_name, school, class, email, password) VALUES (?, ?, ?, ?, ?, ?)";
$params = array($first_name, $last_name, $school, $class, $email, $hashed_password);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt) {
    echo json_encode(["success" => true, "message" => "Каттоо ийгиликтүү аяктады!"]);
} else {
    echo json_encode(["success" => false, "message" => "Каттоодо ката кетти"]);
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>