/**
 * @file Catalogo_Elementos.js
 * @description Definición centralizada de tipos de objetos del salón.
 * 
 *  // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // 💥 EJEMPLOS DE LLAMADAS DESDE PROGRAMA:
    // const z_catalogo = Catalogo.get();
    // const z_silla = Catalogo.get("silla");
    // const z_silla_id = Catalogo.get("silla", "id");
    // const z_silla_visual = Catalogo.get("silla", 'visual');
    // const z_silla_visual_css = Catalogo.get("silla", 'visual', "css");
    // const z_visual_css = Catalogo.get('visual', "css"); 	// NULL		

    // const z_grupo = Catalogo.get_distinto_s("grupo");
    // const z_visual = Catalogo.get_distinto_s('visual');
    // const z_visual_content = Catalogo.get_distinto_s('visual', 'content');		
    // const z_log_msg = Catalogo.get_distinto_s('logica', 'motor_mensajes');
    // const z_log_msg_tipo = Catalogo.get_distinto_s('logica', 'motor_mensajes', 'tipo');
    // const z_id_s = Catalogo.get_distinto_s('id');		
    // const z_mesa = Catalogo.get_distinto_s('mesa');	// NULL
    // const z_mesa_id = Catalogo.get_distinto_s('mesa' , 'id');	// NULL

    // const z_keys = Catalogo.get_keys();

    // const z_players = Catalogo.get_item_s("grupo", "player");
    // const z_logica_alergias = Catalogo.get_item_s("logica", "motor_alergias", true);
    // const z_sub_grupos = Catalogo.get_item_s("rol", "cliente");
    // 💥💥💥💥💥💥💥💥

 */
class Catalogo {
    // De momento lo pongo aparte pero quiero meterlo en el catalogo
    static #EXIT = Object.freeze({
        exit: {
            id: 'exit',
            grupo: 'exit',
            rol: 'papelera', // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
            visual: {
                content: `<svg  class="imagen_exit" width="30" height="30" viewBox="0 0 1024 1024" fill="currentColor" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path  d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill="currentColor" /><path  d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill="currentColor" /></svg>`,
                css: 'style_exit'
            },
        },
    });
    
    static #botones_crud_grabar = Object.freeze([
        { action: 'grabar', texto: '🎤', title: 'Grabación de Voz', className: 'btn-grabar' },
        { action: 'guardar', texto: '💾', title: 'Guardar mensaje', className: 'btn-guardar' },
        { action: 'reset', texto: '🔁', title: 'Limpiar texto', className: 'btn-reset' },
        { action: 'eliminar', texto: '🗑️', title: 'Eliminar mensaje', className: 'btn-delete' }
	]);

    // 
    static #DATA = Object.freeze({
    mesa: {
        slug: 'mesa',
        grupo: 'player',
        rol: 'central',         // subgrupo que reune elementos de rol cliente
        fisica: {
            ancho: 1, // Medida en celdas/baldosas
            alto: 1,
            colision: true // true = colisiona, false = no colisiona (ej: fondo)
        },
        visual: {
            nombre: 'Titulo de la Mesa',
            content: `<svg class="imagen_menu imagen_menu--mesa"fill="currentColor" viewBox="0 0 50 50" width="30" height="30"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><path class="st0" d="M10.585938 11L0.38085938 21.205078 A 1.0001 1.0001 0 0 0 0.18945312 21.396484L0 21.585938L0 21.832031 A 1.0001 1.0001 0 0 0 0 22.158203L0 28L3 28L3 50L9 50L9 28L11 28L11 43L17 43L17 28L33 28L33 43L39 43L39 28L41 28L41 50L47 50L47 28L50 28L50 22.167969 A 1.0001 1.0001 0 0 0 50 21.841797L50 21.585938L49.806641 21.392578 A 1.0001 1.0001 0 0 0 49.623047 21.207031 A 1.0001 1.0001 0 0 0 49.617188 21.203125L39.414062 11L39 11L10.585938 11 z M 11.414062 13L38.585938 13L46.585938 21L3.4140625 21L11.414062 13 z M 2 23L48 23L48 26L46.167969 26 A 1.0001 1.0001 0 0 0 45.841797 26L42.154297 26 A 1.0001 1.0001 0 0 0 41.984375 25.986328 A 1.0001 1.0001 0 0 0 41.839844 26L38.167969 26 A 1.0001 1.0001 0 0 0 37.841797 26L34.154297 26 A 1.0001 1.0001 0 0 0 33.984375 25.986328 A 1.0001 1.0001 0 0 0 33.839844 26L16.167969 26 A 1.0001 1.0001 0 0 0 15.841797 26L12.154297 26 A 1.0001 1.0001 0 0 0 11.984375 25.986328 A 1.0001 1.0001 0 0 0 11.839844 26L8.1679688 26 A 1.0001 1.0001 0 0 0 7.8417969 26L4.1542969 26 A 1.0001 1.0001 0 0 0 3.984375 25.986328 A 1.0001 1.0001 0 0 0 3.8398438 26L2 26L2 23 z M 5 28L7 28L7 48L5 48L5 28 z M 13 28L15 28L15 41L13 41L13 28 z M 35 28L37 28L37 41L35 41L35 28 z M 43 28L45 28L45 48L43 48L43 28 z"/></svg>`,
            css: 'style_visual_reserver'
        },
        logica: {
            motor_mensajes: { nombre: "Mensajes", content: 'sumatorio', css: 'estyle_msg_reserver', }
        }
    },
    silla: {
        slug: 'silla',
        grupo: 'player',
        rol: 'cliente',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc) 
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: {
            nombre: 'Titulo de la Silla',
            content: `<svg class="imagen_menu imagen_menu--silla st0"fill="currentColor" viewBox="0 0 512 512" width="30" height="30"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><g><rect x="262.97" y="298.368" class="st0" width="33.329" height="155.344"/><path class="st0" d="M243.216,23.156l-50.788,201.47h-42.233l-89.148,13.431v36.624l10.08,1.437h-10.08v177.595h33.329V279.441l55.819,7.952V512h41.146V287.392h158.98V512h41.137V259.523L450.953,0L243.216,23.156z M349.317,224.626H225.884l43.386-172.06l122.188-11.116L349.317,224.626z"/></g></svg>`,
            css: 'style_visual_cliente'
        },
        logica: {
            motor_alergias: { nombre: "Alergias" , content: Catalogo.get_alergenos(), css:'', },
            motor_mensajes: { nombre: "Mensajes" , content: 'single', css: 'estyle_msg_cliente',  }
        }
    },
    // taburete: {
    //     slug: 'taburete',
    //     grupo: 'player',
    //     rol: 'cliente',   // Ejemplo de subgrupo que reune elementos (sillas, taburetes, etc)
    //     fisica: { ancho: 1, alto: 1, colision: true },
    //     visual: {
    //         nombre: 'Titulo del Taburete',
    //         content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50"><g fill="currentColor"><rect x="12" y="25" width="4" height="20" rx="1" /><rect x="34" y="25" width="4" height="20" rx="1" /><rect x="18" y="20" width="4" height="15" rx="1" opacity="0.8" /><rect x="28" y="20" width="4" height="15" rx="1" opacity="0.8" /><ellipse cx="25" cy="20" rx="18" ry="12" /><path d="M7,20 Q7,30 25,30 Q43,30 43,20 L43,22 Q43,32 25,32 Q7,32 7,22 Z" /></g></svg>',
    //         css: 'style_visual_cliente'
    //     },
    //     logica: {
    //         motor_alergias: { nombre: "Alergias" , content: Catalogo.get_alergenos(), css:'',},
    //         motor_mensajes: { nombre: "Mensajes" , content: 'single', css: 'estyle_msg_cliente', }
    //     }
    // },
    planta: {
        slug: 'planta',
        grupo: 'player',
        rol: 'planta',   
        fisica: { ancho: 1, alto: 1, colision: true },
        visual: { nombre: 'Titulo del Planta', 
                  content: '<svg xmlns="http://www.w3.org/2000/svg" width="947" height="1107" viewBox="0 0 947 1107"><g><path d="M 665.00 479.95 C664.91,479.99 664.81,480.03 664.72,480.06 C646.08,487.45 633.45,496.27 615.50,514.41 C590.32,539.88 563.70,579.27 539.87,626.34 C535.46,635.05 531.71,642.03 531.53,641.84 C531.36,641.65 532.49,634.97 534.06,627.00 C537.46,609.59 540.58,585.76 542.04,566.00 C544.73,529.38 544.27,439.37 541.00,365.00 C540.48,353.17 539.80,337.20 539.48,329.50 C539.42,328.05 539.33,326.14 539.22,323.87 C539.41,327.33 539.83,330.00 540.22,330.00 C540.65,330.00 541.00,329.55 541.00,329.01 C541.00,327.14 557.81,293.50 565.00,281.00 C580.88,253.36 595.70,233.36 614.94,213.65 C658.98,168.49 712.51,132.29 766.00,111.49 C790.66,101.90 809.49,97.02 835.34,93.51 L 840.18 92.85 L 828.99 105.18 C808.38,127.89 787.60,154.97 775.43,175.00 C764.71,192.64 758.50,207.05 748.94,236.47 C709.07,359.19 692.18,405.47 666.25,463.00 C662.16,472.08 658.59,480.24 658.32,481.15 C657.94,482.40 659.24,482.20 665.00,479.95 ZM 180.59 436.50 L 180.93 437.59 L 189.54 438.83 C208.38,441.56 227.00,449.82 242.50,462.34 C252.27,470.23 265.38,485.12 271.09,494.82 L 274.68 500.91 L 275.33 524.21 C276.61,569.72 280.75,602.30 289.09,632.50 C298.98,668.32 313.90,707.31 329.25,737.43 L 335.50 749.69 L 309.50 750.34 C306.78,750.41 303.87,750.48 300.89,750.54 L 292.19 741.75 C281.46,730.90 276.34,724.49 266.45,709.50 C252.57,688.45 239.82,663.99 225.57,631.09 C206.35,586.71 190.83,565.83 169.69,555.94 C155.57,549.33 143.17,549.61 128.52,556.88 C117.77,562.21 109.72,569.75 100.92,582.74 C76.89,618.22 51.91,645.20 28.45,661.03 C20.01,666.73 8.22,672.63 3.35,673.59 L 0.20 674.21 L 7.00 658.35 C21.38,624.80 34.91,585.88 40.48,562.00 C49.65,522.74 64.46,495.82 90.39,471.28 C113.01,449.86 137.25,439.39 166.80,438.27 C178.07,437.84 180.62,437.56 180.59,436.50 ZM 528.55 14.29 C525.39,18.31 522.79,22.07 522.43,23.57 C522.04,25.18 519.35,32.35 516.44,39.50 C505.07,67.48 496.18,97.19 485.63,142.52 C464.27,234.27 455.37,295.59 454.30,358.50 C453.67,395.36 454.59,416.79 459.55,480.00 C465.55,556.63 466.13,567.35 466.71,612.67 C467.41,668.13 466.16,693.92 460.82,733.75 L 458.64 750.00 L 429.50 750.00 L 429.42 713.75 C429.32,667.45 426.59,627.99 418.43,555.00 C412.40,501.05 402.82,433.66 396.30,399.13 C396.42,399.59 396.51,399.82 396.55,399.78 C396.71,399.62 398.47,389.88 400.45,378.13 C425.45,230.11 461.77,115.75 506.26,45.00 C511.72,36.32 520.99,23.73 528.55,14.29 ZM 171.82 408.51 C173.12,412.86 174.50,417.33 176.00,422.04 L 180.33 435.70 C178.16,429.94 175.08,420.00 171.82,408.51 ZM 393.72 385.79 C390.29,368.27 387.44,354.32 384.96,343.00 C388.04,356.59 391.15,371.73 393.72,385.79 ZM 704.63 467.79 C692.09,470.52 678.92,474.50 665.88,479.61 C666.02,479.55 666.15,479.50 666.30,479.44 C678.85,474.46 691.98,470.51 704.63,467.79 ZM 540.64 1.31 C539.51,1.64 535.79,5.54 532.00,10.04 C536.66,4.43 540.11,0.78 540.63,1.30 C540.64,1.30 540.64,1.31 540.64,1.31 ZM 539.20 323.32 C538.75,314.19 537.95,299.68 537.15,286.29 C538.15,303.02 539.04,319.01 539.17,322.75 C539.18,322.94 539.19,323.13 539.20,323.32 ZM 157.78 352.80 C158.32,355.10 158.87,357.50 159.42,360.00 C159.97,362.48 160.51,364.88 161.04,367.22 C160.11,363.28 159.25,359.50 158.49,356.00 C158.26,354.92 158.02,353.85 157.78,352.80 ZM 247.16 752.62 C244.17,753.83 242.74,755.92 241.00,759.50 C242.75,755.89 243.92,753.81 247.16,752.62 ZM 534.62 123.16 C535.64,93.20 537.16,61.12 539.05,31.07 C537.15,61.38 535.64,93.38 534.62,123.16 ZM 140.04 301.50 C142.87,307.26 145.30,312.72 147.49,318.35 C145.29,312.72 142.84,307.19 140.04,301.50 Z" fill="rgba(68,78,54,1)"/><path d="M 279.79 750.89 C289.11,750.78 300.33,750.57 309.50,750.34 L 335.50 749.69 L 329.25 737.43 C313.90,707.31 298.98,668.32 289.09,632.50 C280.75,602.30 276.61,569.72 275.33,524.21 L 274.68 500.91 L 271.09 494.82 C265.38,485.12 252.27,470.23 242.50,462.34 C227.00,449.82 208.38,441.56 189.54,438.83 L 180.93 437.59 L 176.00 422.04 C169.08,400.26 164.67,383.75 159.42,360.00 C153.73,334.22 148.77,319.27 140.04,301.50 C129.00,279.01 114.82,258.23 96.54,237.69 C89.19,229.44 88.25,228.00 90.20,228.00 C94.45,228.00 107.57,233.01 122.61,240.37 C160.21,258.79 191.68,281.61 224.08,313.95 C243.27,333.12 257.04,349.47 270.01,368.50 L 277.50 379.50 L 278.00 355.49 C278.62,325.49 277.66,295.61 275.63,282.34 C269.59,242.76 251.76,201.80 214.97,142.96 C202.16,122.46 199.39,117.00 201.83,117.00 C202.29,117.00 207.78,119.75 214.04,123.11 C269.42,152.85 315.04,197.03 349.32,254.12 C358.95,270.16 372.23,296.67 375.47,306.31 C380.53,321.39 385.90,345.25 395.89,397.00 C402.42,430.83 412.28,499.92 418.43,555.00 C426.59,627.99 429.32,667.45 429.42,713.75 L 429.50 750.00 L 458.64 750.00 L 460.82 733.75 C466.16,693.92 467.41,668.13 466.71,612.67 C466.13,567.35 465.55,556.63 459.55,480.00 C454.59,416.79 453.67,395.36 454.30,358.50 C455.37,295.59 464.27,234.27 485.63,142.52 C496.18,97.19 505.07,67.48 516.44,39.50 C519.35,32.35 522.04,25.18 522.43,23.57 C523.40,19.50 541.02,-1.38 540.99,1.58 C540.98,2.08 540.55,8.80 540.01,16.50 C534.60,95.05 531.78,193.14 533.88,230.50 C534.49,241.50 535.88,265.12 536.95,283.00 C538.03,300.88 539.17,321.80 539.48,329.50 C539.80,337.20 540.48,353.17 541.00,365.00 C544.27,439.37 544.73,529.38 542.04,566.00 C540.58,585.76 537.46,609.59 534.06,627.00 C532.49,634.97 531.36,641.65 531.53,641.84 C531.71,642.03 535.46,635.05 539.87,626.34 C563.70,579.27 590.32,539.88 615.50,514.41 C633.45,496.27 646.08,487.45 664.72,480.06 C695.75,467.76 727.59,461.76 750.26,463.95 C779.99,466.81 799.01,477.49 824.30,505.49 C839.49,522.32 843.60,528.88 878.51,592.00 C887.18,607.67 897.85,626.25 902.21,633.28 C917.84,658.44 932.03,674.96 942.08,679.71 L 946.50 681.79 L 941.87 682.49 C939.32,682.88 933.93,682.68 929.88,682.05 C911.38,679.18 890.89,669.46 860.78,649.26 C849.92,641.98 836.21,633.24 830.31,629.84 C778.49,599.99 732.26,593.39 693.50,610.29 C689.65,611.97 686.19,613.60 685.81,613.92 C685.42,614.24 687.98,614.59 691.49,614.71 C714.09,615.43 750.73,640.75 783.84,678.51 C797.79,694.42 822.23,726.00 820.60,726.00 C820.39,726.00 815.77,723.21 810.35,719.80 C781.48,701.63 750.08,688.72 728.50,686.13 C715.88,684.62 708.08,685.91 696.64,691.42 C677.31,700.73 661.59,711.36 629.35,736.91 L 612.20 750.50 L 622.35 751.00 C627.06,751.23 630.19,751.53 632.49,752.20 C626.61,750.98 601.39,750.95 440.55,750.92 L 279.79 750.89 ZM 620.61 997.00 L 262.40 997.00 L 262.23 928.25 L 262.15 894.25 L 441.50 893.87 L 620.86 893.50 L 620.77 929.55 L 620.61 997.00 ZM 241.00 759.50 C242.71,755.96 244.13,753.88 247.04,752.67 L 246.53 752.98 C244.60,754.17 242.22,756.98 241.00,759.50 ZM 634.33 752.90 C636.04,753.73 637.24,754.95 638.50,756.77 C637.30,755.28 635.66,753.72 634.35,752.91 C634.34,752.91 634.34,752.90 634.33,752.90 ZM 621.04 817.00 L 621.00 834.39 L 621.00 817.00 L 621.04 817.00 ZM 262.00 831.15 L 261.97 817.00 L 262.00 817.00 L 262.00 831.15 ZM 640.80 761.45 C641.45,764.39 641.50,769.70 641.50,784.00 C641.50,769.91 641.43,764.46 640.80,761.45 Z" fill="rgba(116,121,77,1)"/><path d="M 306.50 1105.61 C293.60,1101.50 290.65,1097.76 275.30,1066.00 L 262.50 1039.50 L 262.18 1018.25 L 261.86 997.00 L 441.51 997.00 L 621.17 997.00 L 620.83 1019.55 L 620.50 1042.10 L 608.00 1066.80 C594.14,1094.19 589.90,1099.99 580.70,1104.15 L 575.50 1106.50 L 443.00 1106.69 C338.09,1106.84 309.67,1106.62 306.50,1105.61 ZM 262.00 855.62 L 262.00 817.00 L 256.40 817.00 C249.35,817.00 244.66,814.81 241.77,810.14 C239.63,806.71 239.48,805.30 239.18,785.21 C238.88,765.14 238.98,763.67 241.00,759.50 C242.22,756.98 244.60,754.17 246.53,752.98 L 249.92 750.89 L 440.55 750.92 C627.90,750.95 631.25,750.99 634.35,752.91 C636.08,753.98 638.40,756.36 639.50,758.18 C641.34,761.24 641.50,763.27 641.50,784.00 C641.50,805.64 641.41,806.64 639.23,810.14 C636.46,814.60 631.69,817.00 625.60,817.00 L 621.00 817.00 L 621.00 855.25 L 621.00 893.50 L 441.50 893.87 L 262.00 894.25 L 262.00 855.62 Z" fill="rgba(200,130,81,1)"/></g></svg>' ,
                  css: 'estiloPlanta' },
    },
    // esquina_muro: {
    //     slug: 'esquina_muro',
    //     grupo: 'structure',
    //     rol: 'estructura',    
    //     fisica: { ancho: 2, alto: 1, colision: true },
    //     visual: { nombre: 'Titulo del Taburete',  content: '', css: 'estiloEsquinaMuro' },
    // }
    });
    
    static get_alergenos() {
        const d_alergenos = {
            gluten:    { slug: 'gluten',    svg: '<img src="./imgs/a_gluten.svg" alt="Gluten" />' },
            lacteos:   { slug: 'lacteos',   svg: '<img src="./imgs/a_lacteos.svg" alt="Lácteos" />' },
            crustaceos:{ slug: 'crustaceos',svg: '<img src="./imgs/a_crustaceo.svg" alt="Crustáceos" />' },
            moluscos:  { slug: 'moluscos',  svg: '<img src="./imgs/a_moluscos.svg" alt="Moluscos" />' },
            pescado:   { slug: 'pescado',   svg: '<img src="./imgs/a_pescado.svg" alt="Pescado" />' },
            soja:      { slug: 'soja',      svg: '<img src="./imgs/a_soja.svg" alt="Soja" />' },
            huevos:    { slug: 'huevos',    svg: '<img src="./imgs/a_huevo.svg" alt="Huevos" />' },
            cascara:   { slug: 'cascara',   svg: '<img src="./imgs/a_cascara.svg" alt="Frutos de cáscara" />' }
        };
        return d_alergenos;
    }
    static get_btns_crud_grabar(){
        return this.#botones_crud_grabar;
    }
    
    // Diccionario para guardar las instancias de las lógicas (Motores)
    static #MOTORES = {};

    /**
     * @description Asigna una instancia de un motor a una clave de lógica.
     * @param {String} clave_logica - Ej: 'motor_mensajes', 'motor_alergias'
     * @param {Object} instancia - La instancia de la clase (ej: new Motor_Mensajes())
     */
    static set_motor(clave_logica, instancia) {
        this.#MOTORES[clave_logica] = instancia;
    }

    /**
     * @description Devuelve la instancia del motor asociado a esa lógica, si existe.
     */
    static get_motor(clave_logica) {
        return this.#MOTORES[clave_logica] || null;
    }
    
    
    /**
     * Acceso seguro a una propiedad específica.
     * Ejemplo: Catalogo.get('mesa', 'visual', 'css')
     */
    static get(...niveles) {
        if (niveles.length === 0) return this.#DATA; // Si no se especifica nada, devolvemos el catálogo completo.

        let actual = this.#DATA;

        for (const clave of niveles) {
            // ■ Testeo si clave es un id de un elemento del DOM y si existe, lo obtenemos.
            const item_catalog = Catalogo._from_id_to_catalogo(clave);
            if (item_catalog)   return item_catalog;                        

            // ■ No es un id de DOM y buscamos las claves.
            if (actual !== null && typeof actual === 'object' && clave in actual) {
                actual = actual[clave];
            } else {
                return null; // Ruta no encontrada
            }
        }
        return actual;
    }

    static _from_id_to_catalogo(id) {
        const es_dom = document.getElementById(id);
        if (!es_dom) return null;

        const id_keys = Catalogo.get_keys();
        for (const id_key of id_keys) {
            if (id.startsWith(id_key)) {
                return this.#DATA[id_key];
            }
        }
        return null;
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

    /* Sin uso de Momento */
	static _crear_botonera_crud_grabar(clase_botonera = 'motor-mensajes-botonera') {
		const $botonera = document.createElement('div');
		$botonera.className = `d-flex gap-4   ${clase_botonera}`;
		
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

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // Exportación para Node.js o Navegador moderno
    // export default Catalogo;
}


/**
 * @class Logica_Catalogo
 * @extends Catalogo
 * @description Gestiona de forma centralizada y dinámica el Offcanvas inferior del salón,
 * creando pestañas dinámicas por cada tipo de lógica detectada en el catálogo.
 */
class Logica_Catalogo  {
    $offcanvas_logica = null;
    
    constructor(instancia_salon=null) {        
        this.Salon = instancia_salon;
        this.$elemento_news_actual = null;

        // Creamos el offcanvas en el DOM inmediatamente al instanciar la clase
        this.$offcanvas_logica = this.#crear_offcanvas_logica();
        this.#add_listeners_news();
    }

    // ■■■ MÉTODOS INTERNOS Y CORE ■■■

    /**
     * @description Crea la estructura DOM del offcanvas y sus pestañas globales si no existe.
     */
    #crear_offcanvas_logica() {
        let $offcanvas_logica = document.getElementById('offcanvas_logica');
        if ($offcanvas_logica) 
            return $offcanvas_logica;
        
        // ■ Contenedor principal del offcanvas
        $offcanvas_logica = document.createElement('div');
        $offcanvas_logica.id = 'offcanvas_logica';

        // $offcanvas_logica.className = 'offcanvas offcanvas-bottom'; 
        $offcanvas_logica.className = 'offcanvas offcanvas-bottom offcanvas-logica';
        $offcanvas_logica.tabIndex = -1;
        $offcanvas_logica.dataset.logica = 'logica';    // para identificar por dataset.
    
        // ■ Header del offcanvas
        const header = document.createElement('div');
        header.className = 'offcanvas-header offcanvas-logica-header';
        
        // ■ TITULO
        const title = document.createElement('div');
        title.className = 'offcanvas-title  offcanvas-logica-title';
        title.id = 'offcanvas_logica_title';
        // ■ Bloque izquierdo del título: icono + marca opcional de central.
        const title_left = document.createElement('span');
        title_left.className = 'offcanvas-logica-title-left';
        
        // ■ ESPACIO DEL ICONO
        const title_icon = document.createElement('span');
        title_icon.id = 'offcanvas_logica_title_icon';
        title_icon.className = 'offcanvas-logica-title-icon';

        const title_role = document.createElement('span');
        title_role.id = 'offcanvas_logica_title_role';
        title_role.className = 'offcanvas-logica-title-role d-none';
        title_role.textContent = '(CENTRAL)';

        // ■ ESPACIO DEL TEXTO
        const title_text = document.createElement('span');
        title_text.id = 'offcanvas_logica_title_text';
        title_text.className = 'offcanvas-logica-title-text';
        title_text.textContent = 'THE LOGIC ZONE';
               
        // title.appendChild(title_icon);
        title_left.appendChild(title_icon);
        title_left.appendChild(title_role);
        title.appendChild(title_left);

        title.appendChild(title_text);

        // ■ BOTON CERRAR DEL TITIULO
        const $btn_close = document.createElement('button');
        $btn_close.type = 'button';
        $btn_close.className = 'btn-close text-reset';
        $btn_close.setAttribute('data-bs-dismiss', 'offcanvas');
        $btn_close.setAttribute('aria-label', 'Close');
        
        // ■ 
        header.appendChild(title);
        header.appendChild($btn_close);
        
        // ■ News verde/rojo/sin color.
        const news = document.createElement('div');
        news.className = 'offcanvas-logica-news';
        news.id = 'offcanvas_logica_news';
        news.textContent = '■ ZONA NEWS';
        news.dataset.logica = 'news';
        
        // ■ BODY DEL OFFCANVAS 
        const $body = document.createElement('div');
        $body.className = 'offcanvas-body';
        $body.id = 'offcanvas_logica_body';

        // DETECTAR TODAS LAS LÓGICAS DISTINTAS Y GENERAR WIDGET DE PESTAÑAS (BOOTSTRAP TABS)
        // Extraemos todos los objetos 'logica' del catálogo usando la clase Catalogo
        const logicas_distintas = Catalogo.get_distinto_s('logica');
        
        // Recopilamos las llaves únicas y buscamos su propiedad 'nombre'
        const claves_logica_unicas = new Map(); // Usamos Map para guardar la clave y su nombre
        logicas_distintas.forEach(item_logica => {
            if(!item_logica || typeof item_logica != 'object') 
                return;
            // if (item_logica && typeof item_logica === 'object') {
            Object.keys(item_logica).forEach(key => {
                const valorLogica = item_logica[key];
                // Si la lógica tiene un objeto con "nombre", lo guardamos.
                if (valorLogica && typeof valorLogica === 'object' && valorLogica.nombre) {
                    claves_logica_unicas.set(key, valorLogica.nombre);
                } 
            });
            // }
        });

        // ■ Contenedor de la lista de pestañas
        const tabList = document.createElement('ul');
        tabList.className = 'nav nav-tabs mb-3';
        tabList.id = 'logicaTab';
        tabList.role = 'tablist';

        // ■ Contenedor de los paneles de contenido
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = 'logicaTabContent';

        // ■ Generamos Dinámicamente cada pestaña ('Titulo Alertas', 'motor_alertas')
        claves_logica_unicas.forEach((nombre_pestana, key_motor) => {
            // --- Estructura del Botón/Pestaña ---
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';
            navItem.role = 'presentation';
            navItem.dataset.motor = key_motor; 

            const $tabButton = document.createElement('button');
            $tabButton.className = 'nav-link';
            $tabButton.id = `tab-${key_motor}`;     // tab-motor_mensajes
            $tabButton.setAttribute('data-bs-toggle', 'tab');
            $tabButton.setAttribute('data-bs-target', `#panel-${key_motor}`);
            $tabButton.type = 'button';
            $tabButton.role = 'tab';
            $tabButton.setAttribute('aria-controls', `panel-${key_motor}`);
            $tabButton.setAttribute('aria-selected', 'false');
            $tabButton.innerText = nombre_pestana; // Usamos el nombre detectado del JSON

            navItem.appendChild($tabButton);
            tabList.appendChild(navItem);

            // --- PANEL(DIV) DE CONTENIDO ---
            const $panel = document.createElement('div');
            $panel.className = 'tab-pane fade';
            $panel.id = `panel-${key_motor}`;
            $panel.role = 'tabpanel';
            $panel.setAttribute('aria-labelledby', `tab-${key_motor}`);
            
            // ■ Crear el AREA DE CONTENIDO.
            const $content_div = document.createElement('div');
            $content_div.className = 'p-3 border border-top-0    area-de-contenido';
            $content_div.textContent = `Cargando datos de ${nombre_pestana}...`; 
            
            // 3. Añadir el div interno al panel
            $panel.appendChild($content_div);
            
            tabContent.appendChild($panel);
        });
        
        $body.appendChild(news);
        $body.appendChild(tabList);
        $body.appendChild(tabContent);

        $offcanvas_logica.appendChild(header);
        $offcanvas_logica.appendChild($body);
        
        document.body.appendChild($offcanvas_logica);

        $offcanvas_logica.addEventListener('hidden.bs.offcanvas', () => {
            this.#guardar_textareas_mensajes($offcanvas_logica);
        });

        return $offcanvas_logica;
        // ■ $offcanvas_logica ahora tiene tantas pestañas como logicas distintas hay en el Catalogo.
        // ■ Cuando vaya a abrir tengo que ver que logicas tiene el elemento que quiero abrir.
    }

    /**
     * @description Guarda los mensajes escritos al cerrar el offcanvas de lógica.
     * @param {HTMLElement} $offcanvas_logica
     */
    #guardar_textareas_mensajes($offcanvas_logica) {
        const motor_mensajes = Catalogo.get_motor('motor_mensajes');
        if (!motor_mensajes?.set || !$offcanvas_logica) return;

        const textareas = $offcanvas_logica.querySelectorAll('.area-texto-mensaje');

        textareas.forEach((textarea) => {
            const id_elemento = textarea.dataset.idElemento;
            if (!id_elemento) return;

            motor_mensajes.set(id_elemento, textarea.value);
        });
    }

    /**
     * @description Abre el offcanvas inferior visualizando únicamente 
     * las lógicas válidas que posea el elemento cliqueado.
     * @param {HTMLElement} elemento_dom - Elemento del salón sobre el que se hace clic.
     */
    abrir_ventana_logica(elemento_dom, posicion_offcanvas_logica='down') {
        if(!['up','down'].includes(posicion_offcanvas_logica)) return;
        const $el_dom = e_Salon._to_element(elemento_dom);
        if(!$el_dom) return;
        
        const id_key = $el_dom.dataset.id_key;
        if(!id_key) return null;

        const ctlg_el = Catalogo.get(id_key);
        if (!ctlg_el || !ctlg_el.logica) return null;
        
        // ⚠️⚠️ ALERTA .... Elegir una 
        const $offcanvas_dom = document.getElementById('offcanvas_logica');     // x id 
        const $offcanvas_dom_ = document.querySelector('.offcanvas-logica');    // x className
        const $offcanvas_dom__ = e_Salon._to_element('.offcanvas-logica');      // x className custom
        const $offcanvas_dom___ = e_Salon._to_element('[data-logica = logica]');  // x dataset custom
        if (!$offcanvas_dom) return null;
        
        // ⚠️⚠️ ALERTA 
        const offc = this.$offcanvas_logica;
        
        // ■ Posición offcanvas-logica (arriba / abajo)
        this.#posicionar_offcanvas_logica($offcanvas_dom, posicion_offcanvas_logica);
        
        // ■ Obtenemos el icono del elemento.
        const svg_icon = this.#get_icono(id_key);
        
        // ■ ■ Establecemos el titulo (icono + marca de rol + id)
        this.set_title($el_dom.id, svg_icon, $el_dom.dataset.rol);

        this.$elemento_news_actual = $el_dom;
        this.#actualizar_news($el_dom);

        // ■ Cacho la logica del elemento en Catalogo.
        const logica_el = ctlg_el.logica;
        
        // ■ Cacho del contenedor de Pestañas(logicaTab), los Paneles de cada elemento(li).
        const navItems = $offcanvas_dom.querySelectorAll('#logicaTab .nav-item');
        const tab_motores = $offcanvas_dom.querySelectorAll('[data-motor]');    // prefiero x dataset
        
        let primerTabVisible = null;
        // ■ Recorro cada pestaña.
        navItems.forEach(item => {
            const motor = item.dataset.motor;          // dataset establecido al crear offcanvas-logica.
            const data_logica = logica_el[motor];      // Datos del catalogo del elemento.
            
            const $pestana = item.querySelector('.nav-link');           // clase del boton.
            const id_panel = $pestana.getAttribute('data-bs-target');    // de cada pestaña saco su "#panel-motor_mensajes"
            const $panel_dom = $offcanvas_dom.querySelector(id_panel);
            
            // ■ Resetea el boton y el panel.
            $pestana.classList.remove('active');
            $pestana.setAttribute('aria-selected', 'false');
            if ($panel_dom) $panel_dom.classList.remove('show', 'active');

            // ■ Evalua Motores(Logicas)
            if (!data_logica){
                item.classList.add('d-none');
            }else{
                item.classList.remove('d-none'); 
                
                if (!primerTabVisible) {
                    primerTabVisible = { boton: $pestana, panel: $panel_dom };
                }
    
                // ■ ■ Inyección de contenido 
                const $area_de_contenido = $panel_dom.querySelector('.area-de-contenido');   
                             
                this.#inyectar_render_motor($el_dom , motor, data_logica, $area_de_contenido );

            }

            // if (data_logica !== undefined && data_logica !== false && data_logica !== null) {

            // } else {
            //     item.classList.add('d-none');
            // }
        });

        if (primerTabVisible) {
            primerTabVisible.boton.classList.add('active');
            primerTabVisible.boton.setAttribute('aria-selected', 'true');
            if (primerTabVisible.panel) {
                primerTabVisible.panel.classList.add('show', 'active');
            }
        }

        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance($offcanvas_dom);
        bsOffcanvas.show();
        return $offcanvas_dom;
    }

    /**
     * @description Sitúa el offcanvas de lógica arriba o abajo antes de abrirlo.
     * @param {HTMLElement} $offcanvas_dom
     * @param {'up'|'down'} posicion_offcanvas_logica
     */
    #posicionar_offcanvas_logica($offcanvas_dom, posicion_offcanvas_logica='down') {
        const posicion = posicion_offcanvas_logica === 'up' ? 'up' : 'down';

        // ❓❓ quiero otra forma de conseguir la clase. Teniendo offcanvas_dom lo consigo.
        const clase_actual = posicion === 'up' ? 'offcanvas-top' : 'offcanvas-bottom';
        const clase_anterior = posicion === 'up' ? 'offcanvas-bottom' : 'offcanvas-top';

        bootstrap.Offcanvas.getInstance($offcanvas_dom)?.dispose();

        // $offcanvas_dom.classList.remove(clase_anterior);
        $offcanvas_dom.classList.remove('offcanvas-top');
        $offcanvas_dom.classList.remove('offcanvas-bottom');

        $offcanvas_dom.classList.add(clase_actual);
        // $offcanvas_dom.style.height = 'auto';
        // $offcanvas_dom.style.minHeight = '20vh';
        // $offcanvas_dom.style.maxHeight = 'auto';
        $offcanvas_dom.dataset.posicionLogica = posicion;
    }

    /**
     * @description Establece el CONTENIDO DEL título y el icono en el offcanvas.
     * @param {String} texto - El identificador o texto a mostrar.
     * @param {String} icono_html - (Opcional) El string SVG que se inyectará.
     */
    // set_title(texto, icono_html = '') {
    set_title(texto, icono_html = '', rol = '') {
        const $icon_dom = document.getElementById('offcanvas_logica_title_icon');
        const $role_dom = document.getElementById('offcanvas_logica_title_role');
        const $text_dom = document.getElementById('offcanvas_logica_title_text');
        const es_central = rol === 'central';

        if ($icon_dom) $icon_dom.innerHTML = icono_html;
        if ($role_dom) $role_dom.classList.toggle('d-none', !es_central);
        if ($text_dom) $text_dom.textContent = texto;
    }
    
    /**
     * @description Reemplaza TODO el contenido del cuerpo del offcanvas.
     * ADVERTENCIA: Si usas este método, sobrescribirás el widget de pestañas (Tabs). 
     * Si solo quieres modificar el interior de una pestaña, deberías seleccionar su panel específico.
     */
    set_body(html_content) {
        const $body_dom = document.getElementById('offcanvas_logica_body');
        if ($body_dom) {
            $body_dom.innerHTML = html_content;
        }
    }

    /**
     * @description Obtiene el icono (SVG/HTML) asociado al elemento desde el catálogo.
     * @param {String} id_key - ID o clave del elemento en el catálogo.
     * @returns {String} - String con el contenido visual (SVG/HTML) o cadena vacía.
     */
    #get_icono(id_key) {
        if (!id_key) return '';
        const ctlg_el = Catalogo.get(id_key);
        return ctlg_el?.visual?.content || '';
    }

    /**
     * ### Ejecuta el método render del motor pasado e inyecta el resultado.
     * @param {String} motor_busca - La clave del motor (ej. 'motor_mensajes', 'motor_alergias')
     * @param {Object} data_logica - Los datos de configuración de esa lógica para el elemento (ej. el objeto con 'nombre', 'content', etc.)
     * @param {HTMLElement} $area_de_contenido - El contenedor DOM donde se inyectará el resultado
     */
    #inyectar_render_motor(elemento_dom , motor_busca, data_logica, $area_de_contenido) {
        // 1. Obtenemos la instancia del motor desde el Catálogo
        const instancia_motor = Catalogo.get_motor(motor_busca);
        if(!instancia_motor || !instancia_motor.render) {
            // Fallback por si el motor no ha sido instanciado con Catalogo.set_motor() previamente
            $area_de_contenido.innerHTML = `<span class="text-danger">Motor <strong>${motor_busca}</strong> no instanciado o sin método render().</span>`;
            return false;
        }
            
        // Limpiamos el área antes de inyectar lo nuevo
        $area_de_contenido.innerHTML = '';         
        const $renderizado_html = instancia_motor.render(data_logica, elemento_dom);

        // 3. Evaluamos qué tipo de dato ha devuelto el motor para insertarlo correctamente
        if (typeof $renderizado_html === 'string') {
            $area_de_contenido.innerHTML = $renderizado_html;
            return true;
        } else if ($renderizado_html instanceof Node) {
            $area_de_contenido.appendChild($renderizado_html);
            return true;
        } else {
            console.warn(`El motor ${motor_busca} no ha devuelto ni un String ni un Nodo del DOM.`);
            return false;
        }
    }

    /**
     * ### crea un evento personalizado y lo pone a la escucha. un evento personalizado se lanza con dispatchEvent
     */
    #add_listeners_news() {
        const $news = this.$offcanvas_logica?.querySelector('[data-logica="news"]');
        if (!$news) return;

        $news.addEventListener('click', (event) => this.#on_click_news(event));

        document.addEventListener('motor_alergias:change', () => {
            if (this.$elemento_news_actual) {
                this.#actualizar_news(this.$elemento_news_actual);
            }
        });
    }

    // ■ Cuando se cierra uno de los lbl's , se lanza desde aquí y aquí se propaga. 
    // 
    #on_click_news(event) {
        const $btn_cerrar = event.target.closest('[data-action="eliminar-alergia-news"]');
        if (!$btn_cerrar || !this.$elemento_news_actual) return;

        const $el_dom = this.$elemento_news_actual;
        if ($el_dom.dataset.rol !== 'cliente') return;

        const alergia = $btn_cerrar.dataset.alergia;
        if (!alergia) return;

        const MA = Catalogo.get_motor('motor_alergias');
        if (!MA) return;

        const alergias = Array.isArray(MA.get($el_dom.id)) ? MA.get($el_dom.id) : [];
        const nuevas_alergias = alergias.filter((item) => item !== alergia);
        MA.set($el_dom.id, nuevas_alergias);
        this.#actualizar_news($el_dom);
    }
    /** 
     * ### Actualiza el contenido de la zona 'News' creada en offcanvas-logica.
     * @param {string|Html} elemento_dom, id o elemento html sobre el que actualizar News.
     */
    #actualizar_news(elemento_dom) {
		const $news = this.$offcanvas_logica?.querySelector('[data-logica="news"]');
		const $el_dom = e_Salon._to_element(elemento_dom);
		if (!$news || !$el_dom) return;

		const MA = Catalogo.get_motor('motor_alergias');
		if (!MA) {
			this.#pintar_news_vacia($news, 'Sin motor de alergias.');
			return;
		}

		const rol = $el_dom.dataset.rol;
		if (rol === 'cliente') {
			const alergias = Array.isArray(MA.get($el_dom.id)) ? MA.get($el_dom.id) : [];
			this.#pintar_news_alergias($news, alergias, { editable: true });
			return;
		}

		if (rol === 'central') {
			const alergias_reserva = this.#get_alergias_reserva($el_dom.id);
			this.#pintar_news_alergias($news, alergias_reserva, { editable: false });
			return;
		}

		this.#pintar_news_vacia($news, `Rol no registrado: ${rol || 'sin rol'}`);
	}

    /** 
     * ### Actualiza el contenido de la zona 'News' creada en offcanvas-logica.
     * @param {string|Html} id_elemento, id sobre el que actualizar News.
     * @param {Motor_Alergias} motor_alergias, instancia del motor_alergias a usar.
     */
    #get_alergias_reserva(id_elemento = '') {
		const MA = Catalogo.get_motor('motor_alergias');
		if (!this.Salon || !MA || !id_elemento) return [];

		const index_reserva = this.Salon._get_indice_en_reserva_s(id_elemento);
		const reserva = this.Salon.reservas?.[index_reserva];
		if (!reserva) return [];

		const ids_reserva = [
			...(Array.isArray(reserva.reservadores) ? reserva.reservadores : []),
			...(Array.isArray(reserva.clientes) ? reserva.clientes : [])
		];

		const alergias = new Set();
		ids_reserva.forEach((id) => {
			const alergias_elemento = Array.isArray(MA.get(id)) ? MA.get(id) : [];
			alergias_elemento.forEach((alergia) => alergias.add(alergia));
		});

		return Array.from(alergias);
	}
    /** 
     * ### Pinta en la Zona News las alergias pasadas en formato lbl's
     * @param {Html} $news, objeto html que es el receptor/contenedor de las alergias a pintar.
     * @param {Array} alergias, array de alergias a pintar.
     * @param {Dict} opciones, diccionario de opciones a tener en cuenta.
     */
    #pintar_news_alergias($news, alergias = [], opciones = {}) {
		$news.innerHTML = '';
		// $news.style.color = 'white';
        $news.classList.remove('is-ok');
        // $news.style.background = 'red';
        $news.classList.add('is-alert');

		if (!Array.isArray(alergias) || alergias.length === 0) {
			this.#pintar_news_vacia($news, '✔️ Free');
			return;
		}


		alergias.forEach((alergia) => {
			const $label = document.createElement('span');
			$label.className = 'alergia-tag-pop';
			$label.textContent = alergia;

			if (opciones.editable) {
				const $cerrar = document.createElement('button');
				$cerrar.type = 'button';
				$cerrar.className = 'alergia-tag-close';
				$cerrar.dataset.action = 'eliminar-alergia-news';
				$cerrar.dataset.alergia = alergia;
				$cerrar.setAttribute('aria-label', `Eliminar alergia ${alergia}`);
				$cerrar.textContent = '×';
				$label.appendChild($cerrar);
			}

			$news.appendChild($label);
		});
	}
    /** 
     * ### Lo que pintamos cuando no hay alergias.
     * @param {Html} $news, 
     * @param {string} texto, 
     */
    #pintar_news_vacia($news, texto = '') {
            $news.innerHTML = '';
            $news.textContent = texto;
            // $news.style.background = 'green';
            // $news.style.color = 'white';
            $news.classList.remove('is-alert');
            $news.classList.add('is-ok');
    }
}


/**
 * @class Botonera_Crud_Grabar
 * @description Crea y gestiona la botonera CRUD de grabación definida en Catalogo.
 *
 * Mantiene un contenedor con los botones configurados, sus estados y escuchadores.
 * Los callbacks se pasan en un diccionario donde la clave es el className de Catalogo.
 */
class Botonera_Crud_Grabar {
    static ESTADO_INICIAL = Object.freeze({
        'btn-grabar': false,
        'btn-guardar': false,
        'btn-reset': false,
        'btn-delete': false
    });

    static ESTADO_GRABANDO = Object.freeze({
        'btn-grabar': true,
        'btn-guardar': false,
        'btn-reset': true,
        'btn-delete': false
    });

    constructor(callbacks_por_clase = {}, clase_botonera = 'motor-mensajes-botonera') {
        this.callbacks_por_clase = callbacks_por_clase || {};
        this.clase_botonera = clase_botonera;
        this.botones_catalogo = Catalogo.get_btns_crud_grabar();
        this.botones_por_clase = {};
        this.$contenedor = this.#crear_contenedor();

        this.#crear_botones();
        this.#add_listener();
        this.#aplicar_estado(Botonera_Crud_Grabar.ESTADO_INICIAL);
    }

    get contenedor() {
        return this.$contenedor;
    }

    #crear_contenedor() {
        const $botonera = document.createElement('div');
        $botonera.className = `d-flex gap-4   ${this.clase_botonera}`;
        return $botonera;
    }

    #crear_botones() {
        this.botones_catalogo.forEach((boton) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `btn btn-sm   ${boton.className}`;
            button.dataset.action = boton.action;
            button.dataset.className = boton.className;
            button.title = boton.title;
            button.textContent = boton.texto;

            this.botones_por_clase[boton.className] = button;
            this.$contenedor.appendChild(button);
        });
    }

    #add_listener() {
        this.$contenedor.addEventListener('click', async (ev) => {
            const button = ev.target.closest('[data-action]');
            if (!button || button.disabled) return;

            const action = button.dataset.action;
            const className = button.dataset.className;
            const callback = this.callbacks_por_clase[className];

            if (action === 'grabar') {
                this.#aplicar_estado(Botonera_Crud_Grabar.ESTADO_GRABANDO);
                // await this.#ejecutar_callback(callback, button);
                await this.#ejecutar_accion_temporal(callback, button);
                return;
            }

            if (action === 'guardar' || action === 'reset') {
                await this.#ejecutar_callback(callback, button);
                return;
            }

            if (action === 'eliminar') {
                await this.#ejecutar_callback(callback, button);
                this.#aplicar_estado(Botonera_Crud_Grabar.ESTADO_INICIAL);
            }
        });
    }

    async #ejecutar_callback(callback, button) {
        if (typeof callback !== 'function') return;
        await callback(button, this);
    }

    async #ejecutar_accion_temporal(callback, button) {
        try {
            await this.#ejecutar_callback(callback, button);
        } finally {
            this.#aplicar_estado(Botonera_Crud_Grabar.ESTADO_INICIAL);
        }
    }

    #aplicar_estado(estado = {}) {
        Object.entries(this.botones_por_clase).forEach(([className, button]) => {
            
            const disabled = estado[className] === true;
            button.disabled = disabled;
            button.classList.toggle('is-disabled', disabled);
            button.setAttribute('aria-disabled', String(disabled));


        });
    }
}


