/**
 * @file Catalogo_Elementos.js
 * @description Definición centralizada de tipos de objetos del salón.
 */

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
                estiloUI: 'estilo_EsquinaMuro'
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
                estiloUI: 'estilo_EsquinaMuro'
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
            b_alergias: false,
            msg: { tipo: 'single', estiloUI: 'estilo_EsquinaMuro' }
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