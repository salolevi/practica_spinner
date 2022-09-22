// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

const jwt = localStorage.getItem('jwt');
const btnCerrarSesion = document.getElementById('closeApp');
const formCrearTarea = document.querySelector('.nueva-tarea');
const nuevaTarea = document.querySelector('#nuevaTarea');

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */

/* ---------------- variables globales y llamado a funciones ---------------- */



/* -------------------------------------------------------------------------- */
/*                          FUNCIÓN 1 - Cerrar sesión                         */
/* -------------------------------------------------------------------------- */

btnCerrarSesion.addEventListener('click', function(event) {

});

/* -------------------------------------------------------------------------- */
/*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
/* -------------------------------------------------------------------------- */

function obtenerNombreUsuario() {


};


/* -------------------------------------------------------------------------- */
/*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
/* -------------------------------------------------------------------------- */

function consultarTareas() {
  const URL = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
  const config = {
    headers: {
      "Authorization": jwt
    }
  }
  fetch(URL, config)
    .then(res => res.json())
    .then(tareas => {
      renderizarTareas(tareas)
      const deleteButtons = document.querySelectorAll('.borrar');
      console.log(deleteButtons);
      deleteButtons.forEach(button => {
        button.addEventListener('click', function(ev) {
          const id = ev.target.getAttribute('id');
          botonBorrarTarea(id);
        })
      })
    })
};


/* -------------------------------------------------------------------------- */
/*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
/* -------------------------------------------------------------------------- */

formCrearTarea.addEventListener('submit', function (event) {
  const URL = 'https://ctd-todo-api.herokuapp.com/v1/tasks'
  event.preventDefault();

  const config2 = {
    method : "POST",
    headers : {
      "Content-Type":"application/json",
      "authorization": jwt
    }
  }


  config2.body = JSON.stringify({
    "description" : nuevaTarea.value,
    "completed" : false
  });

  fetch(URL,config2)
  .then(response => response.json())
  .then(data=> {
    consultarTareas();
  })
});


/* -------------------------------------------------------------------------- */
/*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
/* -------------------------------------------------------------------------- */
function renderizarTareas(listado) {
  
  const tareasPendientesDiv = document.querySelector('.tareas-pendientes');
  const tareasTerminadasDiv = document.querySelector('.tareas-terminadas');
  console.log(tareasPendientesDiv);
  console.log(tareasTerminadasDiv);

  tareasPendientesDiv.innerHTML = '';
  tareasTerminadasDiv.innerHTML = '';

  const tareasPendientesFragment = document.createDocumentFragment();
  const tareasTerminadasFragment = document.createDocumentFragment();

  const crearTareaFinalizada = (tarea) => {
    const taskToRender = document.createElement('li');
    taskToRender.classList.add('tarea');
    taskToRender.setAttribute('data-aos', 'fade-up');
        taskToRender.innerHTML = `<div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <div class="cambios-estados">
            <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
            <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>`;

    return taskToRender;
  }
    
const crearTareaPendiente = (tarea) => {
  const taskToRender = document.createElement('li');
  taskToRender.classList.add('tarea');
  taskToRender.setAttribute('data-aos', 'fade-down');
  taskToRender.innerHTML = `
    <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
    <div class="descripcion">
      <p class="nombre">${tarea.description}</p>
      <p class="timestamp">${tarea.createdAt}</p>
    </div>
  `

  return taskToRender;
;
}
listado.forEach(tarea => {
  if (tarea.completed) {
    const tareaFinalizada = crearTareaFinalizada(tarea);
    tareasTerminadasFragment.appendChild(tareaFinalizada);
  } else {
    const tareaPendiente = crearTareaPendiente(tarea);
    tareasPendientesFragment.appendChild(tareaPendiente);
  }

  tareasPendientesDiv.appendChild(tareasPendientesFragment);
  tareasTerminadasDiv.append(tareasTerminadasFragment);
})

};

/* -------------------------------------------------------------------------- */
/*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
/* -------------------------------------------------------------------------- */
function botonesCambioEstado() {


}


/* -------------------------------------------------------------------------- */
/*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
/* -------------------------------------------------------------------------- */
function botonBorrarTarea(id) {
  const BASE_URL = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
  const URL = `${BASE_URL}/${id}`;

  const config = {
    method: 'DELETE',
    headers: {
      "authorization": jwt
    }
  }

  fetch(URL, config)
  .then(res => {
    consultarTareas();
  })

};


consultarTareas();
