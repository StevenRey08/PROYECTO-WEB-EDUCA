/**
 * score.js
 * Módulo encargado de gestionar el Portal del Estudiante.
 * Permite a los estudiantes nuevos ingresar su Curso, Edad y sus 4 Notas por única vez,
 * y luego muestra su panel en modo solo lectura (bloqueado).
 */

import { EstudiantesAPI, inicializarDB } from '../../services/db.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Verificación de Seguridad y Sesión
    const sesionInfo = sessionStorage.getItem('usuario_activo');
    if (!sesionInfo) {
        window.location.href = 'login.html';
        return;
    }
    
    const usuario = JSON.parse(sesionInfo);
    
    // Si es un administrador intentando entrar al perfil de estudiante, lo devolvemos a su panel
    if (usuario.rol === 'admin') {
        window.location.href = 'estudiantes.html';
        return;
    }

    // Inicializar DB por si acaso
    await inicializarDB();

    // Elementos del DOM
    const studentNameElem = document.getElementById('student-name');
    const estadoFormulario = document.getElementById('estado-formulario');
    const estadoLectura = document.getElementById('estado-lectura');
    
    // Elementos del Formulario (Estado 1)
    const form = document.getElementById('scores-form');
    const selectCurso = document.getElementById('select-curso');
    const selectEdad = document.getElementById('select-edad');
    const inputMatematicas = document.getElementById('nota-matematicas');
    const inputLenguaje = document.getElementById('nota-lenguaje');
    const inputCiencias = document.getElementById('nota-ciencias');
    const inputHistoria = document.getElementById('nota-historia');
    const scoreError = document.getElementById('score-error');
    const btnGuardar = document.getElementById('btn-guardar-notas');

    // Elementos de Solo Lectura (Estado 2)
    const studentCursoElem = document.getElementById('student-curso');
    const studentEdadElem = document.getElementById('student-edad');
    const scoreLetraElem = document.getElementById('score-letra');
    const scoreBadgeElem = document.getElementById('score-badge');
    const detalleNotasElem = document.getElementById('detalle-notas');
    const scorePromedioElem = document.getElementById('score-promedio');

    // 2. Cargar Nombre en la UI
    studentNameElem.textContent = usuario.nombre;

    // 3. Lógica de Cerrar Sesión
    document.getElementById('btn-logout').addEventListener('click', () => {
        sessionStorage.removeItem('usuario_activo');
        window.location.href = '../../index.html';
    });

    /**
     * Calcula la calificación en letra y estilo del badge según el promedio
     */
    const obtenerCalificacionLetra = (promedio) => {
        if (promedio >= 95) return { letra: 'A+', label: 'Excelente Desempeño', bg: '#dcfce7', color: '#166534' };
        if (promedio >= 90) return { letra: 'A', label: 'Sobresaliente', bg: '#dcfce7', color: '#166534' };
        if (promedio >= 85) return { letra: 'B+', label: 'Muy Bueno', bg: '#e0f2fe', color: '#075985' };
        if (promedio >= 80) return { letra: 'B', label: 'Bueno', bg: '#e0f2fe', color: '#075985' };
        if (promedio >= 70) return { letra: 'C', label: 'Satisfactorio', bg: '#fef3c7', color: '#92400e' };
        if (promedio >= 60) return { letra: 'D', label: 'Suficiente', bg: '#ffedd5', color: '#9a3412' };
        return { letra: 'F', label: 'Necesita Mejorar', bg: '#fee2e2', color: '#991b1b' };
    };

    /**
     * Renderiza la vista de solo lectura con las notas y datos del estudiante
     */
    const renderizarEstadoLectura = (estudiante) => {
        const scores = estudiante.scores;
        if (!scores) return;

        // Cargar Curso y Edad
        studentCursoElem.textContent = estudiante.curso || 'No especificado';
        studentEdadElem.textContent = estudiante.edad ? `${estudiante.edad} años` : 'No especificada';

        // Cargar Calificación
        const cal = obtenerCalificacionLetra(scores.promedioTotal);
        scoreLetraElem.textContent = cal.letra;
        scoreBadgeElem.textContent = cal.label;
        scoreBadgeElem.style.backgroundColor = cal.bg;
        scoreBadgeElem.style.color = cal.color;

        // Cargar Lista de Materias
        detalleNotasElem.innerHTML = `
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px solid #f1f5f9;">
                    <span>📐 Matemáticas:</span> <strong>${scores['Matemáticas']} / 100</strong>
                </li>
                <li style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px solid #f1f5f9;">
                    <span>📚 Lenguaje:</span> <strong>${scores['Lenguaje']} / 100</strong>
                </li>
                <li style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px solid #f1f5f9;">
                    <span>🧪 Ciencias:</span> <strong>${scores['Ciencias']} / 100</strong>
                </li>
                <li style="display: flex; justify-content: space-between; padding: 0.35rem 0;">
                    <span>🏛️ Historia:</span> <strong>${scores['Historia']} / 100</strong>
                </li>
            </ul>
        `;

        scorePromedioElem.textContent = `${scores.promedioTotal} pts`;

        // Mostrar solo el contenedor de lectura
        estadoFormulario.style.display = 'none';
        estadoLectura.style.display = 'block';
    };

    /**
     * Cargar los datos del estudiante desde la base de datos
     */
    let estudianteActual = null;

    try {
        estudianteActual = await EstudiantesAPI.obtenerPorCorreo(usuario.correo);
        
        // Si ya tiene notas registradas, ir a vista de solo lectura
        if (estudianteActual && estudianteActual.scores !== null) {
            renderizarEstadoLectura(estudianteActual);
        } else {
            // Es su primera vez (o no tiene notas): Mostrar el formulario
            estadoFormulario.style.display = 'block';
            estadoLectura.style.display = 'none';
        }
    } catch (err) {
        console.warn('No se encontró estudiante vinculado al correo:', usuario.correo);
        // Si por alguna razón no existía en estudiantes, mostrar formulario
        estadoFormulario.style.display = 'block';
        estadoLectura.style.display = 'none';
    }

    // 4. Manejo del Formulario de Ingreso de Datos (Primer Login)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        scoreError.style.display = 'none';

        const cursoVal = selectCurso.value;
        const edadVal = selectEdad.value;
        const mat = parseFloat(inputMatematicas.value);
        const len = parseFloat(inputLenguaje.value);
        const cie = parseFloat(inputCiencias.value);
        const his = parseFloat(inputHistoria.value);

        // Validaciones
        if (!cursoVal) {
            scoreError.textContent = 'Por favor selecciona tu curso.';
            scoreError.style.display = 'block';
            return;
        }

        if (!edadVal) {
            scoreError.textContent = 'Por favor selecciona tu edad.';
            scoreError.style.display = 'block';
            return;
        }

        const esValida = (n) => !isNaN(n) && n >= 0 && n <= 100;
        if (!esValida(mat) || !esValida(len) || !esValida(cie) || !esValida(his)) {
            scoreError.textContent = 'Todas las notas deben estar entre 0 y 100.';
            scoreError.style.display = 'block';
            return;
        }

        try {
            btnGuardar.disabled = true;
            btnGuardar.textContent = 'Guardando datos...';

            const nuevasNotas = {
                'Matemáticas': mat,
                'Lenguaje': len,
                'Ciencias': cie,
                'Historia': his
            };

            const datosPerfil = {
                curso: cursoVal,
                edad: Number(edadVal)
            };

            if (!estudianteActual) {
                // Si el estudiante no existía en la colección, crearlo primero
                estudianteActual = await EstudiantesAPI.crear({
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    curso: cursoVal,
                    edad: Number(edadVal),
                    scores: null
                });
            }

            // Guardar notas y datos de perfil en DB
            const estudianteActualizado = await EstudiantesAPI.guardarScores(estudianteActual.id, nuevasNotas, datosPerfil);

            // Transicionar inmediatamente a la vista de solo lectura bloqueada
            renderizarEstadoLectura(estudianteActualizado);

        } catch (error) {
            scoreError.textContent = error.message || 'Error guardando las notas.';
            scoreError.style.display = 'block';
            btnGuardar.disabled = false;
            btnGuardar.textContent = 'Guardar Registro';
        }
    });
});
