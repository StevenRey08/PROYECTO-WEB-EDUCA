# Bitácora de Comandos Git - Proyecto Educa

Este documento detalla el registro ordenado de comandos Git ejecutados a lo largo del desarrollo del proyecto según los niveles del reto.

---

## NIVEL 1: Configuración del Entorno

```bash
# 1. Configuración de credenciales de usuario global/local
git config --global user.name "MultiDEV"
git config --global user.email "themultidevvv@gmail.com"

# 2. Verificación de configuración
git config user.name
git config user.email
git --version
```

---

## NIVEL 2: Inicio del Proyecto

```bash
# 1. Inicialización del repositorio Git
git init

# 2. Creación de la estructura del sistema (Doc.md, index.html, etc.)
touch index.html Doc.md README.md .gitignore

# 3. Primer commit del sistema básico
git add .
git commit -m "feat: inicio del sistema Proyecto Educa"
```

---

## NIVEL 3: Desarrollo de Funcionalidades por Módulos

```bash
# Módulo de Autenticación (Login)
git add src/pages/login.html src/modules/auth/login.js
git commit -m "feat: implementación de pantalla y módulo de login"

# Módulo de Registro
git add src/pages/registro.html src/modules/auth/registro.js
git commit -m "feat: creación de formulario de registro de nuevos usuarios"

# Capa de Datos y Servicios
git add src/services/db.js src/services/storage.js data/estudiantes.json
git commit -m "feat: capa de datos simulada con localStorage y hashing SHA-256"

# Interfaz y Estilos Globales
git add assets/css/
git commit -m "style: diseño de sistema visual con glassmorphism y variables CSS"
```

---

## NIVEL 4: Trabajo en Ramas e Integración (Git Flow)

```bash
# 1. Desarrollo en rama login
git checkout -b login
# (se realizan cambios en el login)
git add .
git commit -m "fix: validaciones de entrada en módulo login"
git checkout main
git merge login

# 2. Desarrollo en rama registro
git checkout -b registro
# (se habilita la auto-creación del perfil de estudiante)
git add .
git commit -m "feat: vinculación de registro con perfil de estudiante"
git checkout main
git merge registro

# 3. Desarrollo en rama estudiantes (Portal del estudiante y Admin)
git checkout -b estudiantes
# (se implementan comboboxes de curso/edad y bloqueo de notas)
git add .
git commit -m "feat: flujo de ingreso único de notas y comboboxes de curso/edad"
git checkout main
git merge estudiantes
```

---

## Resumen de Estructura de Archivos del Proyecto

```
proyecto-educa/
├── index.html                  ← Página de bienvenida
├── Doc.md                      ← Especificación del sistema
├── README.md                   ← Instrucciones del proyecto
├── .gitignore                  ← Filtros de archivos
├── assets/                     ← Estilos globales CSS y recursos
├── data/                       ← estudiantes.json
├── docs/                       ← bitacora.md y reflexion.md
├── evidencias/                 ← Capturas reales de la interfaz
└── src/
    ├── pages/                  ← Vistas (login.html, registro.html, estudiantes.html, score.html)
    ├── modules/                ← Lógica (login.js, registro.js, estudiantes.js, score.js)
    ├── services/               ← Capa de datos (db.js, storage.js)
    └── utils/                  ← Validaciones de campos
```
