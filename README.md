<div align="center">

# 🎓 Proyecto Educa
### Sistema de Gestión Académica Web • Arquitectura en 3 Capas

[![Descargar PDF](https://img.shields.io/badge/📥_DESCARGAR_PDF-Analisis__del__Proyecto__Git.pdf-2563EB?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](./Analisis_del_Proyecto_Git.pdf)
[![Ver Online](https://img.shields.io/badge/🌐_VER_INFORME_WEB-reflexion.html-059669?style=for-the-badge)](docs/reflexion.html)
[![Estado](https://img.shields.io/badge/NIVEL_FINAL-APROBADO-success?style=for-the-badge)](#)

---

### 📑 INFORME TÉCNICO OFICIAL - NIVEL FINAL
**Haz clic aquí para abrir o descargar el PDF oficial desde el repositorio:**  
👉 **[📥 Descargar Informe Oficial en PDF (Analisis_del_Proyecto_Git.pdf)](./Analisis_del_Proyecto_Git.pdf)** 👈  
*(Ubicado en la raíz del repositorio y en [`docs/Analisis_del_Proyecto_Git.pdf`](./docs/Analisis_del_Proyecto_Git.pdf))*

> #### 🎯 Elemento Motivador
> *"Has sido contratado como desarrollador. Tu desempeño en esta misión determinará si el proyecto es exitoso."*

</div>

---

## 📋 Nivel Final: Análisis del Proyecto y Reflexión Profesional Git

### 1. ¿Qué problemas tenía el proyecto sin Git?
Sin un sistema de control de versiones distribuido, el desarrollo del **Proyecto Educa** sufría de:
* **Pérdida y sobrescritura accidental de código:** Al trabajar varios desarrolladores en simultáneo sobre los mismos archivos (`login.js`, `db.js`, `index.html`), cualquier guardado manual sobreescribía los cambios previos de otros integrantes sin previo aviso ni mecanismo de reconciliación.
* **Falta total de trazabilidad e imposibilidad de rollback:** Si una nueva función (como ajustes en el `localStorage` o cifrado) causaba un error crítico en producción, no existía una forma rápida ni limpia de retornar al estado funcional previo.
* **El caos del versionado informal:** La dispersión de archivos duplicados con nombres ambiguos (`index_final_v2.html`, `script_nuevo_ok.js`) producía confusión sobre cuál era la versión oficial y estable del sistema.
* **Bloqueo operativo:** El equipo no podía trabajar en paralelo en funcionalidades distintas por temor a desincronizarse.

---

### 2. ¿Cómo ayudó Git a organizar el trabajo?
La implementación de Git transformó la metodología de trabajo en el proyecto Educa mediante:
* **Historial centralizado e inmutable:** Cada modificación (`commit`) quedó registrada con autor, fecha, identificador hash y descripción precisa con convenciones semánticas (`feat:`, `fix:`, `style:`, `refactor:`).
* **Desarrollo modular y desacoplado (Arquitectura en 3 Capas):** Se separaron la presentación (`src/pages`, `src/components`, `assets/css`), la lógica de negocio (`src/modules`) y los servicios de datos (`src/services/db.js`), permitiendo trabajar cada capa en commits ordenados sin interferencias.
* **Mayor confianza y libertad para refactorizar:** Los desarrolladores pudieron crear y depurar características complejas (como el formulario dinámico de 4 notas con bloqueo automático para nuevos alumnos) sabiendo que podían revertir cambios sin riesgo para la estabilidad general.

---

### 3. ¿Qué ventajas aporta el uso de ramas (`branches`)?
El flujo de trabajo basado en ramas aportó beneficios estratégicos indispensables:
* **Aislamiento de código (`Feature Branching`):** Trabajar en ramas independientes como `login`, `registro` y `estudiantes` garantizó que los avances en desarrollo no afectaran la estabilidad de la rama principal (`main`).
* **Blindaje de la rama `main`:** Ningún desarrollador realiza commits directos sobre `main`. Todo entra por `merge` o *Pull Request* revisado, preservando un entorno de producción siempre operativo.
* **Simultaneidad y paralelismo real:** Múltiples desarrolladores pudieron construir el portal del estudiante (`score.html`) y el panel de administración (`estudiantes.html`) en paralelo sin interferencias.
* **Integración limpia y controlada:** Git resolvió colisiones de código de forma matemática y explícita, facilitando la toma de decisiones informadas durante el merge.

---

### 4. ¿Por qué es importante el historial de cambios (`git log` / `commits`)?
* **Documentación viva del software:** El historial de commits explica no solo qué líneas de código cambiaron, sino **por qué** y **cuándo** se tomaron decisiones de diseño (ej: bloquear campos de notas para alumnos nuevos o remover botones de administración).
* **Diagnóstico eficiente de fallos (`Debugging` / `git blame` / `git bisect`):** Ante un comportamiento inesperado en la base de datos simulada (`db.js`), el historial permite aislar con precisión de minutos exactamente qué commit introdujo la falla.
* **Reversión quirúrgica (`git revert`):** Permite retirar un cambio defectuoso sin destruir el resto de los avances válidos alcanzados con posterioridad.

---

### 5. ¿Cómo se relaciona esto con el trabajo en equipo real?
En el entorno profesional e industrial de la ingeniería de software:
* **Estándar universal de colaboración:** Git es el cimiento de metodologías empresariales (*Git Flow* o *GitHub Flow*), donde el código se somete a *Pull Requests* / *Merge Requests*, pruebas automáticas (CI/CD) y revisión de código por pares (*Code Review*) antes de llegar a los usuarios finales.
* **Resiliencia organizacional (Mitigación del "Bus Factor"):** Al alojar el repositorio centralizado en GitHub, el conocimiento no queda atrapado en una máquina individual, minimizando riesgos y acelerando la incorporación de nuevos desarrolladores al equipo.
* **Continuidad operativa:** Asegura entregas continuas, rápidas y confiables que aportan valor constante al cliente y al negocio educativo.

---

### 📊 Matriz Comparativa Ejecutiva

| Dimensión | Sin Git (Desarrollo Artesanal) | Con Git (Desarrollo Profesional) |
| :--- | :--- | :--- |
| **Integridad de Código** | Sobrescrituras continuas y pérdida involuntaria de cambios. | Historial inmutable, commits atómicos y resolución controlada. |
| **Estabilidad de Producción** | Múltiples copias ambiguas (`final_v2.html`); alto riesgo de caídas. | Rama `main` protegida y lista para despliegue en cualquier momento. |
| **Trazabilidad y Rollback** | Imposible rastrear errores; reversión manual destructiva. | Auditoría forense con `git log` y reversión quirúrgica sin efectos secundarios. |
| **Trabajo en Equipo** | Bloqueos de trabajo en serie por temor a colisiones. | Paralelismo real mediante *Feature Branches* y *Pull Requests*. |

---

## 🏛️ Arquitectura del Proyecto
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
