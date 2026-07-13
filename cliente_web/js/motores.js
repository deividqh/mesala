/**
 * @file motores.js
 * @description Motores de datos para la lógica del salón.
 *
 * Los motores NO construyen interfaz. La UI pertenece a Logica_Catalogo.
 * Estas clases sólo guardan, leen, actualizan y eliminan datos.
 */

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
class Motor_M {
    static FICHA_VACIA = Object.freeze({ fecha: '', hora: '', usuario: '', mensaje: '' });

    constructor(opciones = {}) {
        this.usuario_default = opciones.usuario_default || 'usu';
        this.d_data = {};
        this.id_elemento = '';
        this.ids_reserva_actual = [];
    }

    _crear_ficha(mensaje = '', ficha_base = {}) {
        const now = new Date();
        return {
            ...Motor_M.FICHA_VACIA,
            ...ficha_base,
            usuario: ficha_base.usuario || this.usuario_default,
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

    set_contexto(id_elemento = '', ids_reserva = []) {
        this.id_elemento = id_elemento || '';
        const ids = Array.isArray(ids_reserva) ? ids_reserva.filter(Boolean) : [];
        if (this.id_elemento && !ids.includes(this.id_elemento)) ids.push(this.id_elemento);
        this.ids_reserva_actual = Array.from(new Set(ids));
        return this.ids_reserva_actual;
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
        return true;
    }

    set_ficha(id_elemento = '', ficha = {}) {
        if (!id_elemento) return false;
        this.d_data[id_elemento] = this._normalizar_ficha(ficha);
        if (!this.d_data[id_elemento].mensaje.trim()) this.delete(id_elemento);
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
        return true;
    }

    has(id_elemento = '') {
        return this.get_mensaje(id_elemento).trim() !== '';
    }

    reset() {
        this.d_data = {};
        this.id_elemento = '';
        this.ids_reserva_actual = [];
    }

    // Compatibilidad temporal con código antiguo mientras Logica_Catalogo absorbe la UI.
    api_mostrar(id_elemento = '', ids_reserva = []) {
        return this.set_contexto(id_elemento, ids_reserva);
    }

	api_mensajes(){
		return this.get_all();
	}

    accion_borrar(id_elemento = null) {
        return this.delete(id_elemento || this.id_elemento);
    }

    update(id_elemento = '', valor_mensaje = null) {
        if (!id_elemento) return false;
        if (valor_mensaje === null) {
            if (!this.d_data[id_elemento]) {
                this.d_data[id_elemento] = { ...Motor_M.FICHA_VACIA };
            }
            return true;
        }
        return this.set(id_elemento, valor_mensaje);
    }

    read_popover() {
        return Object.entries(this.d_data)
            .map(([key, value]) => `📍${key}: ${JSON.stringify(value)}`)
            .join('\n');
    }

    reset_all_data() {
        this.reset();
    }

	// render(data_logica){
	// 	// console.log('render motor: ', data_logica);
	// 	data_logica.nombre;			// Nombre pestaña
	// 	data_logica.content;		// en Mensajes es single o sumatorio. Logica del renderizado.
	// 	data_logica.css;			// clase css que se aplica. tiene que estar en .css

	// 	// Tengo que devolver un objeto Node
	// 	return JSON.stringify(data_logica, null, 2);
	// }

	_crear_botones_accion() {
		const toolbar = document.createElement('div');
		toolbar.className = 'd-flex gap-2 motor-mensajes-acciones';

		const botones = [
			{ action: 'grabar', texto: '🎤', title: 'Grabación de Voz', className: 'btn-grabar' },
			{ action: 'guardar', texto: '💾', title: 'Guardar mensaje', className: 'btn-guardar' },
			{ action: 'reset', texto: '🔁', title: 'Limpiar texto', className: 'btn-reset' },
			{ action: 'eliminar', texto: '🗑', title: 'Eliminar mensaje', className: 'btn-delete' }
		];

		botones.forEach((boton) => {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = `btn btn-sm ${boton.className}`;
			button.dataset.action = boton.action;
			button.title = boton.title;
			button.textContent = boton.texto;
			toolbar.appendChild(button);
		});
		return toolbar;
	}

	_crear_sumatorio(textarea) {
		const sumatorio = document.createElement('div');
		sumatorio.className = 'motor-mensajes-sumatorio';
		sumatorio.setAttribute('role', 'note');
		sumatorio.setAttribute('aria-live', 'polite');

		this.ids_reserva_actual.forEach((id) => {
			const row = document.createElement('div');
			const colId = document.createElement('span');
			const colMsg = document.createElement('span');

			const es_actual = id === this.id_elemento;
			row.className = es_actual ? 'sumatorio-row-ppal' : 'sumatorio-row';
			colId.className = es_actual ? 'sumatorio-id-ppal' : 'sumatorio-id';
			colMsg.className = es_actual ? 'sumatorio-msg-ppal' : 'sumatorio-msg';
			colId.textContent = `${id}: `;
			colMsg.textContent = this.get_mensaje(id);

			if (es_actual && textarea) {
				const sincronizar = () => { colMsg.textContent = textarea.value || ''; };
				textarea.addEventListener('input', sincronizar, { passive: true });
				sincronizar();
			}

			row.appendChild(colId);
			row.appendChild(colMsg);
			sumatorio.appendChild(row);
		});

		return sumatorio;
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
	render(data_logica = {}){
		const tipo_render = data_logica.content === 'sumatorio' ? 'sumatorio' : 'single';
		const contenedor = document.createElement('div');
		contenedor.className = ['contenedor_motor_mensajes', data_logica.css || ''].filter(Boolean).join(' ');

		const textarea = document.createElement('textarea');
		textarea.className = 'form-control mb-2';
		textarea.rows = 2;
		textarea.placeholder = 'Escribe aquí...';
		textarea.value = this.get_mensaje(this.id_elemento);

		if (tipo_render === 'sumatorio') {
			contenedor.appendChild(this._crear_sumatorio(textarea));
		}

		contenedor.appendChild(textarea);
		contenedor.appendChild(this._crear_botones_accion());

		contenedor.addEventListener('click', (ev) => {
			const button = ev.target.closest('[data-action]');
			if (!button) return;

			const action = button.dataset.action;
			if (action === 'guardar') 
				this.set(this.id_elemento, textarea.value);
			if (action === 'eliminar') {
				this.delete(this.id_elemento);
				textarea.value = '';
				textarea.dispatchEvent(new Event('input', { bubbles: true }));
			}
			if (action === 'reset') {
				textarea.value = '';
				textarea.dispatchEvent(new Event('input', { bubbles: true }));
				textarea.focus();
			}
			if (action === 'grabar') this._accion_grabar(textarea, button);
		});

		return contenedor;
	}

    get datos() {
        return this.d_data;
    }

    get d_mensajes() {
        return this.d_data;
    }
}

/**
 * Motor de alergias.
 *
 * Responsabilidad única:
 * - Mantener el diccionario de alergias seleccionadas por elemento.
 * - Usar Catalogo.get_alergenos() como fuente de verdad de alérgenos disponibles.
 *
 * Estructura de salida:
 * {
 * silla_0: ['soja', 'lacteos']
 * }
 */
class Motor_A {
    constructor() {
        this.d_data = {};

		this.id_elemento = '';
        this.$modal = null;
        this.$labelSeleccion = null;
        this.$grid = null;
        this.modalInstancia = null;
        this.seleccion_actual = new Set();
        this._callbackActual = null;
        this._cancelado = false;

    }

    get_alergenos(key_alergeno = '') {
        const alergenos = Catalogo.get_alergenos();
        if (typeof key_alergeno === 'string' && key_alergeno.trim()) {
            return alergenos[key_alergeno] || null;
        }
        return alergenos;
    }

    _normalizar(alergias = []) {
        const alergenos_validos = this.get_alergenos();
        const seleccion = Array.isArray(alergias) ? alergias : [];
        return Array.from(new Set(
            seleccion.filter((alergia) => typeof alergia === 'string' && alergenos_validos[alergia])
        ));
    }

    get(id_elemento = '') {
        if (!id_elemento) return [];
        return this.d_data[id_elemento] || [];
    }

    get_all() {
        return this.d_data;
    }

    set(id_elemento = '', alergias = []) {
        if (!id_elemento) return false;

        const seleccion = this._normalizar(alergias);
        if (!seleccion.length) {
            this.delete(id_elemento);
            return true;
        }

        this.d_data[id_elemento] = seleccion;
		this._set_alerta_elemento(id_elemento);
        return true;
    }

    set_many(diccionario = {}) {
        if (!diccionario || typeof diccionario !== 'object') return false;
        Object.entries(diccionario).forEach(([id, alergias]) => this.set(id, alergias));
        return true;
    }

	set_contexto(id_elemento = '') {
        this.id_elemento = id_elemento || '';
        return this.id_elemento;
    }

    toggle(id_elemento = '', alergeno = '') {
        if (!id_elemento || !this.get_alergenos(alergeno)) return false;

        const seleccion = new Set(this.get(id_elemento));
        if (seleccion.has(alergeno)) seleccion.delete(alergeno);
        else seleccion.add(alergeno);

        return this.set(id_elemento, Array.from(seleccion));
    }

    delete(id_elemento = '') {
        if (!id_elemento) return false;
        delete this.d_data[id_elemento];
		this._set_alerta_elemento(id_elemento);
        return true;
    }

    has(id_elemento = '') {
        return this.get(id_elemento).length > 0;
    }

    reset() {
		Object.keys(this.d_data).forEach((id) => this._set_alerta_elemento(id, false));
        this.d_data = {};
    }

    // Compatibilidad temporal con llamadas antiguas.
    api_alergias() {
        return this.get_all();
    }

    update(id_elemento = '', alergias = []) {
        return this.set(id_elemento, alergias);
    }

    _reset_alergias() {
        this.reset();
    }

	// render(data_logica){
	// 	// console.log('render alergia:', data_logica);
		
	// 	data_logica.nombre;			// Nombre pestaña(No en render)
	// 	data_logica.content;		// Es el diccionario de alergias para el rol.
	// 	data_logica.css;			// clase css que se aplica. 

	// 	// Tengo que devolver un objeto Node
	// 	return JSON.stringify(data_logica, null, 2);

	// }
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
	_actualizar_resumen($resumen, alergias = []) {
		if (!$resumen) return;
		$resumen.innerHTML = '';
		$resumen.classList.toggle('is-empty', alergias.length === 0);

		if (!alergias.length) {
			$resumen.textContent = 'Sin alergias seleccionadas.';
			return;
		}

		alergias.forEach((alergia) => {
			const tag = document.createElement('span');
			tag.className = 'alergia-tag-pop';
			tag.textContent = alergia;
			$resumen.appendChild(tag);
		});
	}

	_crear_modal_alergias(alergenos = {}) {
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

	abrir(alergias_previas = [], callback_guardar = null, alergenos = null) {
		this._crear_modal_alergias(alergenos || this.get_alergenos());
		this._callbackActual = typeof callback_guardar === 'function' ? callback_guardar : null;
		this.seleccion_actual = new Set(this._normalizar(alergias_previas));
		this._refrescar_modal();
		this.modalInstancia?.show();
	}
	// Dibuja el HTML de Alergias según la lógica. Devuelve un Node.
	render(data_logica = {}){
		const contenedor = document.createElement('div');
		contenedor.className = ['contenedor_motor_alergias', data_logica.css || ''].filter(Boolean).join(' ');

		const resumen = document.createElement('div');
		resumen.className = 'labels-alergias-pop';
		this._actualizar_resumen(resumen, this.get(this.id_elemento));

		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'btn btn-sm btn-alergias-pop';
		button.textContent = 'Alergias';

		button.addEventListener('click', () => {
			const alergenos = this._get_alergenos_render(data_logica);
			this.abrir(this.get(this.id_elemento), (seleccion) => {
				this.set(this.id_elemento, seleccion);
				this._actualizar_resumen(resumen, this.get(this.id_elemento));
			}, alergenos);
		});

		contenedor.appendChild(resumen);
		contenedor.appendChild(button);
		return contenedor;
	}

}

// Métodos importantes:
// 		show(), hide(), toggle() , update(), dispose()
class Motor_Mensajes {
	/** ## id del Elemento sobre el que se muestra el popOver 'silla_1' , 'mesa_0'  */
	id_elemento = ''; 	
	
	grabando = false;
	bs_popover = null;	// Objeto Bootstrap PopOver
	el = null;		// elemento.
	
	btnVoiceControl = null;	// Botón que inicia/detiene la grabación de voz
	speechRecognition = null;
	speechUnsupportedWarned = false;

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ## Es el objeto que tiene que ser devuelto a la app que gestiona esta clase.
	 *  ```javascript
	 * {'silla_3': {usuario: 'usu', fecha: '25/8/2025', hora: '21:27:41', mensaje: 'una de gambas'},
	 * 'silla_4': {usuario: 'usu', fecha: '25/8/2025', hora: '21:43:02', mensaje: 'gluten'},
	 * 'silla_7': {usuario: 'usu', fecha: '25/8/2025', hora: '21:47:22', mensaje: 'marisco'}, }
	 *  ```	 */
	d_data = {};		

	/** ## control del popOver. Se usa para saber si es el primer click sobre una MESA. */
	b_primera_vez = false; 		

	/** ## Tipo de popover. Determinado en la construccion de la clase.
	 * ### is_single = true  , tipo de popover con header y caja_texto de mensaje.
	 * ### is_single = false , tipo de popover compuesto, con header, sumatorio_de_mensajes x reserva  y caja_texto de mensaje.	 */
	is_single = true;			
	
	/** ## Ids de la reserva actualmente abierta (solo aplica a mesas/is_single=false). */
	ids_reserva_actual = [];
		
	/** ### Temas permitidos css */
	// theme = '';
	THEMAS_PERMITIDOS = ['dark', 'pastel', 'corporate', 'elegant', 'alternant', 'moderno'];
	
	/** ### datos vacíos para crear nuevas fichas. STATIC PARAM  */
	static _FICHA_VACIA = { fecha:'', hora:'', usuario:'', mensaje:'' };

	motor_alergias = null; // Instancia de Motor_Alergias, si with_alergenos es true
	d_alergias = {}			// fuente de la verdad de alergias por elemento.

	
	/**
	 * ##	Crea el objeto POPOVER y le asigna un escuchador de click. 
	 * ### • theme = ['dark', 'pastel', 'corporate', 'elegant', 'alternant', 'moderno']
	 * ### • is_single(boolean) = true ► single. puede llevar alergenos.
	 * ### • with_alergenos(boolean)
	 * ```javascript
	 * _Motor_Mensajes = new _Motor_Mensajes('pastel', true, true); // Popover tipo "single" con tema pastel y sección de alérgenos.	
	 * _Motor_Mensajes = new _Motor_Mensajes('dark', false, false); // Popover tipo "multiple" con tema dark y sin sección de alérgenos.
	 * _Motor_Mensajes = new _Motor_Mensajes(); // Popover tipo "single" con tema 'pastel' y CON sección de alérgenos.
	 * ```	 */
	constructor(theme = 'pastel' , is_single = true, with_alergenos = true) {
		
		// ■■ TEMA ■■ 		
		this.theme = (this.THEMAS_PERMITIDOS.includes(theme)) ? theme : 'pastel';

		// ■■ TIPO ■■ Simple o Compuesto. . . single tiene alergias. Multiple acumula mensajes.
		this.is_single = (typeof is_single == 'boolean') ? is_single	: true;		

		// ■■ ALERGIAS ■■ 💊
		this.with_alergenos = (typeof with_alergenos == 'boolean') ? with_alergenos	: true;
		
		// ┌■ LOGICA DE ALERGIAS: Solo se crea el Motor_Alergias si el popover es de tipo "single" y se ha indicado que debe incluir alérgenos. Esto se debe a que la gestión de alérgenos está diseñada para ser específica de cada elemento individual (silla o mesa), y no tiene sentido acumular alérgenos en un popover múltiple que abarca varias reservas.
		if(this.is_single === true && with_alergenos === true){
			this.motor_alergias = new Motor_Alergias();
		}		

		// ■■ UI : Elementos del popover ■■
		const $sumatorio = '<div id="sumatorio_mensajes_pop" role="note" aria-live="polite"></div>';
		const $alergias  = '<div id="labels_alergias_pop" class="labels-alergias-pop" aria-live="polite"></div>';
		const $mensaje 	 = '<textarea id="textarea_popov" class="form-control mb-2" rows="2" placeholder="Escribe aquí..."></textarea>';
		const $botones 	 = `
				<div class="d-flex gap-2">
					<button type="button" class="btn btn-sm btn-grabar"  data-action="grabar"   title="Grabación de Voz">🎤</button>
					<button type="button" class="btn btn-sm btn-guardar" data-action="guardar"  title="Guardar y Salir">💾</button>
					<button type="button" class="btn btn-sm btn-guardar" data-action="reset"    title="Limpiar Texto">🔁</button>
					<button type="button" class="btn btn-sm btn-delete"  data-action="eliminar" title="Eliminar Mensaje y Salir">🗑</button>
				</div>`;

		// ┌■ Contenido del popover, según el tipo (single o multiple)
		let content_popover = '';
		if(this.is_single === true){
			content_popover = `
				<div class="contenedor_popover">
					${ $alergias }
					<!-- ▲ MENSAJE de la MESA ACTUAL (editor). Mantenemos el id para no romper tus handlers -->				
					${ $mensaje }
					<!-- ▲ Toolbar de botones:  -->
					${ $botones }
				</div>
				`;
		}else{
			content_popover = `
				<div class="contenedor_popover">				
					<!-- ▲ Sumatorio de MENSAJES de MESAS IMPLICADAS (solo lectura) -->
					${ $sumatorio }
					${ $alergias }
					<!-- ▲ MENSAJE de la MESA ACTUAL (editor). Mantenemos el id para no romper tus handlers -->				
					${ $mensaje }					
					<!-- ▲ Toolbar de botones:  -->
					${ $botones }
				</div>
			`;
		}

		// ┌■ Crear popover "vacío", enganchado a un div oculto
		const dummy = document.createElement("div");
		document.body.appendChild(dummy);

		this.bs_popover = new bootstrap.Popover(dummy, {
			container: 'body',
			trigger: 'manual',
			sanitize: false,
			html: true,
			placement: 'right',
			// ⬇️ 1) Fuerza estructura con header y body
			template: `
				<div class="popover" role="tooltip"  data-theme="${this.theme}">
					<div class="popover-arrow"></div>
					<h3  class="popover-header"></h3>
					<div class="popover-body"></div>
				</div>`,
			title: " ",						// ⬇️ 2) Título vacío ' ' (se pondrá dinámicamente). Si '' no aparece header.
			content: content_popover
		});		

		// ◘I.A. Blindaje por si Bootstrap reinyecta 🧠 I.A.:
  		// queueMicrotask(() => this.bs_popover?.tip?.setAttribute('data-theme', this.theme));

		// ┌■ 🧠 Inicializamos el resto de las variables de la aplicación.
		this.id_elemento = null;
		this.el = null;
		this.d_data = {};

		// ┌■ Inicializar reconocimiento de voz
		this._initSpeechRecognition();

		// ┌■ Escuchar eventos en el popover
		this._set_event_listener();
	}	

	/**
	 * ### ​👂​👂 Establece el Listener cuando el PopOver está abierto.	 */
	_set_event_listener() {
		// document.addEventListener('click', (e) => {
		document.addEventListener('click', async (e) => {
			// Si no está el PopOverElemen_t retornamos.
			if ( !this.bs_popover || !this.bs_popover.tip ) 
				return;			
			
			// Para que cuando haga CLICK OUT se cierre e PopOver. 
			// Tengo que comparar estas dos variables pq cuando se hace el primer click lo cierra.
        	if ( this._is_click_outside(e) && !this.b_primera_vez ){
				this.accion_save();				// Guardo por defecto.
				this.bs_popover.hide();			// Oculta el PopOver.
			}
			
			// LA PRIMERA VEZ que se hace click sobre una silla o mesa, entra !button. Esto es importante para poder 
			// asignar que es la primera vez que entra y poner a false this.b_primera_vez
			// SE HACE ASÍ PQ LA PRIMERA VEZ SOLO CAMBIA EL COLOR DE LA RESERVA. 
			const button = e.target.closest('[data-action]');
			if (!button ) { 
				this.b_primera_vez = false; 	// Reset one-time flag
				return;
			}
			
			// ┌•••••••••••••••••••••••••••••••••••••••
			// ┌•• Ejecuta una ACCION sobre un boton.
			// ┌•••••••••••••••••••••••••••••••••••••••
			const action = button.getAttribute('data-action');			
			switch(action) {
				case 'alergias': this._abrir_alergias_desde_popover();
								 break;
				case 'guardar':  this.accion_save(); 	
								 this.bs_popover.hide();	
								 break;
				case 'eliminar': this.accion_borrar(); 	
								 this.bs_popover.hide();	
								 break;
				case 'grabar': 	 this.accion_toggle(button); 
								 break;
				case 'reset':    this.accion_reset_cajatexto(); 		
								 break;
				default: 
					// alert("Acción no reconocida:", action);
					// this.Salon.CFG.UI._NotA("Error Lógico", "Accion no Reconocida", "danger");
					break;
			}
		});
	}

	/**
	 * ###	Inicializa el motor de reconocimiento de voz del navegador, si está disponible.
	 */
	_initSpeechRecognition() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			console.warn('🎙️ Reconocimiento de voz no disponible en este navegador.');
			this.speechRecognition = null;
			return;
		}

		try {
			const recognition = new SpeechRecognition();
			recognition.lang = 'es-ES';
			recognition.continuous = false;
			recognition.interimResults = false;
			recognition.maxAlternatives = 1;

			recognition.onresult = (event) => this._handleSpeechResult(event);
			recognition.onstart = () => this._setRecordingState(true);
			recognition.onend = () => this._handleRecognitionEnd();
			recognition.onerror = (event) => this._handleRecognitionError(event);

			this.speechRecognition = recognition;
		} catch (error) {
			console.error('No se pudo inicializar SpeechRecognition:', error);
			this.speechRecognition = null;
		}
	}

	/**
	 * ###	Gestiona los resultados devueltos por la API de voz.
	 * @param {SpeechRecognitionEvent} event
	 */
	_handleSpeechResult(event) {
		if (!event?.results?.length) return;
		const partes = []
		for (let i = event.resultIndex; i < event.results.length; i++) {
			const result = event.results[i];
			if (result.isFinal && result[0].transcript) {
				partes.push (result[0]?.transcript);
			}
		}
		if (!partes.length) return;
		this._appendTranscript(partes.join(' '));
	}

	/**
	 * ###	Muestra mensajes de error de la API de voz y restablece el estado visual.
	 * @param {SpeechRecognitionErrorEvent} event
	 */
	_handleRecognitionError(event) {
		console.error('Error en reconocimiento de voz:', event?.error ?? event);
		this._handleRecognitionEnd(true);
	}

	/**
	 * ###	Añade el texto reconocido al textarea del popover.
	 * @param {String} fragment
	 */
	_appendTranscript(fragment) {
		const texto = fragment?.trim();
		if (!texto) return;

		const textarea = this.get_mensaje_dom();
		if (!textarea) return;

		const necesitaEspacio = textarea.value && !/\s$/.test(textarea.value);
		textarea.value = `${textarea.value}${necesitaEspacio ? ' ' : ''}${texto}`.trimStart();
		textarea.dispatchEvent(new Event('input', { bubbles: true }));
		textarea.focus();
		const len = textarea.value.length;
		textarea.setSelectionRange(len, len);
	}

	/**
	 * ###	Cambia el estado visual del botón de grabación y la bandera de grabación.
	 * @param {Boolean} isRecording
	 */
	_setRecordingState(isRecording) {
		this.grabando = !!isRecording;
		if (!this.btnVoiceControl) return;

		const button = this.btnVoiceControl;
		button.textContent = isRecording ? '■' : '🎤';
		button.classList.toggle('is-recording', !!isRecording);
		button.classList.remove('has-recognition-error');
		button.setAttribute('aria-pressed', isRecording ? 'true' : 'false');
	}

	/**
	 * ###	Finaliza la sesión de reconocimiento de voz y actualiza el estado del botón.
	 * @param {Boolean} hadError
	 */
	_handleRecognitionEnd(hadError = false) {
		this._setRecordingState(false);
		if (hadError && this.btnVoiceControl) {
			this.btnVoiceControl.classList.add('has-recognition-error');
			if (!this.speechUnsupportedWarned) {
				console.warn('🎙️ El reconocimiento de voz se detuvo por un error.');
			}
		}
	}

	/**
	 * ###	Comprueba si el navegador soporta reconocimiento de voz. */
	_canUseSpeechRecognition() {
		return !!this.speechRecognition;
	}

	/**
	 * ###	Informa al usuario de que el reconocimiento de voz no está disponible.	 */
	_notifySpeechUnsupported() {
		if (this.speechUnsupportedWarned) return;
		this.speechUnsupportedWarned = true;
		console.warn('🎙️ El navegador no soporta reconocimiento de voz. Usa el teclado para escribir el mensaje.');
		if (this.btnVoiceControl) {
			this.btnVoiceControl.textContent = '🎤';
			this.btnVoiceControl.setAttribute('aria-disabled', 'true');
		}
	}

	/**
	 * ###	Devuelve true si el click fue fuera del popover.
	 * 				Devuelve false si el click fue dentro del popover.
	 * Es util para saber si se hizo click fuera o dentro del popOver.
	 * @param {event} el evento click que dispara la comprobación, pero esta funcion no es llamada desde un listener.
	 */
	_is_click_outside(e) {		
		if (!this.bs_popover || !this.bs_popover.tip) return;
		// Usar propiedad interna _isShown (más directo)
		if (this.bs_popover._isShown) {
			if (this.bs_popover.tip) {
				const clicked_inside_pop = this.bs_popover.tip.contains(e.target);
				const clicked_on_opener = e.target === this.el;
				// Si el click fue fuera del popover y no en el elemento que lo abrió
				if (!clicked_inside_pop && !clicked_on_opener) return true;				
        	}
		}
		return false;
	}

	/**
	 * ## Muestra el popover y cacha variables de clase (this.id_elemento, this.el).
	 * @param {*} id_elemento_dom 
	 * @param {*} arr_mesas_reserva 	 */
	api_mostrar(id_elemento_dom, arr_mesas_reserva = []){
		
		this._registrar_y_mostrar(id_elemento_dom);
		const ids_reserva =this._set_contexto_reserva_actual(id_elemento_dom, arr_mesas_reserva);

		// ■ Cacha Los elementos Dom del PopOver
		const tip     		= this.bs_popover.tip;							// se crea cuando se hace this.bs_popover.show()
		const $header 		= tip?.querySelector('.popover-header');	// header(titulo de la ventana) del PopOver	
		const $sumatorio    = tip?.querySelector('#sumatorio_mensajes_pop');	// contenedor Label del sumatorio de mensajes
		const $alergias		= tip?.querySelector('#labels_alergias_pop');
		const $caja_texto	= tip?.querySelector('#textarea_popov');	// caja de texto del mensaje en el PopOver
		
		// ■ Header (siempre hay)
		if ($header) this._set_header($header); 
		
		// ■ Sumatorio de mensajes en un label. Solo habrá sumatorio si is_single = false.
		if ($sumatorio)  this._set_sumatorio($sumatorio, $caja_texto, id_elemento_dom, arr_mesas_reserva); 
		
		// ■ Vista de alergias seleccionadas del elemento
		if ($alergias) this._set_alergias_popover($alergias, id_elemento_dom);
		
		// ■ Caja de texto del mensaje (siempre hay)
		if ($caja_texto) this._set_caja_texto($caja_texto, id_elemento_dom); 		
	}

	/** ## Registra el elemento y muestra el PopOver sobre el elemento {@link api_mostrar} */	
	_registrar_y_mostrar(id_elemento_dom){
		this.id_elemento = id_elemento_dom;
		this.el = document.getElementById(id_elemento_dom);
		if (!this.el) { console.error("Elemento no encontrado:", id_elemento_dom); return; }
	
		// ■ Reenganchar popover al nuevo elemento. 
		this.bs_popover._element = this.el;  // Cambiar referencia. [ Fundamental pq trabajo con un sólo PopOver ]
		this.bs_popover.update();            // Actualiza  PopOver
		this.bs_popover.show();			  // Muestra el PopOver y activa this.bs_popover.tip
		
		// Le decimos que es la primera vez para que no se cierre nada mas empezar por el evento click...con esto lo controlamos.
		this.b_primera_vez = true;
	}

	/**
	 * ## Establece el contexto de los elementos (IDs) que forman parte de la reserva activa.
	 * ## Gestiona tanto el modo individual (sillas/mesas sueltas) como el modo múltiple (grupos de mesas). gracias al parametro arr_mesas_reserva que se le pasa desde fuera.
	 * ### En modo Single, simplemente asigna el ID del elemento actual al contexto de reserva.
	 * ### En modo Multiple, procesa el array de mesas proporcionado para establecer el contexto completo de la reserva, asegurando que el ID del elemento disparador esté incluido si no está ya presente.
	 * ### Esto permite que el popover múltiple muestre y edite mensajes para todas las mesas relacionadas con la misma reserva, manteniendo la coherencia en la gestión de mensajes.
	 * ### Evitando duplicados en el contexto de reserva mediante el uso de Set, lo que garantiza que cada ID de mesa aparezca solo una vez en la lista de mesas afectadas por el popover.
	 * ### Este método es fundamental para que el popover pueda mostrar la información correcta y permitir la edición de mensajes en función de la reserva a la que pertenecen las mesas seleccionadas.
	 * ### Llamado desde {@link api_mostrar}
	 * @private
	 * @param {string} id_elemento_dom - ID del elemento que dispara la acción (ej: 'mesa_1').
	 * @param {Array<string>} arr_mesas_reserva - Lista de IDs de mesas que pertenecen a la misma reserva.
	 * @returns {void}
	 */
	_set_contexto_reserva_actual(id_elemento_dom = '', arr_mesas_reserva = []) {
		// 1 •••••••••••• 
		// Modo Single: Solo nos interesa el elemento actual. 
		// Limpiamos con filter(Boolean) para evitar IDs vacíos.
		if (this.is_single) {
			this.ids_reserva_actual = [id_elemento_dom].filter(Boolean);
			return;
		}
		// 2 •••••••••••• 
		// Modo Múltiple: Procesamos el array de mesas proporcionado.
		const ids = Array.isArray(arr_mesas_reserva) ? arr_mesas_reserva.filter(Boolean) : [];
		
		// Si el array viene vacío pero tenemos un ID disparador, lo usamos como contexto único.
		if (!ids.length && id_elemento_dom) {
			this.ids_reserva_actual = [id_elemento_dom];
			return;
		}

		// Si el ID disparador no está en el grupo (ej: una mesa recién añadida), lo incluimos.
		if (id_elemento_dom && !ids.includes(id_elemento_dom)) {
			ids.push(id_elemento_dom);
		}

		// Garantizamos la unicidad de los IDs usando Set para evitar duplicados en la UI.
		this.ids_reserva_actual = Array.from(new Set(ids));

		return this.ids_reserva_actual;
	}
	
	/** ### • Devuelve los ids afectados por el cambio de alergias, 
	 * ### dependiendo del tipo de popover (single o multiple) y la reserva actual.
	 * */
	_get_ids_afectados_alergias(id_elemento = '') {
		if (!id_elemento) return [];
		if (this.is_single) return [id_elemento];

		const ids = Array.isArray(this.ids_reserva_actual) ? this.ids_reserva_actual : [];
		if (ids.includes(id_elemento) && ids.length) return ids;
		return [id_elemento];
	}
	
	// ◘◘◘◘◘◘ api_mostrar ◘◘◘◘◘◘
	_set_header($header){
		if (!$header) return false;
		const titulo = `• ${this.id_elemento}`;
		if (!this.with_alergenos) {
			$header.textContent = titulo;
			return;
		}
		$header.innerHTML = `
			<div class="popover-header-row">
				<span class="popover-header-title">${titulo}</span>
				<button type="button" class="btn btn-sm btn-alergias-pop" data-action="alergias" title="Seleccionar alergias">
					Alergias
				</button>
			</div>
		`;

		const $btnAlergias = $header.querySelector('[data-action="alergias"]');
		if (!$btnAlergias) return;
		const alergias = this.d_alergias[this.id_elemento] || [];
		if (Array.isArray(alergias) && alergias.length) {
			$btnAlergias.classList.add('has-selection');
		}
	}

	/**	### Abre el Menu Selector de Alergias */
	_abrir_alergias_desde_popover() {
		if (!this.motor_alergias) return;
		const id_elemento = this.id_elemento;
		if (!id_elemento) return;
		
		const alergias_actuales = this.d_alergias[id_elemento] || [];
		this.motor_alergias.abrir(alergias_actuales, (seleccion) => {
			const alergias_limpias = Array.isArray(seleccion) ? seleccion : [];
			const ids_afectados = this._get_ids_afectados_alergias(id_elemento);

			for (const id_afectado of ids_afectados) {
				if (!id_afectado) continue;
				this.d_alergias[id_afectado] = [...alergias_limpias];
				this._actualizar_markador_elemento(id_afectado);
			}

			const tip = this.bs_popover?.tip;
			const $alergias = tip?.querySelector('#labels_alergias_pop');
			if ($alergias && id_elemento === this.id_elemento) {
				this._set_alergias_popover($alergias, id_elemento, alergias_limpias);
			}

			const $btnAlergias = tip?.querySelector('[data-action="alergias"]');
			if ($btnAlergias && id_elemento === this.id_elemento) {
				$btnAlergias.classList.toggle('has-selection', alergias_limpias.length > 0);
			}
		});
	}

	/** */
	_set_alergias_popover($contenedor, id_elemento, alergias = null) {
		if (!$contenedor) return;

		const seleccion = Array.isArray(alergias) ? alergias : (this.d_alergias?.[id_elemento] || []);

		$contenedor.innerHTML = '';

		if (!Array.isArray(seleccion) || !seleccion.length) {
			$contenedor.classList.add('is-empty');
			return;
		}

		$contenedor.classList.remove('is-empty');
		for (const alergia of seleccion) {
			const $tag = document.createElement('span');
			$tag.className = 'alergia-tag-pop';
			$tag.textContent = alergia;
			$contenedor.appendChild($tag);
		}
	}

	_reset_alergias(){
		this.d_alergias={};

		// this._actualizar_markador_elemento(this.id_elemento);
	}
	
	// ◘◘◘◘◘◘ api_mostrar ◘◘◘◘◘◘
	_set_sumatorio($sumatorio, $caja_texto, id_elelmento_dom, arr_mesas_reserva = []){
		if (!$sumatorio) return false;
		if (!Array.isArray(arr_mesas_reserva)) return false;

		$sumatorio.textContent = '';	// RESET contenedor

		for (const id_mesa of arr_mesas_reserva) {
			const fila = this.d_data[id_mesa] || { mensaje: '' };
			const msg  = fila.mensaje || '';

			// ■■■ Cada-Fila ► id_mesa | mensaje ■ un div contenedor(row) y columnna izquierda y columna derecha.
			const $row  = document.createElement('div');
			const $colL = document.createElement('span');
			const $colR = document.createElement('span');

			// ► ES EL ELEMENTO CLICKADO...Selected
			if (id_mesa === id_elelmento_dom){				
				// Le asigno una clase 
				$row.className  = 'sumatorio-row-ppal';     
				$colL.className = 'sumatorio-id-ppal';
				$colR.className = 'sumatorio-msg-ppal';
				// ■■■
				// (Opcional) Syncro entre CajaTexto y Div(sumatorio) en vivo
				if ($caja_texto) {
					const sync_mensaje = () => { 							
						$colR.textContent = $caja_texto.value || ''; 		// textContent = seguro (W3C): evita inyección HTML.
					};						
					sync_mensaje();
					//  ​👂​👂 En vivo: mientras escribe el usuario
					$caja_texto.addEventListener('input', sync_mensaje, { passive: true });
				}
			}else{
				$row.className  = 'sumatorio-row';     
				$colL.className = 'sumatorio-id';
				$colR.className = 'sumatorio-msg';
			}
			$colL.textContent = id_mesa +': ';          // p.ej. 'mesa_3: '
			$colR.textContent = msg;              		// mensaje o vacío

			$row.appendChild($colL);
			$row.appendChild($colR);
			$sumatorio.appendChild($row);
		}
		
	}
	
	// ◘◘◘◘◘◘ api_mostrar ◘◘◘◘◘◘
	_set_caja_texto( $caja_texto, id_elemento_dom){		
		// ■■ TEXTAREA - MENSAJE
		if ($caja_texto) {
			$caja_texto.value = this.d_data[id_elemento_dom]?.mensaje || "";
		}
	}	
	

	// ■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■ CRUD ■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ###	Muestra por consola el d_data.
	 */
	read_popover() {
		let retorno = '';			
		// Validacion
		if(Object.keys(this.d_data).length <=0) return;
		// Cabecera
		console.log('📋 CONTENIDO DEL DICCIONARIO POPOVER:');
		console.log('═'.repeat(50));		
		// Contenido
		const key_value = Object.entries(this.d_data);
		key_value.forEach(([key, value]) => {
			console.log(`📍${key}]:`, value);
			retorno += `📍${key}]: ${JSON.stringify(value)}\n`;
		});		
		console.log(`Total mensajes: ${Object.keys(this.d_data).length}`);
		return retorno; 
	}

	/**
	 * ###	 Guardar MENSAJE en d_data 
	 * @param {}
	 */
	accion_save() {
		const $msg   = document.getElementById("textarea_popov");				//Cacho el textarea de mensajes del Dom
		const mensaje_to_save = $msg ? $msg.value : '';									// Cacho el valor del textarea de mensajes

		// ┌•• Si no hay mensaje cerrar sin guardar 
		if (!mensaje_to_save) {
			this._actualizar_markador_elemento(this.id_elemento);
			this.bs_popover.hide();
			return;
		}
		// ■■■■■■■■■■■■■■■■■■■■■■■■ diccionario que se asigna a a d_data
		const now   = new Date();
		const new_ficha = { ...Motor_Mensajes._FICHA_VACIA };

		new_ficha.usuario = "usu";
		new_ficha.fecha   = now.toLocaleDateString();
		new_ficha.hora    = now.toLocaleTimeString();
		new_ficha.mensaje = mensaje_to_save;		
		// ████████████████████████
		// ► Estructura
		this.d_data[this.id_elemento] = new_ficha;

		// ✅ Indicador visual por mensaje/alergias
		this._actualizar_markador_elemento(this.id_elemento);

		console.log(`💾 Guardado en ${this.index_reserva != null ? `reserva[${this.index_reserva}]` :  ''} ${this.id_elemento}:`, 
						this.index_reserva != null 
						? this.d_data[this.index_reserva][this.id_elemento] 
						: this.d_data[this.id_elemento]);
	}

	/**
	 * ## Borra la clave con 'Silla_X' en el d_data
	 * @param {String|null} key_dicc_msgs 
	 * 	### ► null: Si es null, borra this.id_elemento  
	 * 	### ► SI es string ('Silla_X'), borra la clave con 'Silla_X' en el dicc
	 */
	accion_borrar(key_dicc_msgs=null) {
		if (!key_dicc_msgs) 
			key_dicc_msgs = this.id_elemento;
		try {
			if (this.d_data[key_dicc_msgs]) {
				delete this.d_data[key_dicc_msgs];
				console.log(`🗑 Mensaje eliminado para ${key_dicc_msgs}`);

				// ✅ Recalcula indicador visual por mensaje/alergias
				this._actualizar_markador_elemento(key_dicc_msgs);
			}
		} catch (error) {
			return false;
		}
	}
	
	/**
	 * ###	  
	 * @param {}
	 */
	accion_reset_cajatexto(){
		document.getElementById("textarea_popov").value = "";
		document.getElementById("textarea_popov").focus();
	}

	/**
	 * ###	  Cambio de iconos entre grabar y parar.
	 * @param {element} botón que hace click.
	*/
	accion_toggle(btn) {
		this.btnVoiceControl = btn || null;
		if (this.btnVoiceControl) {
			this.btnVoiceControl.removeAttribute('aria-disabled');
		}

		if (!this._canUseSpeechRecognition()) {
			this._notifySpeechUnsupported();
			return;
		}

		if (this.grabando) {
			this._stopVoice();
		} else {
			this._startVoice();
		}
	}


	/**
	 * ###	Actualiza los datos del diccionario directamente sobre el diccionario. Sin interacción con el popover.
	 * 				Si no existe el id_elemento en el diccionario, lo CREA.  
	 * 				PONE O QUITA EL MARKADOR VISUAL según haya mensaje.
	 * @param {String} id_elemento ► 'Silla_X' o 'Mesa_Y'
	 * @param {String|null} valor_mensaje ► Si es null, no actualiza el mensaje. Si es string, actualiza el mensaje.	 
	 * ```javascript
	 * • popoverElement._update_data('silla_3', 'nuevo mensaje');
	 * • popoverElement._update_data('mesa_1',  '');		// mensaje vacío, quita markador
	 * ```
	 */
	update_mensaje(id_elemento,  valor_mensaje = null){
		try {
			// Si no existe la clave, LA CREA.

			if (!this.d_data[id_elemento]) this.d_data[id_elemento] = { ...Motor_Mensajes._FICHA_VACIA };

			// Actualizo el mensaje si no es null
			if (valor_mensaje !== null) this.d_data[id_elemento].mensaje = valor_mensaje;
			
			// Pongo o quito la marca visual según mensaje/alergias
			this._actualizar_markador_elemento(id_elemento);
		} catch (error) {
			console.error("Error al actualizar datos en popover:", error);
			return false;
		}
		return true;
	}

	/** ### Acualiza un diccionario directamente
	 * id_elemento(string) 
	 * alergia_s(array) 
	 *  */
	update_alergia(id_elemento, alergia_s = []) {
		if(!id_elemento) return false;
		if (!this.d_alergias[id_elemento]) this.d_alergias[id_elemento] = [];
		this.d_alergias[id_elemento] = Array.isArray(alergia_s) ? alergia_s : [];
		this._actualizar_markador_elemento(id_elemento);
	}
	
	// ■■■■■■■■ Grabación ■■■■■■■■
	/** 
	 * ### Empieza la grabación de voz utilizando la API de reconocimiento de voz del navegador. Cambia el estado del botón y maneja errores. */
	_startVoice() {
			if (!this._canUseSpeechRecognition()) {
					this._notifySpeechUnsupported();
					return;
			}

			if (this.grabando) return;

			try {
					this._setRecordingState(true);
					this.speechRecognition.start();
					console.log(`🎤 start ${this.id_elemento}`);
			} catch (error) {
					console.error('No se pudo iniciar la captura de voz:', error);
					this._handleRecognitionEnd(true);
			}
	}

	/**
	 * ### Detiene la grabación de voz. 
	_stopVoice()  {
			if (!this._canUseSpeechRecognition()) return;
			if (!this.grabando) return;

			try {
					this._setRecordingState(false);
					this.speechRecognition.stop();
					console.log(`■ stop ${this.id_elemento}`);
			} catch (error) {
					console.error('No se pudo detener la captura de voz:', error);
					this._handleRecognitionEnd(true);
			}
	}

        // ■■■■■■■■ Getters ■■■■■■■■
	/**
	 * ###	Devuelve el objeto tip de popover o null si no existe popover.
	 */
	get tip() {
		return this.bs_popover ? this.bs_popover.tip : null;
	}
	
	/**
	 * ###	  Acceso seguro al textarea. No usado por la clase.
	 */
	get_mensaje_dom() {
		return this.bs_popover?.tip?.querySelector('#textarea_popov');
	}
	
	/**
	 * ###	  Cuando la app necesite datos, este es un ejemplo:	// 
	 * ```javascript
	 *		'Silla_3': {usuario: 'usu', fecha: '25/8/2025', hora: '21:27:41', mensaje: 'una de gambas'},
	 *		'Silla_4': {usuario: 'usu', fecha: '25/8/2025', hora: '21:43:02', mensaje: 'gluten'},
	 *		'Silla_7': {usuario: 'usu', fecha: '25/8/2025', hora: '21:47:22', mensaje: 'marisco'}
	 *		}
	 * ```
	 */
	get d_data(){
		return this.d_data || {};
	}	
	get datos(){
		return this.d_data || {};
	}
	get d_mensajes(){
		return this.d_data || {};
	}
	get is_single(){
		if (typeof(this.is_single) != 'boolean') 
			this.is_single = true;
		return this.is_single;
	}

	api_alergias(){
		return this.d_alergias || {};
	}

	_tiene_mensaje(id_elemento_dom = '') {
		const mensaje = this.d_data[id_elemento_dom]?.mensaje || '';
		return typeof mensaje === 'string' && mensaje.trim() !== '';
	}

	_tiene_alergias(id_elemento_dom = '') {
		const alergias = this.d_alergias[id_elemento_dom] || [];
		return Array.isArray(alergias) && alergias.length > 0;
	}

	/** ### Actualiza el markador de un elemento según tenga mensaje o alergias.
	 * @param {String} id_elemento_dom ► 'mesa_0' , 'silla_2' ... es el elemento sobre el que aparecerá la bolita. 
	 * */
	_actualizar_markador_elemento(id_elemento_dom = '') {
		if (!id_elemento_dom) return;
		const b_mensajes = this._tiene_mensaje(id_elemento_dom);
		const b_alergias = this._tiene_alergias(id_elemento_dom);

		if (b_mensajes && b_alergias) {
			this.__mostrar_markador(id_elemento_dom, 'rgb(76, 138, 208)');
			return;
		}else if(b_mensajes){
			this.__mostrar_markador(id_elemento_dom, 'rgb(78, 208, 49)');
			return;
		}else if(b_alergias){
			this.__mostrar_markador(id_elemento_dom, 'rgb(168, 2, 2)');
			return;
		}
		this.__ocultar_markador(id_elemento_dom);
	}

	
	/**
	 * ### Muestra la pequeña circunferencia de color cuando hay un mensaje en el elemento_dom mesa o silla.
	 * @param {String}	id_elemento_dom ► 'mesa_0' , 'silla_2' ... es el elemento sobre el que aparecerá la bolita. */
	__mostrar_markador(id_elemento_dom, color_bolita=null) {
		// Valida que el elemento DOM existe 
		const elemento_dom = document.getElementById(id_elemento_dom);
		if (!elemento_dom) return;
		
		// Añadir clase para posicionamiento relativo si no la tiene
		if (!elemento_dom.classList.contains('elemento_con_mensaje')) {
			 elemento_dom.classList.add('elemento_con_mensaje');
		}

		// Pongo el mismo tema que usa su popover. de esta manera puedo poner 
		const theme_elemento = elemento_dom.getAttribute('data-theme');
		if (!theme_elemento)
			elemento_dom.setAttribute('data-theme', this.theme);

		// Crear o actualizar marcador
		let bolita = elemento_dom.querySelector('.markador_mensaje');
		// Si no existe, se crea.
		if (!bolita) {
			bolita = document.createElement('i');
			bolita.className = 'bi bi-chat-quote markador_mensaje';
			bolita.setAttribute('aria-hidden', 'true');
			elemento_dom.appendChild(bolita);
		}
		
		// Asegurar que está visible
		bolita.style.display = 'block';
		if(color_bolita && typeof color_bolita === 'string'){
			bolita.style.color = color_bolita;
		}else{
			bolita.style.color = '#16a34a';
		}
	}

	/**
	 * ###	Oculta la pequeña circunferencia de color cuando hay un mensaje en el elemento_dom mesa o silla. 	 */
	__ocultar_markador(id_elemento_dom) {
		const player = document.getElementById(id_elemento_dom);
		if (!player) return;
		
		const bolita = player.querySelector('.markador_mensaje');
		if (bolita) {
			bolita.style.display = 'none';
		}
		player.classList.remove('elemento_con_mensaje');
	}
	
	/**
	 * ### Resetea el diccionario de datos del popover.
	 * {@link Configuracion_Salon. limpiar_Salon}  */
	reset_all_data(){
		this.d_data = {};
	}	
	
	/**
	 * ### Cambia el tema en caliente	 */
	setTheme(theme = 'pastel') {
		this.theme = theme;
		if (this.bs_popover?.tip) this.bs_popover.tip.setAttribute('data-theme', theme);
	}


}	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ FIN  CLASE 	PopOverElemen_t


/**
 * Motor de selección de alérgenos para un elemento (silla/mesa).
 * - Usa un modal nativo de Bootstrap 5.
 * - Permite seleccionar/deseleccionar alérgenos.
 * - Entrega el resultado con callback al cerrar (guardar o clic fuera).
 */
class Motor_Alergias {
    constructor() {
        this.$modal = null;
        this.$labelSeleccion = null;
        this.$grid = null;

        this.modalInstancia = null;
        this._callbackActual = null;
        this._cancelado = false;

        /** clave -> render del icono */
        this.d_alergenos = {
            gluten:    { slug: 'gluten',    svg: '<img src="./imgs/alergia-gluten.svg" alt="Gluten" />' },
            lacteos:   { slug: 'lacteos',   svg: '<img src="./imgs/alergia-lacteos.svg" alt="Lácteos" />' },
            crustaceos:{ slug: 'crustaceos',svg: '<img src="./imgs/alergia-crustaceo.svg" alt="Crustáceos" />' },
            moluscos:  { slug: 'moluscos',  svg: '<img src="./imgs/alergia-moluscos.svg" alt="Moluscos" />' },
            pescado:   { slug: 'pescado',   svg: '<img src="./imgs/alergia-pescado.svg" alt="Pescado" />' },
            soja:      { slug: 'soja',      svg: '<img src="./imgs/alergia-soja.svg" alt="Soja" />' },
            huevos:    { slug: 'huevos',    svg: '<img src="./imgs/alergia-huevo.svg" alt="Huevos" />' },
            cascara:   { slug: 'cascara',   svg: '<img src="./imgs/alergia-cascara.svg" alt="Frutos de cáscara" />' }
        };

        this.seleccion_actual = new Set();

        this._inyectar_estilos_modal();
        this._crear_modal_alergias();
        this._init_listeners();
    }

    /** Fuerza al modal a estar por encima del popover (z-index controlado localmente). */
    _inyectar_estilos_modal() {
        const styleId = 'style_motor_alergias_zindex';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            #modal_motor_alergias { z-index: 1080; }
            .modal-backdrop.show[data-alergias-backdrop="1"] { z-index: 1079; }
        `;
        document.head.appendChild(style);
    }

    /** Crea el DOM del modal y lo inyecta una sola vez. */
    _crear_modal_alergias() {
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
                        <div class="modal-header">
                            <h5 class="modal-title">Seleccionar alergias</h5>
                        </div>
                        <div class="modal-body">
                            <label class="w-alergias-label">Sin selección</label>
                            <div class="w-alergias-grid mt-3"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-success" data-action="guardar-alergias">Guardar</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-action="salir-alergias">Salir</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild($modal);
        }

        this.$modal = $modal;
        this.$labelSeleccion = $modal.querySelector('.w-alergias-label');
        this.$grid = $modal.querySelector('.w-alergias-grid');
        this.modalInstancia = new bootstrap.Modal($modal, {
            backdrop: true,
            keyboard: false
        });

        const htmlBotones = Object.entries(this.d_alergenos)
            .map(([key, data]) => `
                <button type="button" class="w-alergeno-btn" data-alergeno="${key}" aria-pressed="false">
                    <span class="w-alergeno-icon">${data.svg}</span>
                    <span class="w-alergeno-text">${data.slug}</span>
                </button>
            `)
            .join('');

        this.$grid.innerHTML = htmlBotones;
    }

    _init_listeners() {
        if (!this.$modal) return;

        this.$modal.addEventListener('show.bs.modal', () => {
            window.setTimeout(() => {
                const $backdrop = document.querySelector('.modal-backdrop.show:last-of-type');
                if ($backdrop) {
                    $backdrop.setAttribute('data-alergias-backdrop', '1');
                }
            }, 0);
        });

        this.$modal.addEventListener('hide.bs.modal', () => {
            if (this._cancelado) {
                this._limpiar_estado_cierre();
                return;
            }

            const resultado = Array.from(this.seleccion_actual);
            if (this._callbackActual) {
                this._callbackActual(resultado);
            }
            this._limpiar_estado_cierre();
        });

        this.$modal.addEventListener('click', (event) => {
            const btnAlergeno = event.target.closest('[data-alergeno]');
            if (btnAlergeno) {
                const key_alergeno = btnAlergeno.getAttribute('data-alergeno');
                this._toggle_alergeno(key_alergeno);
                return;
            }

            const action = event.target.closest('[data-action]')?.getAttribute('data-action');
            if (action === 'guardar-alergias') {
                this._cancelado = false;
                this.modalInstancia?.hide();
                return;
            }

            if (action === 'salir-alergias') {
                this._cancelado = true;
                this.modalInstancia?.hide();
            }
        });
    }

    _limpiar_estado_cierre() {
        this._callbackActual = null;
        this._cancelado = false;
    }

    _toggle_alergeno(key_alergeno) {
        if (!key_alergeno || !this.d_alergenos[key_alergeno]) return;

        if (this.seleccion_actual.has(key_alergeno)) {
            this.seleccion_actual.delete(key_alergeno);
        } else {
            this.seleccion_actual.add(key_alergeno);
        }

        this._set_tooltip();
    }

    _set_tooltip() {
        if (!this.$grid) return;

        this.$grid.querySelectorAll('[data-alergeno]').forEach((btn) => {
            const key_alergeno = btn.getAttribute('data-alergeno');
            const isActive = this.seleccion_actual.has(key_alergeno);
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        const seleccion = Array.from(this.seleccion_actual);
        if (!this.$labelSeleccion) return;

        if (!seleccion.length) {
            this.$labelSeleccion.textContent = 'Sin selección';
            this.$labelSeleccion.classList.remove('is-valid');
            return;
        }

        this.$labelSeleccion.textContent = seleccion.join(', ');
        this.$labelSeleccion.classList.add('is-valid');
    }

    /**
     * Abre el modal con un callback para guardar la selección.
     * @param {string[]} alergias_previas
     * @param {(resultado: string[]) => void} callback_guardar
     */
    abrir(alergias_previas = [], callback_guardar = null) {
        this._cancelado = false;
        this._callbackActual = typeof callback_guardar === 'function' ? callback_guardar : null;

        const guardado = Array.isArray(alergias_previas) ? alergias_previas : [];
        this.seleccion_actual = new Set(guardado);
        this._set_tooltip();

        this.modalInstancia?.show();
    }
    
    get_alergenos(key_alergenos_busca = '') {
        if (typeof key_alergenos_busca === 'string' && key_alergenos_busca.trim() !== '') {
			const alergeno = this.d_alergenos[key_alergenos_busca];
            return alergeno;
        }
        return this.d_alergenos;
    }
}
