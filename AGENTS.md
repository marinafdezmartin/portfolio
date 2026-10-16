# Portfolio de Marina — reglas del proyecto para OpenCode

## 1. Objetivo y contexto
Este repositorio contiene un **portfolio personal y profesional**, en español, de Marina Fernández Martín. Debe reflejar fielmente la combinación de **GIS / WebGIS, desarrollo web y sensibilidad por el diseño visual**. El público principal son reclutadores y equipos de GIS, WebGIS, desarrollo web y visualización de datos en España.

Es también un **ejercicio del bootcamp**: su autora está aprendiendo HTML, CSS y Bootstrap y va incorporando JavaScript progresivamente. La prioridad es una web atractiva y profesional **que pueda comprender y mantener**.

El trabajo debe ser incremental: inspeccionar primero, planificar después y modificar solo lo autorizado. Nunca reconstruyas el repositorio de cero ni sustituyas el código existente sin consentimiento.

## 2. Estructura obligatoria
```text
portfolio/
├── AGENTS.md
├── .opencode/
│   └── agents/
│       └── portfolio-builder.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   ├── profile/
│   │   ├── templates/
│   │   └── gallery/
│   └── js/
│       └── script.js
└── index.html
```

- `index.html`: página principal y HTML semántico.
- `assets/css/style.css`: CSS propio y responsive; separar por secciones y reutilizar variables.
- `assets/js/script.js`: JavaScript vanilla, únicamente si es necesario o aporta aprendizaje.
- `assets/img/profile/`: foto personal **opcional**. No incluirla sin confirmar.
- `assets/img/templates/`: **referencias de DISEÑO**, no proyectos realizados; observar su estructura, paleta y estilo visual, sin copiar textos de ejemplo ni asumir que son proyectos reales.
- `assets/img/gallery/`: fotografías e imágenes disponibles **opcionales**. Comprobar su procedencia y relación con trabajos reales antes de usarlas.
- `.opencode/agents/portfolio-builder.md`: instrucciones del agente especializado.
- Si falta alguna carpeta prevista, indicarlo; crearla solo si se autoriza.

## 3. Lenguaje y dirección visual
- Idioma de la web: **español** (`<html lang="es">`). Inglés solo para términos técnicos naturales como GIS, WebGIS, front-end o nombres propios de tecnologías.
- Estética: **minimalismo editorial contemporáneo**, mucho blanco, tipografía sans serif limpia, jerarquía tipográfica marcada, microinteracciones discretas, alineación cuidada, líneas finas y buen ritmo vertical.
- Combinar una apariencia de **diseño visual creativo** con detalles **cartográficos**; evitar estética Bootstrap genérica y efectos recargados.
- Hero: texto claro y relativamente corto a la izquierda; ilustración ligera tipo **malla topográfica / relieve / curvas de nivel** en grises y toques azules a la derecha (en escritorio). Esta estética es central para la identidad visual.
- Mantener personalidad visual sobria. Evitar neones, fondos oscuros dominantes, sombras duras, gradientes intensos y ornamentación excesiva.

### Paleta aprobada
Usar estas variables en `:root`:
```css
--color-primary: #4169a1;
--color-primary-hover: #2d507f;
--color-text: #222831;
--color-muted: #697584;
--color-background: #ffffff;
--color-surface: #f5f7fa;
--color-border: #e2e7ed;
--color-focus: #2d507f;
```

## 4. Arquitectura de la página
La versión inicial es una **single page** con el siguiente orden:
1. Header / navbar: firma `marina.` y navegación por anclas.
2. Hero: etiqueta profesional, título claro, descripción breve, CTA hacia proyectos y enlace a Sobre mí; elemento visual topográfico.
3. Sobre mí (`#profile`) + Skills (`#skills`): **dos columnas contiguas en desktop**, apiladas en móvil.
4. Proyectos (`#projects`): **carrusel** o desplazamiento horizontal accesible con tarjetas e imágenes grandes; etiqueta semitransparente en una esquina para categoría `GIS`, `Web` o `Visual`.
5. Contacto (`#contact`): texto directo, CTA de correo y perfiles contrastados.
6. Footer: firma, navegación simple y año vigente.

### Skills
Mostrar pestañas/botones «Todas», «GIS» (icono globo/capas) y «Developer» (icono código/HTML). Preferir las pestañas nativas de Bootstrap; probar que funcionen también con teclado y que sus paneles sean visibles y correctos. Diferenciar experiencia práctica de formación en curso.

### Proyectos
Nunca inventar proyectos, clientes, enlaces, métricas ni capturas atribuidas a trabajos reales. Las referencias de `templates/` **no son contenido del portfolio**. Si aún no hay materiales suficientes, mostrar pocos trabajos verificados o preparar las tarjetas sin falsear contenido. Solicitar datos faltantes antes de publicar.

## 5. Tecnologías y restricciones
- **HTML5 semántico**: header, nav, main, section y footer. Un único `h1`; headings jerárquicos.
- **CSS3** propio: Flexbox/Grid cuando convenga; CSS variables; responsive; sin CSS inline innecesario.
- **Bootstrap** para layout, grid y componentes. Se debe consultar la guía oficial: https://getbootstrap.com/docs/6.0/guides/quickstart/ . **No adivinar versiones, CDN ni atributos `integrity`**. Mantener coherentes CSS y JS y no cambiar la versión instalada sin consultar.
- Nota: la rama Bootstrap 6 que se use en clase puede ser **alpha**. Si no hay acceso a internet, indicarlo y conservar los enlaces existentes en lugar de afirmar que se han comprobado.
- **JavaScript vanilla**: funcionalidades pequeñas y explicadas (interactividad adicional, menú si procede); aprovechar el JS de Bootstrap antes de replicarlo.
- No introducir React, Next.js, TypeScript, Tailwind, APIs, backend, npm ni frameworks adicionales para esta versión sin permiso expreso.
- No sobrescribir la plantilla CSS existente sin revisar y preservar lo aprovechable.
- No generar imágenes ficticias de proyectos ni tomar contenido de Internet sin licencia/atribución apropiada.

## 6. Fuentes de contenido y privacidad
- Usar solo información verificable en el CV aportado, en archivos reales del proyecto y en aclaraciones posteriores de la propietaria.
- Formación confirmada: Grado en Ciencias Ambientales (UAM); MasterGIS de Esri España; bootcamp Full-Stack de Neoland **en curso**.
- Experiencia confirmada: prácticas técnicas en Esri España, con soluciones WebGIS, Experience Builder, ArcGIS Maps SDK for JavaScript, ArcGIS Online/Enterprise y Python; validación de datos ambientales en la Red de Control y Vigilancia de la Calidad del Aire de Canarias.
- Evitar presentar como experticia profesional todos los elementos que figuran en «Tech Stack» del CV: verificar su nivel real antes de destacarlos. No afirmar que el bootcamp está finalizado.
- **No publicar fecha de nacimiento, teléfono personal, dirección completa ni CV íntegro sin permiso.** Confirmar email, enlaces de LinkedIn/GitHub y autorización para mostrarlos; no inventar URLs.
- Si el CV está fuera del proyecto, pedir el lugar de acceso. No moverlo dentro del repositorio público sin consentimiento.

## 7. SEO, accesibilidad y calidad
- SEO honesto en español: título descriptivo, meta description, encabezados ordenados, contenido útil, nombres de tecnologías y ámbitos profesionales usados con naturalidad; no repetir palabras clave artificialmente ni prometer rankings.
- `alt` apropiados, contraste legible, focos visibles, accesibilidad de enlaces y botones, navegación con teclado, `prefers-reduced-motion`, tamaños adaptables.
- Comprobar escritorio, tablet y móvil, enlaces internos, pestañas de Skills, carrusel, imágenes, legibilidad y ausencia de errores en consola.
- Preferir código claro, semántico y de poca complejidad, con comentarios solo cuando ayuden a aprender.

## 8. Método de trabajo
Antes de cualquier cambio: inspeccionar archivos actuales + imágenes disponibles; resumir hallazgos; proponer una etapa pequeña y pedir confirmación. Antes de cada edición, indicar **qué archivos cambiarán y por qué**. Después, explicar **qué cambió, qué clases de Bootstrap se usaron, qué propiedades CSS importan y cómo probarlo**. Si se escribe JavaScript, explicar selectores, eventos y funciones sin asumir conocimientos previos. No ejecutar instalaciones, borrados, reestructuraciones ni operaciones Git remotas sin permiso.

La primera respuesta debe ser de diagnóstico y planificación, **no generar de golpe el sitio completo**.
