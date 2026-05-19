<?php
$serverName = "DESKTOP-QQSVC8V";
$connectionInfo = array(
    "Database" => "kyrgyz_tili",
    "CharacterSet" => "UTF-8",
    "TrustServerCertificate" => true
);

$conn = sqlsrv_connect($serverName, $connectionInfo);

if ($conn) {
    echo "✅ Connected successfully!";
} else {
    echo "❌ Connection failed:<br>";
    $errors = sqlsrv_errors();
    foreach ($errors as $error) {
        echo $error['message'] . "<br>";
    }
}
?>