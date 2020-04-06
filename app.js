// Seleccionar evento: desde el documento voy a seleccionar un elemento desde su ID en este caso es FORMATAREAS
// Ya quiero acceder al evento de este formulario que en este caso es submit

document.getElementById("formatareas").addEventListener("submit", saveTask);

// Cuando presione el evento submit se ejecutará la siguiente acción
// La (e) es capturar el evento que simplemente es información

function saveTask(e) {
  // ahora necesitamos obtener el valor del titulo, o la tarea que se va a ingresar por eso se usa el .value
  let title = document.getElementById("title").value;
  // ahora necesitamos obtener el valor de la descripción, o la descripción que se va a ingresar por eso se usa el .value
  let description = document.getElementById("description").value;
  //  ahora necesitamos obtener el valor de la fecha
  let date = document.getElementById("date").value;
  //  ahora necesitamos obtener el valor de la hora
  let time = document.getElementById("time").value;
  console.log(time);
  // Obtener un objeto o tarea
  let task = {
    title,
    description,
    date,
    time
  };
  // Ahora se almacenan los datos en local storage del navegador
  // Si en el localStogare existe un valor llamado TASKS y es igual a null se empiezan a crear tareas
  if (localStorage.getItem("tasks") === null) {
    let tasks = [];
    tasks.push(task);
    // Se almacena en el localstore y se convierte en un formato de string
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    // Cuando está actualizado se vuelve a almacenar
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  //  Ahora al tomar la tarea se reiniciará el formulario
  getTasks();
  document.getElementById("formatareas").reset();

  //   para prevenir que la página refresque por defecto
  e.preventDefault();
}
// Con la siguiente función se buscará un titulo y lo eliminará
function deleteTask(title) {
  console.log(title);
  //   Tareas
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  //   Recorrer tareas
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("tasks");
  tasksView.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    // Cree una variable title que va a almacenar el valor del indice i con su propiedad tittle
    // Y lo mismo para la descripcion
    // Lo que se hace es obtener el titulo y la descripcion de una tarea individual
    let title = tasks[i].title;
    let description = tasks[i].description;
    let date = tasks[i].date;
    let time = tasks[i].time;
    // Y ahora voy a mostrar todo por la interfaz
    // Y el botón ejecutará la función delete task
    tasksView.innerHTML += `<div class="card mb-3  cardtareas">
        <div class="card-body">
        <p class= "titulotarea"> ${title} </p>
        <p class= "fecha"> <b> Fecha: </b> ${date} </p>
        <p class= "hora"> <b> Hora: </b> ${time}  </p>
          <p class= "descripciontarea"> <b>Descripción: </b> ${description}

          <a href="#" onclick="deleteTask('${title}')" class="btn btn-sm btn-block mt-3 botoneliminar">Eliminar</a>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
