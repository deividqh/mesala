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
    modelo_salon: 'limitado',           // 🍏🍏 Un modelo limitado, te dice cuantas columnas y filas tienes que poner según tu ancho de pantalla.
    estilo_UI: 'original',                   // 🍏🍏 De momento sin uso, esto está preparado para trabajar con los modos(oscuro, claro)
    tipos: { mesa: 'mesa', silla:'silla' } ,    // 🍏🍏 Lo tengo que cambiar por el array de elementos svg que quuiero que figuren en la logica de salon.
    class_name : { contenedor: 'estiloSalon', baldosas:   'estiloBaldosas' },
    
};

let APP_SALON = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('\n');
    console.log('██████████████████████████████████████████████████████████');
    console.log('██████████████ Inicializando Salón • • • • ███████████████\n');

    APP_SALON = new e_Salon(dicc_salon);
});
