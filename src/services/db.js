/**
 * db.js
 * Capa de Datos simulada para Proyecto Educa.
 * Todas las funciones devuelven Promesas para facilitar una futura migración a un backend real (API REST).
 * Los módulos de la aplicación SOLO deben interactuar con esta capa y NO directamente con localStorage.
 */
import { leer, guardar } from './storage.js';

const KEY_USUARIOS = 'educa_usuarios';
const KEY_ESTUDIANTES = 'educa_estudiantes';

// --- UTILIDADES PRIVADAS ---

/**
 * Genera un ID único con un prefijo simulando el patrón de Avomedidas.
 * Ejemplo: est_1234abcd_5678
 */
const generarId = (prefijo) => {
    const timePart = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 7);
    return `${prefijo}_${timePart}_${randomPart}`;
};

/**
 * Simula el delay de red y envuelve la respuesta en una Promesa.
 */
const simularRed = (datos, error = null) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (error) reject(error);
            else resolve(datos);
        }, 200); // 200ms de latencia
    });
};

/**
 * Hashea una contraseña usando Web Crypto API (SHA-256) nativo del navegador.
 * Evita guardar contraseñas en texto plano.
 */
const hashPassword = async (textoPlano) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(textoPlano);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// --- INICIALIZACIÓN ---

/**
 * Inicializa la base de datos simulada. Crea el administrador por defecto
 * y carga los estudiantes desde el archivo local JSON si no hay datos.
 */
export const inicializarDB = async () => {
    // 1. Inicializar usuario administrador asegurando que el usuario "admin" exista
    let usuarios = leer(KEY_USUARIOS);
    if (!usuarios) usuarios = [];

    // Verificamos si el usuario 'admin' ya existe, si no, lo creamos
    if (!usuarios.some(u => u.correo === 'admin')) {
        const adminPassHash = await hashPassword('admin');
        usuarios.push({
            id: generarId('usr'),
            nombre: 'Administrador Principal',
            correo: 'admin', // Se usa como nombre de usuario
            clave: adminPassHash,
            rol: 'admin',
            fechaRegistro: new Date().toISOString()
        });
        guardar(KEY_USUARIOS, usuarios);
        console.log('✅ DB Inicializada: Usuario de prueba creado (admin / admin).');
    }

    // 2. Inicializar estudiantes desde data/estudiantes.json si la colección está vacía
    let estudiantes = leer(KEY_ESTUDIANTES);
    if (!estudiantes || estudiantes.length === 0) {
        try {
            // Usamos ruta relativa segura para páginas en src/pages/
            const response = await fetch('../../data/estudiantes.json');
            if (response.ok) {
                estudiantes = await response.json();
                guardar(KEY_ESTUDIANTES, estudiantes);
                
                // Además, importamos a todos estos estudiantes como usuarios para que puedan iniciar sesión
                for (const est of estudiantes) {
                    if (est.correo && est.clave && !usuarios.some(u => u.correo === est.correo)) {
                        const hash = await hashPassword(est.clave);
                        usuarios.push({
                            id: est.id, // Reusamos su ID de estudiante para vincularlos
                            nombre: est.nombre,
                            correo: est.correo,
                            clave: hash,
                            rol: 'usuario', // Rol común
                            fechaRegistro: est.fechaRegistro
                        });
                    }
                }
                guardar(KEY_USUARIOS, usuarios); // Guardamos la colección de usuarios actualizada

                console.log('✅ DB Inicializada: Colección de estudiantes y sus credenciales cargadas desde JSON.');
            } else {
                guardar(KEY_ESTUDIANTES, []);
            }
        } catch (e) {
            console.warn('⚠️ No se pudo cargar data/estudiantes.json, iniciando colección vacía.', e);
            guardar(KEY_ESTUDIANTES, []);
        }
    }
};

// --- COLECCIÓN: USUARIOS (AUTH) ---

export const AuthAPI = {
    /**
     * Valida credenciales contra la colección de usuarios (Login)
     */
    async login(correo, claveTextoPlano) {
        const usuarios = leer(KEY_USUARIOS) || [];
        const claveHash = await hashPassword(claveTextoPlano);
        
        const usuario = usuarios.find(u => u.correo === correo && u.clave === claveHash);
        
        if (!usuario) {
            return simularRed(null, new Error('Credenciales incorrectas'));
        }
        
        // Retornamos sin la clave por seguridad
        const { clave, ...usuarioSeguro } = usuario;
        return simularRed(usuarioSeguro);
    },

    /**
     * Crea un nuevo usuario validando que el correo no exista (Registro)
     */
    async crearUsuario(datos) {
        const usuarios = leer(KEY_USUARIOS) || [];
        
        if (usuarios.some(u => u.correo === datos.correo)) {
            return simularRed(null, new Error('El correo ya está registrado'));
        }

        const claveHash = await hashPassword(datos.clave);
        
        const nuevoUsuario = {
            id: generarId('usr'),
            nombre: datos.nombre,
            correo: datos.correo,
            clave: claveHash,
            rol: 'usuario',
            fechaRegistro: new Date().toISOString()
        };

        usuarios.push(nuevoUsuario);
        guardar(KEY_USUARIOS, usuarios);
        
        const { clave, ...usuarioSeguro } = nuevoUsuario;
        return simularRed(usuarioSeguro);
    }
};

// --- COLECCIÓN: ESTUDIANTES ---

export const EstudiantesAPI = {
    async listar() {
        const estudiantes = leer(KEY_ESTUDIANTES) || [];
        return simularRed(estudiantes);
    },

    async obtenerPorId(id) {
        const estudiantes = leer(KEY_ESTUDIANTES) || [];
        const estudiante = estudiantes.find(e => e.id === id);
        if (!estudiante) return simularRed(null, new Error('Estudiante no encontrado'));
        return simularRed(estudiante);
    },

    async crear(datos) {
        const estudiantes = leer(KEY_ESTUDIANTES) || [];
        const nuevoEstudiante = {
            ...datos,
            id: generarId('est'),
            fechaRegistro: new Date().toISOString()
        };
        
        estudiantes.push(nuevoEstudiante);
        guardar(KEY_ESTUDIANTES, estudiantes);
        return simularRed(nuevoEstudiante);
    },

    async actualizar(id, cambios) {
        const estudiantes = leer(KEY_ESTUDIANTES) || [];
        const index = estudiantes.findIndex(e => e.id === id);
        
        if (index === -1) return simularRed(null, new Error('Estudiante no encontrado'));
        
        // Evitamos sobreescribir el ID o la fecha de registro original por seguridad
        const { id: _, fechaRegistro: __, ...cambiosPermitidos } = cambios;
        
        estudiantes[index] = { ...estudiantes[index], ...cambiosPermitidos };
        guardar(KEY_ESTUDIANTES, estudiantes);
        return simularRed(estudiantes[index]);
    },

    async eliminar(id) {
        let estudiantes = leer(KEY_ESTUDIANTES) || [];
        const filtrados = estudiantes.filter(e => e.id !== id);
        
        if (estudiantes.length === filtrados.length) {
            return simularRed(null, new Error('Estudiante no encontrado para eliminar'));
        }
        
        guardar(KEY_ESTUDIANTES, filtrados);
        return simularRed({ success: true, id });
    }
};
