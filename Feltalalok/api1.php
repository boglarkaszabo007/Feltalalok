<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Adatbázis kapcsolódás
$host = "localhost";
$dbname = "feltalalok";
$user = "feltalalok";
$pass = "feltalalok2026.";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) die(json_encode(["error" => "Connection failed: ".$conn->connect_error]));

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents("php://input"), true);

// Nethely trükk: POST + _method
if($method === 'POST' && isset($input['_method'])) {
    $method = strtoupper($input['_method']);
}

switch($method) {

    // LISTA (READ)
    case 'GET':
        $result = $conn->query("SELECT * FROM kutato ORDER BY fkod");
        $rows = [];
        while($row = $result->fetch_assoc()) $rows[] = $row;
        echo json_encode($rows);
        break;

    // ÚJ rekord (CREATE)
    case 'POST':
        $nev = $conn->real_escape_string($input['nev']);
        $szul = isset($input['szul']) && $input['szul'] !== null ? intval($input['szul']) : "NULL";
        $meghal = isset($input['meghal']) && $input['meghal'] !== null ? intval($input['meghal']) : "NULL";

        // Következő FKOD meghatározása
        $res = $conn->query("SELECT MAX(fkod) AS maxFkod FROM kutato");
        $row = $res->fetch_assoc();
        $nextFkod = ($row['maxFkod'] !== null ? intval($row['maxFkod']) + 1 : 1);

        $conn->query("INSERT INTO kutato (fkod, nev, szul, meghal) VALUES ($nextFkod, '$nev', $szul, $meghal)");
        echo json_encode(["success"=>true, "fkod"=>$nextFkod]);
        break;

    // Rekord szerkesztése (UPDATE, FKOD módosítható)
    case 'PUT':
        if(!isset($input['oldFkod']) || !isset($input['newFkod'])) {
            echo json_encode(["error"=>"oldFkod vagy newFkod hiányzik"]);
            break;
        }

        $oldFkod = intval($input['oldFkod']);
        $newFkod = intval($input['newFkod']);
        $nev = $conn->real_escape_string($input['nev']);
        $szul = isset($input['szul']) && $input['szul'] !== null ? intval($input['szul']) : "NULL";
        $meghal = isset($input['meghal']) && $input['meghal'] !== null ? intval($input['meghal']) : "NULL";

        $conn->query("UPDATE kutato SET fkod=$newFkod, nev='$nev', szul=$szul, meghal=$meghal WHERE fkod=$oldFkod");
        echo json_encode(["success"=>true]);
        break;

    // Rekord törlése (DELETE)
    case 'DELETE':
        if(!isset($input['fkod'])) {
            echo json_encode(["error"=>"fkod hiányzik"]);
            break;
        }
        $fkod = intval($input['fkod']);
        $conn->query("DELETE FROM kutato WHERE fkod=$fkod");
        echo json_encode(["success"=>true]);
        break;

    default:
        echo json_encode(["error"=>"Invalid request"]);
}

$conn->close();
?>