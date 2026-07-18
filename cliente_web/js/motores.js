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
	_crear_botones_accion() {
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
		return $botonera;
	}

	/*### Sin Uso  */
	_es_rol(id_elemento = '' , rol_busca='reserver') {
		const elemento_dom = e_Salon._to_element(id_elemento);
		const id_catalogo = elemento_dom?.dataset?.id_key || id_elemento.split('_')[0];
		const match_rol = Catalogo.get(id_catalogo)?.rol === rol_busca;
		return match_rol
	}

	_get_ids_reservers_de_reserva(id_elemento) {
		const reservas = this.Salon.reservas ? this.Salon.reservas : []
		if (!reservas) return [];

		const index_en_reserva = this.Salon._get_indice_en_reserva_s(id_elemento);
		if(!index_en_reserva) return [];

		const reservers = reservas[index_en_reserva].reservers;
		if(!reservers) return [];

		return reservers;
	}
	_crear_sumatorio(elemento_dom) {
		const $sumatorio = document.createElement('div');
		$sumatorio.className = 'sumatorio';
		$sumatorio.setAttribute('role', 'note');
		$sumatorio.setAttribute('aria-live', 'polite');

		// sobre los rol=reserver del Catalogo.
		const reservers = this._get_ids_reservers_de_reserva(elemento_dom.id);
		reservers.forEach((id) => {
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
			// • Cacha el catalogo de cada reserver(mesa, mesa_redonda, ...)
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

	// Dibuja el codigo HTML de Mensajes según la Lógica.
	render(data_logica = {}, elemento_dom=null){
		const $el_dom = e_Salon._to_element(elemento_dom);
		if(!$el_dom) return null;

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// Logica de Alergias desde la Logica de Mensajes.
		// Necesito esto para la ZONA NEWS. en caso de que haya alergias en la reserva
		const MA = Catalogo.get_motor('motor_alergias');
		console.log('■ ■ ■ Motor Alergias.d_data desde Motor__Mensajes.!!')
		console.log(JSON.stringify(MA.d_data, null, 2)); 

		const reservas = this.Salon.reservas;
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

		const tipo_render = data_logica.content === 'sumatorio' ? 'sumatorio' : 'single';

		// Solo se asigna si se pasa explicitamente.
		const $contenedor = document.createElement('div');		
		$contenedor.className = ['contenedor_motor_mensajes', data_logica.css || ''].filter(Boolean).join(' ');

		const textarea = document.createElement('textarea');
		textarea.className = 'form-control mb-2';
		textarea.rows = 2;
		textarea.placeholder = 'Escribe aquí...';
		textarea.value = this.get_mensaje($el_dom.id);

		if (tipo_render === 'sumatorio') {
			const $sumatorio = this._crear_sumatorio($el_dom);
			if(!$sumatorio) 
				throw('Error al crear sumatorio de render');
			$contenedor.appendChild( $sumatorio );
		}

		const $contenedor_btns_accion = this._crear_botones_accion();

		$contenedor.appendChild(textarea);
		$contenedor.appendChild($contenedor_btns_accion);
		
		// Función asíncrona para permitir el uso de await ... necesareo para mostrar las alertas.
		$contenedor.addEventListener('click', async (ev) => {
			const button = ev.target.closest('[data-action]');
			if (!button) return;

			const action = button.dataset.action;
			if (action === 'guardar') {
				this.set($el_dom.id, textarea.value);
				Alertas_UI._NotA('Accion Guardar', 'Ejecutada con Exito');
			}
			if (action === 'eliminar') {
				try {
					const confirm = await Alertas_UI.ConfirM('Accion Eliminar', 'Estas Seguro?', 'warning');
					if (confirm === true) {
						this.delete($el_dom.id);
						textarea.value = '';
						Alertas_UI._NotA('Eliminar Mnesaje', `Mensaje de ${$el_dom.id} Eliminado con éxito`, 'danger');
					}
				} catch (error) {
					// Captura y gestiona cualquier fallo del sistema de alertas o del DOM
					console.error("Fallo crítico en el modal de confirmación:", error);
					Alertas_UI._NotA('Error de Sistema', 'No se pudo procesar la eliminación', 'danger');
				}
			}

			if (action === 'reset') {
				textarea.value = '';
				textarea.focus();
			}
			if (action === 'grabar'){
				this._accion_grabar(textarea, button);
				Alertas_UI._NotA('Accion Grabar Audio', 'Ejecutada con Exito');
			}
		});
		
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

        this.$modal = null;
        this.$labelSeleccion = null;
        this.$grid = null;
        this.modalInstancia = null;
        this.seleccion_actual = new Set();
        this._callbackActual = null;
        this._cancelado = false;

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

	/** ### Devuelve un diccionario de las alergias de un elemento.
	 * @returns {dictionary|{}} silla_0:['soja', 'lacteos']
	*/
    get(id_elemento = '') {
		if (!id_elemento) return [];

		const $el_dom = e_Salon._to_element(id_elemento);
		if(!$el_dom) return {};

        return this.d_data[$el_dom.id] || {};
        // return this.d_data[id_elemento] || {};
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
	
	/** */
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
		const tiene_alergias = forzar === null ? this.has(id_elemento) : Boolean(forzar);
		elemento.classList.toggle('elemento_con_alergia', tiene_alergias);
	}
	
	_emitir_cambio(id_elemento = '') {
		if (!id_elemento) return;
		document.dispatchEvent(new CustomEvent('motor_alergias:change', {
			detail: { id_elemento, alergias: this.get(id_elemento) }
		}));
	}

	_actualizar_resumen($resumen, alergias = [], opciones = {}) {
		if (!$resumen) return;
		$resumen.innerHTML = '';
		$resumen.classList.toggle('is-empty', alergias.length === 0);

		if (!alergias.length) {
			// $resumen.textContent = 'Sin alergias seleccionadas.';
			$resumen.textContent = opciones.texto_vacio || 'Sin alergias seleccionadas.';
			return;
		}

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
				$tag.appendChild(cerrar);
			}
			
			$resumen.appendChild($tag);
		});
	}

	_crear_modal_alergenos(alergenos = {}) {
		let $modal = document.getElementById('modal_motor_alergias');
		if (!$modal) {
			$modal = document.createElement('div');
			$modal.id = 'modal_motor_alergias';
			$modal.className = 'modal fade';
			$modal.tabIndex = -1;
			$modal.setAttribute('aria-hidden', 'true');
			$modal.innerHTML = `
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header"><h5 class="modal-title">Seleccionar alergias</h5></div>
						<div class="modal-body">
							<label class="w-alergias-label">Sin selección</label>
							<div class="w-alergias-grid mt-3"></div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-sm btn-success" data-action="guardar-alergias">Guardar</button>
							<button type="button" class="btn btn-sm btn-outline-secondary" data-action="salir-alergias">Salir</button>
						</div>
					</div>
				</div>`;
			document.body.appendChild($modal);
			$modal.addEventListener('click', (event) => this._on_modal_click(event));
		}

		this.$modal = $modal;
		this.$labelSeleccion = $modal.querySelector('.w-alergias-label');
		this.$grid = $modal.querySelector('.w-alergias-grid');
		this.modalInstancia = bootstrap.Modal.getOrCreateInstance($modal, { backdrop: true, keyboard: false });
		this._pintar_botones_modal(alergenos);
	}

	_pintar_botones_modal(alergenos = {}) {
		if (!this.$grid) return;
		this.$grid.innerHTML = '';
		Object.entries(alergenos).forEach(([key, data]) => {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'w-alergeno-btn';
			button.dataset.alergeno = key;
			button.setAttribute('aria-pressed', 'false');
			button.innerHTML = `<span class="w-alergeno-icon">${data.svg || ''}</span><span class="w-alergeno-text">${data.slug || key}</span>`;
			this.$grid.appendChild(button);
		});
	}

	_on_modal_click(event) {
		const btnAlergeno = event.target.closest('[data-alergeno]');
		if (btnAlergeno) {
			this._toggle_alergeno_modal(btnAlergeno.dataset.alergeno);
			return;
		}

		const action = event.target.closest('[data-action]')?.dataset.action;
		if (action === 'guardar-alergias') {
			this._callbackActual?.(Array.from(this.seleccion_actual));
			this.modalInstancia?.hide();
		}
		if (action === 'salir-alergias') this.modalInstancia?.hide();
	}

	_toggle_alergeno_modal(alergeno = '') {
		if (!alergeno || !this.get_alergenos(alergeno)) return;
		if (this.seleccion_actual.has(alergeno)) this.seleccion_actual.delete(alergeno);
		else this.seleccion_actual.add(alergeno);
		this._refrescar_modal();
	}

	_refrescar_modal() {
		const seleccion = Array.from(this.seleccion_actual);
		this.$grid?.querySelectorAll('[data-alergeno]').forEach((btn) => {
			const activo = this.seleccion_actual.has(btn.dataset.alergeno);
			btn.classList.toggle('is-active', activo);
			btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
		});
		if (!this.$labelSeleccion) return;
		this.$labelSeleccion.textContent = seleccion.length ? seleccion.join(', ') : 'Sin selección';
		this.$labelSeleccion.classList.toggle('is-valid', seleccion.length > 0);
	}

	abrir_modal_alergenos(alergias_previas = [], callback_guardar = null, alergenos = null) {
		this._crear_modal_alergenos(alergenos || this.get_alergenos());
		this._callbackActual = typeof callback_guardar === 'function' ? callback_guardar : null;
		this.seleccion_actual = new Set(this._normalizar(alergias_previas));
		this._refrescar_modal();
		this.modalInstancia?.show();
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

	// Dibuja el HTML de Alergias según la lógica. Devuelve un Node.
	render(data_logica = {}, elemento_dom=null){
		
		const $el_dom = e_Salon._to_element(elemento_dom);
		if(!$el_dom) return;
		
		const id_elemento = $el_dom.id || elemento_dom?.id;

		const es_news = data_logica.news === true;

		const $contenedor = document.createElement('div');
		$contenedor.className = data_logica.css;

		const $resumen = document.createElement('div');
		$resumen.className = 'labels-alergias-pop';

		this._actualizar_resumen($resumen, this.get($el_dom.id));

		$contenedor.appendChild($resumen);

		const $btn_select_alergias = document.createElement('button');
		$btn_select_alergias.type = 'button';
		$btn_select_alergias.className = 'btn btn-sm btn-alergias-pop';
		$btn_select_alergias.textContent = 'Seleccionar Alergias';

		$btn_select_alergias.addEventListener('click', () => {
			const alergias_previas = this.get($el_dom.id);
			const callback_after_save = (seleccion) => this.set($el_dom.id, seleccion);
			const alergenos = this._get_alergenos_render(data_logica);

			this.abrir_modal_alergenos(	alergias_previas, callback_after_save, alergenos);
		});

		$contenedor.appendChild($btn_select_alergias);

		
		return $contenedor;
	}

}

