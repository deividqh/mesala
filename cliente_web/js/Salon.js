// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//                               SALON LAST DANCE           
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//  @author: 	David Quesada H.
//  @version: 	1.0.0
//  @date:   	2023-10-01
//  @description: 	Un salon de Baldosas con mesas y sillas que se pueden arrastrar y soltar formando Reservas.

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
//  1 SALON tiene n RESERVAS.
//  1 RESERVA tiene n MESAS 
//  1 RESERVA tiene n SILLA.
//  Puede haber SILLA sin  Mesas Asociadas, todas las sillas Ronin forman una RESERVA.
//  1 RESERVA de 1 MESA max 8 sillas. 1 RESERVA de 2 MESA max 10 sillas. 1 RESERVA de 3 MESA max 12 sillas.   
//      • FORMULA_RESERVA ►   numero_de_sillas = (numero_mesas*2 + 2) + 4


// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//                                  DICCIONARIO DE CONFIGURACION
// █████████████████████████████████████████████████████████████████████████████████████████████████████████ 
// █ Para gestionar la clase hay que cambiar los valores de este diccionario.  
// █████████████████████████████████████████████████████████████████████████████████████████████████████████ 
let dicc_salon = {
    family:    'Gran-Salon',      // • (Oblig) Familia - Será el id de cada Baldosaa (SALON_0, SALON_1, SALON_2...)
    columnas:  24,                // • (Oblig) Numero de columnas inicial.... VA A VARIAR EN LA CARGA INICIAL DEPENDIENDO DEL DISPOSITIVO.
    filas:     15,                // • (Oblig) Numero de filas Inicial.
    contenedor: '',                // • (Opt) id del div donde voy a meter todas las Baldosas. ► Si '' , genera  'contenedor_0', 'contenedor_1'...
    div_maestro: null,              // • (Opt) id del div donde voy a meter el contenedor. ► Si null , se mete sobre document.body
    modelo_salon: 'limitado',                 // 🍏🍏 Un modelo limitado, te dice cuantas columnas y filas tienes que poner según tu ancho de pantalla.
    estilo_UI: 'original',                    // 🍏🍏 De momento sin uso, esto está preparado para trabajar con los modos(oscuro, claro)
    tipos: { mesa: 'mesa', silla:'silla' } ,  // 🍏🍏 Lo tengo que cambiar por el array de elementos svg que quuiero que figuren en la logica de salon.
    class_name : { contenedor: 'estiloSalon', baldosas: 'estiloBaldosas' },
    // No implementado 🔥🔥.
    elementos: {
        mesa: {
            type: 'player',
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './img/mesa.png',
            class: 'estiloMesa',
            b_alergias: false,
        },
        silla: {
            type: 'player',
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './img/silla.png',
            class: 'estiloSilla',
            b_alergias: true,
        },
        taburete: {
            type: 'player',
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './img/taburete.png',
            class: 'estiloTaburete',
            b_alergias: false,
        },
        planta: {
            type: 'decoration',
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './img/planta.png',
            class: 'estiloPlanta',
            b_alergias: false,
        },
        esquina_muro: {
            type: 'structure',
            html: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" fill="#8B4513" stroke="#000000" stroke-width="2"/></svg>',
            url: './img/esquina_muro.png',
            class: 'estiloEsquinaMuro',
            b_alergias: false,
        },        

    }

};

let APP_SALON = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('\n');
    console.log('██████████████████████████████████████████████████████████');
    console.log('██████████████ Inicializando Salón • • • • ███████████████\n');

    APP_SALON = new e_Salon(dicc_salon);
});
