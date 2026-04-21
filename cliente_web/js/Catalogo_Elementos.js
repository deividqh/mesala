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
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './imgs/mesa.svg',
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
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './imgs/silla.svg',
            css: 'estiloSilla'
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
    esquina_muro: {
        id: 'esquina_muro',
        grupo: 'structure',
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            html: '',
            url: '',
            css: 'estiloEsquinaMuro'
        },
        logica: { b_alergias: false, msg: null }
    }
});


/**
 * @file Catalogo_Elementos.js
 * @description Definición centralizada de tipos de objetos del salón.
 */
class Catalogo {
    // Definición de los datos (Podría venir de un JSON externo o base de datos)
    static #DATA = Object.freeze({
// const CATALOGO_ELEMENTOS = Object.freeze({
    mesa: {
        id: 'mesa',
        grupo: 'player',
        fisica: {
            ancho: 1, // Medida en celdas/baldosas
            alto: 1,
            colision: true // true = colisiona, false = no colisiona (ej: decoración)
        },
        visual: {
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './imgs/mesa.svg',
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
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './imgs/silla.svg',
            css: 'estiloSilla'
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
    esquina_muro: {
        id: 'esquina_muro',
        grupo: 'structure',
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            html: '',
            url: '',
            css: 'estiloEsquinaMuro'
        },
        logica: { b_alergias: false, msg: null }
    }
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
     * Ejemplo: Catalogo.getUnicos('grupo') -> ['player', 'decoration', 'structure']
     */
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

    // Exportación para Node.js o Navegador moderno
    // export default Catalogo;

}