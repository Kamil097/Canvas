<?php
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
      if (isset($_GET['getalldata'])) {
          header('Content-Type: application/json');
          $files = glob('uploads/*.json');
          $data = [];
          foreach ($files as $file) {
              array_push($data, json_decode(file_get_contents($file)));
          }
          echo json_encode($data);
      } else if (isset($_GET['getsingledata'])) {
          header('Content-Type: application/json');
          $myname = $_REQUEST['getsingledata'];
          $data = json_decode(file_get_contents("uploads/$myname"));
          echo json_encode($data);
      }else if(isset($_GET['getcurrentdata'])) {
        header('Content-Type: application/json');
        $files = glob('Current/*.json');
        $data = [];
        foreach ($files as $file) {
            array_push($data, json_decode(file_get_contents($file)));
        }
        echo json_encode($data);
    }

  }
    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_GET['updatecanvas'])) {
    $myname = $_REQUEST['updatecanvas'];
    $requestPayload = file_get_contents("php://input");
    file_put_contents("uploads/".$myname, $requestPayload);
    
    array_map('unlink', glob("Current/*.json"));
    file_put_contents("Current/".$myname, $requestPayload);
  }

?>