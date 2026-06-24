const CATALOGO_ELEMENTOS = Object.freeze({
    mesa: {
        id: 'mesa',
        grupo: 'player',
        fisica: {
            ancho: 1, // Medida en celdas/baldosas
            alto: 1,
            colision: true // true = colisiona, false = no colisiona (ej: decoración)
        },
        visual: {
            html: '<svg class="imagen_menu imagen_menu--mesa" fill="currentColor" viewBox="0 0 50 50" width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"> <path class="st0" d="M10.585938 11L0.38085938 21.205078 A 1.0001 1.0001 0 0 0 0.18945312 21.396484L0 21.585938L0 21.832031 A 1.0001 1.0001 0 0 0 0 22.158203L0 28L3 28L3 50L9 50L9 28L11 28L11 43L17 43L17 28L33 28L33 43L39 43L39 28L41 28L41 50L47 50L47 28L50 28L50 22.167969 A 1.0001 1.0001 0 0 0 50 21.841797L50 21.585938L49.806641 21.392578 A 1.0001 1.0001 0 0 0 49.623047 21.207031 A 1.0001 1.0001 0 0 0 49.617188 21.203125L39.414062 11L39 11L10.585938 11 z M 11.414062 13L38.585938 13L46.585938 21L3.4140625 21L11.414062 13 z M 2 23L48 23L48 26L46.167969 26 A 1.0001 1.0001 0 0 0 45.841797 26L42.154297 26 A 1.0001 1.0001 0 0 0 41.984375 25.986328 A 1.0001 1.0001 0 0 0 41.839844 26L38.167969 26 A 1.0001 1.0001 0 0 0 37.841797 26L34.154297 26 A 1.0001 1.0001 0 0 0 33.984375 25.986328 A 1.0001 1.0001 0 0 0 33.839844 26L16.167969 26 A 1.0001 1.0001 0 0 0 15.841797 26L12.154297 26 A 1.0001 1.0001 0 0 0 11.984375 25.986328 A 1.0001 1.0001 0 0 0 11.839844 26L8.1679688 26 A 1.0001 1.0001 0 0 0 7.8417969 26L4.1542969 26 A 1.0001 1.0001 0 0 0 3.984375 25.986328 A 1.0001 1.0001 0 0 0 3.8398438 26L2 26L2 23 z M 5 28L7 28L7 48L5 48L5 28 z M 13 28L15 28L15 41L13 41L13 28 z M 35 28L37 28L37 41L35 41L35 28 z M 43 28L45 28L45 48L43 48L43 28 z"/> </svg>',
            url: '',
            css: 'estiloMesa'
        },
        logica: {
            b_alergias: false,
            msg: {
                tipo: 'sumatorio',              // Motor de mensajes: acumula valores por reserva.
                estiloUI: 'estilo_Popover_Mesa'
            }
        }
    },
    silla: {
        id: 'silla',
        grupo: 'player',
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            html: '<svg class="imagen_menu imagen_menu--silla st0" fill="currentColor" viewBox="0 0 512 512" width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><g><rect x="262.97" y="298.368" class="st0" width="33.329" height="155.344"/><path class="st0" d="M243.216,23.156l-50.788,201.47h-42.233l-89.148,13.431v36.624l10.08,1.437h-10.08v177.595h33.329V279.441l55.819,7.952V512h41.146V287.392h158.98V512h41.137V259.523L450.953,0L243.216,23.156z M349.317,224.626H225.884l43.386-172.06l122.188-11.116L349.317,224.626z"/></g></svg>',
            url: '',
            css: 'estiloAsiento'
        },
        logica: {
            b_alergias: true,
            msg: {
                tipo: 'single', // Motor de mensajes: individual
                estiloUI: 'estilo_Popover_Silla'
            }
        }
    },
    taburete: {
        id: 'taburete',
        grupo: 'player',
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './imgs/taburete.svg',
            css: 'estiloTaburete'
        },
        logica: {
            b_alergias: true,
            msg: { tipo: 'single', estiloUI: 'estilo_Popover_Taburete' }
        }
    },
    planta: {
        id: 'planta',
        grupo: 'decoration',
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            html: '',
            url: '',
            css: 'estiloPlanta'
        },
        logica: { b_alergias: false, msg: null }
    },
    // esquina_muro: {
    //     id: 'esquina_muro',
    //     grupo: 'structure',
    //     fisica: { ancho: 1, alto: 1, colision: true },
    //     visual: {
    //         html: '',
    //         url: '',
    //         css: 'estiloEsquinaMuro'
    //     },
    //     logica: { b_alergias: false, msg: null }
    // }
});


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
        sub_grupo: 'agrupador', // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
        fisica: {
            ancho: 1, // Medida en celdas/baldosas
            alto: 1,
            colision: true // true = colisiona, false = no colisiona (ej: fondo)
        },
        visual: {
            content: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            css: 'estiloMesa'
        },
        logica: {
            b_alergias: false,
            msg: {
                tipo: 'sumatorio',              // Motor de mensajes: acumula valores por reserva.
                css: 'estilo_Popover_Mesa'
            }
        }
    },
    silla: {
        id: 'silla',
        grupo: 'player',
        sub_grupo: 'agrupado',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc) 
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50"> <g fill="#8B4513"> <rect x="262.97" y="298.368" width="33.329" height="155.344"/> <path d="M243.216,23.156l-50.788,201.47h-42.233l-89.148,13.431v36.624l10.08,1.437h-10.08v177.595h33.329V279.441l55.819,7.952V512h41.146V287.392h158.98V512h41.137V259.523L450.953,0L243.216,23.156z M349.317,224.626H225.884l43.386-172.06l122.188-11.116L349.317,224.626z"/> </g> </svg>`,
            css: 'estiloAsiento'
        },
        logica: {
            b_alergias: true,
            msg: {
                tipo: 'single', // Motor de mensajes: individual
                css: 'estilo_popover_agrupado'
            }
        }
    },
    taburete: {
        id: 'taburete',
        grupo: 'player',
        sub_grupo: 'agrupado',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            content: './imgs/taburete.svg',
            css: 'estiloAsiento'
        },
        logica: {
            b_alergias: true,
            msg: { tipo: 'single', css: 'estilo_Popover_Taburete' }
        }
    },
    // planta: {
    //     id: 'planta',
    //     grupo: 'decoration',
    //     sub_grupo: 'decoracion',   // Repito pq esto es futuro, no presente. pero quiero pensar ya en esto.
    //     fisica: { ancho: 1, alto: 1, colision: true },
    //     visual: {
    //         html: '',
    //         url: '',
    //         css: 'estiloPlanta'
    //     },
    //     logica: { b_alergias: false, msg: null }
    // },
    // esquina_muro: {
    //     id: 'esquina_muro',
    //     grupo: 'structure',
    //     sub_grupo: 'estructura',    // Repito pq esto es futuro, no presente. pero quiero pensar ya en esto.
    //     fisica: { ancho: 1, alto: 1, colision: true },
    //     visual: {
    //         html: '',
    //         url: '',
    //         css: 'estiloEsquinaMuro'
    //     },
    //     logica: { b_alergias: false, msg: null }
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

    // Exportación para Node.js o Navegador moderno
    // export default Catalogo;

}