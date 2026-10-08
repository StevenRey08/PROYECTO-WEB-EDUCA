/**
 * validaciones.js
 * Módulo de utilidades para validar datos de formularios.
 */

/**
 * Verifica si un campo está vacío o contiene solo espacios
 * @param {string} texto
 * @returns {boolean}
 */
export const estaVacio = (texto) => {
    return !texto || texto.trim().length === 0;
};

/**
 * Verifica si el correo tiene un formato válido según estándares RFC
 * @param {string} email
 * @returns {boolean}
 */
export const esEmailValido = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email.trim());
};

/**
 * Verifica si la contraseña cumple con los requisitos mínimos de seguridad.
 * En este caso: mínimo 6 caracteres.
 * @param {string} clave
 * @returns {boolean}
 */
export const esContrasenaSegura = (clave) => {
    return clave && clave.trim().length >= 6;
};

/**
 * Comprueba que la contraseña ingresada y la de confirmación sean iguales
 * @param {string} clave1
 * @param {string} clave2
 * @returns {boolean}
 */
export const contrasenasCoinciden = (clave1, clave2) => {
    return clave1 === clave2;
};
