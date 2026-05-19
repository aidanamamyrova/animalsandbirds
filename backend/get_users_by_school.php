<?php
require_once 'config.php';

$school = $_GET['school'] ?? '';
$class = $_GET['class'] ?? '';

$sql = "SELECT id, first_name, last_name, school, class, email, created_at FROM users WHERE 1=1";
$params = array();

if (!empty($school)) {
    $sql .= " AND school = ?";
    $params[] = $school;
}

if (!empty($class)) {
    $sql .= " AND class = ?";
    $params[] = $class;
}

$sql .= " ORDER BY school, class, last_name";

$stmt = sqlsrv_query($conn, $sql, $params);
$users = array();

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $users[] = $row;
}

echo json_encode(["success" => true, "users" => $users]);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>