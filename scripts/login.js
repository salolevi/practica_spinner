
/* ---------------------- obtenemos variables globales ---------------------- */

if (localStorage.getItem('jwt')) window.location.replace('/mis-tareas.html');

const loginForm = document.querySelector('form');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');




/* -------------------------------------------------------------------------- */
/*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
/* -------------------------------------------------------------------------- */
loginForm.addEventListener('submit', function (event) {
    /*
    form.addEventListener("submit", (e) => {
                // Esta función se ejecuta cuando se realiza el submit del formulario
                e.preventDefault();
                
                // Aquí podemos mostrar el spinner para indicar a la persona que se
                // ha iniciado el proceso de registro
                mostrarSpinner();
                
                // Realizamos algunas validaciones de los datos ingresados
                const nombreValido = validarNombre(nombre.value);
                const contrValido = validarContrasenia(
                    contrasenia.value,
                    repetirContrasenia.value
                );
                const emailValido = validarEmail(email.value);
                
                if (nombreValido && contrValido && emailValido) {
                    const datosUsuario = new DatosUsuario();
                    datosUsuario.setFirstname(nombre.value);
                    datosUsuario.setLastname("DH");
                    datosUsuario.setPassword(contrasenia.value);
                    datosUsuario.setEmail(email.value);
                
                    const url = "https://ctd-todo-api.herokuapp.com/v1";
                
                    // Realizamos el llamado a la API
                    fetch(`${url}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: datosUsuario.email,
                        firstName: datosUsuario.firstName,
                        lastName: datosUsuario.lastName,
                        password: datosUsuario.password,
                    }),
                    })
                    .then((datos) => {
                        return datos.json();
                    })
                    .then((datos) => {
                        localStorage.setItem("token", datos.jwt);
                        // Una vez obtenida la respuesta de la API, ocultamos el spinner
                        ocultarSpinner();
                        location.href = "./lista-tareas.html";
                    })
                    .catch((err) => {
                        console.log(err);
                        // Ocultamos el spinner en caso de error
                        ocultarSpinner();
                    });
                } else {
                    // Si alguno de los campos es incorrecto, ocultamos el spinner
                    ocultarSpinner();
                }
                });
                };
    */
    event.preventDefault();
    mostrarSpinner();
    const email = inputEmail.value;
    const password = inputPassword.value;

    const bodyConfig = {
        email,
        password
    }
    const config = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(bodyConfig)
    }
      
    realizarLogin(config);
});


/* -------------------------------------------------------------------------- */
/*                     FUNCIÓN 2: Realizar el login [POST]                    */
/* -------------------------------------------------------------------------- */
function realizarLogin(settings) {

    const URL = `https://ctd-todo-api.herokuapp.com/v1/users/login`;

    fetch(URL, settings)
    .then(res => {
        console.log(res);
        if (res.status !== 404) return res.json()
        else {
            ocultarSpinner();
            alert('datos incorrectos');
            throw new Error("XD");
        }
    })
    .then(data => {
        localStorage.setItem('jwt',data.jwt);
        window.location.replace(`/mis-tareas.html`);
    })
    
};
