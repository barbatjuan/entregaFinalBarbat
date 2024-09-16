document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');

    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    if (loggedIn) {
        loginContainer.style.display = 'none';
        mainContent.style.display = 'block';
    } else {

        loginContainer.style.display = 'flex';
        mainContent.style.display = 'none';
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'juan' && password === 'juan') {

            Swal.fire({
                title: 'Éxito',
                text: 'Inicio de sesión exitoso.',
                confirmButtonText: 'Continuar',
                customClass: {
                    container: 'swal2-container-custom',
                    popup: 'swal2-popup-custom',
                    title: 'swal2-title-custom',
                    content: 'swal2-content-custom',
                    confirmButton: 'swal2-confirm-custom',
                    popup: 'swal3-popup'
                },
                imageUrl: './../../assets/images/logincat.png',
                imageWidth: 200,
                imageAlt: 'Logo de Raciones Caninas',
                timer: 1500,
            }).then(() => {

                localStorage.setItem('loggedIn', 'true');
                loginContainer.style.display = 'none';
                mainContent.style.display = 'block';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Usuario o contraseña incorrectos.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                customClass: {
                    container: 'swal2-container-custom',
                    popup: 'swal2-popup-custom',
                    title: 'swal2-title-custom',
                    content: 'swal2-content-custom',
                    confirmButton: 'swal2-confirm-custom',
                    popup: 'swal2-popup'
                },
                imageUrl: './../../assets/images/logo rc.jpg',
                imageWidth: 200,
                imageAlt: 'Logo de Raciones Caninas',
            });
        }
    });
});
