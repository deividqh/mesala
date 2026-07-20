/**
 * @file motores.js
 * @description Motores de datos para la lógica del salón.
 *
 * Los motores NO construyen interfaz. La UI pertenece a Logica_Catalogo.
 * Estas clases sólo guardan, leen, actualizan y eliminan datos.
 */

/**
 * No existe Interfaz o clase Abstract en javascript.
 * Esto es una simulación de clase. No es real porque las clases hijas no están obligadas a 
 * tener estas funciones, pero si las instancias y no las tiene dará error.
 */
class Interfaz_Custom_Motores {
	d_data = {};
	constructor() {
		// Evita que esta clase se instancie directamente
		if (this.constructor === Interfaz_Custom_Motores) {
			throw new Error("No puedes instanciar una clase abstracta.");
		}
		if (this.d_data === undefined){
			throw new Error("Debes definir this.d_data si eres hijo de tu padre Interfaz_Custom_Motores");
		}
	}

	// Métodos obligatorios ()
	// Marcan cuales son las funciones comunes para todos los motores.
	render() {
		throw new Error("El método 'render()' debe ser implementado.");
	}
	get() {
		throw new Error("El método 'render()' debe ser implementado.");
	}
	get_all() {
		throw new Error("El método 'render()' debe ser implementado.");
	}
	set() {
		throw new Error("El método 'render()' debe ser implementado.");
	}  
	update() {
		throw new Error("El método 'render()' debe ser implementado.");
	}
	delete() {
		throw new Error("El método 'render()' debe ser implementado.");
	}
  
}


/**
 * Motor de mensajes.
 *
 * Responsabilidad única:
 * - Mantener el diccionario de mensajes por elemento del salón.
 * - Respetar la estructura de datos histórica para no romper guardado/carga.
 *
 * Estructura de salida:
 * {
 * silla_3: { usuario: 'usu', fecha: '25/8/2025', hora: '21:27:41', mensaje: 'sin gluten' }
 * }
 */
class Motor_Mensajes extends Interfaz_Custom_Motores{
    static FICHA_VACIA = Object.freeze({ fecha: '', hora: '', usuario: '', mensaje: '' });

    constructor(instancia_salon, parametros_opt={}) {
		super();
		this.d_data = {};
        this.ids_reserva_actual = [];
        
        this.id_elemento = '';

		this.Salon = instancia_salon;
		
    }

    _crear_ficha(mensaje = '', ficha_base = {}) {
        
		const now = new Date();

        return {
            ...Motor_Mensajes.FICHA_VACIA,
            ...ficha_base,
            usuario: ficha_base.usuario || 'usu',
            fecha: ficha_base.fecha || now.toLocaleDateString(),
            hora: ficha_base.hora || now.toLocaleTimeString(),
            mensaje: typeof mensaje === 'string' ? mensaje : ''
        };
    }

    _normalizar_ficha(valor = '') {
        if (typeof valor === 'string') return this._crear_ficha(valor);
        if (!valor || typeof valor !== 'object') return this._crear_ficha('');
        return this._crear_ficha(valor.mensaje || '', valor);
    }

    get(id_elemento = '') {
        if (!id_elemento) return null;
        return this.d_data[id_elemento] || null;
    }

    get_mensaje(id_elemento = '') {
        return this.get(id_elemento)?.mensaje || '';
    }

    get_all() {
        return this.d_data;
    }

    set(id_elemento = '', mensaje = '', ficha_base = {}) {
        if (!id_elemento) return false;

        const texto = typeof mensaje === 'string' ? mensaje : '';
        if (!texto.trim()) {
            this.delete(id_elemento);
            return true;
        }

        this.d_data[id_elemento] = this._crear_ficha(texto, ficha_base);
		this._actualizar_markador_elemento(id_elemento);
        return true;
    }

    set_ficha(id_elemento = '', ficha = {}) {
        if (!id_elemento) return false;
        this.d_data[id_elemento] = this._normalizar_ficha(ficha);
        if (!this.d_data[id_elemento].mensaje.trim()) 
			this.delete(id_elemento);

		this._actualizar_markador_elemento(id_elemento);

        return true;
    }

    set_many(diccionario = {}) {
        if (!diccionario || typeof diccionario !== 'object') return false;
        Object.entries(diccionario).forEach(([id, valor]) => {
            if (typeof valor === 'string') this.set(id, valor);
            else this.set_ficha(id, valor);
        });
        return true;
    }

    delete(id_elemento = '') {
        if (!id_elemento) return false;
        delete this.d_data[id_elemento];

		this._actualizar_markador_elemento(id_elemento);
        return true;
    }

    has(id_elemento = '') {
        return this.get_mensaje(id_elemento).trim() !== '';
    }

    reset() {
		Object.keys(this.d_data).forEach((id) => this.__ocultar_markador(id));
        this.d_data = {};
    }

    /* Metodo que se instancia desde fuera para tener todo el diccionario d_data. */
	api_mensajes(){
		return this.get_all();
	}
	
	/*  */
    update(id_elemento = '', valor_mensaje = null) {
		if (!id_elemento) return false;
        if (valor_mensaje === null) {
			if (!this.d_data[id_elemento]) {
				this.d_data[id_elemento] = { ...Motor_Mensajes.FICHA_VACIA };
            }
			this._actualizar_markador_elemento(id_elemento);
            return true;
        }
        return this.set(id_elemento, valor_mensaje);
    }

	/*  */
    read_data() {
        return Object.entries(this.d_data)
            .map(([key, value]) => `📍${key}: ${JSON.stringify(value)}`)
            .join('\n');
    }

	/*  */
    reset_all_data() {
        this.reset();
    }
	/*  */
	_actualizar_markador_elemento(id_elemento = '') {
        if (!id_elemento) return;
        if (this.has(id_elemento)) 
			this.__mostrar_markador(id_elemento);
        else 
			this.__ocultar_markador(id_elemento);
    }
	/*  */
    __mostrar_markador(id_elemento = '') {
        const elemento_dom = e_Salon._to_element(id_elemento);
        if (!elemento_dom) return;

        elemento_dom.classList.add('elemento_con_mensaje');

        let $markador = elemento_dom.querySelector('.markador_mensaje');
        if (!$markador) {
            $markador = document.createElement('i');
            // $markador.className = 'bi bi-brightness-low-fill markador_mensaje';
            $markador.className = 'bi bi-check-square-fill markador_mensaje';
            $markador.setAttribute('aria-hidden', 'true');
            elemento_dom.appendChild($markador);
        }

        // $markador.style.color = '#5727a5';
        $markador.style.display = 'block';
    }

	/* markador_mensaje
	elemento_con_mensaje */
    __ocultar_markador(id_elemento = '') {
        // const elemento_dom = document.getElementById(id_elemento);
        const elemento_dom = e_Salon._to_element(id_elemento);

        if (!elemento_dom) return;

        const $markador = elemento_dom.querySelector('.markador_mensaje');
		// Si existe, lo elimino y elimino la clase
        if ($markador) 
			$markador.remove();
        elemento_dom.classList.remove('elemento_con_mensaje');
    }

	/*  */
    _crear_botones_accion(id_elemento, textarea) {
        const $botonera = document.createElement('div');
        $botonera.className = 'd-flex gap-4   motor-mensajes-botonera';
        
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

        // Delegación de eventos en el contenedor de la botonera
        $botonera.addEventListener('click', async (ev) => {
            const button = ev.target.closest('[data-action]');
            if (!button) return;

            const action = button.dataset.action;
            
            if (action === 'guardar') {
                const ret_ok = this.set(id_elemento, textarea.value);
				if(ret_ok)
                	Alertas_UI._NotA('Accion Guardar', 'Ejecutada con Exito');
				else
                	Alertas_UI._NotA('Accion Guardar', '❌ Error Al Guardar', 'danger');
            }
            
            if (action === 'eliminar') {
                try {
                    const confirm = await Alertas_UI.ConfirM('Accion Eliminar', 'Estas Seguro?', 'warning');
                    if (confirm === true) {
                        const ret_ok = this.delete(id_elemento);
						if (ret_ok){
							textarea.value = '';
							Alertas_UI._NotA('Eliminar Mensaje', `Mensaje de ${id_elemento} Eliminado con éxito`, 'success');
						}else{
							Alertas_UI._NotA('Eliminar Mensaje', `❌ Error al Eliminar el Mensaje de ${id_elemento}`, 'danger');
						}
                    }
                } catch (error) {
                    console.error("Fallo crítico en el modal de confirmación:", error);
                    Alertas_UI._NotA('Error de Sistema', 'No se pudo procesar la eliminación', 'danger');
                }
            }

            if (action === 'reset') {
                textarea.value = '';
                textarea.focus();
            }
            
            if (action === 'grabar') {
                this._accion_grabar(textarea, button);
                // Alertas_UI._NotA('Accion Grabar Audio', 'Ejecutada con Exito');
            }
        });

        return $botonera;
    }

	/*### Sin Uso  */
	_es_rol(id_elemento = '' , rol_busca='central') {
		const elemento_dom = e_Salon._to_element(id_elemento);
		const id_catalogo = elemento_dom?.dataset?.id_key || id_elemento.split('_')[0];
		const match_rol = Catalogo.get(id_catalogo)?.rol === rol_busca;
		return match_rol
	}

	_get_ids_reservadores_de_reserva(id_elemento) {
		const reservas = this.Salon.reservas ? this.Salon.reservas : []
		if (!reservas) return [];

		const index_en_reserva = this.Salon._get_indice_en_reserva_s(id_elemento);
		if(!index_en_reserva) return [];

		const reservadores = reservas[index_en_reserva].reservadores;
		if(!reservadores) return [];

		return reservadores;
	}
	_crear_sumatorio(elemento_dom) {
		const $sumatorio = document.createElement('div');
		$sumatorio.className = 'sumatorio';
		$sumatorio.setAttribute('role', 'note');
		$sumatorio.setAttribute('aria-live', 'polite');

		// sobre los rol=central del Catalogo.
		const reservadores = this._get_ids_reservadores_de_reserva(elemento_dom.id);
		reservadores.forEach((id) => {
			// • Excluyo el propio elemento_dom
			if(elemento_dom.id === id){
				return;				
			}
			// • una row y 3 cols por fila(icono, id_elemento, mensaje elemento)
			const row = document.createElement('div');
			const col_ico = document.createElement('span');
			const col_id = document.createElement('span');
			const col_mensaje = document.createElement('span');
			// • asigno las clases identificativas css
			row.className = 'sumatorio-row';			
			col_ico.className = 'sumatorio-ico';
			col_id.className = 'sumatorio-id';
			col_mensaje.className = 'sumatorio-msg';
			// • Cacha el catalogo de cada central(mesa, mesa_redonda, ...)
			const ctlg_el = Catalogo.get(id);		
			const svg_ico = ctlg_el.visual.content;	
			// • Asigno valores al dom
			col_ico.innerHTML = svg_ico;			
			col_id.textContent = `${id}: `;
			col_mensaje.textContent = this.get_mensaje(id);
			// • Asingno las columnas a la Fila primero
			row.appendChild(col_ico);
			row.appendChild(col_id);
			row.appendChild(col_mensaje);
			// ... y la fila al sumatorio y vamos a por otra fila
			$sumatorio.appendChild(row);
		});

		return $sumatorio;
	}

	_accion_grabar(textarea, button) {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition || !textarea) {
			console.warn('🎙️ Reconocimiento de voz no disponible en este navegador.');
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.lang = 'es-ES';
		recognition.continuous = false;
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.onstart = () => { button.textContent = '■'; };
		recognition.onend = () => { button.textContent = '🎤'; };
		recognition.onresult = (event) => {
			const texto = event?.results?.[0]?.[0]?.transcript || '';
			if (!texto) return;
			const espacio = textarea.value && !/\s$/.test(textarea.value) ? ' ' : '';
			textarea.value = `${textarea.value}${espacio}${texto}`.trimStart();
			textarea.dispatchEvent(new Event('input', { bubbles: true }));
			textarea.focus();
		};

		recognition.start();
	}

	// set_news($el_dom){
	// 	if(!$el_dom) return null;

	// 	const id_key_el = $el_dom.dataset.id_key;
	// 	const grupo_el = $el_dom.dataset.grupo;
	// 	const rol_el = $el_dom.dataset.rol;

	// 	const MA = Catalogo.get_motor('motor_alergias');
	// 	const reservas = this.Salon.reservas;
		
	// 	const $news = e_Salon._to_element('[data-logica = news]'); 
	// 	if(!$news) 
	// 		console.log('no news');

	// 	$news.textContent = '';
	// 	$news.innerHTML = '';
	// 	$news.style.background = 'none';
	// 	$news.style.color = 'white';

	// 	if(rol_el === 'cliente'){
	// 		if(MA){
	// 			console.log('■ ■ ■ Motor Alergias.d_data desde Motor__Mensajes.!!')
	// 			// console.log(JSON.stringify(MA.d_data, null, 2)); 
	// 			const alergias_elemento = MA.d_data[$el_dom.id] || [];
	// 			const tiene_alergias = alergias_elemento.length > 0;
	// 			if(tiene_alergias){
	// 				$news.textContent = `${[...alergias_elemento].join(' ')}`;
	// 				$news.style.background = 'red';					
	// 			}else{
	// 				$news.textContent = 'CLIENTE ✔️ ';
	// 				$news.style.background = 'green';
	// 			}
	// 		}
	// 	}else if (rol_el === 'central'){
	// 		// Solo para reservadores(quiero saber si un central tiene algún cliente con alergia.)
	// 		if(MA && reservas){
	// 			const index_en_reserva = this.Salon._get_indice_en_reserva_s($el_dom.id);
	// 			const reserva = reservas[index_en_reserva];
	// 			const reserva_flat = Object.values(reserva).flat();			
	// 			const acumula_alergias_reserva = new Set();

	// 			reserva_flat.forEach(id =>{ 
	// 				if(id === $el_dom.id) return;					
	// 				const alergias_elemento_reserva = MA.d_data[id] || [];
					
	// 				// 2. Añadimos cada alergia encontrada al Set
	// 				alergias_elemento_reserva.forEach(alergia => {
	// 					acumula_alergias_reserva.add(alergia);
	// 				});
	// 			});
	// 			if(acumula_alergias_reserva.size > 0 ){
	// 				$news.textContent = `RESERVA: ${[...acumula_alergias_reserva].join(' ')}`;
	// 				$news.style.background = 'red';
	// 			}else{
	// 				$news.textContent = 'RESERVA ✔️ ';
	// 				$news.style.background = 'green';
	// 			}
	// 		}
	// 	}else{
	// 		console.warn(`❌ rol del elemento ${$el_dom.id}: ${rol_el} No registrado`);
	// 		return null
	// 	}
	// }

	/** ### Dibuja el codigo HTML de Mensajes según la Lógica. */
	render(data_logica = {}, elemento_dom=null){
		const $el_dom = e_Salon._to_element(elemento_dom);
		if(!$el_dom) return null;
		const id_key_el = $el_dom.dataset.id_key;
		const grupo_el = $el_dom.dataset.grupo;
		const rol_el = $el_dom.dataset.rol;
		
		if(grupo_el != 'player') return;

		const tipo_render = data_logica.content === 'sumatorio' ? 'sumatorio' : 'single';

		// Solo se asigna si se pasa explicitamente.
		const $contenedor = document.createElement('div');		
		$contenedor.className = ['contenedor_motor_mensajes', data_logica.css || ''].filter(Boolean).join(' ');

		const $textarea = document.createElement('textarea');
		$textarea.className = 'form-control mb-2 area-texto-mensaje';
		$textarea.rows = 2;
		$textarea.placeholder = 'Escribe aquí...';
		$textarea.value = this.get_mensaje($el_dom.id);
		// $textarea.dataset.motor = 'motor_mensajes';
		$textarea.dataset.idElemento = $el_dom.id;

		if (tipo_render === 'sumatorio') {
			const $sumatorio = this._crear_sumatorio($el_dom);
			if(!$sumatorio) 
				throw('Error al crear sumatorio de render');
			$contenedor.appendChild( $sumatorio );
		}

		const $contenedor_btns_accion = this._crear_botones_accion($el_dom.id, $textarea);

		$contenedor.appendChild($textarea);
		$contenedor.appendChild($contenedor_btns_accion);
		
		return $contenedor;
	}

	/** Formas de llamar a los datos */
    get datos() { return this.d_data; }	
    get d_mensajes() { return this.d_data; }
}



/** ■■■■■■■■■■■■■■■■■■■■
 *  Motor de alergias.
 *  ■■■■■■■■■■■■■■■■■■■■
 * Responsabilidad única:
 * - Mantener el diccionario de alergias seleccionadas por elemento.
 * - Usar Catalogo.get_alergenos() como fuente de verdad de alérgenos disponibles.
 *
 * Estructura de salida:
 * {
 * silla_0: ['soja', 'lacteos']
 * }
 */
class Motor_Alergias  extends Interfaz_Custom_Motores{
    constructor() {
		super();
        this.d_data = {};

        

    }

	/** Obtiene el diccionario de los alergenos de Catalogo.*/
    get_alergenos(key_alergeno = '') {
        const alergenos = Catalogo.get_alergenos();
        if (typeof key_alergeno === 'string' && key_alergeno.trim()) {
            return alergenos[key_alergeno] || null;
        }
        return alergenos;
    }

	/**
	 * ## De los alergenos que se envían se devuelven sólo los que están en el Catalogo.
	 * @param {Array} alergias array de alergias ► ['soja', 'lacteos',]
	 */
    _normalizar(alergias = []) {
        const alergenos_validos = this.get_alergenos();
        const seleccion = Array.isArray(alergias) ? alergias : [];
        return Array.from(new Set(
            seleccion.filter((alergia) => typeof alergia === 'string' && alergenos_validos[alergia])
        ));
    }

	/** ### Devuelve las alergias de un elemento.
	 * @returns {Array} Ej: ['soja', 'lacteos']
	*/
    get(id_elemento = '') {
		if (!id_elemento) return [];

		const $el_dom = e_Salon._to_element(id_elemento);
		if(!$el_dom) return [];

        // return this.d_data[$el_dom.id] || {};
		return Array.isArray(this.d_data[$el_dom.id]) ? this.d_data[$el_dom.id] : [];
    }
	
	/** d_data = [  silla_0:['soja', 'lacteos'] , silla_3:['cereal'], ...  ] */
    get_all() {
        return this.d_data;
    }

	// Compatibilidad temporal con llamadas antiguas.
    api_alergias() {
        return this.get_all();
    }

	/** */
    set(id_elemento = '', alergias = []) {
        if (!id_elemento) return false;

        const seleccion = this._normalizar(alergias);
        if (!seleccion.length) {
            this.delete(id_elemento);
            return true;
        }

        this.d_data[id_elemento] = seleccion;
		this._set_alerta_elemento(id_elemento);
		this._emitir_cambio(id_elemento);
        return true;
    }

	/** */
    set_many(diccionario = {}) {
        if (!diccionario || typeof diccionario !== 'object') return false;
        Object.entries(diccionario).forEach(([id, alergias]) => this.set(id, alergias));
        return true;
    }

	/** */
    toggle(id_elemento = '', alergeno = '') {
		if (!id_elemento || !this.get_alergenos(alergeno)) return false;
		
        const seleccion = new Set(this.get(id_elemento));
        if (seleccion.has(alergeno)) seleccion.delete(alergeno);
        else seleccion.add(alergeno);
		
        return this.set(id_elemento, Array.from(seleccion));
    }
	
	/** ⚠️⚠️ ⚠️⚠️  tiene que cambiar x id_elemento, alergia , y borrar la alergia 
	 * en concreto del elemetno si existe*/
    delete(id_elemento = '') {
        if (!id_elemento) return false;
        delete this.d_data[id_elemento];
		this._set_alerta_elemento(id_elemento);
		this._emitir_cambio(id_elemento);
        return true;
    }

    has(id_elemento = '') {
        return this.get(id_elemento).length > 0;
    }

    reset() {
		Object.keys(this.d_data).forEach((id) => this._set_alerta_elemento(id, false));
        this.d_data = {};
    }

    

    update(id_elemento = '', alergias = []) {
        return this.set(id_elemento, alergias);
    }

    _reset_alergias() {
        this.reset();
    }

	_get_alergenos_render(data_logica = {}) {
		const content = data_logica.content;
		if (content && typeof content === 'object' && !Array.isArray(content)) return content;
		return this.get_alergenos();
	}
	
	_set_alerta_elemento(id_elemento = '', forzar = null) {
		const elemento = document.getElementById(id_elemento);
		if (!elemento) return;
		if(forzar === null){

		}
		const tiene_alergias = forzar === null ? this.has(id_elemento) : Boolean(forzar);
		elemento.classList.toggle('elemento_con_alergia', tiene_alergias);
	}
	

	_emitir_cambio(id_elemento = '') {
		if (!id_elemento) return;
		document.dispatchEvent(new CustomEvent('motor_alergias:change', {
			detail: { id_elemento, alergias: this.get(id_elemento) }
		}));
	}
	/** ### Actualiza el contenedor que se pasa como argumento alergias_container.
	 * ### Cargando con lbs's pequeños con boton cerrar que tienen que llamar a delete cuando se pulsen.
	 * @param {Html} $alergias_container , es el contenedor donde meter los lbls
	 * @param {Array} alergias ['soja' , 'lacteos', 'cereal']
	 * @param {dictionary} opciones .editable = true Crea el boton cerrar en la lbl | 
	 * texto_vacio = 'Alerg free'.
	 */
	_actualizar_lbls_alergias($alergias_container, alergias = [], opciones = {}) {
		if (!$alergias_container) return;
		$alergias_container.innerHTML = '';
		$alergias_container.classList.toggle('is-empty', alergias.length === 0);

		if (!alergias.length) {
			// $alergias_container.textContent = 'Sin alergias seleccionadas.';
			$alergias_container.textContent = opciones.texto_vacio || '';
			return;
		}
		// Crea las lbl's según las alergias que le entran en alergias..
		alergias.forEach((alergia) => {
			const $tag = document.createElement('span');
			$tag.className = 'alergia-tag-pop';
			$tag.textContent = alergia;

			if (opciones.editable) {
				const cerrar = document.createElement('button');
				cerrar.type = 'button';
				cerrar.className = 'alergia-tag-close';
				cerrar.dataset.alergia = alergia;
				cerrar.setAttribute('aria-label', `Eliminar alergia ${alergia}`);
				cerrar.textContent = '×';
				// ⚠️⚠️ ⚠️⚠️ estos botones tienen que tener un listener.
				// cerrar.addEventListener(ev => this.delete());
				$tag.appendChild(cerrar);
			}
			
			$alergias_container.appendChild($tag);
		});
	}

	
	/**
	 * @param {string[]} array_alergias ► ['soja','lacteos']
	 * @returns {HTMLElement} - Div contenedor con todas las etiquetas generadas.
	 * ```javascript
	 *	const contenedor = crear_lbl_alergias(['gluten', 'soja']);
	 *	const etiquetasDOM = contenedor.querySelectorAll('.lbl_alergenos');
	 *	etiquetasDOM.forEach(etiqueta => {
	 *		// Aquí puedes modificar estilos, añadir clases, etc.
	 *		console.log(etiqueta); 
	 *	});
	 * ```
	 */
	_crear_lbls_alergias(array_alergias) {
		// 1. Crear el contenedor principal
		const contenedor = document.createElement('div');
		contenedor.className = 'contenedor-alergenos d-flex flex-wrap gap-1 mt-2';

		// Validación de seguridad
		if (!Array.isArray(array_alergias) || array_alergias.length === 0) {
			return contenedor;
		}

		// 2. Iterar sobre el array para construir cada etiqueta
		array_alergias.forEach(alergeno => {
			// Crear la base de la etiqueta
			const etiqueta = document.createElement('span');
			
			// Clases: 
			// - lbl_alergenos (tu clase obligatoria)
			// - badge bg-success (estilo verde pequeño de Bootstrap)
			// - d-inline-flex align-items-center (alineación vertical de texto y la X)
			etiqueta.className = 'lbl_alergenos badge bg-success d-inline-flex align-items-center p-2';
			etiqueta.setAttribute('data-alergeno', alergeno);

			// Añadir el texto del alérgeno (capitalizando la primera letra opcionalmente)
			const texto = document.createElement('span');
			texto.textContent = alergeno.charAt(0).toUpperCase() + alergeno.slice(1);
			etiqueta.appendChild(texto);

			// Crear el botón "X"
			const btnEliminar = document.createElement('button');
			btnEliminar.type = 'button';
			// 'btn-close-white' lo hace blanco para contrastar con el fondo verde
			btnEliminar.className = 'btn-close btn-close-white ms-2'; 
			btnEliminar.setAttribute('aria-label', 'Eliminar');
			btnEliminar.style.fontSize = '0.55rem'; // Lo hacemos un poco más pequeño para que encaje bien en el badge

			// Lógica para eliminar la etiqueta al hacer clic en la "X"
			btnEliminar.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation(); // Evita que el clic dispare otros eventos (como abrir el modal de nuevo)
				
				// Elimina la etiqueta del DOM
				etiqueta.remove();
				
				// 💡 TIP: Si necesitas sincronizar esto con la Base de Datos o un Set() global, 
				// deberías disparar un CustomEvent aquí o ejecutar un callback.
			});

			// Ensamblar y añadir al contenedor
			etiqueta.appendChild(btnEliminar);
			contenedor.appendChild(etiqueta);
		});

		return contenedor;
	}

	_refrescar_botones_alergenos($contenedor, id_elemento = '') {
		if (!$contenedor || !id_elemento) return;

		const alergias_actuales = new Set(this.get(id_elemento));
		$contenedor.querySelectorAll('[data-alergeno]').forEach(($btn) => {
			const activo = alergias_actuales.has($btn.dataset.alergeno);
			$btn.classList.toggle('is-active', activo);
			$btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
		});
	}

	_crear_boton_alergeno(key = '', data = {}) {
		const texto = data.slug || key;
		const $button = document.createElement('button');

		$button.type = 'button';
		$button.className = 'w-alergeno-btn';
		$button.dataset.alergeno = key;
		$button.title = texto;
		$button.setAttribute('aria-label', texto);
		$button.setAttribute('aria-pressed', 'false');
		$button.innerHTML = `<span class="w-alergeno-icon" aria-hidden="true">${data.svg || ''}</span>`;

		return $button;
	}

	// Dibuja el HTML de Alergias según la lógica. Devuelve un Node.
	render(data_logica = {}, elemento_dom=null){
		
		const $el_dom = e_Salon._to_element(elemento_dom);
		if(!$el_dom) return;
		
		const id_elemento = $el_dom.id || elemento_dom?.id;
		const alergenos = this._get_alergenos_render(data_logica);

		const $contenedor = document.createElement('div');
		// $contenedor.className = data_logica.css;
		$contenedor.className = `${data_logica.css || ''} w-alergias-inline`.trim();

		// const $alergias_container = document.createElement('div');
		// $alergias_container.className = 'labels-alergias-pop';
		const $grid = document.createElement('div');
		$grid.className = 'w-alergias-grid';

		// this._actualizar_lbls_alergias($alergias_container, this.get($el_dom.id), {texto_vacio: '', editable:true});
		Object.entries(alergenos).forEach(([key, data]) => {
			$grid.appendChild(this._crear_boton_alergeno(key, data));
		});

		$grid.addEventListener('click', (event) => {
			const $btn_alergeno = event.target.closest('[data-alergeno]');
			if (!$btn_alergeno) return;
			this.toggle(id_elemento, $btn_alergeno.dataset.alergeno);
			this._refrescar_botones_alergenos($contenedor, id_elemento);

		});
		document.addEventListener('motor_alergias:change', (event) => {
			if (event.detail?.id_elemento === id_elemento) {
				this._refrescar_botones_alergenos($contenedor, id_elemento);
			}
		});

		// $contenedor.appendChild($btn_select_alergias);
		$contenedor.appendChild($grid);
		this._refrescar_botones_alergenos($contenedor, id_elemento);

		
		return $contenedor;
	}

}

