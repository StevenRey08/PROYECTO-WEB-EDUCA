# Proyecto Educa

Una aplicación web sencilla para gestionar información básica de estudiantes, hecha con HTML, CSS y JavaScript puro.

## Arquitectura y Estructura del Proyecto
El proyecto sigue una arquitectura en 3 capas (Presentación, Lógica y Datos):

- **Presentación**: `src/pages/`, `src/components/`, `assets/`
- **Lógica**: `src/modules/`, `src/utils/`
- **Datos**: `src/services/`, `data/`

## Reglas de Trabajo del Equipo
- **Ramas:** Nadie hace commit directo a `main`. Todo entra por merge o Pull Request revisado por el líder.
- **Sincronización:** Antes de trabajar, ejecutar `git pull origin main`.
- **Commits:** Pequeños y claros (formato: verbo + qué se hizo).
- **Código:** Modular con módulos ES6 (`import` / `export`), comentado, limpio y en español.
- **Responsabilidad:** Cada integrante edita solo sus archivos asignados. Los módulos se comunican solo a través de funciones de `services/db.js`.
