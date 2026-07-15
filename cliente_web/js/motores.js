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
class Motor_Mensajes {
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
            ...Motor_Mensajes.FICHA_VACIA,
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
        if (this.id_elemento && !ids.includes(this.id_elemento)) {
			ids.push(this.id_elemento);
		}
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
                this.d_data[id_elemento] = { ...Motor_Mensajes.FICHA_VACIA };
            }
			this._actualizar_markador_elemento(id_elemento);
            return true;
        }
        return this.set(id_elemento, valor_mensaje);
    }

    read_data() {
        return Object.entries(this.d_data)
            .map(([key, value]) => `📍${key}: ${JSON.stringify(value)}`)
            .join('\n');
    }

    reset_all_data() {
        this.reset();
    }

	_actualizar_markador_elemento(id_elemento = '') {
        if (!id_elemento) return;
        if (this.has(id_elemento)) 
			this.__mostrar_markador(id_elemento);
        else 
			this.__ocultar_markador(id_elemento);
    }

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

	// markador_mensaje
	// elemento_con_mensaje
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


	_crear_botones_accion() {
		const toolbar = document.createElement('div');
		toolbar.className = 'd-flex gap-2 motor-mensajes-acciones';
		// Error: cachar los botones de Catalogo. ya está preparado.(#botones_crud_grabar)
		const btns = Catalogo.get_btns_crud_grabar()
		btns.forEach((boton) => {
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

	_es_rol(id_elemento = '' , rol_busca='reserver') {
		const elemento_dom = e_Salon._to_element(id_elemento);
		const id_catalogo = elemento_dom?.dataset?.id_key || id_elemento.split('_')[0];
		const match_rol = Catalogo.get(id_catalogo)?.rol === rol_busca;
		return match_rol
	}

	_get_ids_reservers_de_reserva() {
		return this.ids_reserva_actual.filter((id) => {
			if (!id || id === this.id_elemento) return false;
			return this._es_rol(id, 'reserver');
		});
	}
	_crear_sumatorio() {
		const sumatorio = document.createElement('div');
		sumatorio.className = 'motor-mensajes-sumatorio';
		sumatorio.setAttribute('role', 'note');
		sumatorio.setAttribute('aria-live', 'polite');

		// this.ids_reserva_actual.forEach((id) => {
		this._get_ids_reservers_de_reserva().forEach((id) => {
			const row = document.createElement('div');
			const colId = document.createElement('span');
			const colMsg = document.createElement('span');

			row.className = 'sumatorio-row';
			colId.className = 'sumatorio-id';
			colMsg.className = 'sumatorio-msg';
			colId.textContent = `${id}: `;
			colMsg.textContent = this.get_mensaje(id);

			colId.textContent = `${id}: `;
			colMsg.textContent = this.get_mensaje(id);

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
	render(data_logica = {}, elemento_dom=null, contenedor_dom=null){
		const tipo_render = data_logica.content === 'sumatorio' ? 'sumatorio' : 'single';
		// Solo se asigna si se pasa explicitamente.
		const $contenedor = document.createElement('div');		
		$contenedor.className = ['contenedor_motor_mensajes', data_logica.css || ''].filter(Boolean).join(' ');

		const textarea = document.createElement('textarea');
		textarea.className = 'form-control mb-2';
		textarea.rows = 2;
		textarea.placeholder = 'Escribe aquí...';
		textarea.value = this.get_mensaje(this.id_elemento);

		if (tipo_render === 'sumatorio') {
			// $contenedor.appendChild(this._crear_sumatorio(textarea));
			$contenedor.appendChild(this._crear_sumatorio());
		}

		$contenedor.appendChild(textarea);
		$contenedor.appendChild(this._crear_botones_accion());
		
		$contenedor.addEventListener('click', (ev) => {
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
		
		if(contenedor_dom) {
			contenedor_dom.appendChild($contenedor)
		}
		return $contenedor;
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
class Motor_Alergias {
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
		this._emitir_cambio(id_elemento);
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
	render(data_logica = {}, elemento_dom=null, contenedor_dom=null){
		const id_elemento = elemento_dom?.id || this.id_elemento;
		const es_news = data_logica.news === true;

		const $contenedor = document.createElement('div');
		$contenedor.className = ['contenedor_motor_alergias', data_logica.css || ''].filter(Boolean).join(' ');
		// $contenedor.className = ['contenedor_motor_alergias', es_news ? 'is-news' : '', data_logica.css || ''].filter(Boolean).join(' ');

		const resumen = document.createElement('div');
		resumen.className = 'labels-alergias-pop';

		// this._actualizar_resumen(resumen, this.get(this.id_elemento));

		// const button = document.createElement('button');
		// button.type = 'button';
		// button.className = 'btn btn-sm btn-alergias-pop';
		// button.textContent = 'Alergias';

		// button.addEventListener('click', () => {
		// 	const alergenos = this._get_alergenos_render(data_logica);
		// 	this.abrir(this.get(this.id_elemento), (seleccion) => {
		// 		this.set(this.id_elemento, seleccion);
		// 		this._actualizar_resumen(resumen, this.get(this.id_elemento));
		// 	}, alergenos);
		// });
		const refrescar = () => {
			const alergias = this.get(id_elemento);
			$contenedor.classList.toggle('has-alergias', alergias.length > 0);
			this._actualizar_resumen(resumen, alergias, {
				editable: es_news,
				texto_vacio: es_news ? 'Sin alergias.' : 'Sin alergias seleccionadas.'
			});
		};

		refrescar();

		const onCambio = (event) => {
			if (event.detail?.id_elemento === id_elemento) refrescar();
		};
		document.addEventListener('motor_alergias:change', onCambio);

		resumen.addEventListener('click', (event) => {
			const cerrar = event.target.closest('.alergia-tag-close');
			if (!cerrar) return;
			const alergias = this.get(id_elemento).filter((alergia) => alergia !== cerrar.dataset.alergia);
			this.set(id_elemento, alergias);
		});	

		$contenedor.appendChild(resumen);
		// $contenedor.appendChild(button);

		if (!es_news) {
			const $button = document.createElement('button');
			$button.type = 'button';
			$button.className = 'btn btn-sm btn-alergias-pop';
			$button.textContent = 'Alergias';

			$button.addEventListener('click', () => {
				const alergenos = this._get_alergenos_render(data_logica);
				this.abrir(this.get(id_elemento), (seleccion) => this.set(id_elemento, seleccion), alergenos);
			});

			$contenedor.appendChild($button);
		}

		if(contenedor_dom) {
			contenedor_dom.appendChild($contenedor)
		}
		return $contenedor;
	}

}

