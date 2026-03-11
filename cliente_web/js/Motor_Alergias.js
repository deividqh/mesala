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

    get_alergenos(tipo = '') {
        if (typeof tipo === 'string' && tipo.trim() !== '') {
            return this.d_alergenos[tipo];
        }
        return this.d_alergenos;
    }
}
