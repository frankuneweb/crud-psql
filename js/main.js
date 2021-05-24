$(function(){

   function burguer() {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
   
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
   
         // Add a click event on each of them
         $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
   
               // Get the target from the "data-target" attribute
               const target = el.dataset.target;
               const $target = document.getElementById(target);
   
               // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
               el.classList.toggle('is-active');
               $target.classList.toggle('is-active');
   
            });
         });
      }
   }


   function cargaProvs() {
      const provs = $("#provs");
      $.get("includes/providers.php",function(data){
         provs.html(data);
         modals_edits = $(".editar");
         modals_edits.each(function(){
            $(this).click(function(){
               modal_editar.toggleClass("is-active");
               let id = $(this).attr("data-id");
               $.get("includes/edit.php", {id: id}, function(data){
                  data_prov = JSON.parse(data)
                  $("#modal-editar [name=nombre]").val(data_prov.nombre);
                  $("#modal-editar [name=rif]").val(data_prov.rif);
                  $("#modal-editar [name=direccion]").val(data_prov.direccion);
                  $("#modal-editar [name=telefono]").val(data_prov.telefono);
                  $("#modal-editar [name=id]").val(data_prov.id);
               })
            })
         })
         
      })
   }

   function notice(msj, color) {
      notis.html(msj)
            .removeClass("is-hidden")
            .toggleClass(color)
            .delay(4000)
            .hide("slow")
   }

   // selecciones
   const agregar_prov = $("#agregar-prov");
   const modal_agregar = $("#modal-agregar");
   const modal_editar = $("#modal-editar");
   const modals_closes = $(".modal-close");
   const guardar = $("#guardar");
   const editar = $("#editar");
   const notis = $("#notis");
   let modals_edits;

   // Carga d|e proveedores

   agregar_prov.on("click",function(){
      modal_agregar.toggleClass("is-active");
   })

   // Modal agregar prov

   modals_closes.each(function(){
      $(this).click(function(){
         $(this).parent().removeClass("is-active");
      })
   }) 

   guardar.on("click",function(){
      let nombre = $("#modal-agregar [name=nombre]").val();
      let rif = $("#modal-agregar [name=rif]").val();
      let direccion = $("#modal-agregar [name=direccion]").val();
      let telefono = $("#modal-agregar [name=telefono]").val();

      if(nombre != "" || rif != "" || direccion != "" || telefono != "") {
         const data_prov = $("#guarda-prov").serialize();
         $.post("includes/add.php", data_prov, function(resp){
            if(resp == "1") {
               modal_agregar.toggleClass("is-active");
               cargaProvs();
               $("#modal-agregar [name=nombre]").val("");
               $("#modal-agregar [name=rif]").val("");
               $("#modal-agregar [name=direccion]").val("");
               $("#modal-agregar [name=telefono]").val("");
               notice("Registro insertado exitoso.","is-success");
            }
         })
      }
   })

   editar.on("click",function(){
      let id = $("#modal-editar [name=id]").val();
      let nombre = $("#modal-editar [name=nombre]").val();
      let rif = $("#modal-editar [name=rif]").val();
      let direccion = $("#modal-editar [name=direccion]").val();
      let telefono = $("#modal-editar [name=telefono]").val();

      if(nombre != "" || rif != "" || direccion != "" || telefono != "") {
         const data_prov = $("#edita-prov").serialize();
         $.post("includes/edit.php", data_prov, function(resp){
            console.log(resp);
            if(resp == "1") {
               modal_editar.toggleClass("is-active");
               cargaProvs();
               notice("Registro actualizado","is-success");
            }
         })
      }
   })


   burguer();

   cargaProvs();
})
   


 