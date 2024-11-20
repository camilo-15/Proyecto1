// Importar módulo para manejo de archivos
const fs = require('fs');

// Función para guardar usuarios en un archivo JSON
function guardarUsuariosEnArchivo() {
    fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2));
    console.log('Usuarios guardados en usuarios.json');
}

// Función para cargar usuarios desde un archivo JSON
function cargarUsuariosDesdeArchivo() {
    try {
        const data = fs.readFileSync('usuarios.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('No se pudo cargar usuarios. Archivo vacío o no existe.');
        return [];
    }
}

// Sección de usuarios simulada cargada desde el archivo JSON
let usuarios = cargarUsuariosDesdeArchivo();

// Función para mostrar u ocultar secciones
function mostrarSeccion(seccion) {
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');
    const calcSection = document.getElementById('calcSection');

    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
    calcSection.style.display = 'none';

    if (seccion === 'login') loginSection.style.display = 'block';
    else if (seccion === 'register') registerSection.style.display = 'block';
    else if (seccion === 'calc') calcSection.style.display = 'block';
}

// Mostrar sección de registro
document.getElementById('goToRegister').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarSeccion('register');
});

// Mostrar sección de login
document.getElementById('goToLogin').addEventListener('click', function(e) {
    e.preventDefault();
    mostrarSeccion('login');
});

// Clasificación de fuerza de contraseña
function clasificarFuerzaContraseña(password) {
    const passwordStrengthMessage = document.getElementById('password-strength-message');
    const registerButton = document.getElementById('register-btn');

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

// Evento de input en contraseña
document.getElementById('register-password').addEventListener('input', function() {
    const password = document.getElementById('register-password').value;
    clasificarFuerzaContraseña(password);
});

// Registro de usuarios
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (clasificarFuerzaContraseña(password) !== 'buena') return;

    if (!usuarios.some(user => user.username === username)) {
        usuarios.push({ username, password });
        guardarUsuariosEnArchivo();
        alert('Usuario registrado con éxito.');
        mostrarSeccion('login');
    } else {
        alert('El usuario ya existe.');
    }
});

// Validación de login
function validarLogin(username, password) {
    const usuario = usuarios.find(user => user.username === username);
    return usuario && usuario.password === password;
}

// Ingreso de usuario
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (validarLogin(username, password)) {
        alert('Ingreso exitoso');
        mostrarSeccion('calc');
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Ordenamiento de usuarios (Bubble Sort)
function ordenarUsuariosPorNombre() {
    for (let i = 0; i < usuarios.length - 1; i++) {
        for (let j = 0; j < usuarios.length - i - 1; j++) {
            if (usuarios[j].username > usuarios[j + 1].username) {
                let temp = usuarios[j];
                usuarios[j] = usuarios[j + 1];
                usuarios[j + 1] = temp;
            }
        }
    }
    guardarUsuariosEnArchivo();
    alert('Usuarios ordenados correctamente por nombre.');
}

// Búsqueda de usuario
function buscarUsuario(username) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].username === username) {
            return usuarios[i];
        }
    }
    return null;
}

// Ejemplo de uso de búsqueda
document.getElementById('search-user-btn').addEventListener('click', function() {
    const username = prompt('Introduce el nombre de usuario a buscar:');
    const user = buscarUsuario(username);

    if (user) {
        alert(`Usuario encontrado: ${user.username}`);
    } else {
        alert('Usuario no encontrado.');
    }
});

// Mostrar la sección de login al inicio
mostrarSeccion('login');
