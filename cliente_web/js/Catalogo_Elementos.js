/**
 * @file Catalogo_Elementos.js
 * @description Definición centralizada de tipos de objetos del salón.
 * 
 *  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
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

 */
class Catalogo {
    // De momento lo pongo aparte pero quiero meterlo en el catalogo
    static #EXIT = Object.freeze({
        exit: {
            id: 'exit',
            grupo: 'exit',
            rol: 'papelera', // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
            visual: {
                content: `<svg  class="imagen_exit" width="30" height="30" viewBox="0 0 1024 1024" fill="currentColor" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path  d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill="currentColor" /><path  d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill="currentColor" /></svg>`,
                css: 'style_exit'
            },
        },
    });

    // 
    static #DATA = Object.freeze({
    mesa: {
        id: 'mesa',
        grupo: 'player',
        rol: 'reserver', // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
        fisica: {
            ancho: 1, // Medida en celdas/baldosas
            alto: 1,
            colision: true // true = colisiona, false = no colisiona (ej: fondo)
        },
        visual: {
            content: `<svg class="imagen_menu imagen_menu--mesa"fill="currentColor" viewBox="0 0 50 50" width="30" height="30"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><path class="st0" d="M10.585938 11L0.38085938 21.205078 A 1.0001 1.0001 0 0 0 0.18945312 21.396484L0 21.585938L0 21.832031 A 1.0001 1.0001 0 0 0 0 22.158203L0 28L3 28L3 50L9 50L9 28L11 28L11 43L17 43L17 28L33 28L33 43L39 43L39 28L41 28L41 50L47 50L47 28L50 28L50 22.167969 A 1.0001 1.0001 0 0 0 50 21.841797L50 21.585938L49.806641 21.392578 A 1.0001 1.0001 0 0 0 49.623047 21.207031 A 1.0001 1.0001 0 0 0 49.617188 21.203125L39.414062 11L39 11L10.585938 11 z M 11.414062 13L38.585938 13L46.585938 21L3.4140625 21L11.414062 13 z M 2 23L48 23L48 26L46.167969 26 A 1.0001 1.0001 0 0 0 45.841797 26L42.154297 26 A 1.0001 1.0001 0 0 0 41.984375 25.986328 A 1.0001 1.0001 0 0 0 41.839844 26L38.167969 26 A 1.0001 1.0001 0 0 0 37.841797 26L34.154297 26 A 1.0001 1.0001 0 0 0 33.984375 25.986328 A 1.0001 1.0001 0 0 0 33.839844 26L16.167969 26 A 1.0001 1.0001 0 0 0 15.841797 26L12.154297 26 A 1.0001 1.0001 0 0 0 11.984375 25.986328 A 1.0001 1.0001 0 0 0 11.839844 26L8.1679688 26 A 1.0001 1.0001 0 0 0 7.8417969 26L4.1542969 26 A 1.0001 1.0001 0 0 0 3.984375 25.986328 A 1.0001 1.0001 0 0 0 3.8398438 26L2 26L2 23 z M 5 28L7 28L7 48L5 48L5 28 z M 13 28L15 28L15 41L13 41L13 28 z M 35 28L37 28L37 41L35 41L35 28 z M 43 28L45 28L45 48L43 48L43 28 z"/></svg>`,
            css: 'style_visual_reserver'
        },
        logica: {
            motor_mensajes: { nombre: "Mensajes", content: 'sumatorio', css: 'estyle_msg_reserver', }
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
            motor_alergias: { nombre: "Alergias" , content: Catalogo.get_alergenos(), css:'', },
            motor_mensajes: { nombre: "Mensajes" , content: 'single', css: 'estyle_msg_cliente',  }
        }
    },
    taburete: {
        id: 'taburete',
        grupo: 'player',
        rol: 'reserver',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50"><g fill="#8B4513"><rect x="12" y="25" width="4" height="20" rx="1" /><rect x="34" y="25" width="4" height="20" rx="1" /><rect x="18" y="20" width="4" height="15" rx="1" opacity="0.8" /><rect x="28" y="20" width="4" height="15" rx="1" opacity="0.8" /><ellipse cx="25" cy="20" rx="18" ry="12" /><path d="M7,20 Q7,30 25,30 Q43,30 43,20 L43,22 Q43,32 25,32 Q7,32 7,22 Z" /></g></svg>',
            css: 'style_visual_cliente'
        },
        logica: {
            motor_alergias: { nombre: "Alergias" , content: Catalogo.get_alergenos(), css:'',},
            motor_mensajes: { nombre: "Mensajes" , content: 'single', css: 'estyle_msg_cliente', }
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
    //     fisica: { ancho: 2, alto: 1, colision: true },
    //     visual: { 
    //         content: '',
    //         css: 'estiloEsquinaMuro'
    //     },
    //     logica: { motor_alergias: false, motor_mensajes: null }
    // }
    });
    
    static get_alergenos() {
        const d_alergenos = {
            gluten:    { slug: 'gluten',    svg: '<img src="./imgs/alergia-gluten.svg" alt="Gluten" />' },
            lacteos:   { slug: 'lacteos',   svg: '<img src="./imgs/alergia-lacteos.svg" alt="Lácteos" />' },
            crustaceos:{ slug: 'crustaceos',svg: '<img src="./imgs/alergia-crustaceo.svg" alt="Crustáceos" />' },
            moluscos:  { slug: 'moluscos',  svg: '<img src="./imgs/alergia-moluscos.svg" alt="Moluscos" />' },
            pescado:   { slug: 'pescado',   svg: '<img src="./imgs/alergia-pescado.svg" alt="Pescado" />' },
            soja:      { slug: 'soja',      svg: '<img src="./imgs/alergia-soja.svg" alt="Soja" />' },
            huevos:    { slug: 'huevos',    svg: '<img src="./imgs/alergia-huevo.svg" alt="Huevos" />' },
            cascara:   { slug: 'cascara',   svg: '<img src="./imgs/alergia-cascara.svg" alt="Frutos de cáscara" />' }
        };
        return d_alergenos;
    }

    // Diccionario para guardar las instancias de las lógicas (Motores)
    static #MOTORES = {};

    /**
     * @description Asigna una instancia de un motor a una clave de lógica.
     * @param {String} clave_logica - Ej: 'motor_mensajes', 'motor_alergias'
     * @param {Object} instancia - La instancia de la clase (ej: new Motor_Mensajes())
     */
    static set_motor(clave_logica, instancia) {
        this.#MOTORES[clave_logica] = instancia;
    }

    /**
     * @description Devuelve la instancia del motor asociado a esa lógica, si existe.
     */
    static get_motor(clave_logica) {
        return this.#MOTORES[clave_logica] || null;
    }
    
    
    /**
     * Acceso seguro a una propiedad específica.
     * Ejemplo: Catalogo.get('mesa', 'visual', 'css')
     */
    static get(...niveles) {
        if (niveles.length === 0) return this.#DATA; // Si no se especifica nada, devolvemos el catálogo completo.

        let actual = this.#DATA;

        for (const clave of niveles) {
            // ■ Testeo si clave es un id de un elemento del DOM y si existe, lo obtenemos.
            const item_catalog = Catalogo._from_id_to_catalogo(clave);
            if (item_catalog)   return item_catalog;                        

            // ■ No es un id de DOM y buscamos las claves.
            if (actual !== null && typeof actual === 'object' && clave in actual) {
                actual = actual[clave];
            } else {
                return null; // Ruta no encontrada
            }
        }
        return actual;
    }

    static _from_id_to_catalogo(id) {
        const es_dom = document.getElementById(id);
        if (!es_dom) return null;

        const id_keys = Catalogo.get_keys();
        for (const id_key of id_keys) {
            if (id.startsWith(id_key)) {
                return this.#DATA[id_key];
            }
        }
        return null;
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

    // ■■■ MÉTODOS INTERNOS Y CORE ■■■

    /**
     * @description Crea la estructura DOM del offcanvas y sus pestañas globales si no existe.
     */
    #crear_offcanvas_logica() {
        let $offcanvas_logica = document.getElementById('offcanvas_logica');
        if ($offcanvas_logica) 
            return $offcanvas_logica;
        
        // ■ Contenedor principal del offcanvas
        $offcanvas_logica = document.createElement('div');
        $offcanvas_logica.id = 'offcanvas_logica';
        $offcanvas_logica.className = 'offcanvas offcanvas-bottom'; 
        $offcanvas_logica.tabIndex = -1;
        
        $offcanvas_logica.dataset.logica = 'true'; 
        $offcanvas_logica.style.backgroundColor = 'var(--color-egg-white)'; 
        $offcanvas_logica.style.height = 'auto'; 
        $offcanvas_logica.style.minHeight = '20vh'; 

        // ■ Header del offcanvas
        const header = document.createElement('div');
        header.className = 'offcanvas-header';
        
        // ■ TITULO
        const title = document.createElement('h6');
        title.className = 'offcanvas-title';
        title.id = 'offcanvas_logica_title';
        title.innerText = 'THE LOGIC ZONE'; 
        
        // ■ BOTON CERRAR
        const $btn_close = document.createElement('button');
        $btn_close.type = 'button';
        $btn_close.className = 'btn-close text-reset';
        $btn_close.setAttribute('data-bs-dismiss', 'offcanvas');
        $btn_close.setAttribute('aria-label', 'Close');
        
        // ■ CONSTRUCCION CABECERA.
        header.appendChild(title);
        header.appendChild($btn_close);
        
        // ■ BODY DEL OFFCANVAS 
        const body = document.createElement('div');
        body.className = 'offcanvas-body';
        body.id = 'offcanvas_logica_body';

        // 4. DETECTAR LÓGICAS DISTINTAS Y GENERAR WIDGET DE PESTAÑAS (BOOTSTRAP TABS)
        // Extraemos todos los objetos 'logica' del catálogo usando la clase Catalogo
        const objetos_logica = Catalogo.get_distinto_s('logica');
        
        // Recopilamos las llaves únicas y buscamos su propiedad 'nombre'
        const claves_logica_unicas = new Map(); // Usamos Map para guardar la clave y su nombre
        
        objetos_logica.forEach(obj => {
            if (obj && typeof obj === 'object') {
                Object.keys(obj).forEach(key => {
                    const valorLogica = obj[key];
                    // Si la lógica tiene un objeto con "nombre", lo guardamos.
                    if (valorLogica && typeof valorLogica === 'object' && valorLogica.nombre) {
                        claves_logica_unicas.set(key, valorLogica.nombre);
                    } 
                });
            }
        });

        // ■ Contenedor de la lista de pestañas
        const tabList = document.createElement('ul');
        tabList.className = 'nav nav-tabs mb-3';
        tabList.id = 'logicaTab';
        tabList.role = 'tablist';

        // ■ Contenedor de los paneles de contenido
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = 'logicaTabContent';

        // ■ Generamos Dinámicamente cada pestaña
        claves_logica_unicas.forEach((nombrePestana, motor_key) => {
            // --- Estructura del Botón/Pestaña ---
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';
            navItem.role = 'presentation';
            navItem.dataset.motor = motor_key; 

            const $tabButton = document.createElement('button');
            $tabButton.className = 'nav-link';
            $tabButton.id = `tab-${motor_key}`;
            $tabButton.setAttribute('data-bs-toggle', 'tab');
            $tabButton.setAttribute('data-bs-target', `#panel-${motor_key}`);
            $tabButton.type = 'button';
            $tabButton.role = 'tab';
            $tabButton.setAttribute('aria-controls', `panel-${motor_key}`);
            $tabButton.setAttribute('aria-selected', 'false');
            $tabButton.innerText = nombrePestana; // Usamos el nombre detectado del JSON

            navItem.appendChild($tabButton);
            tabList.appendChild(navItem);

            // --- PANEL(DIV) DE CONTENIDO ---
            const panel = document.createElement('div');
            panel.className = 'tab-pane fade';
            panel.id = `panel-${motor_key}`;
            panel.role = 'tabpanel';
            panel.setAttribute('aria-labelledby', `tab-${motor_key}`);
            
            // ■ Crear el AREA DE CONTENIDO.
            const $content_div = document.createElement('div');
            $content_div.className = 'p-3 border border-top-0 area-de-contenido';
            $content_div.textContent = `Cargando datos de ${nombrePestana}...`; 

            // 3. Añadir el div interno al panel
            panel.appendChild($content_div);

            tabContent.appendChild(panel);
        });

        body.appendChild(tabList);
        body.appendChild(tabContent);

        $offcanvas_logica.appendChild(header);
        $offcanvas_logica.appendChild(body);
        document.body.appendChild($offcanvas_logica);

        return $offcanvas_logica;
        // $offcanvas_logica ahora tiene tantas pestañas como logicas distintas hay en el Catalogo.
        // Cuando vaya a abrir tengo que ver que logicas tiene el elemento que quiero abrir.
    }

    /**
     * @description Abre el offcanvas inferior visualizando únicamente 
     * las lógicas válidas que posea el elemento cliqueado.
     * @param {HTMLElement} elemento_dom - Elemento del salón sobre el que se hace clic.
     */
    abrir_offcanvas(elemento_dom) {
        // ■ Datos iniciales
        const grupo_el = elemento_dom.dataset.id_key;
        const ctlg_el = Catalogo.get(grupo_el);
        if (!ctlg_el || !ctlg_el.logica) return null;
        const $offcanvas_dom = document.getElementById('offcanvas_logica');
        if (!$offcanvas_dom) return null;

        // ■ Actualizar el Título
        this.set_title(`Opciones de ${elemento_dom.id || 'Elemento'} - (${ctlg_el.grupo}) - (${ctlg_el.rol})`);
        
        // ■ Cacho la logica del elemento en Catalogo.
        const logica_el = ctlg_el.logica;
        
        // ■ Cacho del contenedor de Pestañas(logicaTab), los Paneles de cada elemento(li).
        const navItems = $offcanvas_dom.querySelectorAll('#logicaTab .nav-item');
        const tab_motores = $offcanvas_dom.querySelectorAll('[data-motor]');    // prefiero x dataset
        
        // ■ Recorro cada pestaña.
        let primerTabVisible = null;
        tab_motores.forEach(item => {
            const motor = item.dataset.motor;          // dataset establecido al crear offcanvas-logica.
            const data_logica = logica_el[motor];      // Datos del catalogo del elemento.
            
            const botonTab = item.querySelector('.nav-link');           // clase del boton.
            const idPanel = botonTab.getAttribute('data-bs-target');    // "#panel-motor_mensajes"
            const $panel_dom = $offcanvas_dom.querySelector(idPanel);
            
            // ■ Resetea el boton y el panel.
            botonTab.classList.remove('active');
            botonTab.setAttribute('aria-selected', 'false');
            if ($panel_dom) $panel_dom.classList.remove('show', 'active');

            // ■ Evalua Motores(Logicas)
            if (data_logica !== undefined && data_logica !== false && data_logica !== null) {
                item.classList.remove('d-none'); 
                
                if (!primerTabVisible) {
                    primerTabVisible = { boton: botonTab, panel: $panel_dom };
                }

                // ■ ■ Inyección de contenido 
                const areaContenido = $panel_dom.querySelector('.area-de-contenido');                
                this.#inyectar_render_motor(motor, data_logica, areaContenido, elemento_dom);

            } else {
                item.classList.add('d-none');
            }
        });

        if (primerTabVisible) {
            primerTabVisible.boton.classList.add('active');
            primerTabVisible.boton.setAttribute('aria-selected', 'true');
            if (primerTabVisible.panel) {
                primerTabVisible.panel.classList.add('show', 'active');
            }
        }

        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance($offcanvas_dom);
        bsOffcanvas.show();
        return $offcanvas_dom;
    }

    set_title(html_content) {
        const $title_dom = document.getElementById('offcanvas_logica_title');
        if (!$title_dom) return;
        $title_dom.innerHTML = html_content;
    }
    /**
     * @description Reemplaza TODO el contenido del cuerpo del offcanvas.
     * ADVERTENCIA: Si usas este método, sobrescribirás el widget de pestañas (Tabs). 
     * Si solo quieres modificar el interior de una pestaña, deberías seleccionar su panel específico.
     */
    set_body(html_content) {
        const $body_dom = document.getElementById('offcanvas_logica_body');
        if ($body_dom) {
            $body_dom.innerHTML = html_content;
        }
    }

    /**
     * @description Ejecuta el método render del motor correspondiente e inyecta el resultado.
     * @param {String} motor_busca - La clave del motor (ej. 'motor_mensajes', 'motor_alergias')
     * @param {Object} data_logica - Los datos de configuración de esa lógica para el elemento (ej. el objeto con 'nombre', 'content', etc.)
     * @param {HTMLElement} areaContenido - El contenedor DOM donde se inyectará el resultado
     */
    #inyectar_render_motor(motor_busca, data_logica, areaContenido, elemento_dom=null) {
        // 1. Obtenemos la instancia del motor desde el Catálogo
        const instancia_motor = Catalogo.get_motor(motor_busca);

        // 2. Verificamos que exista y tenga un método render()
        if(!instancia_motor || !instancia_motor.render) {
            // Fallback por si el motor no ha sido instanciado con Catalogo.set_motor() previamente
            areaContenido.innerHTML = `<span class="text-danger">Motor <strong>${motor_busca}</strong> no instanciado o sin método render().</span>`;
            return;
        }
            
        // Limpiamos el área antes de inyectar lo nuevo
        areaContenido.innerHTML = '';         
        const resultado = instancia_motor.render(data_logica, elemento_dom);

        // 3. Evaluamos qué tipo de dato ha devuelto el motor para insertarlo correctamente
        if (typeof resultado === 'string') {
            areaContenido.innerHTML = resultado;
        } else if (resultado instanceof Node) {
            areaContenido.appendChild(resultado);
        } else {
            console.warn(`El motor ${motor_busca} no ha devuelto ni un String ni un Nodo del DOM.`);
        }
    }


}


