function mostrarSpinner() {
  // Seleccionamos el body. Esto nos servirá para incorporar nuestro spinner
  // dentro de nuestro HTML.
  const body = document.querySelector("body");
  
  // Seleccionamos el formulario de registro para poder ocultarlo durante la carga
  const form = document.querySelector("form");
  
  // Creamos nuestro spinner
  const spinner = document.createElement("div");
  const signUpLink = document.querySelector('.ingresarA');
  signUpLink.classList.add('hidden');
  
  // Asignamos los IDs a cada nuevo elemento, para poder manipular
  // sus estilos
  spinner.setAttribute("id", "carga");
  
  // Ocultamos el formulario de registro
  form.classList.add("hidden");
  
  // Agregamos el Spinner a nuestro HTML.
  // spinnerContainer.appendChild(spinner);
  body.appendChild(spinner);
 } 

 
 function ocultarSpinner() {
  // Seleccionamos el body para poder remover el spinner del HTML.
  const body = document.querySelector("body");
  
  // Seleccionamos el formulario de registro para poder mostrarlo nuevamente
  const form = document.querySelector("form");
  
  // Seleccionamos el spinner
  const spinner = document.querySelector("#carga");
  const signUpLink = document.querySelector('.ingresarA');
  
  // Removemos el spinner del HTML
  body.removeChild(spinner);
  
  // Quitamos la clase que oculta el formulario
  form.classList.remove("hidden");
  signUpLink.classList.add('hidden');
  return;
 }

