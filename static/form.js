$(document).ready(function(){     
    $("#myTable").dynamicTable({
          //definimos las columnas iniciales    
          columns: [{
                text: "Proyecto",
                key: "project"
            },
            {
                text: "Tarea",
                key: "task"
            },
            {
                text: "Descripción",
                key: "description"
            },
            {
                text: "Horas",
                key: "hours"
            },  
            {
                text: "Fecha",
                key: "date"
            },      
          ],
   
          //carga de datos
          data: [{
                project: 'project1',
                task: 'tarea 1',
                description: 'descripcion 1',
                hours: 4 ,
                date:'12/03/2022'   
            },
            {
                project: 'project2',
                task: 'tarea 2',
                description: 'descripcion 2',
                hours: 6 ,
                date:'11/03/2022'
            },
            {
                project: 'project1',
                task: 'tarea 3',
                description: 'descripcion 3',
                hours: 6 ,
                date:'12/07/2022'
            }
          ],
  
          //definición de botones
          buttons: {
              addButton: '<input type="button" value="Nuevo" class="btn btn-success" />',
              cancelButton: '<input type="button" value="Cancelar" class="btn btn-primary" />',
              deleteButton: '<input type="button" value="Borrar" class="btn btn-danger" />',
              editButton: '<input type="button" value="Editar" class="btn btn-primary" />',
              saveButton: '<input type="button" value="Guardar" class="btn btn-success" />',
          },
          showActionColumn: true,
          //condicionales
          getControl: function (columnKey) {
              if (columnKey == "hours") {
                return '<input type="number" class="form" />';
              }
  
              if (columnKey == "project") {
                return '<select class="form"><option value="project1">Projecto 1</option><option value="project2">Projecto 2</option></select>';
              }
  
              return '<input type="text" class="form" />';
          }
  
      });	    
  });    