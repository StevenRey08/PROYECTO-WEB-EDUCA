/**
 * storage.js
 * Capa de abstracción para el almacenamiento local.
 * Proporciona métodos genéricos y seguros para leer, guardar y eliminar datos,
 * actuando como nuestra base de datos offline principal (inspirado en Avomedidas).
 */

/**
 * Lee y parsea los datos almacenados bajo una clave.
 * @param {string} clave - La clave bajo la cual están guardados los datos.
 * @returns {any|null} Los datos parseados o null si no existen/hay error.
 */
export const leer = (clave) => {
    try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
    } catch (error) {
        console.error(`Error leyendo de localStorage (${clave}):`, error);
        return null;
    }
};

/**
 * Guarda y serializa los datos bajo una clave específica.
 * @param {string} clave - La clave a utilizar en localStorage.
 * @param {any} datos - Los datos que se van a guardar (objetos, arrays, etc.).
 * @returns {boolean} True si se guardó con éxito, False en caso contrario.
 */
export const guardar = (clave, datos) => {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
        return true;
    } catch (error) {
        console.error(`Error guardando en localStorage (${clave}):`, error);
        return false;
    }
};

/**
 * Elimina los datos asociados a una clave.
 * @param {string} clave - La clave a eliminar de localStorage.
 * @returns {boolean} True si se eliminó con éxito, False en caso contrario.
 */
export const eliminar = (clave) => {
    try {
        localStorage.removeItem(clave);
        return true;
    } catch (error) {
        console.error(`Error eliminando de localStorage (${clave}):`, error);
        return false;
    }
};
