import { EstudiantesAPI } from '../../services/db.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Verificación de Seguridad y Sesión
    const sesionInfo = sessionStorage.getItem('usuario_activo');
    if (!sesionInfo) {
        window.location.href = 'login.html';
        return;
    }
    
    const usuario = JSON.parse(sesionInfo);
    
    // Si no es admin, lo expulsamos a la página de score
    if (usuario.rol !== 'admin') {
        window.location.href = 'score.html';
        return;
    }

    // 2. Cargar datos del usuario en el Header
    document.getElementById('admin-name').textContent = `Hola, ${usuario.nombre}`;

    // 3. Lógica de Cerrar Sesión
    document.getElementById('btn-logout').addEventListener('click', () => {
        sessionStorage.removeItem('usuario_activo');
        window.location.href = '../../index.html';
    });

    // 4. Lógica del Modal de Visualización
    const modal = document.getElementById('modal-estudiante');
    const modalContent = document.getElementById('modal-content');
    
    document.getElementById('close-modal').addEventListener('click', () => modal.style.display = 'none');
    document.getElementById('btn-modal-ok').addEventListener('click', () => modal.style.display = 'none');

    const mostrarModal = async (id) => {
        try {
            const estudiante = await EstudiantesAPI.obtenerPorId(id);
            if (!estudiante) return;
            
            let htmlScores = '';
            if (estudiante.scores) {
                htmlScores = `
                    <div style="background-color: #F8FAFC; border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); padding: 1rem; margin-top: 1rem;">
                        <h3 style="font-size: 1rem; color: var(--color-text-main); margin-bottom: 0.5rem;">Calificaciones Registradas</h3>
                        <ul style="list-style: none; padding: 0; margin: 0; color: var(--color-text-muted); font-size: 0.9rem;">
                            <li style="margin-bottom: 0.25rem;"><strong>Matemáticas:</strong> ${estudiante.scores.Matemáticas}</li>
                            <li style="margin-bottom: 0.25rem;"><strong>Lenguaje:</strong> ${estudiante.scores.Lenguaje}</li>
                            <li style="margin-bottom: 0.25rem;"><strong>Ciencias:</strong> ${estudiante.scores.Ciencias}</li>
                            <li style="margin-bottom: 0.25rem;"><strong>Historia:</strong> ${estudiante.scores.Historia}</li>
                            <li style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed var(--color-border); color: var(--color-primary); font-weight: 600; font-size: 1rem;">
                                Promedio Total: ${estudiante.scores.promedioTotal}
                            </li>
                        </ul>
                    </div>
                `;
            }

            modalContent.innerHTML = `
                <p style="margin-bottom: 0.5rem;"><strong>ID:</strong> <span style="color: var(--color-text-muted);">${estudiante.id}</span></p>
                <p style="margin-bottom: 0.5rem;"><strong>Nombre:</strong> ${estudiante.nombre}</p>
                <p style="margin-bottom: 0.5rem;"><strong>Correo:</strong> ${estudiante.correo || 'No especificado'}</p>
                <p style="margin-bottom: 0.5rem;"><strong>Curso:</strong> ${estudiante.curso || 'Sin asignar'}</p>
                <p style="margin-bottom: 0.5rem;"><strong>Edad:</strong> ${estudiante.edad || '-'}</p>
                <p style="margin-bottom: 0.5rem;"><strong>Registrado:</strong> ${new Date(estudiante.fechaRegistro).toLocaleDateString()}</p>
                ${htmlScores}
            `;
            modal.style.display = 'flex';
        } catch (error) {
            alert('Error al obtener la información del estudiante');
        }
    };

    // 5. Renderizado del Dashboard (Tabla de Estudiantes)
    const tbody = document.getElementById('tabla-body');

    const renderTabla = async () => {
        try {
            // Consumimos la capa de datos (Parte 4)
            const estudiantes = await EstudiantesAPI.listar();
            tbody.innerHTML = '';
            
            if (estudiantes.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" style="padding: 2rem; text-align: center; color: var(--color-text-muted);">No hay estudiantes registrados actualmente en la base de datos.</td></tr>`;
                return;
            }

            // Inyectamos las filas estéticamente
            estudiantes.forEach(est => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid var(--color-border)';
                tr.innerHTML = `
                    <td style="padding: 1rem; color: var(--color-text-muted); font-size: 0.85rem;">${est.id}</td>
                    <td style="padding: 1rem; font-weight: 500; color: var(--color-text-main);">${est.nombre}</td>
                    <td style="padding: 1rem; color: var(--color-text-muted);">${est.curso || 'Sin asignar'}</td>
                    <td style="padding: 1rem; color: var(--color-text-muted);">${est.edad || '-'}</td>
                    <td style="padding: 1rem;">
                        <button class="btn btn-secondary btn-visualizar" data-id="${est.id}" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-right: 0.5rem;">Visualizar</button>
                        <button class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; color: #dc2626; border-color: #fca5a5;" onclick="alert('Funcionalidad en desarrollo (Próximamente)')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Añadir eventos a los botones de visualizar
            document.querySelectorAll('.btn-visualizar').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    mostrarModal(e.target.getAttribute('data-id'));
                });
            });
        } catch (error) {
            console.error('Error cargando estudiantes:', error);
            tbody.innerHTML = `<tr><td colspan="5" style="padding: 2rem; text-align: center; color: #dc2626;">Error crítico cargando los datos.</td></tr>`;
        }
    };

    // Llamamos al render inicial
    renderTabla();
});
