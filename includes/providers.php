<?php 

   require "conex.php";

   $query = pg_query($link, "select * from proveedores order by id desc");

   if(pg_num_rows($query)): ?>

            <h2 class="title">Listado de Proveedores</h2>

            <table class="table is-striped display">
               <thead>
                  <tr>
                     <th>id</th>
                     <th>Nombre</th>
                     <th>RIF</th>
                     <th>Dirección</th>
                     <th>Teléfono</th>
                     <th> - </th>
                  </tr>
               </thead>
               <tbody>
               <?php 
               
                  while($prov = pg_fetch_array($query)): ?>

                     <tr>
                        <td><?php echo $prov['id'] ?></td>
                        <td><?php echo $prov['nombre'] ?></td>
                        <td><?php echo $prov['rif'] ?></td>
                        <td><?php echo $prov['direccion'] ?></td>
                        <td><?php echo $prov['telefono'] ?></td>               
                        <td>
                           <button class="button is-info"><i class="fas fa-eye"></i></button>
                           <button class="button is-link editar" data-id="<?php echo $prov['id'] ?>"><i class="fas fa-edit"></i></button>
                           <button class="button is-danger"><i class="fas fa-ban"></i></button>
                        </td>
                     </tr>

                  <?php
                  endwhile;
               
               ?>
               </tbody>
            </table>

   <?php

   else: ?>
      <div class="notification is-warning">No hay data</div>
   <?php
   endif

   

?>