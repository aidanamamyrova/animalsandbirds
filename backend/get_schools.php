<?php
require_once 'config.php';

$sql = "SELECT id, name FROM schools ORDER BY name";
$stmt = sqlsrv_query($conn, $sql);
$schools = array();

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $schools[] = $row;
}

echo json_encode(["success" => true, "schools" => $schools]);

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>