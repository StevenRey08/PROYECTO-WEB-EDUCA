document.addEventListener('DOMContentLoaded', () => {
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

    // 2. Cargar datos en la UI
    document.getElementById('student-name').textContent = usuario.nombre;

    // 3. Lógica de Cerrar Sesión
    document.getElementById('btn-logout').addEventListener('click', () => {
        sessionStorage.removeItem('usuario_activo');
        window.location.href = '../../index.html';
    });
});
