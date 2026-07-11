# Mesala · Guía técnica de controles y enlaces

Este README documenta, con foco en mantenimiento, los controles UI y el mapa de navegación actual de la web.

> Nota de implementación: la landing mantiene `cliente_web/imgs/Camarero.mp4` como fuente primaria y aplica fallback automático a vídeo remoto si el navegador no puede reproducir ese archivo.

## a) Tabla resumen de controles y funcionalidades

| nombre_pagina html | nombre control | identificador único del control (id, dataset, class) | funcionalidad | Descripción |
|---|---|---|---|---|
| `cliente_web/index.html` | Logo principal hero | `img.brand-logo[src="./imgs/logo.png"]` | Identidad visual | Presenta el logo en formato ampliado para reforzar reconocimiento de marca desde el primer viewport. |
| `cliente_web/index.html` | CTA principal hero | Botón `a.btn.cta-primary[href="./mesala.html"]` | Acceso a producto | Lleva al entorno funcional de prueba (`mesala.html`) desde el primer viewport. |
| `cliente_web/index.html` | CTA secundario del hero | Botón `a.btn.cta-secondary[href="#demo"]` | Scroll interno | Mueve al bloque visual demo para reforzar confianza antes de conversión. |
| `cliente_web/index.html` | Hero pill informativo | `.hero-pill` | Micro-copy de contexto | Resume la propuesta: uso mobile-first para operación en hora punta. |
| `cliente_web/index.html` | Tarjeta métrica 1 | `.metric-card` (columna 1) | Refuerzo de beneficio | Comunica operación con “1 dedo” para enfatizar rapidez y simplicidad. |
| `cliente_web/index.html` | Tarjeta métrica 2 | `.metric-card` (columna 2) | Refuerzo de beneficio | Comunica flujo voz→acción para reducir clics y errores humanos. |
| `cliente_web/index.html` | Tarjeta métrica 3 | `.metric-card` (columna 3) | Refuerzo de beneficio | Comunica independencia de hardware (sin lock-in propietario). |
| `cliente_web/index.html` | Grid de propuesta de valor | `#valor` + `.feature-card` | Explicación de ventajas | Ordena fortalezas del producto en bloques legibles y escaneables. |
| `cliente_web/index.html` | Módulo demo imagen principal | `#demo` + `img[src="./imgs/movil-2.png"]` | Prueba visual | Muestra el mockup móvil con efecto flotante para reforzar foco en uso smartphone. |
| `cliente_web/index.html` | Video de engagement | `video#videoCamarero` con fallback JS | Reproducción multimedia | Carga `Camarero.mp4` si existe y, si falla, activa un vídeo de respaldo para no romper la experiencia. |
| `cliente_web/index.html` | CTA final de cierre | Botón `a.btn.cta-primary[href="./mesala.html"]` dentro de bloque gradiente | Conversión final | Cierra el flujo con una acción única y directa: entrar a Prueba Gratis. |
| `cliente_web/index.html` | Módulo JS scroll suave | Script IIFE `initSmoothScroll()` | Mejora UX | Suaviza navegación en anclas internas y evita saltos bruscos. |
| `cliente_web/mesala.html` | Papelera de eliminación | `#id_exit[data-id_key="exit"]` | Zona de borrado Drag & Drop | Permite eliminar elementos del plano del salón arrastrándolos a la papelera. |
| `cliente_web/mesala.html` | Disparador sidebar elementos | `i[data-action-nav="elementos"]` | Abrir/cerrar panel de elementos | Muestra/oculta catálogo de elementos para construir el plano del salón. |
| `cliente_web/mesala.html` | Acción guardar foto | `i[data-action-nav="save"]` | Guardar snapshot | Inicia flujo de guardado del estado del salón. |
| `cliente_web/mesala.html` | Acción cargar foto | `i[data-action-nav="load"]` | Cargar snapshot | Recupera una configuración de salón guardada previamente. |
| `cliente_web/mesala.html` | Acción info salón | `i[data-action-nav="info"]` | Abrir información contextual | Muestra datos de ayuda/estado del salón activo. |
| `cliente_web/mesala.html` | Acción reinicio | `i[data-action-nav="re-init"]` | Limpiar tablero | Reestablece el estado del salón. |
| `cliente_web/mesala.html` | Acción login/registro | `i[data-action-nav="conn"]` | Conexión de usuario | Punto de entrada a autenticación. |
| `cliente_web/mesala.html` | Menú configuración offcanvas | `#menuOffcanvas` | Configuración lateral | Ajusta parámetros operativos y visuales del entorno de salón. |
| `cliente_web/mesala.html` | Form config del salón | `#f_data_salon` | Lectura/edición de parámetros | Presenta nombre, columnas y filas del salón con controles asociados. |
| `cliente_web/mesala.html` | Modal Crear/Actualizar snapshot | `#id_modal_cu` | CRUD de estado | Orquesta el formulario para crear o actualizar “fotos” del salón. |
| `cliente_web/mesala.html` | Form guardar foto | `#form_guardar_foto` | Persistencia de snapshot | Captura título y contenidos de reservas/mensajes/alergias antes de guardar. |

---

## b) Tabla de links por página

| pagina html | link | control o elemento html | identificador del elemento (id, dataset, class) | url o contenido al que apunta | Descripción |
|---|---|---|---|---|---|
| `cliente_web/index.html` | `./mesala.html` | CTA hero “Prueba Gratis” | `a.btn.cta-primary` (hero) | Página de producto funcional | Link interno correcto; CTA principal de conversión temprana. |
| `cliente_web/index.html` | `#demo` | Botón “Ver demo” | `a.btn.cta-secondary` | Sección demo | Link interno correcto para exploración previa a conversión. |
| `cliente_web/index.html` | `./mesala.html` | CTA cierre “Entrar en Prueba Gratis” | `a.btn.cta-primary` (cierre) | Página de producto funcional | Link interno correcto; CTA final tras bloque de valor. |
| `cliente_web/mesala.html` | `#` | Brand de navbar antigua app | `a.navbar-brand` | Ancla vacía/no navegación | Link interno neutro; no rompe la interfaz, pero no redirige fuera de la app. |
| `cliente_web/mesala.html` | `mailto:davidquesadaheredia@gmail.com` | Icono email en offcanvas | `a[title="Enviar email"]` | Cliente de correo | Link externo funcional si el sistema tiene cliente mail configurado. |
| `cliente_web/mesala.html` | `https://www.laforjadeprometeo.com/` | Icono social Facebook | `a[title="Ir a Facebook"]` | Sitio externo | Link externo correcto. |
| `cliente_web/mesala.html` | `https://www.github.com/` | Icono social GitHub | `a[title="Ir a GitHub"]` | Sitio externo | Link externo correcto. |
| `cliente_web/mesala.html` | `https://www.laforjadeprometeo.com/` | Icono social WhatsApp | `a[title="Ir a WhatsApp"]` | Sitio externo | Link externo correcto (apunta a web, no API directa de WhatsApp). |

---

## Protocolo de verificación técnica aplicado

1. **HTML y semántica:** referencia prioritaria WHATWG Living Standard.
2. **CSS y accesibilidad:** referencia prioritaria W3C (incluyendo recomendaciones de contraste y estructuras responsive).
3. **JavaScript:** referencia prioritaria TC39 (ECMAScript) + comportamiento documentado en MDN para integración práctica.
4. **Componentes UI:** validación contra documentación oficial Bootstrap v5.x (estructura `navbar`, `collapse`, `offcanvas`, utilidades y clases).
5. **Despliegue estático:** flujo objetivo compatible con GitHub Pages (estructura de rutas relativas y archivos estáticos).
6. **Aprendizaje/evaluación:** alineación con criterios de freeCodeCamp y GitHub Certifications; W3Schools solo como apoyo sintáctico rápido.

Este protocolo se usa como jerarquía de decisión ante discrepancias de implementación.
