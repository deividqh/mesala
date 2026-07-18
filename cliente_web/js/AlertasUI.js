class Alertas_UI {

    /**
 * Muestra un modal de confirmación y devuelve una promesa.
 * @param {string} encabezado - Título del modal.
 * @param {string} texto - Mensaje de la pregunta.
 * @param {string} tipo - Color del botón principal ('danger', 'success', 'warning').
 * @returns {Promise<boolean>} - True si confirma, False si cancela o cierra.
 */
static async ConfirM(encabezado, texto, tipo = 'danger') {
    const id_modal = `modal_${Date.now()}`;
    
    // Mapeo de colores para el botón de acción
    const clases_btn = {
        'success': 'btn-success',
        'danger':  'btn-danger',
        'warning': 'btn-warning text-dark'
    };
    const clase_accion = clases_btn[tipo] || clases_btn['danger'];

    const mensaje_Salida = `<br><br>¿Estás Seguro de que Quieres Continuar?`;
    texto += mensaje_Salida; 

    // Estructura del Modal compatible con Bootstrap 5
    const html_modal = `
        <div class="modal fade" id="${id_modal}" tabindex="-1" aria-hidden="true" data-tipo-bs="offcanvas-rud">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${encabezado}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${texto}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="${id_modal}_cancelar" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn ${clase_accion}" id="${id_modal}_confirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>`;

    // Inyectamos el modal al final del body
    document.body.insertAdjacentHTML('beforeend', html_modal);

    const elemento_modal = document.getElementById(id_modal);
    const instancia_bs = new bootstrap.Modal(elemento_modal);
    
    instancia_bs.show();

    // Retornamos una Promesa para manejar la respuesta de forma asíncrona
    return new Promise((resolve) => {
        const btn_confirmar = document.getElementById(`${id_modal}_confirmar`);
        let usuario_confirmo = false; // Bandera de control

        // Caso 1: El usuario confirma (solo cambia la bandera y cierra)
        btn_confirmar.addEventListener('click', () => {
            usuario_confirmo = true;
            instancia_bs.hide();
        });

        // Caso 2: El modal se oculta (por cualquier motivo: confirmar, cancelar, X, clic fuera o tecla ESC)
        elemento_modal.addEventListener('hidden.bs.modal', () => {
            resolve(usuario_confirmo); // Resuelve true o false según la bandera
            elemento_modal.remove();   // Elimina el elemento del DOM de forma segura
        });
    });
}


    
	/**
     * Muestra una notificación tipo Toast.
     * @param {string} texto - Cuerpo del mensaje.
     * @param {string} encabezado - Título.
     * @param {string} tipo - Categoría: 'success', 'danger', 'warning'. Por defecto 'success'.
     */
    static _NotA(encabezado, texto, tipo = 'success') {
        const id_contenedor = 'contenedor_toasts';
        let contenedor = document.getElementById(id_contenedor);

        if (!contenedor) {
            contenedor = document.createElement('div');
            contenedor.id = id_contenedor;
            contenedor.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(contenedor);
        }

        // Mapeo de estilos según el tipo para mantener la lógica limpia
        const estilos_por_tipo = {
            'success': 'bg-success text-white',
            'danger':  'bg-danger text-white',
            'warning': 'bg-warning text-dark' // El amarillo requiere texto oscuro por accesibilidad
        };

        const clase_estilo = estilos_por_tipo[tipo] || estilos_por_tipo['success'];
        const id_toast = `toast_${Date.now()}`;

        const html_toast = `
            <div id="${id_toast}" 
                 class="toast" 
                 role="alert" 
                 aria-live="assertive" 
                 aria-atomic="true" 
                 data-tipo-bs="offcanvas-rud">
                <div class="toast-header ${clase_estilo}">
                    <strong class="me-auto">${encabezado}</strong>
                    <button type="button" class="btn-close ${tipo === 'warning' ? '' : 'btn-close-white'}" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${texto}
                </div>
            </div>`;

        contenedor.insertAdjacentHTML('beforeend', html_toast);

        const elemento_toast = document.getElementById(id_toast);
        const instancia_bs = new bootstrap.Toast(elemento_toast, { delay: 4000, autohide: true });

        instancia_bs.show();

        elemento_toast.addEventListener('hidden.bs.toast', () => {
            elemento_toast.remove();
        });
    }

	/**
     * Muestra un modal con un campo de texto y devuelve el valor cuando se confirma.
     * @param {string} encabezado - Título del modal.
     * @param {string} texto - Mensaje de la pregunta.
     * @param {string} tipo - Color del botón principal ('danger', 'success', 'warning').
     * @param {boolean} is_oblig - Indica si el campo es obligatorio.
     * @returns {Promise<string|false>} - Valor ingresado si confirma, False si cancela o cierra.
     */
    async DatIN(encabezado, texto, label, tipo = 'danger', is_oblig = true) {
        const id_modal = `modal_${Date.now()}`;
        const id_input = `${id_modal}_input`;

        const clases_btn = {
            'success': 'btn-success',
            'danger':  'btn-danger',
            'warning': 'btn-warning text-dark'
        };
        const clase_accion = clases_btn[tipo] || clases_btn['danger'];

        const texto_obligatorio = is_oblig ? '<span class="text-danger">( * )</span>' : '';

		label ? label.trim() : '';
        const html_modal = `
            <div class="modal fade" id="${id_modal}" tabindex="-1" aria-hidden="true" data-tipo-bs="offcanvas-rud">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${encabezado}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
							${texto}
							<div class="mb-3">
								<label for="${id_input}" class="form-label">${label} ${texto_obligatorio}</label>
								<input type="text" class="form-control" id="${id_input}" ${is_oblig ? 'required' : ''}>
								<div class="invalid-feedback">Este campo es obligatorio.</div>
							</div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"   id="${id_modal}_cancelar" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn ${clase_accion}" id="${id_modal}_confirmar">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>`;

        document.body.insertAdjacentHTML('beforeend', html_modal);

        const elemento_modal = document.getElementById(id_modal);
        const input = document.getElementById(id_input);
        const instancia_bs = new bootstrap.Modal(elemento_modal);

        instancia_bs.show();

        return new Promise((resolve) => {
            const btn_confirmar = document.getElementById(`${id_modal}_confirmar`);

            const validar = () => {
                if (!is_oblig) {
                    return true;
                }
                const valor = input.value.trim();
                if (valor.length === 0) {
                    input.classList.add('is-invalid');
                    input.focus();
                    return false;
                }
                input.classList.remove('is-invalid');
                return true;
            };

            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    validar();
                }
            });

            btn_confirmar.addEventListener('click', () => {
                if (!validar()) {
                    return;
                }
                instancia_bs.hide();
                resolve(input.value.trim());
            });

            elemento_modal.addEventListener('hidden.bs.modal', () => {
                resolve(false);
                elemento_modal.remove();
            });
        });
    }

	// /**
    //  * Muestra un modal con un campo de texto y devuelve el valor validado cuando se confirma.
    //  * Obliga al usuario a introducir un valor que esté contenido en el array de resultados.
    //  * * @param {string} encabezado - Título del modal.
    //  * @param {string} texto - Mensaje de la pregunta.
    //  * @param {string} label - Etiqueta del input.
    //  * @param {Array<string|number>} resultado - Array con las opciones válidas aceptadas.
    //  * @param {string} tipo - Color del botón principal ('danger', 'success', 'warning').
    //  * @returns {Promise<string|false>} - Valor ingresado si confirma, false si cancela o cierra.
    //  */
    // async DatIN(encabezado, texto, label, resultado, tipo = 'danger') {
    //     // Validación preventiva y estructurada
    //     if (!Array.isArray(resultado) || resultado.length === 0) {
    //         console.error("DatIN Error: El parámetro 'resultado' debe ser un array con al menos una opción.");
    //         return false;
    //     }

    //     const id_modal = `modal_${Date.now()}`;
    //     const id_input = `${id_modal}_input`;

    //     const clases_btn = {
    //         'success': 'btn-success',
    //         'danger':  'btn-danger',
    //         'warning': 'btn-warning text-dark'
    //     };
    //     const clase_accion = clases_btn[tipo] || clases_btn['danger'];

    //     const label_text = label ? label.trim() : '';
    //     // Normalizamos el array a strings para asegurar una comparación estricta sin fallos de tipado
    //     const opciones_validas = resultado.map(String); 

    //     const html_modal = `
    //         <div class="modal fade" id="${id_modal}" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    //             <div class="modal-dialog modal-dialog-centered">
    //                 <div class="modal-content">
    //                     <div class="modal-header">
    //                         <h5 class="modal-title">${encabezado}</h5>
    //                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                     </div>
    //                     <div class="modal-body">
    //                         ${texto}
    //                         <div class="mb-3 mt-3">
    //                             <label for="${id_input}" class="form-label">${label_text} <span class="text-danger">( * )</span></label>
    //                             <input type="text" class="form-control" id="${id_input}" required autocomplete="off">
    //                             <div class="invalid-feedback" id="${id_input}_error"></div>
    //                         </div>
    //                     </div>
    //                     <div class="modal-footer">
    //                         <button type="button" class="btn btn-secondary" id="${id_modal}_cancelar" data-bs-dismiss="modal">Cancelar</button>
    //                         <button type="button" class="btn ${clase_accion}" id="${id_modal}_confirmar">Confirmar</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>`;

    //     document.body.insertAdjacentHTML('beforeend', html_modal);

    //     const elemento_modal = document.getElementById(id_modal);
    //     const input = document.getElementById(id_input);
    //     const error_div = document.getElementById(`${id_input}_error`);
        
    //     const instancia_bs = new bootstrap.Modal(elemento_modal);
    //     instancia_bs.show();

    //     return new Promise((resolve) => {
    //         const btn_confirmar = document.getElementById(`${id_modal}_confirmar`);

    //         // Limpia el estado de error tan pronto como el usuario empiece a corregir la entrada
    //         input.addEventListener('input', () => {
    //             input.classList.remove('is-invalid');
    //         });

    //         btn_confirmar.addEventListener('click', () => {
    //             const valor = input.value.trim();

    //             // Validación estricta y sencilla
    //             if (opciones_validas.includes(valor)) {
    //                 input.classList.remove('is-invalid');
    //                 instancia_bs.hide();
    //                 resolve(valor); 
    //             } else {
    //                 // Retiene al usuario en la ventana indicando claramente el fallo
    //                 error_div.textContent = `Opción no válida. Valores permitidos: ${opciones_validas.join(', ')}`;
    //                 input.classList.add('is-invalid');
    //                 input.focus();
    //             }
    //         });

    //         // Resuelve y destruye el modal si el usuario sale (evita memory leaks en el DOM)
    //         elemento_modal.addEventListener('hidden.bs.modal', () => {
    //             resolve(false); 
    //             elemento_modal.remove(); 
    //         });
    //     });
    // }
	/**
     * Muestra un modal con un menú desplegable (select) y devuelve la opción seleccionada.
     * Restringe al usuario a elegir únicamente una de las opciones válidas.
     * * @param {string} encabezado - Título del modal.
     * @param {string} texto - Mensaje o descripción de la pregunta.
     * @param {string} label - Etiqueta del select.
     * @param {Array<string|number>} resultado - Array con las opciones a mostrar en el select.
     * @param {string} tipo - Color del botón principal ('danger', 'success', 'warning').
     * @param {string|number|null} by_def - Valor seleccionado por defecto (opcional).
     * @returns {Promise<string|false>} - Valor seleccionado si confirma, false si cancela o cierra.
     */
    async CombIN(encabezado, texto, label, resultado, tipo = 'danger', by_def = null) {
        // Validación preventiva y estructurada del parámetro resultado
        if (!Array.isArray(resultado) || resultado.length === 0) {
            console.error("CombIN Error: El parámetro 'resultado' debe ser un array con al menos una opción.");
            return false;
        }

        const id_modal = Herramientas.get_dom_secuency('modal_comb');
        const id_select = `${id_modal}_select`;

        const clases_btn = {
            'success': 'btn-success',
            'danger':  'btn-danger',
            'warning': 'btn-warning text-dark'
        };
        const clase_accion = clases_btn[tipo] || clases_btn['danger'];
        const label_text = label ? label.trim() : '';

        // Normalizamos opciones y el valor por defecto a texto para evitar problemas de tipado
        const opciones_validas = resultado.map(String);
        const by_def_str = by_def !== null ? String(by_def) : null;
        const tiene_defecto_valido = opciones_validas.includes(by_def_str);

        // Generamos las etiquetas <option> dinámicamente marcando la opción por defecto si procede
        const opciones_html = opciones_validas.map(opcion => {
            const is_selected = (tiene_defecto_valido && opcion === by_def_str) ? 'selected' : '';
            return `<option value="${opcion}" ${is_selected}>${opcion}</option>`;
        }).join('');

        // El placeholder solo está seleccionado si no hay un valor por defecto válido
        const placeholder_selected = tiene_defecto_valido ? '' : 'selected';

        const html_modal = `
            <div class="modal fade" id="${id_modal}" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${encabezado}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${texto}
                            <div class="mb-3 mt-3">
                                <label for="${id_select}" class="form-label">${label_text} <span class="text-danger">( * )</span></label>
                                <select class="form-select" id="${id_select}" required>
                                    <option value="" ${placeholder_selected} disabled>Seleccione una opción...</option>
                                    ${opciones_html}
                                </select>
                                <div class="invalid-feedback" id="${id_select}_error">Debes seleccionar una opción válida de la lista.</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" id="${id_modal}_cancelar" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn ${clase_accion}" id="${id_modal}_confirmar">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>`;

        document.body.insertAdjacentHTML('beforeend', html_modal);

        const elemento_modal = document.getElementById(id_modal);
        const select = document.getElementById(id_select);
        const error_div = document.getElementById(`${id_select}_error`);
        const btn_confirmar = document.getElementById(`${id_modal}_confirmar`);
        
        const instancia_bs = new bootstrap.Modal(elemento_modal);
        instancia_bs.show();

        return new Promise((resolve) => {
            // UX: Dar foco automático al botón Confirmar cuando la animación del modal termine
            elemento_modal.addEventListener('shown.bs.modal', () => {
                btn_confirmar.focus();
            });

            // UX: Limpiar error cuando el usuario cambie la selección
            select.addEventListener('change', () => {
                select.classList.remove('is-invalid');
            });

            btn_confirmar.addEventListener('click', () => {
                const valor = select.value;

                // Validación estricta: No puede ser vacío y debe existir en nuestro array original
                if (valor !== "" && opciones_validas.includes(valor)) {
                    select.classList.remove('is-invalid');
                    instancia_bs.hide();
                    resolve(valor); 
                } else {
                    // Muestra error y retiene al usuario en la ventana
                    select.classList.add('is-invalid');
                    select.focus(); // Devuelve el foco al select para que el usuario corrija
                }
            });

            // Resuelve y destruye el modal al cerrarse para prevenir fugas de memoria (memory leaks)
            elemento_modal.addEventListener('hidden.bs.modal', () => {
                resolve(false); 
                elemento_modal.remove(); 
            });
        });
    }

}
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Compatibilidad;
// }
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

