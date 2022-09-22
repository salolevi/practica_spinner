window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
   
    const nombreInput = document.getElementById('inputNombre');
    const apellidoInput = document.getElementById('inputApellido');
    const emailInput = document.getElementById('inputEmail');
    const passwordInput = document.getElementById('inputPassword');
    const password2Input = document.getElementById('inputPasswordRepetida');

    const form = document.querySelector('form');

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        mostrarSpinner();
        event.preventDefault();
        if (passwordInput.value !== password2Input.value) {
            document.querySelector('.error').innerHTML = 'Las contraseñas no coinciden.';
        } else {
            const userInfo = {
                firstName: nombreInput.value,
                lastName: apellidoInput.value,
                email: emailInput.value,
                password: passwordInput.value
            }
    
            const url = 'https://ctd-todo-api.herokuapp.com/v1/users';
    
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            }
            
            fetch(url, config)
                .then(res => {
                    if (res.status === 201)
                    return res.json()
                    else {
                        ocultarSpinner();
                        throw new Error('XD');
                    }
                })
                .then(data => {
                    console.log(data);
                    if (data.jwt) {
                        localStorage.setItem('jwt', data.jwt);
                        window.location.replace('/mis-tareas.html');
                    }
                })
        }

        
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        




    };


});