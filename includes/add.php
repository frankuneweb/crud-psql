<?php 

   if($_POST) {
      require "conex.php";
      extract($_POST);
      $sql = "insert into proveedores values (default, '$nombre','$rif','$direccion','$telefono')";
      if(pg_query($link, $sql)) 
         echo "1";
      else
         echo "Hubo un error";
   } else {
      header("location: ../index.html");
   }
