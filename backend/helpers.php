<?php
// Функция для получения последнего ID вставки для SQL Server
function sqlsrv_insert_id($conn) {
    $stmt = sqlsrv_query($conn, "SELECT SCOPE_IDENTITY()");
    if ($stmt === false) return false;
    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_NUMERIC);
    sqlsrv_free_stmt($stmt);
    return $row[0];
}
?>