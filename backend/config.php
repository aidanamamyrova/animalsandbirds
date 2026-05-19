<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К SQL SERVER
$serverName = "DESKTOP-QQSVC8V";
$connectionInfo = array(
    "Database" => "kyrgyz_tili",
    "UID" => "app_user",
    "PWD" => "123456",
    "CharacterSet" => "UTF-8",
    "TrustServerCertificate" => true
);

// ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ
$conn = sqlsrv_connect($serverName, $connectionInfo);

// ПРОВЕРКА ПОДКЛЮЧЕНИЯ
if (!$conn) {
    echo json_encode(["error" => "Database connection failed: " . print_r(sqlsrv_errors(), true)]);
    exit();
}
?>