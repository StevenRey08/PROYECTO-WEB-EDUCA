const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function buildPDF() {
  const outputPath = path.join(__dirname, '..', 'docs', 'Analisis_del_Proyecto_Git.pdf');
  
  // Ensure docs dir exists
  const docsDir = path.dirname(outputPath);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
    bufferPages: true,
    info: {
      Title: 'NIVEL FINAL: Análisis del Proyecto y Reflexión Técnica Git',
      Author: 'Desarrollador Profesional - Proyecto Educa',
      Subject: 'Informe Técnico sobre Control de Versiones con Git',
      Keywords: 'Git, GitHub, Proyecto Educa, Arquitectura Web, Control de Versiones',
      CreationDate: new Date()
    }
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  const colors = {
    primary: '#0F172A',      // Slate 900
    primaryLight: '#1E293B', // Slate 800
    brand: '#2563EB',        // Blue 600
    brandDark: '#1D4ED8',    // Blue 700
    brandLight: '#EFF6FF',   // Blue 50
    brandBorder: '#BFDBFE',  // Blue 200
    accent: '#059669',       // Emerald 600
    accentLight: '#ECFDF5',  // Emerald 50
    accentBorder: '#A7F3D0', // Emerald 200
    warning: '#D97706',      // Amber 600
    warningLight: '#FFFBEB',  // Amber 50
    warningBorder: '#FDE68A', // Amber 200
    text: '#1E293B',         // Slate 800
    textLight: '#64748B',    // Slate 500
    bgCard: '#F8FAFC',       // Slate 50
    borderCard: '#E2E8F0',   // Slate 200
    white: '#FFFFFF'
  };

  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 50;
  const contentWidth = pageWidth - (margin * 2);

  // Helper: Card box
  function drawCard(y, height, bgColor = colors.bgCard, borderColor = colors.borderCard) {
    doc.save();
    doc.roundedRect(margin, y, contentWidth, height, 8)
       .fillAndStroke(bgColor, borderColor);
    doc.restore();
  }

  // --- HEADER COVER / TOP BANNER ---
  doc.rect(margin, 50, contentWidth, 84).fill(colors.primary);
  
  // Decorative accent line
  doc.rect(margin, 134, contentWidth, 4).fill(colors.brand);

  // Header texts
  doc.fillColor(colors.brandBorder)
     .fontSize(8.5)
     .font('Helvetica-Bold')
     .text('PROYECTO EDUCA • SISTEMA DE GESTIÓN ACADÉMICA WEB', margin + 18, 64, {
       characterSpacing: 1.2
     });

  doc.fillColor(colors.white)
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('INFORME TÉCNICO Y REFLEXIÓN PROFESIONAL', margin + 18, 80);

  doc.fillColor('#94A3B8')
     .fontSize(10)
     .font('Helvetica')
     .text('Nivel Final: Análisis del Proyecto y Arquitectura de Control de Versiones con Git', margin + 18, 104);

  // Metadata Grid
  const metaY = 148;
  const metaBoxHeight = 44;
  drawCard(metaY, metaBoxHeight, colors.bgCard, colors.borderCard);

  const colWidth = contentWidth / 4;
  const metaItems = [
    { label: 'ROL / AUTOR', val: 'Desarrollador Profesional' },
    { label: 'REPOSITORIO', val: 'PROYECTO-WEB-EDUCA' },
    { label: 'METODOLOGÍA', val: 'Git Flow / 3 Capas' },
    { label: 'ESTADO', val: 'Aprobado • Producción' }
  ];

  metaItems.forEach((item, idx) => {
    const x = margin + 12 + (idx * colWidth);
    doc.fillColor(colors.textLight).fontSize(7).font('Helvetica-Bold').text(item.label, x, metaY + 9);
    doc.fillColor(colors.primary).fontSize(8.5).font('Helvetica-Bold').text(item.val, x, metaY + 22);
  });

  // Callout Box: Elemento Motivador
  const motY = 202;
  const motHeight = 68;
  drawCard(motY, motHeight, colors.brandLight, colors.brandBorder);

  // Vertical accent bar on callout
  doc.rect(margin, motY, 4, motHeight).fill(colors.brand);

  doc.fillColor(colors.brandDark).fontSize(8.5).font('Helvetica-Bold')
     .text('★  ELEMENTO MOTIVADOR DEL ROL PROFESIONAL', margin + 16, motY + 10);

  doc.fillColor(colors.primaryLight).fontSize(9.5).font('Helvetica-Oblique')
     .text('"Has sido contratado como desarrollador. Tu desempeño en esta misión determinará si el proyecto es exitoso."', margin + 16, motY + 25, {
       width: contentWidth - 32
     });

  doc.fillColor(colors.textLight).fontSize(8).font('Helvetica')
     .text('Como desarrollador titular, se asumió la responsabilidad de estructurar el repositorio, blindar el código en ramas independientes y garantizar la entrega oportuna de un sistema modular, robusto y escalable.', margin + 16, motY + 44, {
       width: contentWidth - 32
     });

  // Question 1
  let curY = 282;

  function renderQuestionHeader(num, title, y) {
    // Number badge
    doc.roundedRect(margin, y, 22, 22, 4).fill(colors.brand);
    doc.fillColor(colors.white).fontSize(10).font('Helvetica-Bold')
       .text(num.toString(), margin + 7, y + 5);

    // Title text
    doc.fillColor(colors.primary).fontSize(12).font('Helvetica-Bold')
       .text(title, margin + 30, y + 4, { width: contentWidth - 30 });

    return y + 30;
  }

  // --- PREGUNTA 1 ---
  curY = renderQuestionHeader(1, '¿Qué problemas tenía el proyecto sin Git?', curY);

  const q1Text = 'Antes de implementar Git, el Proyecto Educa operaba bajo un esquema artesanal propenso a fallas graves de sincronización y pérdida de información:';
  doc.fillColor(colors.text).fontSize(9).font('Helvetica').text(q1Text, margin, curY, { width: contentWidth, lineGap: 3 });
  curY += 24;

  const q1Points = [
    {
      title: 'Pérdida Crítica y Sobrescritura Accidental de Código:',
      desc: 'Cuando varios desarrolladores editaban simultáneamente archivos neurálgicos como "login.js" o "db.js", los cambios locales de un integrante sobreescribían y borraban los avances de los demás sin previo aviso ni trazabilidad.'
    },
    {
      title: 'Ausencia de Mecanismos de Reversión (Rollback):',
      desc: 'Si una nueva implementación generaba una regresión crítica (como la corrupción de claves en la persistencia local), no existía una forma inmediata ni limpia de retornar al estado funcional previo, comprometiendo la estabilidad general.'
    },
    {
      title: 'Caos en el Control de Versiones Informal:',
      desc: 'La dispersión de copias duplicadas con nombres ambiguos ("index_final.html", "script_v2_ok.js") producía confusión total sobre cuál era el código canónico de producción, incrementando la deuda técnica y el riesgo de desplegar código obsoleto.'
    }
  ];

  q1Points.forEach(pt => {
    doc.circle(margin + 6, curY + 5, 2.5).fill(colors.brand);
    doc.fillColor(colors.primary).fontSize(8.5).font('Helvetica-Bold').text(pt.title, margin + 16, curY, { width: contentWidth - 16 });
    curY += 13;
    doc.fillColor(colors.text).fontSize(8.5).font('Helvetica').text(pt.desc, margin + 16, curY, { width: contentWidth - 16, lineGap: 2 });
    curY += 26;
  });

  curY += 10;

  // --- PREGUNTA 2 ---
  curY = renderQuestionHeader(2, '¿Cómo ayudó Git a organizar el trabajo?', curY);

  const q2Text = 'La integración de Git instituyó un estándar de ingeniería que transformó la dinámica del equipo y la arquitectura del sistema:';
  doc.fillColor(colors.text).fontSize(9).font('Helvetica').text(q2Text, margin, curY, { width: contentWidth, lineGap: 3 });
  curY += 24;

  const q2Points = [
    {
      title: 'Registro Inmutable y Commits Atómicos:',
      desc: 'Cada modificación quedó respaldada mediante un commit con autor, fecha, identificador hash y mensaje estandarizado (feat:, fix:, style:, refactor:), documentando el propósito de cada cambio unitario.'
    },
    {
      title: 'Desacoplamiento Estructural en 3 Capas:',
      desc: 'Permitió ordenar y evolucionar de manera independiente la Presentación (src/pages, src/components), la Lógica (src/modules) y los Servicios de Datos (src/services/db.js), posibilitando iteraciones ordenadas y libres de interferencias.'
    },
    {
      title: 'Confianza y Seguridad para Refactorizar:',
      desc: 'El equipo pudo implementar funciones de alta complejidad técnica —como el bloqueo automático de calificaciones para nuevos alumnos y el cifrado seguro— con la tranquilidad de que cualquier desviación podía aislarse o revertirse.'
    }
  ];

  q2Points.forEach(pt => {
    doc.circle(margin + 6, curY + 5, 2.5).fill(colors.accent);
    doc.fillColor(colors.primary).fontSize(8.5).font('Helvetica-Bold').text(pt.title, margin + 16, curY, { width: contentWidth - 16 });
    curY += 13;
    doc.fillColor(colors.text).fontSize(8.5).font('Helvetica').text(pt.desc, margin + 16, curY, { width: contentWidth - 16, lineGap: 2 });
    curY += 26;
  });

  // --- PAGE 2 ---
  doc.addPage();
  curY = 50;

  // Page 2 Mini Header
  doc.rect(margin, curY, contentWidth, 32).fill(colors.primaryLight);
  doc.fillColor(colors.brandBorder).fontSize(8).font('Helvetica-Bold')
     .text('PROYECTO EDUCA  |  INFORME TÉCNICO DE CONTROL DE VERSIONES', margin + 14, curY + 11);
  doc.fillColor(colors.white).fontSize(8).font('Helvetica-Bold')
     .text('CONTINUACIÓN DE REFLEXIÓN TÉCNICA', contentWidth + margin - 170, curY + 11);

  curY += 46;

  // --- PREGUNTA 3 ---
  curY = renderQuestionHeader(3, '¿Qué ventajas aporta el uso de ramas (branches)?', curY);

  const q3Text = 'El modelo de ramas independientes (Feature Branching) representó el salto de calidad más significativo en el ciclo de vida del proyecto:';
  doc.fillColor(colors.text).fontSize(9).font('Helvetica').text(q3Text, margin, curY, { width: contentWidth, lineGap: 3 });
  curY += 24;

  const q3Points = [
    {
      title: 'Aislamiento de Código por Funcionalidad (Feature Branches):',
      desc: 'Se segregó el trabajo en ramas especializadas: "login" para autenticación y persistencia, "registro" para el alta de usuarios y perfiles, y "estudiantes" para el catálogo de notas y comboboxes. Esto impidió que código incompleto afectara la estabilidad de main.'
    },
    {
      title: 'Blindaje de la Rama Principal (main):',
      desc: 'Bajo la regla de que ningún desarrollador comitea directamente sobre main, la rama principal se preserva permanentemente en estado funcional ("ready-to-deploy"), integrando código únicamente tras revisiones y pruebas satisfactorias.'
    },
    {
      title: 'Desarrollo Concurrente y Paralelismo Real:',
      desc: 'Permitió que un desarrollador avanzara en la interfaz de usuario (score.html) mientras otro optimizaba la base de datos simulada en db.js de forma 100% paralela y sin bloqueos de sincronización.'
    },
    {
      title: 'Integración Segura y Resolución Controlada de Conflictos:',
      desc: 'Al momento de fusionar ramas mediante "git merge", Git identificó con precisión las líneas en colisión, facilitando revisiones explícitas y libres de errores no deseados.'
    }
  ];

  q3Points.forEach(pt => {
    doc.circle(margin + 6, curY + 5, 2.5).fill(colors.brand);
    doc.fillColor(colors.primary).fontSize(8.5).font('Helvetica-Bold').text(pt.title, margin + 16, curY, { width: contentWidth - 16 });
    curY += 13;
    doc.fillColor(colors.text).fontSize(8.5).font('Helvetica').text(pt.desc, margin + 16, curY, { width: contentWidth - 16, lineGap: 2 });
    curY += 25;
  });

  curY += 8;

  // --- PREGUNTA 4 ---
  curY = renderQuestionHeader(4, '¿Por qué es importante el historial de cambios (git log / commits)?', curY);

  const q4Points = [
    {
      title: 'Documentación Viva y Contexto Histórico:',
      desc: 'El historial no solo indica qué archivo cambió, sino el porqué de la decisión de diseño (e.g., ajuste de permisos en el perfil de estudiante). Convierte al repositorio en una fuente de verdad auto-documentada.'
    },
    {
      title: 'Depuración Forense Inmediata (git bisect / git blame):',
      desc: 'Frente a comportamientos inesperados, permite auditar de forma granular el commit exacto que introdujo una falla, aislando la causa raíz en minutos en lugar de horas de depuración ciega.'
    },
    {
      title: 'Reversión Selectiva sin Daño Colateral (git revert):',
      desc: 'Brinda la capacidad quirúrgica de desestimar una funcionalidad fallida sin deshacer los desarrollos y mejoras posteriores que sí fueron exitosos.'
    }
  ];

  q4Points.forEach(pt => {
    doc.circle(margin + 6, curY + 5, 2.5).fill(colors.accent);
    doc.fillColor(colors.primary).fontSize(8.5).font('Helvetica-Bold').text(pt.title, margin + 16, curY, { width: contentWidth - 16 });
    curY += 13;
    doc.fillColor(colors.text).fontSize(8.5).font('Helvetica').text(pt.desc, margin + 16, curY, { width: contentWidth - 16, lineGap: 2 });
    curY += 24;
  });

  // --- PAGE 3 ---
  doc.addPage();
  curY = 50;

  // Page 3 Mini Header
  doc.rect(margin, curY, contentWidth, 32).fill(colors.primaryLight);
  doc.fillColor(colors.brandBorder).fontSize(8).font('Helvetica-Bold')
     .text('PROYECTO EDUCA  |  INFORME TÉCNICO DE CONTROL DE VERSIONES', margin + 14, curY + 11);
  doc.fillColor(colors.white).fontSize(8).font('Helvetica-Bold')
     .text('TRABAJO EN EQUIPO Y MATRIZ COMPARATIVA', contentWidth + margin - 200, curY + 11);

  curY += 46;

  // --- PREGUNTA 5 ---
  curY = renderQuestionHeader(5, '¿Cómo se relaciona esto con el trabajo en equipo real?', curY);

  const q5Text = 'El esquema adoptado en el Proyecto Educa es una réplica exacta de las prácticas requeridas en las empresas tecnológicas de primer nivel:';
  doc.fillColor(colors.text).fontSize(9).font('Helvetica').text(q5Text, margin, curY, { width: contentWidth, lineGap: 3 });
  curY += 24;

  const q5Points = [
    {
      title: 'Estándar Industrial y Flujos de Colaboración (Git Flow / GitHub Flow):',
      desc: 'En la industria profesional, ningún desarrollador opera en solitario. El trabajo colectivo se articula mediante Pull Requests (PRs), donde los compañeros de equipo revisan la arquitectura, legibilidad y seguridad del código antes de autorizar el despliegue.'
    },
    {
      title: 'Integración Continua y Despliegue Automatizado (CI/CD):',
      desc: 'Los entornos profesionales ejecutan suites de pruebas unitarias, linters y validaciones de compilación automáticas cada vez que se detecta un commit o merge, garantizando que código defectuoso nunca llegue a los usuarios finales.'
    },
    {
      title: 'Resiliencia Organizacional y Mitigación del Factor de Riesgo ("Bus Factor"):',
      desc: 'Al descentralizar el código en repositorios remotos como GitHub, el conocimiento técnico no queda aislado en una máquina individual. La organización retiene la continuidad operativa ante contingencias y facilita la incorporación inmediata de nuevos desarrolladores.'
    }
  ];

  q5Points.forEach(pt => {
    doc.circle(margin + 6, curY + 5, 2.5).fill(colors.brand);
    doc.fillColor(colors.primary).fontSize(8.5).font('Helvetica-Bold').text(pt.title, margin + 16, curY, { width: contentWidth - 16 });
    curY += 13;
    doc.fillColor(colors.text).fontSize(8.5).font('Helvetica').text(pt.desc, margin + 16, curY, { width: contentWidth - 16, lineGap: 2 });
    curY += 25;
  });

  curY += 10;

  // --- EXECUTIVE COMPARISON TABLE ---
  doc.fillColor(colors.primary).fontSize(11).font('Helvetica-Bold')
     .text('MATRIZ COMPARATIVA: ANTES VS. DESPUÉS DE GIT EN PROYECTO EDUCA', margin, curY);
  curY += 18;

  const tableTop = curY;
  const thHeight = 22;
  const col1W = 110;
  const col2W = 192;
  const col3W = contentWidth - col1W - col2W; // 193.28

  // Header row
  doc.rect(margin, tableTop, contentWidth, thHeight).fill(colors.primary);
  doc.fillColor(colors.white).fontSize(8).font('Helvetica-Bold');
  doc.text('DIMENSIÓN', margin + 8, tableTop + 6);
  doc.text('SIN GIT (DESARROLLO ARTESANAL)', margin + col1W + 8, tableTop + 6);
  doc.text('CON GIT (DESARROLLO PROFESIONAL)', margin + col1W + col2W + 8, tableTop + 6);

  curY += thHeight;

  const tableRows = [
    {
      dim: 'Integridad del Código',
      sin: 'Sobrescritura continua y pérdida involuntaria de cambios entre desarrolladores.',
      con: 'Historial inmutable, commits atómicos y resolución deliberada de conflictos.'
    },
    {
      dim: 'Despliegues y Estabilidad',
      sin: 'Archivos duplicados con nombres informales (final_v2); alto riesgo de regresiones.',
      con: 'Rama main protegida y lista para producción; código probado en ramas aisladas.'
    },
    {
      dim: 'Trazabilidad y Rollback',
      sin: 'Imposible determinar autor o fecha de fallas; reversión manual compleja y destructiva.',
      con: 'Auditoría forense inmediata mediante git log/blame y reversiones quirúrgicas limpias.'
    },
    {
      dim: 'Trabajo Colaborativo',
      sin: 'Equipo bloqueado trabajando en serie por miedo a alterar archivos comunes.',
      con: 'Paralelismo real mediante Feature Branches, Pull Requests y Code Review.'
    }
  ];

  tableRows.forEach((row, idx) => {
    const rowH = 34;
    const bg = idx % 2 === 0 ? colors.bgCard : colors.white;
    doc.rect(margin, curY, contentWidth, rowH).fillAndStroke(bg, colors.borderCard);

    doc.fillColor(colors.primary).fontSize(7.5).font('Helvetica-Bold')
       .text(row.dim, margin + 8, curY + 6, { width: col1W - 14 });

    doc.fillColor('#991B1B').fontSize(7.5).font('Helvetica')
       .text(row.sin, margin + col1W + 8, curY + 5, { width: col2W - 14, lineGap: 1.5 });

    doc.fillColor('#065F46').fontSize(7.5).font('Helvetica')
       .text(row.con, margin + col1W + col2W + 8, curY + 5, { width: col3W - 14, lineGap: 1.5 });

    curY += rowH;
  });

  curY += 18;

  // --- SIGNATURE / VALIDATION BOX ---
  const signHeight = 64;
  drawCard(curY, signHeight, colors.accentLight, colors.accentBorder);
  doc.rect(margin, curY, 4, signHeight).fill(colors.accent);

  doc.fillColor(colors.accent).fontSize(8.5).font('Helvetica-Bold')
     .text('DICTAMEN TÉCNICO Y COMPROMISO PROFESIONAL', margin + 14, curY + 9);

  doc.fillColor(colors.primary).fontSize(8).font('Helvetica')
     .text('El análisis demuestra que la adopción de Git no es un mero requisito formal, sino el motor fundamental que aseguró el éxito del Proyecto Educa. Como desarrollador contratado, se ratifica la entrega de un sistema documentado, versionado y preparado para escalar en entornos de producción.', margin + 14, curY + 22, {
       width: contentWidth - 28,
       lineGap: 2
     });

  // Stamp / Developer signature line
  doc.fillColor(colors.textLight).fontSize(7).font('Helvetica-Bold')
     .text('Firma y Conformidad Técnica: MultiDEV  |  Fecha: Octubre 2026  |  Código de Verificación: EDUCA-GIT-PRO-2026', margin + 14, curY + 51);

  // --- FOOTERS & PAGE NUMBERS (Post-processing) ---
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);

    // Bottom divider line
    doc.rect(margin, pageHeight - 42, contentWidth, 0.75).fill(colors.borderCard);

    // Left footer
    doc.fillColor(colors.textLight).fontSize(7.5).font('Helvetica')
       .text('Proyecto Educa  •  Nivel Final: Análisis y Reflexión Técnica Git  •  Repositorio GitHub', margin, pageHeight - 34);

    // Right footer (page numbers)
    const pageStr = `Página ${i + 1} de ${range.count}`;
    doc.fillColor(colors.primaryLight).fontSize(7.5).font('Helvetica-Bold')
       .text(pageStr, contentWidth + margin - 70, pageHeight - 34, { align: 'right', width: 70 });
  }

  doc.end();

  writeStream.on('finish', () => {
    console.log(`PDF successfully generated at: ${outputPath}`);
  });
}

buildPDF();
