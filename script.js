// Sección de usuarios simulada
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Función para mostrar u ocultar secciones
function mostrarSeccion(seccion) {
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const calcSection = document.getElementById('calcSection');

    // Ocultar todas las secciones
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
    calcSection.style.display = 'none';

    // Mostrar la sección correspondiente
    if (seccion === 'login') {
        loginSection.style.display = 'block';
    } else if (seccion === 'register') {
        registerSection.style.display = 'block';
    } else if (seccion === 'calc') {
        calcSection.style.display = 'block';
    }
}

// Mostrar sección de registro al hacer clic en 'Registrarse'
document.getElementById('goToRegister').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarSeccion('register'); // Muestra la sección de registro
});

// Mostrar sección de login al hacer clic en 'Iniciar Sesión'
document.getElementById('goToLogin').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarSeccion('login'); // Muestra la sección de login
});

// Función de clasificación de la fuerza de la contraseña
function clasificarFuerzaContraseña(password) {
    const passwordStrengthMessage = document.getElementById('password-strength-message');
    const registerButton = document.getElementById('register-btn');

    // Condiciones de fuerza de la contraseña
    if (password.length < 8) {
        passwordStrengthMessage.textContent = 'Contraseña mala: debe tener al menos 8 caracteres.';
        registerButton.disabled = true;
        return 'mala';
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
        passwordStrengthMessage.textContent = 'Contraseña media: debe contener al menos una mayúscula, una minúscula y un número.';
        registerButton.disabled = true;
        return 'media';
    }

    passwordStrengthMessage.textContent = 'Contraseña buena: cumple con todos los requisitos.';
    registerButton.disabled = false;
    return 'buena';
}

// Escuchar evento de input en el campo de la contraseña
document.getElementById('register-password').addEventListener('input', function() {
    const password = document.getElementById('register-password').value;
    clasificarFuerzaContraseña(password);
});

// Registro de usuarios
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (clasificarFuerzaContraseña(password) !== 'buena') {
        return; // No permite registrar si la contraseña no es buena
    }

    if (!usuarios.some(user => user.username === username)) {
        usuarios.push({ username, password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Usuario registrado con éxito.');
        mostrarSeccion('login'); // Redirige al login después del registro
    } else {
        alert('El usuario ya existe.');
    }
});

// Función para validar el inicio de sesión
function validarLogin(username, password) {
    const usuario = usuarios.find(user => user.username === username);

    if (usuario && usuario.password === password) {
        return true; // Login exitoso
    } else {
        return false; // Login fallido
    }
}

// Ingreso de usuario
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (validarLogin(username, password)) {
        alert('Ingreso exitoso');
        mostrarSeccion('calc'); // Redirige a la sección de cálculo de agua
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Método de ordenamiento burbuja (Bubble Sort)
function ordenarUsuariosPorNombre() {
    for (let i = 0; i < usuarios.length - 1; i++) {
        for (let j = 0; j < usuarios.length - i - 1; j++) {
            if (usuarios[j].username > usuarios[j + 1].username) {
                // Intercambiar los usuarios
                let temp = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = temp;
            }
        }
    }
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Actualizar los usuarios en localStorage
    alert('Usuarios ordenados correctamente por nombre.');
}

// Método de búsqueda secuencial
function buscarUsuario(username) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username === username) {
            return usuarios[i]; // Retorna el usuario si lo encuentra
        }
    }
    return null; // Si no lo encuentra
}

// Ejemplo de uso de la búsqueda
document.getElementById('search-user-btn').addEventListener('click', function() {
    const username = prompt('Introduce el nombre de usuario a buscar:');
    const user = buscarUsuario(username);

    if (user) {
        alert(`Usuario encontrado: ${user.username}`);
    } else {
        alert('Usuario no encontrado.');
    }
});

// Mostrar la sección de login al cargar la página inicialmente
mostrarSeccion('login');
