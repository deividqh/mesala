// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * C L A S E  "MyDiv"  				Clase PARA DEFINIR UNA ESTRUCTURA DE DATOS que se usa en la clase Matriz_to_MyDiv
//											ES UNA BALDOSA DEL LA LISTA/MATRIZ DEL e_Salon 
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
class MyDiv {
	elemento_div;				// ► el objeto div.

	HOW = {
		Tag: '',			// ► reserva. 			
		Flag: 0         	// bandera reservada
	};
	scan = {
		n: 	false ,		//  Mesa_0 	► es el id
		s: 	false ,     //  Sila_1  ► es el id del div que está al Sur
		e: 	false ,     //  Mesa_1
		w: 	false ,     //  null	 	► Significa que hay baldosa y está free.
		ne: false ,     //  false    	► Significaa que no hay 'ne'. es una esquina(3) o un borde(5). NO HAY BALDOSA.
		nw: false ,     //  Silla_0	► es el id 
		se: false ,     //  Silla_2	► es el id 
		sw: false       //  Silla_3	► es el id 
	}

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ VARIABLE DE SCANNER.
		// a) Hay que tener en cuenta que no todos los divs de la matriz tienen todas las coordenadas.
		// 		• el div con menos coordendas es una esquina, que tiene 3 coordenadas.
		// 		• un borde tiene 5 coordenadas.
		// 		• un div-central tiene 6 coordenadas.
		// b) Solamente se hace scanner de las mesas del salon.
		// c) Los valores Posibles son: 
		// 		• false ► significa que no hay coordenada.
		// 		• null ► significa que no hay elemento en esa coordenada.
		// 		• id ► del elemento que está en esa coordenada.
	
	constructor(elemento_div = null,  Status = 0, Tag = 0, Flag = 0) {
		this.elemento_div = elemento_div;

		this.HOW.Tag = Tag;			    //estado inicial del Tag (String)
		this.HOW.Flag = Flag;			//estado inicial del Flag (int)
		
		this.scan.n = false;		// false significa que no tiene celdas alrededor.
		this.scan.s = false;		// false significa que no tiene celdas alrededor.
		this.scan.e = false;		// false significa que no tiene celdas alrededor.
		this.scan.w = false;		// false significa que no tiene celdas alrededor.
		this.scan.ne = false;		// false significa que no tiene celdas alrededor.	
		this.scan.nw = false;		// false significa que no tiene celdas alrededor.
		this.scan.se = false;		// false significa que no tiene celdas alrededor.
		this.scan.sw = false;		// false significa que no tiene celdas alrededor.
		
	};
} // ■■■■■■■■■■ FIN CLASE MYDIV



// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// 1. Listas * (Requieren espacio extra)
	/**
	 * @description 
	 * ### Titulo gran | ### Titulo med | ### Titulo peq ([#, ##, ###] + espacio) Pone tipo titulo.
	 * * Elemento 1 (asterisco + espacio para generar una list de elementos.)
	 * * Elemento 2 (espacio antes y después del asterisco)
	 * 
	 * ```javascript
	 * console.log('ejemplo de codigo en comentarios: triple comilla invertida + lenguaje + \n + codigo')
	 * ```
	 * ⚠️ **IMPORTANTE:** para advertencias.
	 * 💡 **TIP:** para consejos.
	 * 🚫 **DEPRECATED:** para código antiguo.
	 * 
	 *  **Negrita** (Dos espacios aseguran la interpretación)
	 *  
	 *  {@link Nombre_de_una_funcion}
	 */

// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████


const CSS_HREF_LINK  = './css/div_x_div.css';	//Path al archivo .css que gestiona los estilos de Matriz. !!IMPORTANTE

// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

class Work_ClassName {
	// STATIC PARAM 🧍‍♂️
	static CLASSNAME_DIV_BYDEF = 'claseDivXdefecto';					//estilo por defecto para div en div_x_div.css

	/**
	 * ### 
	 * @param {*} path_css
	 * @returns null si no se encuentra el archivo.
	 */
	// constructor(path_css = Work__ClassName.LINK_FILEPATH_XDEF) {
	constructor(path_css = CSS_HREF_LINK) {
		
		// super();															// ■ Llamada a Head_Drive (padre)
		
		if (typeof (path_css) != 'string')  path_css = CSS_HREF_LINK; 
		if (path_css.trim() == '')  		path_css = CSS_HREF_LINK;
		if (path_css == null ) 				path_css = CSS_HREF_LINK;		// Asigna el path por defecto si el usuario no mete path 
	}		
		
	/**
	 * ## 🚫 Solo usado para Logs. 
	 * ### Obtiene el className de un elemento dom 
	 * @param {*} elemento_dom , puede ser un id (string) o un objeto(div) 
	 * @returns {string|boolean} * la cadena className del objeto(string).
	 * 			* false(boolean), si el argumento pasado no se corresponde con un div(ni por id ni por objeto)
	 */
	get_className(elemento_dom = null) {
		if (typeof (elemento_dom) == 'string') {
			if (!document.getElementById(elemento_dom)) {
				return false;
			}
			return document.getElementById(elemento_dom).className;
		} else if (typeof (elemento_dom) == 'object') {
			return elemento_dom.className;
		} else {
			return false;
		}

	}
	
	/**
	 * ### Busca una clase en el className y retorna un booleano SI LA ENCUENTRA.
	 * @param {*} elemento_dom Objeto sobre el que se busca la clase.
	 * @param {*} classNameSearch clase a buscar.
	 * @returns {boolean} 
	 * 		* true, encuentra la clase  
	 * 		* false, no encuentra la clase.
	 */
	is_classname_on(elemento_dom = null, classNameSearch = '') {
		if (typeof (classNameSearch) != 'string') return false;		//classNameSearch debe ser un string
		if (typeof (elemento_dom) != 'object') return false;	//elemento_dom debe ser un objeto
		if (elemento_dom == null) return false;	//elemento_dom no puede ser nulo
		if (classNameSearch.length <= 2) return false;	//mínimo 2 letras.
		// Working Procedure:........................>
		if (elemento_dom.className.indexOf(classNameSearch) < 0) return false;	
		return true;
	}
	
	/**
	 * ### Establece una clase única, sustituyendo todo lo que hubiera antes ....de Un sólo Objeto 
	 * @param {object} elemento_dom elemento del dom. No su id.
	 * @param {string} classname_to_set nombre de la clase que se quiere poner.
	 * @returns {boolean} true/false ( correcto / error )
	 */
	_set_className_unique(elemento_dom, classname_to_set = Work_ClassName.CLASSNAME_DIV_BYDEF) {
		if (typeof (elemento_dom) != 'object') return false;			//elemento_dom debe ser un objeto
		if (elemento_dom == null) return false;						//elemento_dom no puede ser nulo
		if (typeof (classname_to_set) != 'string') return false;	//classname_to_set debe ser un string

		elemento_dom.className = classname_to_set;
		return true;
	}

	/**
	 * ## Añade una o mas clases a las clases a un elemento del Dom
	 * @param {object} elemento_dom elemento del Dom.
	 * @param {string} className_to_add nombre de la clase a añadir.
	 */
	add_className(elemento_dom = null, className_to_add = '') {
		if (typeof (className_to_add) != 'string') return false;
		if (typeof (elemento_dom) != 'object') return false;

		elemento_dom.className += ' ' + className_to_add;
	}

	/** 🚫
	 * ### Alternar entre dos nombres clase ....de Un sólo Objeto 
	 * @param {*} elemento_dom 
	 * @param {*} oldClassName 
	 * @param {*} newClassName 
	 * @returns 
	 */
	switch_className(elemento_dom = null, oldClassName = '', newClassName = '') {
		if (typeof (elemento_dom) != 'object') return false;
		if (typeof (oldClassName) != 'string') return false;
		if (typeof (newClassName) != 'string') return false;
		//______________________
		//Proceso:
		//console.log('Switch Antes)\nclassName de ' + elemento_dom.id + '->' + elemento_dom.className); //borrar
		if (this.is_classname_on(elemento_dom, oldClassName) == true) {
			let classAux = elemento_dom.className;
			let aux = classAux.replace(oldClassName, newClassName);
			elemento_dom.className = aux;
		}
		//console.log('Switch Despues\nclassName de ' + elemento_dom.id + '->' + elemento_dom.className)	//borrar
	}

	/**
	 * ### Elimina una clase ...de Un sólo Objeto:
	 * @param {*} elemento_dom 	objeto del Dom.
	 * @param {*} classname_to_delete nombre de la clase a eliminar.
	 * @returns {boolean} true/false ► correcto/error en el metodo.
	 */
	elimina_one_className(elemento_dom = null, classname_to_delete = '') {
		try {
			if (this.is_classname_on(elemento_dom, classname_to_delete) == true) {
				let a = elemento_dom.className;		// Obtiene el className del elemento
				if (a == '') return false;			// Si no tiene className, no hace nada.
				a = a.replace(classname_to_delete, '');	// Elimina la clase pasada como argumento
				elemento_dom.className = a;			// Asigna el nuevo className al elemento
			}
			return true;
		} catch (error) {
			console.log('Work__ClassName:elimina_one_className: Error--> ' + error.message);
			return false;
		}
	}
	
	/**
	 * ### Elimina el className de un elemento del Dom
	 * @param {object} elemento_dom 
	 */
	className_reset(elemento_dom = null) {
		if (typeof (elemento_dom) != 'object') return false;
		if (elemento_dom == null) return false;

		elemento_dom.className = '';
	}
	
	/** 🚫
	 * ### Asigna el className de un objeto Div a Otro.
	 * @param {*} elemento_dom_origen 
	 * @param {*} elemento_dom_destino 
	 */
	copy_paste_className(elemento_dom_origen, elemento_dom_destino) {
		this.className_reset(elemento_dom_destino);
		let strClassNameModelo = elemento_dom_origen.claseName
		elemento_dom_destino.claseName = strClassNameModelo + '';
	}

} // ■■■■■■■ FIN CLASE Work__ClassName 


// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
//  									M A T R I C E S
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/**
 * ## Matriz_Plana define una clase que gestiona un array lineal como una matriz virtual. 
 * 	  Se basa en conocer el número total de items y el número de columnas que queremos para formar una matriz lógica donde pueda obtener fila , columna por número de item ... y viceversa.
 * @param {*}   columnas  El Numero de Columnas que queremos que tenga la matriz. (Oblig)
 * @param {*}   lista_elemento_dom  Si tenemos una lista de elementos Dom ya preparada. (Opc)
 */
class Matriz_Plana extends Work_ClassName {
	//
	matriz_plana = null;              // es una lista que representa al array por sus elementos introducidos.
	columnas = 0;        //numero total de columnas de la matriz(se establece).
	filas = 0;           //numero total de filas actuales(va creciendo segun se introducen divs en la matriz).
	
	/**
	 * @param {*} columnas Numero de columnas que va a tener la matriz... •12 (Oblig)
	 * @param {*} lista_elemento_dom Numero de elementos(items) que va a tener la matriz:
	 * ```javascript
	 * [obj_div_0 , obj_div_1 , obj_div_2 ,....]
	 * [id_div_0  , id_div_1  , id_div_2  ,....]
	 * ```
	 */
	constructor( columnas , lista_elemento_dom = null) {
		try {
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			super(); // Llamada al constructor de Work__ClassName
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			// ■ matriz_plana
			this.matriz_plana = [];
			if (!this._is_lista_OK(lista_elemento_dom)) lista_elemento_dom=[];
			this.matriz_plana = lista_elemento_dom;				// • Si se tiene una lista de elementos. si no se tiene(null): this.matriz_plana = []	
			// ■ Columnas
			if (!Number.isSafeInteger(columnas) || columnas < 0 ) return false;
			this.columnas = columnas;			
			// ■ Hay que calcular las filas siempre que cambien ó cambie el •numero_columnas ó •numero_items.
			const total_filas = this.total_filas();      	
			if (total_filas === false) {
				this.filas = 0;
			}else{
				this.filas = total_filas;}
			
			this.WC = new Working_Celdas(this);
		} catch (e) {
			console.log('❌ ERROR ► contructor Matriz_Plana: \n' + e.message);
			return false;
		}
	}

	// ■■■■■■■■■■■■■■■■■ VALIDADORES
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ### Valida que un indice es Correcto(Entero positivo, en el rango de la matriz.)
	 * @param {number} indice de la matriz a evaluar.
	*/
	is_indice_OK(indice){
		// ■ Validación que exista la matriz
		if (!this.matriz_plana || !Array.isArray(this.matriz_plana)) return false;		
		// ■ Validación de parámetros: NUMERO - ENTERO - POSITIVO
		if (typeof indice !== 'number') return false;
		if (!Number.isInteger(indice) ) return false;
		if ( indice < 0) return false;				
		// ■ Validación de rango válido en la matriz
		if (indice >= this.matriz_plana.length) return false;				
		return true
	}
	/**
	 * ### Comprueba que desde existe en la matriz, 
	 * ### comprueba que hasta existe en la matriz 
	 * ### y comprueba que desde < hasta.
	 * @param {number} desde indice de inicio
	 * @param {number} hasta indice final
	 * ```javascript 
	 * * is_desdehasta_OK(0,10)  ► desde indice Zero hasta indice 10 ✔️
	 * * is_desdehasta_OK(10,0) ► desde indice 10 hasta indice 0  ❌
	 * ```
	*/
	is_desdehasta_OK(desde, hasta){
		// ■ Validación de parámetros
		if ( !this.is_indice_OK(desde) ) return false;
		if ( !this.is_indice_OK(hasta) ) return false;			
		// ■ Validación que desde no sea mayor que hasta
		if (desde > hasta) return false;		
		return true;
	}
	/**
	* ### Valida que la this.matriz_plana existe y es un array de tipo lista.
	* @use	
	* ```javascript
	* for (const elemento of array_a_validar) if (Array.isArray(elemento)) return false;						
	* ```
	* @param {array} matriz_a_validar Array tipo lista 	[, , , ]	
	* @examples
	* ```javascript
	*	* _is_lista_OK([1, 2, 3]);      ► true
	*	* _is_lista_OK(["a", "b", 5]);  ► true
	*	* _is_lista_OK([]);             ► true (array vacío cuenta como unidimensional)
	*	* _is_lista_OK([1, [2], 3]);    ► false (contiene un array)
	*	* _is_lista_OK({});             ► false (objeto)
	*	* _is_lista_OK(null);           ► false
	*	* _is_lista_OK("hola");         ► false
	* ```
	*/
	_is_lista_OK(matriz_a_validar) {
		if (matriz_a_validar == null || !Array.isArray(matriz_a_validar)) {
			return false;
		}
		// Verifica que ningún elemento sea un array (para asegurar que es unidimensional)
		return !matriz_a_validar.some(elemento => Array.isArray(elemento));
	}

	// ■■■■■■■■■■■■■■■■■ CRUD
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/** 🚫
	 * ### 
	 * @param {ElementoDom} puede ser cualquier elemento del dom sobre el que se quiera usar matriz. lo normal = Div
	 * @param {number} indice  
	*/
	add_item(elemento){	
		if (!this._is_lista_OK(this.matriz_plana)) return false;	
		this.matriz_plana.push(elemento);						
		this.filas = this.total_filas();      	// • Las filas hay que calcularlas siempre que cambien ó •numero_columnas ó •numero_items.
		if (!this.filas) this.filas = 0
	}
	/** 🚫
	 * ### Devuelve un console.log ► indice , objeto, fila, columna
	 * @param {number} arg1 1► fila-columna, 2► Índice(3) 3► celda(B2) .... en this.matriz_plana
	 * @param {number} arg2 1► Tiene que ser columna obligatoriamente o null
	*/
	read(arg1, arg2 = null){
		if (!this._is_lista_OK(this.matriz_plana)) return false;        
        const indice = this.WC.X_to_indice(arg1, arg2); // Delegamos la "traducción" al método universal        
        if (indice === false) return false;

		for (let i = 0; i < this.matriz_plana.length; i++) {
			console.log(`indice: ${i} elemento: ${this.matriz_plana[i].elemento_dom.id} fila: ${this.numero_fila(i)}, columna: ${this.numero_columna(i)}`);
		}
	}
	/** 🚫
	 * ### 
	 * @param {any} item cualquier elemento que se quiera meter en una lista plana y ser tratado como matriz de dos dimensiones
	 */
	update(old_item, new_item){
		if (!this._is_lista_OK(this.matriz_plana)) return false;	// Validación de la matriz
		const indice = this.matriz_plana.indexOf(old_item);
		if (indice === -1) {
			console.error('❌ Elemento no encontrado en la matriz.');
			return false;	// El elemento no existe en la matriz
		}
		this.matriz_plana[indice] = new_item;		
	}
	/** 🚫
	 * ### Elimina un item de la matriz_plana. y matriz_plana pasará a tener un elemento menos
	 * @param {number} arg1 1► fila-columna, 2► Índice(3) 3► celda(B2) .... en this.matriz_plana
	 * @param {number} arg2 1► Tiene que ser columna obligatoriamente o null
 	 * @example 
	 * 		delete_item(); 	► Elimina el último elemento si lo hay.
	 * 		delete_item(5); ► Elimina la celda de indice 5.
	 * 		delete_item(3,5); ► Elimina la celda de fila 3 y columna 5.
	 * 		delete_item(B2);  ► Elimina la celda B2.
	*/
	delete_item(arg1, arg2=null){
		if (!this._is_lista_OK(this.matriz_plana)) return null;      // Validación de la matriz   
        const indice = this.WC.X_to_indice(arg1, arg2); // Delegamos la "traducción" al método universal    		    
		try {
			if (indice === false) {
				const item_deleted = this.matriz_plana.pop();
				return item_deleted;
			}else{
				const item_deleted = this.matriz_plana.splice(indice, 1);
				return item_deleted;
			}
		} catch (error) {
			console.log([`❌ Error en Delete_item ► ${error.message}`])
		}
	}
	/** 🚫
	 * ###   * Borra todas las entradas de la matriz:
	 * @returns {boolean} - Retorna true si se realizó la operación con éxito, false en caso contrario.
	 */  
	reset_all() {
		try {
			if (!this._is_lista_OK(this.matriz_plana)) return null;
			this.matriz_plana.splice(0, this.matriz_plana.length);			// Elimina elementos desde el 0 hasta el final.
			return true;
		} catch (e) {
			console.log('❌ MatrizPlana - reset_all: \n' + e.message);
			return false;
		}
	}
	// ■■■■■■■■■■■■■■■■■ SACA DATOS DE LA CLASE
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ## Devuelve filas y columnas en matriz_plana {filas, columnas} 
	 * @returns {object}  { filas, columnas } devuelve un objeto tipo filas:5 , columnas:7
	 * * {5, 3} ► matriz 5x3  
	 * * {0, 0} ► error.
	 * @example
	 * ```javascript
	 * const limites = this.ref_Salon?._limites_matriz?.();
	 *	if (!limites || limites.filas === 0 || limites.columnas === 0) return false;
	 * ```	
	 */
	_limites_matriz() {
		if (!this || typeof this !== 'object') return { filas: 0, columnas: 0 };
		// Columnas
		const cols = this.columnas; 
		const columnas = Number.isInteger(cols) && cols >= 0  ? cols : 0;
		
		// Filas
		let filas = 0;
		if (typeof this.total_filas === 'function') {
			const total_filas = this.total_filas();
			filas = Number.isInteger(total_filas) && total_filas >= 0 ? total_filas : 0;
		} else if (Number.isInteger(this.filas)) {
			filas = this.filas;
		}
		return { filas, columnas };
	}
	/**
	* ## Asigna y devuelve el numero de filas en funcion de:
	* #### 1.- Numero de columnas 
	* #### 2.- Numero total de elementos que hay en la this.matriz_plana.
	* @returns {integer}  
	```javascript 
	this.filas 
	```
	*/
	total_filas() {
		try {
			// Validacion:
			if (!this._is_lista_OK(this.matriz_plana)) return false;
			// Proceso:
			if (this.columnas == 0) return 0;				                
			let cociente = Math.floor(this.matriz_plana.length / this.columnas);	
			let resto = this.matriz_plana.length % this.columnas;
			this.filas = resto == 0 ? cociente : cociente + 1;
			return this.filas;
		} catch (e) {
			console.error(`❌ total_filas() ► ${e.message}\nNombre del error: ${e.name}\nStack: ${e.stack}`);
			return false;
		}
	}
	/**
	* ###  Entra un numero elemento de la lista this.matriz_plana unidimensional
		* y retorna el numero de FILA que ocupara en bidimensional
		* depende de: filas y columnas.
	* @param {number} arg1 puede ser una celda ('B3', 'A1') o un numero de indice en la matriz (3, 4, 0...).
	* puede ser {fila, columna} aunque se trata de averiguar la fila. si pasamos fila, columna, la fila YA la sabemos.
	* @returns {} numero entre 0 y N [0,N] o bien false si algo no va bien.
	*/
	numero_fila(arg1) {		
		if (!this._is_lista_OK(this.matriz_plana)) return false;        
		if (this.columnas === 0) return 0;
        
		const indice = this.WC.X_to_indice(arg1); 		// Delegamos la "traducción" al método universal        
        if (indice === false) return false;
		const fila = Math.floor(indice / this.columnas);		// Cálculo directo de la fila
		return fila;
	}
	/**
	 * ### Calcula el número de columna correspondiente a un índice en un array unidimensional
	 * que representa una matriz bidimensional
	 * @param {number} arg1 - Índice(3) o celda(B2) en this.matriz_plana
	 * @returns {number} - Número de columna (0-based) o false si el índice es inválido
	 */
	numero_columna(arg1) {			
		if (!this._is_lista_OK(this.matriz_plana)) return false;        
        const indice = this.WC.X_to_indice(arg1); // Delegamos la "traducción" al método universal        
        if (indice === false) return false;

		return indice % this.columnas;	// Cálculo directo de la columna... resto del total entre el número de columnas
	}
	/**
	 * Obtiene el elemento de matriz_plana usando cualquier formato de entrada.
	 * @param {number|string|Working_Celdas} arg1 puede ser un indice(5), una fila (5, _) o una celda ('B2')
	 * @param {number|null} arg2 puede ser una columna (_, 3) o null 
	 * SOLO SI arg1 es fila, arg2 PUEDE SER COLUMNA, EN CASO DE 'indice' ó 'celda', arg2 = null
	 * @returns {MyDiv|null} RETORNA EL OBJETO ALMACENADO EN LA MATRIZ(....será MyDiv)
	*/
    _at(arg1, arg2 = null) {
		if (!this._is_lista_OK(this.matriz_plana)) return null;        
        const indice = this.WC.X_to_indice(arg1, arg2); // Delegamos la "traducción" al método universal        
        if (indice === false) return null;
        return this.matriz_plana[indice];
    }	
	
	
	// ■■■■■■■■■■■■■■■■■ GETTER'S & SETTER'S
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ###  Asigna el numero de items de la matriz. Recalcula el número de filas. El número de columnas se mantiene.
	 */
	set matriz_plana(lista_elemento_dom) {
		try {
			//Validacion: 
			if (lista_elemento_dom == null || !Array.isArray(lista_elemento_dom) ) {
				// this.matriz_plana = []
				return false;
			}
			//
			this.matriz_plana = lista_elemento_dom;
			this.filas    = this.total_filas();
			
		} catch (e) {
			console.log('❌ Matriz_Plana - set matriz_plana: ' + e.message + '\n' + 'Nombre: ' + e.name);
		}
	}

	/**
	 * ###  devuelve this.matriz_plana 
	 */        
	get matriz() {
		if (!this._is_lista_OK(this.matriz_plana)) this.matriz_plana = []				// si this.matriz_plana no fuera un array se le asigna array vacío.
		return this.matriz_plana;	
	}

	/**
	 * ###  Asigna el numero de las columnas...y actualiza el número de filas. No cambia el número de items de lista_Base_Div
	 */
	set columnas(numeroColumnas) {
		//Validacion:
		if (numeroColumnas == null || numeroColumnas == '') return 0;
		if (isNaN(numeroColumnas) == true) return 0;
		if (numeroColumnas < 0) numeroColumnas = -numeroColumnas;
		if (numeroColumnas == 0) return 0;
		//
		this.columnas = numeroColumnas;
		this.filas    = this.total_filas();
	}

	/**
	 * ###  Obtiene el numero de columnas de la this.matriz_plana.
	 */        
	get columnas() {
		return this.columnas;
	}

}
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘   FIN CLASE Matriz_Plana


// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * C L A S E  "Matriz_to_MyDiv"  	
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

// ■■■■ Clase que mantiene ( insertar / editar / eliminar / Buscar / Show) un Array de objetos [MyDiv] ► (matriz) en un contenedor padre ► (this.contenedor_div_x_div).

// • TODOS LOS DIVS TIENEN LOS MISMOS className('estiloBaldosa', 'estiloSalon') inicialmente 
// dentro de  la misma Hoja de Estilos (stylesDvd.css) • • • por Defecto .... Hereda de Work__ClassName

// • Se pueden poner ESTILOS DIFERENTES a cada DIV,  dependiendo del FLAG o del TAG asignado POSTERIORMENTE.
// • Se puede manejar el head de la aplicacion para editarlo dinamicamente(CRUD sobre el Head).  ► obj_Div_X_Div.head_drive.[add__etiqueta, addTitle, updateURL...]

// import { Matriz_Plana } from './matriz_dvd.js'; // ■■■■■■ 
class Matriz_to_MyDiv extends Matriz_Plana {
	// STATIC PARAM'S 🧍‍♂️
	static FAMILY_NONAME = 'NoNfamily';				//Para los div no nombrados explicitamente:
	static CONTENEDOR_NONAME = 'ContenedoR';		//Cuando se crea una instancia sin contenedor se crea un contenedor de id=ContenedorNONAME_x
	static PREFIJO_TAG = '#';		//LOS TAG EMPIEZAN POR '#_' 
	static FLAG_ZERO = 0;			//Una bandera para identificar objetos y darle propiedades.
	//
	// ■■■■■■ Stack de los datos Importantes de la clase ■■■■■■■
	contenedor_div_x_div = null;	// ► Objeto contenedor de los divs creados y almacenados en arr.	
	my_div_one = new MyDiv();		// ► Primer Div. 

	family = '';					// ► Nombre a partir del cual se generan todos los ID de los divs.	Id_PATRON_0 , Id_PATRON_1 .....
	id_div_contenedor = '';
	div_maestro = null;
	columnas = 8;
	filas = 8;
	// tag_baldosas = '#Baldosa';

	
	/**
	 * ### 
	 * @param {*} family 		Nombre comun para los divs. Si Capulettos -> Capulettos_0, Capulettos_1...
	 * @param {*} id_div_contenedor 	Contenedor donde meter los divs creados con la clase.
	 * @param {*} div_maestro, 			div donde meter el contenedor de los divs. es un contenedor de un contenedor. Será document.body si no se pasa argumento.
	 * 								si se pasa argumento div_maestro.appendChild(this.contenedor_div_x_div) 
	*/
	constructor(family = '', id_div_contenedor = '', div_maestro = null, columnas = 8, filas = 8) {
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■■ LLAMADA AL PADRE
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		try {
			super(columnas);							// De una lista plana obtenemos las referencias de una lista bidimensional.		
		} catch (error) {
			console.log(`❌​ ERROR Matriz_to_MyDiv::: constructor::: ${error.message}`);
		}
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■■ ASIGNACION DE VARIABLES.
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ FAMILY: 
		if (typeof (family) != 'string' || family.trim() === '' || document.getElementById(family) || document.getElementById(family+'_0')) 
			this.family = Herramientas._get_secuencial_dom(Matriz_to_MyDiv.FAMILY_NONAME);			
		else		
			this.family = family;
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ id_div_contenedor 	
		if (id_div_contenedor == null || typeof (id_div_contenedor) != 'string' || id_div_contenedor.trim() == '') {			
			this.contenedor_div_x_div = document.createElement('div');
			this.contenedor_div_x_div.id = Herramientas._get_secuencial_dom(Matriz_to_MyDiv.CONTENEDOR_NONAME);
		} else if (!document.getElementById(id_div_contenedor)) {			// •IF► el contenedor pasado NO EXISTE PREVIAMENTE en EL DOC Html.
			this.contenedor_div_x_div = document.createElement('div');
			this.contenedor_div_x_div.id = id_div_contenedor;					
		} else {															
			this.contenedor_div_x_div = document.getElementById(id_div_contenedor);	// • IF ► el contenedor pasado EXISTE en Html...lo cacho como contenedor
		}		

		// ■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ CONTENEDOR DEL CONTENEDOR 		
		if(!div_maestro) 		// • La clase está pensada para que sea en el document.body en caso de div_maestro = null
			div_maestro = document.body;		
		this.div_maestro = div_maestro;
		// ◘ añadimos el contenedor de la matriz al body.
		this.div_maestro.appendChild(this.contenedor_div_x_div);		
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ NUMERO COLUMNAS: 
		if (typeof (columnas) != 'number' || columnas <= 0) 	
			this.columnas = 8;
		else 									
			this.columnas = Math.floor(columnas);
		// ■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ NUMERO FILAS: 		
		if (typeof (filas) != 'number' || filas <= 0) 		
			this.filas = 8;
		else
			this.filas = filas;
		
		// ■■■■■■■■■■■■■■■■■■■■■■■
		// ■ Crea un primer div que será el patron de clonacion
		this.my_div_one = this._crear_mydiv();		
		if (!this.my_div_one) throw ('​❌​ Error al  Crear 1º Div  :(');
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ AÑADO LAS BALDOSAS AL SALON
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		this._set_total_mydivs( this.filas * this.columnas );
		this.set_classname_container('estiloSalon');		// Y asigno la clase al conetenedor.
    	this.set_className('estiloBaldosas');				// Y asigno la clase a las baldosas.
		
		// ■■■■■■■■■■■■■■■■■■■
		// LOG Estados 🖥️​​ 
		this.log_salon();
		
		// ■■■■■■■■■■■■■■■■■■■■■
		// ​🧩​🧩​  RANGOS 🧩​🧩​​
		// ■■■■■■■■■■■■■■■■■■■■■
		this.W_R = new Working_Celdas(this); 	// Instanciamos el gestor de RANGOS y CELDAS de la matriz.		
		
		

	}	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ FIN CONSTRUCTOR

	/**
	 * ### Imprime un Logg de salon por consola.
	 */
	log_salon(){
		let txt = `🖥️​​ LOG ESTADOS from:  'Matriz_to_MyDiv' | 'Matriz__Plana' | 'Work__ClassName'`;
		txt += '\n • Familia/Nombre Base de Baldosas ► ' + this.family ;
		txt += `\n • Div Contenedor Maestro ► ${this.div_maestro.id ? this.div_maestro.id : 'document.body'}`;
		txt += '\n • Contenedor del Salon ► ' + this.contenedor_div_x_div.id;		
		txt += '\n • Primera Baldosa de la Matriz ► ' + this.my_div_one.elemento_div.id;
		txt += `\n • Clase en ${this.contenedor_div_x_div.id} ► ${this.contenedor_div_x_div.className}`;
		txt += `\n • Clase en Las Baldosas ► ${this.matriz_plana[0].elemento_div.className} `;
		txt += `\n • Número de Baldosas ► ${this.matriz_plana.length} `;
		txt += `\n • Dimensión de la matriz ► ${this.filas} x ${this.columnas}   (filas x columnas)`;
		// txt += '\n■■■■■■■■■ FIN LOG ';
		console.log(txt);
	}

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ SCANNER DE UNA BALDOSA
	/**
     * ### Escanea la lista de diccionarios mesa del salon y hace la busqueda norte sur este oeste, buscando sillas y mesas.
     * @param {*} 
    */
    scanner_nsew(drop_scan_obj) {

		if (!this.matriz_plana || this.matriz_plana.length == 0) return false;

		// ■ Obtengo el Objeto MyDiv de la lista this.matriz_plana[]  byId del objeto Drop
		let myDiv_to_search   = this.matriz_plana.find(my_div => my_div.elemento_div.id === drop_scan_obj.id);		
		if (!myDiv_to_search) return false;

		// ■ Saco el Total de Filas de la matriz?????????????????????????????????????????
		// this.filas = this.total_filas();
		
		// ■■■■■■ OBTENGO EL indice en la matriz/matriz por su ID .... la Baldosa ('SALON_15') es donde la mesa(Mesa_0) ha hecho Drop
		// 			• necesito EL indice para obtener la fila y la columna en la matriz.
		let indice_to_search = this.__get_indice_baldosa_byId(drop_scan_obj.id);
		if (indice_to_search < 0) return false;	
		
		// ■■■■■■ OBTENGO EL NUMERO DE FILA Y DE COLUMNA PARA PODER HACER EL SCANEO SEGURO. 
		let fila = this.numero_fila(indice_to_search);
		let columna = this.numero_columna(indice_to_search);
		
		// ■■■■■■ REALIZO UN SCANEO DE TODAS LAS CEDAS QUE HAY ALREDEDOR DEL OBJETO QUE ESTA EN LA fila, columna.
		const i_n = this.get_indice_scan(fila, columna , 'n');
		const i_s = this.get_indice_scan(fila, columna , 's');
		const i_e = this.get_indice_scan(fila, columna , 'e');
		const i_w = this.get_indice_scan(fila, columna , 'w');
		const i_ne = this.get_indice_scan(fila, columna , 'ne');
		const i_nw = this.get_indice_scan(fila, columna , 'nw');
		const i_se = this.get_indice_scan(fila, columna , 'se');
		const i_sw = this.get_indice_scan(fila, columna , 'sw');
		
		// Si ∃ i_n, le asigna el id del objeto que está en esa posición de la matriz, Si ∄, asigna el valor que tenga (null ó false).
		myDiv_to_search.scan.n = (i_n === null || i_n ===false)  ? i_n : this._get_id_contenido_baldosa(this.matriz_plana[i_n].elemento_div);	
		myDiv_to_search.scan.s = (i_s === null || i_s ===false)  ? i_s : this._get_id_contenido_baldosa(this.matriz_plana[i_s].elemento_div);
		myDiv_to_search.scan.e = (i_e === null || i_e ===false)  ? i_e : this._get_id_contenido_baldosa(this.matriz_plana[i_e].elemento_div);
		myDiv_to_search.scan.w = (i_w === null || i_w ===false)  ? i_w : this._get_id_contenido_baldosa(this.matriz_plana[i_w].elemento_div);
		myDiv_to_search.scan.ne = (i_ne === null || i_ne ===false)  ? i_ne : this._get_id_contenido_baldosa(this.matriz_plana[i_ne].elemento_div);
		myDiv_to_search.scan.nw = (i_nw === null || i_nw ===false)  ? i_nw : this._get_id_contenido_baldosa(this.matriz_plana[i_nw].elemento_div);
		myDiv_to_search.scan.se = (i_se === null || i_se ===false)  ? i_se : this._get_id_contenido_baldosa(this.matriz_plana[i_se].elemento_div);
		myDiv_to_search.scan.sw = (i_sw === null || i_sw ===false)  ? i_sw : this._get_id_contenido_baldosa(this.matriz_plana[i_sw].elemento_div);

		// VISUALIZACIÓN EN MODO MATRIZ:
		// console.log(`■■ ${myDiv_to_search.elemento_div.id} ► ${myDiv_to_search.id_contenido}`);
		// console.log(`${this.matriz_plana[indice_to_search].scan.nw}\t${this.matriz_plana[indice_to_search].scan.n}\t${this.matriz_plana[indice_to_search].scan.ne}
		// ${this.matriz_plana[indice_to_search].scan.w}\t${myDiv_to_search.id_contenido}\t${this.matriz_plana[indice_to_search].scan.e}
		// ${this.matriz_plana[indice_to_search].scan.sw}\t${this.matriz_plana[indice_to_search].scan.s}\t${this.matriz_plana[indice_to_search].scan.se}`);
		
		return myDiv_to_search;
	}

	/** ┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌┘┌
	 * ### recibe un objeto myDiv. devuelve un array con los ids de todas las Mesas y Sillas que tiene alrededor
	 * @param {myDiv} my_div - Objeto myDiv que contiene el escaneo n-s-e-w.
	 * @param {myDiv} base_name_clone - el objeto clone (null, 'mesa' , 'silla')  a buscar.... si null, entra todo(Mesas y Sillas).
	 * @returns {Array} array_retorno ► [Mesa_0, Mesa_1, Mesa_2] 
	*/
	_get_array_scan(my_div, rol_busca = null) {    
		let arr_encontrados = [];	
		const arr_entorno_scan = Object.values(my_div.scan);	// ■ array de los valores del scan de la baldosa
		const arr_entorno_limpio = arr_entorno_scan.filter(Boolean);	
		for (const id_el of arr_entorno_limpio) {
			if (!rol_busca) {   // ■ Si rol_busca es null, retorna cualquier elemento
				arr_encontrados.push(id_el);
				continue;
			}
			const el_dom = document.getElementById(id_el);
			if(!el_dom) continue;       
			const item_en_catalogo = Catalogo.get(id_el);
			// ■ match x rol
			if(rol_busca === item_en_catalogo.rol) {
				arr_encontrados.push(id_el);
			}
			
		}
		return arr_encontrados;

		
	}

	/** 
	 * ### Devuelve las mesas conectadas directamente a la mesa dada.
	 * 				- LLAMADA DESDE buscar_elementos__conectados ► get_matriz__reservas
	 * @param {string} id_contenido - ID de la mesa
	 * @param {Array} lista_info - Lista de ficha_baldosa ... Array de Map('id_contenido', 'indice_baldosa', 'my_div')
	 * @returns {Array} - Vecinos mesas conectadas ► ['Mesa_0', 'Mesa_3']
	*/
	_get_array_vecinos(id_contenido, ficha_s_baldosa, rol_busca = 'central') {
		const ficha_baldosa = ficha_s_baldosa.find(m => m.get('id_contenido') === id_contenido);
		if (!ficha_baldosa) return [];		
		const my_div = ficha_baldosa.get('my_div');
		if(!my_div) return [];
		
		const array_scan = this._get_array_scan(my_div, rol_busca);                // Filtra solo mesas.
		
		return array_scan;
	}

	/**
	 * ### 
	 * @param obj_drop  Objeto onplay sobre el que se suelta un objeto.
	*/
	_get_id_contenido_baldosa(obj_drop){
		if (!this.matriz_plana || this.matriz_plana.length == 0) return false;
		// ■■
		const myDiv_to_search = this.matriz_plana.find(my_div => my_div.elemento_div.hasChildNodes() && my_div.elemento_div.id === obj_drop.id);
		if (!myDiv_to_search) return false;  
		
		const contenido = myDiv_to_search.elemento_div.firstElementChild;
		
		// ■■ OBLIGA A QUE SEA DIV.	
		if (contenido instanceof HTMLElement && contenido.tagName === 'DIV'){
			return contenido.id;	
		}else{
			// return false;
			return "ERROR";
		}

	}

	/**
     * ### Escanea la lista de diccionarios mesa del salon y hace la busqueda norte sur este oeste, buscando grupos de sillas y mesas asociadas.
     * @param {MyDiv/String/number} myDiv_to_search puede ser: 1• un objeto Base Div, 2• un indice de matriz, 3• un id de contenido de un objeto MyDiv.
    */
	_show_vecinos(myDiv_to_search){
		let b_div = null;
		if (!myDiv_to_search) {		// ■■■ No entra nada.
			return false;
		}else if (myDiv_to_search instanceof MyDiv) {		
			// ■■■ Entra como parametro un objeto MyDiv
			// console.log('myDiv_to_search es un objeto MyDiv');
			b_div = myDiv_to_search;
		
		}else if (this.is_indice_OK(myDiv_to_search)) {		
			// ■■■ Entra como indice de la matriz			
			b_div = this.matriz_plana[myDiv_to_search];
			if (!b_div) {
				console.log('• • • myDiv_to_search no es un objeto MyDiv');
				return false;
			}		
		}else if (typeof(myDiv_to_search) == 'string') {	
			// ■■■ Entra como id de un objeto MyDiv
			if(!document.getElementById(myDiv_to_search)){
				return false;
			}
			b_div = this.get_myDiv_byContenido(myDiv_to_search);
			if (!b_div) {
				console.log('• • • myDiv_to_search no es un objeto MyDiv');
				return false;
			}		
		}else{	
			// ■■■ No es ningun tipo valido
			console.log('myDiv_to_search no es un objeto MyDiv, ni un indice, ni un id de un objeto MyDiv');
			return false;
		}
		console.log(`\n■■■■■■■■■■■■■■■■■■■ BALDOSA► '${b_div.elemento_div.id}'    CONTENIDO► '${this._get_id_contenido_baldosa(b_div.elemento_div)}'    CLASE► ${b_div.elemento_div.class_name} • • • SCAN:`);
		
		console.log(`${b_div.scan.nw}\t${b_div.scan.n}\t${b_div.scan.ne}`);
		console.log(`${b_div.scan.w}\t${this._get_id_contenido_baldosa(b_div.elemento_div)}\t${b_div.scan.e}`);
		console.log(`${b_div.scan.sw}\t${b_div.scan.s}\t${b_div.scan.se}`);
	}

	/**
	 * ### Hace un escaneo de cada coordenada que se pasa por parametro. 
	 * @param {number} fila Número de FILA del objeto base sobre el que escanear.
	 * @param {number} columna Número de COLUMNA del objeto base sobre el que escanear.
	 * @param {String} coordenada == 'n', 's', 'e', 'w' , 'ne', 'nw', 'se', 'sw'.
	 * @param {number} factor_scan es la expansión del scaner. IF = 1 scanea 1 alrededor, si 2, 2 
	 * @returns ■ false  ► No hay div baldosa, puede ser un borde o una esquina.
	 * 			■ null   ► hay div baldosa y está vacía (no tiene hijos dentro).
	 * 			■ indice ► hay div baldosa y tiene hijo dentro. 
	 */
	get_indice_scan(fila, columna, coordenada, factor_scan = 1){
		// SUSTITUIR 1 POR FACTOR_SCAN ?????????????????????????????????????????????????????????????
		let dicc_coord = {
			'n':{ fil: fila - 1 < 0  						? false : fila - 1 	,
				  col: columna },
			's':{ fil: fila + 1 >= this.filas  		? false : fila + 1  ,
				  col: columna },
			'e':{ fil: fila , 
				  col: columna + 1 >= this.columnas 	? false : columna + 1 },
			'w':{ fil: fila , 
				  col: columna - 1 < 0  					? false : columna - 1 },
			'ne':{fil: fila - 1 < 0  						? false : fila - 1  ,
				  col: columna + 1 >= this.columnas 	? false : columna + 1 },
			'nw':{fil: fila - 1 < 0  						? false : fila - 1 , 
				  col: columna - 1 < 0  					? false : columna - 1 },
			'se':{fil: fila + 1 >= this.filas  		? false : fila + 1  , 
				  col: columna + 1 >= this.columnas 	? false : columna + 1 },
			'sw':{fil: fila + 1 >= this.filas  		? false : fila + 1 , 
				  col: columna - 1 < 0  					? false : columna - 1 }
		}
		let fila_coord 		= dicc_coord[coordenada].fil		// ► fila tiene un número si existe y si no existe es false.
		let columna_coord 	= dicc_coord[coordenada].col		// ► columna tiene un número si existe y si no existe es false.

		let indice_coord = this.W_R.X_to_indice(fila_coord, columna_coord); 		//(Matriz_Plana) retorna number o false.
		
		// Si hay indice y es numerico hay que validar si está ocupada o está vacía(null)
		if (indice_coord !== false && indice_coord >=0) { 
			const b_tiene_hijos = this.matriz_plana[indice_coord].elemento_div.hasChildNodes();
			if ( !b_tiene_hijos ) {
				indice_coord = null;
        	}
		} 
		return indice_coord;
	}
	
	/**
	 * ### Función Gestora (La que llamarás desde la App)
	 * @param {number} total__baldosas - Cantidad exacta de baldosas que quieres (ej: 20)
	 * @param {string} clase__css - (Opcional) Clase para las nuevas baldosas
	 */
	_set_total_mydivs(total_baldosas) {
		// Validación básica para evitar números negativos o NaN
		if (!Number.isInteger(total_baldosas) || total_baldosas < 0) {
			console.warn("set__total_baldosas recibió un número inválido:", total_baldosas);
			return;
		}

		const total_actual = this.matriz_plana.length;
		const diferencia = total_baldosas - total_actual;

		// CASO A: Faltan baldosas -> Añadimos
		if (diferencia > 0) {
			for (let i = 0; i < diferencia; i++) {
				this.add_mydiv();						
			}
		} 
		// CASO B: Sobran baldosas -> Eliminamos
		else if (diferencia < 0) {
			// Usamos Math.abs para iterar en positivo la cantidad a borrar
			const a_borrar = Math.abs(diferencia);
			for (let i = 0; i < a_borrar; i++) {
				this.kill_mydiv();						
			}
		}
		
		// CASO C: Si diferencia es 0, no hacemos nada (KISS)
		// console.log(`Grid actualizado: ${total_actual} -> ${total__objetivo}`);
	}
	/**
	 * ###  Metodo que añade el ejercito de los clones.
	 * 				 • Un clon es un div que se crea a partir del primer div de la clase.
	 * 				 • El id del clon se genera con _get_Secuencial(this.family) y se añade al contenedor de la clase.
	 * 				 • Un clon hereda todas las propiedades del primer div de la clase.
	 * 				 • El clon se añade a la matriz de la clase en crea_clon_myDiv()
	 * @param {Integer} num_to_add , numero de elementos a añadir a la matriz_plana
	 * @returns true, operacion OK | false, operación ERROR
	 */
	add_mydiv_s(num_to_add = 1) {
		try {
			if (typeof(num_to_add) != 'number' || num_to_add <= 0) return false;
			for (let i = 0; i < num_to_add; i++) {
				const new_mydiv = this.crea_clon_myDiv();
				if(new_mydiv){
					this.matriz_plana.push(new_mydiv);				// ■■■■■■ Meto el objeto en el matriz:
					// console.log('​​​​​​👯​ Div Clonado!! ► Item: (' + i + ')\t ' + new_mydiv.elemento_div.id);
				}else{
					throw ('​​​​❌​ ERROR ::: Matriz_to_MyDiv ::: add__mydiv_s :::: al Crear el clon. Item: ' + i);
				}
			}
			return true;
		} catch (error) {
			console.log(error.message);
			return false;
		}
	}

	add_mydiv(){
		const new_mydiv = this.crea_clon_myDiv();
		if(new_mydiv){
			this.matriz_plana.push(new_mydiv);				// ■■■■■■ Meto el objeto en el matriz:
			// console.log(`​​​​​​👯​ Div Clonado • • •\t id: ${new_mydiv.elemento_div.id}`);
		}else{
			throw ('​​​​❌​ ERROR ::: Matriz_to_MyDiv ::: add__mydiv :::: al Crear Clon.' );
		}
	}
	/** ►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►►► Matriz_to_MyDiv
	 * ### ■■■ Añade baldosas(divs) al Saloon. 
	 *                  • A Cada baldosa añadida hay que ponerle el tag y capacitarlas para ser drop.
	 * @param {}    numero_baldosas     El número de baldosas que se quieren añadir al array array_Base_Divs[] de la class Matriz_to_MyDiv 
	 * @example:    ►  add__total__baldosas( 120 , '#Baldosa' )
	 * 				►  add__total__baldosas( 120 )
	*/
	add_all_mydiv_s(numero_baldosas = 64, tag_baldosas = '#Baldosa') {
		const diferencia = this.total - numero_baldosas

		if (diferencia > 0) {          // • tiene mas de las que quiere ... Hay que restar
			const desde = this.total - diferencia;
			const hasta = this.total-1;
			this.kill_mydiv_s(desde, hasta);      // ■■■■■■ Crea un MyDiv x Baldosa y añadimos cada Baldosa a array_Base_Divs
			
		} else if (diferencia < 0) {    // • tiene menos de las que quiere ... Hay que sumar
			this.add_mydiv_s(Math.abs(diferencia)+1);       	// ■■■■■■ Crea un MyDiv x Baldosa y añadimos cada Baldosa a array_Base_Divs
			this.tag_s_update(tag_baldosas);     				// ■■■■■■ Les ponemos un Nombre para Luego Buscarlas.... desde 0 hasta el fin de array_Base_Divs
			
		} else if (diferencia == 0) {
			return true;
		}
	}
	
	/**
	 * ### metodo que elimina un nodo(intItemMatar)
	 * @param {*} desde
	 * @param {*} hasta
	 * @explica ► array.splice(indice, cantidadAEliminar, elemento1, elemento2, ..., elementoN)
					• indice: La posición donde comenzar a cambiar el array
					• cantidadAEliminar (opcional): Cuántos elementos eliminar
					• elemento1, ..., elementoN (opcional): Elementos a agregar al array
	 */
	kill_mydiv_s(desde = 0, hasta) {
		if ( !this.is_desdehasta_OK(desde , hasta) ) return false;		
		// • • • • pasa Todas las validaciones :)	• • • Numero/Positivo/en Rango de matriz/desde<hasta/existe matriz?
		// ■■■■ Elimina los divs del contenedor:
		for (let i = desde; i < hasta; i++) {
			this.contenedor_div_x_div.removeChild(this.matriz_plana[i].elemento_div);	// ■ Elimina el child del contenedor 
		}
		const diferencia = hasta - desde;									// ■ Preparo la variable hasta para eliminar los divs del matriz[] con splice:
		let arrAux2 = this.matriz_plana.splice(desde, diferencia);			// ■ Elimina de matriz[]
		console.log(`​☠️​ ${arrAux2.length} divs RIP .... quedan ${this.matriz_plana.length}`);
		
		return arrAux2;
	}
	
	/** ## Elimina 1 baldosa */
	kill_mydiv(index_to_kill=null){
		if(index_to_kill === null) index_to_kill = this.matriz_plana.length - 1;
		if(!this.is_indice_OK(index_to_kill)) return false;
		this.contenedor_div_x_div.removeChild(this.matriz_plana[index_to_kill].elemento_div);	// ■ Elimina el child del contenedor 
		let arrAux2 = this.matriz_plana.splice(index_to_kill, 1);			// ■ Elimina de matriz[]
		
		// console.log(`​☠️​ ${arrAux2.length} div KILL .... quedan ${this.matriz_plana.length}`);
	}
	
	/**
	 * ### Elimina x baldosas.
	 * @param {number}    
	*/
	delete_mydiv_s(desde=null,  numero_baldosas = 1 ){
		if (this.total < numero_baldosas){
			return false;
		}
		if (desde == null)
			this.kill_mydiv_s(this.total-1-numero_baldosas, this.total-1);      // ■■■■■■ Crea un MyDiv x Baldosa y añadimos cada Baldosa a array_Base_Divs    
		else if (desde + numero_baldosas < this.total) {
			this.kill_mydiv_s(desde , desde + numero_baldosas);      // ■■■■■■ Crea un MyDiv x Baldosa y añadimos cada Baldosa a array_Base_Divs    
		} else{
			return false;
		}
	}

	/**
	 * ### Crea un objeto de la clase MyDiv() que son las baldosas del salon.
	 * @returns 
	 */
	_crear_mydiv() {
		try {
			const new_myDiv = new MyDiv();								// Instancia de la clase que voy a guardar en el array.
			new_myDiv.elemento_div = document.createElement('div'); 				// Crea un div.
			new_myDiv.elemento_div.id = Herramientas._get_secuencial_dom(this.family);		// Le pongo un Id de la familia.

			//Estados:
			new_myDiv.HOW.Tag = Matriz_to_MyDiv.PREFIJO_TAG;			// '#' Cargo como Tag Inicial el prefijo '#' (sin Tag)
			new_myDiv.HOW.Flag = 0;								// Sin Flag 
			
			return new_myDiv;
	
		} catch (error) {
			console.log('\n<--------------->\nMensaje: crear Patron: ' + error.message);
			return false;
		}
	}
	
	/** 
	* ###  	Crea un clon de this.my_div_one.elemento_div 	y lo introduce en matriz.
		 					• el id lo genero con _get_Secuencial(this.family)
	* @param {*} div_to_clone(elemento_div)  es el div a clonar. (opcional) si se omite se clona this.my_div_one.elemento_div ► cte div por defecto.
	* @called ► 		add__mydivs()
	* @returns  		1• el Objeto clon creado.  2• false, si hay algún error
	*/
	crea_clon_myDiv(div_to_clone=null, b_title = true) {
		try {
			if (!div_to_clone) div_to_clone = this.my_div_one.elemento_div				// Si no entra div_to_clone, le asigna uno por defecto, el primero
			// let new_div_clon = this.my_div_one.elemento_div.cloneNode(true);			// Creacion del clon.
			let new_div_clon = div_to_clone.cloneNode(true);						// Creacion del clon.
			// creación de su id por la familia asociada cuando se crea la clase.
			new_div_clon.id = Herramientas._get_secuencial_dom(this.family);					
			if (!new_div_clon.id) throw ("Error crea_clon_myDiv() CLON");
			
			if ( b_title ) new_div_clon.title = new_div_clon.id;
			
			this.contenedor_div_x_div.appendChild(new_div_clon);								// Se asigna al objeto contenedor definido en la Clase.
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			//  * Creo un base div y lo meto en el array ... de esta mannera puedo incidir en el div a través del array.
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			const my_div = new MyDiv();					// Creo una instancia de la clase que voy a guardar en el array.
			my_div.elemento_div = new_div_clon;					// meto el div clonado	
			my_div.HOW.Tag = Matriz_to_MyDiv.PREFIJO_TAG;			// # ► tag vacío.	
			my_div.HOW.Flag = 0;							// 0 = sin flag.			
			
			return my_div;
		} catch (e) {
			return false;
		}
	}
	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ TAG matriz
	/**
	 * Cambia los TAG de los divs del array para poder luego hacer cosas con ellos
	 * @param {*} Tag 
	 * @param {*} intDesde 
	 * @param {*} intHasta 
	 * @returns 
	 */
	tag_s_update(Tag = '', intDesde = 0, intHasta = parseInt(this.matriz_plana.length - 1)) {
		if (typeof (Tag) != 'string' || Tag == '') return false;

		if (!this.is_desdehasta_OK(intDesde, intHasta)) return false;
		
		// Proceso. 
		const posicionPref = Tag.indexOf(Matriz_to_MyDiv.PREFIJO_TAG);
		if (posicionPref == -1) {		// ► NO trae el prefijo.			
			Tag = Matriz_to_MyDiv.PREFIJO_TAG + Tag;
		} else {						// ► SI trae el prefijo			
			if (posicionPref == 0) {
				//correcto
			} else {					// ► trae el prefijo pero No al principio. Se lo pongo.				
				Tag = Matriz_to_MyDiv.PREFIJO_TAG + Tag;
			}
		}
		
		// ■ Recorro Los Matriz_to_MyDiv y les asigno el nuevo Tag.
		for (let i = intDesde; i <= intHasta; i++) {
			this.matriz_plana[i].HOW.Tag = Tag;
		}
		return true;
	}

	tag_update(indice_to_update, new_tag){
		if(!this.is_indice_OK(indice_to_update)) return false;
		if(typeof (new_tag) != 'string' || new_tag.trim() == '') return false;
		this.matriz_plana[indice_to_update].HOW.Tag = Tag;
		return true;
	}
	
	/**
	 * ### resetea la variable de clase .HOW.Tag (Los Tags de la clase) con objetivo de 
	 * 				buscar tags en aplicacion posterior
	 */
	tag_reset() {
		for (let i = 0; i < this.matriz_plana.length; i++) {
			this.matriz_plana[i].HOW.Tag = Matriz_to_MyDiv.PREFIJO_TAG;
		}
	}
	
	/**
	 * ### Mensaje por consola de los tags de la clase. Para el programador.
	 */
	tag_ver() {
		let txt = '\n=== VER TAGS ===\n' +
			'================\n' +
			this.contenedor_div_x_div.id + '|' + this.family + '\n';
		for (let i = 0; i < this.matriz_plana.length; i++) {
			txt += '\t[' + i + ']-> ' + this.matriz_plana[i].HOW.Tag + '\n';
		}
		txt += '\n--- FIN -----------------------\n';
		return txt;
	}
	
	/**
	 * ### Obtenemos una lista dependiendo de la propiedaad tag de los MyDiv de la matriz 
	 * @param {*} tag_to_search , String con el nombre del tag a buscar.oooooooooooooooooooooooooooooooooooooooooooo
	 * @returns array con las posiciones en el array que Tienen el Tag pasado, false si hay algun error
	 */
	tag_get_lista_divs(tag_to_search = '') {
		let arrayReturn = [];
		if (typeof (tag_to_search) != 'string' || tag_to_search == '') return false;
		tag_to_search = this.tag_set_prefijo(tag_to_search);
		//		
		for (let i = 0; i < this.matriz_plana.length; i++) {
			if (this.matriz_plana[i].HOW.Tag == tag_to_search) {
				arrayReturn.push(this.matriz_plana[i].elemento_div);		// • Solo se devuelve el div.
			}
		}
		return arrayReturn;
	}
	
	/**
	 * ### 	Obtiene el prefijo de una etiqueta.
	 * @param {*} tag_to_search , String con el nombre del tag a buscar. Si no se pone, devuelve '#'
	 * 				Si se pone un string, devuelve el tag con el prefijo de la clase.
	 * 				Si el tag ya tiene el prefijo, lo devuelve tal cual.
	 */
	tag_set_prefijo(tag_to_search = '') {
		if (typeof (tag_to_search) != 'string') return false
		
		//Proceso. 
		const posicionPref = tag_to_search.indexOf(Matriz_to_MyDiv.PREFIJO_TAG);
		if (posicionPref == -1) {
			tag_to_search = Matriz_to_MyDiv.PREFIJO_TAG + tag_to_search;	// • NO trae el prefijo.
		} else if (posicionPref != 0) {		
			tag_to_search = Matriz_to_MyDiv.PREFIJO_TAG + tag_to_search;	// • Trae el prefijo pero No al principio. Se lo pongo.
		} 		
		return tag_to_search;
	}	
	
	/**
	 * ### Cambia el valor Flag en matriz 'desde' un MyDiv 'hasta' otro.
	 * @param {*} flag_to_set Es el valor del flag que quiero poner. Debería ser Integer, pero puede ser cualquier cosa.
	 * @param {Integer} intDesde desde incluido
	 * @param {Integer} intHasta hasta incluido.
	 */
	flag_update(flag_to_set = 0, intDesde = 0, intHasta = parseInt(this.matriz_plana.length - 1)) {
		
		if (!this.is_desdehasta_OK(intDesde, intHasta)){		// super
			console.log('Matriz_to_MyDiv ::: flag_switch :: Error en DESDE-HASTA');
			return false;
		}
		//Proceso. 
		for (let i = intDesde; i <= intHasta; i++) {
			this.matriz_plana[i].HOW.Flag = flag_to_set;
		}
	}
	
	/**
	 * ### Pone el status byDef sobre cada elemento de la clase Matriz_to_MyDiv.
	*/
	flag_reset() {
		for (let i = 0; i < this.matriz_plana.length; i++) {
			this.matriz_plana[i].HOW.Flag = Matriz_to_MyDiv.FLAG_ZERO;
		}
	}
	
	/**
	 * ### * Mensaje por consola de STATUS de la clase. Para el programador.
	*/
	flag_ver() {
		let txt = '\n=== VER FLAGS===' +
			'\n================\n' +
			'( ' + this.contenedor_div_x_div.id + '\n )';
		for (let i = 0; i < this.matriz_plana.length; i++) {
			txt += '\t[' + i + ']->' + this.matriz_plana[i].HOW.Flag + '\n';
		}
		txt += '\n--- FIN -----------------------------------\n';
		return txt;
	}
	
	/**
	 * ### busca todos los MyDiv que tengan el Flag pasado.
	 * @param {*} elStatusToSearch , String con el nombre del tag a buscar.
	 * @returns , lista con las 'posiciones' en el array que Tienen el Tag pasado
	 * 			, false si hay algun error
	 */
	flag_search(flag_to_search = 0) {
		arrayReturn = [];
		if (typeof (flag_to_search) != 'number') return false;
		//
		for (let i = 0; i < this.matriz_plana.length; i++) {
			if (this.matriz_plana[i].HOW.Flag == flag_to_search) {
				arrayReturn.push(i);
			}
		}
		return arrayReturn;
	}

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ DATOS DE matriz	
	/**
	 * ### Devuelve string con  un MAPA de la CLASE CON TODAS LAS VARIABLES.
	 */
	log_family() {
		let txt = ('\n=== VER FAMILIA ===' +
			'\n===================' +
			'\n\tFAMILY: ' + this.family +
			'\n\tId contenedor_div_x_div: ' + this.contenedor_div_x_div.id +
			'\n\tId EL PRIMERIZO: ' + this.my_div_one.elemento_div.id +
			'\n\tClassName contenedor_div_x_div: ' + this.get_className(this.contenedor_div_x_div) +
			'\n\tTOTAL  (' + this.matriz_plana.length + ') elementos' +
			'\n--- FIN -----------------------------------\n');

		for (let i = 0; i < this.matriz_plana.length; i++) {
			txt += '\n' + this.family + ' index: [' + i + ']-->' +
				'\n\t|ID= ' + this.matriz_plana[i].elemento_div.id +
				'\n\t|className=' + this.get_className(this.matriz_plana[i].elemento_div) +
				'\n\t|Tag: ' + this.matriz_plana[i].HOW.Tag +
				'\n\t|Flag: ' + this.matriz_plana[i].HOW.Flag + '\n';
		}
		return txt;
	}

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ 
	
	/** SIN USO
	 * @param {String} id_div_contenedor id de un Contenedor que tiene que existir o document.body * 
	 * @param {boolean} isDeleteEmpty =true, Borra el anterior Contenedor
	 * 
	 * PROPUESTA DE MEJORA: Añadir un desde-hasta para decir cuales son los divs que cambian de 
	 * Contenedor. 
	 * PROPUESTA DE MEJORA2: Solo se pueden intercambiar(switch) las clases CLASS_divDvd entre si.
	 */
	switch_Contenedor(id_div_contenedor = '', isDeleteEmpty = false) {
		//
		//0)-Validaciones:
		if (typeof (id_div_contenedor) != 'string') return false;
		if (!document.getElementById(id_div_contenedor)) return false;
		if (id_div_contenedor == '') return false;
		if (typeof (isDeleteEmpty) != 'boolean') isDeleteEmpty = false;

		//1•)-Quito los divs(this.matriz_plana[i].elemento_div) del contenedor de la clase.
		for (let i = 0; i < this.matriz_plana.length; i++) {
			this.contenedor_div_x_div.removeChild(this.matriz_plana[i].elemento_div);
		}
		// Guardo el contenedor Viejo y su clase.
		let className_viejo = this.contenedor_div_x_div.class_name;
		let contenedor_viejo = this.contenedor_div_x_div;
		//
		//2•)-Cambio el contenedor de la clase.(ahora this.contenedor_div_x_div tendrá id=id_div_contenedor)
		this.contenedor_div_x_div = document.getElementById(id_div_contenedor);
		this.contenedor_div_x_div.class_name = className_viejo;
		//
		//3)-Añado al nuevo contenedor(this.contenedor_div_x_div) los divs del array(this.matriz_plana[i].elemento_div)
		for (let i = 0; i < this.matriz_plana.length; i++) {
			this.contenedor_div_x_div.appendChild(this.matriz_plana[i].elemento_div);
			//this.copy_paste_className()
		}
		if (isDeleteEmpty == true) {
			contenedor_viejo.parentNode.removeChild(contenedor_viejo);
		}
		return this.contenedor_div_x_div;
	} 	
		
	/** 
	 * ### Busca un objeto MyDiv por el id de su contenido(mesa o silla).
	 * @param {String} id_to_search id del elemento contenido en el MyDiv. Xejemplo 'MESA_0' , 'SILLA_3'
	*/
	get_myDiv_byContenido(id_to_search){    
		if (!this.matriz_plana.length) return false;
		const myDiv_to_search = this.matriz_plana.find(my_div => this._get_id_contenido_baldosa(my_div.elemento_div) === id_to_search);
		if (!myDiv_to_search) return false;
		return myDiv_to_search;
		
	}
	
	/** 
	 * ### desde un id de objeto contenido en la Matriz obtenemos el indice en la matriz.
	 * @param {String} id_to_search id del elemento contenido en el MyDiv. Xejemplo 'MESA_0' , 'SILLA_3'
	 * @return {number/false} >=0 si todo OK o false si hubo algún error.
	*/
	_get_indice_byContenido(id_to_search){
		if (typeof id_to_search != 'string') return false;
		if (!document.getElementById(id_to_search)) return false;
		const my_div = this.get_myDiv_byContenido(id_to_search);
		if(!my_div) return false;
		const indice = this.__get_indice_baldosa_byId(my_div.elemento_div.id);
		if ( indice >=0 )
			return indice;
		else 
			return false;
	}

	/** Introduce un id de un objeto MyDiv y devuelve el objeto MyDiv si lo encuentra en la matriz o null si no lo encuentr
	 * @param {String} id_baldosa_busca id del objeto MyDiv(baldosa) a buscar.
	 * @returns -1 si no encuentra y entero de la posicion del MyDiv de id_baldosa_busca si lo encuentra.
	 */
	__get_indice_baldosa_byId(id_baldosa_busca){
		let indice_to_search = this.matriz_plana.findIndex(objeto => objeto.elemento_div.id === id_baldosa_busca);
		// if (indice_to_search === -1) 
		// 	return false;
		return indice_to_search;
	}

	/** Entra una cadena separada por el char_sep(' ') y devuelve un array sin char_sep(' ').
	 * @param {*} cadena cadea que tienes que convertir en un array de retorno.
	 * @returns Array Split Slash(' '), filtrado sin espacios vacios.
	 * @example: _get__array_cadena('uno dos tres')  ► ['uno','dos','tres']
	 */
	_get_array_cadena(cadena = '', char_sep = ' ') {
		if (!cadena) return false;									// obliga a meter cadena.
		if (typeof (cadena) != 'string') return false;				// obliga a que cadena sea string.		
		const arrSplit = cadena.split(char_sep);					// separa la cadena por el caracter separador.		
		const SP = [''];  											// constante para hacer el filter de vacíos.
		return arrSplit.filter(el => !SP.includes(el));   			// ■ Elimina vacios
	}

	/**
	 * ### 	Obtiene el objeto elemento_div de myDiv dado el índice en la matriz.
	 * 					Delega la validacion del indice al metodo at() de Matriz_Plana.
	 * @param {number} 	indice, número de índice del array de divs. 
	 * 					tambien se puede pasar una celda('B7') o un objeto coordenadas {fila, columna}
	 */
	_get_baldosa(indice) {
		const my_div = this._at(indice);			// metodo de matriz_plana. asegura el indice correcto.
		if (!my_div) return null;		
		return my_div.elemento_div;
	}

	// 				 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// 				 * PARA TRABAJAR SOBRE LOS ESTILOS: Uso el objeto instanciado de la clase Work__ClassName
	// 				 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


	/** ✒️✒️
	 * ### 			1• Establece una clase única para todos los Divs de ■ Array_Base_Divs	(isContenedor = false)...byDef
	 * 							2• Establece una clase única para el contenedor de los Divs de ■Array_Base_Divs. (isContenedor = true)
	 * 							SOBRE-ESCRIBE A LA FUNCION QUE HEREDA.
	 * 
	 * @param {*} strClassName  (str), nombre de la clase css que se quiere asignar al className de los objetos div de [Array_Base_Divs].
	 * @param {*} isContenedor  false, pone todos los Divs sólo con esa clase.
	 * 							true, pone clase unica sólo al Contenedor.
	 */
	set_className(strClassName = '') {
		if (typeof (strClassName) != 'string') return false;
		if (strClassName == null || strClassName == '') return false;

		for (let i = 0; i < this.matriz_plana.length; i++) {
			if (this._set_className_unique(this.matriz_plana[i].elemento_div, strClassName) == true) {
				console.log('​ ✅​ ClassName - 🧮​​ ' + strClassName + ' ​​​​asignada con exito ' + ' ✔️');
			} else {
				console.log('❌ Error al asignar la claseName' + strClassName + ' al Div: ' + this.contenedor_div_x_div.id);
			}
		}
	}

	/** ✒️✒️
	 * ### 			1• Establece una clase única para todos los Divs de ■ Array_Base_Divs	(isContenedor = false)...byDef
	 * 							2• Establece una clase única para el contenedor de los Divs de ■Array_Base_Divs. (isContenedor = true)
	 * 							SOBRE-ESCRIBE A LA FUNCION QUE HEREDA.
	 * 
	 * @param {*} strClassName  (str), nombre de la clase css que se quiere asignar al className de los objetos div de [Array_Base_Divs].
	 * @param {*} isContenedor  false, pone todos los Divs sólo con esa clase.
	 * 							true, pone clase unica sólo al Contenedor.
	 */
	set_classname_container(strClassName = '') {
		if (typeof (strClassName) != 'string') return false;
		if (strClassName == null || strClassName == '') return false;
		//
			if (this._set_className_unique(this.contenedor_div_x_div, strClassName) == true) {
				console.log('✅​ Classname - 🧮​ <' + strClassName + '> ​​​​ asignada con exito al Contenedor: ' + this.contenedor_div_x_div.id);
			}else{
				console.log('❌ Error al asignar la Clase' + strClassName + ' al Contenedor: ' + this.contenedor_div_x_div.id);
			}
	}

	/**
	 * Pone todas las className de cada div creado con la configuracion básica de inicio:
	 * @param {*} isContenedor 
	 * @returns 
	 */
	className_reset(isContenedor = false) {
		if (typeof (isContenedor) != 'boolean') isContenedor = false;
		if (isContenedor == true) {
			super.className_reset(this.contenedor_div_x_div);
			return;
		}
		for (let i = 0; i < this.matriz_plana.length; i++) {
			super.className_reset(this.matriz_plana[i].elemento_div);
		}
	}

	/**
	 * @descriptionn Add una className al style del objeto pasado.
	 * @param {*} className_to_add (str) nombre de la clase que se quiere añadir al Contenedor o todos los elementos de  [ Array_Base_Divs ]
	 * @param {*} is_contenedor (bool) • True, actúa solo sobre el contenedor • False, actúa sobre todos los divs de [ Array_Base_Divs ]
	 */
	className_add(className_to_add = '') {
		if (typeof (className_to_add) 	!= 'string' || className_to_add.trim() == '') return false;
		for (let j = 0; j < this.matriz_plana.length; j++) {
			let arrClassNames = this._get_array_cadena(className_to_add);
			if (!arrClassNames) {
				return false
			} else {
				for (let i = 0; i < arrClassNames.length; i++) {
					this.add_className(this.matriz_plana[j].elemento_div, arrClassNames[i]);
				}
			}
		}
	}

	/** Añade una className a los divs desde 'from' hasta 'to'
	 * @param {String} className_to_add La className a añadir.
	 * @param {number} from el entero desde el que quiero añadir la className
	 * @param {number} to el entero hasta el que quiero añadir la className
	 */
	className_add_from_to(className_to_add = '', from = 0, to = parseInt(this.matriz_plana.length - 1)) {
		if (typeof (className_to_add) != 'string' || className_to_add == '') return false;
		if (from > to) return false;
		if (from >= this.matriz_plana.length) return false;
		if (typeof (from) != 'number' || from <= 0) from = 0;
		if (typeof (to) != 'number' || to <= 0) to = this.matriz_plana.length - 1;
		if (to >= this.matriz_plana.length) to = this.matriz_plana.length - 1;
		//Proceso. 
		for (let i = from; i <= to; i++) {
			this.add_className(this.matriz_plana[i].elemento_div, className_to_add);
		}
	}

	/**
	 * ### añade una className a los divs que tengan el tag x
	 * @param {*} ClassNameToAdd el nombre (o string) del className a añadir. 
	 * @param {*} TAG_To_Match el TagName a Buscar.
	 * @returns 
	 */
	className_add_bytag(ClassNameToAdd = '', TAG_To_Match = '') {
		if (typeof (ClassNameToAdd) != 'string' || ClassNameToAdd == '') return false;
		if (typeof (isContenedor) != 'boolean') isContenedor = false;
		//
		TAG_To_Match = this.tag_set_prefijo(TAG_To_Match);
		for (let i = 0; i < this.matriz_plana.length; i++) {
			if (TAG_To_Match == this.matriz_plana[i].HOW.Tag)
				this.add_className(this.matriz_plana[i].elemento_div, ClassNameToAdd);
		}
	}
	/**
	 * ### Elimina una className del style del objeto pasado.
	 * @param {*} strClassNameToDelete 
	 * @param {*} isContenedor 
	 * @returns 
	 */
	delete_className(strClassNameToDelete = '') {
		if (typeof (strClassNameToDelete) != 'string' || strClassNameToDelete == '') return false;
		for (let i = 0; i < this.matriz_plana.length; i++) {
			this.elimina_one_className(this.matriz_plana[i].elemento_div, strClassNameToDelete);
		}
	}
	/**
	 * ### Muestra un Log por consola con el Arbol de la Clase Matriz_to_MyDiv.
	 * @returns la cadena de texto con el log.
	 */
	wcn_arbol_log() {
		let txt = '\n=== VER ARBOL ClassNamer ====' +
			'\n=============================' +
			'\n\t| ID contenedor_div_x_div: ' + this.contenedor_div_x_div.id + '' +
			'\n\t| FAMILY: ' + this.family + '' +
			'\n\t| PATRON: ' + this.my_div_one.elemento_div.id + '' +
			'\n\t|---------------------------';

		txt += ('\n\tCONTENEDOR: ' + this.contenedor_div_x_div.id + '\t|| .CLASSNAME: < ' + this.get_className(this.contenedor_div_x_div) + ' >');
		txt += '\n\t-----------------------------';
		txt += '\n\t**  DIV \t\t**  TAG \t** FLAG \t** CLASSNAMES....\n';
		for (let i = 0; i < this.matriz_plana.length; i++) {
			txt += '\t|| ' + this.matriz_plana[i].elemento_div.id +
				'\t\t|| ' + this.matriz_plana[i].HOW.Tag +
				'\t\t|| ' + this.matriz_plana[i].HOW.Flag +
				'\t\t|| ' + this.get_className(this.matriz_plana[i].elemento_div.id) + '\n';
		}
		txt += '--- FIN -----------------------------------\n';
		return txt;
	}	

	//
	//=== GETTERS =============================================
	get Array()  { return this.matriz_plana; }						// la matriz de baldosas.
	get total()  { return this.matriz_plana.length; }				// Numero de elementos de la matriz.
	get total_baldosas()  { return this.matriz_plana.length; }		// Numero de elementos de la matriz.
	get family() { return this.family; }							// Nombre comun de las baldosas.
	get familia() { return this.family; }							// Nombre comun de las baldosas.
	get objContenedor() { return this.contenedor_div_x_div; }
	get contenedor()    { return this.contenedor_div_x_div; }		// Contenedor del Salon
	get div_maestro() { return this.div_maestro; }					// Si null  en dicc_config = document.body
	get maestro() { return this.div_maestro; }					// Si null  en dicc_config = document.body
	
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//                                  DICCIONARIO DE CONFIGURACION
// █████████████████████████████████████████████████████████████████████████████████████████████████████████ 
// █ Para gestionar la clase hay que cambiar los valores de este diccionario.  
// █ las variables que se corresponden en el index.html
// █████████████████████████████████████████████████████████████████████████████████████████████████████████ 
// static dicc_config = {
// 	family:                 'SALON',            // • (Oblig) Familia - Será el id de cada Baldosaa (SALON_0, SALON_1, SALON_2...)
// 	columnas:        10,                  // • (Oblig) Numero de columnas inicial.
// 	numero_baldosas:        100,                 // • (Oblig) Numero de baldosas Inicial.
// 	filas: 			10,                 // • (Oblig) Numero de filas inicial.	
// 	contenedor:             'Contenedor1',      // • (Opt) id del div donde voy a meter todas las Baldosas. ► Si '' , se mete sobre document.body 
	
// 	base_names_to_clone:    ['mesa', 'silla'],     // (Oblig)  'base_names_to_clone' son los Nombres-Base para generar ids de los elementos a clonar, aparte de las Baldosas del Salon)
// 	base_names_exit:        ['Puerta'],            // (Opt)    Salida/Puerta.... donde hay que llevar los elementos para eliminarlos.
	
// 	clone: {
// 		mesa_clone:        'mesa_menu',       // • (Oblig) id de mesa del Menu(div)  de donde se clonan mesas para situar en las Baldosas del Salon.
// 		silla_clone:       'silla_menu'       // • (Oblig) id de silla del Menu(div) de donde se clonan sillas para situar en las Baldosas del Salon.
// 	},
// 	clases_css : {
// 		contenedor: 'estiloSalon',        			// • (Oblig) className en div_x_div.css del Contenedor de Divs
// 		baldosas:   'estiloBaldosas'      			// • (Oblig) className en div_x_div.css de Las Baldosas 
// 	},
// 	rutas : {
// 		css_matriz:   './css/div_x_div.css',     // • (Oblig) ruta principal de estilo que rige la matriz con las clases 'estiloSalon'  y 'estiloBaldosas'
// 		css_salon:    './css/estilo_salon.css',  // • (Oblig) ruta de estilo del resto de la pagina..... propia de Salon
// 	}
// };


/** ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * ### HEREDA DE Matriz_to_MyDiv. Matriz_to_MyDiv Crea una matriz de elementos div que se pueden arrastrar y soltar.
 * Extiende la funcionalidad de Matriz_to_MyDiv para hacer drag and drop sobre los elementos matriz creados en Matriz_to_MyDiv.
 */
class Tablero_Drop extends Matriz_to_MyDiv{

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■ Breakpoints y factores de escala para diferentes dispositivos 
	// Teoría sobre breakpoints: son puntos de ruptura donde el diseño web cambia para adaptarse a diferentes tamaños de pantalla. 
	// Se basan en los anchos comunes de dispositivos y permiten crear experiencias óptimas para cada contexto de visualización.
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// STATIC PARAM 🧍‍♂️
	static dicc_responsive = {
		breakpoints: {
			mobile: 576,    // Dispositivos móviles (hasta 576px)
			tablet: 768,    // Tablets (de 577px a 768px)
			desktop: 992,   // Escritorios pequeños (de 769px a 992px)
			large: 1200,    // Pantallas grandes (más de 1200px), 
			x_large: 1600
		},
		scaleFactors: {
			mobile: 0.7,    // Factor de reducción para móviles
			tablet: 0.8,    // Factor ligeramente mayor para tablets
			desktop: 0.9,   // Tamaño normal para escritorios
			large: 1 ,      // Escala aumentada para pantallas grandes
			x_large: 1.1    // Escala aumentada para pantallas grandes
		}
	};
	/** ## Objeto que inicia el movimiento. */
	objeto_drag = null;
	/** ## Objeto donde cae el objeto_drag (una baldosa u objeto myDiv) */
	objeto_drop = null;			
	
	/** ## Cacha el data-id_key('mesa' o 'silla') del objeto que se mueve... {@link Tablero_Drop.dragStart} */
	id_key = '';				
	
	/**
	 * ### Tablero_Drop 
	 */
	constructor(family = '', id_div_contenedor = '', div_maestro = null, columnas = 8, filas = 8 ) {
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■■ LLAMADA AL PADRE /  CREA LA matriz_plana CON SUS ESTILOS.
		super(family, id_div_contenedor, div_maestro, columnas, filas);		
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■■ Gestor unificado de ratón y táctil
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■		
		// ■■ LISTENERS  ​👂​👂 PARA QUE LAS BALDOSAS DEL SALON SEAN DROP
		const items_baldosa = document.querySelectorAll(".estiloBaldosas");		
		if (items_baldosa && items_baldosa.length > 0) {	
			items_baldosa.forEach(baldosa => {
				baldosa.addEventListener("dragover", e => this.AllowDrop(e));  		// Permite que se suelten elementos en el contenedor.
				baldosa.addEventListener("drop", this.drop_over_matriz.bind(this));
			});
			console.log('✅ Tablero_Drop - ​👂​ Listener ► DROP BALDOSAS  • • • Loaded ✔️');
		}
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■		
		// ■■  ​👂​👂 LISTENERS EXIT : Papeleras.... preparado para que haya varias salidas(todos los data-id_key='exit') a todas les doto el mismo handler. 
		const exit = Array.from(document.querySelectorAll("[data-id_key]")).filter(el => el.dataset.id_key === 'exit');
		if (exit.length > 0) {	
			exit.forEach(el => el.addEventListener("dragover", this.AllowDrop));
			exit.forEach(el => el.addEventListener("drop", this.drop_exit.bind(this)));
			console.log('✅ Tablero_Drop - 👂​ Listener ► DROP PAPELERA  • • • Loaded ✔️');
		}

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■■ RESPONSIVE
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ​👂​👂 opciones para cada tipo de screen(movil, tablet, escritorio)
		window.addEventListener('load', this._when_resize.bind(this));
		console.log('✅ Tablero_Drop - RESPONSIVE ​🔳​  on_load • • • Loaded ✔️');				
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// 👂​👂 REDIMENSIONA la Ventana(resize) • • • Ejecuta _set__scale_factor, con retardo de 250ms. 
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ​​• ​(Evita sobre-redimensionados innecesareos).
		window.addEventListener('resize', this._debounce(this._when_resize.bind(this), 250));
		console.log('✅ Tablero_Drop - RESPONSIVE ​🔳​  on_resize • • • Loaded ✔️');

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		//  ​👂​👂 Connfigura DRAG (con touchpad y raton)  del MENU HTML 
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ​​​​​​​const items_html_to_matriz = document.querySelectorAll(".menu_to_clone");		
		// ​​​​​​​if (items_html_to_matriz.length > 0) {	
		// ​​​​​​​	items_html_to_matriz.forEach(el => el.addEventListener("dragstart", this.dragStart.bind(this)));
		// ​​​​​​​}
		const items_html_to_matriz = document.querySelectorAll(".menu_to_clone");
		if (items_html_to_matriz.length > 0) {
			items_html_to_matriz.forEach(el => {
				
				this._add_listeners_movimiento(el);
				// el.addEventListener("dragstart", this.dragStart.bind(this));
			});
		}
		console.log('✅ Tablero_Drop - Touch-Raton ​​👆​🖱️​ • • • Loaded ✔️');

	}
	/**
	 * ### Permite que se suelten elementos en el contenedor.
	 * @param {*} ev  evento de inicio de arrastre de un objeto.
	 * @returns 
	*/
	AllowDrop(ev) {
		ev.preventDefault();
	}

	/**
	 * ### KISS: Detecta si el tipo es mesa o silla.  Sirve para validar
	 */
	// _es_mesa_silla(tipo = '') {
	// 	const tipo_normalizado = `${tipo}`.toLowerCase();
	// 	return tipo_normalizado === 'mesa' || tipo_normalizado === 'silla';
	// }

	/**
	 * ### KISS: Bloquea o desbloquea el movimiento del sidebar.
	 */
	// _set_bloqueo_sidebar(bloqueado = false) {
	// 	if (!this.Side_Elementos?.set_bloqueo_movimiento) return;
	// 	this.Side_Elementos.set_bloqueo_movimiento(bloqueado);
	// }

	/**
	 * ### KISS: Inicia el bloqueo del sidebar durante un drag de mesa/silla.
	 */
	// _iniciar_bloqueo_sidebar(objeto_drag = null) {
	// 	if (!this._es_mesa_silla(this.data__tipo)) return;
	// 	this._set_bloqueo_sidebar(true);
	// 	if (objeto_drag) {
	// 		objeto_drag.addEventListener('dragend', () => this._set_bloqueo_sidebar(false), { once: true });
	// 	}
	// }
	/**
	 * ### SE PRODUCE CUANDO EMPIEZA EL MOVIMIENTO DE UN OBJETO DRAG ( draggable = true )
	 *              • Se trata de guardar el objeto que se mueve mediante ev.dataTransfer._setData("text", id_objeto_drag) 
	 *              • Cuando este objeto_drag caiga en un objeto drop se tiene que recuperar con ev.dataTransfer.getData_("text")
	 *              • "text" es cualquier cosa xEjemplo "id_objeto_mueve", y además se puede poner mas de uno.
	 * @see 
	 * @param {*} ev   evento de inicio de arrastre de un objeto.
	 * @returns 
	 */
	dragStart(ev) {
		const new_obj_drag = ev.target;                         // ■ cacha el objeto que se mueve(drag).  
		if(!new_obj_drag || !new_obj_drag?.dataset?.id_key || !new_obj_drag?.id){
			console.log("❌ ERROR DRAGSTART")
			return null;
		}
		// ■■ 
		this.objeto_drag = new_obj_drag;
		this.id_key = new_obj_drag.dataset.id_key;

		// ■■ Bloquea el movimiento del sidebar si movemos una mesa o silla.
		// this._iniciar_bloqueo_sidebar(new_obj_drag);
		
		// ■■ ESTABLECE/GUARDA EL ID DEL OBJETO DRAG
		ev.dataTransfer.setData("drag_id", this.objeto_drag.id);      	// ■ dataTransfer guarda en la transacción d&d un dato "text" con el id del drag.
		// ■■ GUARDA EL id_key ('mesa', 'silla', 'taburete') en catalogo.
		ev.dataTransfer.setData("id_key", this.id_key); 
		
		const ds_t = Catalogo.get(this.objeto_drag.dataset.id_key)
	}

	/**
	 * ### Maneja el evento de soltar un objeto en el salon
	 * @param {*} ev   evento de soltar objeto en un salon.
	 */
	drop_over_matriz(ev) {
		ev.preventDefault();                   // Evita el comportamiento por defecto del navegador al soltar un objeto.                                     
		try {
			
			// ■■■■■■■■■■■■■■■■■■■■■■■■ 
			// CACHA  DROP
			const objDrop = ev.target;                              // ► CACHA el objeto del evento Drop... del div donde cae.
			if (!objDrop) { console.log( `❌ ERROR drop_over_matriz ■ id-drop:`); return false; }
			this.objeto_drop = objDrop;                             
	
			// ■■■■■■■■■■■■■■■■■■■■■■■■ 
			// CACHA DRAG
			// • • • En DragStart tiene que haber un ev.dataTransfer._setData("text", id_drag) • • • "text" es cualquier cosa xEjemplo "prueba"
			const id_obj_drag = ev.dataTransfer.getData("drag_id");       // Cacha el id del objeto que se mueve(silla o mesa), que se ha arrastrado desde el menu o desde el salon.
			const objDrag = document.getElementById(id_obj_drag);   // ► CACHA el objDrag
			if (!objDrag ) { console.log( `❌ ERROR ► drop_over_matriz ■ id-drag: No hay objeto Drag`); return false; }
	
			// ████████████████████████  
			// LOGICA DROP 
			// ■■ No permite ir a una CELDA OCUPADA.
			if (this.is_baldosa_vacia(objDrop) == false) {
				console.log(`⚠️ ${objDrop.id} está OCUPADA. `); 
				// this._set_bloqueo_sidebar(false);
				return false; 
			}
			
			// ■■ Si el objeto que se mueve es del MENU, se clona en la matriz. Si no, es un movimiento Interno.
			if (objDrag.classList.contains("menu_to_clone")) {
				
				this.elemento_nuevo_to_Salon(objDrag, objDrop);			
	
			}else if (objDrag.classList.contains("class_onplay")) {    // ► Esta clase sólo se asigna a los objetos en juego dinámicamente.
	
				this.movimiento_interno_Salon(objDrag, objDrop);
	
			}else{
				throw Error('❌ drop_over_matriz: No se puede Soltar este objeto en el Saloon');
			}   
	
			// ■■■■■■■■■■■■■■■■■■■■■■■■ GENERA EL N-S-E-W  DEL SALON.
			this._onplay_scan_salon();      
			// this._set_bloqueo_sidebar(false);
			return true;

		} catch (error) {
			console.log(error);
			return false;			
		}finally{
			// this._set_bloqueo_sidebar(false);
		}
		
	}

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

	/**
	* ##  • Maneja el evento de soltar un objeto en el elemento-exit (papelera).
	*	• Quién llega a la  Papelera:
	*	...Se tienen que soltar las sillas o mesas colocadas en el 'Menu Nav-Bar'
	*	► ev.dataTransfer.getData_("text") ,  Id del elemento drap(silla_menu, mesa_menu, o #SillaEnSalon, #MesaEnSalon ).
	*	► ev.target , es el objeto, 
	* @param {*} ev 
	*/
	drop_exit(ev) {
		if (ev && ev.preventDefault) {
			ev.preventDefault();
		}
	
		// ■■ Cacha el objeto que se mueve(objDrag) y el objeto donde cae(objDrop)(Papelera)
		let id_obj_drag = null;
		if (ev && ev.dataTransfer) {
			id_obj_drag = ev.dataTransfer.getData("drag_id");
		} else if (this.objeto_drag) {
			id_obj_drag = this.objeto_drag.id;
		}else{
			return false;
		}
		
		const objDrag = document.getElementById(id_obj_drag);
		
		const objDrop = ev ? ev.target : null;

		// ■■ Validación: Si no tenemos el objeto drag o la papelera, retornamos false
		if (!objDrag || !objDrop) {
			console.warn("⚠️ drop__exit: No se encontró objeto drag o papelera");
			return false;
		}

		// ■■ Los Que No pueden venir son los Objetos del MENU
		// ■■ Tengo que acceder al diccionario de configuracion
		if(objDrag.classList.contains("menu_to_clone")){
			console.warn("⚠️ drop__exit: No se pueden eliminar elementos del menú");
			return false;
		}
		// ■■ Venga de quien venga, la puerta se lo traga y lo escupe. 
		objDrop.appendChild(objDrag);
		objDrop.removeChild(objDrag);		

		// this._set_bloqueo_sidebar(false);
		
		// ■■ PUEDO ACTUALIZAR O NO LA LISTA-ONPLAY.
		this._onplay_scan_salon(); 
		// this.onplay_read(lista_onplay);
		 
		// ■■■■■■■■■■■■■■■■■■■■■■■■ LOG 🖥️
		console.log(`▶️ Drop EXIT ■■■ ${objDrag.id} ■■■ :) OUT OFF PLAY`);
		
		// ■■ Retornar true para indicar éxito
		return true;
	}

	/**
	 *  ​👂​👂 Listeners para hacer las baldosas dropables.
	 */
	_set_all_dropable(){
		const items_baldosa = document.querySelectorAll(".estiloBaldosas");		
		if (items_baldosa && items_baldosa.length > 0) {	
			// Quita los Listeners
			items_baldosa.forEach(baldosa => {
				baldosa.removeEventListener("dragover", this.AllowDrop);  		// Permite que se suelten elementos en el contenedor.
				baldosa.removeEventListener("drop", this.drop_over_matriz);
			});
			// Pone los Listeners
			items_baldosa.forEach(baldosa => {
				baldosa.addEventListener("dragover", e => this.AllowDrop(e));  		// Permite que se suelten elementos en el contenedor.
				baldosa.addEventListener("drop", this.drop_over_matriz.bind(this));
			});
			// console.log('✅ Tablero_Drop - ​👂​ Listener ► DROP BALDOSAS • • • Loaded :)');
		}
	}

	/** SIN USO
	 * ###  ​👂​👂 Hace que un elemento sea un elemento sobre el que se pueden depositar objetos drag y 
	 * 				establece la funcion que se tiene que ejecutar cuando esto ocurre.
	 * @param {*} elemento_dom , Generalmente un div (mydiv.elemento_div)
	 */
	_set_elemento_dropable(elemento_dom){
		elemento_dom.removeEventListener('dragover', this.AllowDrop);
		elemento_dom.removeEventListener('drop', this.drop_over_matriz);

		elemento_dom.addEventListener('dragover', this.AllowDrop);
		elemento_dom.addEventListener('drop', this.drop_over_matriz);				
	}
	
	/** SIN USO.
	 * ### Añade una baldosa al salon. Una Baldosa es un objeto MyDiv con un div elemento_div dropable.
	 */
	_add_baldosa(){
		const new_mydiv = this.add_mydiv();
		if (!new_mydiv) return false;
		this._set_elemento_dropable(new_mydiv.elemento_div);
		return new_mydiv;
	}
	/**
	 * Una Baldosa es un objeto MyDiv con un div elemento_div dropable y con estilo.
	 * @param {Integer} numero_baldosas Normalmente será filas x columnas
	 */
	set_total_baldosas(numero_baldosas){
		try {
			this._set_total_mydivs( numero_baldosas );	// ► Pone o quita divs para obtener el total 
			this.set_className('estiloBaldosas');		// ► Añade la clase estiloBaldosas.
			this._set_all_dropable();					
			return true;
		} catch (error) {
			// console.log(`❌​ ERROR set_total_baldosas ${error.msg}`);
			return false;			
		}
	}

	/**  
	 * ## Desde el MENU, Movemos un Objeto Drag a una Baldosa de la Matriz.
	 * @param {object} item_menu  El nodo de la silla a arrastrar.(mesa o silla del navbar o cualquier menu.)
	 * @param {myDiv}  baldosa_matriz  El nodo/objeto de la baldosa donde se va (myDiv.elemento_div)
	 * @returns {object}  el elemento nuevo creado (la silla), que ha sido llevada del menu a la matriz_plana (El Salon)
	 */
	elemento_nuevo_to_Salon(item_menu = null, baldosa_matriz = null) {

		// ■■ Verificamos que la baldosa de destino esté vacía
		if (this.is_baldosa_vacia(baldosa_matriz) == false) return
		
		const idkey = item_menu.dataset.id_key;
		// ■■ Creamos un Clon del item del MENU. El id que se asigna es un secuencial del dataset _tipo(del <data__tipo>)
		const clon_item = item_menu.cloneNode(true);                  
		clon_item.id = Herramientas._get_secuencial_dom(idkey);				
		clon_item.dataset.id_key = idkey;	// mesa, silla, taburete
		clon_item.title = clon_item.id;
		clon_item.style.visibility = 'visible';
		// ■■ CAMBIA DE CLASE PARA NO HEREDAR EL ESTILO DEL MENU....
		clon_item.className = "";
		clon_item.classList.add('class_onplay');
		
		// ■■ ​👂​👂 Hace DRAGGABLE el clon del item del menu  para ratón y táctil
		this._add_listeners_movimiento(clon_item);
		// ■■ 
		baldosa_matriz.appendChild(clon_item);           
		// ■■ LOG  🖥️
		// console.log(`▶️ ${clon_item.id} ► Padre: ${clon_item.parentNode.id} ■ clase: ${this.get_className(clon_item)} ■ data-id_key(html): ${data__tipo}\n`);
		return clon_item;
	}

	/** 
	 * ### Mueve una silla o mesa del salon a una baldosa del salon.
	 * En un movimiento interno generalista tendré que tener en cuenta si:
	 * 1. La baldosa de destino esté vacía o llena.
	 * 2. Si la baldosa está vacía se mueve sin problema.
	 * 3. Si la baldosa está llena, se puede: 
	 * 		a. comer ficha(chess), 
	 * 		b. cambiar una ficha por otra(toggle), 
	 * 		c. acumular fichas , 
	 * 		d. duplicar ficha  , 
	 * 		e. No se permite (esta opción, damas...)
	 */
	movimiento_interno_Salon(obj_drag = null, obj_drop = null) {
		const baldosa_origen  = obj_drag.parentNode;
		const baldosa_destino = obj_drop;

		if (!baldosa_origen || !baldosa_destino) return false;
		
		baldosa_destino.appendChild(obj_drag);

		return true;
	}

	/** ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	* ### Verifica si un objeto-drop(baldosa) está vacío o tiene una mesa o una silla. 
	* ### •  obj_drop.children.length != 0                    ► significa que el obj_drop tiene hijos.... puede ser Baldosa
	* ### •  obj_drop.hasChildNodes()                         ► El div ya tiene contenido (imagen u otro elemento)
	* ### •  obj_drop.parentNode != this.objContenedor   ► significa que el padre del obj_drop no es el Contenedor del Saloon ('Contenedor1') 
	* 														... tiene que ser [silla] o [mesa] PQ el padre de las [Baldosas] del Saloon es siempre 'Contenedor1'    
	* @param {*} obj_drop (div) es el objeto div donde se quiere hacer drop.
	* ### [RETORNO]   1• True, la valdosa está vacía. 2• False, la baldosa no está vacía.
	*/
	is_baldosa_vacia(obj_drop = null) {
		if (!obj_drop) return false;

		if (obj_drop.children.length != 0 || obj_drop.hasChildNodes() || obj_drop.parentNode != this.objContenedor) {
			return false;
		} else {
			return true;
		}
	}

	/** ## Elimnia un elemento drag que se haya metido en la baldosa.
	 * ### • 'obj_drop' es el div de la baldosa ó myDiv.elemento_div
	 * ### • Al llamar a replaceChildren sin argumentos, se eliminan todos los hijos de forma atómica y eficiente.	 */
	api_vaciar_baldosa(obj_drop){	
		if (obj_drop && obj_drop instanceof HTMLElement) {        
        	obj_drop.replaceChildren();
    	}
	}

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ LISTA ON-PLAY
	// ██████████████████████████████████████████████████████████████████████████████████ 

	/** 
	 * ### Saca por consola un informe de todos los MyDiv's onplay...los que tienen elementos hijos.
	 * */
	onplay_read(lista_mydivs_onplay){
		// console.log('\nON PLAY • • • READ: ');
		try {
			if (!lista_mydivs_onplay){
				lista_mydivs_onplay = this._get_mydivs_onplay();
				if (!lista_mydivs_onplay || lista_mydivs_onplay.length === 0) 
					return false;                        // Si no hay elementos, retorna false.
			}
			lista_mydivs_onplay.forEach((my_div, indice) =>{
				const id_contenido = this._get_id_contenido_baldosa(my_div.elemento_div);
				console.log(`▶️ indice: ${indice} ■ID: ${my_div.elemento_div.id} ■CONTENIDO: ${id_contenido}      n•${my_div.scan.n} s•${my_div.scan.s} e•${my_div.scan.e} w•${my_div.scan.w} ne•${my_div.scan.ne} nw•${my_div.scan.nw} se•${my_div.scan.se} sw•${my_div.scan.sw} `);
			});			
		} catch (error) {
			 console.log('❌ Error onplay_read: ' + error);
			 return false;
		}
	}

	/** 
	 * ### Scanner n-s-e-w actualizado de los elementos onplay del Salon. 	*/
	_onplay_scan_salon(){    
		try {
			const lista_baldosas_onplay = this._get_mydivs_onplay();
			if (!lista_baldosas_onplay) return null;
			
			// ■■ Recorre la lista de my_divs que están en juego sólamente y actualiza el escaneo N-S-E-W
			lista_baldosas_onplay.forEach((my_div) => {
				this.scanner_nsew(my_div.elemento_div);			// Se pasa el div de la baldosa
			});
			return lista_baldosas_onplay; 			
		} catch (error) {
			console.log(`Error::: Tablero_Drop ::: onplay_scan_salon ::: msg: ${error}`);
			return null;
		}
	}

	/** 
	 * ### Devuelve un array con los elementos que están en juego (onplay) en el Tablero */
	_get_mydivs_onplay() {
		// const array_app = this.get_array_myDivs();
		const array_app = this.matriz_plana;
		if (!array_app || array_app.length <= 0) return false; // Si no hay Base_Divs, retorna false.
		
		// Dame sólo los que tienen contenido(mesa o silla), que son los que están en el salon.
		const lista_baldosas_onplay = array_app.filter(my_div => my_div.elemento_div.hasChildNodes());
		if (lista_baldosas_onplay.length === 0) return false;                        // Si no hay elementos, retorna false.
		
		return lista_baldosas_onplay;
	}

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ RE-SIZES ►◄ REDIMENSIONADO DE LA VENTANA - RESPONSIVE
	// ██████████████████████████████████████████████████████████████████████████████████ 
	/** 
	 * ### Ajusta el FACTOR DE ESCALA('--scale-factor') según el numero de columnas de pantalla (window.innerWidth)
	*/
	_when_resize() {
		// Obtiene el num_cols actual de la ventana del navegador
		const width = window.innerWidth;		
		// Establece factor de escala por defecto (para pantallas grandes)
		let scaleFactor = 1;		
		// Determina el factor de escala según el num_cols de pantalla
		if (width < Tablero_Drop.dicc_responsive.breakpoints.mobile) {
			scaleFactor = Tablero_Drop.dicc_responsive.scaleFactors.mobile;
		} else if (width < Tablero_Drop.dicc_responsive.breakpoints.tablet) {
			scaleFactor = Tablero_Drop.dicc_responsive.scaleFactors.tablet;
		} else if (width < Tablero_Drop.dicc_responsive.breakpoints.desktop) {
			scaleFactor = Tablero_Drop.dicc_responsive.scaleFactors.desktop;
		}else if (width < Tablero_Drop.dicc_responsive.breakpoints.large){
			scaleFactor = Tablero_Drop.dicc_responsive.scaleFactors.large;
		} else {
			scaleFactor = Tablero_Drop.dicc_responsive.scaleFactors.x_large;
		}
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■■■    Aplica el factor de escala como variable CSS personalizada 
		document.documentElement.style.setProperty('--scale-factor', scaleFactor);
	}

	/** 
	 ###    Función _debounce para limitar la frecuencia de ejecución de eventos
	Teoría sobre debouncing: Técnica esencial para optimización de rendimiento:
	• Problema: Eventos como 'resize' se disparan decenas de veces por segundo
						• Solución: Debounce limita la ejecución a una vez cada X milisegundos
						• Beneficio: Reduce la carga de procesamiento sin afectar la experiencia de usuario
	*/
	_debounce(func, wait) {
		let timeout;  // Almacena la referencia al timeout
		
		// Retorna una función que será llamada por el event listener
		return function () {
			const context = this;       // Conserva el contexto 'this'
			const args = arguments;     // Conserva los argumentos
			
			// Limpia el timeout anterior si existe
			clearTimeout(timeout);
			
			// Establece un nuevo timeout
			timeout = setTimeout(() => {
				func.apply(context, args);  // Ejecuta la función después del tiempo de espera
			}, wait);
		};
	}

}



/**
 * ### Tablero_Touch unifica drag&drop de ratón y eventos táctiles directamente sobre el tablero.
 * Hereda de Tablero_Drop para reutilizar toda la lógica de movimiento ya existente.
 */
class Tablero_Touch extends Tablero_Drop {
	constructor(family = '', id_div_contenedor = '', div_maestro = null, columnas = 8, filas = 8 ) {
		super(family, id_div_contenedor, div_maestro, columnas, filas);
		this.touchState = { draggedElement: null, activeDropTarget: null };
		this.tapThreshold = 10;
		this._touchCancelRegistrado = false;
	}

	get_coordenadas_evento(evento){
		if (!evento) return { x: 0, y: 0 };
		const touch = (evento.touches && evento.touches[0]) || (evento.changedTouches && evento.changedTouches[0]);
		if (touch) return { x: touch.clientX, y: touch.clientY };
		return { x: evento.clientX || 0, y: evento.clientY || 0 };
	}

	

	/** ### Agrega los listeners para los eventos de toque y ratón 	*/
	_add_listeners_movimiento(elemento){
		if (!elemento) return;
		// Usamos una propiedad en memoria (no dataset) para no contaminar el HTML
		// ni copiar accidentalmente la marca al clonar nodos del menú.
		if (elemento._touchRatonReady === true) return;
		elemento.draggable = true;
		elemento.style.touchAction = 'none';
		elemento.addEventListener('dragstart',  this.dragStart.bind(this));
		elemento.addEventListener('touchstart', this.handleTouch_start.bind(this), { passive: false });
		elemento.addEventListener('touchmove',  this.handleTouch_movimiento.bind(this), { passive: false });
		elemento.addEventListener('touchend',   this.handleTouch_end.bind(this), { passive: false });
		elemento._touchRatonReady = true;
		if (!this._touchCancelRegistrado) {
			window.addEventListener('touchcancel', this.finalizarArrastre.bind(this));
			this._touchCancelRegistrado = true;
		}
	}

	/** ### Finaliza el arrastre del elemento táctil. */
	finalizarArrastre() {
		this._cleanup_touch_preview();
		this._reset_touch_state();
		// this._set_bloqueo_sidebar(false);
	}

	/** ### Crea una vista previa del elemento arrastrado. */
	_create_drag_preview(elemento, rect){
		if (!elemento || !rect) return null;
		const preview = elemento.cloneNode(true);
		preview.removeAttribute('id');
		preview.setAttribute('aria-hidden', 'true');
		preview.style.position = 'fixed';
		preview.style.left = '0px';
		preview.style.top = '0px';
		preview.style.width = `${rect.width}px`;
		preview.style.height = `${rect.height}px`;
		preview.style.margin = '0';
		preview.style.zIndex = '9999';
		preview.style.pointerEvents = 'none';
		preview.style.boxSizing = 'border-box';
		preview.style.transformOrigin = 'top left';
		preview.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
		preview.style.willChange = 'transform';
		document.body.appendChild(preview);
		return preview;
	}

	/** ### Obtiene la baldosa correspondiente a un punto específico 	
	 * @param {number} x Coordenada X del punto.
	 * @param {number} y Coordenada Y del punto.
	 * @param {HTMLElement|null} fallbackTarget Elemento alternativo para buscar la baldosa si no se encuentra con elementsFromPoint.
	 * @returns {HTMLElement|null} La baldosa encontrada o null si no se encuentra ninguna
	*/
	_get_baldosa_from_point(x, y, fallbackTarget = null){
		const elements = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [];
		const baldosa = elements.find(elemento => elemento.classList && elemento.classList.contains('estiloBaldosas'));
		if (baldosa) return baldosa;
		if (fallbackTarget && fallbackTarget.closest) return fallbackTarget.closest('.estiloBaldosas');
		return null;
	}

	/** ### Obtiene el contenedor de caída real para un elemento detectado 	*/
	_obtener_contenedor_drop_real(elementoDetectado) {
		if (!elementoDetectado) return null;
		if (elementoDetectado.dataset && elementoDetectado.dataset.id_key) return elementoDetectado;
		const contenedorExit = elementoDetectado.closest('[data-id_key]');
		if (contenedorExit && contenedorExit.dataset.id_key) return contenedorExit;
		if (elementoDetectado.classList && elementoDetectado.classList.contains('estiloBaldosas')) return elementoDetectado;
		const contenedorBaldosa = elementoDetectado.closest('.estiloBaldosas');
		if (contenedorBaldosa) return contenedorBaldosa;
		return null;
	}

	/** ### Mueve la vista previa del elemento arrastrado 	*/
	_move_drag_preview(x, y){
		const preview = this.touchState.dragPreview;
		if (!preview) return;
		const left = x - this.touchState.offsetX;
		const top = y - this.touchState.offsetY;
		preview.style.transform = `translate3d(${left}px, ${top}px, 0)`;
	}

	/** ### Maneja el evento de inicio del toque (touch start) 	*/
	handleTouch_start(evento){
		if (!evento) return;
		if (evento.cancelable) evento.preventDefault();
		const { x, y } = this.get_coordenadas_evento(evento);
		
		const objeto_drag = evento.currentTarget;
		
		console.log(`${objeto_drag.id} ■ touch_start at (${x}, ${y})`);

		const rect = objeto_drag.getBoundingClientRect();
		const offsetX = x - rect.left;
		const offsetY = y - rect.top;
		const preview = this._create_drag_preview(objeto_drag, rect);
		
		this.objeto_drag = objeto_drag;
		this.id_key = objeto_drag.getAttribute('data-id_key') || objeto_drag.dataset.id_key || '';
		
		// if (this._es_mesa_silla?.(this.data__tipo)) this._set_bloqueo_sidebar(true);
		
		const previousVisibility = objeto_drag.style.visibility;
		objeto_drag.style.visibility = 'hidden';
		this.touchState = { draggedElement: objeto_drag, 
							activeDropTarget: null, 
							startX: x, 
							startY: y, 
							lastX: x, 
							lastY: y, 
							offsetX, 
							offsetY, 
							dragPreview: preview, 
							previousVisibility, 
							rafId: null, 
							pendingMove: null };
	}

	/** ### Maneja el evento de movimiento del toque (touch move) 	*/
	handleTouch_movimiento(evento) {
		if (!evento || !this.touchState.draggedElement) return;
		if (evento.cancelable) evento.preventDefault();
		const { x, y } = this.get_coordenadas_evento(evento);
		this.touchState.lastX = x;
		this.touchState.lastY = y;
		this.touchState.pendingMove = { x, y };
		if (!this.touchState.rafId) {
			this.touchState.rafId = requestAnimationFrame(() => {
				if (this.touchState.pendingMove) {
					const { x: moveX, y: moveY } = this.touchState.pendingMove;
					this._move_drag_preview(moveX, moveY);
				}
				this.touchState.rafId = null;
			});
		}
		this.touchState.activeDropTarget = document.elementFromPoint(x, y);
	}

	/** ### Maneja el evento de finalización del toque (touch end) 	*/
	handleTouch_end(evento) {
		if (!this.touchState.draggedElement) return;
		const el = this.touchState.draggedElement;
		const coordenadas = this.get_coordenadas_evento(evento);
		let x = coordenadas.x;
		let y = coordenadas.y;
		if (!x && !y) { x = this.touchState.lastX || 0; y = this.touchState.lastY || 0; }
		const deltaX = x - this.touchState.startX;
		const deltaY = y - this.touchState.startY;
		const isTap = Math.hypot(deltaX, deltaY) <= this.tapThreshold;
		if (this.touchState.dragPreview) this.touchState.dragPreview.style.display = 'none';
		const elementoDetectado = document.elementFromPoint(x, y);
		const targetReal = this._obtener_contenedor_drop_real(elementoDetectado);
		if (this.touchState.dragPreview) this.touchState.dragPreview.style.display = 'block';
		if (isTap) {
			this._cleanup_touch_preview();
			this._reset_touch_state();
			queueMicrotask(() => el.click());
			// this._set_bloqueo_sidebar(false);
			return;
		}
		const syntheticEvent = this._buildSyntheticDropEvent(targetReal, el, { x, y });
		let dropExitoso = false;
		if (targetReal) {
			const isExit = targetReal.dataset && targetReal.dataset.id_key === 'exit';
			if (isExit && this.drop_exit) {
				syntheticEvent.target = targetReal;
				dropExitoso = this.drop_exit(syntheticEvent);
			} else {
				const baldosaDestino = this._get_baldosa_from_point(x, y, targetReal) || targetReal;
				if (this.drop_over_matriz) {
					syntheticEvent.target = baldosaDestino;
					dropExitoso = this.drop_over_matriz(syntheticEvent);
				}
			}
		}
		this._cleanup_touch_preview();
		if (dropExitoso) el.style.visibility = 'visible';
		this._reset_touch_state();
		// this._set_bloqueo_sidebar(false);
	}

	_reset_touch_state(){
		this.touchState = { draggedElement: null, activeDropTarget: null, startX: 0, startY: 0, lastX: 0, lastY: 0, offsetX: 0, offsetY: 0, dragPreview: null, previousVisibility: '', rafId: null, pendingMove: null };
	}

	_cleanup_touch_preview(){
		if (this.touchState.rafId) cancelAnimationFrame(this.touchState.rafId);
		if (this.touchState.dragPreview) this.touchState.dragPreview.remove();
		if (this.touchState.draggedElement) this.touchState.draggedElement.style.visibility = this.touchState.previousVisibility || '';
	}

	/** ### Construye un evento sintético de tipo 'drop' para simular el comportamiento de arrastrar y soltar en dispositivos táctiles.*/
	_buildSyntheticDropEvent(target, draggedElement, coords = {}){
		const id_key = (draggedElement && draggedElement.getAttribute('data-id_key')) || objeto_drag.dataset.id_key || '';
		const { x = 0, y = 0 } = coords;
		return {
			preventDefault: () => {},
			target,
			clientX: x,
			clientY: y,
			dataTransfer: {
				getData: (key) => {
					if (key === 'drag_id') return draggedElement ? draggedElement.id : '';
					if (key === 'id_key') return id_key;
					return '';
				}
			}
		};
	}
}

// ████████████████████████████████████████████████████████████████████████████████████████████████████████████
/** 
 * ### SOBREESCRIBE Metodos Tablero_Drop y hace el comportamiento de Salon: 
 * ##### • Los elementos que pasan a jugar al Salon se selccionan de un Menu Externo al Salón
 * ##### • Los elementos de un salon son: sillas (o clientes) y mesas (o reservas)
 * ##### • RESERVAS son asociaciones de mesas y sillas. Se pueden juntar varias mesas para formar 1 reserva
*/
class e_Salon extends Tablero_Touch {
	/** ### Clase que Se encarga de la configuracion incial del Salon y metodos asociadas al Funcionamiento */
	CFG = null; 
	/** ### Clase que se encarga del Registro y Log.  */
	LogIn = null;	
	/** ### Clase que Hace el CRUD sobre la Base de Datos. */
	crud = null; 
	/** ### Alergias */
	MSG_A=null;
	/** ### Mensajes */
	MSG_M=null;
	
	/** ### Diccionario principal de configuración. Se valida en el constructor de e-Salon. Contiene los datos de la app. */
	dicc_config = null;	
	/** ### Array de diccionarios de reservas. LOGICA DEL NEGOCIO DE SALON ► reservas = [ {'mesas':[], 'sillas':[]} , {...} ] */
	reservas = []; 	
	
	/** ### Modo Reserva ON/OFF. 
	 * #### Se Desactiva cuando se hace doble click fuera de esa reserva {@link _desactivar_modo_reserva}. 	 */
	is_mode_reserva = null;        	
	
	last_reserva_clicked = -1;	// el ultimo click sobre que reserva.... indice en reservas

	// ### limitado: Según el ancho del dispositivo se muestran 8,16,24 columnas. 
	// ###			 dicc_config no tiene que poner columnas...necesita re-posicionar.
	// ### 		 ACTUAL MODELO EN DESARROLLO, POR ESO SE PONE POR DEFECTO EN EL CONSTRUCTOR.
	//
	// ### scrolado: Puedes poner tantas columnas como quieras pero según el ancho del dispositivoo, el contenedor scrolará al ancho especificado.
	// ### apilado:  No tiene limite de columnas y no hace scroll, es el usuario quien tiene la responsabilidad.
	static MODELOS_SALON = ['limitado', 'scrolado', 'apilado'];

	/**
	 * ### Gestiona Reservas ,Mensajes y posiciones de un Tablero ó Salon.
	 * #### • Hereda de las clases Tablero_Touch y Div_x_Div q crean las Baldosas del Salon con Métodos DROP.
	 * ####	• App Cliente Servidor: clases Login | Configuracion | CRUD
	 * @param {object} dicc_config 
	 * ```javascript
	 * ```  */
	constructor(dicc_config = {}, modelo_salon='limitado'){

		// ┌•• Detección de Hardware/Entorno (Lo primero, porque define la configuración)
		// 	   entorno = {tipo, es_tactil, ancho_ventana}
		// ┌•• Determinar DIMENSIONES INICIALES dependiendo del tipo/ancho de la pantalla. 
		// 	   limites = { columnas:{min:8, max:30}, filas: {min:8, max:100} }
		// ┌•• Determinar LIMITES MAX MIN de columnas y filas dependiendo del tipo/ancho de la pantalla. 
		// 	   dimesion_inicial = {filas, columnas}
		const [entorno, dimesion_inicial, limites] = e_Salon._quien_soy();

		// ┌•• Esto tiene que estar antes de super para definir cuantas columnas tiene nuestro salon.
		// • limitado: Según el ancho del dispositivo se muestran 8,14,20 columnas. dicc_config no tiene que poner columnas...necesita re-posicionar
		// • scrolado: Puedes poner tantas columnas como quieras pero según el ancho del dispositivoo, el contenedor scrolará al ancho especificado.
		// • apilado:  No tiene limite de columnas y no hace scroll, es el usuario quien tiene la responsabilidad.
		let columnas_aplicadas = null;
		let b_scroll = false;
		
		// ⚠️⚠️ Estamos en modelo 'limitado' de momento. ⚠️⚠️
		if(modelo_salon==='limitado'){
			columnas_aplicadas = dimesion_inicial.columnas;
			b_scroll = false;
		}else if(modelo_salon === 'scrolado'){
			columnas_aplicadas = dicc_config.columnas;
			b_scroll = true;
		}else if(modelo_salon=== 'apilado'){
			columnas_aplicadas = dicc_config.columnas;
			b_scroll = false;
		}else{
			console.log('modelo_salon No registrado!, columnas puestas = 8')
			columnas_aplicadas = 8;
		}
								
		// por la dimension_inicial Limito el Numero de Columnas en funcion del dispositivo(Movil:8 columnas, Tablet: 14 columnas, Escritorio: 20 columnas)
		// Si quisiera poder controlar esto, hay que poner las columnas que desee el usuario + scroll 

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// LLAMADA AL PADRE Tablero_Touch ► Tablero_Drop ► Matriz_Div_x_Div ► Div_x_Div 
		// ► Crea las Baldosas del Salon y toda la logica de Drag & Drop sobre el Salon.
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		super(	dicc_config.family, dicc_config.contenedor, dicc_config.div_maestro, 
				columnas_aplicadas, dicc_config.filas );		
				
		// 💥💥💥💥💥💥💥💥
		const z_catalogo = Catalogo.get();
		// const z_silla = Catalogo.get("silla");
		// const z_silla_zero = Catalogo.get("silla_0");
		// const z_silla_logica = Catalogo.get("silla", "logica");
		// const z_silla_id = Catalogo.get("silla", "id");
		// const z_silla_visual = Catalogo.get("silla", 'visual');
		// const z_silla_visual_css = Catalogo.get("silla", 'visual', "css");
		// const z_visual_css = Catalogo.get('visual', "css"); 	 // NULL		
		// const z_get_logica = Catalogo.get('logica'); 			// NULL		

		// const z_grupo = Catalogo.get_distinto_s("grupo");
		// const z_visual = Catalogo.get_distinto_s('visual');
		// const z_visual_content = Catalogo.get_distinto_s('visual', 'content');		
		// const z_log_msg = Catalogo.get_distinto_s('logica', 'motor_mensajes');
		// const z_log_msg_tipo = Catalogo.get_distinto_s('logica', 'motor_mensajes', 'tipo');
		// const z_distintas_logicas = Catalogo.get_distinto_s('logica');
		// const z_id_s = Catalogo.get_distinto_s('id');		
		// const z_mesa = Catalogo.get_distinto_s('mesa');	// NULL
		// const z_mesa_id = Catalogo.get_distinto_s('mesa' , 'id');	// NULL
		
		// const z_keys = Catalogo.get_keys();
		
		// const z_players = Catalogo.get_item_s("grupo", "player");
		// const z_logica_alergias = Catalogo.get_item_s("logica", "motor_alergias", true);
		// const z_logicas = Catalogo.get_item_s("logica"); // NULL
		// const z_sub_grupos = Catalogo.get_item_s("rol", "cliente");
		// 💥💥💥💥💥💥💥💥

		// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ 
		// ■■  🚫 SEGUN SUS COLUMNAS: 'limitado' / 'scrolado' / 'apilado'
		// 	        • El modelo ya se ha hecho efectivo en 'super' con 'columnas_aplicadas'. 
		// 			• AHORA LO REGISTRO Y Según el tipo de modelo..... para la version2....ainsss
		if(e_Salon.MODELOS_SALON.includes(modelo_salon)){
			this.modelo_salon = modelo_salon;
			if(this.modelo_salon === 'limitado'){}
			else if(this.modelo_salon === 'scrolado'){}
			else if(this.modelo_salon  === 'apilado'){}
			else{}
		}else{
			this.modelo_salon = 'limitado';
		}
		
		// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ NO USADO. PREPARADO
		// Botones de Accion sobre el NavBar (Login, Ver-Info, Guardar, Cargar, Re-iniciar Salon): 
		// 🍏🍏
		this.bi_nav = { 
			cu:'[data-action-nav="save"]', 
			rud:'[data-action-nav="load"]', 
			ver_info:'[data-action-nav="info"]', 
			reiniciar:'[data-action-nav="re-init"]', 
			login:'[data-action-nav="conn"]', 
			config:'data-tipo-bs="offcanvas-configuracion"',
			set_up: '[data-bs-toggle="offcanvas"]' ,
			elementos: '[data-action-nav="elementos"]',
		};
		this.$bi_nav = { 
			cu:e_Salon._to_element( '[data-action-nav="save"]'), 
			rud:e_Salon._to_element('[data-action-nav="load"]'), 
			ver_info:e_Salon._to_element('[data-action-nav="info"]'), 
			reiniciar:e_Salon._to_element('[data-action-nav="re-init"]'), 
			login:e_Salon._to_element('[data-action-nav="conn"]'), 
			config:e_Salon._to_element('[data-tipo-bs="offcanvas-configuracion"]')  ,
			set_up: e_Salon._to_element('[data-bs-toggle="offcanvas"]') ,
			elementos: e_Salon._to_element('[data-action-nav="elementos"]'),
		};
					
		// ┌••• ENTORNO - DIMENSIONES - LIMITES
		this.entorno = entorno;
		this.dimension = dimesion_inicial;
		this.limites = limites;
					
		// ┌••• CONFIGURACION DEL SALON: 
		// this.CFG = new Configuracion_Salon(this, dicc_config, '[data-bs-toggle="offcanvas"]');
		this.CFG = new Configuracion_Salon(this, dicc_config, this.bi_nav.set_up);
		
		// ■ ASEGURA QUE EL DICCIONARIO DE CONFIGURACION ESTA LIMPIO
		this.dicc_config = this.CFG.configuracion;		
		
		// ┌••• Sidebar persistente de elementos (mesa/silla/...) 
		// const $ico_trigger_elementos = document.querySelector('[data-action-nav="elementos"]');
		const $ico_trigger_elementos = document.querySelector(this.bi_nav.elementos);
		this.Side_Elementos = new Side_Elementos(
			this._add_listeners_movimiento.bind(this),
			z_catalogo,
			this.$bi_nav.elementos,
		);
		
		// ┌••• Relaciona Acciones con los Elementos del catalogo.
		this.LOGIC = new Logica_Catalogo(this);
		
		// ┌■ Asocia el Catalogo a la Logica ... y viceversa.
		const motor_mensajes = new Motor_Mensajes(this);
		const motor_alergias = new Motor_Alergias();		
		// 🈴🈴
		Catalogo.set_motor('motor_mensajes', motor_mensajes);
		Catalogo.set_motor('motor_alergias', motor_alergias);
		// ┌■ a partir de este momento Recupero los motores a través del Catalogo.
		// const MA = Catalogo.get_motor('motor_alergias');
		this.MSG_M = motor_mensajes;
		this.MSG_A = motor_alergias;
		
		// ┌••• LOGIN Y REGISTRO: 
        // this.LogIn = new Login_Modal('[data-action-nav="conn"]');
        this.LogIn = new Login_Modal(this.bi_nav.login);
		
		// ┌••• C.R.U.D. 
		this.crud = new Foto_CRUD(this);
		
		// ┌••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
		// ​👂​👂  ACCIONES del MENU HTML: Login, Ver-Info , Guardar en BD
		// ┌••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
		const items_bi_generales = document.querySelectorAll(".botones_accion");		
		if (items_bi_generales.length > 0) {	
			items_bi_generales.forEach(item => {
				const tipo_general = item.getAttribute('data-action-nav');
				if( tipo_general == 'conn' ){		
					item.addEventListener("click", this.accion_login.bind(this) );					
					
				}else if (tipo_general == 'info' ){					
					item.addEventListener("click", this.accion_ver_info.bind(this) );	
					
				}else if (tipo_general == 'save' ){					
					item.addEventListener("click", this.accion_CU.bind(this) );				
					
				}else if (tipo_general == 'load' ){					
					item.addEventListener("click", this.accion_load_photos_RUD.bind(this));				
				
				}else if (tipo_general == 're-init' ){					
					item.addEventListener("click", this.accion_re_init_salon.bind(this));
					
				}else if (tipo_general == 'pruebas'){
					item.addEventListener("click", this.accion_re_posicionar.bind(this) );
				}
			});
			console.log('✅ ACCIONES BOTON NAV • • • • • Loaded ✔️');
		}		
		
		// ┌•• ​👂​👂 'desactivar__modo_reserva'
		this.contenedor_div_x_div.addEventListener("dblclick", this._desactivar_modo_reserva.bind(this));

		// ┌•• Inicia el MODO RESERVA a false.
		this.is_mode_reserva = false;	

		// ■■■■■■■■■■■■■■■■■■■■■
		// ​🧩​🧩​  RANGOS 🧩​🧩​​
		// ■■■■■■■■■■■■■■■■■■■■■
		this.eRdS = new El_Rango_del_Salon(this); 	// Instanciamos el gestor de RANGOS y CELDAS de la matriz.		
		
		// ■ MENSAJE FINAL DE CARGA
		console.log(`${'█ '.repeat(20)}  • • •  FINALIZADA LA CARGA DE SALON  • • •`);
		
		// 💥💥💥💥💥💥💥💥		 	 💥💥💥💥💥💥💥
		// 💥💥💥💥💥💥💥💥	 MOCK'S	 💥💥💥💥💥💥💥
		// 💥💥💥💥💥💥💥💥			 💥💥💥💥💥💥💥
		const d_indices_mock = {
			silla_0: 8, mesa_0: 9, silla_1: 12, mesa_1: 13, silla_2: 14 , 
			silla_3: 1, silla_6: 10, silla_4: 17, mesa_3: 21, silla_5: 29 , 
			silla_7: 5, silla_8: 20, silla_9: 22,  silla_11: 12, 
			mesa_2: 41, mesa_4: 49, mesa_7: 57, silla_10: 33, silla_1: 42, silla_12: 40, silla_17: 50 , silla_18: 48, silla_13: 57,
			silla_14: 45, silla_16: 54, silla_15: 52, mesa_5: 53, silla_19: 61 , 
			mesa_6: 75, silla_21: 74, silla_20: 76,  			
		};
		const d_mensajs_mock = {silla_0: "Cliente Especial", 
								mesa_0: 'Reserva Miguel Garrido', 
								silla_2: 'Cliente Pesado', 
								mesa_2: 'Mr Smith Jr', 
								mesa_4: 'Quiere 5 sillas. No sabe cuantos van a venir. 3 mesas', 
		};
		
		const d_alergias_mock = {silla_0: ['soja', 'lacteos'], 
								silla_1: ['huevos'], 
								silla_21:['pescado']
		};
		
		const ok_elements = this._load_elementos_en_Salon(d_indices_mock);
		this.RegisteR();

		const MA = Catalogo.get_motor('motor_alergias');
		// this.CFG.api_re_posicionar();				
		const ok_alerg = this._load_alergias_en_Salon(d_alergias_mock);		
		console.log(JSON.stringify(MA.d_data, null, 2)); 
		
		const MM = Catalogo.get_motor('motor_mensajes');
		const ok_msg = this._load_mensajes_en_Salon(d_mensajs_mock);
		console.log(JSON.stringify(MM.d_data, null, 2)); 

		Alertas_UI._NotA('App Cargada con Exito', 'Listo para empezar!', 'success', 1500);

	}

	/** 
	 entorno:{tipo='MOVIL', es_tactil=false, ancho_ventana=558}
	 dimesion:{filas=12, columnas=8}
	 limites:{ columnas:{min:8, max:30}, filas: {min:8, max:100} } 
	 *### ■ STATIC METHOD 🧍‍♂️ ■ Calcula el entorno, dimensiones y limites dependiendo del ancho de pantalla.
	  				Llamada desde resize
	  @returns entorno, dimension, limites
	 */	 
	static _quien_soy(){
		// ■■ Detección de Hardware/Entorno (Lo primero, porque define la configuración)
        const entorno = Compatibilidad._detectar_entorno();
        // console.log(`📱 Dispositivo detectado: ${entorno.tipo} (Táctil: ${entorno.es_tactil})`);	
		
		// ■■ Determinar DIMENSIONES dependiendo del tipo/ancho de la pantalla. 
		const dimension = Compatibilidad._get_dimension_inicial(entorno.tipo);
        // console.log(`📱 dimension: ${dimension.filas} x ${dimension.columnas}`);	
		
		// ■■ Determinar LIMITES MAX MIN de columnas y filas segun el ancho de la pantalla. 
		const limites = Compatibilidad._get_limites_max_min(entorno.tipo);
        // console.log(`📱 limite.columna: ${limites.columnas.min} - ${limites.columnas.max}, limite.filas: ${limites.filas.min} - ${limites.filas.max}`);

		return [entorno, dimension, limites];
	}

	/**  ✒️✒️
	 * #### SOBRE-ESCRIBE EL MÉTODO DE TABLERO_DROP Y AÑADE LAS RESERVAS
	 * @param {*} ev   evento de soltar objeto en un salon.
	 */
	drop_over_matriz(ev) {
		ev.preventDefault();
		
		// ■■ Llamo al padre para que realice las funciones generales de DROP-OVER(realiza el movimiento + scan_onplay):
		super.drop_over_matriz(ev);
		
		// ■■ Registramos los elementos en el salon
		const ok = this.RegisteR();
		if(ok) return true;
	}
	/** ✒️✒️ 
	 * #### SOBRE-ESCRIBE ✒️ EL MÉTODO DE TABLERO_DROP Y AÑADE LA ELIMINACIÓN DEL POPOVER
	*/
	drop_exit(ev) {
		ev.preventDefault();		
		
		// ■■ Llamo al padre para que realice las funciones generales de drop-exit:
		super.drop_exit(ev);		
		
		// ■■ Actualizo las Reservas:
		this.RegisteR();	
		
		// ■■ 🈴🈴
		const MA = Catalogo.get_motor('motor_alergias');
		const MM = Catalogo.get_motor('motor_mensajes');

		this.MSG_A.delete(this.objeto_drag.id);
		this.MSG_M.delete(this.objeto_drag.id);
		
		// ■■ 
		this._set_exit_toast_bs(this.objeto_drag.id);
	}

	/** ### El 'click' sobre un elemento da paso a la Lógica sobre el Salon definida en Catálogo 
	 * ### La Lógica es un offcanvas que tiene tantas pestañas como Motores(acciones) tiene el elemento en Catalogo.
	*/
	_elemento_onplay_click(ev) {
		
		ev.preventDefault();
		// ┌■ Datos sobre el elemento clickado.
		const elemento_clickado = ev.currentTarget;
		if (!elemento_clickado) return;
		const id_el = elemento_clickado.id;
		const id_key_el = elemento_clickado.dataset.id_key;		// el key de Catalogo.
		
		// ┌■ Calcula el indice de la reserva a la que pertenece el elemento clickado.
		// ┌■ Lo necesito para los cambios en el color(2º click y color)
		const index_reserva = this._get_indice_en_reserva_s(id_el);
		if (index_reserva == -1) return;
		this.index_reserva = index_reserva;			

		// ┌■ Solo pasan los Grupo players
		const ctlg_el = Catalogo.get(id_key_el);
		if (!ctlg_el || ctlg_el.grupo !== 'player') 
			return;
		
		// ┌■ Rol. color de la reserva en el click.
		if (ctlg_el.rol === 'central'){
			if (index_reserva != this.last_reserva_clicked)
				this.last_reserva_clicked = index_reserva;
			// ┌■■ 🌈 🪑 CAMBIO DEL COLOR DE LOS ELEMENTOS DE LA RESERVA. 			
			this._set_color_reserva(this.index_reserva);
		}
		
		// ┌■ ■ ■ Lógica: la selección visual solo vive mientras el offcanvas de lógica está abierto.
		const logica = ctlg_el.logica;
		// if(logica?.motor_mensajes || logica?.motor_alergias){
		if(logica){
			const ids_reserva = Object.values(this.reservas[index_reserva] || {}).flat();
			
			// 🈴🈴🈴🈴🈴🈴🈴🈴🈴🈴🈴🈴🈴🈴🈴🈴
			const MA = Catalogo.get_motor('motor_alergias');
			const MM = Catalogo.get_motor('motor_mensajes');

			// Hay que saber la posición para colocar el offcanvas arriba o abajo
			const posicion_offcanvas_logica = this._get_posicion_offcanvas_logica(elemento_clickado);

			const $offcanvas_logica = this.LOGIC.abrir_ventana_logica(elemento_clickado, posicion_offcanvas_logica);
			
			// Si aparece el offcanvas-logica, el elemento seleccionado se hace grande y borde gordo
			// Cuando desparece el offcanvas-logica dejamos de seleccionarlo.
			if ($offcanvas_logica) {
				this._set_elemento_onplay_seleccionado(elemento_clickado);
				$offcanvas_logica.addEventListener('hidden.bs.offcanvas', () => {
					this._reset_elemento_onplay_seleccionado();
				}, { once: true });
			}

		} else {
			this._reset_elemento_onplay_seleccionado();	
		}

	}

	/**
	 * ### Calcula dónde debe abrirse el offcanvas de lógica para no tapar la baldosa clickada.
	 * @param {HTMLElement} elemento_onplay - Elemento del salón sobre el que se hace click.
	 * @returns {'up'|'down'} 'up' abre el offcanvas arriba; 'down' lo abre abajo.
	 */
	_get_posicion_offcanvas_logica(elemento_onplay) {
		const elemento = e_Salon._to_element(elemento_onplay);
		const baldosa = elemento?.closest('.estiloBaldosas');
		if (!baldosa) return 'down';

		const rect_baldosa = baldosa.getBoundingClientRect();
		const centro_baldosa_y = rect_baldosa.top + (rect_baldosa.height / 2);
		const centro_pantalla_y = window.innerHeight / 2;

		return centro_baldosa_y > centro_pantalla_y ? 'up' : 'down';
	}

	/** ### Marca visualmente el player seleccionado y limpia la selección anterior. */
	_set_elemento_onplay_seleccionado(elemento_seleccionado) {
		const player = e_Salon._to_element(elemento_seleccionado);
		if (!player) return;

		this._reset_elemento_onplay_seleccionado();
		player.classList.add('elemento_onplay_seleccionado');
		player.closest('.estiloBaldosas')?.classList.add('baldosa_onplay_seleccionada');
	}

	/** ### Devuelve el borde y el tamaño del elemento seleccionado al estado original. */
	_reset_elemento_onplay_seleccionado() {
		document.querySelectorAll('.class_onplay.elemento_onplay_seleccionado').forEach((elemento) => {
			elemento.classList.remove('elemento_onplay_seleccionado');
		});
		document.querySelectorAll('.estiloBaldosas.baldosa_onplay_seleccionada').forEach((baldosa) => {
			baldosa.classList.remove('baldosa_onplay_seleccionada');
		});

		// player.classList.add('elemento_onplay_seleccionado');
		// player.closest('.estiloBaldosas')?.classList.add('baldosa_onplay_seleccionada');
	}

	_get_indice_en_reserva_s(id_elemento){	
		// ■■ BUSCA EN EL ARRAY DE RESERVAS el indice del elemento
		const index_reserva = this.reservas.findIndex(dicc => {
			return Object.values(dicc).flat().includes(id_elemento);
		});		
		return index_reserva;
	}
	
	/** ✒️✒️
	 * #### SOBRE-ESCRIBE ✒️ EL MÉTODO elemento_nuevo_to__Salon DE DRAG_X_DROP 
	 * 	* Añade un Event Listener ​👂​👂 para el click en el nuevo elemento.
	 * @see {@link Tablero_Drop.drop_over_matriz}
	 * ```javascript
	 * this.elemento_nuevo_to_Salon_(objDrag, objDrop, data__tipo);			
	 * ```
	*/
	elemento_nuevo_to_Salon(item_menu = null, baldosa_matriz = null){
		// const CFG = this.dicc_config;
		// if (!CFG) return;

		const new_onplay = super.elemento_nuevo_to_Salon(item_menu , baldosa_matriz );

		if (new_onplay){			
			
			const idkey = new_onplay.dataset.id_key;
			const class_new_div = idkey+'_onplay';
			new_onplay.classList.add(idkey);
			new_onplay.classList.add(class_new_div);
			new_onplay.addEventListener('click', this._elemento_onplay_click.bind(this));   

			return new_onplay;
		}
	}

	// ◘◘◘◘ RESERVAS • • • LOGICA BASE DEL SALON
	// ██████████████████████████████████████████

	/** 
	 * #### GENERA las RESERVAS del Salón...
	 * ##### Una reserva se produce cuando se mueve o crea una mesa:
	 * *  1 mesa crea una reserva.
	 * *  1 mesa al lado de otra mesa crean 1 reserva(no 2 reservas)
	 * *  1 mesa con una baldosa de separaciónn de otra mesa son 2 reservas.
	 * *  1 reserva puede tener 0 sillas o el numero de sillas que se generan cuando se hace la reserva.
	 * *  1 scanner de mesas consiste en hacer un norte/sur/este/oeste de los objetos que hay alrededor de una mesa, 
	 * ```javascript
	 * scanner = {'id':'mesa_4', 'n':null, 's':'silla_1', 'e':'mesa_2', 'w':'silla_0', 'ne':null, 'nw':null, 'se':null, 'sw':null}
	 * ```
	*/
	_modulo_reservas( rol_busca='central' , b_registro=true) {
		try {
			// ┌• Objeto datamap: {id_elemento(string), baldosa (myDiv) , indice(integer) }
			// ┌• [ {'mesa_0', [Object myDiv], 12} , {'mesa_1', [Object myDiv], 3} , ... ]			
			const fichas_onplay = this.#crear_fichas_onplay(rol_busca);
			// if(!fichas_onplay) return false;
	
			// ■■ Logica del Negocio 🧠🧠:
			const matriz_reservas = this.#get_matriz_reservas(fichas_onplay, rol_busca);
			// ■■ Obtiene el array de diccionarios de reservas!!
			const reservas = this._get_array_dicc_reservas(matriz_reservas, fichas_onplay);
			if ( !reservas || reservas.length === 0 ) 
				return [];
			
			// ┌••• si no quiero registrar las reservas en this.reservas y 
			// 		quiero que me retorne el resultado para trabajarlo aparte ► b_registro = false. 
			// ┌••• es útil para pruebas unitarias y re-posicionamiento avanzado donde analizo el resultado y lo cambio si me conviene.
			if(b_registro){
				this.reservas = reservas;
			}
			return reservas;
			
			// ■ Log de reservas ...................................BORRAR
			// this.reservas.forEach((dicc_reservas, i) => console.log(`■■■ Reserva ${i+1} • • •   ${dicc_reservas.mesas.join(', ')}    ■■■   ${dicc_reservas.sillas.join(', ')}`) );
		} catch (error) {
			console.log(`Error::: Modulo Reservas ::: ${error}`);
			return false;
		}
	}

	/** 
	 * ####	Lo uso para tener información de un tipo de objeto('mesa') sobre el Salón. POR ID.
	 * ```javascript  
	 * const lista_mesas = this.crear_fichas_onplay('central');
	 * ```
	 * ### Retorna un array de fichas:  
	 * ```javascript
	 * [ { id_contenido: 'mesa_0', my_div: [Object myDiv], indice_baldosa: 12 }, 
	 * { id_contenido: 'mesa_1', my_div: [Object myDiv], indice_baldosa: 15 } , ... ]
	 * ```
	 * *  **false**, si hay algún error.	*/
	#crear_fichas_onplay(rol_busca='central') {
		// ┌•• Obtiene la lista de baldosas que contienen hijos (mesas o sillas)
		const lista_baldosas_onplay = this._get_mydivs_onplay();
		if (!lista_baldosas_onplay || lista_baldosas_onplay.length === 0) return [];
		
		// let array_to_return = [];
		let array_fichas = [];
		// ┌•• Escanea las reservas actuales y actualiza su estado
		lista_baldosas_onplay.forEach(my_div => {
			const id_contenido = this._get_id_contenido_baldosa(my_div.elemento_div);    		// my_div.elemento_div es el objDrop. id_contenido = 'mesa_3', 'silla_2'
			const id_baldosa = my_div.elemento_div.id;                               // id_baldosa es el id del div donde cae el objeto drag.
			// ■■ Valida Resultados
			if (!id_contenido || !id_baldosa)  {
				console.log('Error SCAN '); 
				return [];
			}
			// • Valida Baldosa
			const indice_baldosa = this.__get_indice_baldosa_byId(id_baldosa);       
			if (indice_baldosa < 0) return [];
			// • Valida contenido('mesa_0' por ejemplo)
			const elemento_onplay = document.getElementById(id_contenido);
			if (!elemento_onplay) return [];

			// ■■ Obtenemos el rol del elemento en catalogo.
			const rol_elemento_onplay = this.#get_rol_en_catalogo(elemento_onplay);

			// ■■ match por rol_busca.			
			if(rol_elemento_onplay && rol_elemento_onplay === rol_busca ) {
				let ficha = new Map();
				ficha.set("id_contenido", id_contenido);         // 'Mesa_2'
				ficha.set("my_div", my_div);                     // Objeto my_div... contiene su escaneo n-s-e-w.
				ficha.set("indice_baldosa", indice_baldosa);     // 12, el indice en la matriz principal de drops de la app.
				array_fichas.push(ficha);                     	 // 
			}
		});
		return array_fichas; 
	}

	#get_rol_en_catalogo(elemento_dom){
		if(!elemento_dom) return null;
		const key_catalogo = elemento_dom.dataset.id_key;
		if(!key_catalogo) return null;
		const rol = Catalogo.get(key_catalogo, "rol");
		return rol || null;
	}

	

	
	/**  
	 * ###  RESERVAS 
	 * #### • Obtiene un array de array de ids de las reservas en base a reservas.
	 * {@link Configuracion_Salon.api_ver_informacion_Salon}
	 * @example _get_array_reservas_flat() ► [['mesa_3', 'mesa_4', 'silla_6', 'silla_5'], ['mesa_0', 'mesa_1', 'silla_2'], ['silla_7']]
	 * 			Devuelve un array con: un array x reserva con id's de los elementos 
	*/ 
	 _get_array_reservas_flat(){
		if ( !this.reservas || this.reservas.length <= 0 ) 
			return false;
		// ■ Proceso:
		let array_retorno = [];
		try {
			this.reservas.forEach( (dicc, i) => {
				const elementos_flat = Object.values(dicc).flat();    // Convierte los valores a un array plano. ('Mesa_0', 'Silla_1', 'Silla_2', 'Silla_3'....)
				array_retorno.push(elementos_flat);
			});        
		} catch (error) {
			return false;
		}

		// ■ Retorno:  
		return array_retorno || [];
	}
	/**
	 * ### Obtiene los ids de las sillas o mesas que están en juego (en la escena actual).
	 * @return {array} 
	 * ```javascript
	 *  _get_ids_onplay_('cliente') ► ['silla_0', 'silla_1', 'taburete_0', ... ]
	 *  _get_ids_onplay_('central')  ► ['mesa_0', 'mesa_1', ... ]	
	 * ```
	 */
	_get_ids_onplay(rol_busca='todo'){		
		const CFG = this.dicc_config;
		if(!CFG) return;

		const ctlg = CFG.catalogo;
		if(!ctlg) return;
		const idkeys = Object.keys(ctlg);
		if(!idkeys || idkeys.length === 0) return;
		
		let arr_onplay_nodes = [];
		arr_onplay_nodes = Array.from(document.querySelectorAll('.class_onplay'));

		if(rol_busca === 'todo' || rol_busca === 'all'){
			return arr_onplay_nodes.map(el => el.id).filter(Boolean); 	
		}
		let arr_retorno = [];
		for(const el of arr_onplay_nodes){
			const idkey = el.dataset.id_key;
			const rol_el = Catalogo.get(idkey)?.rol;
			if (rol_el === rol_busca) {
				arr_retorno.push(el?.id);
			}
		}
		return arr_retorno.filter(Boolean);

	}

	/** 
	 * @param {Array}  lista_mapdata, array flat de ids de todas las Mesas del Salon.
	 * @returns {Array} array de array de reservas de mesas ► [ ['Mesa_1'] , ['Mesa_2'] , ['Mesa_0', 'Mesa_3'] ]
	*/ 
	#get_matriz_reservas(lista_mapdata, rol_busca=null) {
		// Empiezo con las mesas, que crean las reservas.
		const visitadas = new Set();
		let matriz_reservas = [];
		if (!lista_mapdata || lista_mapdata.length === 0) return [];

		lista_mapdata.forEach(ficha_reserva => {
			const id_reserver = ficha_reserva.get('id_contenido');
			
			if (!visitadas.has(id_reserver)) {
				// Encontramos un nuevo grupo (reserva)
				const array_reserva = this._buscar_elementos_conectados(id_reserver, 
																		lista_mapdata, 
																		visitadas, 																		
																		rol_busca,
				);
				matriz_reservas.push(array_reserva);
			}
		});
		return matriz_reservas;
	}

	/**
	 * ### Busca todas las mesas conectadas usando DFS
	 * @param {string} mesa_inicio - ID de la mesa inicial ► 'Mesa_0'                              
	 * @param {Array} lista_mapdata - Lista de ficha_reserva (Map)
	 * ```javascript                             
	 * [{"id_contenido", "Mesa_0"}  , {"my_div", MyDiv} , {"indice_baldosa", 13} ,
	 * {"id_contenido", "Mesa_1"}  , {"my_div", MyDiv} , {"indice_baldosa", 43} ]
	 * ```
	 * @param {Set} visitadas - Conjunto Set de ids de mesas ya tratadas, ... para evitar repetir mesas
	 * @returns {Set} - Grupo de mesas conectadas (reserva)
	*/
	_buscar_elementos_conectados(mesa_inicio, lista_mapdata, visitadas, rol_busca='') {
		const Pila = [mesa_inicio];         // ■ Pila  Lifo
		const set_retorno = new Set();      // ■ Conjunto para almacenar mesas conectadas
		
		while (Pila.length > 0) {
			const elemento_actual = Pila.pop(); // Sacamos la última mesa de la pila y se vacía en la primera vuelta.
			
			if (!visitadas.has(elemento_actual)) {  // Si la mesa sacada de la pila no ha sido visitada, la procesamos
				visitadas.add(elemento_actual);
				set_retorno.add(elemento_actual);
				
				// Buscamos mesas vecinas 
				const array_vecinos = this._get_array_vecinos(elemento_actual, lista_mapdata, rol_busca);
				array_vecinos.forEach(vecino => {
					if (!visitadas.has(vecino)) {
						Pila.push(vecino);              // Llena la Pila.
					}
				});
			}
		}
		// Convertimos el conjunto a un array y lo retornamos
		return Array.from(set_retorno);
	}


	/** 
	 * ### Recibe array de reservas de mesas y crea un array de dicc{mesas:[], sillas:[]}
	 * #### Las sillas que no tienen mesa no se incluyen.
	 * @param {Array} matriz_reservas [ ['Mesa_1'] , ['Mesa_2'] , ['Mesa_0', 'Mesa_3'] ]
	 * @param {Array} lista_info_mesas  [ {id_contenido: 'Mesa_0', my_div: [Object myDiv], indice_baldosa: 12 }, 
	 * @returns {Array} [] Si error
	 * ```javascript
	 * [{mesas: ['Mesa_0', 'Mesa_3'], 	sillas: ['Silla_4', 'Silla_5, Silla_0'] }, 
	 * { mesas: ['Mesa_1']          , 	sillas: ['Silla_1', 'Silla_2, Silla_3'] }, 
	 * . . .
	 * {mesas: [], 		sillas: ['Silla_6', 'Silla_7'] } ]
	 * ```
	 */
	_get_array_dicc_reservas(matriz_reservas, lista_info_mesas) {
		// ┌•• Validacion		
		if (!matriz_reservas || matriz_reservas.length === 0) {
			return  this.#get_clientes_sin_reserva();
		};
		if (!lista_info_mesas || lista_info_mesas.length === 0) return [];
		
		let arraydicc_rsrvs = [];            // Array de diccionarios {mesas: [], sillas: []} RETORNO.
		let clientes_visited = new Set();      // Para evitar duplicados entre reservas.

		matriz_reservas.forEach((arr_reserver_s, i) => {
			let set_sub_clientes = new Set();      // Conjunto de sillas para esta reserva de mesas.

			// Recorremos todas las mesas de este grupo de reserva
			arr_reserver_s.forEach(id_reserver => {
				const ficha_reserva = lista_info_mesas.find(m => m.get('id_contenido') === id_reserver);
				if (ficha_reserva) {
					let array_scan = this._get_array_scan(ficha_reserva.get('my_div'), 'cliente'); // Filtra solo sillas.
					if (array_scan) {
						array_scan.forEach(id_cliente => {
							// Solo add un cliente si aún no estaba usada en otra reserva
							if (!clientes_visited.has(id_cliente)) {
								set_sub_clientes.add(id_cliente);
								clientes_visited.add(id_cliente);
							}
						});
					}
				}
			});

			// ■■ Creamos el diccionario para este grupo
			const dicc_reservas = {
				reservadores: arr_reserver_s,
				clientes: [...set_sub_clientes]  // convertimos Set → Array
			};
			arraydicc_rsrvs.push(dicc_reservas);
		});
			
		// ■ Sillas Ronin
		const clientes_sin_reserva = this.#get_clientes_sin_reserva(clientes_visited);	
		if (clientes_sin_reserva && clientes_sin_reserva.length > 0) {
			arraydicc_rsrvs.push(...clientes_sin_reserva);
		}

		return arraydicc_rsrvs;
	}

	/**
	 * 
	 * @param {*} clientes_visited Conjunto (Set) con un array de id's de sillas visitadas totales, no solo de la reserva.
	 * @returns {array} devuelve un array vacio( [] ) si no hay sillas sueltas o un array de id's de las sillas sueltas por el salon.
	 * 					1 Reserva con todas las sillas sueltas del salon.
	 */
	#get_clientes_sin_reserva(clientes_visited=null){
		let clientes_ronin = [];
		// ■ Sillas Ronin
		const clientes = this._get_ids_onplay('cliente');
		const clientes_sin_reserva = clientes.filter(id_cliente => !clientes_visited?.has(id_cliente));

		if (clientes_sin_reserva.length > 0) {
			// console.log('Sillas no asignadas a ninguna reserva:', clientes_sin_reserva);
			let ficha_reservas = {
				reservadores: [],
				clientes: [...clientes_sin_reserva]  
			};
			clientes_ronin.push(ficha_reservas);
		}
		return clientes_ronin;
	}

	/** 👂​👂 🌈 🪑
	 * ### Restaura el color original de las Mesas y las Sillas al hacer doble clic.
	 * @param {Event} event - El evento de doble clic.
	 */
	_desactivar_modo_reserva(event) {
		this._reset_color_reserva();

		// ■■ Desactivo el modo Reserva 
		this.is_mode_reserva = false;
		
		// ■■ Re-inicio pq tras el doble click no interesa guardar la ultima reserva clickada.
		this.last_reserva_clicked = -1
	}	

	/**
	 * 🆑 🌈 🪑 onplay 
	 * ### Reestablece el color original de todas las mesas_onplay y sillas_onplay.
	 */
	_reset_color_reserva() {
		// ■■ Cacho Los divs contenedores de las imagenes.
		// const nodeList_onplay = document.querySelectorAll(".mesa_onplay , .silla_onplay");
		const nodeList_onplay = document.querySelectorAll(".class_onplay");
		if (nodeList_onplay.length === 0) return;
		
		// ■■ Des-Pinto todos los objetos mesa_onplay y silla_onplay, y de cada objeto, las clases mas profudas del svg.
		nodeList_onplay.forEach(el => {
			const path = el.querySelector("svg path, svg path .st0, svg rect .st0");
			if (path) {
				path.style.setProperty("fill", "", "important");
			}
			// en el svg, la pata de la silla no se pq va a su bola. De esta forma se arregla. es como un svg aparte
			const path_pata_silla = el.querySelector("svg .st0");
			if (path_pata_silla) {
				path_pata_silla.style.setProperty("fill", "", "important");
			}
		});
	}
	// ■■
	/** ## 🌈 🪑 CAMBIO DEL COLOR DE LOS ELEMENTOS DE LA RESERVA.  */
	_set_color_reserva(index_reserva){

		this._reset_color_reserva();					
		
		// ┌•• APLANA LA RESERVA(Junta Mesas y Sillas en un array) 
		const elementos_flat = Object.values(this.reservas[index_reserva]).flat();
		// ┌•• TRANSFORMA LOS IDS DEL ARRAY elementos_flat EN OBJETOS 
		const obj_elementos = elementos_flat.map(id => document.getElementById(id));		

		const color_random = Herramientas.randomColor();
		obj_elementos.forEach(el => {       
			const path = el.querySelector("svg path", "svg");
			if (path) {
				path.style.setProperty("fill", color_random, "important");
			}
			// en el svg, la pata de la silla no se pq va a su bola. De esta forma se arregla. es como un svg aparte
			const path_pata_silla = el.querySelector("svg .st0");
			if (path_pata_silla) {
				path_pata_silla.style.setProperty("fill", color_random, "important");
			}
		});		

	}

	/**
	 * ## HACE UN SCANNER DEL SALON Y UN REGISTRO DE RESERVAS.	 */
	RegisteR(){
		try {
			// REGISTRO LOS CAMBIOS EN MyDivs 
			this._onplay_scan_salon(); 		
			
			// LLAMO AL MODULO DE RESERVAS SOBRE LOS OBJETOS CUYO ID EMPIEZA POR 'mesa' 
			const reservas = this._modulo_reservas( 'central', true);
			return reservas;
		} catch (error) {
			console.log(`Error :::  e-Salon ::: Register ::: msg: ${error}`)
			return false;
		}

	}
	// ◘◘◘◘ FIN RESERVAS • • • LOGICA BASE DEL SALON
	// ██████████████████████████████████████████████
	
	
	// ◘◘◘◘ ACCIONES SOBRE LOS ICONOS DEL NAV-BAR (MENU SUPERIOR)
	// ███████████████████████████████████████████████████████████
	/**
	 * ### Reinicia el Salon. Da Opción Previa de Guardar.
	 */
	accion_re_init_salon(){
		if(this.CFG) this.CFG.api_reiniciar_salon();
	}
	
	/**
	 * ### Create / Update 
	 * #### • Abre la ventana que es la que tiene que 'Guardar' una foto.
	 * #### • Establece un puente con Foto_CRUD. 🌉
	 */
	accion_CU(){		
		if(!this.crud) { return false }
		
		this.crud._abrir_ventana_CU();
	}

	/** 
	 * ### Abre un Offcanvas bootstrap para realizar acciones RUD sobre las Fotos.
	 * #### • Establece un puente con Foto_CRUD. 🌉
	 */ 
	accion_load_photos_RUD(){
		if(this.crud) this.crud._accion_read();
	}	
	
	/** 
	 * ### Click sobre el icono del Nav-Bar para Registro o Login_Modal.
	 * #### • Establece un puente con Login_Modal. 🌉
	 */
	accion_login(){		
		if(this.LogIn) this.LogIn.abrir_ventana('login');
	}
	/**
	 * ### - Click sobre el Boton-Ojo 👁️ del Nav-Bar(menu superior).
	 * ### - Ver Informacion Sobre: 
	 * #### • Reservas. 
	 * #### • Mensaje por Reserva y por Cliente.
	 * #### • Diccionario(objeto) de configuracion inicial.
	 * #### • Establece un puente con Configuración. 🌉
	 */
	accion_ver_info(ev) {
		this.CFG.api_ver_informacion_Salon();
	}
	
	/**
	 * ### click sobre el Boton de Re-Ordenar elementos. Lo quiero quitar o no se.....
	 * @see {@link e_Salon constructor}
	 */
	accion_re_posicionar(){
		this.CFG.api_re_posicionar();
	}

	// ◘◘◘◘ API'S O LLAMADAS DIRECTAS 
	// ███████████████████████████████
		
	/**
	 * @returns {Array} 
	 * ```javascript
	 * [{mesas:{"mesa_22":{usuario:'usu', fecha:"3/11/2025",hora:"23:51:31",mensaje:""},
	 * 			 "mesa_6":{usuario:'usu', fecha:"3/11/2025",hora:"23:51:41",mensaje:"Administrativos"}},
	 * sillas:{"silla_12":{usuario:'usu', fecha:"","hora":"","mensaje":""},
	 * 			 "silla_5":{usuario:'usu', fecha:"3/11/2025",hora:"23:52:05",mensaje:"Alergia pescado"},
	 * 			 "silla_13":{usuario:'usu', fecha:"",hora:"",mensaje:""},
	 * 			 "silla_7":{usuario:'usu', fecha:"",hora:"",mensaje:""}}},
	 * {mesas:{},
	 * sillas:{"silla_1":{usuario:'usu', fecha:"3/11/2025",hora:"23:51:46",mensaje:"LA RONIN"}}}]
	 * ```
	 */
	api_reservas() {
		try {			
			// Orígenes seguros
			const reservas = Array.isArray(this.reservas) ? this.reservas : [];
			// 🈴🈴
			const MA = Catalogo.get_motor('motor_alergias');
			const MM = Catalogo.get_motor('motor_mensajes');
			
			const msg_sillas   = this.MSG_A?.d_data  ?? {};
			const msg_mesas  = this.MSG_M?.d_data  ?? {};
	
			// Normalizador
			const ficha = (d = {}) => ({
				usuario: typeof d.usuario === 'string' ? d.usuario : '',
				fecha:   typeof d.fecha   === 'string' ? d.fecha   : '',
				hora:    typeof d.hora    === 'string' ? d.hora    : '',
				mensaje: typeof d.mensaje === 'string' ? d.mensaje : '',

			});
	
			// Construcción: mesas/sillas como diccionarios
			const salida = reservas.map(dicc => {
				const reservadores  = {};
				const clientes = {};
	
				for (const id of (Array.isArray(dicc.reservadores) ? dicc.reservadores : [])) {
					reservadores[id] = ficha(msg_mesas[id]);
				}
				for (const id of (Array.isArray(dicc.clientes) ? dicc.clientes : [])) {
					clientes[id] = ficha(msg_sillas[id]);
				}
				return { reservadores, clientes };
				});
			
			return salida;
		} catch (error) {
			console.error("Error en api_reservas:", error);
		}
	}

	/**
	 * ### diccionario de indice de cada mesa y silla onplay del salon.
	 * @returns	{Dictionary} 
	 * ```javascript
	 * {"silla_0": 8, "mesa_0": 9, "silla_1": 12, "mesa_1": 13, "silla_2": 14}
	 * ```
	 */
	api_indices(){
		// 1) Obtener los elementos onplay del DOM
		const nodeList_onplay = document.querySelectorAll(".class_onplay");
		if ( nodeList_onplay.length <= 0 ) return;		
		// 2) Convertir el NodeList en un array
		const arr_elementos = Array.from(nodeList_onplay);
		// 3) Definir el valor inicial del acumulador (un objeto vacío)
		const inicial = {};
		// 4) Usar reduce para construir el objeto resultado
		const resultado = arr_elementos.reduce((acumulador, el) => {
			// 4.1) calcular el índice correspondiente a este elemento
			const indice = this._get_indice_byContenido(el.id);
			// 4.2) añadir una propiedad nueva usando su id como clave
			acumulador[el.id] = indice;
			// 4.3) devolver el acumulador para la siguiente iteración
			return acumulador;
		}, inicial);

		// 5) Devolver el objeto final
		return resultado;
	}

	/**
	 * @see {@link Configuracion_Salon.api_ver_informacion_Salon}
	 * ### Diccionario de mensajes de cada mesa y silla onplay del salon.
	 * ```javascript
	 *	d_mensajes = {
	 *  	mesa_22: {usuario: "usu",fecha: "4/11/2025",hora: "10:35:37",mensaje: "",  },
	 *   	mesa_6: {usuario: "usu", fecha: "4/11/2025", hora: "10:35:41", mensaje: "niños",  }
	 * 	}
	 * 	dicc_popo_sillas = {
	 *		silla_1: { usuario: "usu", fecha: "4/11/2025", hora: "10:35:25", mensaje: "LA RONIN", },
  	 *		silla_11: { usuario: "usu", fecha: "4/11/2025", hora: "10:35:58", mensaje: "PESCADO", },
  	 *		silla_5: { usuario: "usu", fecha: "4/11/2025", hora: "10:36:04", mensaje: "ATUN", },
	 * 	}
	 * ```
	 * ### • Retorno
	 * ```javascript
	 * { silla_0: 'gluten', mesa_0: 'padres', silla_1: 'marisco', mesa_1: 'novios', silla_2: 'lacteos' }
	 * ```
	 */
	api_mensajes(){
		// 🈴🈴
		const MA = Catalogo.get_motor('motor_alergias');

		const d_mensajes  = this.MSG_M.d_data;
		// const dicc_popo_sillas = this.MSG_A.d_data;
		// const dicc_popo = { ...d_mensajes, ...dicc_popo_sillas }; 
		const resultado = {};
		for (const id in d_mensajes) {
			const mensaje = d_mensajes[id]?.mensaje;
			if (mensaje) {
				resultado[id] = mensaje;
			}
		}
  		return resultado;
	}
	
	api_alergias(){
		const d_alergias  = this.MSG_A.d_data;
  		return d_alergias;
	}



	/** 🚫
	 * ### Genera una \"foto\" del salón fusionando reservas con posiciones y la configuración limpia.
	 * ### TODO EN UNO.
	 * #### VER api_foto() MÁS ABAJO.				
	 * @returns     
	 * ```javascript
	 * { config: {..}, reservas: [ { mesas:[{mesa_0:{..., indice}}], ... } ] }
	 * ```
	 */
	api_foto_all_one(){

		// ■■■■■■ DATOS DE ENTRADA
		const reservas_raw = this.api_reservas();
		const dicc_api_reservas = Array.isArray(reservas_raw) ? reservas_raw : [];		
		const dicc_api_indices = this.api_indices() || {};

		const agregarIndice = (coleccion = {}) => {
			if (!coleccion || typeof coleccion !== 'object') return {};
			const salida = {};
			for (const elementoId in coleccion) {
				if (!elementoId) continue;
				const detalles = coleccion[elementoId] || {};
				salida[elementoId] = {
					...detalles,
					indice: dicc_api_indices[elementoId] ?? null
				};
			}
			return salida;
		};

		// Procesa todas las reservas para agregar índices
		const reservas_con_indices = dicc_api_reservas.map((reserv = {}) => ({
			reservadores: agregarIndice(reserv.reservadores),
			clientes: agregarIndice(reserv.clientes)
		}));		

		// ■■■■■■ CONFIGURACION
		
		// Limpia y estructura la configuración
		const CFG = this.dicc_config || {};
		const sanitizeDomRef = (valor) => {
			if (!valor) return null;
			if (typeof valor === 'string') return valor;
			if (typeof valor === 'object') {
				if ('id' in valor && valor.id) return valor.id;
				return null;
			}
			return null;
		};

		// Devuelve una copia simple de un valor (objeto o primitivo)
		const cloneSimple = (valor) => {
			if (!valor || typeof valor !== 'object') return valor ?? null;
			try {
				return JSON.parse(JSON.stringify(valor));
			} catch (error) {
				return null;
			}
		};

		// Limpia y estructura la configuración
		const config_limpio = {
			family: CFG.salon.family ?? '',
			columnas: CFG.salon.columnas ?? this.columnas ?? null,
			filas: CFG.salon.filas ?? this.filas ?? null,
			div_maestro: sanitizeDomRef(CFG.salon.div_maestro),
			contenedor: CFG.salon.contenedor ?? '',
			tipos: cloneSimple(Catalogo.get_keys()) || {},
			clases_css: cloneSimple(CFG.salon.clases_css) || {},
			rutas: cloneSimple(CFG.salon.rutas) || {},
		};
		
		// ■■■■■■ RETORNO FINAL
		return {
			configuracion: config_limpio,
			reservas: reservas_con_indices
		};
	}

	/**
	 * ## Genera una \"foto\" del salón con toda la info del para guardar en BD.	
	 * #### Retorno:
	 * ```javascript
	 *  { configuracion: {"family":"SalonPeq","columnas":8,"filas":12 , ...}, 
	 * 	reservas: [{"mesas":["mesa_9"],"sillas":["silla_10","silla_11"]} , ... ] , 
	 * 	indices: {"silla_11":3,"mesa_9":4,"silla_10":5 , ... }, 
	 * 	mensajes: {"mesa_22":"ADMINISTRATIVOS","mesa_9":"ANIVERSARIO","silla_1":"LA RONIN",...} , 
	 *  }
	 * ```
	 */
	api_foto(){

		// ■■■■■■ DATOS DE ENTRADA
		const CFG = this.dicc_config || {};
		const arr_reservas 		 = this.reservas || [];

		const dicc_api_indices   = this.api_indices() || {};
		const dicc_api_mensajes  = this.api_mensajes() || {};
		const dicc_api_alergias  = this.MSG_A?.api_alergias() || {};

		// ■■■■■■ RETORNO FINAL
		return {
			configuracion: CFG,
			reservas: arr_reservas,			//ESTOY PENSANDO QUE LAS RESERVAS NO HACEN FALTA SI CUANDO SE POSICIONAN SE HACE UN SCAN.
			indices: dicc_api_indices,
			mensajes: dicc_api_mensajes,
			alergias: dicc_api_alergias,
		};
	}
	
	/**
	 * ### Le llega un diccionario de coordenadas api_indices y coloca los objetos en la matriz Salon.
	 * #### • Tengo que CACHAR un div del menu, 
	 * #### • Tengo que CLONAR ese div del menu, 
	 * ####	• Asignarle el id('key') 
	 * ####	• Colocar con appendChild en la baldosa que indica  'value' (indice)
	 * ```javascript
	 * dicc_api_indices = {silla_0: 8, mesa_0: 9, silla_1: 12, mesa_1: 13, silla_2: 14 } 
	 * ```
	 * ...donde silla_0 es el id del elemento y 8 el indice en la matriz.
	 * @NOTA Posicionar elementos no los incluye en la reserva ni los escanea. 
	 * hay que llamar a {@link RegisteR} para completar el ciclo.
	 */
	_load_elementos_en_Salon(dicc_api_indices){
		const CFG = this.dicc_config;
		if(!CFG) return;
		try {
			// ■■ Validación básica de diccionario.
			if (!dicc_api_indices || typeof dicc_api_indices !== 'object') {
				return false;
			}
			// console.log(`Total elementos a posicionar: ${Object.keys(dicc_api_indices).length}`);
			
			// ■■ Selecciona TODOS los elementos a clonar (elementos del menu)
			let items_menu = document.querySelectorAll('.menu_to_clone');
			if (items_menu.length === 0) {
				console.log('[_load_elementos_en_Salon] No hay plantillas .menu_to_clone en el DOM.');
				return false;
			}

			// ■■ Busca en el menú la plantilla cuyo data-tipo coincide con el pasado.
			const get_elemento_menu_byKey = (id_key) => {
				for (const el of items_menu) {
					const id_key_el = (el.dataset && el.dataset.id_key) || el.getAttribute('data-id_key');
					if (id_key_el === id_key) 
						return el;
				}
				return null;
			};
			
			// Contenido del diccionario separando
			const api_indices = Object.entries(dicc_api_indices);			
			api_indices.forEach(([id_el, i_baldosa]) => {
				
				const baldosa = this._get_baldosa(i_baldosa);
				// ┌■■ Verificamos que la baldosa de destino esté vacía
				if (this.is_baldosa_vacia(baldosa) == false) 
					return;
				
				let element_menu_to_clone = null;
				const id_keys = Catalogo.get_keys();
				const key_menu = id_keys.find(k => id_el.startsWith(k));
				if(!key_menu) return;
				element_menu_to_clone = get_elemento_menu_byKey(key_menu);				
				// ┌■■ Creamos un Clon del MENU. 
				const clon_item = element_menu_to_clone.cloneNode(true);                  
				clon_item.id = id_el;				
				clon_item.title = clon_item.id;
				
				//  ​👂​👂  DRAGGABLE
				this._add_listeners_movimiento(clon_item);

				// ┌■■ Añade el clon  a la baldosa.
				baldosa.appendChild(clon_item);           
				
				// ┌■■ CAMBIA DE CLASE PARA NO HEREDAR EL ESTILO DEL MENU....
				clon_item.className = "";
				clon_item.classList.add('class_onplay');				
				clon_item.classList.add(key_menu);				
				clon_item.classList.add(key_menu + '_onplay');
				clon_item.addEventListener('click', this._elemento_onplay_click.bind(this));   
			});		
		} catch (error) {
			console.log('ERROR en Posicionar '+ error.message)
		} 
		return true;	
	}
	
	/** 
	 * ### Carga los mensajes de las mesas y sillas 
	 * @param {object} dicc_api_mensajes 
	 */
	_load_mensajes_en_Salon(dicc_api_mensajes){
		if (!dicc_api_mensajes || Object.keys(dicc_api_mensajes).length === 0) return;
        const id_keys = Catalogo.get_keys();
		const MM = Catalogo.get_motor('motor_mensajes');

        Object.entries(dicc_api_mensajes).forEach(([id, mensaje]) => {
            const id_key = id_keys.find(k => id.startsWith(k));
            const item_catalogo = id_key ? Catalogo.get(id_key) : null;

			// Validamos que exista en el catálogo y que tenga el motor de mensajes activo
            if (!item_catalogo || !item_catalogo.logica || !item_catalogo.logica.motor_mensajes) {
                return; // Ignoramos si no tiene el motor encendido
            }
            const elemento = e_Salon._to_element(id);
            if (elemento) {
                MM.update(id, mensaje);
            }
        });
		return true;
	}
	
	/**
	 * ### Carga los mensajes de las mesas y sillas 
	 * @param {object} dicc_api_mensajes 
	 */
	_load_alergias_en_Salon(dicc_api_alergias){
		if (!dicc_api_alergias || Object.keys(dicc_api_alergias).length === 0) return;
        const id_keys = Catalogo.get_keys();
		const MA = Catalogo.get_motor('motor_alergias');

        // ■ Iteramos directamente sobre las alergias recibidas (o del mock)
        Object.entries(dicc_api_alergias).forEach(([id, alergia_s]) => {
            // ■ Buscamos la clave base en el catálogo para este ID
            const id_key = id_keys.find(k => id.startsWith(k));
            const item_catalogo = id_key ? Catalogo.get(id_key) : null;

            // ■ Validamos si el elemento existe en el catálogo y tiene activo el motor de alergias
            if (!item_catalogo || !item_catalogo.logica || !item_catalogo.logica.motor_alergias ) {
                return; 	// Si no tiene el motor activo, ignoramos este elemento
            }
            const elemento = e_Salon._to_element(id);
            if (!elemento) return;	// Si el elemento No Existe en el Salon(tiene que estar pre-cargado).
			MA.update(id, alergia_s);
			MA._set_alerta_elemento(id);
        });
		return true;
	}
	
	/**
	 * ## Elimina del DOM los elementos indicados en tipo (mesas, sillas o todo).
	 * @param {string} tipo  #### El tipo de elemento  a limpiar ('mesa', 'silla' o 'todo'). Por defecto 'todo'. 
	 * 	```javascript
	 * this.clean__elementos_Salon('silla'); ► "Elimina los tipo 'silla' directamente."					 
	 * this.clean__elementos_Salon(); ► "Elimnia todos los elementos."								
	 * ``` 	
	 */
	clean_elementos_Salon(rol_busca = 'todo') {
		// 1. Obtiene los IDs usando tu función existente que ya valida los tipos.
		const ids_to_remove = this._get_ids_onplay(rol_busca);		
		if (!ids_to_remove || ids_to_remove.length === 0) return;

		// 2. Recorre los IDs, busca el elemento y lo elimina de su padre (la baldosa).
		ids_to_remove.forEach(id => {
			const elemento = document.getElementById(id);
			if (elemento && elemento.parentNode) {
				elemento.parentNode.removeChild(elemento);
			}
		});
	}

	// ◘◘◘◘ METODOS AXILIARES HELPER's
	// ████████████████████████████████

	/**	​👂​​👂​  -   ✒️✒️
	 * ### Sobre-Escribe ✏️ el método de Tablero_Drop.
	 * ####	• Cuando ReSiZe, el Salon cambia su window.innerWidth y si las columnas son mayores que su dimension_inicial, añade un scroll horizontal.
	 */
	_when_resize(){
		super._when_resize();		// CAMBIA EL SCROLL EN TABLERO_DROP

		// ■ x SI CAMBIA DE DIMENSION Y DISPOSICION		
		this.CFG._scroll();
	}

	/**	
	 * ### STATIC METHOD 🧍‍♂️
	 * #### Normaliza cualquier entrada (ID, Clase, Dataset o Elemento) a un objeto DOM real.
	 * @param {String|HTMLElement} input - Selector (#id, .clase, [data-xx]), ID plano o elemento DOM.
	 * @returns {HTMLElement|null} El elemento validado o null si no existe.
	 */
	static _to_element(input) {
		if (!input) return null;

		// A: Si ya es un objeto (nodo del DOM), lo devolvemos directamente
		if (typeof input === 'object') {
			return input instanceof HTMLElement ? input : null;
		}

		// Si no es un objeto, string es lo único que puede definir el elemento(id, class, data-set)
		if (typeof input !== 'string') return null;
		const str = input.trim();
		let element = null;		
		try {

			// Caso B: Es un selector explícito (empieza por #, . o [)  por ejemplo:  '[data-creat="formulario"]'
			if (str.startsWith('#') || str.startsWith('.') || str.startsWith('[')) {
				element = document.querySelector(str);
				if(element) return element;
			}

			// Caso C: - Probamos x ID (es lo más rápido y común).
			element = document.getElementById(str);
			if(element) return element;
			
			// Caso D: - Probamos como clase(atributo class o className).
			element = document.querySelector(`.${str}`);
			if(element) return element;
			
			// Caso E: - Probamos como data-set.
			element = document.querySelector(`[data-${str}]`);
			if(element) return element;

			// Si no existe como ID, intentamos como CLASE o ATRIBUTO-DATA (KISS: intentamos selector genérico)
			// if (!element) {
			// 	// Probamos si es una clase .nombre o un data-set [data-nombre]
			// 	element = document.querySelector(`.${str}`) || document.querySelector(`[data-${str}]`);
			// }
			

			return element;
		} catch (error) {
			console.error(`e-Salon ► _to_element ► Selector inválido "${input}"`, error);
			return null;
		}
	}

	/** 
	 * ### Crea y muestra un toast de notificación al eliminar un elemento del Salon.
	 * Se tiene que crear cada vez pq se pueden eliminar 2 elementos en breve espacio
	 * y tiene que aparecer un toast por cada elemento. En caso contrario bloquearía.
	 * @param {string} id_elemento - El ID del elemento eliminado. 	 */
	_set_exit_toast_bs(id_elemento) {
		const $contenedor = e_Salon._to_element('navbar') || null;
		
		// Crear el elemento HTML del Toast
		const toastDiv = document.createElement('div');
		toastDiv.className = 'toast align-items-center text-white bg-danger border-0 m-0';
		toastDiv.setAttribute('role', 'alert');
		toastDiv.setAttribute('aria-live', 'assertive');
		toastDiv.setAttribute('aria-atomic', 'true');

		toastDiv.innerHTML = `
			<div class="d-flex">
				<div class="toast-body ">
					<b>Elemento</b> ${id_elemento} Eliminado
				</div>
				<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
		`;

		$contenedor.appendChild(toastDiv);

		// Inicializar y mostrar con Bootstrap (duración de 3 segundos)
		const bootstrapToast = new bootstrap.Toast(toastDiv, {
			delay: 3000,
			autohide: true
		});
		
		bootstrapToast.show();

		// Limpieza: Eliminar el elemento del DOM cuando se oculte
		toastDiv.addEventListener('hidden.bs.toast', () => {
			toastDiv.remove();
		});

	}

	/** ## Despues de crear un clon mesa o silla que va hacia Salon,  hay que :
	 * ### 1-dotarle de movimiento, 2-capacidad para mensajes y 3-ponerle la clase apropiada('class_onplay').
	 * elemento(div_html): es un div clonado del menu de elementos.
	*/
	_saloniza_elemento(elemento){
		const el = e_Salon._to_element(elemento);
		const id_el = elemento.id;
		if(!id_el) return;
		// ┌• Valida a si el elemento existe en el catalogo
		const catalogo_el = Catalogo.get(id_el);
		if(!catalogo_el) return;
		
		el.title = el.id;

		el.draggable = true;
		
		// ┌• CAMBIA DE CLASE PARA NO HEREDAR EL ESTILO DEL MENU....
		el.className = "";
		el.classList.add('class_onplay');
		el.classList.add(`${el.dataset.id_key}_onplay`);

		// ┌•  ​👂​👂 
		this._add_listeners_movimiento(el);		
		el.removeEventListener('click', this._elemento_onplay_click);
		el.addEventListener('click', this._elemento_onplay_click.bind(this));   
		return true;
	}

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/** 
	 * ### Entra un id de mesa o silla pej: 'mesa_2' desde un rango y devuelve el elemento del menu equivalente (div mesa menu) 
	 * @param {String|object} el, puede ser id(string) u objeto ya que uso _to_element para unificar.
	 * ```javascript
	 * const $el_menu = this._what_player_menu('silla_0')
	 * $console.log('id_catalogo:', $el_menu.id )
	 * ```
	*/
	_what_player_menu(el){		
		
		// ┌■■ Cacho entrada.
		const $el = e_Salon._to_element(el);
		if(!$el) return null;
		// ┌■■ key en catalogo del elemento de entrada ('silla_2')
		const el_key = $el.dataset.id_key || $el.getAttribute('data-id_key');
		// ┌■■ Valido existencia en el catalogo.
		const valid_keys = Catalogo.get_keys();
		if(!valid_keys || !valid_keys.includes(el_key)) return null;
		
		// ┌■■ Selecciona TODOS los elementos del menu.
		const elementos_menu = Array.from(document.querySelectorAll(".menu_to_clone"));
		if(!elementos_menu) return;
		// ┌■■ FILTRO quito papeleras (exit)
		const elementos_menu_filter = elementos_menu.filter(el => el.dataset.id_key != 'exit');
		if(!elementos_menu_filter) return null;
		
		// ┌■■ MATCH		
		const $el_menu = elementos_menu_filter.find(menu => menu.dataset.id_key === el_key)

		return $el_menu ? $el_menu : null;
	}		
	
}    

/** 
 * ### * 1.-maneja el offCanvas de configuracion del salon. 		
 * 				* 2.-Tambien se usa para quien soy y validar_dicc_config.    
 * 				* 3.-Actualiza el numero de Columnas de salon	(IMPORTANTE) 
 * 				* 4.-Ver la Información del Salon y dicc_config inicial
 */
class Configuracion_Salon {
	/**
	 * @param {e_Salon} salon instancia de la clase e_Salon. normalmente this.
	 * @param {object} dicc_config diccionario de configuración principal. se define en Salon.js
	 * @param {string|object} icono_trigger puede ser cualquiera de estas: id, data-set, className, objeto icono del dom.
	 */
	constructor(salon = null, dicc_config = {}, icono_trigger=null) {
		
		// ■ Referencia al salon padre.....Todo-Poderoso. 🛐
		if(!salon || !(salon instanceof e_Salon)) {
			console.error("❌ Configuracion__Salon: No se ha proporcionado una referencia válida al salón padre.");
			return false;
		}		
		
		// ┌■■ 
		this.Salon = salon; 
		this.dicc_config_inicial = dicc_config;
		
		// ┌■■ Configuración validada y completada
		if(!dicc_config || typeof(dicc_config) != 'object') {
			console.error("❌ Configuracion__Salon: La configuración proporcionada no es válida.");
			return false;
		}
		// ┌•• DICCIONARIO DE CONFIGURACION
		this.configuracion = this.set_diccionario_configuracion(dicc_config);  

		// ┌•• OFFCANVAS DE CONFIGURACION DE LA APP
		// ┌•• Cacho el trigger que abre el offcanvas
		this.$trigger = e_Salon._to_element(icono_trigger);
		if(!this.$trigger) {
			console.error("❌ Configuracion__Salon: El trigger proporcionado no es válido.... \nNo se puede inicializar CONFIGURACION del Salón.");
			return false;
		}
		// ┌•• Obtener elementos del offcanvas
		this.$nombre_salon = e_Salon._to_element('config_nombre_salon');	// input txt nombre del Salon	
		this.$filas = e_Salon._to_element('config_filas');					// txt numero de filas
		this.$columnas = e_Salon._to_element('config_columnas');			// txt numero de columnas		
		this.$formulario = e_Salon._to_element('form_config_salon'); 		// el formulario
		this.$info_columnas = e_Salon._to_element('[data-config-info="columnas"]');
		this.$info_filas = e_Salon._to_element('[data-config-info="filas"]');
		// this.$sidebar_posiciones = e_Salon._to_element('[data-side-position]');
		this.$sidebar_posicion_toggle = e_Salon._to_element('[data-side-position-toggle]');
		
		// ┌•• Cargo los txt's del formulario
		// this._load_offcanvas_configuracion(this.dimension_inicial, this.limites);		
		this._load_offcanvas_configuracion(this.Salon.dimension, this.Salon.limites);		
		// Configuracion_Salon._asegurar_plantillas_menu();

		// ■■ NUMERO COLUMNAS	
		// ┌•• Fundamental para terminar de configuarar la cuadratura del Salon.
		this.api_update_columnas('.' + this.configuracion.salon.clases_css.contenedor, this.Salon.columnas);
				
		// ■■ Mensajes de la app	
		this.UI = new Alertas_UI();

		// ■■ GAP de re-posicionar.
		this.gap = 0;
		
		// ■■ Proporciones cuadradas de las Baldosas.
		this.is_baldosa_cuadrada = true;

		
	}

	// Acciones para Crear un OffCanvas de Configuración(Por pestañas, tiene que tener botones de accion.)
	set_UI_configuration(){

	}

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■ VALIDACION DICCIONARIO CONFIGURACION
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/** 
	 * ### Valida y Completa el diccionario de configuración con los valores por defecto.
	 * @param {Object} dicc_config  Diccionario de configuración proporcionado por el usuario.
	 * @returns {Object} Diccionario de configuración validado y completado.
	 */
	set_diccionario_configuracion(dicc_config){

		// ■■ Verificamos que los elementos esenciales existan para evitar errores de renderizado.
        this.__validar_catalogo_elementos(dicc_config.catalogo);

		// ■■ Valores por defecto
		const dicc_default = {
			family: 'Salon',		// Nombre de la baldosa
			contenedor:  '',		// Nombre del div contendor salon(que lo genere la app)
			div_maestro: '',		// donde ubicamos el contenedor salon(que lo genere la app)
			filas: 8,				// Numero de filas del salon
			columnas: 8,			// numero de columnas de salon.
			estilo: 'original',		// css
			
			// ■ Nombres de las clases css que se van a asignar tanto al contendor como a cada baldosa.
			clases_css: { contenedor: 'contenedor_salon' , baldosas: 'estiloBaldosas', },	
			
			// ■ Tipos de elementos que se pueden colocar en el salon.
			// tipos: { silla: 'silla', mesa:  'mesa', },
			
			// ■ Diccionario de Elementos definido en la clase Catalogo de Catalogo_Elementos.js
			catalogo: {},

		};
		// ■■■■■■■■■ la alternativa limpia
		const dicc_new_default = {
			// salon: {family:'Salon',contenedor:'',div_maestro:'', filas:8, columnas:8,estilo:'original', clases_css:{contenedor: 'contenedor_salon' , baldosas: 'estiloBaldosas',}, tipos: { silla: 'silla', mesa:  'mesa', },}, 
			salon: {family:'Salon',contenedor:'',div_maestro:'', filas:8, columnas:8,estilo:'original', clases_css:{contenedor: 'contenedor_salon' , baldosas: 'estiloBaldosas',}, }, 
			catalogo:{},
		}
		// Limpia y estructura la configuración
		// 	• Si le pasas un string, asume que es el ID.
		// 	• Si le pasas un objeto (un elemento del DOM real), extrae su .id.
		// 	• Si no hay nada, devuelve null. Esto evita errores de "undefined" más adelante.
		const sanitizeDomRef = (valor) => {
			if (!valor) return null;
			if (typeof valor === 'string') return valor;
			if (typeof valor === 'object') {
				if ('id' in valor && valor.id) return valor.id;
				return null;
			}
			return null;
		};

		// Devuelve una copia simple de un valor (objeto o primitivo)
		//  • Por qué hace esto: En JavaScript, los objetos se pasan por referencia. 
		//  • Si no se clonaran, cualquier cambio posterior en config_limpio podría modificar accidentalmente 
		//  • El objeto original o los valores por defecto. Es una medida de inmutabilidad.
		const cloneSimple = (valor) => {
			if (!valor || typeof valor !== 'object') return valor ?? null;
			try {
				return JSON.parse(JSON.stringify(valor));
			} catch (error) {
				return null;
			}
		};

		// Limpia y estructura la configuración
		// "Usa el valor que me dio el usuario; si no existe o es nulo, usa el valor por defecto"
		const config_limpio = {
			family: dicc_config.family || dicc_default.family,
			columnas: dicc_config.columnas || dicc_default.columnas,
			filas: dicc_config.filas || dicc_default.filas,
			div_maestro: sanitizeDomRef(dicc_config.div_maestro) || dicc_default.div_maestro,
			contenedor: dicc_config.contenedor 	|| dicc_default.contenedor,
			estilo:	dicc_config.estilo || dicc_default.estilo,
			tipos: cloneSimple(Catalogo.get_keys()) ,
			clases_css: cloneSimple(dicc_config.clases_css) || dicc_default.clases_css,
			catalogo: dicc_config.catalogo || dicc_default.catalogo,
		};
		const salon = {
			family: dicc_config.family || dicc_default.family,
			contenedor: dicc_config.contenedor 	|| dicc_default.contenedor,
			div_maestro:sanitizeDomRef(dicc_config.div_maestro) || dicc_default.div_maestro,
			filas:dicc_config.filas || dicc_default.filas,
			columnas:dicc_config.columnas || dicc_default.columnas,
			estilo:dicc_config.estilo || dicc_default.estilo, 
			clases_css:cloneSimple(dicc_config.clases_css) || dicc_default.clases_css,
			tipos: cloneSimple(Catalogo.get_keys()) ,
		};
		const new_config_limpio = {
			salon:salon || {},
			catalogo: dicc_config.catalogo || dicc_default.catalogo,
		};
		// return config_limpio;
		return new_config_limpio;
	}

	/** 
	 * ### Muestra al usuario los datos que quiero recuperar del salon para Pasar a la Base de Datos.
	 * *  Recorro todas las reservas y las muestro en un formato legible.
	 * *  Recorro el objeto MSG_S con los mensajes de cada silla.
	 * *  Recorro el dicc_salon con la configuración de la APP Salon.
	 * 
	 * Con estos datos creo un Objeto Modal al vuelo y lo muestro. El objeto se destruye tras su cierre.
	*/
	api_ver_informacion_Salon(){
		if(!this.diccionario) return false;

		let msgs = { reservas:'', clientes:'', alergias:'' };
		try {
			// ■■■■■■■■■■■■■■■ DICCIONARIO DE CONFIGURACION 
			const msg_json_config = `<h6>• DICCIONARIO CONFIGURACION</h6>\n${JSON.stringify(this.diccionario, null, 2)}`;
			
			// ■■■■■■■■■■■■■■■ DICCIONARIO DE RESERVAS			
			const matriz_reservas_flat = this.Salon._get_array_reservas_flat();   
			if (!matriz_reservas_flat) {
				msgs.reservas = '■ No hay RESERVAS en el salón\n';
			}else{
				msgs.reservas += `<h6>■ TOTAL RESERVAS: ${matriz_reservas_flat.length}</h6>`;

				matriz_reservas_flat.forEach( (reserva, i) => {
					msgs.reservas += `<b>• Reserva ${i+1}:</b> ${reserva.join(', ')}\n`;
				});       
			}
			
			// ■■■■■■■■■■■■■■■ MENSAJES
			const dicc_mensajes = this.Salon.api_mensajes();

			if ( !Object.keys(dicc_mensajes).length ){
				msgs.clientes = '<b>■ No hay Mensajes.</b>\n';
			}else{
				msgs.clientes += `<h6>■ TOTAL MENSAJES: ${Object.keys(dicc_mensajes).length}</h6>`;
				msgs.clientes += `${JSON.stringify(dicc_mensajes, null, 2)}`;
			}		

			// ■■■■■■■■■■■■■■■ ALERGIAS
			const dicc_alergias = this.Salon.MSG_A.api_alergias() || {};
			if (!Object.keys(dicc_alergias).length) {
				msgs.alergias = '<b>■ No hay Alergias.</b>\n';
			} else {
				msgs.alergias += `<h6>■ TOTAL ALERGIAS: ${Object.keys(dicc_alergias).length}</h6>`;
				msgs.alergias += `${JSON.stringify(dicc_alergias, null, 2)}`;
			}

			// ■ ■ ■ ■ ■ ■ ■ ■  LO JUNTAMOS TODO			
			const msg_data_salon = `\n${msgs.reservas}\n${msgs.clientes}\n${msgs.alergias}`;
			
			// ■ ■ ■ ■ ■ ■ ■ ■  MOSTRAMOS LOS DATOS DE LA APP EN UN OBJETO BOOTSTRAP 'MODAL'
			// this.ver_info_salon(msg_data_salon + '\n\n' + msg_json_config) ;
			this.__abrir_ventana_informacion(msg_data_salon + '\n' + msg_json_config) ;
			
		} catch (error) {
			// console.log('Error al generar el informe del salón:', error);
			this.__abrir_ventana_informacion(`Error al generar el informe del salón:\n${error}` );
			return;
		}
	}

	/**
	 * ## Actualiza el numero de columnas 
	 * @param {string} clase_contenedor_salon identificador de la clase del contenedor del salon
	 * @param {number} new_numero_columnas numero de columnas que se quieren poner. en SALON, el min es 8
	 * ```javascript
	 * 1• const ok_updt = this.api_update_columnas('.' + this.configuracion.clases_css.contenedor, 16);
	 * 2• const ok_updt = this.api_update_columnas('.estiloSalon', 8);
	 * ```
	 */
	api_update_columnas(clase_contenedor_salon, new_numero_columnas){
		// ┌• Entero positivo
		Number.isInteger(new_numero_columnas) && new_numero_columnas >= 0;

		const width = window.innerWidth;
		if (!width) return false;
		try {
			if (typeof(clase_contenedor_salon)!= 'string' || clase_contenedor_salon.trim() === '' ) {
				throw new Error(`❌ Error: clase contenedor ${clase_contenedor_salon}`);
			}			
			// ■■ Selecciona el contenedor principal del diseño por el estilo.
			const contenedor_salon = document.querySelector(clase_contenedor_salon);		
			const contenedor_salon2 = e_Salon._to_element(clase_contenedor_salon) || e_Salon._to_element('.estiloSalon') || this.Salon.contenedor_div_x_div;		

				if (!contenedor_salon) return;		
			// ■■ Ajusta el número de columnas del grid según el tamaño de pantalla.
			contenedor_salon.style.gridTemplateColumns = "repeat(" + new_numero_columnas + ", 1fr)";
		} catch (error) {
			console.log('❌ Error ::: update_numero_columnaas ::: '+error.message); 
			return false;
		}
		return true;
	}

	/**
	 * ## Actualiza el número de filas del Salon.
	 */
	api_update_filas(new_numero_filas){
		// ┌• Entero positivo
		if ( !(Number.isInteger(new_numero_filas) && new_numero_filas >= 0) ){
			return false;
		}
		const Salon = this.Salon;
		const filas = Salon.filas;
		const columnas = Salon.columnas
		// ┌•• En funcion del nuevo numero de filas . . . 
		if (filas === new_numero_filas){
			return true;
		}else if(filas > new_numero_filas){
			// ┌• Acorta.... problem: que corte reservas.
			console.log('⚠️ Acorta Numero de Filas. . . corta reservas ❓');

		}else if (filas < new_numero_filas){
			// ┌• Agranda... sin problema			
			console.log('Agranda el Numero de Filas 👍');
		}

		try {
			// ┌■ AÑADE O QUITA BALDOSAS
			const ok_total = this.Salon.set_total_baldosas( new_numero_filas * columnas );
			if(ok_total){
				Salon.filas = filas;
				Salon.columnas = columnas;
				console.log(`✅ Add Baldosas + Update Filas + Re posicionamiento = ${filas} filas x ${columnas} columnas`);
			}	
			
			// ┌■ RE-POSICIONA LAS RESERVAS EN EL SALON
			const ok_re = this.api_re_posicionar();
		} catch (error) {
			console.log( `❌ Error:: api_update_filas:: msg:: ${error.message}`  );			
			return false;			
		}
	}

	/**
	 * ## Reinicia el Salon:	 */
	api_reiniciar_salon(){
		this.limpiar_Salon();		
		this.Salon.crud.foto_abierta = null;		
		this.Salon.crud._set_UI_ojo();
		this.Salon.RegisteR();
		return true;
	}

	/**
	 * ### Reorganiza las reservas en el salón buscando la posición más óptima y compacta.
	 * ####	• Asegura que las reservas no se toquen entre sí usando scanner_nsew y validando 8 vecinos.
	 * ####	• No depende de api_indices sino que los elementos se reubican por las 'reservas'
	 * ### • reservas_impuestas = la ficha de {@link _procesar_geometria_relativa} + la reserva  que se quiere conseguir. 
	 * ### De Momento sin uso.  Quiero conseguir abrir en cualquier dispositivo. efecto Guau!!! 
	 * ### Pendiente de analisis final. pensando pasar ficha_impuesta por parametro para trampear api_re_posicionar_.
	 * 
	 * @param {Object} gap (Opcional) 
	 */
	api_re_posicionar(gap=0) {		
		const Salon = this.Salon || null;
		const Ranget = this.Salon.eRdS || null; 
		if (!Salon || !(Salon instanceof e_Salon) || !Ranget || !(Ranget instanceof El_Rango_del_Salon)) {			
			return null;
		}
		// ┌••••••••••••••••••••••• 
		// ┌•• OBTENCIÓN DE DATOS
		const foto = this.Salon?.api_foto();
		let reservas_raw = foto.reservas || [];

		// ┌••••• 🧠🧠 LOGICA: Una [reserva impuesta] se asigna después de api_foto(). esto permite cambiar las reservas. 
		// ┌••••• 🧠🧠 Usado en el cambio de dimensiones dinamico entre Destktop, Tablet y Móvil. . .

		if (reservas_raw.length === 0) {
			console.log("⚠️​ No hay reservas para reposicionar.");
			return null;
		}
				
		// ┌•••••••••••••••••••••••••••••••••• 	
		// ┌•• LOGICA DEL REPOSICIONAMIENTO 🧠🧠
		// ┌•••••••••••••••••••••••••••••••••• 	
		try {
			// ┌•• GEOMETRÍA (Fase PREV)
			const fichas_geo_x_reserva = this._procesar_geometria_relativa(reservas_raw);
			if (!fichas_geo_x_reserva || fichas_geo_x_reserva.length === 0) {
				// Si no hay fichas válidas después de la limpieza, no es un error, solo un aviso.
				console.log("⚠️ No se encontró geometría válida en el salón activo.");
				return null;
			}
			// ┌••••••••••••
			// ┌•• LIMPIEZA: Limpiamos la matriz y el DOM 
			Salon.clean_elementos_Salon('todo');
			/** ### (string) Marca el inicio del rango a buscar. Celda : 'A0', 'B2'... */
			let cursor = 'A0'; 
			// ┌••••••••••••••••••••••••••••••••••••••••••••••••
			// ┌•• MONTAJE (Fase CURSOR con BUCLE DE CONFLICTO)
			for (const ficha_geo of fichas_geo_x_reserva) {
				// ┌•• dimension de la ficha_geo actual, . . .parametros de  _busca_dimension_free()
				const dim_ficha = `${ficha_geo.num_rows}x${ficha_geo.num_cols}`;
				// ┌•• Cacha los ids de 'cada' reserva
				const ids_reserva = ficha_geo.items.map(item => item.id);

				// ┌•••••••••••••••••••••••••••••••• 
				// ┌•• Buscamos hueco físico libre 
				
				// ┌• Variables de control del bucle:
				let is_colocado = false;
				let intentos = 0;				
				// ┌•• Para que no se embucle:
				const MAX_INTENTOS = 500;  
				while (!is_colocado && intentos < MAX_INTENTOS) {
					intentos++;
					let rango_free = Ranget._busca_dimension_free(dim_ficha, cursor);					
					// Si no hay hueco desde el cursor, RE-INTENTO desde A0
					if (!rango_free) {
						if (cursor !== 'A0') {
							cursor = 'A0';
							continue; 
						} else {
							// throw new Error(`No cabe la reserva ${ficha_geo.nombre_rango} (${dim_ficha})`);
						}
					}					
					// ┌•••••••••••••••••••••••••••••••• 
					// ┌•• Validacion de Vecinos / Politica del Posicionamiento.
					if (this._es_posicion_conflictiva(rango_free, ficha_geo, ids_reserva)) { 
						// ◘◘◘ CONFLICTO: Avanzamos el cursor 1 posición y reintentamos(continue)
						const siguiente_celda = Ranget.plus(rango_free.celda_inicio, 1); 
						if (!siguiente_celda) {
							// throw new Error("💯 Fin del tablero alcanzado buscando hueco sin conflictos. 💯");
							break;
						}
						cursor = siguiente_celda;
						continue;
					}					
					// ┌••                   ••••••••••••••••••••••••••   ••••••••• 
					// ┌•• Si llegamos aquí: No es posicion-conflictiva y Colocamos Fisicamente.
					const celda_base_destino = rango_free.celda_inicio;
					ficha_geo.items.forEach(item => {
						const celda_destino = Ranget.suma_fc(celda_base_destino, item.delta_y, item.delta_x);
						
						if (celda_destino) {
							const indice_matriz = Ranget.X_to_indice(celda_destino);
							const baldosa = this.Salon._get_baldosa(indice_matriz);
							
							if (baldosa) {
								// Re-insertamos el elemento DOM (que fue extraído en clean__elementos_Salon('todo'))
								baldosa.appendChild(item.elemento_dom);
							}
						} else {
							// Este throw es importante si falla la suma_fc (fuera de límites)
							throw new Error(`💥 Error al calcular destino para el elemento ${item.id} de la reserva ${ficha_geo.nombre_rango}.`);
						}
					});
					
					// ┌••          ••••••••               ••••••           ••••••    
					// ┌•• Preparar -Cursor- para La Siguiente Reserva con  margin = 0 (byDef)
					const ini_fc = Ranget.X_to_fc(rango_free.celda_inicio);
					const fin_fc = Ranget.X_to_fc(rango_free.celda_fin); 
					
					// ┌■ margin = 0 es justito, margin = 1 es con un espacio de separación.
					// const next_celda = Ranget._fc_to_celda(ini_fc.fila, fin_fc.columna + 2);	  // Original. Justito.
					const next_celda = Ranget._fc_to_celda(ini_fc.fila, fin_fc.columna + 2 + gap);
					if (next_celda) {
						cursor = next_celda;
					} else {
						
						const next_row = Ranget._fc_to_celda(fin_fc.fila + 1, 0);
						cursor = next_row ? next_row : 'A0';
					}
					is_colocado = true; 
				}
				if (intentos >= MAX_INTENTOS) {
					// throw new Error(`💥 Máximo de ${MAX_INTENTOS} intentos alcanzado para la reserva ${ficha_geo.nombre_rango}.`);
					break; // Salimos del bucle de reservas.
				}
			}
			// ┌• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • 
			// ┌•• Del bucle se sale porque acaba las reservas ok, por error o por max_intentos.
			// En caso de Ok o max-intentos hay que REGISTRAR la reserva, pero esto se puede VALIDAR.
			const val_api_reservas_bef = reservas_raw;
			// ┌•••••••••••••••••
			// ┌•• REGISTRO FINAL
			// ┌•••••••••••••••••
			Salon.RegisteR();
			
			// ┌••             •••      •••   
			// ┌•• Validación Antes y despues de registrar
			const val_api_reservas_aft = Salon._modulo_reservas( 'central' , false);
			if(val_api_reservas_aft.length !== val_api_reservas_bef.length) {
				console.log(`⚠️​ Advertencia: El número de reservas antes (${val_api_reservas_bef.length}) y después (${val_api_reservas_aft.length}) de re-posicionar no coincide.`);
			}

			console.log("\n✔️ Re-Posicionamiento completado con éxito. ✔️");
			return true;
		} catch (error) {
			console.error("\n❌ Error en re__posicionar:", error);
			// Si hay un error, el salón queda en un estado inconsistente (limpio o a medio colocar)
			// La solución es limpiar y luego restaurar el último estado conocido.
			this.limpiar_Salon();
			return false;
		}
	}
	
	/**
	 * @param {object} dimension {filas:(integer) , columnas:(integer)} 
	 * */
	_is_dimension_ok(dimension=null, limites=null){
		if(!dimension) return;
		const filas = dimension.filas;
		const columnas = dimension.columnas;
		const LMT = this.Salon.limites

		const max_f = LMT.filas.max;
		const min_f = LMT.filas.min;
		const max_c = LMT.columnas.max;
		const min_c = LMT.columnas.min;

		if (filas > max_f || filas < min_f){
			return false;
		}else if(columnas > max_c || columnas < min_c ){
			return false;
		}
		return true;
	}
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ OFFCANVAS CONFIGURACION
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		
	/**
	 * ### CArga los elementos Dom Html del offcanvas-configuracion con los valores iniciales
	 * #### • configura  el event listener para permitir cambios.
	 * #### • Solo se ejecuta en el constructor de salon para la carga inicial de las dimensiones. 
	 * {@link Configuracion_Salon}
	 */
	_load_offcanvas_configuracion() {
		// const UI = this.UI;
		// ■ Guardo los valores en una variable(rescate) para poder volver al inicio si algo sale mal.
		let rescate = { cols: '',fils: '',name: '',};

		// Establecer valores iniciales y límites
		if (this.$nombre_salon) {
			this.$nombre_salon.value = this.Salon.family;
			
			rescate.name = this.$nombre_salon.value;
		}
		if (this.$filas) {
			// this.$filas.value = this.dimension_inicial.filas;
			this.$filas.value = this.Salon.filas;
			this.$filas.min = this.Salon.limites.filas.min;
			this.$filas.max = this.Salon.limites.filas.max;

			rescate.fils = this.$filas.value;
		}
		if (this.$columnas) {
			// this.$columnas.value = this.dimension_inicial.columnas;
			this.$columnas.value = this.Salon.columnas;
			this.$columnas.min = this.Salon.limites.columnas.min;
			this.$columnas.max = this.Salon.limites.columnas.max;

			rescate.cols = this.$columnas.value;
		}

		this._pintar_info_config_inicial();

		// ​👂​👂 Sincroniza los botones del offcanvas configuración con 
		this._sincronizar_sidebar_UI();		

		// const UI = this.Salon?.CFG?.UI;

		// ​👂​👂 Agregar Event Listener al formulario (solo si el usuario NO está logueado)
		if (this.$formulario) {
			this.$formulario.addEventListener('submit', (event) => {
				event.preventDefault(); // Evita el envío del formulario tradicional
				
				// ┌••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
				// ■ ■ ■ ■ No se puede Cambiar la dimensión de un salon si el Salon tiene elementos.
				// ┌••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
				const numero_elementos = this.Salon._get_ids_onplay('all').length;				
				if(numero_elementos > 0) {
					// console.log(`⚠️​ NO SE PUEDE CAMBIAR LA DIMENSION DEL SALON CUANDO TIENE ELEMENTOS.... Numero de Elementos ${numero_elementos}`);
					// alert(`⚠️​ NO SE PUEDE CAMBIAR LA DIMENSION DEL SALON CUANDO TIENE ELEMENTOS\n.... Numero de Elementos ${numero_elementos}`);
					this.$columnas.value 	 = rescate.cols;
					this.$filas.value 	 	 = rescate.fils;
					this.$nombre_salon.value = rescate.name;
					// Alertas_UI._NotA("❌ Operacion Anulada", "No se Puede Cambiar la Dimension del Salón cuando Tiene elementos", "danger");
					console.log("❌ Operacion Anulada", "No se Puede Cambiar la Dimension del Salón cuando Tiene elementos", "danger");
				}else{
					this.accion_submit_offcanvas_configuracion(this.$filas.value, this.$columnas.value, this.$nombre_salon, true);
					// ┌• ENTORNO MOVIL, cierra el offcanvas tras guardar.
					const entorno_now = Compatibilidad._detectar_entorno();
					if(entorno_now.tipo == 'MOVIL') 
						this._cerrar_menu_offcanvas_configuracion('menuOffcanvas');
				}
			});
		}

	}

	/**
	 * ### Muestra los valores originales de dicc_config (no editables) sobre filas/columnas.
	 * {@link _load_offcanvas_configuracion}
	 */
	_pintar_info_config_inicial() {
		if (this.$info_columnas) {
			const columnas_inicial = Number(this.dicc_config_inicial?.columnas);
			
			const texto_columnas = Number.isFinite(columnas_inicial)
				? `Configurado: ${columnas_inicial} columnas`
				: 'Configurado: columnas sin definir';
			this.$info_columnas.textContent = texto_columnas;
		}

		if (this.$info_filas) {
			const filas_inicial = Number(this.dicc_config_inicial?.filas);
			
			const texto_filas = Number.isFinite(filas_inicial)
				? `Configurado: ${filas_inicial} filas`
				: 'Configurado: filas sin definir';
			this.$info_filas.textContent = texto_filas;
		}
	}

	/**
	 * ### Conecta la UI de posiciones del sidebar con el sidebar real.	 */
	_sincronizar_sidebar_UI() {
		// const botones = Array.from(this.$sidebar_posiciones || []);
		// if (botones.length === 0) return;
		const toggle = this.$sidebar_posicion_toggle;
		if (!toggle) return;

		const posicion_inicial = this.Salon?.Side_Elementos?.posicion ?? 'right';
		// this.__marcar_boton_posicion_sidebar(posicion_inicial, botones);
		this.__marcar_toggle_posicion_sidebar(posicion_inicial, toggle);

		// botones.forEach((boton) => {
		// 	boton.addEventListener('click', () => {
		// 		const nueva_posicion = boton.dataset.sidePosition;
		// 		if (!nueva_posicion) return;
		// 		this.Salon?.Side_Elementos?.set_posicion(nueva_posicion);
		// 		this.__marcar_boton_posicion_sidebar(nueva_posicion, botones);

		// 	});
		// });
		toggle.addEventListener('change', () => {
			const nueva_posicion = toggle.checked ? 'right' : 'left';
			this.Salon?.Side_Elementos?.set_posicion(nueva_posicion);
			this.__marcar_toggle_posicion_sidebar(nueva_posicion, toggle);
		});

	}

	/**
	 * ### Refresca el estado visual del selector de posición.
	 */
	// __marcar_boton_posicion_sidebar(posicion, botones) {
	// 	botones.forEach((boton) => {
	// 		const es_activo = boton.dataset.sidePosition === posicion;
	// 		boton.classList.toggle('active', es_activo);
	// 		boton.setAttribute('aria-pressed', es_activo ? 'true' : 'false');
	// 	});
	// }
	__marcar_toggle_posicion_sidebar(posicion, toggle) {
		toggle.checked = posicion === 'right';
		toggle.setAttribute('aria-checked', toggle.checked ? 'true' : 'false');
	}


	/** ​👂​👂 
	 * ### Maneja la lógica del boton del offcanvas (filas/columnas) y llama a la función de re_posicionamiento.
	 * ### Se ejecuta cada vez que se pulsa el boton submit del formulario de configuracion SIEMPRE QUE NO HAYA NINGUN ELEMENTO EN EL SALON.
	 * ### PERMITE CAMBIAR LAS FILAS Y COLUMNAS PERO SOLO CUANDO NO HAY ELEMENTOS POR SIMPLICIDAD. 
	 * @param {string} nuevas_filas - El nuevo número de filas como string.
	 * @param {string} nuevas_columnas - El nuevo número de columnas como string.
	 * @param {boolean} permite_vulnerar_limites, de momento siempre true.... preparado para ampliar funcionalidad.
	 * {@link _load_offcanvas_configuracion}
	 */
	accion_submit_offcanvas_configuracion(nuevas_filas, nuevas_columnas, nombre_salon, permite_vulnerar_limites = true) {

		const filas = parseInt(nuevas_filas, 10);
		const columnas = parseInt(nuevas_columnas, 8);

		if(this.Salon.filas == nuevas_filas && this.Salon.columnas == nuevas_columnas) return;

		// ■ NO PERMITE VULNERAR LOS LIMITES:
		// if (isNaN(filas) || 
		// 	isNaN(columnas) || 
		// 	filas < this.limites.filas.min || 
		// 	columnas < this.limites.columnas.min ||
		// 	filas > this.limites.filas.max || 
		// 	columnas > this.limites.columnas.max) {
			// 		console.error(`Dimensiones inválidas o fuera de rango ${filas}x${columnas}`);
			// 		return false;
			// }
			
		// ■ SI PERMITE VULNERAR LOS LIMITES:
		const LMT = this.Salon.limites;
		if( permite_vulnerar_limites ){
			// ■ PERMITE VULNERAR LOS LIMITES POR ARRIBA
			if (isNaN(filas) || 
				isNaN(columnas) || 
				filas < LMT.filas.min || 
				columnas < LMT.columnas.min ) {
					console.error(`Dimensiones inválidas o fuera de rango ${filas}x${columnas}`);
					return false;
			}
		}else{

		}
		try {
			// ■ AÑADE O QUITA BALDOSAS
			const ok_total = this.Salon.set_total_baldosas( filas * columnas );

			// ■ CAMBIA COLUMNAS             ... CAMBIANDO el GRID
			const ok_updt = this.api_update_columnas('.' + this.configuracion.salon.clases_css.contenedor, columnas);		

			// ■ RE-POSICIONA LAS RESERVAS EN EL SALON
			const ok_re = this.api_re_posicionar();

			if(ok_total && ok_updt && ok_re!=false){
				this.Salon.filas = filas;
				this.Salon.columnas = columnas;
				console.log(`✅ Add Baldosas + Update Columnas + Re posicionamiento = ${filas} filas x ${columnas} columnas`);
			}else{				
				throw new Error('❌ Fallo al Guardar OffCanvas.');
			}	
		} catch (error) {
			console.log( `❌ Error:: accion_Guardar_cofiguracion:: msg:: ${error.message}`  );			
			return false;			
		} finally {
			// ■ POR SI AUMENTA EL NUMERO DE COLUMNAS Y NECESISA SCROLL.
			this._when_redimension();
			console.log('Finalizado proceso de Guardar OffCanvas.');	
		}		
	}

	/**
	 * ### Cierra el menu offcanvas de configuración. 
	 * @param {string} id_menu 
	 * {@link _load_offcanvas_configuracion}
	 */
	_cerrar_menu_offcanvas_configuracion(id_menu){
		if(typeof(id_menu) != 'string' || id_menu.trim() === '') return;
		// Seleccionamos el elemento del offcanvas
		// const myOffcanvasElement = document.getElementById(id_menu);
		const myOffcanvasElement = e_Salon._to_element(id_menu);
		if(!myOffcanvasElement) return;

		// Creamos la instancia de Bootstrap (o la recuperamos si ya existe)
		const busquedaOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(myOffcanvasElement);
		if(busquedaOffcanvas) busquedaOffcanvas.hide();
	}

	// ■■■
	// ■■■ VER INFO MODAL
	// ■■■

	/** 🧠 
	 * ### Crea un Objeto Modal Bootstrap 'Al vuelo', que:
	 * ### Muestra las Reservas y Mensajes y Diccionario inicial de Configuración
	 * ####  • Para ello, recorro todas las **reservas** y las muestro en un formato legible.
	 * ####  • Recorro el objeto MSG_S con los mensajes de cada silla.
	 * ####  • Recorro el dicc_salon con la configuración de la APP Salon.	 
	 * ### ...Con estos datos creo un Objeto Modal al vuelo y lo muestro. El objeto se destruye tras su cierre.
	 * {@link api_ver_informacion_Salon}
	*/
	__abrir_ventana_informacion(texto_to_alert='', titulo_modal='🧩 Información sobre el Salón') {
		
		// ■■ Limpiar modales anteriores del mismo tipo
		const oldModals = document.querySelectorAll('[id^="jsonModal_"]');
		oldModals.forEach(modal => {
			// ■ Cerrar primero si está abierto
			const $formulario_bootstrap_modal = bootstrap.Modal.getInstance(modal);
			if ($formulario_bootstrap_modal) {
				$formulario_bootstrap_modal.hide();
			}
			// ■ Remover del DOM
			setTimeout(() => modal.remove(), 100);
		});

		const modal_id = Herramientas._get_secuencial_dom('json_Modal');		
		
		// ■■ Crear modal dinámicamente
		const modalHTML = `
		<div class="modal fade" id="${modal_id}" tabindex="-1" data-tipo-bs="offcanvas-info" data-info="config-info-modal">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header" data-info="header">
						<h5 class="modal-title">${titulo_modal}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="modal-body">
						<pre class="bg-light p-3 rounded  pre-wrap" data-info="contenido">${texto_to_alert}</pre>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
					</div>
				</div>
			</div>
		</div>
		`;
		
		// ■■ Añadir al body 
		document.body.insertAdjacentHTML('beforeend', modalHTML);
		const modal_bs = new bootstrap.Modal(document.getElementById(modal_id));
		
		// ■■ muestra el objeto Modal
		modal_bs.show();
		
		// ​👂​👂 Limpiar al cerrar 
		const $modal = document.getElementById(modal_id)
		$modal.addEventListener('hidden.bs.modal', function() {
			this.remove();
		});
	}

	/**	​👂​​👂​ -  ✒️✒️ SOLO SE EJECUTA CUANDO SE HACE SUBMIT SOBRE EL BOTON GUARDAR DE OFFCANVAS CONFIGURACION.
	 * ### _when_resize Sobre-Escribe ✒️ el método de Tablero_Drop.
	 * ###	Cuando redimensiona, si las columnas son mayores que su dimension_inicial, añade un scroll horizontal.
	 */
	_when_redimension(){
		this.Salon._when_resize();
	}

	/**
     * ### Gestiona el scroll horizontal basándose en los estándares del dispositivo vs la configuración real.
     * Si tengo 14 columnas y el móvil "soporta" 8 visualmente, calculo el ancho de celda
     * basado en esas 8 y fuerzo el contenedor a medir (AnchoCelda * 14), provocando scroll.
	 * {@link e_Salon. _when_resize}
     */
    _scroll() {
		const $contenedor = this.Salon.contenedor ;
		const n_columas = this.Salon.columnas;

        if (!$contenedor) return;

        const ancho_pantalla = window.innerWidth;

        // 1. DEFINIR ESTÁNDARES (Tu barrera de scroll)
        // Estos son los valores que "deberían" caber en cada pantalla según tu diseño.
        let columnas_estandar_dispositivo = 24; // Default PC
        
        if (ancho_pantalla < 576) {          // MÓVIL
            columnas_estandar_dispositivo = 8;
        } else if (ancho_pantalla < 992) {   // TABLET
            columnas_estandar_dispositivo = 16;
        } else {                             // PC / DESKTOP
            columnas_estandar_dispositivo = 24;
        }

        // 2. CALCULAR EL "ANCHO IDEAL" DE UNA COLUMNA
        // Si en un móvil de 400px deben caber 8 columnas -> cada columna mide 50px.
        const ancho_pixel_columna = Number((ancho_pantalla / columnas_estandar_dispositivo).toFixed(2));

        // 3. CALCULAR EL ANCHO TOTAL QUE NECESITA TU CONFIGURACIÓN ACTUAL
        // Si tú tienes 14 columnas configuradas -> necesitas 14 * 50px = 700px.
        const ancho_total_necesario = Number((ancho_pixel_columna * n_columas).toFixed(2));

        // 4. APLICAR AL CONTENEDOR
        $contenedor.style.overflowX = 'auto'; // Habilitar scroll si es necesario

        if (n_columas > columnas_estandar_dispositivo) {
            // CASO SCROLL: Necesitamos más espacio del que hay.
            // Forzamos el ancho calculado. Al ser mayor que window.innerWidth, el navegador activa el scroll.
            $contenedor.style.minWidth = `${ancho_total_necesario}px`;
            
        } else {
            // CASO FIT: Caben perfectamente (o sobran).
            // Dejamos que ocupe el 100% y que CSS Grid distribuyan el espacio.
            $contenedor.style.minWidth = '100%';
        }
    }


	// ■■
	// ■■ ZONA DE REPOSICIONAMIENTO
	// ■■	
	/**
	 * ### Valida que un elemento de una reserva no toca a otra mesa de otra reserva(si puede tocar sillas.).
	 * (Valida los 8 puntos cardinales y diagonales: N, S, E, W, NE, NW, SE, SW).
	 * @param {Object} rango_free Rango propuesto
	 * @param {Array<String>} ids_reserva Lista de IDs que pertenecen a esta reserva (no son conflicto)
	 * @returns {Boolean} true si hay conflicto con otra reserva, false si es seguro colocar.
	 */
	_es_posicion_conflictiva(rango_free, ficha, ids_reserva = []) {
		const celda_inicio_free = rango_free.celda_inicio;
		// const tipo_mesa = 'mesa';
		// let soy_mesa = false;
		
		// Obtenemos las claves del catálogo UNA sola vez por rendimiento
        const id_keys = Catalogo.get_keys();

		// Recorremos solo los elementos que vamos a colocar
		for (const item of ficha.items) {

			// 💥💥💥💥💥💥💥💥
			// 💥💥💥💥💥💥💥💥
			// ■ Identificar el ROL del elemento a colocar (central, cliente...)
            const key_item = id_keys.find(k => item.id.startsWith(k));
            const item_catalogo = key_item ? Catalogo.get(key_item) : null;
            const mi_rol = item_catalogo ? item_catalogo.rol : null;

			// ■ Calculamos dónde caería esta pieza
            const celda_destino = this.Salon.eRdS.suma_fc(celda_inicio_free, item.delta_y, item.delta_x);
            if (!celda_destino) return true; // Error o fuera de rango

            const indice_matriz = this.Salon.eRdS.X_to_indice(celda_destino);
            let baldosa_obj = this.Salon.matriz_plana[indice_matriz]; 
            if (!baldosa_obj) return true;
			
			// ■ USAMOS SCANNER_NSEW sobre esa baldosa para ver sus vecinos ACTUALES
            const scan_result = this.Salon.scanner_nsew(baldosa_obj.elemento_div); 

            // ■ Revisamos los 8 vecinos (N, S, E, W + Diagonales)
            let vecinos = [
                baldosa_obj.scan.n,  baldosa_obj.scan.s,  baldosa_obj.scan.e,  baldosa_obj.scan.w,
                baldosa_obj.scan.ne, baldosa_obj.scan.nw, baldosa_obj.scan.se, baldosa_obj.scan.sw
            ];
			// Limpiamos los vecinos (solo strings válidos)
            vecinos = vecinos.filter(x => x && typeof x === 'string' && x.trim() !== ''); 
            
            if(vecinos.length === 0) continue; // No hay vecinos, no hay conflicto
			
			// ■ Analizamos conflictos basados puramente en el ROL
            for (const vecino_id of vecinos) {
                
                // Obtenemos el rol del vecino
                const key_vecino = id_keys.find(k => vecino_id.startsWith(k));
                const vecino_catalogo = key_vecino ? Catalogo.get(key_vecino) : null;
                const rol_vecino = vecino_catalogo ? vecino_catalogo.rol : null;

                // Si el vecino es decoración o estructura, no interactúa con los players (no hay conflicto)
                if (rol_vecino !== 'central' && rol_vecino !== 'cliente') {
                    continue; 
                }

                // ► Si YO soy un 'central' (ej: mesa, taburete) y tengo un vecino player (sea lo que sea) HAY CONFLICTO ❌
                if (mi_rol === 'central') {
                    return true;
                }
                
                // ■ Si NO soy un 'central' (ej: soy un 'cliente' como una silla)
                // y me choco con un 'central' vecino...
                if (rol_vecino === 'central') {                            
                    // ¿Es de nuestra propia reserva ("familia")?
                    if (ids_reserva.includes(vecino_id)) {
                        continue; // Reserver propio, NO hay conflicto.
                    } else {
                        return true; // ¡Es un central de otra reserva! CONFLICTO.
                    }
                }
                
                // Si llegamos aquí, es un cliente tocando a otro cliente, lo cual está permitido
                // (por ejemplo, dos sillas tocándose espalda con espalda)
            }
			
			// Ninguna de las piezas a colocar encontró conflicto
			return false;

			// 💥💥💥💥💥💥💥💥
			// 💥💥💥💥💥💥💥💥

		// 	// Si el objeto de la reserva que quiero colocar es una mesa.....
		// 	if (item.id.toLowerCase().startsWith(tipo_mesa)) 
		// 		soy_mesa = true;
		// 	else  
		// 		soy_mesa = false;
			
		// 	// 1. Calculamos dónde caería esta mesa
		// 	const celda_destino = this.Salon.eRdS.suma_fc(celda_inicio_free, item.delta_y, item.delta_x);
		// 	if (!celda_destino) return true; // Error o fuera de rango

		// 	const indice_matriz = this.Salon.eRdS.X_to_indice(celda_destino);
		// 	let baldosa_obj = this.Salon.matriz_plana[indice_matriz]; 
		// 	if (!baldosa_obj) return true;

		// 	// 2. USAMOS SCANNER_NSEW sobre esa baldosa para ver sus vecinos ACTUALES
		// 	const scan_result = this.Salon.scanner_nsew(baldosa_obj.elemento_div); 

		// 	// 3. Revisamos los 8 vecinos (N, S, E, W + Diagonales)
		// 	let vecinos = [
		// 		baldosa_obj.scan.n,  baldosa_obj.scan.s,  baldosa_obj.scan.e,  baldosa_obj.scan.w,
		// 		baldosa_obj.scan.ne, baldosa_obj.scan.nw, baldosa_obj.scan.se, baldosa_obj.scan.sw
		// 	];
		// 	// ...y eliminamos null/false
		// 	vecinos = vecinos.filter(x => x !== null && x !== false && x !== undefined && x.trim() !== '');	
		// 	if(vecinos.length === 0) continue; // No hay vecinos, no hay conflicto
			
		// 	// Recorremos los vecinos ya colocados antes de hacer scanner_nsew... si los tiene
		// 	for (const vecino_id of vecinos) {					
		// 		if (typeof(vecino_id) === 'string') {						
		// 			// ► Si Soy mesa y además tengo vecinos, sea mesa o silla, HAY CONFLICTO ❌
		// 			if(soy_mesa === true) return true;
		// 			// ■ NO SOY MESA, SOY SILLA
		// 			// ■ ¿EL VECION, Es una MESA?
		// 			if (vecino_id.toLowerCase().startsWith(tipo_mesa)) {							
		// 				// ¿Es de nuestra propia reserva ("familia")?
		// 				if (ids_reserva.includes(vecino_id)) {
		// 					// Mesa propia, NO hay CONFLICTO.
		// 					continue; 
		// 				} else {
		// 					// ¡Es una Mesa de otra reserva! CONFLICTO.
		// 					return true; 
		// 				}
		// 			}
		// 		}
		// 	}
		// // }
		}
		
		// // Ninguna de las mesas a colocar encontró conflicto
		// return false;
	}

	/** 
	 * ## Genera y Devuelve una ficha de cada reserva, aportando informacion de RANGOS. Fase Previa de RE-POSICIONAR.
	 * ### • Crea rangos temporales (prev_X) y calcula geometría relativa ( delta ).
	 * ### • (delta) = distancia desde la esquina superior izquierda del rango temporal y el elemento. Esto permite reposicionar los elementos en su posicion-original.
	 * @param {Array} foto_reservas Array-json de objetos reserva [{mesas:[], sillas:[]}]
	 * {@link api_re_posicionar}
	 * ```javascript
	 * [ { nombre_rango: "prev_0", num_rows: 1, num_cols: 2, 
	 *	items: [
	 *	{id: "mesa_0", elemento_dom: {},delta_y: 0, delta_x: 1,},
	 *	{id: "silla_1",elemento_dom: {},delta_y: 0,delta_x: 0,},  ], },
	 *	{ nombre_rango: "prev_1", num_rows: 1,num_cols: 3,
	 *	items: [
	 *	{id: "silla_2",elemento_dom: {},delta_y: 0,delta_x: 0,},
	 *	{id: "silla_0",elemento_dom: {},delta_y: 0,delta_x: 1,},
	 *	{id: "silla_3",elemento_dom: {},delta_y: 0,delta_x: 2,},  ] , } , ]
	 * ```
	 */
	_procesar_geometria_relativa(foto_reservas) {
		const arr_retorno = [];
		const Ranget = this.Salon.eRdS;

		foto_reservas.forEach((reserva, i) => {
			// 1. Identificar todos los IDs de la reserva
			
			const reservadores = Array.isArray(reserva?.reservadores) ? reserva.reservadores : [];
			const clientes = Array.isArray(reserva?.clientes) ? reserva.clientes : [];
			const ids_items = [...reservadores, ...clientes].filter(Boolean);
			if (ids_items.length === 0) return [];

			// ┌••   •••••••••••••  •••••••••••••••••••
			// • • • Caso especial: reservas sin mesas. Las sillas se agrupan en línea
			// para compactar la geometría y facilitar el re_posicionamiento.
			if (reservadores.length === 0 && clientes.length > 0) {
				const items_geometria = [];
				clientes.forEach((id, index) => {
					const elemento_dom = document.getElementById(id);
					if (!elemento_dom) return [];
					items_geometria.push({
						id: id,
						elemento_dom: elemento_dom,
						delta_y: 0,
						delta_x: index
					});
				});

				if (items_geometria.length === 0) return [];
				arr_retorno.push({
					nombre_rango: `rango_temp_${i}`,
					num_rows: 1,
					num_cols: items_geometria.length,
					items: items_geometria
				});
				return [];
			}

			// ┌•• Calcular Mínimos y Máximos para definir el rango
			let minF = Infinity, maxF = -Infinity, minC = Infinity, maxC = -Infinity;
			const elementos_con_coordenadas = [];
			
			// ┌•• Recolectar coordenadas 
			ids_items.forEach(id => {
				// ┌•• Clase Rango para consultar la celda. Si la matriz está vacía, no se procesa.
				const celda = Ranget._search_celda(id); 
				if (celda) {
					const fc = Ranget._celda_to_fc(celda);
					if (fc.fila < minF) minF = fc.fila;
					if (fc.fila > maxF) maxF = fc.fila;
					if (fc.columna < minC) minC = fc.columna;
					if (fc.columna > maxC) maxC = fc.columna;
					
					// Guardamos temporalmente la celda original para el mapa invertido posterior
					elementos_con_coordenadas.push({id, celda, fc});
				}
			});

			// ┌•• Si no encontramos coordenadas para NINGÚN elemento (salón limpio), SALIMOS	
			if (elementos_con_coordenadas.length === 0) return [];

			// ┌•• Crear Rango Temporal 'prev_i' y obtener el mapa invertido
			const nombre_rango = `rango_temp_${i}`;
			
			// ┌•• Los elementos ya tienen coordenadas. Creamos el mapa invertido
			const mapa_invertido = {};
			elementos_con_coordenadas.forEach(item => {
				mapa_invertido[item.id] = item.celda;
			});
			
			// ┌•• ••••••••                       •••••
			// ┌•• Calcular posiciones relativas (Deltas) 🧠🧠
			// ┌•••••••••••••••••••••••••••••••••••••••••• 
			const items_geometria = [];			
			ids_items.forEach(id => {
				const celda_original = mapa_invertido[id]; 
				const elemento_dom = document.getElementById(id); // Referencia viva al DOM

				if (celda_original && elemento_dom) {
					// ┌•• Usamos la celda original para calcular el delta
					const fc_item = Ranget._celda_to_fc(celda_original);
					
					// ┌•• Calculamos el Delta (Distancia desde la esquina superior izquierda del rango)
					const delta_y = fc_item.fila - minF;
					const delta_x = fc_item.columna - minC;

					items_geometria.push({
						id: id,
						elemento_dom: elemento_dom,
						delta_y: delta_y,
						delta_x: delta_x
					});
				}
			});

			// ┌•••••••••••••••••••••••••••••••••• 
			// ┌•• ♟️ Ficha GEOMETRÍA RELATIVA ♟️
			// ┌•••••••••••••••••••••••••••••••••• 
			arr_retorno.push({
				nombre_rango: nombre_rango,
				num_rows: (maxF - minF) + 1,
				num_cols: (maxC - minC) + 1,
				items: items_geometria
			});
		});		
		// console.log(" ▶️ Geometría PREV:", arr_retorno);
		return arr_retorno;
	}

	/**
	 * ### Hace un limpiado del salon. 
	 * #### • Elementos mesa , silla  
	 * #### • Registro de Reservas
	 * #### • Mensajes de Clientes y Reservas
	 * Usado en: {@link Foto_CRUD. _accion_cargar_elementos_en_Salon} ■ {@link Configuracion_Salon. api_reiniciar_salon}
	 * 
	 */
	limpiar_Salon() {
		if (!this.Salon) return;
		// console.log("🧹 🧹 Limpiando mesas, sillas y decoración...");
		this.Salon.clean_elementos_Salon('todo');	// reset elementos.
		this.Salon.reservas = [];					// reset reservas.
		this.Salon.MSG_M?.reset();		// reset mensajes de mesas.
		this.Salon.MSG_A?.reset();		// reset diccionario de alergias(solo sillas-clientes).
		console.log("┌■■ Salon Limpio 🚿. Preparado para Cargar Foto . . . ✔️");		
	}
	
	/**
	 * Valida si un parámetro es un array (ya sea objeto o cadena JSON válida).
	 * @param {any} dato - El valor a validar.
	 * @returns {boolean}
	 */
	static _es_array_json(dato) {
		// Si ya es un array, no necesitamos parsear
		if (Array.isArray(dato)) {
			return true;
		}

		// Si no es un string, no puede ser un JSON parseable a array
		if (typeof dato !== 'string') {
			return false;
		}

		try {
			const resultado = JSON.parse(dato);
			// Verificamos que el resultado del parseo sea efectivamente un array
			// (JSON.parse puede devolver objetos, números, etc.)
			return Array.isArray(resultado);
		} catch (error) {
			// Si falla el parseo, no es un JSON válido
			return false;
		}
	}
	
	/**
     * ### Verifica que cada elemento tenga las propiedades físicas y visual mínimas.     */
    __validar_catalogo_elementos(catalogo) {
		// Fisica y Visual son obligatorias, la lógica es opcional
        const campos_obligatorios = ['slug', 'fisica', 'visual'];
        
        Object.entries(catalogo).forEach(([key, valor]) => {
            campos_obligatorios.forEach(campo => {
                if (!valor[campo]) {
                    throw new Error(`[Error de Esquema]: El elemento '${key}' del catálogo carece del campo '${campo}'.`);
                }
            });

            // Validación específica de física para el motor de colisiones
            if (typeof valor.fisica.ancho !== 'number' || typeof valor.fisica.alto !== 'number') {
                throw new Error(`[Error de Datos]: Propiedades físicas inválidas en '${key}'.`);
            }
        });
    }
	/**
     * @private
     * @method _deep_freeze
     * @description Congela recursivamente un objeto para garantizar inmutabilidad absoluta.
     */
    _deep_freeze(obj) {
        Object.keys(obj).forEach(prop => {
            if (typeof obj[prop] === 'object' && obj[prop] !== null && !Object.isFrozen(obj[prop])) {
                this._deep_freeze(obj[prop]);
            }
        });
        return Object.freeze(obj);
    }

	get configuracion() { return this._configuracion; }
	set configuracion(valor) {
		this._configuracion = valor;
	}
	get diccionario(){return this.configuracion;	}
	set diccionario(valor){ 
		this.configuracion = valor; 
	}
	get entorno() { return this._entorno; }
	set entorno(valor) { 
		this._entorno = valor; 
	}
	get dimension_inicial() { return this._dimension_inicial; }
	set dimension_inicial(valor) { 
		this._dimension_inicial = valor;  
	}
	get limites() { return this._limites; }
	set limites(valor) {
		 this._limites = valor;  
	}
	get icono() {return this.$trigger}
	set icono(valor) { 
		this.$trigger = valor
	}
	/** ### Establece la separacion de la mesas para RE-POSICIONAR.
	 * ### Re-posicionar se produce cuando se cambia de dimensión un salón de mayor dimensión a menor dimensión. */ 
	get gap() { return this._gap; }
	set gap(valor) {
		this._gap = valor;
	}

}
// ■ ■ ■ 
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Compatibilidad;
// }
// ■ ■ ■ 





// ◘◘◘
// ◘◘◘ CLASE Login__Registro_Modal 
// ◘◘◘ 
/** 
 * ### el Usuario quiere Logearse o Registrarse. 
 * *  EVENTOS DISPARADOS:
 * 		'salon:auth-success': Se dispara cuando el usuario se loguea o registra ok.
 * 		detail: { user: objetoUsuario, token: stringToken }
 * 
 * * Llamamos a la clase Login__Registro_Modal que emite una ventana modal para registrarse.
 * * Esta clase solo tiene que mostrar los formulalarios  con el boton submit y gestionar el envío de los datos POST.
 * * ► En caso de Log exito
 * * ► En caso de Registro exito
 */
class Login_Modal {

	// STATIC PARAM 🧍‍♂️
	static TABS_FORMULARIO = ['login', 'register'];
	/**
	 * ### Clase que maneja el modal de Login / Registro de usuarios.	
	 * @param {String} claseName_icono, la clase unica del icono(bi), necesaria para identificar el icono.
	 */
    constructor(claseName_icono=null) {
		if (typeof(claseName_icono) != 'string' || claseName_icono.trim() === ''){
			console.log(`❌ Error::: No hay icono`)
		}
		this.$trigger_icon = document.querySelector(claseName_icono);

		this.modal_id = 'acceso_modal_usuario';
        // Renderizamos el HTML solo si no existe
		if (!document.getElementById(this.modal_id)) this._inyectarHTML();		
        

        this.$formulario_login = null; // Instancia de Bootstrap
		this.jwtKey = 'token';
		
        
		// Referencia al botón del DOM
        this.$boton_login = e_Salon._to_element('login-submit');
        
        // Cacheamos elementos del DOM 
        this.dom = {
            $modal: e_Salon._to_element(this.modal_id),
            $formLogin: e_Salon._to_element('formLogin'),					// formulario Login. 
            $formRegistro: e_Salon._to_element('formRegistro'),				// formulario Registro. 
            $alertArea: e_Salon._to_element('authFeedback'),				// zona de mensajes.
            btn_toggle_nodlist: document.querySelectorAll('[data-auth-mode]')
        };
		// Componentes de Login
		this.$login_comps = {
			$usuario: e_Salon._to_element('login-identifier'),
			$password: e_Salon._to_element('login-password'),
			$submit: e_Salon._to_element('login-submit'),
		}
		// Componenetes de Registro
		this.$register_comps = {
			$usuario: e_Salon._to_element('register-identifier'),
			$password: e_Salon._to_element('register-password'),
			$mail: e_Salon._to_element('register-mail'),			
			$submit: e_Salon._to_element('register-submit'),			
		}

        // Crear el objeto Modal de Bootstrap
        this.$formulario_login = new bootstrap.Modal(this.dom.$modal, { backdrop: 'static', keyboard: true });
		// Listeners de comportamiento sobre el objeto
        this._iniciarListeners();
		// Inspeccion de la UI 🖼️
		this._sincroniza_UI();
    }

	get icono(){
		return this.$trigger_icon;
	}
    /** 
     * ### UI 🖼️ Abre una ventana Modal-Bootstrap con la pestaña especificada
	 * #### La ventana se ***limpia*** antes de ser abierta. 
     * @param {'login'|'register'} modo pestaña  ***'login'*** (byDef) o ***'reister'***
     */
    abrir_ventana(modo = 'login') {
		if(typeof(modo) != 'string' || !Login_Modal.TABS_FORMULARIO.includes(modo.toLowerCase())) return false;

        this._select_tab_authentication(modo);		// abre la pestaña Login
        this._limpiarMensajes();					// Limpia $alertArea
		this._sincroniza_UI();						// Boton Log-Out
		if (this.$formulario_login)
			this.$formulario_login.show();					// Muestra el formulario.
    }

    cerrar_ventana() {
        this.$formulario_login.hide();
    }
	
	/** 👂 👂 
	 * ■■■■ Lógica de Inicio de sesion. se produce cuando salta un evento 'salon:auth-success' ... USUARIO LOGUEADO	
	 * @param {detail} ev.detail = { user : ..., token : ... }
	 */
	_when_log_IN(datosAuth){
		this._sincroniza_UI(datosAuth?.user);

		console.log(`⌛​​ usuario '${datosAuth?.user?.username ?? 'X'}' conectado`)
	}

	/**
     * ■■■■ Lógica de cierre de sesión
     */
    _when_log_OUT() {
        // console.log('Class Login__Registro_Modal: Ejecutando Logout...');
        const user = JSON.parse(localStorage.getItem('currentUser'));
        // 1. Borrar credenciales
        Login_Modal._clear_auth_storage();
		
        // 2. Feedback visual y reset de 🖼️ UI 
		this._sincroniza_UI();

		console.log(`🧷​​ usuario '${user?.username ?? 'X'}'  des-conectado`)
		
    }

    // ■■■■■■■■■■■■■■■■■■■■ LÓGICA INTERNA ■■■■■■■■■■■■■■■■■■■■

    _iniciarListeners() {
        // 1.  ​👂​👂 Switch entre pestañas Login / Registro
					
        this.dom.btn_toggle_nodlist.forEach(btn => {
			btn.addEventListener('click', (e) => {
				// cacho el elemento dom que causó el listner
				const obj_dom = e.target;
				// cacho el data-set del elemento dom (buscar en el html) • data-auth-mode="login" OR data-auth-mode="register"			
				const data_set = obj_dom.dataset.authMode;		

				this._select_tab_authentication(data_set)});
        });

        // 2. ​👂​👂 Submit Login
        this.dom.$formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            this._accion_submit_auth('/api/auth/login', new FormData(e.target));
        });

        // 3. ​👂​👂 Submit Registro ​
        this.dom.$formRegistro.addEventListener('submit', (e) => {
			e.preventDefault();
            this._accion_submit_auth('/api/auth/register', new FormData(e.target));
        });
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        // ​👂​👂 Escuchar el evento custom GLOBALMENTE (o en document)
		// ​​​​​​•​ Se Tiene que disparar manualmente en la clase Login__Registro_Modal al logguearse con Exito.
        // ​​​​​​​•​​ Esto separa la lógica de la clase de la lógica del salón.
        document.addEventListener('salon:auth-success', (e) => {
            this._when_log_IN(e.detail);			
			// this.accion_re_init_salon();				// • limpia el salon de contenido y de registro.
        });

		// ​👂​👂
		// Sobre el Boton de Login
		this.$boton_login.addEventListener('click', (e) => {
            const token = localStorage.getItem(this.jwtKey);

            if (token) {
                // Si hay token, el botón actúa como Logout
                e.preventDefault(); // Evitamos que el formulario intente enviarse (submit)
				this._preparar_logout_form();
                this._when_log_OUT();
            } 
            // Si NO hay token, dejamos que el evento continúe (submit) 
            // para que tu lógica de login existente haga el fetch al servidor.
        });
    }

    /** ​👂​ ​👂​ 
     * Método centralizado para peticiones de autenticación.
	 * Envía el formulario POST y espera la respuesta... si OK, LANZA el EVENTO personnalizado 'salon:auth-success' 
	 * escuchado en el constructor de Salon.
     */
    async _accion_submit_auth(url, formData) {

        this._limpiarMensajes();
        const data = Object.fromEntries(formData.entries());

        // Pequeño mapeo porque tu backend espera 'identifier' en login pero 'email' en registro
        if (data.email && !data.identifier) data.identifier = data.email;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const data_json = await response.json();
            if (!response.ok) throw new Error(data_json.message || '❌​ Error en la operación procesarAuth');
			
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
			// respuesta OK ✔️ : Guardamos token y user en localStorage
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 
			if (data_json?.token) 	localStorage.setItem('token', data_json.token);
			if (data_json?.user) 	localStorage.setItem('currentUser', JSON.stringify(data_json.user));
			
			// Preparo el 🖼️ UI 
			this._sincroniza_UI();
			
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
            // ✅ ÉXITO: Disparamos el evento personalizado
            this._disparar_evento_exito(data_json);

            this.cerrar_ventana();

        } catch (error) {
            this._mostrarError(error.message);
        }
    }
	/** ​👂​ ​👂​ 
	 * ### Dispara un evento custom 'salon:auth-success' con los datos de autenticación.
	 * 				.. en detail: { isAuthenticated:(true/false), user:(string) , token:(string) }
	 * @param {*} datos_auth { user: ..., token: ... } 
	 */
    _disparar_evento_exito(datos_auth) {
        // Creamos un evento propio del sistema. 
        // El 'detail' lleva los datos para que quien escuche los pueda usar.
        const evento = new CustomEvent('salon:auth-success', {
            detail: datos_auth, // { user: ..., token: ... }
            bubbles: true
        });
        document.dispatchEvent(evento);
    }

	/**  🖼️ UI 🖼️ Gestión visual de botones y formularios 
	 * ### Cuando cambiamos de pestaña de Login a Registro o viceversa.
	 * @param {*} modo 'login' | 'register' . Indica la pestaña que se tiene que abrir.
	 */
    _select_tab_authentication(modo) {
	
		if(typeof(modo) != 'string' || !Login_Modal.TABS_FORMULARIO.includes(modo.toLowerCase())) return false;

        this.dom.btn_toggle_nodlist.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.authMode === modo);
            btn.classList.toggle('btn-primary', btn.dataset.authMode === modo);
            btn.classList.toggle('btn-outline-primary', btn.dataset.authMode !== modo);
        });
		// Esta forma me vale mientras que haya dos pestañas: login / No Login (registro)
        if (modo === 'login') {
            this.dom.$formLogin.classList.remove('d-none');
            this.dom.$formRegistro.classList.add('d-none');
        } else {
            this.dom.$formLogin.classList.add('d-none');
            this.dom.$formRegistro.classList.remove('d-none');
        }

    }
	
	/**
	 * ### Devuelve true SI está authenticado | false si NO está autorizado.
	 */
	_is_authenticated(){
        const token = localStorage.getItem('token');
		const currentUser = localStorage.getItem('currentUser');
        const is_auth = Boolean(token && currentUser);
		return is_auth;
	}

	/** STATIC METHOD 🧍‍♂️
	 * ### Valida si el token expiró en el tiempo.
	 * @param {*} token Los JWT llevan la fecha de expiración codificada en su interior (en el campo exp). 
	 * 					No se necesita llamar al servidor para saber si el tiempo ya pasó.
	 * 					Se usa una función para decodificar la parte central (payload) del token:
	 * @returns True, expirado | False, valido
	 */
	static _is_token_expired(token) {
		try {
			// El payload es la segunda parte del token separada por puntos
			const payloadBase64 = token.split('.')[1];
			const decodedJson = JSON.parse(atob(payloadBase64));
			
			const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
			return decodedJson.exp < now; // Si la expiración es menor a "ahora", caducó
		} catch (e) {
			return true; // Si el token está mal formado, lo tratamos como expirado
		}
	}
	/**
	 * ### Método para verificar sesión al inicio.
	 */
	_check_auto_login() {
		// 1. Obtener credenciales (KISS: lectura directa)
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');

		if (!token || !user) return; // Si no hay datos, no hacemos nada (se queda en blanco)

		try {
			// 2. Verificar expiración del Token (Sin librerías externas)
			// El token JWT tiene 3 partes separadas por puntos. La segunda es el payload.
			const payload = JSON.parse(atob(token.split('.')[1]));
			const ahora = Math.floor(Date.now() / 1000);

			if (payload.exp < ahora) {
				console.warn('⚠️ Sesión expirada. Limpiando localStorage.');
				localStorage.clear(); // Limpieza para evitar errores futuros
				return;
			}

			// 3. Si es válido: Actualizamos el icono (🖼️ UI )
			// Usamos el selector exacto de tu HTML: data-action-nav="conn"
			const icono_login = document.querySelector('[data-action-nav="conn"]');
			
			if (icono_login) {
				// Cambio visual 🌈 : Quitamos blanco, ponemos color activo (ej: text-success o text-info)
				icono_login.classList.remove('text-white');
				icono_login.classList.add('text-success'); 
				
				// UX: Mostrar nombre del usuario en el hover (title)
				const userData = JSON.parse(user);
				icono_login.title = `Sesión iniciada: ${userData.nombre || userData.email || 'Usuario'}`;
				
				console.log('✅ Auto-login exitoso.');
			}

		} catch (error) {
			console.error('Error al verificar token:', error);
			localStorage.clear(); // Ante la duda, limpiar.
		}
	}
	/** 🖼️ UI 🖼️
	 * Cambia el color del icono de login para indicar estado.
	 * @param {boolean} activo - true si está logueado, false si no.
	 */
	_cambiarEstadoIconoLogin(activo) {
		const icono = this.icono;
		if (!icono) return;
		if (activo) {
			icono.classList.remove('bi-person-dash');
			icono.classList.add('bi-person-check-fill');
			icono.classList.add('text-success');
			icono.title = "Sesión iniciada";
		} else {
			icono.classList.remove('text-success');
			icono.classList.remove('bi-person-check-fill');
			icono.classList.add('bi-person-dash');
			icono.title = "Login / Registro";
		}
	}

	/** STATIC METHOD 🧍‍♂️
	 * ### Obtiene los datos de usuario de localStorage y valida el token.
	 * @returns ok ► { is_authenticated: true, token:token, user: JSON.parse(currentUser) }; | 
	 * expired  ► { is_authenticated: false, token: null, user: null }; | 
	 * error  	► { is_authenticated: false, token: null, user: null };
	 */
	static get_datos_auth() {
		const token = localStorage.getItem('token');
		const currentUser = localStorage.getItem('currentUser');

		if (!token || !currentUser) {
			return { is_authenticated: false, token: null, user: null };
		}

		if (Login_Modal._is_token_expired(token)) {
			Login_Modal._clear_auth_storage();
			return { is_authenticated: false, token: null, user: null };
		}

		try {
			return { is_authenticated: true, token:token, user: JSON.parse(currentUser) };
		} catch (error) {
			Login_Modal._clear_auth_storage();
			return { is_authenticated: false, token: null, user: null };
		}
	}

	/** STATIC METHOD 🧍‍♂️
	 * ### Elimina el token y el usuario del localStorage.
	 */
	static _clear_auth_storage() {
		localStorage.removeItem('token');
		localStorage.removeItem('currentUser');
	}

	/** 🖼️ UI 🖼️
	 * ### Cambia el texto y el Color 🌈 del botón de login según el estado.
	 * @param {boolean} is_authenticated , true = usuario logueado | false = no logueado
	 */
	_set_estado_btn_login_form(is_authenticated) {
		if (!this.$boton_login) return;
		if (is_authenticated) {
			this.$boton_login.textContent = "Log Out";
			this.$boton_login.classList.remove('btn-primary');				
			this.$boton_login.classList.add('btn-outline-danger'); 			// 🌈
		} else {
			this.$boton_login.textContent = "Iniciar Sesión";
			this.$boton_login.classList.remove('btn-outline-danger');		
			this.$boton_login.classList.add('btn-primary');					// 🌈
		}
	}

	/** 🖼️ UI 🖼️
	 * ### Cambia el 'icono bi' de login según el estado.
	 * @param {boolean} is_authenticated , true = usuario logueado | false = no logueado
	 * @param {string} user , el nombre del usuario logueado
	 */
	_set_estado_icono(is_authenticated, user) {
		const icono = this.icono;
		if (!icono) return;

		if (is_authenticated) {
			icono.classList.remove('bi-person-dash');
			icono.classList.add('bi-person-check-fill', 'text-success');
			const nombre = user?.username || user?.email || 'usuario';
			icono.title = `Hola, ${nombre}`;
		} else {
			icono.classList.remove('bi-person-check-fill', 'text-success');
			icono.classList.add('bi-person-dash');
			icono.title = "Login / Registro";
		}
	}

	/** 🖼️ UI 🖼️
	 * ### Prepara el formulario de logout con el usuario actual.
	 * 				Sobre el dom de login, pongo el usuario y limpio la password
	 */
	_preparar_logout_form() {
		// Tiene que estar Logeado
		const { is_authenticated, user } = Login_Modal.get_datos_auth();
		if (!is_authenticated) {
			return;
		}

		// Establezco al usuario en el formulario de login(toggle)
		this._select_tab_authentication('login');
		
		// Sobre el dom de login, pongo el usuario y limpio la password
		if (this.$login_comps?.$usuario) {
			this.$login_comps.$usuario.value = user?.username || user?.email || '';
		}
		if (this.$login_comps?.$password) {
			this.$login_comps.$password.value = '';
		}
	}

	/** 🖼️ UI 🖼️
	 * ### Sincroniza el estado visual del UI (botón e icono) con el estado de autenticación almacenado.
	 * @param {*} userFromEvent 
	 */
	_sincroniza_UI(userFromEvent = null) {
		const { is_authenticated, user } = Login_Modal.get_datos_auth();

		const usuario_logeado = userFromEvent || user;
		this._set_estado_btn_login_form(is_authenticated);
		this._set_estado_icono(is_authenticated, usuario_logeado);
		if (is_authenticated) {
			this._preparar_logout_form();
		}
	}

	/** 🖼️ UI 🖼️
	 * ### 
	 */
    _mostrarError(msg) {
        this.dom.$alertArea.textContent = msg;
        this.dom.$alertArea.classList.remove('d-none');
    }

	/** 🖼️ UI 🖼️
	 * ### 
	 */
    _limpiarMensajes() {
        this.dom.$alertArea.classList.add('d-none');
        this.dom.$alertArea.textContent = '';
    }

	/** 🖼️ UI 🖼️ 🧠
	 * ### Busca todos los iconos con la clase 'js-ver-pass' y les da la funcionalidad
	 * de mostrar/ocultar la contraseña de su input asociado.
	 */
	_activarVisibilidadPasswords() {
		// 1. Seleccionamos TODOS los iconos (login, registro, confirmación...)
		const iconos_formulario = document.querySelectorAll('.js-ver-pass');

		iconos_formulario.forEach(icon => {
			icon.addEventListener('click', (e) => {
				e.preventDefault();

				// 2. TRUCO KISS: Buscamos el input vecino.
				// "Sube al padre (.input-group) y busca el input que vive allí"
				const inputGroup = icon.closest('.input-group');
				const input = inputGroup.querySelector('input');

				if (!input) return; // Seguridad

				// 3. Alternar lógica
				const esPassword = input.type === 'password';
				input.type = esPassword ? 'text' : 'password';

				// 4. Feedback Visual (Icono llave llena / vacía)
				if (esPassword) {
					icon.classList.remove('bi-key');
					icon.classList.add('bi-key-fill', 'text-primary');
				} else {
					icon.classList.remove('bi-key-fill', 'text-primary');
					icon.classList.add('bi-key');
				}
			});
		});
	}

	/** 
	 *  🖼️ UI 🖼️ PLANTILLA HTML 
	 * ### Inyecta el HTML del modal de autenticación. 
	 *	• Al usar iconos de Bootstrap (bi-person, bi-key) queda mucho más visual.
	 * ### Si el objeto ya lo tenemos registrado por Html, Retorna. Solo inyectamos si el objeto no existe, para generarlo.
	 * 	• Esto permite poder tener el objeto modal en index.html o lo autogeneramos nosotros.
	*/
    _inyectarHTML() {
        // if (document.getElementById(this.modal_id)) return;

		// Solo si no Existe el objeto modal lo creamos
        const html = `
        <div class="modal fade" id="${this.modal_id}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm">
				
                <div class="modal-content border-0 shadow">
                    <!-- 
					■■■■■■■■■■■■■■
					■■ Pestañas ■■ -->
                    <div class="modal-header border-bottom-0 pb-0 justify-content-center">
						<div class="btn-group w-100" role="group">
							<button type="button" class="btn btn-primary active"   data-auth-mode="login" >Entrar</button>
							<button type="button" class="btn btn-outline-primary"  data-auth-mode="register" >Registrar</button>							
						</div>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
					
                    <!-- ■■ Contenedor Modal ■■ -->
                    <div class="modal-body p-4">
						<!-- 
						■■■■■■■■■■■■■■■■■■■■■■ 
						■■ AREA DE FEEDBACK ■■ 
						■■■■■■■■■■■■■■■■■■■■■■ 
						-->
						<div id="authFeedback" class="alert alert-danger d-none p-2 small mb-3" role="alert"></div>
					
                    	<!-- 
						■■■■■■■■■■■■■■■■■■■■■■
						■■ Formulario LOGIN ■■ 
						■■■■■■■■■■■■■■■■■■■■■■
						-->
                        <form id="formLogin">
							<div class="input-group mb-3">
								<span class="input-group-text bg-light"><i class="bi bi-person"></i></span>
								<input type="text" id="login-identifier" name="identifier" class="form-control" placeholder="Usuario o Email" required>
							</div>
							<div class="input-group mb-3">
								<span class="input-group-text bg-light"><i  class="bi bi-key js-ver-pass"></i></span>
								<input type="password" id="login-password" name="password" class="form-control" placeholder="Contraseña" required>
							</div>
							<!-- ■■ BOTON SUBMIT  -->
							<button id="login-submit" type="submit" class="btn btn-primary w-100 fw-bold">Iniciar Sesión</button>
                        </form>
						
                    	<!-- 
						■■■■■■■■■■■■■■■■■■■■■■■■■
						■■ Formulario REGISTRO ■■ 
						■■■■■■■■■■■■■■■■■■■■■■■■■
						-->
                        <form id="formRegistro" class="d-none">
                            <div class="input-group mb-2">
                                <span class="input-group-text bg-light"><i class="bi bi-person-badge"></i></span>
                                <input type="text" id="register-identifier" name="username" class="form-control" placeholder="Elige un usuario" required>
                            </div>
                            <div class="input-group mb-2">
                                <span class="input-group-text bg-light"><i class="bi bi-envelope"></i></span>
                                <input type="email" id="register-email" name="email" class="form-control" placeholder="Tu correo" required>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text bg-light"><i class="bi bi-key js-ver-pass"></i></span>
                                <input type="password" id="register-password" name="password" class="form-control" placeholder="Crea contraseña" required>
                            </div>
							<br>
							<div class="form-check form-check-inline mb-2">
								<input class="form-check-input" type="radio" name="grupo_rol" id="radioId1" value="admin">
								<label class="form-check-label text-black-50" for="radioId1">Derechos de Administrador</label>
							</div>
							<div class="form-check form-check-inline mb-2">
								<input class="form-check-input" type="radio" name="grupo_rol" id="radioId2" value="staff" checked>
								<label class="form-check-label text-black-50" for="radioId2" >Derechos de Staff</label>
							</div>
							<br><br>
							<div class="form-check mb-2">
								<input id="registro_activo" class="form-check-input" type="checkbox" name="activo" checked>
								<label class="form-check-label text-black-50" for="registro_activo">Usuario Activo</label>
							</div>


							<!-- ■■ BOTON SUBMIT ■■ -->
                            <button type="submit" id="register-submit" class="btn btn-success w-100 fw-bold">Crear Cuenta</button>
                        </form>

						
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', html);

		// Pongo los botones de password para ver/ocultar contraseña.
		this._activarVisibilidadPasswords();
		
    }
}
// ■■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Login_Modal;
// }
// ■■■■


// ◘◘◘ 
// ◘◘◘ CLASE FOTO CRUD 
// ◘◘◘ 
/**
 * Clase que realiza un CRUD sobre la BD.
 * Para esto necesita de 2 Objetos OffCanvas de BootStrap: 
 * 		• OffCanvas-Load-Delete
 * 		• OffCanvas-Save-Update
 */
class Foto_CRUD{
	/**
	 * @param {object|{}} diccionario_RUD {} vacio ó diccionario de  
	 * @param {object|{}} diccionario_CU {} vacio ó
	 */
	constructor(salon, diccionario_RUD={}, diccionario_CU={}){
		if( !(salon instanceof e_Salon) ) return null;
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Variables de entrada		
		/** ### Instancia de e-Salon */
		this.Salon = salon;
		
		/** ### Viene vacío, pero podemos meter configuracion de entrada con los elementos Dom-Html de Read/Update/Delete */
		this.diccionario_RUD = diccionario_RUD;
		
		/** ### Viene vacío, pero podemos meter configuracion de entrada con los elementos Dom-Html de Create/Update  */
		this.diccionario_CU = diccionario_CU;		

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// Inyectar Html: Sólo en caso de que no exista 💉💉
		// Si lo situo antes de cachar los elementos del crud, (aqui), se pregunta por la el elemento antes de cacharlos, ergo cacha el html si existe y si no, inyecta.
		// Si lo situo despues de cachar los elementos del crud, se intentan cachar los elementos antes de preguntar si existe para inyectar, se pierde el codigo de Cachar si no hay html.
		this._inyectar_modal_CU();
		this._inyectar_offcanvas_RUD();


		const dRUD = this.diccionario_RUD;
		this.RUD = {
			$icono_trigger: e_Salon._to_element(dRUD.icono_trigger) || e_Salon._to_element('[data-action-nav="load"]') || null,			
			$offcanvas: e_Salon._to_element(dRUD.offcanvas) || e_Salon._to_element('[data-rud="offcanvas"]') || null,
			$feedback: e_Salon._to_element(dRUD.feedback) || e_Salon._to_element('[data-rud="feedback"]') || null,
			$contenedor_dinamic:  e_Salon._to_element(dRUD.contenedor_dinamic) ||  e_Salon._to_element('[data-rud="contenedor_lista"]') || null, 
		};

		/** ## Antes de _load__lista_registros = false , Despues de _load__lista_registros = true. Ver {@link create} - {@link read} - {@link delete} */
		this.is_lista_registros_completa = false;
		/** ## JSON de metadatos(titulo/slug...) de fotos. 
		 * #### Se Carga ► {@link _load_lista_registros} - Se Usa ► {@link _get_regitro_from_lista} | {@link update} 
		 * ```javascript
		 * ejemplo = {id: 45, titulo:'Lunes', slug_publico:'lunes', mensaje_publico:'', es_plantilla:false, es_publica=true , captured_at:"2026-01-21T22:22:29.119Z" , dicc_config: [Object] }
		 * ```
		 * */		
		this.lista_fotos_RUD = null		

		/** ## Última foto de Salon ┌•abierta• desde offcanvas-RUD. {@link _accion_cargar_elementos_en_Salon } */
		this.foto_work = null;
		
		/** ## El ultimo payload creado tras 'Guardar' */
		this.last_payload_CU = null;
		
		const dCU = this.diccionario_CU;
		this.CU = {
			// ┌• Icono disparador de la accion CU.
			$icono_trigger: e_Salon._to_element(dCU.icono_trigger) || e_Salon._to_element('[data-action-nav="save"]') || null,
			// ┌• Dom-Html de CU(Create/Update)
			$modal: e_Salon._to_element(dCU.modal) 				|| 	e_Salon._to_element('[data-creat="modal"]') || null,				
			$feedback: e_Salon._to_element(dCU.feedback) 		||	e_Salon._to_element('[data-creat="feedback"]') || null,				// zona feedback   
			$dimension: e_Salon._to_element(dCU.dimension) 		||	e_Salon._to_element('[data-dimension="dimension"]') || null,				// zona feedback   
			$formulario: e_Salon._to_element(dCU.formulario) 	|| 	e_Salon._to_element('[data-creat="formulario"]') || null,	// formulario. el objeto padre.
			$titulo: e_Salon._to_element(dCU.titulo) 			|| 	e_Salon._to_element('[data-creat="titulo"]') || null,  	// input título
			$slug_publico: e_Salon._to_element(dCU.slug_publico) 				|| 	e_Salon._to_element('[data-creat="slug"]') || null,		// input slug
			$mensaje_publico: e_Salon._to_element(dCU.mensaje_publico) 			|| 	e_Salon._to_element('[data-creat="mensaje"]') || null,	// input mensaje
			$es_plantilla: e_Salon._to_element(dCU.es_plantilla) 	|| e_Salon._to_element('[data-creat="plantilla"]') || null,	// checkbox plantilla
			$es_publica: e_Salon._to_element(dCU.es_publica) 		|| 	e_Salon._to_element('[data-creat="publica"]') || null,	// checkbox pública
			$submit: e_Salon._to_element(dCU.submit) 			||	e_Salon._to_element('[data-creat="submit"]') || null,				// botón guardar
		};

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ Los Objetos BootStrap. No son objetos DOM son variables js. 📄
		this.bs_modal_CU = null;
		this.bs_offcanvas_RUD = null;

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ VALIDAR ELEMENTOS CRUD ✔️
		const cu = this.CU;
		if(!cu.$modal || !cu.$feedback || !cu.$formulario || !cu.$titulo || !cu.$slug_publico || !cu.$mensaje_publico || !cu.$es_plantilla || !cu.$es_publica || !cu.$submit){
			console.log(`❌ Error en el Reconocimiento de objetos Dom . . . Create/Update`);
			return;
		}
		const rud = this.RUD;
		if(!rud.$contenedor_dinamic || !rud.$feedback || !rud.$icono_trigger || !rud.$offcanvas){
			console.log(`❌ Error en el Reconocimiento de objetos Dom . . . Read/Update/Delete`);
			return;
		}
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ INICIALIZAR LISTENERS CRUD 👂👂
		this._inicia_listeners_CU();
		this._inicia_listeners_RUD();
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ CREAR BS's PERO NO MOSTRAR 🏢
		this.bs_modal_CU = this._crear_modal_CU();
		this.bs_offcanvas_RUD = this._crear_offcanvas_RUD();

		// y con el objeto creado nos quedamos plantados ESPERANDO AL TRIGGER  • • • • 

	}
	// ■■■
	// ■■■ C. R. U. D.
	// ■■■
	/**  
	 * ### 💾 Create_R_Update_D  
	 * #### Un sólo botón para crear o actualizar una Photo del Usuario mediante un Modal bootstrap.
	 * @see {@link _accion_create} | {@link _inicia_listeners_CU}
	 * @param {dataForm} form_data valores del formulario(form_data.titulo, form_data.slug...)
	 */
	async create(){
		if(!this.CU) return;	

		try {		
			// ■■ Autenticación ┌• { is_authenticated:(bool), token:(string), user:(string) }
			const datos_auth = Login_Modal.get_datos_auth();		
			if (!datos_auth?.is_authenticated || !datos_auth?.token) {
				this._feedback_CU('⚠️ Necesitas iniciar sesión para guardar la foto.', 'warning');
				this?.Salon?.LogIn?._sincroniza_UI();
				return;
			}			
			// ┌•• Cacho Formulario.
			const cu = this.CU;
			// ┌•• Limpio los mensajes de la zona feedback.
			this._feedback_CU('');
			// ┌•• Cacho valores del Formulario
			const valores ={ 			
				titulo: 		cu?.$titulo?.value?.trim() ?? '',
				slug_publico: 	Foto_CRUD._normalizar_slug_CU( cu?.$slug_publico.value?.trim() ),
				mensaje_publico: cu?.$mensaje_publico?.value?.trim() ?? '',
				es_plantilla: 	Boolean(cu?.$es_plantilla?.checked) || false,
				es_publica: 	Boolean(cu?.$es_publica?.checked) || false
			};
			// ┌•• Valido los datos fundamentales del 'Formulario'
			if (!valores.titulo) {
				this._feedback_CU('⚠️ Título obligatorio.', 'warning');
				cu.$titulo.focus();
				return;
			}
			if(!valores.slug_publico){
				this._feedback_CU('⚠️ El slug público Obligatorio.', 'warning');
				cu.$slug_publico.focus();
				return;
			} 

			// ┌•• 			  •••••••
			// ┌•• prepara el payload
			const payload = this._set_payload_create(valores);
			if(payload === this.last_payload_CU) {

			}else{
				this.last_payload_CU = payload;
			}
		
			// ┌•• Ha sido Abierto de la lista de registros?
			// ┌•• Variable fundamental para la Logica de Guardar.
			const FA = this.foto_work;
			const lFA = this.lista_fotos_RUD;

			// const hay_registro = (lFA?lFA:false && FA?FA:false); 	
			const hay_registro = this.lista_fotos_RUD.some(item => item.id === FA?.id );			

			// ┌•• Existe el slug en la BDD? :: para saberlo, busco un registro con ese slug en la Base de Datos. 
			const registro_BDD = await this._get_registro_by_slug_API(valores.slug_publico, datos_auth.token);
			const hay_slug = registro_BDD != false;
			
			// ■■■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ 
			// ┌•• LOGICA DEL NEGOCIO: 🧠🧠			
			let guardado_bd = null;
			let accion = '';
			if(hay_registro){
				if(this.marca_plantilla){
					if (hay_slug){
						// PLANTILLA ✔️ -  SLUG en BD ✔️ ► notificar y salir
						this._feedback_CU('⚠️ Una Plantilla NO se puede Guardar\n... Cambia el Slug para crear una Copia', 'warning');
						cu.$slug_publico?.focus();
						return;
					}else{
						// PLANTILLA ✔️ -  SLUG en BD ❌  ► Guardar 
						guardado_bd = await this._create_foto_API(payload, datos_auth.token, `/api/fotos`);
						accion = 'Guardada';
					}
				}else{
					// REGISTRO ✔️ -  PLANTILLA ❌  ► Actualizar
					guardado_bd = await this._update_foto_API(payload, datos_auth.token, `/api/fotos/update`);
					accion = 'Actualizada';
				}
			}else{
				if(registro_BDD){
					// REGISTRO ❌ -  SLUG ✔️  ► Actualizar
					guardado_bd = await this._update_foto_API(payload, datos_auth.token, `/api/fotos/update`);
					accion = 'Actualizada';					
				}else{
					// REGISTRO ❌ -  SLUG ❌  ► Guardar
					guardado_bd = await this._create_foto_API(payload, datos_auth.token, `/api/fotos`);
					accion = 'Guardada';
				}
			}
		
			// 💾 Guardado OK ✔️
			if (guardado_bd?.ok) {
				const hora = new Date().toLocaleTimeString('es-ES', { hour12: false });
				this._feedback_CU(`♻️ Foto '${valores.slug_publico}' ${accion} con Éxito. ✔️ .... at: ${hora}`, 'success');
				
				// ┌•• Me guardo el payload ( para controlar Si cambia datos o NO )
				this.last_payload_CU = payload;
				
				// ┌•••••••••••••••••••••••••••••••••••••
				// ┌•• Despues de Guardar o Actualizar Ok ► Cambio la lista para que tenga los ultimos cambios.
				const ok = await this._load_lista_registros();
				if(!ok) 
					throw `❌ Error ::: Guardado Ok, pero Error Recargando la lista de registros.`;
				
				// ┌•• En caso de Guardar una foto como plantilla this.marca_plantilla = true y  funciona ok.
				// ┌•• En caso de Guardar NO plantilla, si está marca_plantilla a true entraría la siguiente por plantilla aunque no lo sea.
				if(payload.foto.es_plantilla === false) 
					this.marca_plantilla = false;

				// ┌•• Buscar en la lista de registros recien actualizada con la BDD...con el payload(sanitizado en _set_payload_create_())
				const reg_recien_guardado = this.lista_fotos_RUD.find( item =>{ 
					if (payload.foto.slug_publico === item.slug_publico  && payload.foto.titulo === item.titulo){
						return item;
					}
				});
				if(!reg_recien_guardado) 
					throw `❌ Error ::: No encuentro el registro que acabo de guardar. Reinicia.`;
				
				// ┌•• Asigno a registro__abierto y pongo el ojo para que se actualize la siguiente vez que Guarde.
				this.foto_work = reg_recien_guardado;
				
				// ┌•• UI de (i)nformacion ... Lo ponemos en verde para avisar de que hay un registro.
				this._set_UI_ojo(this.foto_work);				

			} else {
				const mensaje = guardado_bd?.message || `⚠️ Fallo al guardar ${valores.slug_publico}`;
				this._feedback_CU(mensaje, 'warning');
				cu.$titulo?.focus();
				this.is_lista_registros_completa = false;
			}
		} catch (error) {
			console.log(`❌ Error ::: Al Querer Guardar en la Base de Datos ::: ${error}`);
			this._feedback_CU(` ❌ Error ::: Al Querer Guardar en la Base de Datos`, 'danger');
			this.is_lista_registros_completa = false;
		}
	}
	
	/** 
	 * ### 📚 C_Read_UD 
	 * #### - Lista las fotos del Usuario en un offcanvas bootstrap. 1 registro por foto.
	 * #### - por cada foto se puede: 
	 * * Ver-Mensaje 
	 * * Cargar en el Salon 
	 * * Eliminar 
	 * * Actualizar.
	 * #### NOTA: Actualizar te lleva a la ventana Modal Create/Upt( _CU ). 
	 * #### {@link ../../server/fotoController. read_fotos}
	 */
	async read(){
		if(!this.RUD) return;
		
		try {
			const datos_auth = Login_Modal.get_datos_auth();			
			if (!datos_auth?.is_authenticated) {
				this._abrir_ventana_lista_registros_RUD();
				this._feedback_RUD('⚠️ Necesitas iniciar sesión para cargar la foto.', 'warning');
				this?.Salon?.LogIn?._sincroniza_UI();
				return;
			}
			// console.log("📲 Empieza Accion LOAD • • • • ");
			
			// Limpio el contenido del contenedor anterior
			this.RUD.$contenedor_dinamic.innerHTML='';	
			// Limpia el feedback ... hay que limpiar la mesa de trabajo antes de empezar a trabajar.
			this._feedback_RUD('');						
			this._abrir_ventana_lista_registros_RUD();

			if (this.is_lista_registros_completa === false) {
				try {
					// ┌••••••••••••••••••••••••••••
					// ┌■ Carga la lista de Fotos 
					// ┌••••••••••••••••••••••••••••
					const ok = await this._load_lista_registros();
					
					// ┌•• Crea la LISTA DINAMICA de Photos de Salones y la Introduce en el OffCanvas.
					if(ok) this._inyectar_lista_registros_RUD(this.lista_fotos_RUD, this.RUD.$contenedor_dinamic);

				} catch (error) {
					this._feedback_RUD(`❌ Error al conectar con el servidor`, 'danger');
				}			
			}
			
		} catch (error) {
			console.log(`❌ ERROR::: ${error}`);
		}
	}
	
	/** 
	 * #### Click desde el Offcanvas_RUD. ► Abre la ventana Modal CU para Actualizar Los datas Externos de la Foto Seleccionada.
	 * @param {number} foto_id es el indice de la foto seleccionada en la BD.
	 */
	async update(foto_id, dom_updt){
		// ┌•• Valido Entrada.
		if(!dom_updt) return false;
		if(!foto_id) return false;
		if (!dom_updt.$feedback)  return false;

		try {		
			// ┌•• Autenticación ┌• { is_authenticated:(bool), token:(string), user:(string) }
			const datos_auth = Login_Modal.get_datos_auth();		
			if (!datos_auth?.is_authenticated || !datos_auth?.token) {
				this._feedback_updt_ficha_RUD('⚠️ Necesitas iniciar sesión para guardar la foto.', 'warning');
				this?.Salon?.LogIn?._sincroniza_UI();
				return;
			}			
			
			// ┌•• Cacho Formulario.
			const formulario = dom_updt;
			
			// ┌•• Limpio los mensajes.
			this._feedback_updt_ficha_RUD('');
			
			// ┌•• Cacho valores
			const valores ={ 			
				id: 		foto_id,
				titulo: 	formulario?.$titulo?.value?.trim() ?? '',
				slug_publico: 		Foto_CRUD._normalizar_slug_CU( formulario?.$slug_publico.value?.trim() ),
				mensaje_publico: 	formulario?.$mensaje_publico?.value?.trim() ?? '',
				es_plantilla: 	Boolean(formulario?.$es_plantilla?.checked) || false,
				es_publica: 	Boolean(formulario?.$es_publica?.checked) || false
			};
			
			// ┌•• Valido Valores	
			if (!valores.titulo) {
				this._feedback_updt_ficha_RUD('⚠️ Título obligatorio.', 'warning');
				formulario.$titulo.focus();
				return;
			}
			if(!valores.slug_publico){
				this._feedback_updt_ficha_RUD('⚠️ El slug público Obligatorio.', 'warning');
				formulario.$slug_publico.focus();
				return;
			}
			// ┌•••••••••••••••••••••••••••
			// ┌•• ACTUALIZO EN LA BASE DE DATOS: 
			
			// ┌•••• prepara el payload ....  Asigno valores
			const payload = this._set_payload_update_ficha(valores);
			
			// ┌•••• Actualiza en la Base de datos y me devuelves el Resultado.
			let guardado_bd = null;
			guardado_bd = await this._update_ficha_API(payload, datos_auth.token, `/api/fotos/${foto_id}`);
			
			// ┌•••• Analizo el Resultado.
			if (guardado_bd?.ok) {
				// 💾 Guardado OK ✔️
				const hora = new Date().toLocaleTimeString('es-ES', { hour12: false });
				this._feedback_updt_ficha_RUD( `♻️ Foto '${payload.slug_publico}' Actualizada  con Éxito. ✔️ .... at: ${hora}`, 'success');				
				
				// ┌•• Una vez que el registro está actualizado, recargo la lista de registros y obtengo el registro abierto para tener 
				// la última actualización de la base de datos
				const ok = await this._load_lista_registros();
				// ┌•• Crea la LISTA DINAMICA de Photos de Salones y la Introduce en el OffCanvas.
				if(ok) this._inyectar_lista_registros_RUD(this.lista_fotos_RUD, this.RUD.$contenedor_dinamic);

				// ┌•• Solo si coinciden el registro abierto con el payload de actualización es cuando realizo los cambios, 
				// en caso contrario, no hago nada y cuando se cierre el listado seguimos donde estambamos....
				const FA = this.foto_work;
				if(FA && FA.id === payload.id){
					// ┌•• La actualización del registro se tiene que hacer sobre la base de datos, porque si no te limita para cambiar titulo y slug
					this.foto_work = await this._get_foto_from_BDD(foto_id);		
					this._set_UI_ojo(this.foto_work);					
				}
			} else {
				this._feedback_updt_ficha_RUD( `⚠️ Fallo al Actualizar ${valores.slug_publico}`, 'warning');
				formulario.$slug_publico?.focus();
			}
		} catch (error) {
			console.log(`❌ ERROR::: ${error}`);
			return false;
		}					
	}
	
	/** ✖️ RUD ► load - OffCanvas 
	 * ###
	 */
	async delete(foto_id){
		try {
			// cd.innerHTML =
			const mensaje = "¿Seguro que quieres eliminar este salón? Esta acción no se puede deshacer.";
			const confirmacion = this.Salon.CFG.UI.ConfirM("Confimación Accion Eliminar", mensaje, "warning")
			if (!confirmacion) return;
			// this._feedback_RUD('Eliminando photo...', 'warning');

			const token = localStorage.getItem('token');
			const response = await fetch(`/api/fotos/${foto_id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			if (!response.ok)  throw new Error('Error al eliminar');				

			// ► IF todo Ok ✔️  Volvemos a cargar las fotos del salon en el offcanvas
			const ok = await this._load_lista_registros();
			// ┌•• Crea la LISTA DINAMICA de Photos de Salones y la Introduce en el OffCanvas.
			if(ok) this._inyectar_lista_registros_RUD(this.lista_fotos_RUD, this.RUD.$contenedor_dinamic);

			this._feedback_RUD('Salón eliminado correctamente. ✔️', 'success');
				
		} catch (error) {
			console.error("❌ Fallé al eliminar salón:", error);
			this._feedback_RUD(`👎 No se pudo eliminar la foto ${foto_id}`, 'danger');
		}
		
	}

	// ■■■
	// ■■■  ACCIONES, Clicks sobre botones en las ventanas. Llamadas Listenners al CRUD.
	// ■■■
	/** 
	 * ## Create_R_U_D
	 * ### Guarda una photo en la Base de Datos 
	 * {@link _inicia_listeners_CU}
	 */	
	_accion_create(){		
		this.create();
	}
	/** 
	 * ## C_Read_U_D
	 * ### Carga / Load un listado de photos. 
	 */
	_accion_read() {
		this.read();		
	}
	/** 
	 * ## CR_Update_D, 
	 * ## Abre la ventana de UPDATE de una Photo.
	 * #### • La accion de la actualización la lleva a cabo el submit del formulario modal_CU.
	 * #### • La ventana de actualizacion es la misma que la de creacion. 
	 */
	_accion_update(foto_id){
		// console.log(`Init  Update ${foto_id} `)
		this.update(foto_id);
	}
	/** 
	 * ## CRU_Delete
	 * ### ■■■ Elimina una foto del usuario y recarga la lista.
	 */
	_accion_delete(foto_id) {
		this.delete(foto_id);
	}

	// ■■■
	// ■■■ Plantillas Html BootStrap
	// ■■■

	/** 
	 *  🖼️ UI 🖼️ ■■■ PLANTILLA HTML 
	 * ### Inyecta el HTML del modal de CREAR / UPDATE
	 * 				• Al usar iconos de Bootstrap (bi-person, bi-key) queda mucho más visual.
	*/
    _inyectar_modal_CU() {
		// IF existe el objeto Modal, Retorna, Solo pasa si el objeto no existe y lo autogeneramos.
		// 	• Esto permite poder tener el objeto modal en index.html o lo autogeneramos nosotros.
		// 	• Hay que definir un diccionario con las clases, id's , data-sets .... identificadores.
        
		const bs_modal_cu = document.querySelector('[data-creat="modal"]');
		if (bs_modal_cu) {
			console.log('🍞 data-creat -  Objeto modal CU Existe en Html, No lo inyecto.'); 
			return;
		}else{
			console.log('🍞 data-creat -  Objeto modal CU - NO Existe - en Html • • •  Lo Inyecto.'); 			
		}
		
		// if (e_Salon._to_element('[data-creat="modal"]')) return;
		
		const modal_html = `
			<div class="modal fade" id="id_modal_cu" tabindex="-1" aria-labelledby="etiqueta_guardar" aria-hidden="true"  data-creat="modal">
			<div class="modal-dialog modal-dialog-centered"> 
				 <div class="modal-content">
				
				<div class="modal-header">
					<h5 class="modal-title" id="etiqueta_guardar" data-creat="titulares">📷 Guardar Foto del Salón 📷</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<!-- ■■■■■■■■■■■■■■■■■■■■■■ 
				■■ AREA DE FEEDBACK ■■ 
				■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->				
				<div class="alert alert-danger d-none p-2 small mb-3" role="alert" data-creat="feedback"></div>

				<!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
				■■ Formulario CREATE/UPDATE ■■ 
				■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
				<div class="modal-body" data-creat="contenedor-formulario">
					<form id="form_guardar_foto" class="small" data-creat="formulario">
					<div  class="alert d-none" role="alert" ></div>

					<div class="accordion accordion-flush" data-creat="acordeon">
						<div class="accordion-item">
							<h2 class="accordion-header">
								<button class="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse" data-bs-target="#acordeon_reservas" aria-expanded="false" aria-controls="acordeon_reservas">
									Reservas
								</button>
							</h2>
							<div id="acordeon_reservas" class="accordion-collapse collapse">
								<div class="accordion-body py-2" data-creat="acordeon-reservas"></div>
							</div>
						</div>
						<div class="accordion-item">
							<h2 class="accordion-header">
								<button class="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse" data-bs-target="#acordeon_mensajes" aria-expanded="false" aria-controls="acordeon_mensajes">
									Mensajes
								</button>
							</h2>
							<div id="acordeon_mensajes" class="accordion-collapse collapse">
								<div class="accordion-body py-2" data-creat="acordeon-mensajes"></div>
							</div>
						</div>
						<div class="accordion-item">
							<h2 class="accordion-header">
								<button class="accordion-button collapsed py-2" type="button" data-bs-toggle="collapse" data-bs-target="#acordeon_alergias" aria-expanded="false" aria-controls="acordeon_alergias">
									Alergias
								</button>
							</h2>
							<div id="acordeon_alergias" class="accordion-collapse collapse">
								<div class="accordion-body py-2" data-creat="acordeon-alergias"></div>
							</div>
						</div>
					</div>

					<div class="mb-2">
						<div class="d-flex justify-content-between align-items-center">
							<label for="foto_titulo" class="form-label mb-1 text-black-50">Título</label>
							<label class="form-label mb-1 text-black-50">Dimension</label>
						</div>
						
						<input id="foto_titulo" type="text" class="form-control form-control-sm" data-creat="titulo" required>
					</div>

					<div class="mb-2">
						<label for="foto_slug_publico" class="form-label mb-1 text-black-25">Slug público</label>
						<input id="foto_slug_publico" type="text" class="form-control form-control-sm text-black-50" data-creat="slug">
					</div>

					<div class="mb-2">
						<label for="foto_mensaje_publico" class="form-label mb-1 text-black-50">Descripción (opcional)</label>
						<textarea id="foto_mensaje_publico" class="form-control form-control-sm" rows="2" data-creat="mensaje"></textarea>
					</div>

					<div class="form-check mb-2">
						<input id="foto_es_plantilla" class="form-check-input" type="checkbox" data-creat="plantilla">
						<label class="form-check-label text-black-50" for="foto_es_plantilla">Es plantilla  ( Copia Única... se Replica ) </label>
					</div>

					<div class="form-check mb-3">
						<input id="foto_es_publica" class="form-check-input" type="checkbox" data-creat="publica">
						<label class="form-check-label text-black-50" for="foto_es_publica">Es pública ( ⚠️ Sin Uso de Momento)</label>
					</div>

					<div class="modal-footer">
						<div class="d-flex gap-2 w-100">
							<button type="submit" class="btn btn-primary btn-sm w-100" data-creat="submit">Guardar</button>
						</div>
					</div>
					</form>
				</div>

				</div>
			</div>
			</div>
		`;

        // document.body.insertAdjacentHTML('beforeend', html);
        document.body.insertAdjacentHTML('beforeend', modal_html);
		
    }
	
	/** 
	 *  🖼️ UI 🖼️ ■■■■■■■■■■■■■■■■■■■■ PLANTILLA HTML 
	 * ### Inyecta el HTML Modal BootStrap para:  READ | UPDATE | DELETE
	 * 				• Tiene que generar una lista dinámica de photos de salones guardadas en BD que cargará en id='contenedor_RUD'
	*/
    _inyectar_offcanvas_RUD() {
		// IF existe el objeto Modal, Retorna, Solo pasa si el objeto no existe y lo autogeneramos.
		// 	• Esto permite poder tener el objeto modal en index.html o lo autogeneramos nosotros.
		// 	• Hay que definir un diccionario con las clases, id's , data-sets .... identificadores.

		const bs_offcanvas_rud = document.querySelector('[data-rud="offcanvas"]');
        if (bs_offcanvas_rud) {
			console.log('🍞 data-rud =  objeto offcanvas RUD - Existe - en Html, No lo inyecto.'); 
			return;
		}else{
			console.log('🍞 data-rud -  Objeto Offcanvas RUD - NO Existe - en Html • • •  Lo Inyecto.'); 			
		}

		// Solo si no Existe el objeto modal lo creamos
        const html = `
		<div id="offcanvas_RUD" class = "offcanvas offcanvas-end" tabindex="-1"  aria-labelledby="load_Label" data-rud="offcanvas">
			<div class="offcanvas-header">
				<h5 class="offcanvas-title" id="load_Label"  data-rud="titulares">📝 Listado de •Fichas• de Foto.</h5>
				<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" data-rud="cerrar"></button>				
			</div>`
			+ this._inyectar_filtros_visibilidad_RUD() +
			`<div class="offcanvas-body">
				<div id="feedback_RUD" class="alert d-none" role="alert" data-rud="feedback"></div>     <!-- FEED BACK -->
				<div id="contenedor_RUD" data-rud="contenedor_lista"> </div>
			</div>
		</div>
		`;

        document.body.insertAdjacentHTML('beforeend', html);		

		this._filtros_plantilla_publica_RUD();
    }
	/** 
	 * ### Inyecta el Html de los filtros de Publica/Plantilla en el offcanvas de listado-de-registros 
	 * ### {@link _inyectar_offcanvas_RUD} 
	 * */
	_inyectar_filtros_visibilidad_RUD(){
		const html = `
		<div class="visibilidad-card-rud p-4 shadow-sm">
			<!-- Header: Título y Radios -->
			<div class="d-flex justify-content-between align-items-center mb-2">
				<span class="text-uppercase fw-bold text-muted text-tracking">VISIBILIDAD</span>
				
				<div class="segmented-control-rud" role="radiogroup">
					<input type="radio" class="btn-check" name="filtro" id="radio-todos" value="todos" checked>
					<label class="btn" for="radio-todos">Todos</label>

					<input type="radio" class="btn-check" name="filtro" id="radio-custom" value="custom">
					<label class="btn" for="radio-custom">Personalizado</label>
				</div>
			</div>

			<!-- Cuerpo: Chips de Checkbox -->
			<div id="opciones-personalizadas" class="d-flex flex-wrap gap-2 mb-1" style="transition: opacity 0.3s ease;">
				<div class="chip-rud chip-plantilla-rud" data-visibilidad="plantilla">
					<input type="checkbox" class="btn-check" id="check-plantilla" name="es_plantilla">
					<label class="btn" for="check-plantilla">
						<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
						</svg>
						Plantilla
					</label>
				</div>

				<div class="chip-rud chip-publica-rud"  data-visibilidad="publica">
					<input type="checkbox" class="btn-check" id="check-publica" name="es_publica">
					<label class="btn" for="check-publica">
						<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
							<path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
						</svg>
						Pública
					</label>
				</div>
			</div>

			<!-- Footer / Feedback -->
			<div class="pt-1 border-top mt-1">
				<small id="status-display" class="text-muted fst-italic" style="font-size: 0.65rem;">
					Mostrando todos los elementos.
				</small>
			</div>
		</div>
		`;
		return html;
	}

	/** 
	 * ### ■■■ Construye el HTML de la lista.
	 * @param {Array} arrjson_fotos - Array de objetos foto. this.lista_fotos_RUD
	 * @param {HTMLElement} contenedor - Div contenedor ► this.RUD.$contenedor_dinamic 
	 * ```javascript
	 * this._inyectar_lista_registros_RUD(this.lista_fotos_RUD, this.RUD.$contenedor_dinamic);
	 * ```
	 */
	_inyectar_lista_registros_RUD(arrjson_fotos, contenedor) {
		
		// ┌• Validaciones de entrada:
		if(!contenedor) return;
		if (!Array.isArray(arrjson_fotos) || arrjson_fotos.length === 0) {
			contenedor.innerHTML = '<div class="text-white-50 p-3 text-center">Aún no has guardado ningún salón.</div>';
			return;
		}
		
		// ┌• Hay que limpiar antes de trabajar.
		contenedor.innerHTML = '';

		// ┌••••••••••••••••••••••••••••••••
		// ┌• POR CADA Registro, una FOTO.
		arrjson_fotos.forEach(foto => {

			// ┌• capturo los datos de cada registro(la estructura de foto viene de fotoController get_foto_by_id):
			const fecha_captured_at_bd = new Date(foto.captured_at).toLocaleString('es-ES', {
				dateStyle: 'medium',
				timeStyle: 'short'
			});
			const foto_id = foto.id;
			const titulo_bd = Foto_CRUD._escapar_html_RUD(foto.titulo || 'Sin título');
			const mensaje_bd = Foto_CRUD._escapar_html_RUD(foto.mensaje_publico || ' 🐍 ');
			const slug_bd = Foto_CRUD._escapar_html_RUD(foto.slug_publico || '');
			const es_publica = Boolean(foto.es_publica);
			const es_plantilla = Boolean(foto.es_plantilla);
			const filas = Foto_CRUD._escapar_html_RUD(foto.filas || '0' );
			const columnas = Foto_CRUD._escapar_html_RUD(foto.columnas || '0');

			// ┌• Preparo el icono de es_plantilla para el registro.
			let title = '';
			let content = '';
			if(es_publica && es_plantilla) {
				title = "Publica - Plantilla";
				content = '🌍🍞'
			}else if (es_publica && !es_plantilla) {
				title += 'Publica';
				content = '🌍 - '
			}else if (!es_publica && es_plantilla) {
				title += 'Plantilla';
				content = '🍞 - '
			}else if (!es_publica && !es_plantilla) {
				title += 'Ordinary';
				content = '🙃 - '
			}

			// ┌•• Preparo el icono inicial de la lista 🌍 🍞 🙃:
			const $icono_slug = `<span title=${title}>${content}</span>`
			
			// ┌•• Marca el registro_abierto_ con una clase ad-hoc ('clase_match_open') para ponerlo en color distintivo
			const FA = this.foto_work || null;
			let clase_match = '';
			if(FA && FA.id === foto_id ) 
				clase_match = 'clase_match_open';
			else
				clase_match = '';
			
			// ┌•••••••••
			// ┌•• Html:
			// ┌•••••••••
			const item_Html = `
				<div class="photo-registro-rud">
					
					<!-- ■■■■■■ 
					Titulo y Fecha 
					■■■■■■ -->
					<div class="photo-info-section"  data-photo-id="${foto_id}" data-bs-toggle="tooltip" >
						<div class="d-flex align-items-center gap-2 ">
							${$icono_slug} <span class="photo-titulo-rud  ${clase_match}" title="slug: ${slug_bd}">${titulo_bd}</span>
						</div>
						<span class="photo-fecha-rud">${fecha_captured_at_bd} 🔲 ( ${filas} x ${columnas} ) </span>
						<!-- <span class="photo-fecha-rud">${slug_bd}</span> -->
					</div>

					<!-- ■■■■■■ 
					Botones de Acciones 
					■■■■■■ -->
					<div class="photo-actions-section">
						<!-- 
						■■■■■■ ▶️ LOAD -->
						<button type="button" class="photo-btn-accion-rud js-load-salon" data-photo-id="${foto_id}" title="Cargar Salon" data-bs-toggle="tooltip" >
							<i class="bi bi-play-circle-fill"></i>
						</button>

						<!-- 
						■■■■■■ 👁️‍🗨️ INFO 
						<button type="button" class="photo-btn-accion-rud" 
							data-bs-toggle="popover" 
							data-bs-trigger="focus" 
							data-bs-custom-class="popover-mensaje"
							title="Mensaje del Salón" 
							data-bs-content="${mensaje_bd}"
							data-photo-id="mensaje"
							>							
							<i class="bi bi-eye"></i>
						</button> 
						-->
						<!-- 
						■■■■■■ 🗑️ DELETE -->
						<button type="button" class="photo-btn-accion-rud js-delete-salon" data-photo-id="${foto_id}" title="Eliminar salón" data-bs-toggle="tooltip" >
							<i class="bi bi-trash3"></i>
						</button>
						
						<!-- 
						■■■■■■  UPDATE -->
						<button type="button" class="photo-btn-accion-rud js-update-salon" data-photo-id="${foto_id}" title="Actualizar salón" data-bs-toggle="tooltip" >
							<i class="bi bi-arrow-repeat"></i>
						</button>

					</div>
				</div>
			`;

			contenedor.insertAdjacentHTML('beforeend', item_Html);
		});

		// ■ ■ ■ 
		// • • • Después de esto, hemos creado varios registros y por cada registro, 
		// 4 iconos bi de accion (ver-info/update/delete/load), ahora hay darles accion(listenners)


		// Carga Listeners para cada elemento  '.js-load-salon' y '.js-delete-salon' 'js-update-salon' recien creados
		this._init_listeners_listado_fotos(contenedor);

		// UI 🖼️ 
		Foto_CRUD._crear_dinamic_bs_elements_RUD(contenedor);
	}

	
	// ■■■
	// ■■■ Creo los objetos BootStrap, pero no los muestro.	
	// ■■■
		
	/**
	 * ### Crea una instancia del objeto Modal de BootStrap para crear/actualizar que tenemos registrado, si no existe lo crea.
	 * {@link Foto_CRUD constructor}
	 */
	_crear_modal_CU() {
		// 1. Verificación rápida (KISS)
		if (!this.CU.$modal || !window.bootstrap?.Modal) return null;
		
		// 2. Usamos el método seguro: recupera si existe, crea si no.
		// Pasamos las opciones solo en caso de que tenga que crearlo.
		const bs_modal_CU = window.bootstrap.Modal.getOrCreateInstance(this.CU.$modal, {
			backdrop: true,
			keyboard: true,
			focus: true,
		});
		
		return bs_modal_CU || null;
	}
	/**
	 * ### Crea una instancia de un objeto Offcanvas de BootStrap para crear/actualizar que tenemos registrado, si no existe lo crea.
	 * ### {@link Foto_CRUD constructor}
	 */
	_crear_offcanvas_RUD() {
		// 1. Verificación rápida (KISS)
		if (!this.RUD.$offcanvas || !window.bootstrap?.Offcanvas) return null;

		// 2. Usamos el método seguro: recupera si existe, crea si no.
		// Pasamos las opciones solo en caso de que tenga que crearlo.
		const bs_offcanvas_RUD = window.bootstrap.Offcanvas.getOrCreateInstance(this.RUD.$offcanvas, {
			backdrop: true,
			keyboard: true,
			scroll: false
		});

		return bs_offcanvas_RUD || null;
	}

	/** 🎞️ UI 🖼️ 
	 * ### ■■■ Delegación de eventos para tooltips/popovers dinámicos (Mobile First).
	 * {@link _inyectar_lista_registros_RUD}
	 */
	static _crear_dinamic_bs_elements_RUD(contenedor = null) {
		const bootstrap = window.bootstrap;
		if (!bootstrap) return;

		const $contenedor = contenedor
			|| document.querySelector('[data-rud="contenedor_lista"]')
			|| document.querySelector('#lista_fotos_RUD');

		if (!$contenedor || this._bs_rud_delegacion_activa) return;

		this._bs_rud_delegacion_activa = true;
		this._bs_rud_tooltip = null;
		this._bs_rud_popover = null;
		this._bs_rud_tooltip_target = null;
		this._bs_rud_popover_target = null;

		const limpiar_tooltip = () => {
			if (!this._bs_rud_tooltip) return;
			this._bs_rud_tooltip.dispose();
			this._bs_rud_tooltip = null;
			this._bs_rud_tooltip_target = null;
		};

		const limpiar_popover = () => {
			if (!this._bs_rud_popover) return;
			this._bs_rud_popover.dispose();
			this._bs_rud_popover = null;
			this._bs_rud_popover_target = null;
		};

		const mostrar_tooltip = (target) => {
			if (!target || this._bs_rud_tooltip_target === target) return;
			limpiar_tooltip();
			this._bs_rud_tooltip_target = target;
			this._bs_rud_tooltip = bootstrap.Tooltip.getOrCreateInstance(target, {
				trigger: 'manual'
			});
			this._bs_rud_tooltip.show();
		};

		const mostrar_popover = (target) => {
			if (!target) return;
			if (this._bs_rud_popover_target === target) {
				limpiar_popover();
				return;
			}
			limpiar_popover();
			this._bs_rud_popover_target = target;
			this._bs_rud_popover = bootstrap.Popover.getOrCreateInstance(target, {
				trigger: 'manual',
				html: true
			});
			this._bs_rud_popover.show();
		};

		$contenedor.addEventListener('mouseover', (event) => {
			const target = event.target.closest('[data-bs-toggle="tooltip"]');
			if (!target) return;
			mostrar_tooltip(target);
		});

		$contenedor.addEventListener('mouseout', (event) => {
			if (!this._bs_rud_tooltip_target) return;
			const target = event.target.closest('[data-bs-toggle="tooltip"]');
			if (!target || target !== this._bs_rud_tooltip_target) return;
			if (target.contains(event.relatedTarget)) return;
			limpiar_tooltip();
		});

		$contenedor.addEventListener('focusin', (event) => {
			const target = event.target.closest('[data-bs-toggle="tooltip"]');
			if (!target) return;
			mostrar_tooltip(target);
		});

		$contenedor.addEventListener('focusout', (event) => {
			if (!this._bs_rud_tooltip_target) return;
			const target = event.target.closest('[data-bs-toggle="tooltip"]');
			if (!target || target !== this._bs_rud_tooltip_target) return;
			if (target.contains(event.relatedTarget)) return;
			limpiar_tooltip();
		});

		$contenedor.addEventListener('click', (event) => {
			const target = event.target.closest('[data-bs-toggle="popover"]');
			if (!target) {
				limpiar_popover();
				return;
			}
			mostrar_popover(target);
		});

		document.addEventListener('click', (event) => {
			if (!this._bs_rud_popover_target) return;
			const click_dentro = this._bs_rud_popover_target.contains(event.target);
			if (click_dentro) return;
			limpiar_popover();
		});
	}	

	// ■■■
	// ■■■ Inicializo_listeners.
	// ■■■
	/**
	 * 
	 * @returns 
	 */
	_inicia_listeners_CU(){
		const cu = this.CU;
		if (!cu.$formulario) return;
		if (!cu.$titulo) return;
		if (!cu.$slug_publico) return;

		// ■■■
		// 👂​👂​ GUARDAR FOTO 🎞️ SUBMIT SOBRE EL FORMULARIO 
		cu.$submit.addEventListener('click', (event) => {
			event.preventDefault();			
			this._accion_create();
		});

		// ■■■
		// 👂​👂​ Al cambiar el título dinamicamente se normaliza el slug.
		cu.$titulo.addEventListener('input', (event) => {
			// console.log(`🖊️ slug cambiado: ${event.target.value}`);
			const titulo_normalizado = Foto_CRUD._normalizar_slug_CU(event.target.value.trim());
			cu.$slug_publico.value = titulo_normalizado;
		});
		
		// ■■■
		// 👂​👂 Activa guardar foto al CAMBIAR EL SLUG A MANO
		// this.$slug.addEventListener('input', () => {
		// 	// this._set_semaforo('save');
		// });
	}
	
	// show (El inicio) Ideal para validaciones. Cuándo ocurre: En el instante exacto en que pulsas el botón o llamas a .show()
	// shown (El final) Cuándo ocurre: Cuando la animación de apertura ha terminado por completo
	// hide (El inicio) Cuándo ocurre: En cuanto se pulsa el botón de cerrar o la tecla ESC.
	// hidden (El final) Cuándo ocurre: Cuando el componente ya no es visible y la animación terminó
	// Truco Si alguna vez necesitas que el menú no se abra bajo cierta condición, usa el evento show y añade event.preventDefault(). Bootstrap detendrá la apertura antes de que empiece la animación.
	_inicia_listeners_RUD(){
		
		// 1. Justo antes de mostrarse: ¿Hay datos?
		// this.RUD.$offcanvas.addEventListener('show.bs.offcanvas', () => {
		// 	console.log("Preparando el menú...");
		// });

		// 2. Cuando ya se ve:
		if (!this.RUD.$offcanvas) return;
		
		const $offcanvas = this.RUD.$offcanvas;

		// ■ Salta Cuando el offcanvas se ha cargado completamente
		$offcanvas.addEventListener('shown.bs.offcanvas',async () => {
			// Carga la lista de fotos dinamica en el offcanvas modal	
			const ok = await this._load_lista_registros();
			// ┌•• Crea la LISTA DINAMICA de Photos de Salones y la Introduce en el OffCanvas.
			if(ok) this._inyectar_lista_registros_RUD(this.lista_fotos_RUD, this.RUD.$contenedor_dinamic);

		});

	}

	/**
	 * ### Carga las acciones sobre los iconos bi del offcanvas_RUD. 
	 * #### • RUD ( Read , Update, Delete )
	 * @param {object} contenedor Es el objeto sobre el que se aplican los listeners con delegacion de eventos.
	 * {@link _inyectar_lista_registros_RUD}
	 */
	_init_listeners_listado_fotos(contenedor){
		if(!contenedor) return;

		// 👂​👂 CARGAR - LOAD
		contenedor.querySelectorAll('.js-load-salon').forEach((button) => {
			button.addEventListener('click', () => {
				const foto_id = Number(button.dataset.photoId); 		// button.dataset.photoId equivale a  <button data-photo-id="xxx" 				
				if (Number.isFinite(foto_id)) {
					// ┌•• Valido si puedo cargar el Salon 
					// const ok = this.__validar_carga(foto_id);
					// ┌•• Cargo los elementos en el Salon.
					// if (ok) 
					this._accion_cargar_elementos_en_Salon(foto_id);
				}
			});
		});
		// ┌• dblclick click sobre el div de titulo + fecha (lo pongo por intuitivo. hasta yo clicko ahí)		
		contenedor.querySelectorAll('.photo-info-section').forEach((item) => {
			item.addEventListener('dblclick', () => {
				// ┌•• Cacho el id del data-set que generó el evento.
				// const foto_id = Number(item.dataset.photoId);
				// this.__validar_carga(foto_id);					
				// ┌•• Cargo los elementos en el Salon.	
				// if (Number.isFinite(foto_id)) 
					this._accion_cargar_elementos_en_Salon(foto_id);
			});
		});		
		// 👂​👂 ELIMINAR 
		contenedor.querySelectorAll('.js-delete-salon').forEach((button) => {
			button.addEventListener('click', () => {
				const foto_id = Number(button.dataset.photoId);
				if (Number.isFinite(foto_id)) this._accion_delete(foto_id);				
			});
		});
		// 👂​👂 UPDATE 
		contenedor.querySelectorAll('.js-update-salon').forEach((button) => {
			button.addEventListener('click', () => {
				const foto_id = Number(button.dataset.photoId);
				if (Number.isFinite(foto_id)) this._abrir_ventana_update_ficha_RUD(foto_id);
				
			});
		});
	}


	// ■■■
	// ■■■ Abro Los objetos BootStrap.	
	// ■■■
	// ► IF objeto se crea con ■new■, se queda en memoria y se abre con show. 
	// 		• y puede duplicar ante multiples clicks, hay que controlarlo.
	// ► IF objeto se crea con ■getOrCreateInstance■, Es "a prueba de balas" frente a múltiples clics.(para MOVIL)
	
	/**
	 * ### Abre la ventana Modal bootstrap para Guardar o Actualizar Fotos.
	 * {@link accion_CU}
	 */
	_abrir_ventana_CU(){
		this._feedback_CU('👍 Preparado para Guardar la Foto!! ');
		const filas_Salon = this.Salon.CFG.configuracion.salon.filas;
		const columnas_Salon = this.Salon.CFG.configuracion.salon.columnas;

		
		// ┌•• Primero muestra la ventana, luego cargala de datos
		if (!this.bs_modal_CU || !window.bootstrap?.Offcanvas) return;
		this.bs_modal_CU.show();
		this.__actualizar_acordeon_CU();
		
		// ┌•• Valida Authentication para no tener que esperar el error de la API al intentar guardar la foto.
		const datos_auth = Login_Modal.get_datos_auth();		
		if (!datos_auth?.is_authenticated || !datos_auth?.token) {
			this._feedback_CU('⚠️ Necesitas iniciar sesión para guardar la foto.', 'warning');
			this?.Salon?.LogIn?._sincroniza_UI();
			return;
		}		
		try {			
			// ┌•• 🧠🧠 POLITICA/LOGICA DE LA VENTANA: Tener un registro abierto actualizado:🔥
			// ┌•• Accedo al dato en la lista de registros(en update se actualiza esta lista.) 
			if (this.lista_fotos_RUD && this.foto_work){
				const FA_updated = this.lista_fotos_RUD.find( item => { item.id === this.foto_work.id; } );
				if(FA_updated) 
					this.foto_work = FA_updated;
			}	

			const contenedor = document.querySelector('[data-creat="contenedor-formulario"]') || document.querySelector('.modal-body') || document.querySelector('[data-tipo-bs="modal-cu"]');
			Foto_CRUD._limpiar_formularios(contenedor?contenedor:null);
			
			// ┌• En caso de abrir una plantilla, hay que 'marcarla' obligatoriamente pq el usuario puede 'cambiar datos'.
			// ┌• Este parametro le dice a {@link create} si la foto ha sido abierta como una plantilla.
			this.marca_plantilla = false;
			
			// ┌••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
			// ┌•• 🧠🧠 LOGICA DE ABRIR LA VENTANA DE CREAR-UPDATE FOTO. 🧠🧠
			const FW = this.foto_work;
			const cu = this.CU;
			if ( FW ) {
				if(Boolean(FW.es_plantilla) === true){
					// ┌• Si viene de registro_abierto_, 
					this._feedback_CU('⚠️ Abierta como Plantilla, Cambio/a el Titulo para Guardar', 'warning');
					cu.$titulo.value = this._get_sugerencia_unica('titulo', FW.titulo) || this._get_sugerencia_unica('titulo', 'sin_titulo') || '';
					cu.$slug_publico.value = cu.$titulo.value || '';
					cu.$es_plantilla.checked = false;
					// ┌•• Lo marco como plantilla para Create.
					this.marca_plantilla = true;
				}else{
					cu.$titulo.value = FW?.titulo;
					cu.$slug_publico.value = FW?.slug_publico || '';
					cu.$es_plantilla.checked = Boolean(FW?.es_plantilla);
				}
				cu.$mensaje_publico.value = FW?.mensaje_publico || '';
				cu.$es_publica.checked = Boolean(FW?.es_publica);				
				cu.$dimension.textContent = `Dimension: ${FW?.filas || 'X'} x ${FW?.columnas || 'X'}`;
			}else {
				// ┌• Si no viene de registro_abierto_, preparo un formulario basico con una sugerencia de titulo-slug
				cu.$titulo.value = Foto_CRUD._get_fechahora_tituled();
				cu.$slug_publico.value   = Foto_CRUD._normalizar_slug_CU(cu.$titulo.value);
				cu.$mensaje_publico.value = '';
				cu.$es_plantilla.checked = false;
				cu.$es_publica.checked = false;
				cu.$dimension.textContent = `Dimension: ${this.Salon?.filas || 'X'} x ${this.Salon?.columnas || 'X'}`;			
			}
			if (cu.$mensaje_publico) cu.$mensaje_publico.focus();
			
		} catch (error) {
			console.log(`❌ ERROR::: ${error}`);
			this._feedback_CU('⚠️ Error Al cargar Datos', 'danger');
		}
	}

	/** 🎞️	UI 🖼️ 
	 * ### Abre el offcanvas de carga de foto.
	 */
	_abrir_ventana_lista_registros_RUD() {
		// const $offcanvas = document.getElementById(this.offcanvasId) || null;
		if (!this.RUD.$offcanvas || !window.bootstrap?.Offcanvas) return;
		const offcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(this.RUD.$offcanvas);
		offcanvas.show();		
	}
	
	/** 
	 * ## • Evento 'click' sobre los elementos de la clase '.js-update-salon' en: {@link _init_listeners_listado_fotos}
	 * ## • Crea un Objeto Modal Bootstrap 'Al vuelo', que:
	 * ### Muestra la -FICHA- de la foto del Salon para -UPDATE-
	 * *  Para ello, recorro todas las **reservas** y las muestro en un formato legible.
	 * *  Recorro el objeto 'MSG_S' con los mensajes de cada silla.
	 * *  recorro el 'dicc_salon' con la configuración de la APP Salon.
	 * 
	 * Con estos datos creo un Objeto Modal al vuelo y lo muestro. El objeto se destruye tras su cierre.
	*/
	async _abrir_ventana_update_ficha_RUD(foto_id, titulo_head='Actualizar Ficha 🗃️ del Salon:') {
		// ┌•• Limpiar modales anteriores del mismo tipo
		Foto_CRUD._limpiar_modales_anteriores();
		
		// ┌•• Cachar el foto abierto de la base de datos del offcanvas-RUD
		const foto = this._get_regitro_from_lista( foto_id );
		if(!foto) throw (`⚠️ Registro ${foto_id} No Encontrado en la lista de Memoria... Aborto mision`);

		const dimension = `{ filas: '${foto.filas || 'X'}', columnas: '${foto.columnas || 'X'}' }`;
		
		console.log(`📐 Dimensiones desde BDD: { filas: '${dimension.filas}', columnas: '${dimension.columnas}' }`);
			
		// ┌•• Cacho el 'id' para generar el Html.
		const modal_id = Herramientas._get_secuencial_dom('json_Modal');				
		// ┌•• Crear modal dinámicamente
		const modalHTML = `
		<div class="modal fade" id="${modal_id}" tabindex="-1"  data-updt="update">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header" data-updt="header">
						<h5 class="modal-title">${titulo_head} </h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="update-body">						
						<!-- ■■■■■■■■■■■■■■■■■■■■■■ 
						■■ AREA DE FEEDBACK ■■ 
						■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->				
						<div class="alert alert-danger d-none p-2 small mb-3" role="alert" data-updt="feedback"></div>

						<!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
						■■ Formulario CREATE/UPDATE ■■ 
						■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
						<div class="update-body" 						data-updt="contenedor-formulario">
							<form id="form_guardar_foto" class="small" 	data-updt="formulario">
								<div class="mb-2">
									<label class="form-label mb-1 text-black-50">Dimension: ${dimension} </label>
								</div>

								<div  class="alert d-none" role="alert" ></div> 


								<div class="mb-2">
									<label for="foto_titulo" class="form-label mb-1 text-black-50">Título</label>
									<input id="foto_titulo" type="text" class="form-control form-control-sm" data-updt="titulo" required>
								</div>

								<div class="mb-2">
									<label for="foto_slug_publico" class="form-label mb-1 text-black-25">Slug público</label>
									<input id="foto_slug_publico" type="text" class="form-control form-control-sm text-black-50" data-updt="slug">
								</div>

								<div class="mb-2">
									<label for="foto_mensaje_publico" class="form-label mb-1 text-black-50">Descripción (opcional)</label>
									<textarea id="foto_mensaje_publico" class="form-control form-control-sm" rows="2" data-updt="mensaje"></textarea>
								</div>

								<div class="form-check mb-2">
									<input id="foto_es_plantilla" class="form-check-input" type="checkbox" data-updt="plantilla">
									<label class="form-check-label text-black-50" for="foto_es_plantilla">Es plantilla ( Copia Única... se Replica ) </label>
								</div>

								<div class="form-check mb-3">
									<input id="foto_es_publica" class="form-check-input" type="checkbox" data-updt="publica">
									<label class="form-check-label text-black-50" for="foto_es_publica">Es pública ( ⚠️ Sin Uso de Momento)</label>
								</div>

							</form>
						</div>

					</div>
					<div class="modal-footer">
						<button type="submit"  data-updt="submit"  form="form_guardar_foto" class="btn btn-primary btn-sm w-100" >Actualizar Ficha</button>
					</div>
				</div>
			</div>
		</div>
		`;
		
		// ┌•• Añadir al DOM
		document.body.insertAdjacentHTML('beforeend', modalHTML);
		const modal_bs = new bootstrap.Modal(document.getElementById(modal_id));
		try {			
			// ┌•• Cacho los Controles.
			const UPDT = {
				$updt: 			e_Salon._to_element('[data-updt="update"]') || null,				
				$feedback: 		e_Salon._to_element('[data-updt="feedback"]') || null,	// zona feedback   
				$formulario: 	e_Salon._to_element('[data-updt="formulario"]') || null, // formulario. el objeto padre.
				$titulo: 		e_Salon._to_element('[data-updt="titulo"]') || null,  	// input título
				$slug_publico: 	e_Salon._to_element('[data-updt="slug"]') || null,		// input slug
				$mensaje_publico: e_Salon._to_element('[data-updt="mensaje"]') || null,	// input mensaje
				$es_plantilla: 	e_Salon._to_element('[data-updt="plantilla"]') || null,	// checkbox plantilla
				$es_publica: 	e_Salon._to_element('[data-updt="publica"]') || null,	// checkbox pública
				$submit: 		e_Salon._to_element('[data-updt="submit"]') || null,	// botón guardar
			};
			// ┌•• Rellenar los controles de this.CU con los datos del foto a Actualizar.
			// captured_at | dicc_configuracion | id | mensaje_publico | slug_publico | titulo
			UPDT.$titulo.value = foto.titulo;
			UPDT.$slug_publico.value = foto.slug_publico;
			UPDT.$mensaje_publico.value = foto.mensaje_publico;
			UPDT.$es_publica.checked = Boolean(foto.es_publica);
			UPDT.$es_plantilla.checked = Boolean(foto.es_plantilla);
			
			// ┌•• Muestra el objeto Modal
			modal_bs.show();
			
			// ┌•• Muestra el Mensaje en la zona de Feedback.
			this._feedback_updt_ficha_RUD('👍 Preparado para Actualizar!! ');
			
			// ​👂​👂 Limpiar al cerrar 
			const $modal = document.getElementById(modal_id);
			$modal.addEventListener('hidden.bs.modal', function() {
				this.remove();
			});
			
			// ┌••• • • • • • • • • • • • • • • • • • • • • • 
			// 👂​👂​ click sobre el boton UPDATE / ACTUALIZAR
			UPDT.$submit.addEventListener('click', (ev) => {
				ev.preventDefault();
				this.update(foto_id, UPDT);
			});

			// 👂​👂​ Al cambiar el título dinamicamente se normaliza el slug.
			UPDT.$titulo.addEventListener('input', (event) => {
				// console.log(`🖊️ slug cambiado: ${event.target.value}`);
				const titulo_normalizado = Foto_CRUD._normalizar_slug_CU(event.target.value.trim());
				UPDT.$slug_publico.value = titulo_normalizado;
			});

		} catch (error) {
			console.log(`❌ Error ► Abrir_ventana_updt ► ${error}`);
			return null;	
		}
	}
	
	/**
	 * ### Actualiza el acordeón de reservas y mensajes en la ventana de crear. 
	 * {@link _abrir_ventana_CU}
	 */
	__actualizar_acordeon_CU() {
		const acordeon = document.querySelector('[data-creat="acordeon"]');
		if (!acordeon) return;
		// ┌■ Cacha el Dom
		const $reservas = acordeon.querySelector('[data-creat="acordeon-reservas"]');
		const $mensajes = acordeon.querySelector('[data-creat="acordeon-mensajes"]');
		const $alergias = acordeon.querySelector('[data-creat="acordeon-alergias"]');
		
		// ┌■ Cacha los Datos
		const reservas = this.Salon?._get_array_reservas_flat?.() || [];
		const mensajes = this.Salon?.MSG_M.api_mensajes?.() || {};
		const alergias = this.Salon?.MSG_A.api_alergias() || {};
		
		// ┌■ Reservas
		if ($reservas) {
			if (!reservas || reservas.length === 0) {
				$reservas.textContent = 'Sin reservas registradas.';
			} else {
				const lineas = reservas.map((reserva, index) => `• Reserva ${index + 1}: ${reserva.join(', ')}`);
				// $reservas.innerHTML = lineas.join('<br>');
				$reservas.textContent = lineas.join('');
			}
		}
		
		// ┌■ Mensajes (De las mesas y las sillas)
		if ($mensajes) {
			const entries = Object.entries(mensajes);
			if (entries.length === 0) {
				$mensajes.textContent = 'Sin mensajes registrados.';
			} else {
				const lineas = entries.map(([key, value]) => `┌•${key}: " ${value} "`);
				$mensajes.textContent = lineas.join(' ');
			}
		}
		
		// ┌■ Alergias (Solo de las Sillas)
		if ($alergias) {
			const entries = Object.entries(alergias);
			if (entries.length === 0) {
				$alergias.textContent = 'Sin alergias registradas.';
			} else {
				const lineas = entries.map(([key, value]) => `┌•${key}: " ${value} "`);
				$alergias.textContent = lineas.join(' ');
			}
		}
	}

	
		
	/**  UI 🖼️
	 * ### Muestra un MENSAJE en el offcanvas de Guardar Foto.(camara)
	 * @param {string} mensaje Mensaje a mostrar.
	 * @param {string} tipo Tipo de mensaje: 'success', 'danger', 'warning'.
	 * @example this._feedback_CU('Foto guardada OK', 'success');
	 * 			this._feedback_CU(''); 		// borra el mensaje y oculta el feedback
	 */
	_feedback_CU(mensaje, tipo = 'success') {
		if (!this.CU.$feedback) return;

		const feedback = this.CU.$feedback;
		if(!feedback) return;

		feedback.classList.remove('d-none', 'alert-success', 'alert-danger', 'alert-warning');

		// si se envía mensaje = '', borra el mensaje del feedback
		if (!mensaje) {
			feedback.classList.add('d-none');
			feedback.textContent = '';
			return;
		}		
		// si se envía mensaje != '', escribe el mensaje y el tipo
		feedback.classList.add(`alert-${tipo}`);
		feedback.textContent = mensaje;
	}
	/**
	 * ## Muestra Mensajes en la Zona de Mensajes de la Ventana(Superior Centrado)
	 * ### El cambio de color viene x css. estilo_salon.css ► [data-updt="feedback"].[alert-success, alert-danger, alert-warning]
	 * @param {string} mensaje Texto del Feedback.
	 * @param {string} tipo ► 'success', 'danger', 'warning'
	 */
	_feedback_updt_ficha_RUD(mensaje ='', tipo = 'success') {
		const elemento = e_Salon._to_element('[data-updt="feedback"]') || null;
		try {
			const feedback = elemento;
			if(!feedback) return;

			const clase_tipo = tipo || 'success';
	
			feedback.classList.remove('d-none', 'alert-success', 'alert-danger', 'alert-warning');
	
			// si se envía mensaje = '', borra el mensaje del feedback
			if (!mensaje) {
				feedback.classList.add('d-none');
				feedback.textContent = '';
				return;
			}		
			// si se envía mensaje != '', escribe el mensaje y el tipo
			feedback.classList.add(`alert-${clase_tipo}`);
			feedback.textContent = mensaje;			
		} catch (error) {
			console.log(`Error::: _feedback_updt_ficha_RUD::: ${error}`);
			return false;
		}
	}

	/**  🎞️ UI 🖼️ 
	 * ### Muestra un MENSAJE en el offcanvas de carga.
	 * @param {string} mensaje Mensaje a mostrar.
	 * @param {string} tipo Tipo de mensaje: 'success', 'danger', 'warning'.
	 */
	_feedback_RUD(mensaje, tipo = 'success') {
		const $feedback = document.querySelector('[data-rud="feedback"]');
		if (!$feedback) return;
		$feedback.classList.remove('d-none', 'alert-success', 'alert-danger', 'alert-warning');
		// si se envía mensaje = '', borra el mensaje del feedback
		if (!mensaje) {
			$feedback.classList.add('d-none');
			$feedback.textContent = '';
			return;
		}
		// si se envía mensaje != '', escribe el mensaje y el tipo
		$feedback.classList.add(`alert-${tipo}`);
		$feedback.textContent = mensaje;
	}
	
	// ■■■
	// ■■■ ONLY .... CU
	// ■■■

	/**    
	 * ### Guarda o Actualiza una Foto 🎞️ del Salon si el usuario está autenticado.
	 * @param {object} payload - Datos de salón y foto.
	 * @param {string} token - Token de autenticación del usuario.
	 */
	async _update_foto_API(payload, token, api='') {
		try {
			const response = await fetch(api, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
			const result = await response.json();
			if (!response.ok) {
				return { ok: false, message: result?.message || 'No se pudo Actualizar la foto.' };
			}
			return { ok: true, message: result?.message || 'Foto Actualizada'};
		} catch (error) {
			console.error('_update_foto_API:: Error Actualizando foto del Salon:', error);
			return { ok: false, message: 'Error inesperado al ACTUALIZAR la foto. 🎞️​' };
		}
	}
	/**   
	 * ### Guarda o Actualiza una Foto 🎞️ del Salon si el usuario está autenticado.
	 * @param {object} payload - Datos de salón y foto.
	 * @param {string} token - Token de autenticación del usuario.
	 */
	async _create_foto_API(payload, token, api='') {
		try {
			const response = await fetch(api, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
			const result = await response.json();
			if (!response.ok) {
				return { ok: false, message: result?.message || 'No se pudo Guardar la foto.' };
			}
			return { ok: true, message: result?.message || 'Foto Guardada' };
		} catch (error) {
			console.error('_create_foto_API:: Error Guardando foto del Salon:', error);
			return { ok: false, message: 'Error inesperado al GUARDAR la foto. 🎞️​' };
		}
	}
    
	/**   👂 ​👂​ 
	 * ### Actualiza Los Metadatos titulo, slug, plantilla, publica, mensaje de una Foto del Salon si el usuario está autenticado.
	 * @param {object} payload - Datos de salón y foto.
	 * @param {string} token - Token de autenticación del usuario.
	 * @param {string} api  `/api/fotos/${foto_id}`
	 */
	async _update_ficha_API(payload, token, api='') {

		try {
			const response = await fetch(api, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
			const result = await response.json();
			if (!response.ok) {
				return { ok: false, message: result?.message || '❌ No se pudo actualizar la foto.' };
			}
			return { ok: true, message: result?.message || 'Foto Actualizada' };
		
		} catch (error) {
			console.error('❌​ _update_ficha_API:: Error Guardando/Actualizando foto del Salon:', error);
			return { ok: false, message: 'Error inesperado al GUARDAR la foto. 🎞️​' };
		}
	}
	/** 
	 * ### Verifica si el slug ya existe en la base de datos( {@link create} ). . . select_foto_by_slug en fotoController.js
	 * @param {string} slug_candidato - El slug a verificar.
	 * @param {string} token - Token de autenticación del usuario.
	 * 
	 */
	async _get_registro_by_slug_API(slug_candidato, token){
		try {
			// Validacion
			if(!slug_candidato || typeof slug_candidato != "string" || slug_candidato.trim() === '') return false;					
			if(!token || typeof token != "string" || token.trim() === '') return false;
			// Asignación del payload(datos a enviar al servidor)
			const payload = {
				slug_publico: slug_candidato
			};
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			// REALIZO LA PETICIÓN POST AL SERVIDOR
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			const response = await fetch(`/api/fotos/check-existing`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
			// ■ Comprueba si la respuesta es exitosa
			if(!response.ok){ throw new Error(`${response.status}`); }
			
			// ■ Leer JSON, hay que parsear la respuesta JSON 
			// (el Servidor me responde con texto plano que hay que convertir a diccioannrio con JSON)
			const foto = await response.json();

			// ■ El backend devuelve { foto(*) o false }
			return foto; 
		
		} catch (error) {
            // console.error("_is_slug_on__BDD() - Error al verificar slug:", error);
            return false;
        }
	}
	
	/** ### Obtiene las dimensiones del salon con las que fue tomada la foto */
	async _get_dimension_foto_API(foto_id){
		try {
			// ┌••••••••••••••••••••••••••••••••
			// ┌•• CONSULTA A LA BASE DE DATOS.
			// ┌••••••••••••••••••••••••••••••••
			const token = localStorage.getItem('token');
			const response = await fetch(`/api/fotos/${foto_id}/dimensiones`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			});
			// ┌••••••••••••••••••••••••••••••••
			// ┌•• ANALISIS DE LAS RESPUESTAS
			// ┌••••••••••••••••••••••••••••••••
			const UI = this.Salon?.CFG?.UI;
			// ┌•• Si el token expiró o no existe, el servidor devolverá 401 o 403
			if (response.status === 401 || response.status === 403) {
				// alert("Sesión expirada. Por favor, vuelve a iniciar sesión.");
				Alertas_UI._NotA("Sesion Expirada", "Por favor, vuelve a Iniciar Sesión.", "danger");
				window.location.href = 'login.html'; // Redirección humana
				return;
			}
			if (!response.ok) 
				throw new Error(` _get_dimension_foto_API ::: Error en la red ::: id_foto: ${foto_id}` );			
			
			// ┌•••••••••••••••••••••••••••
			// ┌•• Tenemos datos  ✔️
			// ┌•••••••••••••••••••••••••••
			const dimensiones = await response.json();						
			if(!dimensiones || dimensiones.ok === false)
				throw "Lanzado ::: Error Lógico, No tenemos dimensiones !!! "
			
			// ┌•• LOG 
			console.log(`Dimensiones: ${JSON.stringify(dimensiones, 2)}`);
			console.log(`Dimensiones: ${dimensiones.filas} x ${dimensiones.columnas} `);
						
			// ┌••••••••••••
			// ┌•• Retorno 
			// ┌••••••••••••
			// return {filas: dimensiones.filas, columnas:dimensiones.columnas};
			return dimensiones;
			
		} catch (error) {			
			console.log(`❌ _get_dimension_foto_ ::: Error Inesperado ::: ${error}`);
			return false;
		}
	}	

	
	/** 🔗🔗🔗   • • • Enlance con Salon:: api__foto
	 * ### Construye el payload para guardar/actualizar una foto.
	 * @param {object} valores_offcanvas - Datos del formulario.
	 */
	_set_payload_create(valores_offcanvas) {
		
		// ┌•• Cacho el rango_matriz
		const RnG  = this?.Salon?.eRdS;
		if(!RnG) return;
		
		// ┌•• Le hace una foto al salón en este momento
		const dicc_api_foto = this.Salon?.api_foto();
		const dimension = this.Salon.dimesion;		
		
		// ┌•• Cacho los rangos de las reservas de la foto.
		const rangos_reservas = RnG._reservas_a_rangos(dicc_api_foto.reservas || [], dicc_api_foto.indices, dimension || null);
		// ┌•• Cacho el Rango Matriz.
		RnG.to_pull('rango_matriz');
		const rango_matriz = RnG?.d_rangos["rango_matriz"];

		const rango_tot = {reservas: rangos_reservas , matriz: rango_matriz};
		
		const CFG = dicc_api_foto.configuracion || this.dicc_config || {};
		return {
			salon: {
				nombre: this.Salon?.family,
				columnas: this.Salon?.columnas,
				filas: 	 this.Salon?.filas,
				family: CFG.salon.family || '',
				configuracion_json: CFG,
				clases_json: CFG.salon.clases_css || {},
				rutas_json:  CFG.salon.rutas || {},
				tipos_json:  CFG.salon.tipos || {}
			},
			foto: {
				titulo: valores_offcanvas.titulo,
				dicc_reservas: 	dicc_api_foto.reservas || [],
				dicc_indices: 	dicc_api_foto.indices || {},
				dicc_mensajes: 	dicc_api_foto.mensajes || {},
				dicc_alergias:  dicc_api_foto.alergias || {},
				dicc_configuracion: dicc_api_foto.configuracion || {},
				es_plantilla: 	valores_offcanvas.es_plantilla,
				es_publica: 	valores_offcanvas.es_publica,
				slug_publico: 	valores_offcanvas.slug_publico,
				mensaje_publico: valores_offcanvas.mensaje_publico,
				// Las fotos deben guardar el numero de filas y columnas con el que se guardó. 
				// de esta forma se puede comparar con el numero de columnas y filas de dicc_configuracion. 
				// columnas y filas de salon es equivalente, pero solo se crea un salon por cada x fotos, hasta que una foto 
				// guarda un dato nuevo sobre salon y entonces se creará un nuevo salon para que puedan guardarse fotos en Él.
				columnas: this.Salon.columnas,
				filas: this.Salon.filas,
				// ┌■ 🔥 🔥 Añado los rangos generados de las reservas. 🔥 🔥 
				rangos: rango_tot,
				// rangos: rangos_reservas,
			}
		};
	}

	/**
	 * 
	 */
	_set_payload_update_ficha(valores_ficha_salon){
		if(!valores_ficha_salon) return false;
		const vfs = valores_ficha_salon;
		return {
			id:			vfs.id,
			titulo: 	vfs.titulo,
			slug_publico: 		vfs.slug_publico,
			mensaje_publico: 	vfs.mensaje_publico,
			es_plantilla: 	vfs.es_plantilla,
			es_publica: 	vfs.es_publica,
		};

	}
	
	/** 🎞️🎞️  - STATIC METHOD 🧍‍♂️
	 * ### Normaliza un slug: minúsculas y guiones.
	 */
	static _normalizar_slug_CU(valor) {
		if (!valor) return '';
		return valor.trim().toLowerCase().replace(/\s+/g, '-');
	}
	
		

	
	/**
	 * ## Cambia los caracteres html por utf8 (por seguridad)
	 * @param {string} valor texto que se quiere quitar html (Es un por si acaso)
	 */
	static _escapar_html_RUD(valor) {
		return String(valor)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}
	

	/**
	 * ## Valida la carga de la foto en el salon:
	 * ### Hay que validar que las dimensiones de Salon y las dimesiones de la foto a cargar de la bdd sean iguales o distintas
	 */
	async __validar_carga(foto_id){
		const Salon = this.Salon || null;
		const UI = this.Salon?.CFG?.UI;			// UI de Configuracion_Salon, usado para mensajes y alertas.
		const lista_fotos = this.lista_fotos_RUD || [];
		
		const foto = lista_fotos.find(reg => reg.id === foto_id);
		if(!foto) return;
		
		// ┌••••••••••••••••••••••••••••• 
		// ┌•• 🧠🧠 VALIDO DIMENSIONES
		const puedo_pasar = this._logica_match_dimensiones(foto);				
		if (puedo_pasar === false){
			const msg = `<br>■ Dimension <b>Salon:</b> ${Salon.filas}x${Salon.columnas}<br> ■ Dimension <b>Foto:</b> ${foto.filas}x${foto.columnas}`;
			// Alertas_UI._NotA("Operacion Anulada", `${msg}<br><br>🟥 🟥 🟥 🟥 QUITO EL RETURN PARA PRUEBAS....VOLVER A PONER!!!!!`, "danger");
			// const retorno = await UI.DatIN("Advertencia: Dimensiones Distintas!", `${msg}`, `<br><br>Escribe la Celda de Inicio del que vas a Importar:`, "warning");
			return true;
		}
		return true;

	}
	
	/** 
	 * ### Lógica crítica al cargar un salón Guardado.
	 * 1. Pregunta confirmación.
	 * 2. Limpia el salón actual.
	 * 3. Buscamos datos de la foto_id
	 * 4. Carga datos Nuevos
	 */
	async _accion_cargar_elementos_en_Salon(foto_id) {
		const Salon = this.Salon || null;
		const CFG = this.Salon?.CFG;			// Configuracion_Salon
		const UI = this.Salon?.CFG?.UI;			// UI de Configuracion_Salon, usado para mensajes y alertas.
		const RnG = this.Salon.eRdS || null;
		// ┌■■ Busca la foto en la lista de fotos
		const photo = this.lista_fotos_RUD.find(reg => reg.id === foto_id);
		if(!photo) return;
		// ┌• 🧹 Dejo Limpio el Salon de mesas, sillas, mensajes, reservas, etc...
		CFG.limpiar_Salon();
		// ┌■ Oculto todos los "posibles" anteriores offcanvas abiertos
		this._ocultar_offcanvas_abiertos();
		try {
			// ┌•• Buscamos Datos en BDD:
			// ┌• Cachamos el registro para conseguir el slug-publico del salon abierto.
			// ┌• Lo 'cacho' de BDD pq el user puede hacer cambios en la ficha antes de  querer cargar un elemento.
			const foto_select = await this._get_foto_from_BDD(foto_id);		
			if(foto_select) {
				this.foto_work = foto_select;
				this._set_UI_ojo(this.foto_work);		// ┌• icono-camara
			}else{
				this._set_UI_ojo();							// ┌• Limpiar icono-camara
				throw('Error Al cargar foto de BD');
			}
			// ┌••••        •••••••••
			const FW = this.foto_work || null;
			// ┌•• •••••••••           •• •••••••••••••
			// ┌■■ DIMENSION del Salon en BASE DE DATOS.
			const filas_bdd = FW.filas;
			const columnas_bdd = FW.columnas;
			// ┌•• •••••••••          •• •••••
			// ┌■■ DIMENSION del Salon en 'Salon'
			const filas_salon = Salon.filas;
			const columnas_salon = Salon.columnas;
			// 🧩 Cacho los RANGOS desde la Base de datos: la Reserva "no está" o "no tiene pq estar" sobre la mesa.
			const rango_s_en_BDD = RnG._reservas_a_rangos(FW?.dicc_reservas, FW?.dicc_indices, {filas:filas_bdd, columnas:columnas_bdd});
			if(rango_s_en_BDD) {				
				rango_s_en_BDD.forEach(rango =>{					
					const ghostizado = RnG._ghost(rango);	
					const nombre_f = RnG._nombrar_rango_anonimo(ghostizado);
					// ┌• Impongo 'cut' para que ghost suelte SU el elemento en el salon y no Haga un clon. revisar "stt.paste"
					RnG.paste_ghost(true, false, true);									
					RnG.api_delete(nombre_f);
				});
			}
			// ┌■■■
			// ┌■■■
			// ┌■ Cacho los datos que nos interesan para cargar las sillas y las mesas.
			const d_mensajes = FW.dicc_mensajes;
			const d_indices = FW.dicc_indices;
			const d_alergias = FW.dicc_alergias;
			// 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳
			// 🔳🔳🔳🔳🔳🔳 CARGA Antigua de  SALON 🔳🔳🔳🔳🔳🔳
			// ┌• CARGA LOS MENSAJES
			this._load_en_Salon(d_indices, d_mensajes);						
			// ┌• CARGA LAS ALERGIAS
			Salon._load_alergias_en_Salon(d_alergias);
			// ┌••   ••••••••
			Salon.RegisteR();
			console.log("┌■■ SCANNER + REGISTRO ✔️");
			// 🟥 ┌•••  🟥

			console.log(" • • • • • • • •  FIN");
			this.foto_work = FW;
		} catch (error) {
			console.log(`❌ Error ::: __cargar_elementos_en_Salon ::: foto_id ► ${foto_id}`)
			console.error(error);
			return;
		}
	}

	/** ### Lleva la lógica de abrir una foto del Salón:
	 * ### • Comprueba dimensiones.
	 * ### • Si hay cambiio de dimensiones gestiona las opciones	 */
	async __el_portero_de_carga(modelo_salon, filas_salon, columnas_salon, filas_bdd, columnas_bdd){

		// ┌■■■
		// ┌■■■ opcion 1
		// ┌■■■
		const puedo_pasar = this._logica_match_dimensiones(photo);				
		let fila = '';
		let columna = '';
		if (puedo_pasar === false){
			// ┌• de Mayor Dimension en BD a Menor Dimension en Salon.
			
			// Alertas_UI._NotA("Operacion Anulada", `${msg}<br><br>🟥 🟥 🟥 🟥 QUITO EL RETURN PARA PRUEBAS....VOLVER A PONER!!!!!`, "danger");
			const titulo = "Advertencia: Dimensiones Distintas!";
			let msg = `<br>■ Dimension <b>Salon:</b> ${Salon.filas}x${Salon.columnas}<br> ■ Dimension <b>Foto:</b> ${photo.filas}x${photo.columnas}<br>`;
			msg += `<br><br><h5>Al cargar este salón se perderá el trabajo actual no guardado.</h5>`;				
			const label = `<br><br>Escribe la Columna de Inicio Desde la foto ${photo.filas}x${photo.columnas}`;
			
			RnG.api_crear("", celda_inicio_rango_open, dimension, false, false);
			// let celda_s = 
			
			const entre_estos = ['A0', 'B0', 'C0', 'D0', 'E0'];
			const retorno = await UI.CombIN(`${titulo}`, `${msg}`, `${label}`, entre_estos, "warning", 'A0');
			celda_inicio_rango_open = retorno.toUpperCase();
			
			// Extrae fila y columna de los datos de la resupuesta de usuario:
			const match = celda_inicio_rango_open.trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
			if (!match) return null;			
			fila = RnG._entero_positivo(match[2]);
			columna = RnG._AZ_to_numcol(match[1]);

		}else{
			// ┌•• Mensaje Confirmacion - Dimension
			let mensaje = `Al cargar este salón se perderá el trabajo actual no guardado.`;				
			const confirmacion = await UI.ConfirM("❔ Confirmación:", mensaje, "warning");
			if(!confirmacion) return;
		}
		// ┌■■■
		// ┌■■■ opcion 2
		// ┌■■■
		
		// ┌•• •••••••••           •• •••••••••••••
		// ┌■■ DIMENSION del Salon en BASE DE DATOS.
		// const filas_bdd = FW.filas;
		// const columnas_bdd = FW.columnas;
		
		// ┌•• •••••••••          •• •••••
		// ┌■■ DIMENSION del Salon en 'Salon'
		// const filas_salon = this.Salon.filas;
		// const columnas_salon = this.Salon.columnas;

		// 🔥🔥 COMPARAMOS DIMENSIONES EN SALON Y EN BASE-DATOS y Planes(limitado/scrollado/apilado)
		if(Salon.modelo_salon==='limitado'){
			if (columnas_bdd != columnas_salon){
				console.log(`Cargar-Elementos::: Columnas Distintas 🔥 ::: Modelo-Salon:${Salon.modelo_salon}, columnas-BDD: ${columnas_bdd}, columnas-Salon: ${columnas_salon}`)
			}
		}else if(Salon.modelo_salon === 'scrolado'){
			if (columnas_bdd != columnas_salon){
				console.log(`Cargar-Elementos::: Columnas Distintas 🔥 :::  Modelo-Salon:${Salon.modelo_salon}, columnas-BDD: ${columnas_bdd}, columnas-Salon: ${columnas_salon}`)
			}				
		}else if(Salon.modelo_salon=== 'apilado'){
			if (columnas_bdd != columnas_salon){
				console.log(`Cargar-Elementos::: Columnas Distintas 🔥 :::  Modelo-Salon:${Salon.modelo_salon}, columnas-BDD: ${columnas_bdd}, columnas-Salon: ${columnas_salon}`)
			}			
		}else{
			console.log('modelo_salon No registrado!, columnas puestas = 8');
		}

		// ┌■■■
		// ┌■■■ Acciones Finales
		// ┌■■■

		// ┌••       •••••••••••           ••••• ••    •••••
		// ┌•• 🧠🧠 PREPARACION DEL SALON ANTES DE LA CARGA DE ELEMENTOS.

		// ┌• 🧹 Dejo Limpio el Salon de mesas, sillas, mensajes, reservas, etc...
		CFG.limpiar_Salon();

		// ┌■ Oculto todos los "posibles" anteriores offcanvas abiertos
		this._ocultar_offcanvas_abiertos();

	}

	/** ## Maneja la 🧠🧠 Logica para re-posicionar o no un Salon. Devuelve true / false
	 * ### Compara las dimensiones del salon actual con las dimensiones de la foto a cargar.
	 * ### Si son iguales devuelve true.
	 * ### Si son distintas: si viene de menos a mas devuelve true, si viene de mas a menos devuelve false.
	 * {@link _accion_cargar_elementos_en_Salon}
	 */
	_logica_match_dimensiones(photo){
		const Salon = this.Salon;
		let de_menos_a_mas  = false;
		let pase_vip = false;
		if(!photo) return;

		// ┌•• 
		if(photo.filas === Salon.filas && photo.columnas === Salon.columnas){
			// Mismas dimensiones - Caso ideal  ✔️
			return true;
		}else if(photo.filas === Salon.filas){
			// Mismas Filas, Cambian las Columnas 
			if(Salon.columnas > photo.columnas ){
				// viene de menos a mas . . . no es pa tanto
				de_menos_a_mas = true;
			}else{
				// viene de mas a menos . . . AVISAR Y REPOSICIONAR 🔔
				de_menos_a_mas = false;
			}
		}else if(photo.columnas === Salon.columnas){
			// Mismas Columnas, Cambian las Filas 
			if(Salon.filas > photo.filas){
				// viene de menos a mas . . . no es pa tanto
				de_menos_a_mas = true;
			}else{
				// viene de mas a menos . . . AVISAR Y REPOSICIONAR 🔔
				de_menos_a_mas = false;
			}
		}else{			
			// Filas y Columnas Distintas   . . .  AVISAR Y REPOSICIONAR 🔔
			de_menos_a_mas = false;
		}
		// ┌••••••••••• El orden es importante.
		if (pase_vip) 	return true;
		if (de_menos_a_mas) return true;
		// ┌•••••••••••
		return false;
	}

	/** UI 🖼️ 
	 * ### Carga los elementos en el salón según los índices proporcionados + mensajes.
	 * @param {*} dicc_indices diccionario de indices de los elementos en la matriz_plana - cachado de api_fotos
	 * @param {*} dicc_mensajes diccionario de mensajes de los elementos en la matriz_plana - cachado de api_fotos - viene de _Motor_Msgs_Popov
	 * 
	 */
	_load_en_Salon(dicc_indices, dicc_mensajes = {}, dicc_alergias = {}){ 
		const Salon = this.Salon;
		try {
			if (!this.Salon) return;
			// ┌• INDICES
			Salon._load_elementos_en_Salon(dicc_indices);
			// ┌• MENSAJES
			Salon._load_mensajes_en_Salon(dicc_mensajes);
			
			// ┌• ALERGIAS
			Salon._load_alergias_en_Salon(dicc_alergias);

			// ┌• REGISTRO DEL ESTADO DEL SALON.
			// this.Salon.RegisteR();
			return true;
		} catch (error) {
			console.log(`X Error::: Foto_CRUD ::: load_mesas_sillas_y_registra_RUD ::: Error::: ${error}`);
			return false;
		}
	}

	

	/** ## 👂 PANEL DE FILTROS PLANTILLA / PUBLICA
	 * ### Actualiza la UI + Pone los Listeners para la visualización que ejecuta la Lógica cuando se Seleccionan los Filtros.
	 * {@link _inyectar_offcanvas_RUD}
	*/
	_filtros_plantilla_publica_RUD(){
		const $radioTodos = document.getElementById('radio-todos');
		const $radioCustom = document.getElementById('radio-custom');
		const $optionsPanel = document.getElementById('opciones-personalizadas');
		const $statusDisplay = document.getElementById('status-display');
		const $es_publica = document.getElementById('check-publica');
		const $es_plantilla = document.getElementById('check-plantilla');

		if (!$radioTodos || !$radioCustom || !$optionsPanel || !$statusDisplay) return;
		/**
		 * ## Actualiza el UI cuando hay un cambio en las pestañas Todos/Personalizado.
		 */
		const updateUI = () => {
			if ($radioTodos.checked) {
				$optionsPanel.style.opacity = '0.4';
				$optionsPanel.style.pointerEvents = 'none';
				$statusDisplay.textContent = 'Estado: Mostrando todo.';
			} else {
				$optionsPanel.style.opacity = '1';
				$optionsPanel.style.pointerEvents = 'auto';
				$statusDisplay.textContent = 'Estado: Filtros personalizados activos.';
			}
		};

		/**
		 * ## Plantilla ó Publica
		 */
		const switch_publica_plantilla = () => {
			const lista_datos = this.lista_fotos_RUD;
			if (!lista_datos) return;

			// 1. Capturamos el estado actual de los checks (true o false)
			const valor_check_publica = document.getElementById('check-publica').checked;
			const valor_check_plantilla = document.getElementById('check-plantilla').checked;

			// 2. Filtramos la lista buscando la coincidencia exacta
			const lista_filtrada = lista_datos.filter(reg => Boolean(reg.es_publica) === valor_check_publica && Boolean(reg.es_plantilla) === valor_check_plantilla);

			// 3. Enviamos la lista resultante al renderizador
			this._inyectar_lista_registros_RUD(lista_filtrada, this.RUD.$contenedor_dinamic);

		};

		/**
		 * ## Cuando se hace click sobre 'Todos'
		 */
		const update_estado = () => {
			this._inyectar_lista_registros_RUD(this.lista_fotos_RUD, this.RUD.$contenedor_dinamic);
			updateUI();
		}	

		$radioTodos.addEventListener('change', update_estado);
		$radioCustom.addEventListener('change', updateUI);		
		$es_publica.addEventListener('change', switch_publica_plantilla);
		$es_plantilla.addEventListener('change', switch_publica_plantilla);

		// Ejecución inicial para establecer el estado correcto
		updateUI();
	}
	
	
	
	// ■■■
	// ■■■ Helpper's
	// ■■■

	/** 🖼️ UI 🖼️
	 * ### Cambia el icono de ver-info. Toma los datos de this.registro_abierto_.
	 */
	_set_UI_camara(registro_info =  null) {
		const icono = e_Salon._to_element(this.Salon?.bi_nav?.cu) || null;
		if (!icono) return;

		const FA = registro_info;
		if (FA) {

			icono.classList.add('text-success');	// Verde
			icono.classList.replace('bi-camera', 'bi-camera-fill'); // Intercambio de clase Bootstrap Icons

			icono.setAttribute('title', tooltip_text);
			icono.setAttribute('data-bs-title', tooltip_text);
			icono.setAttribute('data-bs-original-title', tooltip_text);
			icono.setAttribute('data-bs-toggle', 'tooltip');			
			icono.setAttribute('data-bs-html', 'true');
			icono.setAttribute('data-bs-custom-class', 'tooltip-wide');
			// icono.setAttribute('data-bs-custom-class', 'tooltip-left');
		} else {
			icono.classList.remove('text-success');			
			icono.classList.replace('bi-camera-fill', 'bi-camera');

			icono.setAttribute('title', 'Ver Info Salon');
			icono.removeAttribute('data-bs-title');
			icono.removeAttribute('data-bs-original-title');
			icono.removeAttribute('data-bs-toggle');
			icono.removeAttribute('data-bs-html'); // Limpiamos html.
			icono.removeAttribute('data-bs-custom-class');
		}
		
		if (window.bootstrap?.Tooltip) {
			const tooltip = window.bootstrap.Tooltip.getInstance(icono);
			tooltip?.dispose();
			window.bootstrap.Tooltip.getOrCreateInstance(icono);
		}
	}

	/** 
	 * @param {*} activar 
	 */
	_set_UI_ojo(registro_info = null){
		const icono = e_Salon._to_element(this.Salon?.bi_nav?.rud) || null;
		if (!icono) return;

		const FA = registro_info;
		if (FA) {
			const titulo = Foto_CRUD._escapar_html_RUD(FA.titulo || '😎');
			const slug_publico = Foto_CRUD._escapar_html_RUD(FA.slug_publico || '😎');
			const mensaje_publico = Foto_CRUD._escapar_html_RUD(FA.mensaje_publico || '😎');
			const captured_at = FA.captured_at  ? new Date(FA.captured_at).toLocaleString('es-ES') : '😎';
			const es_publica   = Boolean(FA.es_publica)   ? '🟢' : '🔴';
			const es_plantilla = Boolean(FA.es_plantilla) ? '🟢' : '🔴' ;

			const tooltip_text = [
				`📜 <b>Titulo:</b> ${titulo}`,
				`&emsp;┌• slug: ${slug_publico}`,
				`📩 <b>mensaje:</b> ${mensaje_publico}`,
				`🕒 <b>captured_at:</b> ${captured_at}`,
				`🍞 <b>es_plantilla:</b> ${es_plantilla}`,
				`🌍 <b>es_publica:</b> ${es_publica}`,
			].join('<br>');

			icono.classList.add('text-success');	// Verde
			// icono.classList.replace('bi-info-circle', 'bi-info-circle-fill'); // Intercambio de clase Bootstrap Icons

			icono.setAttribute('title', tooltip_text);
			icono.setAttribute('data-bs-title', tooltip_text);
			icono.setAttribute('data-bs-original-title', tooltip_text);
			icono.setAttribute('data-bs-toggle', 'tooltip');			
			icono.setAttribute('data-bs-html', 'true');
			icono.setAttribute('data-bs-custom-class', 'tooltip-wide');
			// icono.setAttribute('data-bs-custom-class', 'tooltip-left');
		} else {
			icono.classList.remove('text-success');			
			// icono.classList.replace('bi-info-circle-fill', 'bi-info-circle');

			icono.setAttribute('title', 'Ver Info Salon');
			icono.removeAttribute('data-bs-title');
			icono.removeAttribute('data-bs-original-title');
			icono.removeAttribute('data-bs-toggle');
			icono.removeAttribute('data-bs-html'); // Limpiamos html.
			icono.removeAttribute('data-bs-custom-class');
		}
		
		if (window.bootstrap?.Tooltip) {
			const tooltip = window.bootstrap.Tooltip.getInstance(icono);
			tooltip?.dispose();
			window.bootstrap.Tooltip.getOrCreateInstance(icono);
		}
	}


	/** 🎞️🎞️🎞️🎞️🎞️🎞️🎞️🎞️🎞️
	 * genera un titulo automatico con la fecha y hora actual que se puede cambiar.
	 * @returns {string} Título normalizado con la fecha y hora actual.
	 */
	static _get_fechahora_tituled() {
		

		const ahora = new Date();
		const formatter = new Intl.DateTimeFormat('es-ES', {
			day: 'numeric',
			month: 'short',
			year: '2-digit'
		});

		// Convertimos el array de partes en un objeto manejable
		const partes = formatter.formatToParts(ahora).reduce((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {});

		// Quitamos el punto del mes si existe
		const mesLimpio = partes.month.replace('.', '');

		// Ahora puedes acceder a cada dato individualmente
		const fecha = `${partes.day} ${mesLimpio} ${partes.year}`;

		// console.log(resultado); // Ejemplo: "7 ene 26"
		// Formatear hora, minutos y segundos con padStart para asegurar dos dígitos (ej: 07 en vez de 7)
		const horas = ahora.getHours().toString().padStart(2, '0');
		const minutos = ahora.getMinutes().toString().padStart(2, '0');
		const segundos = ahora.getSeconds().toString().padStart(2, '0');
		
		// Construir la cadena final		
		return `foto_${fecha}__${horas}h_${minutos}'_${segundos}"`;
		// // Construir la cadena final
		// return `${formato.day} ${formato.month} ${formato.year} -x- ${horas}h${minutos}'${segundos}"`;
	}

	/** 
	 * ## Petición asíncrona para traer las fotos del usuario.
	 * ### Limpia el contenedor y renderiza de nuevo. Carga dinámica de la Consulta a la BDD.
	 * {@link _inyectar_lista_registros_RUD}
	 */
	async _load_lista_registros() {
		const cd = this.RUD.$contenedor_dinamic;

		this.lista_fotos_RUD = [];
		try {
			const token = localStorage.getItem('token');
			const response = await fetch('/api/fotos/mis-fotos', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			if (!response.ok) throw new Error('Error de red');
			const data_json = await response.json();
			
			// ┌•• Me Guardo una copia 💾
			this.lista_fotos_RUD = data_json;
			this.is_lista_registros_completa = true;			

			return true;
		} catch (error) {
			// 🆕 Aqui tendría que cachar el tipo de error para mandar un mensaje personalizado
			// console.error("Fail al cargar los registros de fotos:", error);
			// cd.innerHTML = '<div class="text-danger p-3 text-center">❌ No se pudieron cargar tus salones.</div>';
			this.is_lista_registros_completa = false;			
			return false;
		}
	}

	/**
	 * ### Genera un valor secuencial único si el valor_inicial ya existe en la lista_fotos_RUD. {@link _abrir_ventana_CU}
	 * @param {string} propiedad - La key (ej: 'titulo', 'slug') 
	 * @param {string} valor_inicial - El valor inicial (ej: 'baron')
	 * @example _get_sugerencia_unica('slug', 'lunes')  ■ RESULTADO ■ 'lunes_2'
	 * 
	 */
	_get_sugerencia_unica(propiedad, valor_inicial) {
		let sugerencia = valor_inicial;
		let contador = 0;

		// Mientras el valor exista en la lista, seguimos probando con el siguiente número
		// Primera iteración: 'baron'
		// Segunda: 'baron_0', luego 'baron_1', etc.
		while (this.__existe_en_lista_registros(propiedad, sugerencia)) {
			sugerencia = `${valor_inicial}_Copia(${contador})`;
			contador++;
		}

		return sugerencia;
	}
	/**
	 * ## Chequea si un valor ya existe para una propiedad específica en la lista. . . * {@link _get_sugerencia_unica}
	 * @param {string} propiedad - La key a buscar (titulo, slug, etc.)
	 * @param {any} valor - El valor que queremos verificar.
	 * @returns true/false
	 * {@link _get_sugerencia_unica}
	 */
	__existe_en_lista_registros(atributo, valor) {
		// Validamos que la lista exista y no esté vacía
		if (!this.lista_fotos_RUD || this.lista_fotos_RUD.length === 0) return false;

		return this.lista_fotos_RUD.some(objeto => objeto[atributo] === valor);
	}
	
	/**
	 * ## Devuelve un registro de la ultima__lista_renderizada ( lista_fotos_RUD ) si Existe.
	 * @param {*} foto_id foto id de la ultima__lista_renderizada. 
	 * @return {object|null} registro = {titulo, }
	 */
	_get_regitro_from_lista(foto_id){
		if(!foto_id || typeof foto_id != 'number') return; 
		let registro=null;
		if (this.lista_fotos_RUD){
			registro = this.lista_fotos_RUD.find(reg => reg.id === foto_id );
			if(registro) return registro;
		} 
		return null;
	}

	/** ### Obtiene una foto de la Base de Datos (select * from foto)  o null
	 *  ### en {@link ../../server/controllers/fotoController get_foto_by_id} */
	async _get_foto_from_BDD(foto_id){
		try {
			// ┌•• Vamos a la BD ► get_foto_by_id()  en fotoController.js ► 'select * from foro where id = foto_id'  			
			const token = localStorage.getItem('token');
			const response = await fetch(`/api/fotos/${foto_id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			});
			// ■■ Si el token expiró o no existe, el servidor devolverá 401 o 403
			if (response.status === 401 || response.status === 403) {
				// alert("Sesión expirada. Por favor, vuelve a iniciar sesión.");
				Alertas_UI._NotA("Sesion Expirada", "Por favor, vuelve a Iniciar Sesión.", "danger");
				window.location.href = 'login.html'; // Redirección humana
				return;
			}
			if (!response.ok) throw new Error(`❌ _accion_cargar_elementos_en_Salon_ ::: Error en la red ::: id_foto: ${foto_id}` );			
			// • • • Tenemos datos  ✔️
			const foto_json = await response.json();			
			// ┌•• LOG 
			// console.log(`Registro: ${JSON.stringify(foto_json, 2)}`);
			// console.log(`Registro: ${foto_json.id}`);
			
			return foto_json;

		} catch (error) {
			console.log(`❌ Error ::: _get_foto_from_BDD ::: ${error}`);
			return null;
		}		
	}

	/**
	 * ## Si hubiera mas objetos modales abiertos, los Cierro 🔒
	 */
	static _limpiar_modales_anteriores(){
		// ■■ Limpiar modales anteriores del mismo tipo
		const oldModals = document.querySelectorAll('[id^="jsonModal_"]');
		oldModals.forEach(modal => {
			// ■ Cerrar primero si está abierto
			const $formulario_bootstrap_modal = bootstrap.Modal.getInstance(modal);
			if ($formulario_bootstrap_modal) {
				$formulario_bootstrap_modal.hide();
			}
			// ■ Remover del DOM visualmente cada 100 msg
			setTimeout(() => modal.remove(), 100);
		});
	}
	/**
	 * Limpia todos los formularios dentro de un elemento.
	 * @param {HTMLElement} container - El elemento que contiene los formularios (ej: this.$offcanvas)
	 */
	static _limpiar_formularios(container) {
		const forms = container.querySelectorAll('form');
		forms.forEach(form => form.reset());
	}

	_ocultar_offcanvas_abiertos(){
		// ┌■ Oculto todos los "posibles" anteriores offcanvas abiertos
		const offcanvasEl = document.querySelector('.offcanvas.show');
		if (offcanvasEl && window.bootstrap?.Offcanvas) {
			const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
			bsOffcanvas?.hide();
		}
	}

	// ■■■■
	// ■■■■ GETTER'S AND SETTER'S
	// ■■■■
	get registro(){
		return this.foto_work || null;
	}

}
// ■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Save_Photo;
// }


// ◘◘◘ 
// ◘◘◘ Ini  CLASE 	PopOverElemen_t ◘◘◘
// ◘◘◘ 
// Clase para gestionar un PopOver de Bootstrap 5.3+
// Solo se crea un PopOver y se va reutilizando para todas las sillas.
// Se crea un PopOver "vacío" y oculto, enganchado a un div dummy.
// Luego se va reenganchando a la silla que lo solicita.

// Propiedades importantes de this.bs_popover:
// 		tip: El elemento DOM del popover (equivalente a lo que era getTipElement())
// 		_element: El elemento al que está attached el popover
// 		_popper: La instancia de Popper para positioning




// ◘◘◘◘
// Side__Elementos: Sidebar de elementos (mesa/silla)
//  ◘◘◘
class Side_Elementos {
	/**
	 * ### Inicializa el sidebar persistente de elementos del Salón.
	 * • Se mantiene vivo en el DOM para reutilizarlo muchas veces (KISS).
	 * {@link e_Salon}
	 */
	constructor(dragCallback = null, diccionario_elementos = null, icono_disparador = null, opciones = {}) {
		/** ### Es el enlace disparador del sidebar en el navbar(cubo). */
		this.icono_disparador = icono_disparador;
		/** ### Callback para manejar el arrastre de elementos. */
		this.dragCallback = typeof dragCallback === 'function' ? dragCallback : null;
		
		/** sidebar del dom */
		this.$sidebar = null;		
		/** posicion del sidebar */
		this.posicion = opciones.posicion ?? 'right';
		/** */
		this.modo_tamano = opciones.modo_tamano ?? 'content';		
		/** Estados del sidebar */
		this._estado = 'closed';		
		/** Último tiempo de pointerdown, sirve para evitar eventos duplicados */
		this._ultimo_pointerdown = 0;
		/** Bandera para bloquear el movimiendo del sidebar */
		this._bloqueo_movimiento = false;
		
		/** ### El botoncito de abajo del sidebar para moverlo */
		this._drag_handle = null;
		// $body
		/** Offset para el arrastre (por el desfase de los puntos del dedo)*/
		this._offset = {
			x: 0,
			y: 0,
		};
		/** diccionario de datos para el arrastre */
		this.d_drag = {
			activo: false,
			inicio_x: 0,
			inicio_y: 0,
			delta_x: 0,
			delta_y: 0,
			rect_inicio: null,
		};

		if (!this.icono_disparador) return;

		this._crear_sidebar();
		this._configurar_icono();
		this._vincular_eventos();
	}

	

	/**
	 * ### Crea el sidebar una sola vez o reutiliza el existente para mantenerlo vivo.
	 * @link constructor
	 */
	_crear_sidebar() {
		const sidebar_existente = document.querySelector('[data-side-elementos="sidebar"]');
		if (sidebar_existente) {
			this.$sidebar = sidebar_existente;
			this._sincronizar_sidebar_existente();
			return;
		}

		this.$sidebar = document.createElement('div');
		this.$sidebar.dataset.sideElementos = 'sidebar';
		this.$sidebar.dataset.sidePosition = this.posicion;
		this.$sidebar.dataset.sideState = this._estado;
		this.$sidebar.dataset.sideSizeMode = this.modo_tamano;
		this.$sidebar.dataset.sideDragging = 'false';
		this.$sidebar.dataset.sideLocked = 'false';

		// contenido es un div donde voy a meter todos los elementos players.
		// const contenido = document.createElement('div');
		// contenido.dataset.sideContent = 'lista';

		// Consultar la nueva fuente de la verdad
        const elementos_catalogo = Catalogo.get();
		
		const contenedor_elementos = document.createElement('div');
		contenedor_elementos.className = 'side_lista_elementos';

        for (const key in elementos_catalogo) {
			const ctlg = elementos_catalogo[key];		// X cada elemento del dicc.	

            // ■ Opcional: Aquí pongo un Malecon... only players.
            if (ctlg.grupo !== 'player') continue; 

            // ■ Construir el contenedor del ítem
            const div_item = document.createElement('div');
			div_item.id = `${key}_menu`;	//mesa_menu, silla_menu
			div_item.title = `Arrastra hacia el Salón`;            
            div_item.className = 'menu_to_clone';             
            
			div_item.dataset.id_key = key;       
            div_item.dataset.grupo = ctlg.grupo;   
            div_item.dataset.rol = ctlg.rol;   
            
			// Asignar el contenido visual definido en el catálogo (el string SVG)
            if (ctlg.visual && ctlg.visual.content) {
                div_item.innerHTML = ctlg.visual.content;
            }
            div_item.setAttribute('draggable', 'true'); 			
			this.dragCallback(div_item);	// Listenners de drag de raton y point.

			// ■ Inyectar al Sidebar
            contenedor_elementos.appendChild(div_item);
        }
		this.$sidebar.appendChild(contenedor_elementos);

		this._asegurar_handle();
		document.body.appendChild(this.$sidebar);
	}

	/**
	 * ### Sincroniza el sidebar reutilizado con el estado y los elementos actuales.
	 * @link _crear_sidebar
	 */
	_sincronizar_sidebar_existente() {
		if (!this.$sidebar) return;
		this.$sidebar.dataset.sidePosition = this.posicion;
		this.$sidebar.dataset.sideState = this._estado;
		this.$sidebar.dataset.sideSizeMode = this.modo_tamano;
		this.$sidebar.dataset.sideDragging = 'false';
		this.$sidebar.dataset.sideLocked = this._bloqueo_movimiento ? 'true' : 'false';
		this._aplicar_offset();
		this._asegurar_handle();

		const items = this.$sidebar.querySelectorAll('[data-side-item]');
		items.forEach(item => this._activar_drag(item));
	}

	/**
	 * ### Asegura el indicador/handle (BOTONCITO DE ABAJO) de movimiento del sidebar.
	 * @link _crear_sidebar
	 */
	_asegurar_handle() {	
		if (!this.$sidebar) return;
		let handle = this.$sidebar.querySelector('[data-side-handle]');
		if (!handle) {
			handle = document.createElement('button');
			handle.type = 'button';
			handle.dataset.sideHandle = 'true';
			handle.setAttribute('aria-label', 'Mover sidebar');
			handle.title = 'Arrastra para mover el sidebar';
			handle.innerHTML = '<i class="bi bi-disc-fill"></i>';
			this.$sidebar.appendChild(handle);
		}
		this._drag_handle = handle;
	}

	/**
	 * ### Bloquea o desbloquea el movimiento del sidebar.
	 */
	set_bloqueo_movimiento(bloqueado = false) {
		this._bloqueo_movimiento = Boolean(bloqueado);
		if (!this.$sidebar) return;
		this.$sidebar.dataset.sideLocked = this._bloqueo_movimiento ? 'true' : 'false';
		if (this._bloqueo_movimiento) {
			this._resetear_drag();
			this.$sidebar.dataset.sideDragging = 'false';
		}
	}

	/**
	 * ### Configura el estado inicial del icono disparador.
	 * @link constructor
	 */
	_configurar_icono() {
		this.icono_disparador.setAttribute('aria-pressed', 'false');
		this.icono_disparador.dataset.sideActive = 'false';
	}

	/**
	 * ### Actualiza la posición del sidebar desde la UI de configuración.
	 * @param {'left'|'right'|'bottom'} nueva_posicion
	 */
	set_posicion(nueva_posicion = 'right') {
		const posiciones_validas = ['left', 'right', 'bottom'];
		if (!posiciones_validas.includes(nueva_posicion)) return;
		this.posicion = nueva_posicion;
		if (!this.$sidebar) return;
		this.$sidebar.dataset.sidePosition = this.posicion;
		this._offset = { x: 0, y: 0 };
		this._resetear_drag();
		this._aplicar_offset();
	}

	/**
	 * ### Conecta eventos de icono y drag para abrir/cerrar y mover el sidebar.
	 * {@link Side_Elementos}
	 */
	_vincular_eventos() {
		this.icono_disparador.addEventListener('pointerdown', () => {
			this._ultimo_pointerdown = Date.now();
			if (this._estado === 'open') {
				this.cerrar();
				return;
			}
			this.abrir();
		});

		this.icono_disparador.addEventListener('click', () => {
			if (Date.now() - this._ultimo_pointerdown < 400) {
				return;
			}
			if (this._estado === 'open') {
				this.cerrar();
				return;
			}
			this.abrir();
		});

		this._drag_handle?.addEventListener('pointerdown', (event) => this._on_pointer_down(event));
		window.addEventListener('pointermove', (event) => this._on_pointer_move(event));
		window.addEventListener('pointerup', () => this._on_pointer_up());
		window.addEventListener('pointercancel', () => this._on_pointer_up());
	}

	/**
	 * ### Activa drag/touch para clonar elementos desde el sidebar.
	 * @link _crear_sidebar
	 */
	_activar_drag(item) {
		if (!item) return;
		if (this.dragCallback) this.dragCallback(item);
	}

	/**
	 * ### Abre el sidebar y activa el estado visual del icono (verde inmediato).
	 * @link _vincular_eventos
	 */
	abrir() {
		this._estado = 'open';
		this.$sidebar.dataset.sideState = 'open';
		this.icono_disparador.dataset.sideActive = 'true';
		this.icono_disparador.setAttribute('aria-pressed', 'true');
	}

	/**
	 * ### Cierra el sidebar y desconecta la UI del icono.
	 * @link _vincular_eventos
	 */
	cerrar() {
		this._estado = 'closed';
		this.$sidebar.dataset.sideState = 'closed';
		this.icono_disparador.dataset.sideActive = 'false';
		this.icono_disparador.setAttribute('aria-pressed', 'false');
		this._resetear_drag();
	}

	/**
	 * ### Inicia el arrastre del sidebar guardando referencias y estado.
	 * @link _vincular_eventos
	 */
	_on_pointer_down(event) {
		if (this._estado !== 'open' || this._bloqueo_movimiento) return;
		if (event?.preventDefault) event.preventDefault();
		this.d_drag.activo = true;
		this.d_drag.inicio_x = event.clientX;
		this.d_drag.inicio_y = event.clientY;
		this.d_drag.rect_inicio = this.$sidebar?.getBoundingClientRect() ?? null;
		this.$sidebar.dataset.sideDragging = 'true';
		this.$sidebar.setPointerCapture(event.pointerId);
	}

	/**
	 * ### Mueve el sidebar mientras se arrastra (vertical en left/right, horizontal en bottom).
	 * @link _vincular_eventos
	 */
	_on_pointer_move(event) {
		if (!this.d_drag.activo) return;
		const delta_x = event.clientX - this.d_drag.inicio_x;
		const delta_y = event.clientY - this.d_drag.inicio_y;
		const { deltaX, deltaY } = this._limitar_delta(delta_x, delta_y);
		this.d_drag.delta_x = deltaX;
		this.d_drag.delta_y = deltaY;

		if (this.posicion === 'right') {
			const delta = Math.max(0, this.d_drag.delta_x);
			this.$sidebar.style.setProperty('--side-drag-x', `${delta}px`);
			this.$sidebar.style.setProperty('--side-drag-y', `${this.d_drag.delta_y}px`);
		}

		if (this.posicion === 'left') {
			const delta = Math.min(0, this.d_drag.delta_x);
			this.$sidebar.style.setProperty('--side-drag-x', `${delta}px`);
			this.$sidebar.style.setProperty('--side-drag-y', `${this.d_drag.delta_y}px`);
		}

		if (this.posicion === 'bottom') {
			const delta = Math.max(0, this.d_drag.delta_y);
			this.$sidebar.style.setProperty('--side-drag-y', `${delta}px`);
			this.$sidebar.style.setProperty('--side-drag-x', `${this.d_drag.delta_x}px`);
		}
	}

	/**
	 * ### Finaliza el arrastre y decide si se cierra o se guarda la nueva posición.
	 * @link _vincular_eventos
	 */
	_on_pointer_up() {
		if (!this.d_drag.activo) return;
		const rect = this.$sidebar?.getBoundingClientRect();
		const umbral_x = rect ? Math.max(24, rect.width * 0.2) : 40;
		const umbral_y = rect ? Math.max(24, rect.height * 0.2) : 40;
		const debe_cerrar =
			(this.posicion === 'right' && this.d_drag.delta_x > umbral_x) ||
			(this.posicion === 'left' && this.d_drag.delta_x < -umbral_x) ||
			(this.posicion === 'bottom' && this.d_drag.delta_y > umbral_y);

		this.d_drag.activo = false;
		this.$sidebar.dataset.sideDragging = 'false';

		if (debe_cerrar) {
			this.cerrar();
			return;
		}

		this._consolidar_offset();
		this._resetear_drag();
	}

	/**
	 * ### Guarda la nueva posición del sidebar manteniéndolo dentro de la pantalla.
	 * @link _on_pointer_up
	 */
	_consolidar_offset() {
		if (!this.$sidebar || !this.d_drag.rect_inicio) return;
		const margen = 12;
		const rect = this.d_drag.rect_inicio;

		if (this.posicion === 'bottom') {
			const min_delta = -(rect.left - margen);
			const max_delta = window.innerWidth - rect.right - margen;
			const delta = this._clamp(this.d_drag.delta_x, min_delta, max_delta);
			this._offset.x += delta;
		} else {
			const min_delta = -(rect.top - margen);
			const max_delta = window.innerHeight - rect.bottom - margen;
			const delta = this._clamp(this.d_drag.delta_y, min_delta, max_delta);
			this._offset.y += delta;
		}

		this._aplicar_offset();
	}

	/**
	 * ### Aplica el offset persistente al CSS del sidebar.
	 * @link _consolidar_offset
	 */
	_aplicar_offset() {
		if (!this.$sidebar) return;
		this.$sidebar.style.setProperty('--side-offset-x', `${this._offset.x}px`);
		this.$sidebar.style.setProperty('--side-offset-y', `${this._offset.y}px`);
	}

	/**
	 * ### Limita los deltas de arrastre para no sacar el sidebar de pantalla.
	 * @link _on_pointer_move
	 */
	_limitar_delta(delta_x, delta_y) {
		if (!this.d_drag.rect_inicio) return { deltaX: delta_x, deltaY: delta_y };
		const margen = 12;
		const rect = this.d_drag.rect_inicio;

		if (this.posicion === 'bottom') {
			const min_delta_x = -(rect.left - margen);
			const max_delta_x = window.innerWidth - rect.right - margen;
			return {
				deltaX: this._clamp(delta_x, min_delta_x, max_delta_x),
				deltaY: delta_y,
			};
		}

		const min_delta_y = -(rect.top - margen);
		const max_delta_y = window.innerHeight - rect.bottom - margen;
		return {
			deltaX: delta_x,
			deltaY: this._clamp(delta_y, min_delta_y, max_delta_y),
		};
	}

	/**
	 * ### Helper KISS para limitar valores numéricos.
	 * @link _limitar_delta
	 */
	_clamp(valor, min, max) {
		return Math.min(Math.max(valor, min), max);
	}

	/**
	 * ### Resetea el estado de drag visual al terminar la interacción.
	 * @link cerrar
	 */
	_resetear_drag() {
		this.d_drag.delta_x = 0;
		this.d_drag.delta_y = 0;
		this.d_drag.rect_inicio = null;
		if (!this.$sidebar) return;
		this.$sidebar.style.setProperty('--side-drag-x', '0px');
		this.$sidebar.style.setProperty('--side-drag-y', '0px');
	}
}
// La antigua clase Touch_aMe se integró en Tablero_Touch para simplificar la herencia.


const Herramientas = {
	/**
	 * ### Encuentra un nombre unico para uno que entra sujerido.
	 * @param {*} strAux 
	 * @returns 
	 */
	_get_secuencial_dom(strAux = IDLINK_XDEF) {
		//Validacion de los argumentos:.............>
		if (!strAux || typeof (strAux) != 'string') return false;
		//
		//Working Procedure:........................>
		for (let i = 0; ; i++)  
			if (!document.getElementById(strAux + '_' + i)) 
				return (strAux + '_' + i);
	},
	/** 🌈 🪑 
	 * ### Devuelve un color aleatorio de la lista de colores.
	 * @returns {string} Un color en formato RGB.
	 */
	randomColor() {
		const colores = [
		// ROSAS - Oscuros y contrastantes
		"rgba(180, 40, 100, 0.9)",    // Rosa oscuro intenso
		"rgba(160, 30, 90, 0.9)",     // Rosa vino profundo
		
		// VERDES - Oscuros y contrastantes
		"rgba(20, 100, 60, 0.9)",     // Verde bosque oscuro
		"rgba(10, 80, 50, 0.9)",      // Verde abeto profundo
		"rgba(0, 70, 40, 0.9)",       // Verde pino intenso
		
		// AZULES - Oscuros y contrastantes
		"rgba(20, 60, 120, 0.9)",     // Azul marino
		"rgba(10, 50, 100, 0.9)",     // Azul medianoche
		
		// NARANJAS - Oscuros y contrastantes
		"rgba(180, 80, 20, 0.9)",     // Naranja óxido
		"rgba(160, 70, 10, 0.9)",     // Naranja terracota
		
		// MARRONES - Oscuros y contrastantes
		"rgba(100, 60, 30, 0.9)",     // Marrón chocolate
		"rgba(80, 50, 25, 0.9)",      // Marrón café
		"rgba(60, 40, 20, 0.9)",      // Marrón ébano
		
		// MORADOS - Oscuros y contrastantes
		"rgba(80, 30, 100, 0.9)",     // Morado berenjena
		"rgba(70, 25, 90, 0.9)",      // Morado real
		
		// ROJOS - Oscuros y contrastantes
		"rgba(150, 30, 40, 0.9)",     // Rojo vino
		"rgba(130, 25, 35, 0.9)"      // Rojo granate
	];
		const index = Math.floor(Math.random() * (colores.length));
		return colores[index];
	},
	
	

}
// ■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Herramientas;
// }
// ■■■


// ███
// * C L A S E  Compatibilidad ....... No usada.      IA.
// ███

// ■■■
//  UTIL COMPATIBILIDAD (Feature Detection)  [KISS]
//  ###  Helpers para decidir por capacidades (W3C) en lugar de UA.
// ■■■
const Compatibilidad = {
	/**
     * ## Detecta si es móvil/tablet/Desktop basándose en el window.innerWidth 
     * ### Principio: El diseño responde al ancho, la interacción responde al touch.
	 * ```javascript
	 * 	retorna {tipo: 'MOVIL', es_tactil: true, ancho_ventana: 575}
	 * ```
     */
    _detectar_entorno() {
		const ancho = window.innerWidth;

		// Breakpoints Bootstrap reales
		let tipo = 'DESKTOP';
		if (ancho < 576) {
			tipo = 'MOVIL';
		} else if (ancho < 992) {
			tipo = 'TABLET';
		}

		// Touch = capacidad de interacción, no tipo de dispositivo
		const es_tactil = navigator.maxTouchPoints > 0;
		
		return {
			tipo,
			es_tactil,
			ancho_ventana: ancho
		};
	},
	
	/**
	 * ## Determinar DIMENSIONES INICIALES dependiendo del tipo/ancho de la pantalla. 
	 * ### Columnas ►  Movil = 8 | Tablet = 16 | Destktop = 24
	 */
	_get_dimension_inicial(tipo){
		const dimensiones_iniciales = {
			filas:12,
			columnas:8,
		}
		if (tipo == 'MOVIL') {
			dimensiones_iniciales.columnas = 8;
		} else if (tipo == 'TABLET') {
			dimensiones_iniciales.columnas = 16;
		} else if (tipo == 'DESKTOP'){
			dimensiones_iniciales.columnas = 24;

		}
		return dimensiones_iniciales;
	},
	/**
	 * ### Establece los valores min y max de filas y columnas dependiendo del tipo de dispositivo 
	 * ### El tipo de dispositivo es: DESKTOP, MOVIL, TABLET
	 * ### El tipo de dispositivo se calcula en {@link Compatibilidad _detectar_entorno}
	 */
	_get_limites_max_min(tipo){
		const limites = {
			columnas:{min:8, max:30},
			filas: 	 {min:8, max:100}
		}
		if (tipo == 'MOVIL') {
			limites.columnas.min = 8;
			limites.columnas.max = 8;
		} else if (tipo == 'TABLET') {
			limites.columnas.min = 8;
			limites.columnas.max = 30;
		} else if (tipo == 'DESKTOP'){
			limites.columnas.min = 8;
			limites.columnas.max = 30;
		}
		return limites;
	},

	
	/** @returns {boolean} true si el dispositivo tiene entrada táctil */
	soportaTouch() {
		return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
	},

	/** @returns {boolean} true si el navegador soporta la propiedad/valor CSS */
	soportaCSS(prop, valor = 'initial') {
		return (window.CSS && CSS.supports) ? CSS.supports(prop, valor) : false;
	},	
		
	/** @returns {object} info básica no sensible (idioma, plataforma, online) */
	infoBasica() {
		return { idioma: navigator.language, plataforma: navigator.platform, online: navigator.onLine };
	},


}
// ■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Compatibilidad;
// }
// ■■■
