<?php
require "conex.php";

if(isset($_GET['id'])) {
   $query = pg_query($link, "select * from proveedores where id = ". $_GET['id']);
   $prov = pg_fetch_array($query);
   echo json_encode($prov);
} else if($_POST){
   extract($_POST);
   $query = pg_query($link, "update proveedores set nombre = '$nombre',
                                                    rif = '$rif',
                                                   direccion = '$direccion',
                                                   telefono = '$telefono' 
                                                   where id = $id ");
   if($query) 
      echo "1";
   else 
      echo "hubo un error";
} else {
   header("location: ../index.html");
}