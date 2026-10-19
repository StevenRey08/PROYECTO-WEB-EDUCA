# Proyecto Educa

Una aplicación web moderna para gestionar información básica de estudiantes, construida con HTML, CSS y JavaScript modular (ES6).

---

## 📄 Nivel Final: Análisis del Proyecto y Reflexión Git
El análisis final y las respuestas a las preguntas de reflexión profesional se encuentran documentadas y disponibles para descarga directa:

- 📥 **[Descargar Informe Oficial en PDF (Analisis_del_Proyecto_Git.pdf)](docs/Analisis_del_Proyecto_Git.pdf)**
- 🌐 **[Ver Informe Web Interactivo (reflexion.html)](docs/reflexion.html)**
- 📝 **[Ver Reflexión en Markdown (reflexion.md)](docs/reflexion.md)**

---

## 🏛️ Arquitectura y Estructura del Proyecto
El proyecto sigue una arquitectura desacoplada en 3 capas (Presentación, Lógica y Datos):

- **Presentación**: `src/pages/`, `src/components/`, `assets/`
- **Lógica**: `src/modules/`, `src/utils/`
- **Datos**: `src/services/`, `data/`

---

## 🤝 Reglas de Trabajo del Equipo
- **Ramas:** Nadie hace commit directo a `main`. Todo entra por merge o Pull Request revisado por el líder.
- **Sincronización:** Antes de trabajar, ejecutar `git pull origin main`.
- **Commits:** Pequeños y claros (formato semántico: `feat:`, `fix:`, `style:`, etc.).
- **Código:** Modular con módulos ES6 (`import` / `export`), comentado, limpio y en español.
- **Responsabilidad:** Cada integrante edita solo sus archivos asignados. Los módulos se comunican solo a través de funciones de `services/db.js`.
