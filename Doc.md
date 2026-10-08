proyecto-educa/
├── index.html                  ← página principal (entrada)
├── README.md
├── .gitignore
│
├── src/
│   ├── pages/                  ← CAPA DE PRESENTACIÓN (vistas)
│   │   ├── login.html
│   │   ├── registro.html
│   │   └── estudiantes.html
│   │
│   ├── components/             ← componentes reutilizables de UI
│   │   ├── header.js
│   │   ├── footer.js
│   │   ├── navbar.js
│   │   ├── formulario.js
│   │   └── tabla-estudiantes.js
│   │
│   ├── modules/                ← CAPA DE LÓGICA (un módulo por funcionalidad)
│   │   ├── auth/
│   │   │   ├── login.js        ← rama: login
│   │   │   └── registro.js     ← rama: registro
│   │   └── estudiantes/
│   │       └── estudiantes.js  ← gestión de estudiantes
│   │
│   ├── services/               ← CAPA DE DATOS (acceso a datos)
│   │   ├── db.js               ← base de datos simulada (localStorage/JSON)
│   │   └── storage.js
│   │
│   ├── utils/
│   │   └── validaciones.js     ← validar correo, campos vacíos, etc.
│   │
│   └── main.js                 ← punto de arranque del JS
│
├── assets/                     ← recursos estáticos
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css       ← colores y fuentes
│   │   ├── components.css
│   │   └── pages.css
│   ├── img/
│   │   └── logo.png
│   ├── icons/
│   └── fonts/
│
├── data/
│   └── estudiantes.json        ← datos de ejemplo
│
├── docs/
│   ├── reflexion.md            ← respuestas del NIVEL FINAL
│   └── bitacora.md             ← comandos usados por nivel
│
└── evidencias/                 ← capturas de cada nivel

Capa	Carpeta	Qué hace
Presentación	pages/, components/, assets/	Lo que ve el usuario
Lógica	modules/, utils/	Reglas: login, registro, validaciones
Datos	services/, data/	Guarda y lee la información (simulada)