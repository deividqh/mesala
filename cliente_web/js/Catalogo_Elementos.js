/**
 * @file Catalogo_Elementos.js
 * @description Definición centralizada de tipos de objetos del salón.
 */
class Catalogo {
    // Definición de los datos (Podría venir de un JSON externo o base de datos)
    static #DATA = Object.freeze({
    mesa: {
        id: 'mesa',
        grupo: 'player',
        rol: 'agrupador', // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
        fisica: {
            ancho: 1, // Medida en celdas/baldosas
            alto: 1,
            colision: true // true = colisiona, false = no colisiona (ej: fondo)
        },
        visual: {
            content: `<svg class="imagen_menu imagen_menu--mesa"fill="currentColor" viewBox="0 0 50 50" width="30" height="30"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><path class="st0" d="M10.585938 11L0.38085938 21.205078 A 1.0001 1.0001 0 0 0 0.18945312 21.396484L0 21.585938L0 21.832031 A 1.0001 1.0001 0 0 0 0 22.158203L0 28L3 28L3 50L9 50L9 28L11 28L11 43L17 43L17 28L33 28L33 43L39 43L39 28L41 28L41 50L47 50L47 28L50 28L50 22.167969 A 1.0001 1.0001 0 0 0 50 21.841797L50 21.585938L49.806641 21.392578 A 1.0001 1.0001 0 0 0 49.623047 21.207031 A 1.0001 1.0001 0 0 0 49.617188 21.203125L39.414062 11L39 11L10.585938 11 z M 11.414062 13L38.585938 13L46.585938 21L3.4140625 21L11.414062 13 z M 2 23L48 23L48 26L46.167969 26 A 1.0001 1.0001 0 0 0 45.841797 26L42.154297 26 A 1.0001 1.0001 0 0 0 41.984375 25.986328 A 1.0001 1.0001 0 0 0 41.839844 26L38.167969 26 A 1.0001 1.0001 0 0 0 37.841797 26L34.154297 26 A 1.0001 1.0001 0 0 0 33.984375 25.986328 A 1.0001 1.0001 0 0 0 33.839844 26L16.167969 26 A 1.0001 1.0001 0 0 0 15.841797 26L12.154297 26 A 1.0001 1.0001 0 0 0 11.984375 25.986328 A 1.0001 1.0001 0 0 0 11.839844 26L8.1679688 26 A 1.0001 1.0001 0 0 0 7.8417969 26L4.1542969 26 A 1.0001 1.0001 0 0 0 3.984375 25.986328 A 1.0001 1.0001 0 0 0 3.8398438 26L2 26L2 23 z M 5 28L7 28L7 48L5 48L5 28 z M 13 28L15 28L15 41L13 41L13 28 z M 35 28L37 28L37 41L35 41L35 28 z M 43 28L45 28L45 48L43 48L43 28 z"/></svg>`,
            css: 'style_visual_agrupador'
        },
        logica: {
            motor_alergias: false,
            motor_mensajes: {
                tipo: 'sumatorio',              // Motor de mensajes: acumula valores por reserva.
                css: 'estyle_msg_agrupador'
            }
        }
    },
    silla: {
        id: 'silla',
        grupo: 'player',
        rol: 'cliente',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc) 
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            content: `<svg class="imagen_menu imagen_menu--silla st0"fill="currentColor" viewBox="0 0 512 512" width="30" height="30"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><g><rect x="262.97" y="298.368" class="st0" width="33.329" height="155.344"/><path class="st0" d="M243.216,23.156l-50.788,201.47h-42.233l-89.148,13.431v36.624l10.08,1.437h-10.08v177.595h33.329V279.441l55.819,7.952V512h41.146V287.392h158.98V512h41.137V259.523L450.953,0L243.216,23.156z M349.317,224.626H225.884l43.386-172.06l122.188-11.116L349.317,224.626z"/></g></svg>`,
            css: 'style_visual_cliente'
        },
        logica: {
            motor_alergias: true,
            motor_mensajes: {
                tipo: 'single', // Motor de mensajes: individual
                css: 'estyle_msg_cliente'
            }
        }
    },
    taburete: {
        id: 'taburete',
        grupo: 'player',
        rol: 'cliente',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50"><g fill="#8B4513"><rect x="12" y="25" width="4" height="20" rx="1" /><rect x="34" y="25" width="4" height="20" rx="1" /><rect x="18" y="20" width="4" height="15" rx="1" opacity="0.8" /><rect x="28" y="20" width="4" height="15" rx="1" opacity="0.8" /><ellipse cx="25" cy="20" rx="18" ry="12" /><path d="M7,20 Q7,30 25,30 Q43,30 43,20 L43,22 Q43,32 25,32 Q7,32 7,22 Z" /></g></svg>',
            css: 'style_visual_cliente'
        },
        logica: {
            motor_alergias: true,
            motor_mensajes: { tipo: 'single', css: 'estyle_msg_cliente' }
        }
    },
    // planta: {
    //     id: 'planta',
    //     grupo: 'decoration',
    //     rol: 'decoracion',   
    //     fisica: { ancho: 1, alto: 1, colision: true },
    //     visual: {
    //         content: '',
    //         css: 'estiloPlanta'
    //     },
    // },
    // esquina_muro: {
    //     id: 'esquina_muro',
    //     grupo: 'structure',
    //     rol: 'estructura',    
    //     fisica: { ancho: 1, alto: 1, colision: true },
    //     visual: { 
    //         content: '',
    //         css: 'estiloEsquinaMuro'
    //     },
    //     logica: { motor_alergias: false, motor_mensajes: null }
    // }
    });

    /**
     * Acceso seguro a una propiedad específica.
     * Ejemplo: Catalogo.get('mesa', 'visual', 'css')
     */
    static get(...niveles) {
        if (niveles.length === 0) return this.#DATA; // Si no se especifica nada, devolvemos el catálogo completo.

        let actual = this.#DATA;

        for (const clave of niveles) {
            if (actual !== null && typeof actual === 'object' && clave in actual) {
                actual = actual[clave];
            } else {
                return null; // Ruta no encontrada
            }
        }
        return actual;
    }

    /**
     * Obtiene una lista de valores únicos (distintos) para una propiedad en todo el catálogo.
     * Ejemplo: Catalogo.getUnicos('grupo') -> ['player', 'decoration', 'structure']     */
    static get_distinto_s(...niveles) {
        if (niveles.length === 0) return [];

        const resultados = [];

        // Iteramos sobre cada objeto principal (mesa, silla, etc.)
        for (const llave in this.#DATA) {
            const elemento = this.#DATA[llave];
            
            // Navegamos manualmente dentro de este elemento
            let actual = elemento;
            let rutaValida = true;

            for (const clave of niveles) {
                if (actual !== null && typeof actual === 'object' && clave in actual) {
                    actual = actual[clave];
                } else {
                    rutaValida = false;
                    break;
                }
            }

            if (rutaValida && actual !== null) {
                resultados.push(actual);
            }
        }

        // Retornamos valores sin duplicados usando Set (KISS)
        return [...new Set(resultados)];
    }

    static get_keys(){
        return Object.keys(this.#DATA);
    }

    /**
     * Busca elementos basándose en una ruta de propiedades y un valor final.
     * Soporta búsquedas de primer nivel y anidadas.
     * * @param {...any} args - La ruta de llaves seguida del valor buscado al final.
     * @example Catalogo.get_item('grupo', 'player')
     * @example Catalogo.get_item('logica', 'b_alergias', true)
     */
    static get_item_s(...args) {
        if (args.length < 2) return [];

        // El último argumento es el valor que comparamos.
        const valorBuscado = args.pop();
        // El resto de argumentos forman la ruta de navegación.
        const ruta = args;

        return Object.values(this.#DATA).filter(item => {
            let actual = item;
            
            // Navegación segura nivel por nivel
            for (const clave of ruta) {
                if (actual !== null && typeof actual === 'object' && clave in actual) {
                    actual = actual[clave];
                } else {
                    // Si la ruta no existe en este objeto, no coincide.
                    return false;
                }
            }
            
            // Comparación estricta del valor final alcanzado
            return actual === valorBuscado;
        });
    }

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // Exportación para Node.js o Navegador moderno
    // export default Catalogo;
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 💥 EJEMPLOS DE LLAMADAS DESDE PROGRAMA:
// const z_catalogo = Catalogo.get();
// const z_silla = Catalogo.get("silla");
// const z_silla_id = Catalogo.get("silla", "id");
// const z_silla_visual = Catalogo.get("silla", 'visual');
// const z_silla_visual_css = Catalogo.get("silla", 'visual', "css");
// const z_visual_css = Catalogo.get('visual', "css"); 	// NULL		

// const z_grupo = Catalogo.get_distinto_s("grupo");
// const z_visual = Catalogo.get_distinto_s('visual');
// const z_visual_content = Catalogo.get_distinto_s('visual', 'content');		
// const z_log_msg = Catalogo.get_distinto_s('logica', 'motor_mensajes');
// const z_log_msg_tipo = Catalogo.get_distinto_s('logica', 'motor_mensajes', 'tipo');
// const z_id_s = Catalogo.get_distinto_s('id');		
// const z_mesa = Catalogo.get_distinto_s('mesa');	// NULL
// const z_mesa_id = Catalogo.get_distinto_s('mesa' , 'id');	// NULL

// const z_keys = Catalogo.get_keys();

// const z_players = Catalogo.get_item_s("grupo", "player");
// const z_logica_alergias = Catalogo.get_item_s("logica", "motor_alergias", true);
// const z_sub_grupos = Catalogo.get_item_s("rol", "cliente");
// 💥💥💥💥💥💥💥💥

/**
 * @class Logica_Catalogo
 * @extends Catalogo
 * @description Gestiona de forma centralizada y dinámica el Offcanvas inferior del salón,
 * creando pestañas dinámicas por cada tipo de lógica detectada en el catálogo.
 */
class Logica_Catalogo  {
    
    constructor() {
        
        // Creamos el offcanvas en el DOM inmediatamente al instanciar la clase
        this.#crear_offcanvas_logica();
    }

    /**
     * @description Crea la estructura DOM del offcanvas y sus pestañas globales si no existe.
     */
    #crear_offcanvas_logica() {
        let offcanvas_logica = document.getElementById('offcanvas_logica');
        
        if (offcanvas_logica) {
            return offcanvas_logica;
        }

        // 1. Contenedor principal del offcanvas
        offcanvas_logica = document.createElement('div');
        offcanvas_logica.id = 'offcanvas_logica';
        offcanvas_logica.className = 'offcanvas offcanvas-bottom'; 
        offcanvas_logica.tabIndex = -1;
        
        offcanvas_logica.dataset.logica = 'true'; 
        offcanvas_logica.style.backgroundColor = 'var(--color-egg-white)'; 
        offcanvas_logica.style.height = 'auto'; 
        offcanvas_logica.style.minHeight = '35vh'; 

        // 2. Header del offcanvas
        const header = document.createElement('div');
        header.className = 'offcanvas-header';
        
        const title = document.createElement('h6');
        title.className = 'offcanvas-title';
        title.id = 'offcanvas_logica_label';
        title.innerText = 'Lógica del Elemento'; 

        const btn_close = document.createElement('button');
        btn_close.type = 'button';
        btn_close.className = 'btn-close text-reset';
        btn_close.setAttribute('data-bs-dismiss', 'offcanvas');
        btn_close.setAttribute('aria-label', 'Close');

        header.appendChild(title);
        header.appendChild(btn_close);

        // 3. Body del offcanvas
        const body = document.createElement('div');
        body.className = 'offcanvas-body';
        body.id = 'offcanvas_logica_body';

        // 4. DETECTAR LÓGICAS DISTINTAS Y GENERAR WIDGET DE PESTAÑAS (BOOTSTRAP TABS)
        // Extraemos todos los objetos 'logica' del catálogo
        const objetos_logica = Catalogo.get_distinto_s('logica');
        
        // Recopilamos todas las llaves de lógica únicas existentes (ej: ['motor_alergias', 'motor_mensajes'])
        const claves_logica_unicas = new Set();
        objetos_logica.forEach(obj => {
            if (obj && typeof obj === 'object') {
                Object.keys(obj).forEach(key => claves_logica_unicas.add(key));
            }
        });

        // Contenedor de la lista de pestañas (<ul class="nav nav-tabs">)
        const tabList = document.createElement('ul');
        tabList.className = 'nav nav-tabs mb-3';
        tabList.id = 'logicaTab';
        tabList.role = 'tablist';

        // Contenedor de los paneles de contenido (<div class="tab-content">)
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = 'logicaTabContent';

        // Generamos dinámicamente cada pestaña y su contenedor basado en las lógicas del catálogo
        claves_logica_unicas.forEach(clave => {
            // Formateamos un nombre amigable quitando el prefijo 'motor_'
            const nombrePestana = clave.replace('motor_', '').toUpperCase(); 

            // --- Estructura del Botón/Pestaña (LI > BUTTON) ---
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';
            navItem.role = 'presentation';
            navItem.dataset.tipoLogica = clave; // Guardamos la llave para filtrado posterior

            const tabButton = document.createElement('button');
            tabButton.className = 'nav-link';
            tabButton.id = `tab-${clave}`;
            tabButton.setAttribute('data-bs-toggle', 'tab');
            tabButton.setAttribute('data-bs-target', `#panel-${clave}`);
            tabButton.type = 'button';
            tabButton.role = 'tab';
            tabButton.setAttribute('aria-controls', `panel-${clave}`);
            tabButton.setAttribute('aria-selected', 'false');
            tabButton.innerText = nombrePestana;

            navItem.appendChild(tabButton);
            tabList.appendChild(navItem);

            // --- Estructura del Panel de Contenido ---
            const panel = document.createElement('div');
            panel.className = 'tab-pane fade';
            panel.id = `panel-${clave}`;
            panel.role = 'tabpanel';
            panel.setAttribute('aria-labelledby', `tab-${clave}`);
            
            // Contenedor interno específico para inyectar los datos en el futuro
            panel.innerHTML = `<div class="p-3 border border-top-0 content-area">Cargando datos de ${nombrePestana}...</div>`;

            tabContent.appendChild(panel);
        });

        // Inyectamos el widget de pestañas en el cuerpo del offcanvas
        body.appendChild(tabList);
        body.appendChild(tabContent);

        // Ensamble final del componente
        offcanvas_logica.appendChild(header);
        offcanvas_logica.appendChild(body);
        document.body.appendChild(offcanvas_logica);

        return offcanvas_logica;
    }

    /**
     * @description Abre el offcanvas inferior visualizando y activando únicamente 
     * las lógicas válidas que posea el elemento cliqueado.
     * @param {HTMLElement} elemento_dom - Elemento del salón sobre el que se hace clic.
     */
    abrir_offcanvas(elemento_dom) {
        const grupo_el = elemento_dom.dataset.tipo;
        const ctlg_el = Catalogo.get(grupo_el);
        if (!ctlg_el || !ctlg_el.logica) return null;
        
        // Recuperamos el Offcanvas ya creado en el DOM
        const offcanvas_dom = document.getElementById('offcanvas_logica');
        if (!offcanvas_dom) return null;

        // Actualizamos el título principal
        const title = offcanvas_dom.querySelector('#offcanvas_logica_label');
        title.innerText = `Opciones de ${elemento_dom.id || 'Elemento'} - (${ctlg_el.grupo}) - (${ctlg_el.rol})`;

        const logica_el = ctlg_el.logica;
        const navItems = offcanvas_dom.querySelectorAll('#logicaTab .nav-item');
        
        let primerTabVisible = null;

        // Evaluamos cada pestaña global contra las lógicas del elemento clickeado
        navItems.forEach(item => {
            const tipoLogica = item.dataset.tipoLogica;
            const valorLogica = logica_el[tipoLogica];
            
            // Localizamos el botón interno y su panel asociado
            const botonTab = item.querySelector('.nav-link');
            const idPanel = botonTab.getAttribute('data-bs-target');
            const panelDOM = offcanvas_dom.querySelector(idPanel);

            // Reseteamos estados activos previos de Bootstrap
            botonTab.classList.remove('active');
            botonTab.setAttribute('aria-selected', 'false');
            if (panelDOM) panelDOM.classList.remove('show', 'active');

            // CRITERIO DE VISIBILIDAD:
            // Se muestra la pestaña si la propiedad existe, y no es false ni null.
            if (valorLogica !== undefined && valorLogica !== false && valorLogica !== null) {
                item.classList.remove('d-none'); // Hacemos visible la pestaña
                
                // Guardamos la referencia de la primera pestaña que sea visible
                if (!primerTabVisible) {
                    primerTabVisible = { boton: botonTab, panel: panelDOM };
                }

                // --- AQUÍ PUEDES INYECTAR LA LÓGICA ESPECÍFICA SEGÚN EL TIPO ---
                const areaContenido = panelDOM.querySelector('.content-area');
                if (tipoLogica === 'motor_mensajes') {
                    areaContenido.innerHTML = `
                        <h6>Configuración de Mensajería</h6>
                        <p>Tipo de motor: <strong>${valorLogica.tipo}</strong></p>
                        <p>Clase CSS asociada: <code>${valorLogica.css}</code></p>
                    `;
                } else if (tipoLogica === 'motor_alergias') {
                    areaContenido.innerHTML = `
                        <h6>Control de Alérgenos</h6>
                        <p>El motor de alergias se encuentra actualmente: <span class="badge bg-success">Activado</span></p>
                    `;
                }
            } else {
                // Si el elemento no tiene esta lógica activa, ocultamos la pestaña por completo
                item.classList.add('d-none');
            }
        });

        // Si el elemento tiene al menos una lógica activa, la seleccionamos por defecto
        if (primerTabVisible) {
            primerTabVisible.boton.classList.add('active');
            primerTabVisible.boton.setAttribute('aria-selected', 'true');
            if (primerTabVisible.panel) {
                primerTabVisible.panel.classList.add('show', 'active');
            }
        }

        // Desplegamos el offcanvas usando Bootstrap
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas_dom);
        bsOffcanvas.show();
        return offcanvas_dom;
    }
}