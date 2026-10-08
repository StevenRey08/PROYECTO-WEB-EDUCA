/**
 * registro.js
 * Módulo para gestionar la lógica del formulario de registro de nuevos usuarios.
 */

// Importamos validaciones utilitarias
import { estaVacio, esEmailValido, esContrasenaSegura, contrasenasCoinciden } from '../../utils/validaciones.js';
// Importamos la API de base de datos simulada
import { AuthAPI, inicializarDB } from '../../services/db.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Aseguramos la inicialización de la base de datos
    await inicializarDB();

    const form = document.getElementById('registro-form');
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputClave = document.getElementById('clave');
    const inputClaveConfirmar = document.getElementById('clave-confirmar');
    
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    // 1. Limpieza de seguridad al cargar la página (evita autocompletado por bfcache)
    form.reset();
    inputNombre.value = '';
    inputCorreo.value = '';
    inputClave.value = '';
    inputClaveConfirmar.value = '';

    /**
     * Muestra mensaje de error y oculta éxito
     * @param {string} msg 
     */
    const mostrarError = (msg) => {
        errorMessage.textContent = msg;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    };

    /**
     * Oculta ambos mensajes de feedback
     */
    const ocultarMensajes = () => {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        ocultarMensajes();

        // Extraemos valores
        const nombre = inputNombre.value.trim();
        const correo = inputCorreo.value.trim();
        const clave = inputClave.value;
        const claveConfirmar = inputClaveConfirmar.value;

        // 2. Validaciones usando el módulo de utilidades
        if (estaVacio(nombre) || estaVacio(correo) || estaVacio(clave) || estaVacio(claveConfirmar)) {
            return mostrarError('Por favor, completa todos los campos.');
        }

        if (!esEmailValido(correo)) {
            return mostrarError('El formato del correo electrónico no es válido.');
        }

        if (!esContrasenaSegura(clave)) {
            return mostrarError('La contraseña debe tener al menos 6 caracteres.');
        }

        if (!contrasenasCoinciden(clave, claveConfirmar)) {
            return mostrarError('Las contraseñas no coinciden.');
        }

        try {
            // Estado de carga UX
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creando cuenta...';

            // 3. Crear el usuario en la DB simulada
            const usuarioNuevo = { nombre, correo, clave };
            await AuthAPI.crearUsuario(usuarioNuevo);

            // 4. Éxito
            form.reset(); // Limpiar el formulario
            successMessage.textContent = '¡Cuenta creada exitosamente! Redirigiendo al login...';
            successMessage.style.display = 'block';
            
            // Redirigir al login después de un breve momento
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } catch (error) {
            // Error al crear la cuenta (ej. correo ya existe)
            mostrarError(error.message || 'Hubo un error al intentar crear la cuenta.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrarse';
        }
    });
});
