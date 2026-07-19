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
    
    static #botones_crud_grabar = Object.freeze([
        { action: 'grabar', texto: '🎤', title: 'Grabación de Voz', className: 'btn-grabar' },
        { action: 'guardar', texto: '💾', title: 'Guardar mensaje', className: 'btn-guardar' },
        { action: 'reset', texto: '🔁', title: 'Limpiar texto', className: 'btn-reset' },
        { action: 'eliminar', texto: '🗑️', title: 'Eliminar mensaje', className: 'btn-delete' }
	]);

    // 
    static #DATA = Object.freeze({
    mesa: {
        slug: 'mesa',
        grupo: 'player',
        rol: 'central',         // subgrupo que reune elementos de rol cliente
        fisica: {
            ancho: 1, // Medida en celdas/baldosas
            alto: 1,
            colision: true // true = colisiona, false = no colisiona (ej: fondo)
        },
        visual: {
            nombre: 'Titulo de la Mesa',
            content: `<svg class="imagen_menu imagen_menu--mesa"fill="currentColor" viewBox="0 0 50 50" width="30" height="30"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><path class="st0" d="M10.585938 11L0.38085938 21.205078 A 1.0001 1.0001 0 0 0 0.18945312 21.396484L0 21.585938L0 21.832031 A 1.0001 1.0001 0 0 0 0 22.158203L0 28L3 28L3 50L9 50L9 28L11 28L11 43L17 43L17 28L33 28L33 43L39 43L39 28L41 28L41 50L47 50L47 28L50 28L50 22.167969 A 1.0001 1.0001 0 0 0 50 21.841797L50 21.585938L49.806641 21.392578 A 1.0001 1.0001 0 0 0 49.623047 21.207031 A 1.0001 1.0001 0 0 0 49.617188 21.203125L39.414062 11L39 11L10.585938 11 z M 11.414062 13L38.585938 13L46.585938 21L3.4140625 21L11.414062 13 z M 2 23L48 23L48 26L46.167969 26 A 1.0001 1.0001 0 0 0 45.841797 26L42.154297 26 A 1.0001 1.0001 0 0 0 41.984375 25.986328 A 1.0001 1.0001 0 0 0 41.839844 26L38.167969 26 A 1.0001 1.0001 0 0 0 37.841797 26L34.154297 26 A 1.0001 1.0001 0 0 0 33.984375 25.986328 A 1.0001 1.0001 0 0 0 33.839844 26L16.167969 26 A 1.0001 1.0001 0 0 0 15.841797 26L12.154297 26 A 1.0001 1.0001 0 0 0 11.984375 25.986328 A 1.0001 1.0001 0 0 0 11.839844 26L8.1679688 26 A 1.0001 1.0001 0 0 0 7.8417969 26L4.1542969 26 A 1.0001 1.0001 0 0 0 3.984375 25.986328 A 1.0001 1.0001 0 0 0 3.8398438 26L2 26L2 23 z M 5 28L7 28L7 48L5 48L5 28 z M 13 28L15 28L15 41L13 41L13 28 z M 35 28L37 28L37 41L35 41L35 28 z M 43 28L45 28L45 48L43 48L43 28 z"/></svg>`,
            css: 'style_visual_reserver'
        },
        logica: {
            motor_mensajes: { nombre: "Mensajes", content: 'sumatorio', css: 'estyle_msg_reserver', }
        }
    },
    silla: {
        slug: 'silla',
        grupo: 'player',
        rol: 'cliente',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc) 
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            nombre: 'Titulo de la Silla',
            content: `<svg class="imagen_menu imagen_menu--silla st0"fill="currentColor" viewBox="0 0 512 512" width="30" height="30"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><g><rect x="262.97" y="298.368" class="st0" width="33.329" height="155.344"/><path class="st0" d="M243.216,23.156l-50.788,201.47h-42.233l-89.148,13.431v36.624l10.08,1.437h-10.08v177.595h33.329V279.441l55.819,7.952V512h41.146V287.392h158.98V512h41.137V259.523L450.953,0L243.216,23.156z M349.317,224.626H225.884l43.386-172.06l122.188-11.116L349.317,224.626z"/></g></svg>`,
            css: 'style_visual_cliente'
        },
        logica: {
            motor_alergias: { nombre: "Alergias" , content: Catalogo.get_alergenos(), css:'', },
            motor_mensajes: { nombre: "Mensajes" , content: 'single', css: 'estyle_msg_cliente',  }
        }
    },
    taburete: {
        slug: 'taburete',
        grupo: 'player',
        rol: 'central',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            nombre: 'Titulo del Taburete',
            content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50"><g fill="#8B4513"><rect x="12" y="25" width="4" height="20" rx="1" /><rect x="34" y="25" width="4" height="20" rx="1" /><rect x="18" y="20" width="4" height="15" rx="1" opacity="0.8" /><rect x="28" y="20" width="4" height="15" rx="1" opacity="0.8" /><ellipse cx="25" cy="20" rx="18" ry="12" /><path d="M7,20 Q7,30 25,30 Q43,30 43,20 L43,22 Q43,32 25,32 Q7,32 7,22 Z" /></g></svg>',
            css: 'style_visual_cliente'
        },
        logica: {
            motor_alergias: { nombre: "Alergias" , content: Catalogo.get_alergenos(), css:'',},
            motor_mensajes: { nombre: "Mensajes" , content: 'single', css: 'estyle_msg_cliente', }
        }
    },
    // planta: {
    //     slug: 'planta',
    //     grupo: 'decoration',
    //     rol: 'decoracion',   
    //     fisica: { ancho: 1, alto: 1, colision: true },
    //     visual: { nombre: 'Titulo del Taburete', content: '', css: 'estiloPlanta' },
    // },
    // esquina_muro: {
    //     slug: 'esquina_muro',
    //     grupo: 'structure',
    //     rol: 'estructura',    
    //     fisica: { ancho: 2, alto: 1, colision: true },
    //     visual: { nombre: 'Titulo del Taburete',  content: '', css: 'estiloEsquinaMuro' },
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
    static get_btns_crud_grabar(){
        return this.#botones_crud_grabar;
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

    /* Sin uso de Momento */
	static _crear_botonera_crud_grabar(clase_botonera = 'motor-mensajes-botonera') {
		const $botonera = document.createElement('div');
		$botonera.className = `d-flex gap-4   ${clase_botonera}`;
		
		// Los Botones los cojo de Catalogo
		const btns = Catalogo.get_btns_crud_grabar();
		btns.forEach((boton) => {
			const button = document.createElement('button');
			button.type = 'button';
			// Le aplicamos la clase de Catalogo
			button.className = `btn btn-sm   ${boton.className}`;
			button.dataset.action = boton.action;
			button.title = boton.title;
			button.textContent = boton.texto;
			$botonera.appendChild(button);
		});
		return $botonera;
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
    $offcanvas_logica = null;
    
    constructor(instancia_salon=null) {        
        this.Salon = instancia_salon;
        this.$elemento_news_actual = null;

        // Creamos el offcanvas en el DOM inmediatamente al instanciar la clase
        this.$offcanvas_logica = this.#crear_offcanvas_logica();
        this.#add_listeners_news();
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

        // $offcanvas_logica.className = 'offcanvas offcanvas-bottom'; 
        $offcanvas_logica.className = 'offcanvas offcanvas-bottom offcanvas-logica';
        $offcanvas_logica.tabIndex = -1;
        $offcanvas_logica.dataset.logica = 'logica';    // para identificar por dataset.
    
        // ■ Header del offcanvas
        const header = document.createElement('div');
        header.className = 'offcanvas-header offcanvas-logica-header';
        
        // ■ TITULO
        const title = document.createElement('div');
        title.className = 'offcanvas-title  offcanvas-logica-title';
        title.id = 'offcanvas_logica_title';
        // title.textContent = 'THE LOGIC ZONE';
        
        // ■ ESPACIO DEL ICONO
        const title_icon = document.createElement('span');
        title_icon.id = 'offcanvas_logica_title_icon';
        title_icon.className = 'offcanvas-logica-title-icon';
        // ■ ESPACIO DEL TEXTO
        const title_text = document.createElement('span');
        title_text.id = 'offcanvas_logica_title_text';
        title_text.textContent = 'THE LOGIC ZONE';
               
        title.appendChild(title_icon);
        title.appendChild(title_text);

        // ■ BOTON CERRAR DEL TITIULO
        const $btn_close = document.createElement('button');
        $btn_close.type = 'button';
        $btn_close.className = 'btn-close text-reset';
        $btn_close.setAttribute('data-bs-dismiss', 'offcanvas');
        $btn_close.setAttribute('aria-label', 'Close');
        
        // ■ 
        header.appendChild(title);
        header.appendChild($btn_close);
        
        // ■ News verde/rojo/sin color.
        const news = document.createElement('div');
        news.className = 'offcanvas-logica-news';
        news.id = 'offcanvas_logica_news';
        news.textContent = '■ ZONA NEWS';
        news.dataset.logica = 'news';
        
        // ■ BODY DEL OFFCANVAS 
        const $body = document.createElement('div');
        $body.className = 'offcanvas-body';
        $body.id = 'offcanvas_logica_body';

        // DETECTAR TODAS LAS LÓGICAS DISTINTAS Y GENERAR WIDGET DE PESTAÑAS (BOOTSTRAP TABS)
        // Extraemos todos los objetos 'logica' del catálogo usando la clase Catalogo
        const logicas_distintas = Catalogo.get_distinto_s('logica');
        
        // Recopilamos las llaves únicas y buscamos su propiedad 'nombre'
        const claves_logica_unicas = new Map(); // Usamos Map para guardar la clave y su nombre
        logicas_distintas.forEach(item_logica => {
            if(!item_logica || typeof item_logica != 'object') 
                return;
            // if (item_logica && typeof item_logica === 'object') {
            Object.keys(item_logica).forEach(key => {
                const valorLogica = item_logica[key];
                // Si la lógica tiene un objeto con "nombre", lo guardamos.
                if (valorLogica && typeof valorLogica === 'object' && valorLogica.nombre) {
                    claves_logica_unicas.set(key, valorLogica.nombre);
                } 
            });
            // }
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

        // ■ Generamos Dinámicamente cada pestaña ('Titulo Alertas', 'motor_alertas')
        claves_logica_unicas.forEach((nombre_pestana, key_motor) => {
            // --- Estructura del Botón/Pestaña ---
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';
            navItem.role = 'presentation';
            navItem.dataset.motor = key_motor; 

            const $tabButton = document.createElement('button');
            $tabButton.className = 'nav-link';
            $tabButton.id = `tab-${key_motor}`;     // tab-motor_mensajes
            $tabButton.setAttribute('data-bs-toggle', 'tab');
            $tabButton.setAttribute('data-bs-target', `#panel-${key_motor}`);
            $tabButton.type = 'button';
            $tabButton.role = 'tab';
            $tabButton.setAttribute('aria-controls', `panel-${key_motor}`);
            $tabButton.setAttribute('aria-selected', 'false');
            $tabButton.innerText = nombre_pestana; // Usamos el nombre detectado del JSON

            navItem.appendChild($tabButton);
            tabList.appendChild(navItem);

            // --- PANEL(DIV) DE CONTENIDO ---
            const $panel = document.createElement('div');
            $panel.className = 'tab-pane fade';
            $panel.id = `panel-${key_motor}`;
            $panel.role = 'tabpanel';
            $panel.setAttribute('aria-labelledby', `tab-${key_motor}`);
            
            // ■ Crear el AREA DE CONTENIDO.
            const $content_div = document.createElement('div');
            $content_div.className = 'p-3 border border-top-0    area-de-contenido';
            $content_div.textContent = `Cargando datos de ${nombre_pestana}...`; 
            
            // 3. Añadir el div interno al panel
            $panel.appendChild($content_div);
            
            tabContent.appendChild($panel);
        });
        
        $body.appendChild(news);
        $body.appendChild(tabList);
        $body.appendChild(tabContent);

        $offcanvas_logica.appendChild(header);
        $offcanvas_logica.appendChild($body);
        
        document.body.appendChild($offcanvas_logica);

        return $offcanvas_logica;
        // ■ $offcanvas_logica ahora tiene tantas pestañas como logicas distintas hay en el Catalogo.
        // ■ Cuando vaya a abrir tengo que ver que logicas tiene el elemento que quiero abrir.
    }

    /**
     * @description Abre el offcanvas inferior visualizando únicamente 
     * las lógicas válidas que posea el elemento cliqueado.
     * @param {HTMLElement} elemento_dom - Elemento del salón sobre el que se hace clic.
     */
    abrir_ventana_logica(elemento_dom, posicion_offcanvas_logica='down') {
        if(!['up','down'].includes(posicion_offcanvas_logica)) return;
        const $el_dom = e_Salon._to_element(elemento_dom);
        if(!$el_dom) return;
        
        const id_key = $el_dom.dataset.id_key;
        if(!id_key) return null;

        const ctlg_el = Catalogo.get(id_key);
        if (!ctlg_el || !ctlg_el.logica) return null;
        
        // ⚠️⚠️ ALERTA .... Elegir una 
        const $offcanvas_dom = document.getElementById('offcanvas_logica');     // x id 
        const $offcanvas_dom_ = document.querySelector('.offcanvas-logica');    // x className
        const $offcanvas_dom__ = e_Salon._to_element('.offcanvas-logica');      // x className custom
        const $offcanvas_dom___ = e_Salon._to_element('[data-logica = logica]');  // x dataset custom
        if (!$offcanvas_dom) return null;
        
        // ⚠️⚠️ ALERTA 
        const offc = this.$offcanvas_logica;
        
        // ■ Posición offcanvas-logica (arriba / abajo)
        this.#posicionar_offcanvas_logica($offcanvas_dom, posicion_offcanvas_logica);
        
        // ■ Obtenemos el icono del elemento.
        const svg_icon = this.#get_icono(id_key);
        
        // ■ ■ Establecemos el titulo (icono + id)
        this.set_title($el_dom.id, svg_icon);
        this.$elemento_news_actual = $el_dom;

        this.#actualizar_news($el_dom);

        // ■ Cacho la logica del elemento en Catalogo.
        const logica_el = ctlg_el.logica;
        
        // ■ Cacho del contenedor de Pestañas(logicaTab), los Paneles de cada elemento(li).
        const navItems = $offcanvas_dom.querySelectorAll('#logicaTab .nav-item');
        const tab_motores = $offcanvas_dom.querySelectorAll('[data-motor]');    // prefiero x dataset
        
        let primerTabVisible = null;
        // ■ Recorro cada pestaña.
        tab_motores.forEach(item => {
            const motor = item.dataset.motor;          // dataset establecido al crear offcanvas-logica.
            const data_logica = logica_el[motor];      // Datos del catalogo del elemento.
            
            const $pestana = item.querySelector('.nav-link');           // clase del boton.
            const id_panel = $pestana.getAttribute('data-bs-target');    // de cada pestaña saco su "#panel-motor_mensajes"
            const $panel_dom = $offcanvas_dom.querySelector(id_panel);
            
            // ■ Resetea el boton y el panel.
            $pestana.classList.remove('active');
            $pestana.setAttribute('aria-selected', 'false');
            if ($panel_dom) $panel_dom.classList.remove('show', 'active');

            // ■ Evalua Motores(Logicas)
            if (!data_logica){
                item.classList.add('d-none');
            }else{
                item.classList.remove('d-none'); 
                
                if (!primerTabVisible) {
                    primerTabVisible = { boton: $pestana, panel: $panel_dom };
                }
    
                // ■ ■ Inyección de contenido 
                const $area_de_contenido = $panel_dom.querySelector('.area-de-contenido');   
                             
                this.#inyectar_render_motor($el_dom , motor, data_logica, $area_de_contenido );

            }

            // if (data_logica !== undefined && data_logica !== false && data_logica !== null) {

            // } else {
            //     item.classList.add('d-none');
            // }
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

    /**
     * @description Sitúa el offcanvas de lógica arriba o abajo antes de abrirlo.
     * @param {HTMLElement} $offcanvas_dom
     * @param {'up'|'down'} posicion_offcanvas_logica
     */
    #posicionar_offcanvas_logica($offcanvas_dom, posicion_offcanvas_logica='down') {
        const posicion = posicion_offcanvas_logica === 'up' ? 'up' : 'down';

        // ❓❓ quiero otra forma de conseguir la clase. Teniendo offcanvas_dom lo consigo.
        const clase_actual = posicion === 'up' ? 'offcanvas-top' : 'offcanvas-bottom';
        const clase_anterior = posicion === 'up' ? 'offcanvas-bottom' : 'offcanvas-top';

        bootstrap.Offcanvas.getInstance($offcanvas_dom)?.dispose();

        // $offcanvas_dom.classList.remove(clase_anterior);
        $offcanvas_dom.classList.remove('offcanvas-top');
        $offcanvas_dom.classList.remove('offcanvas-bottom');

        $offcanvas_dom.classList.add(clase_actual);
        $offcanvas_dom.style.height = 'auto';
        $offcanvas_dom.style.minHeight = '20vh';
        $offcanvas_dom.style.maxHeight = '35vh';
        $offcanvas_dom.dataset.posicionLogica = posicion;
    }

    /**
     * @description Establece el CONTENIDO DEL título y el icono en el offcanvas.
     * @param {String} texto - El identificador o texto a mostrar.
     * @param {String} icono_html - (Opcional) El string SVG que se inyectará.
     */
    set_title(texto, icono_html = '') {
        const $icon_dom = document.getElementById('offcanvas_logica_title_icon');
        const $text_dom = document.getElementById('offcanvas_logica_title_text');

        if ($icon_dom) $icon_dom.innerHTML = icono_html;
        if ($text_dom) $text_dom.textContent = texto;
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
     * @description Obtiene el icono (SVG/HTML) asociado al elemento desde el catálogo.
     * @param {String} id_key - ID o clave del elemento en el catálogo.
     * @returns {String} - String con el contenido visual (SVG/HTML) o cadena vacía.
     */
    #get_icono(id_key) {
        if (!id_key) return '';
        const ctlg_el = Catalogo.get(id_key);
        return ctlg_el?.visual?.content || '';
    }

    /**
     * ### Ejecuta el método render del motor pasado e inyecta el resultado.
     * @param {String} motor_busca - La clave del motor (ej. 'motor_mensajes', 'motor_alergias')
     * @param {Object} data_logica - Los datos de configuración de esa lógica para el elemento (ej. el objeto con 'nombre', 'content', etc.)
     * @param {HTMLElement} $area_de_contenido - El contenedor DOM donde se inyectará el resultado
     */
    #inyectar_render_motor(elemento_dom , motor_busca, data_logica, $area_de_contenido) {
        // 1. Obtenemos la instancia del motor desde el Catálogo
        const instancia_motor = Catalogo.get_motor(motor_busca);
        if(!instancia_motor || !instancia_motor.render) {
            // Fallback por si el motor no ha sido instanciado con Catalogo.set_motor() previamente
            $area_de_contenido.innerHTML = `<span class="text-danger">Motor <strong>${motor_busca}</strong> no instanciado o sin método render().</span>`;
            return false;
        }
            
        // Limpiamos el área antes de inyectar lo nuevo
        $area_de_contenido.innerHTML = '';         
        const $renderizado_html = instancia_motor.render(data_logica, elemento_dom);

        // 3. Evaluamos qué tipo de dato ha devuelto el motor para insertarlo correctamente
        if (typeof $renderizado_html === 'string') {
            $area_de_contenido.innerHTML = $renderizado_html;
            return true;
        } else if ($renderizado_html instanceof Node) {
            $area_de_contenido.appendChild($renderizado_html);
            return true;
        } else {
            console.warn(`El motor ${motor_busca} no ha devuelto ni un String ni un Nodo del DOM.`);
            return false;
        }
    }

    /**
     * ### crea un evento personalizado
     */
    #add_listeners_news() {
        const $news = this.$offcanvas_logica?.querySelector('[data-logica="news"]');
        if (!$news) return;

        $news.addEventListener('click', (event) => this.#on_click_news(event));

        document.addEventListener('motor_alergias:change', () => {
            if (this.$elemento_news_actual) {
                this.#actualizar_news(this.$elemento_news_actual);
            }
        });
    }
    #on_click_news(event) {
        const $btn_cerrar = event.target.closest('[data-action="eliminar-alergia-news"]');
        if (!$btn_cerrar || !this.$elemento_news_actual) return;

        const $el_dom = this.$elemento_news_actual;
        if ($el_dom.dataset.rol !== 'cliente') return;

        const alergia = $btn_cerrar.dataset.alergia;
        if (!alergia) return;

        const MA = Catalogo.get_motor('motor_alergias');
        if (!MA) return;

        const alergias = Array.isArray(MA.get($el_dom.id)) ? MA.get($el_dom.id) : [];
        const nuevas_alergias = alergias.filter((item) => item !== alergia);
        MA.set($el_dom.id, nuevas_alergias);
        this.#actualizar_news($el_dom);
    }
    /** 
     * ### Actualiza el contenido de la zona 'News' creada en offcanvas-logica.
     * @param {string|Html} elemento_dom, id o elemento html sobre el que actualizar News.
     */
    #actualizar_news(elemento_dom) {
		const $news = this.$offcanvas_logica?.querySelector('[data-logica="news"]');
		const $el_dom = e_Salon._to_element(elemento_dom);
		if (!$news || !$el_dom) return;

		const MA = Catalogo.get_motor('motor_alergias');
		if (!MA) {
			this.#pintar_news_vacia($news, 'Sin motor de alergias.');
			return;
		}

		const rol = $el_dom.dataset.rol;
		if (rol === 'cliente') {
			const alergias = Array.isArray(MA.get($el_dom.id)) ? MA.get($el_dom.id) : [];
			this.#pintar_news_alergias($news, alergias, { editable: true });
			return;
		}

		if (rol === 'central') {
			const alergias_reserva = this.#get_alergias_reserva($el_dom.id);
			this.#pintar_news_alergias($news, alergias_reserva, { editable: false });
			return;
		}

		this.#pintar_news_vacia($news, `Rol no registrado: ${rol || 'sin rol'}`);
	}

    /** 
     * ### Actualiza el contenido de la zona 'News' creada en offcanvas-logica.
     * @param {string|Html} id_elemento, id sobre el que actualizar News.
     * @param {Motor_Alergias} motor_alergias, instancia del motor_alergias a usar.
     */
    #get_alergias_reserva(id_elemento = '') {
		const MA = Catalogo.get_motor('motor_alergias');
		if (!this.Salon || !MA || !id_elemento) return [];

		const index_reserva = this.Salon._get_indice_en_reserva_s(id_elemento);
		const reserva = this.Salon.reservas?.[index_reserva];
		if (!reserva) return [];

		const ids_reserva = [
			...(Array.isArray(reserva.reservadores) ? reserva.reservadores : []),
			...(Array.isArray(reserva.clientes) ? reserva.clientes : [])
		];

		const alergias = new Set();
		ids_reserva.forEach((id) => {
			const alergias_elemento = Array.isArray(MA.get(id)) ? MA.get(id) : [];
			alergias_elemento.forEach((alergia) => alergias.add(alergia));
		});

		return Array.from(alergias);
	}
    /** 
     * ### Pinta en la Zona News las alergias pasadas en formato lbl's
     * @param {Html} $news, objeto html que es el receptor/contenedor de las alergias a pintar.
     * @param {Array} alergias, array de alergias a pintar.
     * @param {Dict} opciones, diccionario de opciones a tener en cuenta.
     */
    #pintar_news_alergias($news, alergias = [], opciones = {}) {
		$news.innerHTML = '';
		$news.style.color = 'white';

		if (!Array.isArray(alergias) || alergias.length === 0) {
			this.#pintar_news_vacia($news, '✔️ Free');
			return;
		}

		$news.style.background = 'red';

		alergias.forEach((alergia) => {
			const $label = document.createElement('span');
			$label.className = 'alergia-tag-pop';
			$label.textContent = alergia;

			if (opciones.editable) {
				const $cerrar = document.createElement('button');
				$cerrar.type = 'button';
				$cerrar.className = 'alergia-tag-close';
				$cerrar.dataset.action = 'eliminar-alergia-news';
				$cerrar.dataset.alergia = alergia;
				$cerrar.setAttribute('aria-label', `Eliminar alergia ${alergia}`);
				$cerrar.textContent = '×';
				$label.appendChild($cerrar);
			}

			$news.appendChild($label);
		});
	}
    /** 
     * ### Lo que pintamos cuando no hay alergias.
     * @param {Html} $news, 
     * @param {string} texto, 
     */
    #pintar_news_vacia($news, texto = '') {
            $news.innerHTML = '';
            $news.textContent = texto;
            $news.style.background = 'green';
            $news.style.color = 'white';
    }
}


