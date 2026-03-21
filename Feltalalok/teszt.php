<?php
$servername = "localhost";  // Nethelyen gyakran localhost
$username = "apexracing"; // DB felhasználó
$password = "Beyond2025.";  // DB jelszó
$dbname = "apexracing";    // DB neve

$conn = new mysqli($servername, $username, $password, $dbname);

// Ellenőrzés
if ($conn->connect_error) {
    die("Kapcsolódási hiba: " . $conn->connect_error);
} else {
    echo "Sikeres kapcsolódás az adatbázishoz!";
}
?>