/**
 * login.js
 * Módulo encargado de gestionar la lógica de inicio de sesión.
 */

// Importamos la interfaz de Auth de la base de datos simulada (Parte 4)
import { AuthAPI, inicializarDB } from '../../services/db.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 0. Medida de seguridad: Si el usuario llega aquí (ej. usando el botón "Atrás" del navegador),
    // destruimos inmediatamente cualquier sesión activa para forzar un nuevo inicio de sesión.
    sessionStorage.removeItem('usuario_activo');

    // 1. Aseguramos que la DB esté inicializada antes de intentar hacer login
    // Esto garantiza que exista el usuario "admin@educa.com" por defecto.
    await inicializarDB();

    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('clave');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');

    // 1.5 Forzar limpieza de campos (previene que el navegador los llene al hacer "Atrás")
    form.reset();
    emailInput.value = '';
    passwordInput.value = '';

    // Lógica para mostrar/ocultar contraseña
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Cambiar el icono (Ojo tachado o normal)
        if (type === 'text') {
            eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>';
        } else {
            eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>';
        }
    });

    /**
     * Muestra un mensaje de error en la interfaz
     * @param {string} msg - El mensaje a mostrar
     */
    const showError = (msg) => {
        errorMessage.textContent = msg;
        errorMessage.style.display = 'block';
    };

    /**
     * Oculta el mensaje de error
     */
    const hideError = () => {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    };

    // Manejador del envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitamos que la página se recargue (comportamiento por defecto)
        hideError();

        // Extraer y limpiar los valores ingresados
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // 2. Validación básica de campos vacíos
        if (!email || !password) {
            showError('Por favor, completa todos los campos.');
            return;
        }

        try {
            // Mejorar UX: Mostrar estado de carga y bloquear botón
            submitBtn.disabled = true;
            submitBtn.textContent = 'Verificando...';

            // 3. Verificación contra la base de datos simulada (Devuelve una Promesa)
            const usuarioAutenticado = await AuthAPI.login(email, password);

            // 4. Éxito: Guardar sesión activa (usamos sessionStorage para que expire al cerrar la pestaña)
            sessionStorage.setItem('usuario_activo', JSON.stringify(usuarioAutenticado));
            
            // Redirigir a la interfaz principal (Parte 4 - Panel de Estudiantes)
            // Nota: Esta página será construida por el Desarrollador 4
            window.location.href = 'estudiantes.html';

        } catch (error) {
            // Manejo de errores: Si la promesa es rechazada (ej. credenciales incorrectas)
            showError(error.message || 'Error desconocido al intentar iniciar sesión.');
        } finally {
            // Restaurar estado del botón siempre, ya sea que haya éxito o error
            submitBtn.disabled = false;
            submitBtn.textContent = 'Iniciar Sesión';
        }
    });
});
