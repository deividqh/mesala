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

// CONSTANTES GLOBALES PARA CREAR ELEMETOS EN EL HEADER.
const IDLINK_XDEF 	= 'Id_Link_Noname';		//EL ID PARA LOS LINK CREADOS...POR DEFECTO 	• • • • [Head_Drive][Work__ClassName]
const IDSCRIPT_XDEF = 'Id_Script_Noname';	//EL ID PARA LOS SCRIPT CREADOS...POR DEFECTO   • • • • [Head_Drive]

// CONSTATES DE TAG HEAD DE LINKS Y SCRIPTS
const CSS_TYPELINK 	= 'text/css';
const CSS_RELLINK 	= 'stylesheet';
const CSS_TYPESCRIPT = 'text/javascript';
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
    at(arg1, arg2 = null) {
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
			this.family = Herramientas.get_dom_secuency(Matriz_to_MyDiv.FAMILY_NONAME);			
		else		
			this.family = family;
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ id_div_contenedor 	
		if (id_div_contenedor == null || typeof (id_div_contenedor) != 'string' || id_div_contenedor.trim() == '') {			
			this.contenedor_div_x_div = document.createElement('div');
			this.contenedor_div_x_div.id = Herramientas.get_dom_secuency(Matriz_to_MyDiv.CONTENEDOR_NONAME);
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
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■
		// ■ TAG DE LAS BALDOSAS DEL SALON.
		// if (typeof (tag_baldosas) != 'string' || tag_baldosas.trim() === '')
		// 	this.tag_baldosas = '#Baldosa';
		// else
		// 	this.tag_baldosas = tag_baldosas;
		
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
		let indice_to_search = this._get_indice_byId(drop_scan_obj.id);
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
		myDiv_to_search.scan.n = (i_n === null || i_n ===false)  ? i_n : this.get_idcontenido(this.matriz_plana[i_n].elemento_div);	
		myDiv_to_search.scan.s = (i_s === null || i_s ===false)  ? i_s : this.get_idcontenido(this.matriz_plana[i_s].elemento_div);
		myDiv_to_search.scan.e = (i_e === null || i_e ===false)  ? i_e : this.get_idcontenido(this.matriz_plana[i_e].elemento_div);
		myDiv_to_search.scan.w = (i_w === null || i_w ===false)  ? i_w : this.get_idcontenido(this.matriz_plana[i_w].elemento_div);
		myDiv_to_search.scan.ne = (i_ne === null || i_ne ===false)  ? i_ne : this.get_idcontenido(this.matriz_plana[i_ne].elemento_div);
		myDiv_to_search.scan.nw = (i_nw === null || i_nw ===false)  ? i_nw : this.get_idcontenido(this.matriz_plana[i_nw].elemento_div);
		myDiv_to_search.scan.se = (i_se === null || i_se ===false)  ? i_se : this.get_idcontenido(this.matriz_plana[i_se].elemento_div);
		myDiv_to_search.scan.sw = (i_sw === null || i_sw ===false)  ? i_sw : this.get_idcontenido(this.matriz_plana[i_sw].elemento_div);

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
	 * @example: 1► _get_array_scan(my_div, 'mesa'); 2► _get_array_scan(map_data_mesa.get('my_div'), 'silla');
	*/
	_get_array_scan(my_div, base_name_clone = null) {    
		let array_retorno = []

		for (const valor of Object.values(my_div.scan)) {                
			if (!valor) continue;       // ■ Si el valor es false o null, NO lo añade al array
			if ( !base_name_clone ) {   // ■ Si base_name_clone es null, retorna todo el entorno, en  este caso  puede ser una 'mesa' o 'silla' o 'x' 
				array_retorno.push(valor); 
				continue;
			} 
			if (valor.lastIndexOf(base_name_clone) !== -1)   
				array_retorno.push(valor); 
		}
		return array_retorno;
	}

	/** 
	 * ### Devuelve las mesas conectadas directamente a la mesa dada.
	 * 				- LLAMADA DESDE buscar_elementos__conectados ► get_matriz__reservas
	 * @param {string} id_contenido - ID de la mesa
	 * @param {Array} lista_info - Lista de map_data_mesa ... Array de Map('id_contenido', 'indice_baldosa', 'my_div')
	 * @returns {Array} - Vecinos mesas conectadas ► ['Mesa_0', 'Mesa_3']
	*/
	_get_array_vecinos(id_contenido, map_data, data_tipo_scan='') {
		const map_data_mesa = map_data.find(m => m.get('id_contenido') === id_contenido);
		if (!map_data_mesa) return [];
		
		const array_scan = this._get_array_scan(map_data_mesa.get('my_div'), data_tipo_scan);                // Filtra solo mesas.
		
		return array_scan;
	}

	/**
	 * ### 
	 * @param obj_drop  Objeto onplay sobre el que se suelta un objeto.
	*/
	get_idcontenido(obj_drop){
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
		console.log(`\n■■■■■■■■■■■■■■■■■■■ BALDOSA► '${b_div.elemento_div.id}'    CONTENIDO► '${this.get_idcontenido(b_div.elemento_div)}'    CLASE► ${b_div.elemento_div.class_name} • • • SCAN:`);
		
		console.log(`${b_div.scan.nw}\t${b_div.scan.n}\t${b_div.scan.ne}`);
		console.log(`${b_div.scan.w}\t${this.get_idcontenido(b_div.elemento_div)}\t${b_div.scan.e}`);
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
			new_myDiv.elemento_div.id = Herramientas.get_dom_secuency(this.family);		// Le pongo un Id de la familia.

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
			new_div_clon.id = Herramientas.get_dom_secuency(this.family);					
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
		const myDiv_to_search = this.matriz_plana.find(my_div => this.get_idcontenido(my_div.elemento_div) === id_to_search);
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
		const indice = this._get_indice_byId(my_div.elemento_div.id);
		if ( indice >=0 )
			return indice;
		else 
			return false;
	}

	/** Introduce un id de un objeto MyDiv y devuelve el objeto MyDiv si lo encuentra en la matriz o null si no lo encuentr
	 * @param {String} id_to_search id del objeto MyDiv(baldosa) a buscar.
	 * @returns -1 si no encuentra y entero de la posicion del MyDiv de id_to_search si lo encuentra.
	 */
	_get_indice_byId(id_to_search){
		let indice_to_search = this.matriz_plana.findIndex(objeto => objeto.elemento_div.id === id_to_search);
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
	get_objdiv_from_mydiv(indice) {
		const my_div = this.at(indice);			// metodo de matriz_plana. asegura el indice correcto.
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
// 	class_name : {
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
	
	/** ## Cacha el data-tipo('mesa' o 'silla') del objeto que se mueve... {@link Tablero_Drop.dragStart} */
	data_tipo = '';				
	
	/**
	 * ### Tablero_Drop 
	 */
	constructor(family = '', id_div_contenedor = '', div_maestro = null, columnas = 8, filas = 8 ) {
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■■ LLAMADA AL PADRE /  CREA LA matriz_plana CON SUS ESTILOS.
		super(family, id_div_contenedor, div_maestro, columnas, filas);

		
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ■■ Gestor unificado de ratón y táctil
		this.toouch_me = new Touch_aMe(this);

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
		// ■■  ​👂​👂 LISTENERS EXIT : Papeleras.... preparado para que haya varias salidas(todos los data-tipo='exit') a todas les doto el mismo handler. 
		// • Si Hubiera solo un elemento de 'Exit'
		// const exit = document.querySelectorAll('[data-tipo="exit"]');
		const exit = Array.from(document.querySelectorAll("[data-tipo]")).filter(el => el.dataset.tipo === 'exit');
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
			items_html_to_matriz.forEach(el => this.toouch_me.add_listeners_touchraton(el));
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
	_es_mesa_silla(tipo = '') {
		const tipo_normalizado = `${tipo}`.toLowerCase();
		return tipo_normalizado === 'mesa' || tipo_normalizado === 'silla';
	}

	/**
	 * ### KISS: Bloquea o desbloquea el movimiento del sidebar.
	 */
	_set_bloqueo_sidebar(bloqueado = false) {
		if (!this.Side_Elementos?.set_bloqueo_movimiento) return;
		this.Side_Elementos.set_bloqueo_movimiento(bloqueado);
	}

	/**
	 * ### KISS: Inicia el bloqueo del sidebar durante un drag de mesa/silla.
	 */
	_iniciar_bloqueo_sidebar(objeto_drag = null) {
		if (!this._es_mesa_silla(this.data_tipo)) return;
		this._set_bloqueo_sidebar(true);
		if (objeto_drag) {
			objeto_drag.addEventListener('dragend', () => this._set_bloqueo_sidebar(false), { once: true });
		}
	}
	/**
	 * ### SE PRODUCE CUANDO EMPIEZA EL MOVIMIENTO DE UN OBJETO DRAG ( Movible )
	 *              • Se trata de guardar el objeto que se mueve mediante ev.dataTransfer.setData("text", id_objeto_drag) 
	 *              • Cuando este objeto_drag caiga en un objeto drop se tiene que recuperar con ev.dataTransfer.getData("text")
	 *              • "text" es cualquier cosa xEjemplo "id_objeto_mueve", y además se puede poner mas de uno.
	 * @see 
	 * @param {*} ev   evento de inicio de arrastre de un objeto.
	 * @returns 
	 */
	dragStart(ev) {
		const new_obj_drag = ev.target;                         // ■ cacha el objeto que se mueve(drag).  
		// const id = ev.currentTarget.id;
		
		// ■■ Guarda el objeto que se mueve en la clase.
                // this.objeto_drag = new_obj_drag;
                // ■■ Guarda el objeto que se mueve en la clase.
                this.toouch_me?.get_origen_drag(new_obj_drag);

		// ■■ Bloquea el movimiento del sidebar si movemos una mesa o silla.
		this._iniciar_bloqueo_sidebar(new_obj_drag);
		
		// ■■ ESTABLECE/GUARDA EL ID DEL OBJETO DRAG
		ev.dataTransfer.setData("text", new_obj_drag.id);      	// ■ dataTransfer guarda en la transacción d&d un dato tipo "text" con el id del drag.
		
		// ■■ GUARDA EL data-tipo (HTML)
		// this.data_tipo = new_obj_drag.getAttribute('data-tipo');  // Cacha el data-tipo del objeto que se mueve.				
		ev.dataTransfer.setData("tipo", this.data_tipo); 

		// ■■■■ LOG	🖥️															
		// console.log(`▶️ drag_start ■ id ► ${new_obj_drag.id}  , tipo: ${this.data_tipo} , clase: ${new_obj_drag.className}`);  		
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
			// • • • En DragStart tiene que haber un ev.dataTransfer.setData("text", id_drag) • • • "text" es cualquier cosa xEjemplo "prueba"
			const id_obj_drag = ev.dataTransfer.getData("text");       // Cacha el id del objeto que se mueve(silla o mesa), que se ha arrastrado desde el menu o desde el salon.
			const data_tipo   = ev.dataTransfer.getData("tipo");       // Cacha el id del objeto que se mueve(silla o mesa), que se ha arrastrado desde el menu o desde el salon.
			
			const objDrag = document.getElementById(id_obj_drag);   // ► CACHA el objDrag
			if (!objDrag ) { console.log( `❌ ERROR ► drop_over_matriz ■ id-drag: No hay objeto Drag`); return false; }
			
			// ■■■■■■■■■■■■■■■■■■■■■■■■ LOG 🖥️
			// console.log(`▶️  DROP-SALON ■  ${objDrag.id}  ${this.objeto_drag.id} ◄ SOBRE ►  ${objDrop.id}  , data-tipo(html): ${data_tipo}`);
	
			// ████████████████████████  
			// LOGICA DROP 
			// ■■ No permite ir a una CELDA OCUPADA.
			if (this.is_baldosa_vacia(objDrop) == false) {
				console.log(`⚠️ ${objDrop.id} está OCUPADA. `); 
				this._set_bloqueo_sidebar(false);
				return false; 
			}
			
			// ■■ Si el objeto que se mueve es del MENU, se clona en la matriz. Si no, es un movimiento Interno.
			if (objDrag.classList.contains("menu_to_clone")) {
				
				this.elemento_navbar_to_Salon(objDrag, objDrop, data_tipo);			
	
			}else if (objDrag.classList.contains("class_onplay")) {    // ► Esta clase sólo se asigna a los objetos en juego dinámicamente.
	
				this.movimiento_interno_Salon(objDrag, objDrop, data_tipo);
	
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
			this._set_bloqueo_sidebar(false);
		}
		
	}

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

	/**
	* ##  • Maneja el evento de soltar un objeto en el elemento-exit (papelera).
	*	• Quién llega a la  Papelera:
	*	...Se tienen que soltar las sillas o mesas colocadas en el 'Menu Nav-Bar'
	*	► ev.dataTransfer.getData("text") ,  Id del elemento drap(silla_menu, mesa_menu, o #SillaEnSalon, #MesaEnSalon ).
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
			id_obj_drag = ev.dataTransfer.getData("text");
		} else if (this.objeto_drag) {
			id_obj_drag = this.objeto_drag.id;
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
		this._set_bloqueo_sidebar(false);
		
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
	 * @param {string} data_tipo  'mesa', 'silla' . definidos en diccionario de configuracion dicc_config de Salon.js.
	 * @returns {object}  el elemento nuevo creado (la silla), que ha sido llevada del menu a la matriz_plana (El Salon)
	 */
	elemento_navbar_to_Salon(item_menu = null, baldosa_matriz = null,  data_tipo = '') {

		// ■■ Verificamos que la baldosa de destino esté vacía
		if (this.is_baldosa_vacia(baldosa_matriz) == false) return

		// ■■ Creamos un Clon del MENU. El id que se asigna es un secuencial del data-tipo(del <data_tipo>)
		const clon_item = item_menu.cloneNode(true);                  
		clon_item.id = Herramientas.get_dom_secuency(data_tipo);				
		clon_item.title = clon_item.id;
		clon_item.style.visibility = 'visible';
		
		// ■■ Hace DRAGGABLE el clon del item del menu 
		// clon_item.draggable = true;
    	// clon_item.addEventListener('dragstart', this.dragStart.bind(this));
		//  ​👂​👂  Hace el clon del item del menu DRAGGABLE para ratón y táctil
		this.toouch_me.add_listeners_touchraton(clon_item);
		
		// ■■ Añade el clon de la silla a la baldosa.
		baldosa_matriz.appendChild(clon_item);           
		
		// ■■ CAMBIA DE CLASE PARA NO HEREDAR EL ESTILO DEL MENU....
		clon_item.className = "";
		clon_item.classList.add('class_onplay');
		 
		// ■■■■■■■ LOG  🖥️
		// console.log(`▶️ ${clon_item.id} ► Padre: ${clon_item.parentNode.id} ■ clase: ${this.get_className(clon_item)} ■ data-tipo(html): ${data_tipo}\n`);
		
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
	movimiento_interno_Salon(obj_drag = null, obj_drop = null, data_tipo = '') {
		const baldosa_origen  = obj_drag.parentNode;
		const baldosa_destino = obj_drop;

		if (!baldosa_origen || !baldosa_destino) return false;
		
		baldosa_destino.appendChild(obj_drag);

		// console.log(`▶️ Movimiento Interno: ${obj_drag.id}  GO From ${baldosa_origen.id} To ${baldosa_destino.id} ► data-tipo(html): ${data_tipo}`);
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
	 * ### Saca por consola un informe de todos los MyDiv's onplay
	*/
	onplay_read(lista_mydivs_onplay){
		// console.log('\nON PLAY • • • READ: ');
		try {
			if (!lista_mydivs_onplay){
				lista_mydivs_onplay = this._get_mydivs_onplay();
				if (!lista_mydivs_onplay || lista_mydivs_onplay.length === 0) 
					return false;                        // Si no hay elementos, retorna false.
			}
			lista_mydivs_onplay.forEach((my_div, indice) =>{
				const id_contenido = this.get_idcontenido(my_div.elemento_div);
				console.log(`▶️ indice: ${indice} ■ID: ${my_div.elemento_div.id} ■CONTENIDO: ${id_contenido}      n•${my_div.scan.n} s•${my_div.scan.s} e•${my_div.scan.e} w•${my_div.scan.w} ne•${my_div.scan.ne} nw•${my_div.scan.nw} se•${my_div.scan.se} sw•${my_div.scan.sw} `);
			});			
		} catch (error) {
			 console.log('❌ Error onplay_read: ' + error);
			 return false;
		}
	}

	/** 
	 * ### Scanner n-s-e-w actualizado de los elementos onplay del Salon.
	*/
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
	 * ### Devuelve un array con los elementos que están en juego (onplay) en la matriz(salon, ajedrez, damas, ....)
	*/
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


// ████████████████████████████████████████████████████████████████████████████████████████████████████████████

/** 
 * ### SOBREESCRIBE Metodos Tablero_Drop y hace el comportamiento de Salon: 
 * ##### • Los elementos que pasan a jugar al Salon se selccionan de un Menu Externo al Salón
 * ##### • Los elementos de un salon son: sillas (o clientes) y mesas (o reservas)
 * ##### • RESERVAS son asociaciones de mesas y sillas. Se pueden juntar varias mesas para formar 1 reserva
 * 	
*/
class e_Salon extends Tablero_Drop {
	/** ### Imagen svg del elemento 'mesa'  ►  {@link Configuracion_Salon._asegurar_plantillas_menu}*/
	static MESA = `
		<div id="mesa_menu" class="menu_to_clone" data-tipo="mesa" draggable="true" title="Arrastra la Mesa hasta el Salón">
			<svg class="imagen_menu imagen_menu--mesa"
				fill="currentColor" viewBox="0 0 50 50" width="30" height="30"
				xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
				<path class="st0" d="M10.585938 11L0.38085938 21.205078 A 1.0001 1.0001 0 0 0 0.18945312 21.396484L0 21.585938L0 21.832031 A 1.0001 1.0001 0 0 0 0 22.158203L0 28L3 28L3 50L9 50L9 28L11 28L11 43L17 43L17 28L33 28L33 43L39 43L39 28L41 28L41 50L47 50L47 28L50 28L50 22.167969 A 1.0001 1.0001 0 0 0 50 21.841797L50 21.585938L49.806641 21.392578 A 1.0001 1.0001 0 0 0 49.623047 21.207031 A 1.0001 1.0001 0 0 0 49.617188 21.203125L39.414062 11L39 11L10.585938 11 z M 11.414062 13L38.585938 13L46.585938 21L3.4140625 21L11.414062 13 z M 2 23L48 23L48 26L46.167969 26 A 1.0001 1.0001 0 0 0 45.841797 26L42.154297 26 A 1.0001 1.0001 0 0 0 41.984375 25.986328 A 1.0001 1.0001 0 0 0 41.839844 26L38.167969 26 A 1.0001 1.0001 0 0 0 37.841797 26L34.154297 26 A 1.0001 1.0001 0 0 0 33.984375 25.986328 A 1.0001 1.0001 0 0 0 33.839844 26L16.167969 26 A 1.0001 1.0001 0 0 0 15.841797 26L12.154297 26 A 1.0001 1.0001 0 0 0 11.984375 25.986328 A 1.0001 1.0001 0 0 0 11.839844 26L8.1679688 26 A 1.0001 1.0001 0 0 0 7.8417969 26L4.1542969 26 A 1.0001 1.0001 0 0 0 3.984375 25.986328 A 1.0001 1.0001 0 0 0 3.8398438 26L2 26L2 23 z M 5 28L7 28L7 48L5 48L5 28 z M 13 28L15 28L15 41L13 41L13 28 z M 35 28L37 28L37 41L35 41L35 28 z M 43 28L45 28L45 48L43 48L43 28 z"/>
			</svg>
		</div>
	`;
	
	/** ### Imagen svg del elemento 'silla'  ►  {@link Configuracion_Salon._asegurar_plantillas_menu}*/
	static SILLA = `
		<div id="silla_menu" class="menu_to_clone" data-tipo="silla" draggable="true" title="Arrastra la silla hasta el Salón">
			<svg class="imagen_menu imagen_menu--silla st0"
				fill="currentColor" viewBox="0 0 512 512" width="30" height="30"
				xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">
				<g>
					<rect x="262.97" y="298.368" class="st0" width="33.329" height="155.344"/>
					<path class="st0" d="M243.216,23.156l-50.788,201.47h-42.233l-89.148,13.431v36.624l10.08,1.437h-10.08v177.595h33.329V279.441
						l55.819,7.952V512h41.146V287.392h158.98V512h41.137V259.523L450.953,0L243.216,23.156z M349.317,224.626H225.884l43.386-172.06
						l122.188-11.116L349.317,224.626z"/>
				</g>
			</svg>
		</div>
	`;
		
	/** ### Clase que Se encarga de la configuracion incial del Salon y metodos asociadas al Funcionamiento */
	CFG = null; 
	/** ### Clase que se encarga del Registro y Log.  */
	LoG = null;	
	/** ### Clase que Hace el CRUD sobre la Base de Datos. */
	crud = null; 
	/** ### Clase Se encarga de gestionar los mensajes de las sillas */
	MSG_S=null;
	/** ### Clase Se encarga de gestionar los mensajes de las mesas-reservas */
	MSG_M=null;
	/** ### Diccionario principal de configuración. Se valida en el constructor de e-Salon. Contiene los datos de la app. */
	dicc_config = null;	
	/** ### Array de diccionarios de reservas. LOGICA DEL NEGOCIO DE SALON ► reservas = [ {'mesas':[], 'sillas':[]} , {...} ] {@link _modulo_reservas}*/
	reservas = []; 	
	/** ### Modo Reserva ON/OFF. 
	 * #### Se activa cuando se hace click en una mesa {@link mesa_click_handler} 
	 * #### Se Desactiva cuando se hace doble click fuera de esa reserva {@link _desactivar_modo_reserva}. 	 */
	is_mode_reserva = null;        	
	/** ### Variable que me sirve para gestionar cuando ha habido un cambio de reserva: {@link mesa_click_handler} ■ {@link _desactivar_modo_reserva} */
	last_reserva_clicked = -1;	// el ultimo click sobre que reserva.... indice en reservas

	static MODELOS_SALON = ['limitado', 'scrolado', 'apilado'];
	/**
	 * ### Gestiona Reservas ,Mensajes y posiciones de un Tablero ó Salon.
	 * #### • Hereda de las clases Tablero_Drop y Div_x_Div q crean las Baldosas del Salon con Métodos DROP.
	 * ####	• App Cliente Servidor: clases Login | Configuracion | CRUD
	 * @param {object} dicc_config se encuentra en: {@link dicc_salon Salon.js} ► diccionario de configuración inicial que tiene que rellenar el usuario o dejar vacío {}.
	 * ```javascript
	 * let dicc_salon = {
	 *   family:'Gran_Salon',columnas:12,filas:12,div_maestro:null,contenedor:'',
     *	 tipos: {mesa: 'mesa',silla:'silla'},  
	 *   class_name:{contenedor: 'estiloSalon',baldosas:'estiloBaldosas'},
     *	 };
	 * ```
	 */
	constructor(dicc_config = {}, modelo_salon='limitado', estilo_UI='original'){

		// Mensaje de entrada a Borrar :
		// console.log(`${'■'.repeat(40)}\nDireccion Url del Front:  ${window.location}`);
		// console.log(`${'■'.repeat(40)}`);

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
		// LLAMADA AL PADRE Tablero_Drop
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		super(	dicc_config.family, dicc_config.contenedor, dicc_config.div_maestro, 
				columnas_aplicadas, dicc_config.filas );			
		
		// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ 
		// ■■  🚫 SEGUN SUS COLUMNAS: 'limitado' / 'scrolado' / 'apilado'
		// 	        • El modelo ya se ha hecho efectivo en 'super' con 'columnas_aplicadas'. 
		// 			• AHORA LO REGISTRO Y Según el tipo de modelo..... para la version2....ainsss
		if(e_Salon.MODELOS_SALON.includes(modelo_salon)){

		}
		this.modelo_salon = modelo_salon;
		if(this.modelo_salon === 'limitado'){}
		else if(this.modelo_salon === 'scrolado'){}
		else if(this.modelo_salon  === 'apilado'){}
		else{}
		
		// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ 
		// ■■ 🚫 DISEÑO UI 🖼️ : 'original' / 'clasico' / 'moderno'
		// UPDATE: hay que aplicar el estilo(en Configuracion_Salon) para poder tener distintos estilos de UI.... para la version2... ainsss
		this.estilo_UI = estilo_UI;

		// ┌•••••••••••••••••••••••••••••••••••
		// ┌•• ENTORNO - DIMENSIONES - LIMITES
		// ┌•••••••••••••••••••••••••••••••••••
		this.entorno = entorno;
		this.dimension = dimesion_inicial;
		this.limites = limites;
		
		// Botones de Accion: 
		this.bi_nav = { cu:'[data-action-nav="save"]', 
						rud:'[data-action-nav="load"]', 
						ver_info:'[data-action-nav="info"]', 
						api_reiniciar_salon:'[data-action-nav="re-init"]', 
						login:'[data-action-nav="conn"]', 
						config:'data-tipo-bs="offcanvas-configuracion"',
						elementos: '[data-action-nav="elementos"]',
					};

		this.objs = {
			configuracion: '[data-bs-toggle="offcanvas"]',
			log: '[data-action-nav="conn"]',
		};
		
		// ■■ Sidebar persistente de elementos (mesa/silla) conectado a este Salón
		const $icono_elementos = document.querySelector('[data-action-nav="elementos"]');
		this.Side_Elementos = new Side_Elementos(this, null, $icono_elementos);

		// ┌••••••••••••••••••••••••••••
		// ┌• CONFIGURACION DEL SALON: 
		// ┌••••••••••••••••••••••••••••
		this.CFG = new Configuracion_Salon(this, dicc_config, '[data-bs-toggle="offcanvas"]');
		
		// ■ ASEGURA QUE EL DICCIONARIO DE CONFIGURACION ESTA LIMPIO
		this.dicc_config = this.CFG.diccionario;		
		
		// ┌••••••••••••••••••••••••
		// ┌• LOGIN Y REGISTRO: 
		// ┌••••••••••••••••••••••••
		// 		• .botones_accion ► Busca elementos que tengan class="botones_accion".
		// 		• data-action-nav="conn" ► selecciona el data-action-nav = "conn" en el dom html.
		// 		• .botones_accion[data-action-nav="conn"] ► 1-Busca un elemento que tenga la clase botones_accion 2-Y que además tenga el atributo data-action-nav con el valor conn
        this.LoG = new Login_Modal('[data-action-nav="conn"]');
		
		// ┌••••••••••••••
		// ┌•• C.R.U.D. •• 
		// ┌••••••••••••••
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
		
		// ┌••••••••••••••••••••••••••••••••••••••••••••
		// ■■ BOOTSTRAP PopOver para MENSAJES DE SILLAS(single=true).
		// ┌••••••••••••••••••••••••••••••••••••••••••••
		this.MSG_S = new Motor_Mensajes( 'pastel', true);
		if (this.MSG_S) 
			console.log('✅ MOTOR MENSAJES DE SILLAS MSG_S • • • • • Loaded ✔️');
		else 
			console.log('❌ ERROR MOTOR MENSAJES DE SILLAS  :(');
		
		
		// ┌••••••••••••••••••••••••••••••••••••••••••••
		// ┌•• BOOTSTRAP PopOver para MENSAJES DE MESAS(single=false)[Reservas]
		// ┌••••••••••••••••••••••••••••••••••••••••••••
		this.MSG_M = new Motor_Mensajes('moderno'  , false, false);			
		if (this.MSG_M) 
			console.log('✅ MOTOR MENSAJES DE RESERVAS MSG_M  • • • Loaded ✔️');
		else 
			console.log('❌ ERROR MOTOR MENSAJES DE RESERVAS  :(');
		
		// ┌••••••••••••••••••••••••••••••••
		// ​👂​👂 'desactivar__modo_reserva'
		// ┌••••••••••••••••••••••••••••••••
		this.contenedor_div_x_div.addEventListener("dblclick", this._desactivar_modo_reserva.bind(this));
		
		// ┌•• Inicia el MODO RESERVA a false.
		this.is_mode_reserva = false;	

		// ■■■■■■■■■■■■■■■■■■■■■
		// ​🧩​🧩​  RANGOS 🧩​🧩​​
		// ■■■■■■■■■■■■■■■■■■■■■
		this.eRdS = new El_Rango_del_Salon(this); 	// Instanciamos el gestor de RANGOS y CELDAS de la matriz.		
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		console.log(`${'█'.repeat(30)}  • • •  FINALIZADA LA CARGA DE SALON  • • •`);
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

	// █████████████████████████████████████████████████████████████████████████████████████████████
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
		// this._modulo_reservas(diccionario_configuracion.tipos.mesa);	
		this.RegisteR();	
		
		// ■■ Elimino el mensaje del popover de clientes
		this.MSG_S.accion_borrar(this.objeto_drag.id);
		this.MSG_M.accion_borrar(this.objeto_drag.id);

		this.  _set_exit_toast_bs(this.objeto_drag.id);
		
	}
	
	/**
	 * ####  Maneja el evento click en una silla.
	*/
	silla_click_handler(ev) {
		ev.preventDefault();
		
		const id = ev.currentTarget.id;               
		
		// ■■ BUSCA EN EL ARRAY DE RESERVAS el indice de la silla
		const index_reserva = this.reservas.findIndex(dicc => {
			return dicc.sillas.includes(id);
		});
		// ► Si No está en ninguna reserva.	
		if (index_reserva == -1) return;        	
		
		// ► para accion__save()
		this.index_reserva = index_reserva;   

		const arr_mesas_reserva_flat = Object.values(this.reservas[index_reserva].mesas).flat();		

		// ■■ Muestro el popover, tenga o no tenga datos.
		this.MSG_S.api_mostrar(id ,  arr_mesas_reserva_flat);

		// ■■■■■■ LOG 🖥️
		// console.log(`Elemento ${id} clickada. Tipo: ${tipo} className: ${document.getElementById(id).className} `);
	}
	
	/**
	 * ####   Listener cuando se hace click sobre una mesa_onplay
	 *  *  Quiero Seleccionar todos los objetos de una **reserva** y ponerlos de color distinto.
	 *  *  Cuando se hace 2 veces click sobre una mesa, **muestra** un popOver bootstrap para escribir o hablar mensajes.
	 * ```javascript
	 * const mesas_onplay  = document.querySelectorAll(".mesa_onplay");
	 * const sillas_onplay = document.querySelectorAll(".silla_onplay");
	 * ```
	*/
	mesa_click_handler(ev) {
		
		ev.preventDefault();
		this._reset_color_reserva();		

		// ■■ Siempre hace click el elemento con el listener(div contenedor), no la imagen 
		const id_mesa = ev.currentTarget.id;                    
		
		// ■■ BUSCA EN EL ARRAY DE RESERVAS LA MESA CLICADA.
		const index_reserva = this.reservas.findIndex(dicc => {
			return dicc.mesas.includes(id_mesa);
		});
		// ► Si No está en ninguna reserva.	@
		if (index_reserva == -1) return;        	
		
		// ► para accion__save()
		this.index_reserva = index_reserva; 
		
		// ■■ LOG DE LA RESERVA CLICKADA. 🖥️
		// console.log(`mesa ${id_mesa} está en la reserva ${index_reserva} con mesas: ${reservas[index_reserva].mesas} y sillas: ${reservas[index_reserva].sillas}`);    
		
		// ■■ APLANA LA RESERVA(Junta Mesas y Sillas en un array) 
		const mesas_sillas_flat = Object.values(this.reservas[index_reserva]).flat();

		// ■■ TRANSFORMA LOS IDS DEL ARRAY mesas_sillas_flat EN OBJETOS 
		const obj_mesas_sillas = mesas_sillas_flat.map(id => document.getElementById(id));
		
		// ■■■■■■■■ 🌈 🪑 CAMBIO DEL COLOR DE LOS ELEMENTOS DE LA RESERVA. 
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		const color_random = Herramientas.randomColor();
		obj_mesas_sillas.forEach(el => {       
			const path = el.querySelector("svg path");
			if (path) {
				path.style.setProperty("fill", color_random, "important");
			}
			// en el svg, la pata de la silla no se pq va a su bola. De esta forma se arregla. es como un svg aparte
			const path_pata_silla = el.querySelector("svg .st0");
			if (path_pata_silla) {
				path_pata_silla.style.setProperty("fill", color_random, "important");
			}
		});		
		// ■■■■ LOG 🖥️
		// console.log('► MODO RESERVA .... ON')
		// console.log(`${id_mesa} clickada. ► data-tipo: ${this.data_tipo} ► className: ${document.getElementById(id_mesa).className}`);

		// ┌•••••••••••••••••••••••
		// ┌•• Cambio de reserva			...Lo Reinicio en this.desactivar__modo_reserva()
		// ┌•••••••••••••••••••••••
		if (index_reserva != this.last_reserva_clicked){
			// console.log(`cambio de reserva de ${this.last_reserva_clicked} a ${index_reserva}`)
			this.last_reserva_clicked = index_reserva;
			return;
		}

		// ■■ APLANA las mesas de la reserva de cuya mesa está nuestra reserva.
		const dicc_reserva = this.reservas[index_reserva];		
		const dicc_reserva_flat = Object.values(this.reservas[index_reserva]).flat();		
		const arr_mesas_reserva_flat = Object.values(this.reservas[index_reserva].mesas).flat();		

		let MM = this.MSG_M;
		MM.id = id_mesa;                					// mesa actual (clave para guardar)

		// ■■ Recupera el diccionario de popover. (Recuerda que Las mesas son las keys de la propiedad diccionario_datos del popover)
		const diccionario_mesas = MM.diccionario_datos;
		if (Object.keys(diccionario_mesas).length <= 0) console.warn('\t\tVACÍO ');
		// console.log(JSON.stringify(diccionario_mesas));
		
		// ■■ Si is_single=true, no se pinta el sumatorio.
		this.MSG_M.api_mostrar(id_mesa ,  arr_mesas_reserva_flat);

		// ■■ SE ACTIVA EL MODO RESERVA CUAANDO SE HACE CLICK SOBRE UNA MESA.
		this.is_mode_reserva = true;
	}
			
	/** ✒️✒️
	 * #### SOBRE-ESCRIBE ✒️ EL MÉTODO elemento_navbar_to_Salon DE DRAG_X_DROP 
	 * 	* Añade un CLASSNAME según el data-tipo(html) del elemento (silla o mesa)
	 * 	* Añade un Event Listener ​👂​👂 para el click en el nuevo elemento.
	 * ```javascript
	 * this.elemento_navbar_to_Salon(objDrag, objDrop, data_tipo);			
	 * ```
	 * @see {@link Tablero_Drop.drop_over_matriz}
	*/
	elemento_navbar_to_Salon(item_menu = null, baldosa_matriz = null, data_tipo = ''){
		const new_div_onplay = super.elemento_navbar_to_Salon(item_menu , baldosa_matriz , data_tipo);
		const dc = this.dicc_config;
		if (!dc) return;

		if (new_div_onplay){			
			if (data_tipo == dc.tipos.silla) {
				new_div_onplay.classList.add('silla_onplay');
				new_div_onplay.addEventListener('click', this.silla_click_handler.bind(this));   

			}else if (data_tipo == dc.tipos.mesa) {
				new_div_onplay.classList.add('mesa_onplay');
				new_div_onplay.addEventListener('click', this.mesa_click_handler.bind(this));   
			
			}else{		// Si no es una silla ni una mesa, no se puede mover				
				return false;
			}		
			return new_div_onplay;
		}
	}

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ RESERVAS • • • array_rsv_mesas
	// ██████████████████████████████████████████████████████████████████████████████████ 

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
	 * @param {String} data_tipo en Salon = o 'mesa' o 'silla'. definido en dicc_config
	 * @see {@link drop_over_matriz} - {@link drop_exit}
	*/
	_modulo_reservas(data_tipo = '', b_registro=true) {
		try {
			// ■■ array de objeto Set (id_contenido, my_div , indice_baldosa) de todos los data_tipo(data_config.tipo = mesa ) 
			//   ┌• Objeto datamap: {id_elemento(string), baldosa (myDiv) , indice(integer) }
			// 	 ┌• [ {'mesa_0', [Object myDiv], 12} , {'mesa_1', [Object myDiv], 3} , ... ]			
			const array_datamap = this._get_arraydatamap_by_datatipo(data_tipo);
			// if(!array_datamap) return false;
	
			// ■■ Logica del Negocio 🧠🧠:
			// ┌•••• Obtiene un array de ids de reservas a partir del basenamme: [ ["mesa_0" , "mesa_1"] , ["mesa_2"] ]
			const matriz_reservas = this._get_matriz_reservas(array_datamap, data_tipo);
			// if (!matriz_reservas) return false;
	
			// ■■ Obtiene el array de diccionarios de reservas!!
			const reservas = this._get_array_dicc_reservas(matriz_reservas, array_datamap);
			// this.reservas = this._get_array_dicc_reservas(matriz_reservas, array_datamap);
			if ( !reservas || reservas.length === 0 ) 
				return [];
			// return this.reservas;
			
			// ┌••• si no quiero registrar las reservas en this.reservas y quiero que me retorne el resultado para 
			// 		trabajarlo aparte ► b_registro = false. 
			// ┌••• es útil para pruebas unitarias y re-posicionamiento avanzado donde analizo el resultado y lo cambio si me conviene.
			if(b_registro){
				this.reservas = reservas;
			}
			return reservas;
			// ■■■■■■ Log de reservas ...................................BORRAR
			// this.reservas.forEach((dicc_reservas, i) => console.log(`■■■ Reserva ${i+1} • • •   ${dicc_reservas.mesas.join(', ')}    ■■■   ${dicc_reservas.sillas.join(', ')}`) );
		} catch (error) {
			console.log(`Error::: Modulo Reservas ::: ${error}`);
			return false;
		}
	}

	/** 
	 * ###  Obtiene un array de dicc DATA (id_contenido, objeto myDiv , indice_baldosa) de los contenidos que empiezan con un prefijo específico en el id.
	 * ####	Lo uso para tener información de un tipo de objeto('mesa') sobre el Salón. POR ID.
	 * @param {} data_tipo - El prefijo del id de los contenidos que se quieren buscar (ejemplo: 'mesa' o 'silla').
	 * ```javascript  
	 * const lista_mesas = this.get__array_datamap_bybasename('mesa');
	 * ```
	 * ### Retorna:  
	 * ```javascript
	 * [ { id_contenido: 'mesa_0', my_div: [Object myDiv], indice_baldosa: 12 }, 
	 * { id_contenido: 'mesa_1', my_div: [Object myDiv], indice_baldosa: 15 } , ... ]
	 * ```
	 * *  **false**, si hay algún error.
	 * @see {@link _modulo_reservas}
	*/
	_get_arraydatamap_by_datatipo(data_tipo){
		// ┌•• Obtiene la lista de baldosas que contienen hijos (mesas o sillas)
		const lista_baldosas_onplay = this._get_mydivs_onplay();
		if (!lista_baldosas_onplay || lista_baldosas_onplay.length === 0) return [];
		
		let array_to_return = [];
		
		// ┌•• Escanea las reservas actuales y actualiza su estado
		lista_baldosas_onplay.forEach(my_div => {
			const id_contenido = this.get_idcontenido(my_div.elemento_div);    		// my_div.elemento_div es el objDrop. id_contenido = 'mesa_3', 'silla_2'
			const id_baldosa = my_div.elemento_div.id;                               // id_baldosa es el id del div donde cae el objeto drag.
			
			if (!id_contenido || !id_baldosa)  {console.log('Error SCAN '); return [];}
			
			const indice_baldosa = this._get_indice_byId(id_baldosa);       // el indice en la matriz.
			if (indice_baldosa < 0) {console.log('Error SCAN a'); return [];}

			// ■■■■■■ Crea un objeto Map y le asigna los valores ( recuerda que luego se tienen que recuperar con .get() ). 
			if (id_contenido && id_contenido.startsWith(data_tipo)) {
				let ficha_data_tipo = new Map();
				ficha_data_tipo.set("id_contenido", id_contenido);         // 'Mesa_2'
				ficha_data_tipo.set("my_div", my_div);                     // Objeto my_div... contiene su escaneo n-s-e-w.
				ficha_data_tipo.set("indice_baldosa", indice_baldosa);     // 12, el indice en la matriz principal de drops de la app.
				
				array_to_return.push(ficha_data_tipo);                     // 
			}    
		});
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ FIN SCAN lista_baldosas_onplay.

		return array_to_return; // Retorna los indices de las mesas que empiezan con el data_tipo.
	}

	/** 🚫 
	 * ### ■■■■ RESERVAS ► Obtiene el array de dicc (mesas:[], sillas:[]) de objetos myDivs de las reservas en base a reservas.
	 * @example ► Log de reservas con objetos.
	 *      const arraydicc_mydivs_reservas  = _get_arraydicc_mydivs_reservas();
			arraydicc_mydivs_reservas.forEach(dicc_mydivs => {
				const arr_indice_mesas  = dicc_mydivs.mesas.map(m => this._get_indice_byId(m.elemento_div.id)).join(', ');
				const arr_indice_sillas = dicc_mydivs.sillas.map(s => this._get_indice_byId(s.elemento_div.id)).join(', ');
				console.log(` indices: Mesas:  ${arr_indice_mesas} | Sillas: ${arr_indice_sillas}`);
			});
	*/ 
	_get_arraydicc_mydivs_reservas() {
		if ( !this.reservas || this.reservas.length <= 0 ) 
			return false;

		const array_myDiv_reservas = [];
		this.reservas.forEach(dicc => {
			const array_myDiv_mesas  = dicc.mesas.map(m => this.get_myDiv_byContenido(m));
			const array_myDiv_sillas = dicc.sillas.map(s => this.get_myDiv_byContenido(s));
			array_myDiv_reservas.push({
				mesas: array_myDiv_mesas,
				sillas: array_myDiv_sillas
			});
			// console.log(`objetos Reserva • • • Mesas:  ${array_myDiv_mesas}    ··· Sillas:  ${array_myDiv_sillas}`);
		});
		return array_myDiv_reservas || [];
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
				const mesas_sillas_flat = Object.values(dicc).flat();    // Convierte los valores a un array plano. ('Mesa_0', 'Silla_1', 'Silla_2', 'Silla_3'....)
				array_retorno.push(mesas_sillas_flat);
			});        
		} catch (error) {
			return false;
		}

		// ■ Retorno:  
		return array_retorno || [];
	}
	/**
	 * ### Obtiene los ids de las sillas o mesas que están en juego (en la escena actual).
	 * @param {string} [tipo] 'todo' 'all' | 'mesa' | 'silla' ► definidos en this.dicc__config.tipos
	 * @return {array} 
	 * ```javascript
	 *  get_ids_onplay(this.dicc__config.tipos.silla) ► ['silla_0', 'silla_1', ... ]
	 *  get_ids_onplay(this.dicc__config.tipos.mesa)  ► ['mesa_0', 'mesa_1', ... ]	
	 * ```
	 */

	_get_mesas_sillas_onplay(tipo='todo'){		
		// if (!Object.values(this.dicc__config.tipos).includes(tipo)) {
		// 	return false;
		// }
		const dc = this.dicc_config;
		if(!dc) return;

		let arr_onplay_nodes = [];
		switch (tipo) {
        case dc.tipos.mesa:
			arr_onplay_nodes = Array.from(document.querySelectorAll('.mesa_onplay'));
			break;
		case dc.tipos.silla:
			arr_onplay_nodes = Array.from(document.querySelectorAll('.silla_onplay'));
			break;			
		case 'todo':
		case 'all':
			arr_onplay_nodes = Array.from(document.querySelectorAll('.mesa_onplay, .silla_onplay'));
			break;
		default:
			return false;
        }

		// const sillas_onplay_nodes = Array.from(document.querySelectorAll('.silla_onplay'));

		// Obtiene el id de la silla (prioriza el estándar: id y data-*)◘◘◘◘◘◘◘◘◘◘◘◘◘◘
		const getID = (el) => el.id || el.getAttribute('id') || 
								  (el.dataset ? el.dataset.id_contenido : null) ||
								   el.getAttribute('data-id_contenido') ||
								   el.getAttribute('id_contenido'); 			// fallback legacy si existiera

		const arr_id_elemento = arr_onplay_nodes.map(getID).filter(Boolean); // quitamos null
		return arr_id_elemento;
	}

	/** ■■■■■■■■■■■■■■■■■ MESAS
	 * ###     Obtiene un array de array de mesas que represetan reservas, a partir de una lista Total de mesas del Salon.
	 *                  Llamada desde modulo__reservas, función motor que gestiona las reservas.
	 * @param {Array}  lista_mapdata, array flat de ids de todas las Mesas del Salon.
	 * @returns {Array} array de array de reservas de mesas ► [ ['Mesa_1'] , ['Mesa_2'] , ['Mesa_0', 'Mesa_3'] ]
	*/ 
	_get_matriz_reservas(lista_mapdata, data_tipo_busca='') {
		// Empiezo con las mesas, que crean las reservas.
		const visitadas = new Set();
		let matriz_reservas = [];
		if (!lista_mapdata || lista_mapdata.length === 0) return [];

		lista_mapdata.forEach(info_mesa => {
			const id_mesa = info_mesa.get('id_contenido');
			
			if (!visitadas.has(id_mesa)) {
				// Encontramos un nuevo grupo (reserva)
				const array_reserva = this._buscar_elementos_conectados(id_mesa, lista_mapdata, visitadas, data_tipo_busca);
				matriz_reservas.push(array_reserva);
			}
		});
		// console.log('Numero de Reservas de mesa encontradas:', matriz_reservas.length);
		// console.log('Num Elementos + Reservas:', ...matriz_reservas);
		// console.log('');
		return matriz_reservas;
	}

	/**
	 * ### Busca todas las mesas conectadas usando DFS
	 * @see {@link _get_matriz_reservas}
	 * @param {string} mesa_inicio - ID de la mesa inicial ► 'Mesa_0'                              
	 * @param {Array} lista_mapdata - Lista de info_mesa (Map)
	 * ```javascript                             
	 * [{"id_contenido", "Mesa_0"}  , {"my_div", MyDiv} , {"indice_baldosa", 13} ,
	 * {"id_contenido", "Mesa_1"}  , {"my_div", MyDiv} , {"indice_baldosa", 43} ]
	 * ```
	 * @param {Set} visitadas - Conjunto Set de ids de mesas ya tratadas, ... para evitar repetir mesas
	 * @returns {Set} - Grupo de mesas conectadas (reserva)
	*/
	_buscar_elementos_conectados(mesa_inicio, lista_mapdata, visitadas, data_tipo_busca='') {
		const Pila = [mesa_inicio];         // ■ Pila  Lifo
		const set_retorno = new Set();      // ■ Conjunto para almacenar mesas conectadas
		
		while (Pila.length > 0) {
			const elemento_actual = Pila.pop(); // Sacamos la última mesa de la pila y se vacía en la primera vuelta.
			
			if (!visitadas.has(elemento_actual)) {  // Si la mesa sacada de la pila no ha sido visitada, la procesamos
				visitadas.add(elemento_actual);
				set_retorno.add(elemento_actual);
				
				// Buscamos mesas vecinas 
				const array_vecinos = this._get_array_vecinos(elemento_actual, lista_mapdata, data_tipo_busca);
				array_vecinos.forEach(vecino => {
					if (!visitadas.has(vecino)) {
						Pila.push(vecino);              // Llena la Pila.
					}
				});
			}
		}
		// Convertimos el conjunto a un array y lo retornamos
		return Array.from(set_retorno);
		// return [...set_retorno];
	}


	/** 
	 * ### Recibe array de reservas de mesas y crea un array de dicc{mesas:[], sillas:[]}
	 * #### Las sillas que no tienen mesa no se incluyen.
	 * #### @see {@link _modulo_reservas}
	 * @param {Array} matriz_reservas [ ['Mesa_1'] , ['Mesa_2'] , ['Mesa_0', 'Mesa_3'] ]
	 * @param {Array} lista_info_mesas  [ {id_contenido: 'Mesa_0', my_div: [Object myDiv], indice_baldosa: 12 }, 
	 * @returns {Array} [] Si error
	 * ```javascript
	 * [{mesas: ['Mesa_0', 'Mesa_3'], sillas: ['Silla_4', 'Silla_5, Silla_0'] }, 
	 * { mesas: ['Mesa_1']          , sillas: ['Silla_1', 'Silla_2, Silla_3'] }, 
	 * . . .
	 * {mesas: [], sillas: ['Silla_6', 'Silla_7'] } ]
	 * ```
	 */
	_get_array_dicc_reservas(matriz_reservas, lista_info_mesas) {
		// ┌•• Validacion		
		if (!matriz_reservas || matriz_reservas.length === 0) {
			return  this._get_sillas_ronin();
		};
		if (!lista_info_mesas || lista_info_mesas.length === 0) return [];
		
		let arraydicc_rsrvs = [];            // Array de diccionarios {mesas: [], sillas: []} RETORNO.
		let set_sillas_visited = new Set();      // Para evitar duplicados entre reservas.

		matriz_reservas.forEach((array_idMesas, i) => {
			let set_sub_sillas = new Set();      // Conjunto de sillas para esta reserva de mesas.

			// Recorremos todas las mesas de este grupo de reserva
			array_idMesas.forEach(id_mesa => {
				const info_mesa = lista_info_mesas.find(m => m.get('id_contenido') === id_mesa);
				if (info_mesa) {
					let array_scan = this._get_array_scan(info_mesa.get('my_div'), 'silla'); // Filtra solo sillas.
					if (array_scan) {
						array_scan.forEach(silla => {
							// Solo añadimos la silla si aún no estaba usada en otra reserva
							if (!set_sillas_visited.has(silla)) {
								set_sub_sillas.add(silla);
								set_sillas_visited.add(silla);
							}
						});
					}
				}
			});

			// ■■ Creamos el diccionario para este grupo
			let dicc_reservas = {
				mesas: array_idMesas,
				sillas: [...set_sub_sillas]  // convertimos Set → Array
			};

			arraydicc_rsrvs.push(dicc_reservas);
		});

		// ■■ Log de reservas
		// arraydicc_rsrvs.forEach(dicc => {
			//     console.log('dicc_reservas:', ...dicc.mesas, ...dicc.sillas);
			// });
			
		const sillas_ronin = this._get_sillas_ronin(set_sillas_visited);	
		if (sillas_ronin && sillas_ronin.length > 0) {
			arraydicc_rsrvs.push(...sillas_ronin);
		}


		// ■■■■■■■■■■■■ Sillas Ronin
		// const arr_id_sillas = this._get_mesas_sillas_onplay(this.dicc__config.tipos.silla);
		// const sillas_no_asignadas = arr_id_sillas.filter(silla_id => !set_sillas_visited.has(silla_id));

		// if (sillas_no_asignadas.length > 0) {
		// 	// console.log('Sillas no asignadas a ninguna reserva:', sillas_no_asignadas);
		// 	let dicc_reservas = {
		// 		mesas: [],
		// 		sillas: [...sillas_no_asignadas]  
		// 	};
		// 	arraydicc_rsrvs.push(dicc_reservas);
		// }

		return arraydicc_rsrvs;
	}

	/**
	 * 
	 * @param {*} set_sillas_visited Conjunto (Set) con un array de id's de sillas visitadas totales, no solo de la reserva.
	 * @returns {array} devuelve un array vacio( [] ) si no hay sillas sueltas o un array de id's de las sillas sueltas por el salon.
	 * 					1 Reserva con todas las sillas sueltas del salon.
	 */
	_get_sillas_ronin(set_sillas_visited=null){
		let sillas_ronin = [];
		// ■■■■■■■■■■■■ Sillas Ronin
		const arr_id_sillas = this._get_mesas_sillas_onplay(this.dicc_config.tipos.silla);
		const sillas_no_asignadas = arr_id_sillas.filter(silla_id => !set_sillas_visited?.has(silla_id));

		if (sillas_no_asignadas.length > 0) {
			// console.log('Sillas no asignadas a ninguna reserva:', sillas_no_asignadas);
			let ficha_reservas = {
				mesas: [],
				sillas: [...sillas_no_asignadas]  
			};
			sillas_ronin.push(ficha_reservas);

		}
		return sillas_ronin;
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
		const nodeList_onplay = document.querySelectorAll(".mesa_onplay , .silla_onplay");
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

	/**
	 * ## HACE UN SCANNER DEL SALON Y UN REGISTRO DE RESERVAS.
	 * @see {@link Foto_CRUD._load_mesas_sillas_en_Salon} - 
	 * {@link Configuracion_Salon.api_reiniciar_salon} - 
	 * {@link Configuracion_Salon.api_re_posicionar}
	 */
	RegisteR(){
		try {
			// REGISTRO LOS CAMBIOS EN EL SALON.
			this._onplay_scan_salon(); 		
			// LLAMO AL MODULO DE RESERVAS SOBRE LOS OBJETOS CUYO ID EMPIEZA POR 'mesa' 
			const reservas = this._modulo_reservas(this.dicc_config.tipos.mesa);
			return reservas;
		} catch (error) {
			console.log(`Error :::  e-Salon ::: Register ::: msg: ${error}`)
			return false;
		}

	}
	

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ ACCIONES SOBRE LOS ICONOS DEL NAV-BAR (MENU SUPERIOR)

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
		if(this.LoG) this.LoG.abrir_ventana('login');
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
		
	/**
	 * ### crea un ARRAY DE dicc con toda la info SOBRE las reservas.
	 *              Junta:
	 *                • this.reservas  (estructura de reservas: ids de mesas/sillas por reserva)
	 *                • this.MSG_M.diccionario_datos  (mensajes por mesa — clave = id_mesa_*)
	 *                • this.MSG_S.diccionario_datos  (mensajes por silla — clave = id_silla_*)
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
			const msg_sillas   = this.MSG_S?.diccionario_datos  ?? {};
			const msg_mesas  = this.MSG_M?.diccionario_datos  ?? {};
	
			// Normalizador
			const ficha = (d = {}) => ({
				usuario: typeof d.usuario === 'string' ? d.usuario : '',
				fecha:   typeof d.fecha   === 'string' ? d.fecha   : '',
				hora:    typeof d.hora    === 'string' ? d.hora    : '',
				mensaje: typeof d.mensaje === 'string' ? d.mensaje : '',

			});
	
			// Construcción: mesas/sillas como diccionarios
			const salida = reservas.map(dicc => {
				const mesas  = {};
				const sillas = {};
	
				for (const id of (Array.isArray(dicc.mesas) ? dicc.mesas : [])) {
					mesas[id] = ficha(msg_mesas[id]);
				}
				for (const id of (Array.isArray(dicc.sillas) ? dicc.sillas : [])) {
					sillas[id] = ficha(msg_sillas[id]);
				}
				return { mesas, sillas };
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
		const nodeList_onplay = document.querySelectorAll(".mesa_onplay , .silla_onplay");
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
	 *	dicc_popo_mesas = {
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
		const dicc_popo_mesas  = this.MSG_M.diccionario_datos;
		const dicc_popo_sillas = this.MSG_S.diccionario_datos;
		const dicc_popo = { ...dicc_popo_mesas, ...dicc_popo_sillas }; 
		const resultado = {};
		for (const id in dicc_popo) {
			const mensaje = dicc_popo[id]?.mensaje;
			if (mensaje) {
				resultado[id] = mensaje;
			}
		}
  		return resultado;
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
		const reservas_con_indices = dicc_api_reservas.map((grupo = {}) => ({
			mesas: agregarIndice(grupo.mesas),
			sillas: agregarIndice(grupo.sillas)
		}));		

		// ■■■■■■ CONFIGURACION
		
		// Limpia y estructura la configuración
		const dc = this.dicc_config || {};
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
			family: dc.family ?? '',
			columnas: dc.columnas ?? this.columnas ?? null,
			filas: dc.filas ?? this.filas ?? null,
			div_maestro: sanitizeDomRef(dc.div_maestro),
			contenedor: dc.contenedor ?? '',
			// tag_baldosas: dc.tag_baldosas ?? '',
			tipos: cloneSimple(dc.tipos) || {},
			class_name: cloneSimple(dc.class_name) || {},
			rutas: cloneSimple(dc.rutas) || {},
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
		const dicc_configuracion = this.dicc_config || {};
		const arr_reservas 		 = this.reservas || [];
		// const arr_reservas 		 = this._modulo_reservas() || this.reservas || [];

		const dicc_api_indices   = this.api_indices() || {};
		const dicc_api_mensajes  = this.api_mensajes() || {};
		const dicc_api_alergias  = this.MSG_S.api_alergias() || {};

		// ■■■■■■ RETORNO FINAL
		return {
			configuracion: dicc_configuracion,
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
		const dc = this.dicc_config;
		if(!dc) return;
		try {
			// ■■ Validación básica de diccionario.
			if (!dicc_api_indices || typeof dicc_api_indices !== 'object') {
				return false;
			}
			// console.log(`Total elementos a posicionar: ${Object.keys(dicc_api_indices).length}`);
			
			// ■■ Selecciona TODOS los elementos a clonar (elementos del menu)
			let items_menu = document.querySelectorAll('.menu_to_clone');
			if (items_menu.length === 0) {
				Configuracion_Salon._asegurar_plantillas_menu();
				items_menu = document.querySelectorAll('.menu_to_clone');
				if (items_menu.length === 0) {
					console.log('[_load_elementos_en_Salon] No hay plantillas .menu_to_clone en el DOM.');
					return false;
				}
			}

			// ■■ Valida el tipo contra dicc_config (soporta dos formas comunes)
			const es_tipo_valido = (tipo) => {
				if (!dc || typeof dc !== 'object') return false;
				const arr_values_tipos = Object.values(dc.tipos)
				return arr_values_tipos.includes(tipo);				
			};

			// ■■ Busca en el menú la plantilla cuyo data-tipo coincide con el pasado.
			const get_mesa_o_silla_by_datatipo = (tipo) => {
				for (const el of items_menu) {
					const t = (el.dataset && el.dataset.tipo) || el.getAttribute('data-tipo');
					if (t === tipo) return el;
				}
				return null;
			};
			// ■■ Dada una clave "mesa_0" o "silla_12", retorna el tipo.
			// 	  se compara contra los tipos presentes en el menú.
			const get_tipo_from_idkey = (key) => {
				for (const el of items_menu) {
					const t = (el.dataset && el.dataset.tipo) || el.getAttribute('data-tipo');
					// ┌• Si no tiene ni dataset ni dataset.tipo(data-tipo) continua 
					if (!t) 
						continue;
					
					// ┌• Si el key(el id del elemento) empieza por 
					if (key.startsWith(t + '_')) return t; // p.ej. "mesa_" o "silla_"
				}
				return null;
			};

			// Contenido del diccionario separando
			const key_value = Object.entries(dicc_api_indices);			
			key_value.forEach(([key, value]) => {

				let mesa_o_silla = null;
				const data_tipo = get_tipo_from_idkey(key);
				if ( es_tipo_valido(data_tipo) ) 
					mesa_o_silla = get_mesa_o_silla_by_datatipo(data_tipo);				

				// ◘
				const objDrop = this.get_objdiv_from_mydiv(value);
				

				// ■■ SIMILAR A this.elemento_navbar_to_Salon(mesa_o_silla, objDrop, data_tipo);pero con Id el que venga.
				// ■■ Verificamos que la baldosa de destino esté vacía
				if (this.is_baldosa_vacia(objDrop) == false) 
					return;

				// ■■ Creamos un Clon del MENU. El id que se asigna es un secuencial del data-tipo(del <data_tipo>)
				const clon_item = mesa_o_silla.cloneNode(true);                  
				clon_item.id = key;				
				clon_item.title = clon_item.id;
				
				//  ​👂​👂  Hace el clon del item del menu DRAGGABLE
				// clon_item.draggable = true;
				// clon_item.addEventListener('dragstart', this.dragStart.bind(this));
				this.toouch_me.add_listeners_touchraton(clon_item);

				
				// ■■ Añade el clon  a la baldosa.
				objDrop.appendChild(clon_item);           
				
				// ■■ CAMBIA DE CLASE PARA NO HEREDAR EL ESTILO DEL MENU....
				clon_item.className = "";
				clon_item.classList.add('class_onplay');
				
				// ​👂​👂 Listeners y clases según el tipo (silla o mesa)
				if (data_tipo == dc.tipos.silla) {
					clon_item.classList.add('silla_onplay');
					clon_item.addEventListener('click', this.silla_click_handler.bind(this));   

				}else if (data_tipo == dc.tipos.mesa) {
					clon_item.classList.add('mesa_onplay');
					clon_item.addEventListener('click', this.mesa_click_handler.bind(this));   
				
				}else{		// Si no es una silla ni una mesa, no se puede mover				
					return false;
				}
			});		
		} catch (error) {
			console.log('ERROR en Posicionar '+ error.message)
		}	
	}
	
	/**
	 * ### Carga los mensajes de las mesas y sillas 
	 * @param {object} dicc_api_mensajes 
	 * @see  {@link Foto_CRUD._load_mesas_sillas_en_Salon}
	 */
	_load_mensajes_en_Salon(dicc_api_mensajes){
		const nodeList_onplay = document.querySelectorAll(".mesa_onplay , .silla_onplay");
		if (nodeList_onplay.length === 0) return;
		// Lo convierto en array para recorrerlo
		const arr_elementos = Array.from(nodeList_onplay);

		Object.entries(dicc_api_mensajes).forEach(([id, mensaje]) => {
			const elemento = arr_elementos.find(el => el.id === id);
			if (elemento && elemento.id) {
				// SOLUCIÓN: Discriminación de destino basada en el ID del elemento
				// Normalizamos a minúsculas para evitar errores de typos (KISS)
				const id_destino = elemento.id.toString().toLowerCase();

				// Regla de Oro: Separación de Mensajes de Mesa y Silla
				if (id_destino.includes('mesa')) {
					// Es un mensaje para la Mesa
					this.MSG_M.update_mensaje(elemento.id, mensaje);
					
				} else if (id_destino.includes('silla') || id_destino.includes('cli')) {
					// Es un mensaje para la Silla/Cliente (MSG_S)
					// Nota: Aceptamos 'silla' o 'cli' para ser más robustos con la nomenclatura
					this.MSG_S.update_mensaje(elemento.id, mensaje);
					
				} else {
					// Opcional: Log para detectar IDs huérfanos o mal formados durante desarrollo
					console.warn(`[Salon] ID no reconocido al cargar mensaje: ${elemento.id}`);
				}
				// this.MSG_M.update_mensaje(elemento.id,  mensaje);
				// this.MSG_S.update_mensaje(elemento.id,  mensaje);
			}
		});
	}
	
	/**
	 * ### Carga los mensajes de las mesas y sillas 
	 * @param {object} dicc_api_mensajes 
	 * @see  {@link Foto_CRUD._load_mesas_sillas_en_Salon}
	 */
	_load_alergias_en_Salon(dicc_api_alergias){
		const nodeList_onplay = document.querySelectorAll(".silla_onplay");
		if (nodeList_onplay.length === 0) return;
		// Lo convierto en array para recorrerlo
		const arr_elementos = Array.from(nodeList_onplay);

		Object.entries(dicc_api_alergias).forEach(([id, alergia_s]) => {
			// ┌■ Cacha la silla
			const elemento = arr_elementos.find(el => el.id === id);			
			if(!elemento) return;

			this.MSG_S.update_alergia(elemento.id, alergia_s);
			this.MSG_S._actualizar_markador_elemento(elemento.id);
			// ┌■ Recorre el array de alergias.
			// alergia_s.forEach(alergia => {
			// 	// Normalizamos a minúsculas para evitar errores de typos
			// 	const id_destino = elemento.id.toString().toLowerCase();
			// 	if (id_destino.includes('silla') ) {
			// 		this.MSG_S.update_alergia(elemento.id, alergia);
					
			// 		// Pongo o quito la marca visual según mensaje/alergias
			// 		this.MSG_S._actualizar_markador_elemento(elemento.id);
					
			// 	}
			// });
			
		});
	}
	
	/**
	 * ## Elimina del DOM los elementos indicados en tipo (mesas, sillas o todo).
	 * @param {string} tipo  #### El tipo de elemento  a limpiar ('mesa', 'silla' o 'todo'). Por defecto 'todo'. 
	 * 	```javascript
	 * this.clean__elementos_Salon(this.dicc__config.tipos.mesa); ► "Elimina según el dicc_config."
	 * this.clean__elementos_Salon('silla'); ► "Elimina los tipo 'silla' directamente."					 
	 * this.clean__elementos_Salon(); ► "Elimnia todos los elementos."								
	 * ``` 	
	 */
	clean_elementos_Salon(tipo = 'todo') {
		// 1. Obtiene los IDs usando tu función existente que ya valida los tipos.
		const ids_to_remove = this._get_mesas_sillas_onplay(tipo);		
		if (!ids_to_remove || ids_to_remove.length === 0) return;

		// 2. Recorre los IDs, busca el elemento y lo elimina de su padre (la baldosa).
		ids_to_remove.forEach(id => {
			const elemento = document.getElementById(id);
			if (elemento && elemento.parentNode) {
				elemento.parentNode.removeChild(elemento);
			}
		});
	}

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

	  _set_exit_toast_bs(id_elemento) {
		// ┌• Cacho la Papelera
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
		const dc = this?.CFG?.configuracion;

		const tipos_validos = this?.CFG?.configuracion?.tipos;
		
		// ┌┌•  el diccionario tipos{} es {mesa:'mesa', silla:'silla'}		
		const tipo_players = Object.values(tipos_validos);

		if(!elemento) return;
		const id_elemento = elemento.id;
		if(!id_elemento) return;
		// ┌• Titulo
		elemento.title = elemento.id;
		// ┌• Dragable:
		elemento.draggable = true;
		
		// ┌•  ​👂​👂 
		elemento.removeEventListener('dragstart', this.dragStart);
		elemento.addEventListener('dragstart', this.dragStart.bind(this));

		this.toouch_me.add_listeners_touchraton(elemento);		
		
		// ┌• CAMBIA DE CLASE PARA NO HEREDAR EL ESTILO DEL MENU....
		elemento.className = "";
		elemento.classList.add('class_onplay');
		
		// ​👂​👂 Listeners y clases según el tipo (silla o mesa)
		const player = this._what_player_menu(id_elemento);
		if(!player) return;

		if (player.tipo == dc.tipos.silla) {
			elemento.classList.add('silla_onplay');
			elemento.removeEventListener('click', this.silla_click_handler);
			elemento.addEventListener('click', this.silla_click_handler.bind(this));   
		}else if (player.tipo == dc.tipos.mesa) {
			elemento.classList.add('mesa_onplay');
			elemento.removeEventListener('click', this.mesa_click_handler);
			elemento.addEventListener('click', this.mesa_click_handler.bind(this));   
		
		}else{		// Si no es una silla ni una mesa, no se puede mover				
			return;
		}
		return true;
	}

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/** ### Entra un id de mesa o silla pej: 'mesa_2' desde un rango y devuelve el elemento del menu equivalente (div mesa menu) 
	 * ```javascript
	 * const player_menu = this._what_player_menu(id_mesa_o_silla); 
	 * console.log(player_menu.name); 		► "silla"
	 * console.log(player_menu.element); 	► <div class="menu_to_clone" ... >
	 * ```
	*/
	_what_player_menu(id_mesa_o_silla){		
		
		// ┌■■ Selecciona TODOS los elementos a clonar (elementos del menu)
		const all_data_tipos = Array.from(document.querySelectorAll("[data-tipo]"));
		if(!all_data_tipos) return;
		const elementos_side = all_data_tipos.filter(el => el.dataset.sideItem);
		if(!elementos_side) return;
		const el_menu_s = elementos_side.filter(el => el.dataset.tipo != 'exit');
		if(!el_menu_s) return;
		
		// ┌■■ Definimos el tipo del id
		const data_tipo = e_Salon.__get_tipo_from_id(id_mesa_o_silla, el_menu_s);
		// ┌■■ Check que es un tipo introducido en el 'diccionario de configuracion'
		if ( e_Salon.__es_tipo_valido(data_tipo, this.dicc_config) ) {
			
			// ┌■■ Discrimina por tipo y devuelve el tipo del id introducido.
			const mesa_o_silla = e_Salon.__get_elemento_by_dataset(data_tipo, el_menu_s);				
			return mesa_o_silla ? {tipo:data_tipo, elemento: mesa_o_silla} : null;
		}else{
			return null;
		}	
	}		
	/** ## Busca en el menú la plantilla cuyo data-tipo coincide con el pasado.
	 * ### funcion subordinada exclusivamente de {@link _what_player_menu}	 */
	static __get_elemento_by_dataset(data_set, items_menu){
		for (const el of items_menu) {
			const t = (el.dataset && el.dataset.tipo) || el.getAttribute('data-tipo');
			if (t === data_set) return el;
		}
		return null;
	}	
	/** ## Valida el tipo contra dicc_config (soporta dos formas comunes)
	 * ### funcion subordinada exclusivamente de {@link _what_player_menu}	 */
	static __es_tipo_valido(tipo_a_validar , diccionario_setup){
		const d_setup = diccionario_setup;
		if (!d_setup || typeof d_setup !== 'object') return false;
		const arr_values_tipos = Object.values(d_setup.tipos)
		return arr_values_tipos.includes(tipo_a_validar);				
	}
	/** ## Dada una clave "mesa_0" o "silla_12", retorna el tipo. se compara contra los tipos presentes en el menú.
	 * ### funcion subordinada exclusivamente de {@link _what_player_menu}	 */
	static __get_tipo_from_id(id_elemento, items_menu){
		for (const el of items_menu) {
			const player = (el.dataset && el.dataset.tipo) || el.getAttribute('data-tipo');
			if (!player) continue;
			if (id_elemento.startsWith(player + '_')) return player; // p.ej. "mesa_" o "silla_"
		}
		return null;
	}



}    
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Salon;
// }
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

const Herramientas = {
	/**
	 * ### Encuentra un nombre unico para uno que entra sujerido.
	 * @param {*} strAux 
	 * @returns 
	 */
	get_dom_secuency(strAux = IDLINK_XDEF) {
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
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Herramientas;
// }
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


// ████████████████████████████████████████████████████████████████████████████████████████████████████████████
// * C L A S E  Compatibilidad ....... No usada.      IA.
// ████████████████████████████████████████████████████████████████████████████████████████████████████████████
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//  UTIL COMPATIBILIDAD (Feature Detection)  [KISS]
//  ###  Helpers para decidir por capacidades (W3C) en lugar de UA.
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
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
	 * ### Columnas ►  Movil = 8 | Tablet = 14 | Destktop = 20
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
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Compatibilidad;
// }
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


/** 
 * ### * 1.-maneja el offCanvas de configuracion del salon. 		
 * 				* 2.-Tambien se usa para quien soy y validar_dicc_config.    
 * 				* 3.-Actualiza el numero de Columnas de salon	(IMPORTANTE) 
 * 				* 4.-Ver la Información del Salon y dicc_config inicial
 * @see {@link _load_offcanvas_configuracion} - {@link api_update_columnas}
 */
class Configuracion_Salon {
	// ACTUALIZACIONES:🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏
	// set_altura_baldosas(){}
	// set_gap_baldosas(){}

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
		this.Salon = salon; 
		this.dicc_config_inicial = dicc_config;
		
		// ■■ Configuración validada y completada
		if(!dicc_config || typeof(dicc_config) != 'object') {
			console.error("❌ Configuracion__Salon: La configuración proporcionada no es válida.");
			return false;
		}
		// •••••••••••••••••••••••••••••••
		//  DICCIONARIO DE CONFIGURACION
		// •••••••••••••••••••••••••••••••
		this.configuracion = this.api_diccionario_configuracion(dicc_config);  

		// •••••••••••••••
		// ┌•• QUIEN SOY
		// •••••••••••••••
		/** ### Detección de Entorno ( Define la configuración ) */
		this.entorno = Compatibilidad._detectar_entorno();
		
		// ┌■ Determinar DIMENSIONES INICIALES dependiendo del tipo/ancho de la pantalla. 
		// ┌• dimesion_inicial = {filas, columnas} 
		this.dimension_inicial = Compatibilidad._get_dimension_inicial(this.entorno.tipo);
		
		// ┌■ Determinar LIMITES MAX MIN de columnas y filas dependiendo del tipo/ancho de la pantalla. 
		// ┌• limites = { columnas:{min:8, max:30}, filas: {min:8, max:100} }
		this.limites = Compatibilidad._get_limites_max_min(this.entorno.tipo);
		
		// •••••••••••••••••••••••••••••••••••••• 
		// OFFCANVAS DE CONFIGURACION DE LA APP
		// •••••••••••••••••••••••••••••••••••••• 
		
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
		this.$sidebar_posiciones = document.querySelectorAll('[data-config="sidebar-pos"] [data-side-position]');
		const data_principal = document.querySelector('[data-tipo-bs="offcanvas-configuracion"]');		
		// ┌•• Cargo los txt's del formulario
		this._load_offcanvas_configuracion(this.dimension, this.limites);		
		Configuracion_Salon._asegurar_plantillas_menu();

		// ••••••••••••••••••••••••••••••
		// ■■ NUMERO COLUMNAS	
		// ••••••••••••••••••••••••••••••
		// ┌•• Fundamental para terminar de configuarar la cuadratura del Salon.
		this.api_update_columnas('.' + this.configuracion.class_name.contenedor, this.Salon.columnas);
				
		// ••••••••••••••••••••••
		// ■■ Mensajes de la app	
		this.UI = new Alertas_UI();

		// •••••••••••••••••••••••••
		// ■■ GAP de re-posicionar.
		this.gap = 0;
		
		// •••••••••••••••••••••••••••••••••••••••••••
		// ■■ Proporciones cuadradas de las Baldosas.
		this.is_baldosa_cuadrada = true;

		
	}
	// async prueba_mensajes(){
		// const respuesta = await this.UI.ConfirM("Quieres Seguir?", "Elige entre estos dos", "warning");
		// if (respuesta)
		// 	this.UI._NotA("Texto del body", "Texto del head", "success");
	// }


	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ VALIDACION DICCIONARIO CONFIGURACION
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/** 
	 * ### Valida y Completa el diccionario de configuración con los valores por defecto.
	 * @param {Object} dicc_config  Diccionario de configuración proporcionado por el usuario.
	 * @returns {Object} Diccionario de configuración validado y completado.
	 */
	api_diccionario_configuracion(dicc_config){
		// ■■ Valores por defecto
		const dicc_default = {
			family: 'Salon',		// Nombre de la baldosa
			contenedor:  '',		// Nombre del div contendor salon
			div_maestro: '',		// donde ubicamos el contenedor salon
			filas: 8,		// Numero de filas del salon
			columnas: 8,		// numero de columnas de salon.
			estilo: 'original',	// id del offcanvas de configuración del salon.			
			// ■ Tipos de elementos que se pueden colocar en el salon.
			tipos: { silla: 'silla', mesa:  'mesa', },
			// ■ Nombres de las clases css que se van a asignar tanto al contendor como a cada baldosa.
			class_name: { contenedor: 'contenedor_salon' , baldosas: 'estiloBaldosas', },	
		};
		
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
			tipos: cloneSimple(dicc_config.tipos) || dicc_default.tipos,
			class_name: cloneSimple(dicc_config.class_name) || dicc_default.class_name,
		};

		return config_limpio;
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
				msgs.reservas = '• No hay RESERVAS en el salón\n';
			}else{
				msgs.reservas += `<h6>• TOTAL RESERVAS: ${matriz_reservas_flat.length}</h6>\n`;

				matriz_reservas_flat.forEach( (reserva, i) => {
					msgs.reservas += `Reserva ${i+1} : ${reserva.join(', ')}\n`;
				});       
			}
			
			// ■■■■■■■■■■■■■■■ MENSAJES
			const dicc_mensajes = this.Salon.api_mensajes();

			if ( !Object.keys(dicc_mensajes).length ){
				msgs.clientes = '• No hay Mensajes. \n';
			}else{
				msgs.clientes += `<h6>• TOTAL MENSAJES: ${Object.keys(dicc_mensajes).length}</h6>\n`;
				msgs.clientes += `${JSON.stringify(dicc_mensajes, null, 2)}`;
			}		

			// ■■■■■■■■■■■■■■■ ALERGIAS
			const dicc_alergias = this.Salon.MSG_S.api_alergias() || {};
			if (!Object.keys(dicc_alergias).length) {
				msgs.alergias = '• No hay Alergias. \n';
			} else {
				msgs.alergias += `<h6>• TOTAL ALERGIAS: ${Object.keys(dicc_alergias).length}</h6>\n`;
				msgs.alergias += `${JSON.stringify(dicc_alergias, null, 2)}`;
			}

			// ■ ■ ■ ■ ■ ■ ■ ■  LO JUNTAMOS TODO			
			const msg_data_salon = `\n${msgs.reservas} \n${msgs.clientes}\n\n${msgs.alergias}`;
			
			// ■ ■ ■ ■ ■ ■ ■ ■ MOSTRAMOS LOS DATOS DE LA APP EN UN OBJETO BOOTSTRAP 'MODAL'
			// this.ver_info_salon(msg_data_salon + '\n\n' + msg_json_config) ;
			this.__abrir_ventana_informacion(msg_data_salon + '\n\n' + msg_json_config) ;
			
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
	 * 1• const ok_updt = this.api_update_columnas('.' + this.configuracion.class_name.contenedor, 16);
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
	 * ## Reinicia el Salon:
	 * ### clean_elementos_Salon | Salon.reservas = [] | reset mensajes | registro_abierto_ | UI_ojo | RegisteR
	 * ### Llamada desde {@link e_Salon. accion_re_init_salon}
	 */
	api_reiniciar_salon(){
		// this.Salon.clean_elementos_Salon('todo');	// Limpio las mesas y sillas del dom del salon.
		// this.Salon.reservas = [];  					// limpio las reservas
		// this.Salon.MSG_S.reset_all_data();		// limpio los mensajes de los clientes.
		// this.Salon.MSG_M.reset_all_data();		// limpio las reservas del popover.
		this.limpiar_Salon();
		
		this.Salon.crud.foto_abierta = null;		
		this.Salon.crud._set_UI_ojo();

		this.Salon.RegisteR();
		console.log('Configuracion:: Salon Re-init con existo ✔️');
	}

	/**
	 * ### Reorganiza las reservas en el salón buscando la posición más óptima y compacta.
	 * ####	• Asegura que las reservas no se toquen entre sí usando scanner_nsew y validando 8 vecinos.
	 * ####	• No depende de api_indices sino que los elementos se reubican por las 'reservas'
	 * ### • reservas_impuestas = la ficha de {@link _procesar_geometria_relativa} + la reserva {@link e_Salon._modulo_reservas} que se quiere conseguir. 
	 * ### De Momento sin uso.  Quiero conseguir abrir en cualquier dispositivo. efecto Guau!!! 
	 * ### Pendiente de analisis final. pensando pasar ficha_impuesta por parametro para trampear api_re_posicionar_.
	 * 
	 * @param {Object} gap (Opcional) 
	 * 
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
			const fichas_x_reserva = this._procesar_geometria_relativa(reservas_raw);
			if (!fichas_x_reserva || fichas_x_reserva.length === 0) {
				// Si no hay fichas válidas después de la limpieza, no es un error, solo un aviso.
				console.log("⚠️ No se encontró geometría válida en el salón activo.");
				return null;
			}
			// ┌••••••••••••
			// ┌•• LIMPIEZA: Limpiamos la matriz y el DOM 
			Salon.clean_elementos_Salon('todo');
			// ┌••••••••••••
			/** ### (string) Marca el inicio del rango a buscar. Celda : 'A0', 'B2'... */
			let cursor = 'A0'; 
			// ┌••••••••••••••••••••••••••••••••••••••••••••••••
			// ┌•• MONTAJE (Fase CURSOR con BUCLE DE CONFLICTO)
			// ┌••••••••••••••••••••••••••••••••••••••••••••••••
			for (const ficha of fichas_x_reserva) {
				// ┌•• dimension de la ficha actual, . . .parametros de  _busca_dimension_free()
				const dim_ficha = `${ficha.num_rows}x${ficha.num_cols}`;
				// ┌•• Cacha los ids de 'cada' reserva
				const ids_reserva = ficha.items.map(item => item.id);

				// ┌•••••••••••••••••••••••••••••••• 
				// ┌•• Buscamos hueco físico libre 
				// ┌•••••••••••••••••••••••••••••••• 
				
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
							// throw new Error(`No cabe la reserva ${ficha.nombre_rango} (${dim_ficha})`);
						}
					}					
					// ┌•••••••••••••••••••••••••••••••• 
					// ┌•• Validacion de Vecinos / Politica del Posicionamiento.
					// ┌•••••••••••••••••••••••••••••••• 
					if (this._es_posicion_conflictiva(rango_free, ficha, ids_reserva)) { 
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
					// ┌•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• 
					const celda_base_destino = rango_free.celda_inicio;
					ficha.items.forEach(item => {
						const celda_destino = Ranget.suma_fc(celda_base_destino, item.delta_y, item.delta_x);
						
						if (celda_destino) {
							const indice_matriz = Ranget.X_to_indice(celda_destino);
							const baldosa = this.Salon.get_objdiv_from_mydiv(indice_matriz);
							
							if (baldosa) {
								// Re-insertamos el elemento DOM (que fue extraído en clean__elementos_Salon('todo'))
								baldosa.appendChild(item.elemento_dom);
							}
						} else {
							// Este throw es importante si falla la suma_fc (fuera de límites)
							throw new Error(`💥 Error al calcular destino para el elemento ${item.id} de la reserva ${ficha.nombre_rango}.`);
						}
					});
					
					// ┌••          ••••••••               ••••••           ••••••    
					// ┌•• Preparar -Cursor- para La Siguiente Reserva con  margin = 0 (byDef)
					// ┌•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• 
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
					// throw new Error(`💥 Máximo de ${MAX_INTENTOS} intentos alcanzado para la reserva ${ficha.nombre_rango}.`);
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
			const val_api_reservas_aft = Salon._modulo_reservas(this.configuracion.tipos.mesa, false);
			if(val_api_reservas_aft.length !== val_api_reservas_bef.length) {
				console.log(`⚠️​ Advertencia: El número de reservas antes (${val_api_reservas_bef.length}) y después (${val_api_reservas_aft.length}) de re-posicionar no coincide.`);
			}

			console.log("\n✔️ Re-Posicionamiento completado con éxito. ✔️");
			return true;
		} catch (error) {
			console.error("\n❌ Error en re__posicionar:", error);
			// Si hay un error, el salón queda en un estado inconsistente (limpio o a medio colocar)
			// La solución es limpiar y luego restaurar el último estado conocido.
			// this.Salon.clean_elementos_Salon('todo'); // Limpiamos cualquier desorden residual
			this.limpiar_Salon();
			return false;
		}
	}

	
	/**
	 * 🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱
	 * @param {object} dimension {filas:(integer) , columnas:(integer)}
	 */
	_is_dimension_ok(dimension=null, limites=null){
		if(!dimension) return;
		const filas = dimension.filas;
		const columnas = dimension.columnas;

		const max_f = this.limites.filas.max;
		const min_f = this.limites.filas.min;
		const max_c = this.limites.columnas.max;
		const min_c = this.limites.columnas.min;

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
			this.$filas.min = this.limites.filas.min;
			this.$filas.max = this.limites.filas.max;

			rescate.fils = this.$filas.value;
		}
		if (this.$columnas) {
			// this.$columnas.value = this.dimension_inicial.columnas;
			this.$columnas.value = this.Salon.columnas;
			this.$columnas.min = this.limites.columnas.min;
			this.$columnas.max = this.limites.columnas.max;

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
				const numero_elementos = this.Salon._get_mesas_sillas_onplay('all').length;				
				if(numero_elementos > 0) {
					// console.log(`⚠️​ NO SE PUEDE CAMBIAR LA DIMENSION DEL SALON CUANDO TIENE ELEMENTOS.... Numero de Elementos ${numero_elementos}`);
					// alert(`⚠️​ NO SE PUEDE CAMBIAR LA DIMENSION DEL SALON CUANDO TIENE ELEMENTOS\n.... Numero de Elementos ${numero_elementos}`);
					this.$columnas.value 	 = rescate.cols;
					this.$filas.value 	 	 = rescate.fils;
					this.$nombre_salon.value = rescate.name;
					this.UI._NotA("❌ Operacion Anulada", "No se Puede Cambiar la Dimension del Salón cuando Tiene elementos", "danger");
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
	 * ### Conecta la UI de posiciones del sidebar con el sidebar real.
	 * {@link _load_offcanvas_configuracion}
	 */
	_sincronizar_sidebar_UI() {
		const botones = Array.from(this.$sidebar_posiciones || []);
		if (botones.length === 0) return;

		const posicion_inicial = this.Salon?.Side_Elementos?.posicion ?? 'right';
		this.__marcar_boton_posicion_sidebar(posicion_inicial, botones);

		botones.forEach((boton) => {
			boton.addEventListener('click', () => {
				const nueva_posicion = boton.dataset.sidePosition;
				if (!nueva_posicion) return;
				this.Salon?.Side_Elementos?.set_posicion(nueva_posicion);
				this.__marcar_boton_posicion_sidebar(nueva_posicion, botones);

			});
		});
	}

	/**
	 * ### Refresca el estado visual de los botones de posición.
	 * {@link _sincronizar_sidebar_UI}
	 */
	__marcar_boton_posicion_sidebar(posicion, botones) {
		botones.forEach((boton) => {
			const es_activo = boton.dataset.sidePosition === posicion;
			boton.classList.toggle('active', es_activo);
			boton.setAttribute('aria-pressed', es_activo ? 'true' : 'false');
		});
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
		if( permite_vulnerar_limites ){
			// ■ PERMITE VULNERAR LOS LIMITES POR ARRIBA
			if (isNaN(filas) || 
				isNaN(columnas) || 
				filas < this.limites.filas.min || 
				columnas < this.limites.columnas.min ) {
					console.error(`Dimensiones inválidas o fuera de rango ${filas}x${columnas}`);
					return false;
			}
		}else{

		}
		try {
			// ■ AÑADE O QUITA BALDOSAS
			const ok_total = this.Salon.set_total_baldosas( filas * columnas );

			// ■ CAMBIA COLUMNAS             ... CAMBIANDO el GRID
			const ok_updt = this.api_update_columnas('.' + this.configuracion.class_name.contenedor, columnas);		

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
			// console.log('Finalizado proceso de Guardar OffCanvas.');	
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

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ VER INFO MODAL
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	
	
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

		const modal_id = Herramientas.get_dom_secuency('json_Modal');		
		
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

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	//  
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	

	/**	​👂​​👂​ -  ✒️✒️ SOLO SE EJECUTA CUANDO SE HACE SUBMIT SOBRE EL BOTON GUARDAR DE OFFCANVAS CONFIGURACION.
	 * ### _when_resize Sobre-Escribe ✒️ el método de Tablero_Drop.
	 * ###	Cuando redimensiona, si las columnas son mayores que su dimension_inicial, añade un scroll horizontal.
	 * {@link accion_submit_offcanvas_configuracion}
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


	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ ZONA DE REPOSICIONAMIENTO
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	
	/**
	 * ### Valida que un elemento de una reserva no toca a otra mesa de otra reserva(si puede tocar sillas.).
	 * (Valida los 8 puntos cardinales y diagonales: N, S, E, W, NE, NW, SE, SW).
	 * @param {Object} rango_free Rango propuesto
	 * @param {Object} ficha Datos de la reserva a colocar
	 * @param {Array<String>} ids_reserva Lista de IDs que pertenecen a esta reserva (no son conflicto)
	 * @returns {Boolean} true si hay conflicto con otra reserva, false si es seguro colocar.
	 * {@link api_re_posicionar}
	 */
	_es_posicion_conflictiva(rango_free, ficha, ids_reserva = []) {
		const celda_inicio_free = rango_free.celda_inicio;
		const tipo_mesa = this.configuracion.tipos.mesa || 'mesa';
		let soy_mesa = false;

		// Recorremos solo los elementos que vamos a colocar
		for (const item of ficha.items) {
				// Si el objeto de la reserva que quiero colocar es una mesa.....
				if (item.id.toLowerCase().startsWith(tipo_mesa)) 
					soy_mesa = true;
				else  soy_mesa = false;
				
				
				// 1. Calculamos dónde caería esta mesa
				const celda_destino = this.Salon.eRdS.suma_fc(celda_inicio_free, item.delta_y, item.delta_x);
				if (!celda_destino) return true; // Error o fuera de rango

				const indice_matriz = this.Salon.eRdS.X_to_indice(celda_destino);
				let baldosa_obj = this.Salon.matriz_plana[indice_matriz]; 
				if (!baldosa_obj) return true;

				// 2. USAMOS SCANNER_NSEW sobre esa baldosa para ver sus vecinos ACTUALES
				const scan_result = this.Salon.scanner_nsew(baldosa_obj.elemento_div); 

				// 3. Revisamos los 8 vecinos (N, S, E, W + Diagonales)
				let vecinos = [
					baldosa_obj.scan.n,  baldosa_obj.scan.s,  baldosa_obj.scan.e,  baldosa_obj.scan.w,
					baldosa_obj.scan.ne, baldosa_obj.scan.nw, baldosa_obj.scan.se, baldosa_obj.scan.sw
				];
				// ...y eliminamos null/false
				vecinos = vecinos.filter(x => x !== null && x !== false && x !== undefined && x.trim() !== '');	
				if(vecinos.length === 0) continue; // No hay vecinos, no hay conflicto
				
				
				// Recorremos los vecinos ya colocados antes de hacer scanner_nsew... si los tiene
				for (const vecino_id of vecinos) {					
					if (typeof(vecino_id) === 'string') {						
						// ► Si Soy mesa y además tengo vecinos, sea mesa o silla, HAY CONFLICTO ❌
						if(soy_mesa === true) return true;
						// ■ NO SOY MESA, SOY SILLA
						// ■ ¿EL VECION, Es una MESA?
						if (vecino_id.toLowerCase().startsWith(tipo_mesa)) {							
							// ¿Es de nuestra propia reserva ("familia")?
							if (ids_reserva.includes(vecino_id)) {
								// Mesa propia, NO hay CONFLICTO.
								continue; 
							} else {
								// ¡Es una Mesa de otra reserva! CONFLICTO.
								return true; 
							}
						}
					}
				}
			// }
		}
		
		// Ninguna de las mesas a colocar encontró conflicto
		return false;
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
			
			const mesas = Array.isArray(reserva?.mesas) ? reserva.mesas : [];
			const sillas = Array.isArray(reserva?.sillas) ? reserva.sillas : [];
			const ids_items = [...mesas, ...sillas].filter(Boolean);
			if (ids_items.length === 0) return [];

			// ┌••   •••••••••••••  •••••••••••••••••••
			// • • • Caso especial: reservas sin mesas. Las sillas se agrupan en línea
			// para compactar la geometría y facilitar el re_posicionamiento.
			if (mesas.length === 0 && sillas.length > 0) {
				const items_geometria = [];
				sillas.forEach((id, index) => {
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
		this.Salon.MSG_S?.reset_all_data();		// reset mensajes de sillas.
		this.Salon.MSG_M?.reset_all_data();		// reset mensajes de mesas.
		this.Salon.MSG_S._reset_alergias();		// reset diccionario de alergias(solo sillas-clientes).
		console.log("┌■■ Salon Limpio 🚿. Preparado para Cargar Foto . . . ✔️");		
	}

	/** ## Crea un div hidden y coloca la imagen de mesa y silla constantes de e-Salon */
	static _asegurar_plantillas_menu() {
		let contenedor = document.querySelector('.menu-templates');
		if (!contenedor) {
			contenedor = document.createElement('div');
			contenedor.className = 'menu-templates d-none';
			contenedor.setAttribute('aria-hidden', 'true');
		}

		if (!contenedor.parentElement) {
			document.body.appendChild(contenedor);
		}

		if (!contenedor.querySelector('#mesa_menu')) {
			contenedor.insertAdjacentHTML('beforeend', e_Salon.MESA);
		}

		if (!contenedor.querySelector('#silla_menu')) {
			contenedor.insertAdjacentHTML('beforeend', e_Salon.SILLA);
		}

		return contenedor;
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
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Compatibilidad;
// }
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■



class Alertas_UI {

    /**
     * Muestra un modal de confirmación y devuelve una promesa.
     * @param {string} texto - Mensaje de la pregunta.
     * @param {string} encabezado - Título del modal.
     * @param {string} tipo - Color del botón principal ('danger', 'success', 'warning').
     * @returns {Promise<boolean>} - True si confirma, False si cancela o cierra.
     */
    async ConfirM(encabezado, texto, tipo = 'danger') {
        const id_modal = `modal_${Date.now()}`;
        
        // Mapeo de colores para el botón de acción
        const clases_btn = {
            'success': 'btn-success',
            'danger':  'btn-danger',
            'warning': 'btn-warning text-dark'
        };
        const clase_accion = clases_btn[tipo] || clases_btn['danger'];

		const mensaje_Salida = `<br><br>¿Estás Seguro de que Quieres Cntinuar?`;

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
                            <button type="button" class="btn btn-secondary"   id="${id_modal}_cancelar" data-bs-dismiss="modal">Cancelar</button>
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
            
            // Caso 1: El usuario confirma
            btn_confirmar.addEventListener('click', () => {
                instancia_bs.hide();
                resolve(true);
            });

            // Caso 2: El usuario cierra el modal (por botón cancelar, X o clic fuera)
            elemento_modal.addEventListener('hidden.bs.toast', () => {
                resolve(false);
                elemento_modal.remove(); // Limpieza del DOM
            });

            // Comentario técnico: Bootstrap usa el evento 'hidden.bs.modal' para modales
            elemento_modal.addEventListener('hidden.bs.modal', () => {
                resolve(false);
                elemento_modal.remove();
            });
        });
    }

    // ... (Mantengo los métodos de Toasts anteriores si los necesitas)
	/**
     * Muestra una notificación tipo Toast.
     * @param {string} texto - Cuerpo del mensaje.
     * @param {string} encabezado - Título.
     * @param {string} tipo - Categoría: 'success', 'danger', 'warning'. Por defecto 'success'.
     */
    _NotA(encabezado, texto, tipo = 'success') {
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



// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ CLASE Login__Registro_Modal 
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ 
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
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Login_Modal;
// }
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ 
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ CLASE FOTO CRUD ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
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
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ C. R. U. D.
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

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
				this?.Salon?.LoG?._sincroniza_UI();
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
			
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ 
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
				this?.Salon?.LoG?._sincroniza_UI();
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
				this?.Salon?.LoG?._sincroniza_UI();
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

				// fuego:: 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
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

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■  ACCIONES, Clicks sobre botones en las ventanas 
	// 		Llamadas Listenners al CRUD.
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
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

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■ Plantillas Html BootStrap
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	/** 
	 *  🖼️ UI 🖼️ ■■■■■■■■■■■■■■■■■■■■ PLANTILLA HTML 
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
		// 🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞🍞
        // if (document.getElementById(this.modal_id)) return;
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

		// ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ 
		// • • • Después de esto, hemos creado varios registros y por cada registro, 
		// 4 iconos bi de accion (ver-info/update/delete/load), ahora hay darles accion(listenners)


		// Carga Listeners para cada elemento  '.js-load-salon' y '.js-delete-salon' 'js-update-salon' recien creados
		this._init_listeners_listado_fotos(contenedor);

		// UI 🖼️ 
		Foto_CRUD._crear_dinamic_bs_elements_RUD(contenedor);
	}

	
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Creo los objetos BootStrap, pero no los muestro.	
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		
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

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Inicializo_listeners.
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * 
	 * @returns 
	 */
	_inicia_listeners_CU(){
		const cu = this.CU;
		if (!cu.$formulario) return;
		if (!cu.$titulo) return;
		if (!cu.$slug_publico) return;

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// 👂​👂​ GUARDAR FOTO 🎞️ SUBMIT SOBRE EL FORMULARIO 
		cu.$submit.addEventListener('click', (event) => {
			event.preventDefault();			
			this._accion_create();
		});

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// 👂​👂​ Al cambiar el título dinamicamente se normaliza el slug.
		cu.$titulo.addEventListener('input', (event) => {
			// console.log(`🖊️ slug cambiado: ${event.target.value}`);
			const titulo_normalizado = Foto_CRUD._normalizar_slug_CU(event.target.value.trim());
			cu.$slug_publico.value = titulo_normalizado;
		});
		
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
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

		// 3. Cuando ya se ha ido: Borramos el rastro
		// $offcanvas.addEventListener('hidden.bs.offcanvas', () => {
			// console.log("• El menú se terminó de cerrar. Limpiando estados...");
			// console.log("📲 OffCanvas Cerrado • • • • ");

			// resetear_formulario_si_hace_falta
		// });
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


	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Abro Los objetos BootStrap.	
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ► IF objeto se crea con ■new■, se queda en memoria y se abre con show. 
	// 		• y puede duplicar ante multiples clicks, hay que controlarlo.
	// ► IF objeto se crea con ■getOrCreateInstance■, Es "a prueba de balas" frente a múltiples clics.(para MOVIL)
	
	/**
	 * ### Abre la ventana Modal bootstrap para Guardar o Actualizar Fotos.
	 * {@link accion_CU}
	 */
	_abrir_ventana_CU(){
		this._feedback_CU('👍 Preparado para Guardar la Foto!! ');
		const filas_Salon = this.Salon.CFG.configuracion.filas;
		const columnas_Salon = this.Salon.CFG.configuracion.columnas;

		
		// ┌•• Primero muestra la ventana, luego cargala de datos
		if (!this.bs_modal_CU || !window.bootstrap?.Offcanvas) return;
		this.bs_modal_CU.show();
		this.__actualizar_acordeon_CU();
		
		// ┌•• Authentication
		const datos_auth = Login_Modal.get_datos_auth();		
		if (!datos_auth?.is_authenticated || !datos_auth?.token) {
			this._feedback_CU('⚠️ Necesitas iniciar sesión para guardar la foto.', 'warning');
			this?.Salon?.LoG?._sincroniza_UI();
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
		const modal_id = Herramientas.get_dom_secuency('json_Modal');				
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
		const mensajes = this.Salon?.api_mensajes?.() || {};
		const alergias = this.Salon?.MSG_S.api_alergias() || {};
		
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
	
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■ ONLY .... CU
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

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
				UI._NotA("Sesion Expirada", "Por favor, vuelve a Iniciar Sesión.", "danger");
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
		
		const cfg = dicc_api_foto.configuracion || this.dicc_config || {};
		return {
			salon: {
				nombre: 		 this.Salon?.family,
				columnas: this.Salon?.columnas,
				filas: 	 this.Salon?.filas,
				family: cfg.family,
				configuracion_json: cfg,
				clases_json: cfg.class_name || {},
				rutas_json:  cfg.rutas || {},
				tipos_json:  cfg.tipos || {}
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
			// UI._NotA("Operacion Anulada", `${msg}<br><br>🟥 🟥 🟥 🟥 QUITO EL RETURN PARA PRUEBAS....VOLVER A PONER!!!!!`, "danger");
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
			// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			// ┌■ Cacho los datos que nos interesan para cargar las sillas y las mesas.
			const d_mensajes = FW.dicc_mensajes;
			const d_indices = FW.dicc_indices;
			const d_alergias = FW.dicc_alergias;
			// 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳
			// 🔳🔳🔳🔳🔳🔳 CARGA Antigua de  SALON 🔳🔳🔳🔳🔳🔳
			// ┌• CARGA LOS MENSAJES
			// Salon._load_mensajes_en_Salon(d_mensajes);
			this._load_mesas_sillas_en_Salon(d_indices, d_mensajes);						
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

	/** ### Lleva la lógica detrás de abrir una foto del Salón:
	 * ### • Comprueba dimensiones.
	 * ### • Si hay cambiio de dimensiones gestiona las opciones	 */
	async __el_portero_de_carga(modelo_salon, filas_salon, columnas_salon, filas_bdd, columnas_bdd){

		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ opcion 1
		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		const puedo_pasar = this._logica_match_dimensiones(photo);				
		let fila = '';
		let columna = '';
		if (puedo_pasar === false){
			// ┌• de Mayor Dimension en BD a Menor Dimension en Salon.
			
			// UI._NotA("Operacion Anulada", `${msg}<br><br>🟥 🟥 🟥 🟥 QUITO EL RETURN PARA PRUEBAS....VOLVER A PONER!!!!!`, "danger");
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
		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ opcion 2
		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		
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

		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Acciones Finales
		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

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
	_load_mesas_sillas_en_Salon(dicc_indices, dicc_mensajes = {}, dicc_alergias = {}){ 
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
	
	
	
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ // Helpper's
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

	/** 🖼️ UI 🖼️
	 * ### Cambia el icono de ver-info. Toma los datos de this.registro_abierto_.
	 */
	_set_UI_camara(registro_info =  null) {
		const icono = e_Salon._to_element(this.Salon?.bi_nav?.cu) || null;
		if (!icono) return;

		const FA = registro_info;
		if (FA) {
			// const titulo = Foto_CRUD._escapar_html_RUD(FA.titulo || '😎');
			// const slug_publico = Foto_CRUD._escapar_html_RUD(FA.slug_publico || '😎');
			// const mensaje_publico = Foto_CRUD._escapar_html_RUD(FA.mensaje_publico || '😎');
			// const captured_at = FA.captured_at  ? new Date(FA.captured_at).toLocaleString('es-ES') : '😎';
			// const es_publica   = Boolean(FA.es_publica)   ? '🟢' : '🔴';
			// const es_plantilla = Boolean(FA.es_plantilla) ? '🟢' : '🔴' ;

			// const tooltip_text = [
			// 	`📜 <b>Titulo:</b> ${titulo}`,
			// 	`&emsp;┌• slug: ${slug_publico}`,
			// 	`📩 <b>mensaje:</b> ${mensaje_publico}`,
			// 	`🕒 <b>captured_at:</b> ${captured_at}`,
			// 	`🍞 <b>es_plantilla:</b> ${es_plantilla}`,
			// 	`🌍 <b>es_publica:</b> ${es_publica}`,
			// ].join('<br>');

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
				this.Salon.CFG.UI._NotA("Sesion Expirada", "Por favor, vuelve a Iniciar Sesión.", "danger");
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

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■ GETTER'S AND SETTER'S
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	get registro(){
		return this.foto_work || null;
	}

}
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Exportar si usas módulos, si no, simplemente queda definida globalmente
// if (typeof module !== 'undefined' && module.exports) {
	//     module.exports = Save_Photo;
// }
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ 
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ Ini  CLASE 	PopOverElemen_t ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
// Clase para gestionar un PopOver de Bootstrap 5.3+
// Solo se crea un PopOver y se va reutilizando para todas las sillas.
// Se crea un PopOver "vacío" y oculto, enganchado a un div dummy.
// Luego se va reenganchando a la silla que lo solicita.

// Propiedades importantes de this.bs_popover:
// 		tip: El elemento DOM del popover (equivalente a lo que era getTipElement())
// 		_element: El elemento al que está attached el popover
// 		_popper: La instancia de Popper para positioning

// Métodos importantes:
// 		show(), hide(), toggle() , update(), dispose()
class Motor_Mensajes {
	/** ## id del Elemento sobre el que se muestra el popOver 'silla_1' , 'mesa_0'  */
	id_elemento = ''; 	
	
	grabando = false;
	bs_popover = null;	// Objeto Bootstrap PopOver
	el = null;		// elemento.
	btnVoiceControl = null;	// Botón que inicia/detiene la grabación de voz
	
	speechRecognition = null;
	speechUnsupportedWarned = false;

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ## Es el objeto que tiene que ser devuelto a la app que gestiona esta clase.
	 *  ```javascript
	 * {'silla_3': {usuario: 'usu', fecha: '25/8/2025', hora: '21:27:41', mensaje: 'una de gambas'},
	 * 'silla_4': {usuario: 'usu', fecha: '25/8/2025', hora: '21:43:02', mensaje: 'gluten'},
	 * 'silla_7': {usuario: 'usu', fecha: '25/8/2025', hora: '21:47:22', mensaje: 'marisco'} }
	 *  ```	 */
	diccionario_datos = {};		

	/** ## control del popOver. Se usa para saber si es el primer click sobre una MESA. */
	b_primera_vez = false; 		

	/** ## Tipo de popover. Determinado en la construccion de la clase.
	 * ### is_single = true  , tipo de popover con header y caja_texto de mensaje.
	 * ### is_single = false , tipo de popover compuesto, con header, sumatorio_de_mensajes x reserva  y caja_texto de mensaje.	 */
	is_single = true;			
	
	/** ## Ids de la reserva actualmente abierta (solo aplica a mesas/is_single=false). */
	ids_reserva_actual = [];
		
	/** ### Temas permitidos css */
	// theme = '';
	THEMAS_PERMITIDOS = ['dark', 'pastel', 'corporate', 'elegant', 'alternant', 'moderno'];
	
	/** ### datos vacíos para crear nuevas fichas. STATIC PARAM  */
	static _FICHA_VACIA = { fecha:'', hora:'', usuario:'', mensaje:'' };

	motor_alergias = null; // Instancia de Motor_Alergias, si with_alergenos es true
	d_alergias = {}			// fuente de la verdad de alergias por elemento.

	
	/**
	 * ##	Crea el objeto POPOVER y le asigna un escuchador de click. 
	 * ### • theme = ['dark', 'pastel', 'corporate', 'elegant', 'alternant', 'moderno']
	 * ### • is_single(boolean) = true ► single. puede llevar alergenos.
	 * ### • with_alergenos(boolean)
	 * ```javascript
	 * _Motor_Mensajes = new _Motor_Mensajes('pastel', true, true); // Popover tipo "single" con tema pastel y sección de alérgenos.	
	 * _Motor_Mensajes = new _Motor_Mensajes('dark', false, false); // Popover tipo "multiple" con tema dark y sin sección de alérgenos.
	 * _Motor_Mensajes = new _Motor_Mensajes(); // Popover tipo "single" con tema 'pastel' y CON sección de alérgenos.
	 * ```	 */
	constructor(theme = 'pastel' , is_single=true, with_alergenos = true) {
		
		// Asegura las variables:
		if( typeof(theme) !='string' || !this.THEMAS_PERMITIDOS.includes(theme) ) { 
			this.theme = 'pastel'; 
		}else{
			this.theme = theme;
		}		
		// ┌■ Mensajes Simple o Compuesto. . . single tiene alergias. Multiple acumula mensajes.
		this.is_single = (typeof is_single == 'boolean') ? is_single	: true;		
		// ┌■ Mensajes Simple o Compuesto. . . single tiene alergias. Multiple acumula mensajes.
		this.with_alergenos = (typeof with_alergenos == 'boolean') ? with_alergenos	: true;
		
		// ■■ ALERGIAS ■■ 💊
		if(this.is_single === true && with_alergenos === true){
			this.motor_alergias = new Motor_Alergias();
		}
		
		// ■■ Elementos del popover ■■
		const $sumatorio = '<div id="sumatorio_mensajes_pop" role="note" aria-live="polite"></div>';
		const $alergias = '<div id="labels_alergias_pop" class="labels-alergias-pop" aria-live="polite"></div>';
		const $mensaje 	= '<textarea id="textarea_popov" class="form-control mb-2" rows="2" placeholder="Escribe aquí..."></textarea>';
		const $botones 	= `
				<div class="d-flex gap-2">
					<button type="button" class="btn btn-sm btn-grabar"  data-action="grabar"   title="Grabación de Voz">🎤</button>
					<button type="button" class="btn btn-sm btn-guardar" data-action="guardar"  title="Guardar y Salir">💾</button>
					<button type="button" class="btn btn-sm btn-guardar" data-action="reset"    title="Limpiar Texto">🔁</button>
					<button type="button" class="btn btn-sm btn-delete"  data-action="eliminar" title="Eliminar Mensaje y Salir">🗑</button>
				</div>`;

		// ■■ Contenido del popover, según el tipo (single o multiple)
		let content_popover = '';
		if(this.is_single === true){
			content_popover = `
				<div class="contenedor_popover">
					${ $alergias }
					<!-- ▲ MENSAJE de la MESA ACTUAL (editor). Mantenemos el id para no romper tus handlers -->				
					${ $mensaje }
					<!-- ▲ Toolbar de botones:  -->
					${ $botones }
				</div>
				`;
		}else{
			content_popover = `
				<div class="contenedor_popover">				
					<!-- ▲ Sumatorio de MENSAJES de MESAS IMPLICADAS (solo lectura) -->
					${ $sumatorio }
					${ $alergias }
					<!-- ▲ MENSAJE de la MESA ACTUAL (editor). Mantenemos el id para no romper tus handlers -->				
					${ $mensaje }					
					<!-- ▲ Toolbar de botones:  -->
					${ $botones }
				</div>
			`;
		}

		// ■■ Crear popover "vacío", enganchado a un div oculto
		const dummy = document.createElement("div");
		document.body.appendChild(dummy);

		this.bs_popover = new bootstrap.Popover(dummy, {
			container: 'body',
			trigger: 'manual',
			sanitize: false,
			html: true,
			placement: 'right',
			// ⬇️ 1) Fuerza estructura con header y body
			template: `
				<div class="popover" role="tooltip"  data-theme="${this.theme}">
					<div class="popover-arrow"></div>
					<h3  class="popover-header"></h3>
					<div class="popover-body"></div>
				</div>`,
			title: " ",						// ⬇️ 2) Título vacío ' ' (se pondrá dinámicamente). Si '' no aparece header.
			content: content_popover
			});		

		// ◘I.A. Blindaje por si Bootstrap reinyecta 🧠 I.A.:
  		queueMicrotask(() => this.bs_popover?.tip?.setAttribute('data-theme', this.theme));

		// ■■ 🧠 Inicializamos el resto de las variables de la aplicación.
		this.id_elemento = null;
		this.el = null;
		this.diccionario_datos = {};

                // ■■ Inicializar reconocimiento de voz
                this._initSpeechRecognition();

                // ■■ Escuchar eventos en el popover
                this._set_event_listener();
	}	

	/**
	 * ### ​👂​👂 Establece el Listener cuando el PopOver está abierto.	 */
	_set_event_listener() {
		// document.addEventListener('click', (e) => {
		document.addEventListener('click', async (e) => {
			// Si no está el PopOverElemen_t retornamos.
			if ( !this.bs_popover || !this.bs_popover.tip ) 
				return;			
			
			// Para que cuando haga CLICK OUT se cierre e PopOver. 
			// Tengo que comparar estas dos variables pq cuando se hace el primer click lo cierra.
        	if ( this._is_click_outside(e) && !this.b_primera_vez ){
				this.accion_save();				// Guardo por defecto.
				this.bs_popover.hide();			// Oculta el PopOver.
			}
			
			// LA PRIMERA VEZ que se hace click sobre una silla o mesa, entra !button. Esto es importante para poder 
			// asignar que es la primera vez que entra y poner a false this.b_primera_vez
			// SE HACE ASÍ PQ LA PRIMERA VEZ SOLO CAMBIA EL COLOR DE LA RESERVA. 
			const button = e.target.closest('[data-action]');
			if (!button ) { 
				this.b_primera_vez = false; 	// Reset one-time flag
				return;
			}
			
			// ┌•••••••••••••••••••••••••••••••••••••••
			// ┌•• Ejecuta una ACCION sobre un boton.
			// ┌•••••••••••••••••••••••••••••••••••••••
			const action = button.getAttribute('data-action');			
			switch(action) {
				case 'alergias': this._abrir_alergias_desde_popover();
								 break;
				case 'guardar':  this.accion_save(); 	
								 this.bs_popover.hide();	
								 break;
				case 'eliminar': this.accion_borrar(); 	
								 this.bs_popover.hide();	
								 break;
				case 'grabar': 	 this.accion_toggle(button); 
								 break;
				case 'reset':    this.accion_reset_cajatexto(); 		
								 break;
				default: 
					// alert("Acción no reconocida:", action);
					// this.Salon.CFG.UI._NotA("Error Lógico", "Accion no Reconocida", "danger");
					break;
			}
		});
	}

	/**
	 * ###	Inicializa el motor de reconocimiento de voz del navegador, si está disponible.
	 */
	_initSpeechRecognition() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!SpeechRecognition) {
			console.warn('🎙️ Reconocimiento de voz no disponible en este navegador.');
			this.speechRecognition = null;
			return;
		}

		try {
			const recognition = new SpeechRecognition();
			recognition.lang = 'es-ES';
			recognition.continuous = false;
			recognition.interimResults = false;
			recognition.maxAlternatives = 1;

			recognition.onresult = (event) => this._handleSpeechResult(event);
			recognition.onstart = () => this._setRecordingState(true);
			recognition.onend = () => this._handleRecognitionEnd();
			recognition.onerror = (event) => this._handleRecognitionError(event);

			this.speechRecognition = recognition;
		} catch (error) {
			console.error('No se pudo inicializar SpeechRecognition:', error);
			this.speechRecognition = null;
		}
	}

	/**
	 * ###	Gestiona los resultados devueltos por la API de voz.
	 * @param {SpeechRecognitionEvent} event
	 */
	_handleSpeechResult(event) {
		if (!event?.results?.length) return;
		const partes = []
		for (let i = event.resultIndex; i < event.results.length; i++) {
			const result = event.results[i];
			if (result.isFinal && result[0].transcript) {
				partes.push (result[0]?.transcript);
			}
		}
		if (!partes.length) return;
		this._appendTranscript(partes.join(' '));
	}

	/**
	 * ###	Muestra mensajes de error de la API de voz y restablece el estado visual.
	 * @param {SpeechRecognitionErrorEvent} event
	 */
	_handleRecognitionError(event) {
		console.error('Error en reconocimiento de voz:', event?.error ?? event);
		this._handleRecognitionEnd(true);
	}

	/**
	 * ###	Añade el texto reconocido al textarea del popover.
	 * @param {String} fragment
	 */
	_appendTranscript(fragment) {
		const texto = fragment?.trim();
		if (!texto) return;

		const textarea = this.get_mensaje_dom();
		if (!textarea) return;

		const necesitaEspacio = textarea.value && !/\s$/.test(textarea.value);
		textarea.value = `${textarea.value}${necesitaEspacio ? ' ' : ''}${texto}`.trimStart();
		textarea.dispatchEvent(new Event('input', { bubbles: true }));
		textarea.focus();
		const len = textarea.value.length;
		textarea.setSelectionRange(len, len);
	}

	/**
	 * ###	Cambia el estado visual del botón de grabación y la bandera de grabación.
	 * @param {Boolean} isRecording
	 */
	_setRecordingState(isRecording) {
		this.grabando = !!isRecording;
		if (!this.btnVoiceControl) return;

		const button = this.btnVoiceControl;
		button.textContent = isRecording ? '■' : '🎤';
		button.classList.toggle('is-recording', !!isRecording);
		button.classList.remove('has-recognition-error');
		button.setAttribute('aria-pressed', isRecording ? 'true' : 'false');
	}

	/**
	 * ###	Finaliza la sesión de reconocimiento de voz y actualiza el estado del botón.
	 * @param {Boolean} hadError
	 */
	_handleRecognitionEnd(hadError = false) {
		this._setRecordingState(false);
		if (hadError && this.btnVoiceControl) {
			this.btnVoiceControl.classList.add('has-recognition-error');
			if (!this.speechUnsupportedWarned) {
				console.warn('🎙️ El reconocimiento de voz se detuvo por un error.');
			}
		}
	}

	/**
	 * ###	Comprueba si el navegador soporta reconocimiento de voz. */
	_canUseSpeechRecognition() {
		return !!this.speechRecognition;
	}

	/**
	 * ###	Informa al usuario de que el reconocimiento de voz no está disponible.	 */
	_notifySpeechUnsupported() {
		if (this.speechUnsupportedWarned) return;
		this.speechUnsupportedWarned = true;
		console.warn('🎙️ El navegador no soporta reconocimiento de voz. Usa el teclado para escribir el mensaje.');
		if (this.btnVoiceControl) {
			this.btnVoiceControl.textContent = '🎤';
			this.btnVoiceControl.setAttribute('aria-disabled', 'true');
		}
	}

	/**
	 * ###	Devuelve true si el click fue fuera del popover.
	 * 				Devuelve false si el click fue dentro del popover.
	 * Es util para saber si se hizo click fuera o dentro del popOver.
	 * @param {event} el evento click que dispara la comprobación, pero esta funcion no es llamada desde un listener.
	 */
	_is_click_outside(e) {		
		if (!this.bs_popover || !this.bs_popover.tip) return;
		// Usar propiedad interna _isShown (más directo)
		if (this.bs_popover._isShown) {
			if (this.bs_popover.tip) {
				const clicked_inside_pop = this.bs_popover.tip.contains(e.target);
				const clicked_on_opener = e.target === this.el;
				// Si el click fue fuera del popover y no en el elemento que lo abrió
				if (!clicked_inside_pop && !clicked_on_opener) return true;				
        	}
		}
		return false;
	}

	/**
	 * ## Muestra el popover y cacha variables de clase (this.id_elemento, this.el).
	 * @param {*} id_elemento_dom 
	 * @param {*} arr_mesas_reserva 	 */
	api_mostrar(id_elemento_dom, arr_mesas_reserva = []){
		
		this._registrar_y_mostrar(id_elemento_dom);
		this._set_contexto_reserva_actual(id_elemento_dom, arr_mesas_reserva);

		// ■ Cacha Los elementos Dom del PopOver
		const tip     		= this.bs_popover.tip;							// se crea cuando se hace this.bs_popover.show()
		const $header 		= tip?.querySelector('.popover-header');	// header(titulo de la ventana) del PopOver	
		const $sumatorio    = tip?.querySelector('#sumatorio_mensajes_pop');	// contenedor Label del sumatorio de mensajes
		const $alergias		= tip?.querySelector('#labels_alergias_pop');
		const $caja_texto	= tip?.querySelector('#textarea_popov');	// caja de texto del mensaje en el PopOver
		
		// ■ Header (siempre hay)
		if ($header) this._set_header($header); 
		
		// ■ Sumatorio de mensajes en un label. Solo habrá sumatorio si is_single = false.
		if ($sumatorio)  this._set_sumatorio($sumatorio, $caja_texto, id_elemento_dom, arr_mesas_reserva); 
		
		// ■ Vista de alergias seleccionadas del elemento
		if ($alergias) this._set_alergias_popover($alergias, id_elemento_dom);
		
		// ■ Caja de texto del mensaje (siempre hay)
		if ($caja_texto) this._set_caja_texto($caja_texto, id_elemento_dom); 		
	}

	/** ## Registra el elemento y muestra el PopOver sobre el elemento {@link api_mostrar} */	
	_registrar_y_mostrar(id_elemento_dom){
		this.id_elemento = id_elemento_dom;
		this.el = document.getElementById(id_elemento_dom);
		if (!this.el) { console.error("Elemento no encontrado:", id_elemento_dom); return; }
	
		// ■ Reenganchar popover al nuevo elemento. 
		this.bs_popover._element = this.el;  // Cambiar referencia. [ Fundamental pq trabajo con un sólo PopOver ]
		this.bs_popover.update();            // Actualiza  PopOver
		this.bs_popover.show();			  // Muestra el PopOver y activa this.bs_popover.tip
		
		// Le decimos que es la primera vez para que no se cierre nada mas empezar por el evento click...con esto lo controlamos.
		this.b_primera_vez = true;
	}

	/** */
	_set_contexto_reserva_actual(id_elemento_dom = '', arr_mesas_reserva = []) {
		if (this.is_single) {
			this.ids_reserva_actual = [id_elemento_dom].filter(Boolean);
			return;
		}

		const ids = Array.isArray(arr_mesas_reserva) ? arr_mesas_reserva.filter(Boolean) : [];
		if (!ids.length && id_elemento_dom) {
			this.ids_reserva_actual = [id_elemento_dom];
			return;
		}

		if (id_elemento_dom && !ids.includes(id_elemento_dom)) ids.push(id_elemento_dom);
		this.ids_reserva_actual = Array.from(new Set(ids));
	}
	
	/** ### • Devuelve los ids afectados por el cambio de alergias, 
	 * ### dependiendo del tipo de popover (single o multiple) y la reserva actual.
	 * ### • llamado desde {@link _abrir_alergias_desde_popover}*/
	_get_ids_afectados_alergias(id_elemento = '') {
		if (!id_elemento) return [];
		if (this.is_single) return [id_elemento];

		const ids = Array.isArray(this.ids_reserva_actual) ? this.ids_reserva_actual : [];
		if (ids.includes(id_elemento) && ids.length) return ids;
		return [id_elemento];
	}
	
	// ◘◘◘◘◘◘ api_mostrar ◘◘◘◘◘◘
	_set_header($header){
		if (!$header) return false;
		const titulo = `• ${this.id_elemento}`;
		if (!this.with_alergenos) {
			$header.textContent = titulo;
			return;
		}
		$header.innerHTML = `
			<div class="popover-header-row">
				<span class="popover-header-title">${titulo}</span>
				<button type="button" class="btn btn-sm btn-alergias-pop" data-action="alergias" title="Seleccionar alergias">
					Alergias
				</button>
			</div>
		`;

		const $btnAlergias = $header.querySelector('[data-action="alergias"]');
		if (!$btnAlergias) return;
		const alergias = this.d_alergias[this.id_elemento] || [];
		if (Array.isArray(alergias) && alergias.length) {
			$btnAlergias.classList.add('has-selection');
		}
	}

	/**	### Abre el Menu Selector de Alergias */
	_abrir_alergias_desde_popover() {
		if (!this.motor_alergias) return;
		const id_elemento = this.id_elemento;
		if (!id_elemento) return;
		
		const alergias_actuales = this.d_alergias[id_elemento] || [];
		this.motor_alergias.abrir(alergias_actuales, (seleccion) => {
			const alergias_limpias = Array.isArray(seleccion) ? seleccion : [];
			const ids_afectados = this._get_ids_afectados_alergias(id_elemento);

			for (const id_afectado of ids_afectados) {
				if (!id_afectado) continue;
				this.d_alergias[id_afectado] = [...alergias_limpias];
				this._actualizar_markador_elemento(id_afectado);
			}

			const tip = this.bs_popover?.tip;
			const $alergias = tip?.querySelector('#labels_alergias_pop');
			if ($alergias && id_elemento === this.id_elemento) {
				this._set_alergias_popover($alergias, id_elemento, alergias_limpias);
			}

			const $btnAlergias = tip?.querySelector('[data-action="alergias"]');
			if ($btnAlergias && id_elemento === this.id_elemento) {
				$btnAlergias.classList.toggle('has-selection', alergias_limpias.length > 0);
			}
		});
	}

	/** */
	_set_alergias_popover($contenedor, id_elemento, alergias = null) {
		if (!$contenedor) return;

		const seleccion = Array.isArray(alergias) ? alergias : (this.d_alergias?.[id_elemento] || []);

		$contenedor.innerHTML = '';

		if (!Array.isArray(seleccion) || !seleccion.length) {
			$contenedor.classList.add('is-empty');
			return;
		}

		$contenedor.classList.remove('is-empty');
		for (const alergia of seleccion) {
			const $tag = document.createElement('span');
			$tag.className = 'alergia-tag-pop';
			$tag.textContent = alergia;
			$contenedor.appendChild($tag);
		}
	}

	_reset_alergias(){
		this.d_alergias={};

		// this._actualizar_markador_elemento(this.id_elemento);
	}
	
	// ◘◘◘◘◘◘ api_mostrar ◘◘◘◘◘◘
	_set_sumatorio($sumatorio, $caja_texto, id_elelmento_dom, arr_mesas_reserva = []){
		if (!$sumatorio) return false;
		if (!Array.isArray(arr_mesas_reserva)) return false;

		$sumatorio.textContent = '';	// RESET contenedor

		for (const id_mesa of arr_mesas_reserva) {
			const fila = this.diccionario_datos[id_mesa] || { mensaje: '' };
			const msg  = fila.mensaje || '';

			// ■■■ Cada-Fila ► id_mesa | mensaje ■ un div contenedor(row) y columnna izquierda y columna derecha.
			const $row  = document.createElement('div');
			const $colL = document.createElement('span');
			const $colR = document.createElement('span');

			// ► ES EL ELEMENTO CLICKADO...Selected
			if (id_mesa === id_elelmento_dom){				
				// Le asigno una clase 
				$row.className  = 'sumatorio-row-ppal';     
				$colL.className = 'sumatorio-id-ppal';
				$colR.className = 'sumatorio-msg-ppal';
				// ■■■
				// (Opcional) Syncro entre CajaTexto y Div(sumatorio) en vivo
				if ($caja_texto) {
					const sync_mensaje = () => { 							
						$colR.textContent = $caja_texto.value || ''; 		// textContent = seguro (W3C): evita inyección HTML.
					};						
					sync_mensaje();
					//  ​👂​👂 En vivo: mientras escribe el usuario
					$caja_texto.addEventListener('input', sync_mensaje, { passive: true });
				}
			}else{
				$row.className  = 'sumatorio-row';     
				$colL.className = 'sumatorio-id';
				$colR.className = 'sumatorio-msg';
			}
			$colL.textContent = id_mesa +': ';          // p.ej. 'mesa_3: '
			$colR.textContent = msg;              		// mensaje o vacío

			$row.appendChild($colL);
			$row.appendChild($colR);
			$sumatorio.appendChild($row);
		}
		
	}
	
	// ◘◘◘◘◘◘ api_mostrar ◘◘◘◘◘◘
	_set_caja_texto( $caja_texto, id_elemento_dom){		
		// ■■ TEXTAREA - MENSAJE
		if ($caja_texto) {
			$caja_texto.value = this.diccionario_datos[id_elemento_dom]?.mensaje || "";
		}
	}	
	

	// ■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■ CRUD ■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ###	Muestra por consola el diccionario_datos.
	 */
	read_popover() {
		let retorno = '';			
		// Validacion
		if(Object.keys(this.diccionario_datos).length <=0) return;
		// Cabecera
		console.log('📋 CONTENIDO DEL DICCIONARIO POPOVER:');
		console.log('═'.repeat(50));		
		// Contenido
		const key_value = Object.entries(this.diccionario_datos);
		key_value.forEach(([key, value]) => {
			console.log(`📍${key}]:`, value);
			retorno += `📍${key}]: ${JSON.stringify(value)}\n`;
		});		
		console.log(`Total mensajes: ${Object.keys(this.diccionario_datos).length}`);
		return retorno; 
	}

	/**
	 * ###	 Guardar MENSAJE en diccionario_datos 
	 * @param {}
	 */
	accion_save() {
		const $msg   = document.getElementById("textarea_popov");				//Cacho el textarea de mensajes del Dom
		const mensaje_to_save = $msg ? $msg.value : '';									// Cacho el valor del textarea de mensajes

		// ┌•• Si no hay mensaje cerrar sin guardar 
		if (!mensaje_to_save) {
			this._actualizar_markador_elemento(this.id_elemento);
			this.bs_popover.hide();
			return;
		}
		// ■■■■■■■■■■■■■■■■■■■■■■■■ diccionario que se asigna a a diccionario_datos
		const now   = new Date();
		const new_ficha = { ...Motor_Mensajes._FICHA_VACIA };

		new_ficha.usuario = "usu";
		new_ficha.fecha   = now.toLocaleDateString();
		new_ficha.hora    = now.toLocaleTimeString();
		new_ficha.mensaje = mensaje_to_save;		
		// ████████████████████████
		// ► Estructura
		this.diccionario_datos[this.id_elemento] = new_ficha;

		// ✅ Indicador visual por mensaje/alergias
		this._actualizar_markador_elemento(this.id_elemento);

		console.log(`💾 Guardado en ${this.index_reserva != null ? `reserva[${this.index_reserva}]` :  ''} ${this.id_elemento}:`, 
						this.index_reserva != null 
						? this.diccionario_datos[this.index_reserva][this.id_elemento] 
						: this.diccionario_datos[this.id_elemento]);
	}

	/**
	 * ## Borra la clave con 'Silla_X' en el diccionario_datos
	 * @param {String|null} key_dicc_msgs 
	 * 	### ► null: Si es null, borra this.id_elemento  
	 * 	### ► SI es string ('Silla_X'), borra la clave con 'Silla_X' en el dicc
	 */
	accion_borrar(key_dicc_msgs=null) {
		if (!key_dicc_msgs) 
			key_dicc_msgs = this.id_elemento;
		try {
			if (this.diccionario_datos[key_dicc_msgs]) {
				delete this.diccionario_datos[key_dicc_msgs];
				console.log(`🗑 Mensaje eliminado para ${key_dicc_msgs}`);

				// ✅ Recalcula indicador visual por mensaje/alergias
				this._actualizar_markador_elemento(key_dicc_msgs);
			}
		} catch (error) {
			return false;
		}
	}
	
	/**
	 * ###	  
	 * @param {}
	 */
	accion_reset_cajatexto(){
		document.getElementById("textarea_popov").value = "";
		document.getElementById("textarea_popov").focus();
	}

	/**
	 * ###	  Cambio de iconos entre grabar y parar.
	 * @param {element} botón que hace click.
	*/
	accion_toggle(btn) {
		this.btnVoiceControl = btn || null;
		if (this.btnVoiceControl) {
			this.btnVoiceControl.removeAttribute('aria-disabled');
		}

		if (!this._canUseSpeechRecognition()) {
			this._notifySpeechUnsupported();
			return;
		}

		if (this.grabando) {
			this._stopVoice();
		} else {
			this._startVoice();
		}
	}


	/**
	 * ###	Actualiza los datos del diccionario directamente sobre el diccionario. Sin interacción con el popover.
	 * 				Si no existe el id_elemento en el diccionario, lo CREA.  
	 * 				PONE O QUITA EL MARKADOR VISUAL según haya mensaje.
	 * @param {String} id_elemento ► 'Silla_X' o 'Mesa_Y'
	 * @param {String|null} valor_mensaje ► Si es null, no actualiza el mensaje. Si es string, actualiza el mensaje.	 
	 * ```javascript
	 * • popoverElement._update_data('silla_3', 'nuevo mensaje');
	 * • popoverElement._update_data('mesa_1',  '');		// mensaje vacío, quita markador
	 * ```
	 */
	update_mensaje(id_elemento,  valor_mensaje = null){
		try {
			// Si no existe la clave, LA CREA.

			if (!this.diccionario_datos[id_elemento]) this.diccionario_datos[id_elemento] = { ...Motor_Mensajes._FICHA_VACIA };

			// Actualizo el mensaje si no es null
			if (valor_mensaje !== null) this.diccionario_datos[id_elemento].mensaje = valor_mensaje;
			
			// Pongo o quito la marca visual según mensaje/alergias
			this._actualizar_markador_elemento(id_elemento);
		} catch (error) {
			console.error("Error al actualizar datos en popover:", error);
			return false;
		}
		return true;
	}

	/** ### Acualiza un diccionario directamente
	 * id_elemento(string) 
	 * alergia_s(array) 
	 *  */
	update_alergia(id_elemento, alergia_s = []) {
		if(!id_elemento) return false;
		if (!this.d_alergias[id_elemento]) this.d_alergias[id_elemento] = [];
		this.d_alergias[id_elemento] = Array.isArray(alergia_s) ? alergia_s : [];
		this._actualizar_markador_elemento(id_elemento);
	}
	
	// ■■■■■■■■ Grabación ■■■■■■■■
	/**
	 * ###	  
	 * @param {}
	*/
	_startVoice() {
			if (!this._canUseSpeechRecognition()) {
					this._notifySpeechUnsupported();
					return;
			}

			if (this.grabando) return;

			try {
					this._setRecordingState(true);
					this.speechRecognition.start();
					console.log(`🎤 start ${this.id_elemento}`);
			} catch (error) {
					console.error('No se pudo iniciar la captura de voz:', error);
					this._handleRecognitionEnd(true);
			}
	}

	/**
	 * ###
	 * @param {}
	 */
	_stopVoice()  {
			if (!this._canUseSpeechRecognition()) return;
			if (!this.grabando) return;

			try {
					this._setRecordingState(false);
					this.speechRecognition.stop();
					console.log(`■ stop ${this.id_elemento}`);
			} catch (error) {
					console.error('No se pudo detener la captura de voz:', error);
					this._handleRecognitionEnd(true);
			}
	}

        // ■■■■■■■■ Getters ■■■■■■■■
	/**
	 * ###	Devuelve el objeto tip de popover o null si no existe popover.
	 */
	get tip() {
		return this.bs_popover ? this.bs_popover.tip : null;
	}
	
	/**
	 * ###	  Acceso seguro al textarea. No usado por la clase.
	 */
	get_mensaje_dom() {
		return this.bs_popover?.tip?.querySelector('#textarea_popov');
	}
	
	/**
	 * ###	  Cuando la app necesite datos, este es un ejemplo:	// 
	 * ```javascript
	 *		'Silla_3': {usuario: 'usu', fecha: '25/8/2025', hora: '21:27:41', mensaje: 'una de gambas'},
	 *		'Silla_4': {usuario: 'usu', fecha: '25/8/2025', hora: '21:43:02', mensaje: 'gluten'},
	 *		'Silla_7': {usuario: 'usu', fecha: '25/8/2025', hora: '21:47:22', mensaje: 'marisco'}
	 *		}
	 * ```
	 */
	get diccionario_datos(){
		return this.diccionario_datos || {};
	}	
	get datos(){
		return this.diccionario_datos || {};
	}
	get is_single(){
		if (typeof(this.is_single) != 'boolean') 
			this.is_single = true;
		return this.is_single;
	}

	api_alergias(){
		return this.d_alergias || {};
	}



	_tiene_mensaje(id_elemento_dom = '') {
		const mensaje = this.diccionario_datos[id_elemento_dom]?.mensaje || '';
		return typeof mensaje === 'string' && mensaje.trim() !== '';
	}

	_tiene_alergias(id_elemento_dom = '') {
		const alergias = this.d_alergias[id_elemento_dom] || [];
		return Array.isArray(alergias) && alergias.length > 0;
	}

	_actualizar_markador_elemento(id_elemento_dom = '') {
		if (!id_elemento_dom) return;
		const b_mensajes = this._tiene_mensaje(id_elemento_dom);
		const b_alergias = this._tiene_alergias(id_elemento_dom);

		if (b_mensajes && b_alergias) {
			this.__mostrar_markador(id_elemento_dom, 'rgb(76, 138, 208)');
			return;
		}else if(b_mensajes){
			this.__mostrar_markador(id_elemento_dom, 'rgb(78, 208, 49)');
			return;
		}else if(b_alergias){
			this.__mostrar_markador(id_elemento_dom, 'rgb(168, 2, 2)');
			return;
		}
		this.__ocultar_markador(id_elemento_dom);
	}

	
	/**
	 * ### Muestra la pequeña circunferencia de color cuando hay un mensaje en el elemento_dom mesa o silla.
	 * @param {String}	id_elemento_dom ► 'mesa_0' , 'silla_2' ... es el elemento sobre el que aparecerá la bolita. */
	__mostrar_markador(id_elemento_dom, color_bolita=null) {
		// Valida que el elemento DOM existe 
		const elemento_dom = document.getElementById(id_elemento_dom);
		if (!elemento_dom) return;
		
		// Añadir clase para posicionamiento relativo si no la tiene
		if (!elemento_dom.classList.contains('elemento_con_mensaje')) {
			 elemento_dom.classList.add('elemento_con_mensaje');
		}

		// Pongo el mismo tema que usa su popover. de esta manera puedo poner 
		const theme_elemento = elemento_dom.getAttribute('data-theme');
		if (!theme_elemento)
			elemento_dom.setAttribute('data-theme', this.theme);

		// Crear o actualizar marcador
		let bolita = elemento_dom.querySelector('.markador_mensaje');
		// Si no existe, se crea.
		if (!bolita) {
			bolita = document.createElement('i');
			bolita.className = 'bi bi-chat-left-dots-fill markador_mensaje';
			bolita.setAttribute('aria-hidden', 'true');
			elemento_dom.appendChild(bolita);
		}
		
		// Asegurar que está visible
		bolita.style.display = 'block';
		if(color_bolita && typeof color_bolita === 'string'){
			bolita.style.color = color_bolita;
		}else{
			bolita.style.color = '#16a34a';
		}
	}

	/**
	 * ###	Oculta la pequeña circunferencia de color cuando hay un mensaje en el elemento_dom mesa o silla. 	 */
	__ocultar_markador(id_elemento_dom) {
		const sillaElement = document.getElementById(id_elemento_dom);
		if (!sillaElement) return;
		
		const bolita = sillaElement.querySelector('.markador_mensaje');
		if (bolita) {
			bolita.style.display = 'none';
		}
		sillaElement.classList.remove('elemento_con_mensaje');
	}
	
	/**
	 * ### Resetea el diccionario de datos del popover.
	 * {@link Configuracion_Salon. limpiar_Salon}  */
	reset_all_data(){
		this.diccionario_datos = {};
	}	
	
	/**
	 * ### Cambia el tema en caliente	 */
	setTheme(theme = 'pastel') {
		this.theme = theme;
		if (this.bs_popover?.tip) this.bs_popover.tip.setAttribute('data-theme', theme);
	}


}	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ FIN  CLASE 	PopOverElemen_t

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


/**
 * ## Working_Celdas representa una celda en una matriz_plana.
 * ### Permite convertir entre coordenadas (fila, columna) o indice y referencias estilo Excel (A1, B2, etc.)
 * @example let celda = new Working_Celdas(this, fila, columna);
 */
class Working_Celdas {
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// * C L A S E  "Working_Celdas" ► representa una celda en una matriz_plana.
	// * Permite convertir entre coordenadas (fila, columna) o indice y referencias estilo Excel (A1, B2, etc.)
	// * example: (Matriz_Plana)  let celda = new Working_Celdas(this, fila, columna);
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	constructor(instancia_Salon = null) {
		
		this.ref_Salon = instancia_Salon;
	}

	/**
	 * ## Convierte un índice de array unidimensional a coordenadas bidimensionales (fila, columna).
	 * * @param {number} indice - El índice del elemento en el array unidimensional (empezando en 0).
	 * @param {number} columnas - El total de columnas de la matriz bidimensional.
	 * @param {number} [filas] - (Opcional) El total de filas para validar los límites de la matriz.
	 * [RETORNO] {Object} Objeto con la {fila, columna} correspondiente.
	 */
	_get_celda_CON_dimension_X(indice, columnas, filas = null) {
		// Conversión estricta a número (Number('6a') da NaN, evitando errores lógicos)
    	indice = Number(indice);
    	columnas = Number(columnas);
	
		// Validaciones de formato
		if (!Number.isInteger(indice) || indice < 0) {
			throw new Error(`Índice inválido: ${indice}. Debe ser un entero mayor o igual a cero.`);
		}
		if (!Number.isInteger(columnas) || columnas <= 0) {
			throw new Error(`Columnas inválidas: ${columnas}. Debe ser un entero mayor a cero.`);
		}

		// Validación opcional de límites (si se pasa el argumento 'filas')
		if (filas !== null) {
			if (!Number.isInteger(filas) || filas <= 0) {
				throw new Error(`Filas inválidas: ${filas}. Debe ser un entero mayor a cero.`);
			}
			if (indice >= filas * columnas) {
				throw new Error(`Índice fuera de límites: ${indice}. El máximo permitido es ${(filas * columnas) - 1}.`);
			}
		}
		// Cálculo matemático puro
		const fila = Math.floor(indice / columnas);
		const columna = indice % columnas;

		const celda = this.X_to_celda(fila, columna);
		return celda || null;
	}

	// ■■■■■■■■■■■■■■■■■ UTILIDADES
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ## Normaliza un valor para que sea un ENTERO POSITIVO (índice válido).
	 * ### Si introduce un valor no válido, devuelve 0.
	 * ### Si introduce un valor negativo, devuelve su valor absoluto.
	 * @param {number} valor el numero a normalizar, pej 5, '10', -3	 
	 */
	_entero_positivo(valor) {
		try {
			if (Number.isInteger(valor) && valor >= 0) 
				return valor;
			const numero = Number.parseInt(valor, 10);
			return Number.isInteger(numero) && numero >= 0 ? numero : -numero;			
		} catch (error) {
			return null;
		}
	}
	
	// ■■■■■■■■■■■■■■■■■ CONVERSION
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ## Devuelve el indice en  this.matriz_plana si lo encuentra, o false si no encuentra.
	 * {@link X_to_indice} ■ 
	 * ```javascript
	 * const indice = celda._get_indice_(2, 3); // fila 2, columna 3 ► indice = 14
	 * const indice = celda._get_indice_(2, 3000); // fila 2, columna 3000 ► indice = false
	 * ```	*/
	_get_indice(fila, columna) {
		const MatriZ = this.ref_Salon.matriz_plana;
		// ■ Validación Filas como entero positivo y dentro del rango
		if (!Number.isSafeInteger(fila) || fila < 0 || fila >= this.ref_Salon.total_filas()) {
			return false;
		}
		// ■ Validación Columnas como entero positivo y dentro del rango
		if (!Number.isSafeInteger(columna) || columna < 0 || columna >= this.ref_Salon.columnas) {
			return false;
		}
		// ► Proceso:                
		const indice = fila * this.ref_Salon.columnas + columna;
		if (indice >=0 && indice < MatriZ.length)
			return indice;
		else
			return false;
	}
	/**
	 * ## Obtiene el índice lineal de la matriz a partir de cualquier formato de entrada.
	 * ### Devuelve el índice (0 a N) o false si es inválido.
	 * @param {number|string|Working_Celdas} arg1 - Puede ser: índice directo (int), fila (int), "A1" (string) o objeto Working_Celdas.
	 * @param {number|null} arg2 - Si arg1 es fila, arg2 es la columna. Si no, es null.
	 * ```javascript
	 *	matriz.X_to_indice(5); ► (Indice) Devuelve 5 si es válido
	 *	matriz.X_to_indice(2, 3); ► (row-col) Devuelve el índice de fila 2, columna 3
	 *	matriz.X_to_indice("B3"); ► (str) Devuelve el índice de la celda B3
	 *	matriz.X_to_indice({1, 4}); ► Devuelve el índice de la celda (1,4)
	 * ``` 
	*/
    X_to_indice(arg1, arg2 = null) {        
		let fila, col;
		try {
			// ■ CASO 1: Índice directo (un solo número)
			if (typeof arg1 === 'number' && arg2 === null) {
				if (this.is_OK(arg1)) return arg1;            
				return false;
			}
			// ■ CASO 2: Texto tipo Excel ("B3")
			if (typeof arg1 === 'string') {
				const coords = this._celda_to_fc(arg1);            
				if (!coords) return false;            
				fila = coords.fila;
				col  = coords.columna;
			}        
			// ■ CASO 3: Coordenadas (fila, columna)
			else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
				fila = arg1;
				col  = arg2;
			}        
			// ■ CASO 4: arg1 es un objeto {fila, columna}
			else if (typeof arg1 === 'object' && arg2 === null && arg1.fila!=null && arg1.columna!=null) {
				fila = arg1.fila;
				col  = arg1.columna;
			}
			// ■ CASO 5: arg1 es un objeto {filas, columnas} {dimension}
			else if (typeof arg1 === 'object' && arg2 === null && arg1.filas!=null && arg1.columnas!=null) {
				fila = arg1.filas;
				col  = arg1.columnas;
			}

			// ■ CASO 5: Ninguno de los anteriores
			else {
				return false; // Entrada no reconocida
			}
		} catch (error) {
			// console.warn(`Error en _get_indice_universal${error.message}`);
			return false;
		}
		
		if ( !this.is_OK(fila, col) ) return false;
		// ■ RETORNO
		return this._get_indice(fila, col);
    }

	/**
	 * ### Normaliza un valor para que sea un índice válido (entero positivo).
	 * @param {*} valor 
	 * @returns {number} índice normalizado o 0 si no es válido.
	 */
	_AZ_to_numcol(columna_excel = '') {
		if (typeof columna_excel !== 'string' || columna_excel.trim() === '') return null;
		const letras = columna_excel.trim().toUpperCase();
		let numero = 0;
		for (let i = 0; i < letras.length; i++) {
			const charCode = letras.charCodeAt(i) - 64; // A=1, B=2,... Z=26
				numero = numero * 26 + charCode;
			}
		return numero - 1;
	}

	/**
	 * ### Convierte un número de columna (0-based) a su representación en estilo Excel (A, B, ..., Z, AA, AB, etc.).
	 * @param {number} numero 
	 * @returns {string} representación en estilo Excel de la columna.
	 */
	_numcol_to_AZ(numero) {
		if (!Number.isInteger(numero) || numero < 0) return 'A';
		let n = numero + 1; // Convertimos al sistema 1..N para reutilizar la lógica tradicional
			let columna = '';
			while (n > 0) {
					const resto = (n - 1) % 26;
					columna = String.fromCharCode(65 + resto) + columna;
					n = Math.floor((n - 1) / 26);
				}
			return columna;
	}

	/**
	 * ### Formatea la celda en estilo Excel (A1, B2, etc.).
	 * @param {number} row numero de fila.
	 * @param {number} col numero de columna.
	 * @returns {string} representación en estilo Excel de la celda.
	*/
	_fc_to_celda(row , col ) {
		if (!Number.isInteger(row) || row < 0) return false;
		if (!Number.isInteger(col) || col < 0) return false;
		// ■ RETORNO 
		return this.is_OK(row, col) ? `${this._numcol_to_AZ(col)}${row}` : null;		
	}

	/**
	 * ### Parsea una referencia de celda en estilo Excel (A1, B2, etc.) o un objeto con fila y columna.
	 * @param {*} celda 
	 * @returns {Object|null} objeto con fila y columna o null si no es válido.
	*/
	_celda_to_fc(celda = null) {
		try {
			// Valida Entrada de datos:
			if (celda == null) 	return null;
			let fila = -1;
			let columna = -1;	
			// CASO 1: celda es una cadena tipo excel ('A0', 'B3')
			if (typeof celda === 'string') {
				const match = celda.trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
				if (!match) return null;			
				// ■ RETORNO
				fila = this._entero_positivo(match[2]);
				columna = this._AZ_to_numcol(match[1]);
				if (this.is_OK(fila, columna)) 
					return { fila, columna };			
			}
			// CASO 2: celda es un objeto {fila, columna}
			if (typeof celda === 'object' && celda !== null) {
				fila = this._entero_positivo(celda.fila);
				columna = celda.columna;
				if (typeof columna === 'string') 
					columna = this._AZ_to_numcol(columna);
				columna = this._entero_positivo(columna);			
			}
			// ■ RETORNO
			return this.is_OK(fila, columna) ? {fila, columna} : null;			
		} catch (error) {
			return null;
		}
	}
	
	/**
	 * ### Convierte un indice de entrada(arg1) en un objeto {fila, columna} (coordenada).
	 * @param {object|number|string} arg1  actua como coordenada = { 3 , 4 }  ■  actua como fila = 4  ■  actua como celda = 'C3'
	 * @param {number} arg2 actua como columna = 3
	 */
	X_to_fc(arg1, arg2=null){
		// Valida
		const indice = this.X_to_indice(arg1, arg2);
		if (indice===false) return null;
		// Calcula coordenadas
		const fila = this.ref_Salon.numero_fila(indice);
		const columna = this.ref_Salon.numero_columna(indice);
		if (fila === false || columna === false) return null;				
		// ■ RETORNO
		return this.is_OK(fila, columna) ? {fila, columna} : null;
	}

	/** 
	 * ## Devuelve una celda excel o null.
	 * @param {number|String|object} arg1 1-indice | 2-fila | 3- {fila, columna} | 4-celda ► 'B2' 
	 * @param {number|null} arg2 1-columna
	 * ```javascript
	 * 		X_to_celda(5);  	► C3, el indice 5 corresponde con C3 en esta matriz.
	 * 		X_to_celda(4, 2);  	► B3, '4' es la fila(0, 1, 2, 3) y '2' es la columna B ► B3
	 * 		X_to_celda({3, 2}); ► B2, '3' es la fila(0, 1, 2) y '2' es la columna B ► B3
	 * 		X_to_celda('B2');  	► B2  
	 * ```	 */
	X_to_celda(arg1, arg2=null){
		try {
			// Valida
			const indice = this.X_to_indice(arg1, arg2);
			if (indice === false) return null;
			//Saca Coordenadas
			const coordenada = this.X_to_fc(indice);
			// Lo pone en formato celda y retorna.... _fc_to_celda también valida is_OK ;)
			const celda = this._fc_to_celda(coordenada.fila, coordenada.columna);
			return (celda) ? celda : false;			
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	/** ## Standariza la dimensión ┌■■ {filas:3, columnas:4} 
	 * ### Formatos Entrada: 1■ '3x4' - 2■ {filas:3, columnas:4} - 3■ (3,4) - 4■ {filas:3,columnas:4}	*/
	_standard_dimension(arg1 = null, arg2 = null) {
        // Variable para centralizar la validación de números enteros positivos
        const esEnteroPositivo = (num) => Number.isInteger(num) && num > 0;

        try {
            // 1. Caso base: No hay argumentos
            if (!arg1) return null;

            // 2. Caso 'Objeto': { filas: 3, columnas: 4 }
            if (typeof arg1 === 'object') {
                const { filas, columnas } = arg1;

                if (esEnteroPositivo(filas) && esEnteroPositivo(columnas)) {
                    return { filas, columnas };
                }
                
                // Si llegamos aquí, el objeto no tiene el formato correcto.
                // Usamos throw para registrar el error en el catch y devolver null
                throw new Error(`Objeto mal formado. Filas: ${filas}, Columnas: ${columnas}`);
            }

            // 3. Caso 'String': "3x4"
            if (typeof arg1 === 'string') {
                const txt = arg1.trim().toLowerCase();
                if (txt === '') return null; // Salida rápida silenciosa, sin excepción

                const match = txt.match(/^(\d+)x(\d+)$/);
                if (!match) {
                    throw new Error(`String mal formado. Formato esperado 'NxM', recibido: '${arg1}'`);
                }

                const filas = parseInt(match[1], 10);
                const columnas = parseInt(match[2], 10);

                if (esEnteroPositivo(filas) && esEnteroPositivo(columnas)) {
                    return { filas, columnas };
                }
            }

            // 4. Caso '(arg1, arg2)': _standard_dimension(3, 4)
            if (esEnteroPositivo(arg1) && esEnteroPositivo(arg2)) {
                return { filas: arg1, columnas: arg2 };
            }

            // 5. Caso no reconocido: No coincide con ningún patrón esperado
            throw new Error(`Argumentos no reconocidos. arg1: ${arg1}, arg2: ${arg2}`);

        } catch (error) {
            // El catch atrapa cualquier throw o error de ejecución y asegura que no se rompa la aplicación
            console.error(`Error en _standard_dimension: ${error.message}`);
            return null;
        }
    }
	
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ VALIDADORES
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	
	/**
	 * ### Valida que un indice es Correcto(Entero positivo, en el rango de la matriz.)
	 * @param {number} indice de la matriz. 
	*/
	_indice_OK(indice){
		const MatriZ = this.ref_Salon.matriz_plana;
		// ■ Validación que exista la matriz
		if (!MatriZ || !Array.isArray(MatriZ)) return false;		
		// ■ Validación de parámetros: NUMERO - ENTERO - POSITIVO
		if (typeof indice !== 'number') return false;
		if (!Number.isInteger(indice) ) return false;
		if ( indice < 0) return false;				
		// ■ Validación de rango válido en la matriz
		if (indice >= MatriZ.length) return false;				
		return true
	}
	
	/**
	 * ### fila y columna OK? ✔️
	 */
	_fc_OK({ fila, columna } = {}) {
		if (!Number.isInteger(fila) || fila < 0) return false;
		if (!Number.isInteger(columna) || columna < 0) return false;

		const limites = this.ref_Salon?._limites_matriz?.();
		if (!limites || limites.filas === 0 || limites.columnas === 0) return false;

		return fila < limites.filas && columna < limites.columnas;
	}

	/**
	 * ### Valida celda (B3, A1, ...) ✔️
	 */
	_celda_OK(celda = null) {
		const coordenada = this._celda_to_fc(celda);
		if (!coordenada) return false;                
		return this._fc_OK(coordenada);
	}


	_dimension_OK(dimension){
		const MatriZ = this.ref_Salon.matriz_plana;
		const filas = dimension.filas;
		const columnas = dimension.columnas;
		const indice_en_matriz = this.X_to_indice({filas, columnas});
		if(indice_en_matriz) return true;		
		return false;

	}

	/**
	 * ### Valida si una celda en cualquier formato es correcta o no. ✔️
	 * @param {number|string|Working_Celdas} arg1 - Puede ser: índice directo (int), fila (int), "A1" (string) o objeto Working_Celdas.
	 * @param {number|null} arg2 - Si arg1 es fila, arg2 es la columna. Si no, es null.
	 * @returns {Boolean} - true si es una celda de la matriz. false si no es una celda de la matriz.
	 * @example is_OK(5); ■ is_OK(2, 3); ■ is_OK("B3"); ■ is_OK({1, 4}); 
	*/
	is_OK(arg1, arg2 = null) {
		// ■ CASO 1: Índice directo (un solo número)
		if (typeof arg1 === 'number' && arg2 === null) {
				return this._indice_OK(arg1);
		}
		// ■ CASO 2: Texto tipo Excel ("B3")
		if (typeof arg1 === 'string') {
				return this._celda_OK(arg1);
		}
		// ■ CASO 3: Coordenadas (fila, columna)
		if (typeof arg1 === 'number' && typeof arg2 === 'number') {
				return this._fc_OK({ fila: arg1, columna: arg2 });
		}
		// ■ CASO 4: arg1 es un objeto {fila, columna}
		if (arg1 && typeof arg1 === 'object' && arg2 === null) {
				const fila = this._entero_positivo(arg1.fila);
				let columna = arg1.columna;
				if (typeof columna === 'string') columna = this._AZ_to_numcol(columna);
				columna = this._entero_positivo(columna);
				return this._fc_OK({ fila, columna });
		}
		// ■ CASO 5: Ninguno de los anteriores
		return false;
    }

	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■ HERRAMIENTAS DE LA CLASE
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	/**
	 * ### Añade un valor al índice de la celda pasada como argumento y devuelve el resultado.
	 * @param {String|Object} arg1, puede ser String 'B2' o Object {3, 2} o number-indice (5)
	 * @param {*} plus Lo que se le añade al indice de celda. puede ser positivo o negativo
	 * ### [RETORNO] {String} nueva celda o false si no es válida.
	 * ```javascript
	 * plus('B7', 3); ► a la celda B7 le añade 3 al indice
	 * plus({fila:3, columna:2}, 1); ► a la celda fila = 2, columna = 1 le añade 1 al indice
	 * plus(5, 3); ► a la celda situada en el indice 5 le añade 3 al indice
	 * ```	 */
	plus(arg1='A0', plus = 0) {
		// Valida
		if (!Number.isInteger(plus)) plus=1;		
		// Convierte la celda a indice
		const indice = this.X_to_indice(arg1);
		if(indice === false) return false;
		// Suma el plus al indice
		const indice_plus = indice + plus;		
		const new_celda = this.X_to_celda( indice_plus );
		
		return this.is_OK(new_celda) ? new_celda : false;
	}
	
	/**
	 * Añade una fila y/o columna a la celda pasada como argumento y devuelve el resultado.
	 * @param {String|Object} arg1, puede ser String 'B2' o Object {3, 2} o number-indice (5)
	 * @param {*} plus_row Lo que se le añade a la fila de celda. puede ser positivo o negativo
	 * @param {*} plus_col Lo que se le añade a la columna de celda. puede ser positivo o negativo
	 * @returns {String} celda  nueva o false si no es válida.
	 * @example suma_fc('B7', 3, 0); "► a la celda B7 le añade 3 filas y 0 columnas"
	 * 			suma_fc({fila:3, columna:2}, 0, 1); "► a la celda fila = 2, columna = 1 le añade 0 filas y 1 columnas."
	 * 			suma_fc(5, 3, 0); "► a la celda situada en el indice 5 le añade 3 filas y 0 columnas"
	 */
	suma_fc(arg1='A0', plus_row = 0, plus_col = 0) {
		// Valida
		const indice = this.X_to_indice(arg1);
		if(indice === false) return false;
		
		const coordenada = this.X_to_fc(indice);		
		const row = coordenada.fila;
		const col = coordenada.columna;
		
		// const new_row = this._entero_positivo(row + (Number.isInteger(plus_row) ? plus_row : 0));
		// const new_col = this._entero_positivo(col + (Number.isInteger(plus_col) ? plus_col : 0));
		const new_row = row + (Number.isInteger(plus_row) ? plus_row : 0);
		const new_col = col + (Number.isInteger(plus_col) ? plus_col : 0);

		const new_celda = this.X_to_celda(new_row, new_col);
		return this.is_OK(new_celda) ? new_celda : false;

	}
	
}


// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ PRUEBAS  CON RANGOS ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
/**
 ```javascript
 ▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️ PRUEBAS CON RANGOS
 
  ■ suma_fc (suma una fila o columna a partir de una celda)
 const celda_suma = this.W_R.suma_fc('C3', 0, 1); 
 const celda_suma_mat = this.W_R.suma_fc({fila:3, columna:2}, 0, 1); 
 if(celda_suma && celda_suma_mat) 
 	console.log(`▶️ SUMA_FC ► ${celda_suma} , SUMA_FC MATRICIAL► ${celda_suma_mat}`);
 
  ■■■■■■■■ PLUS() (suma un indice a una celda), devuelve celda, siempre da una celda ok dentro del rango excepto en los extremos.
 const celda1 = 'C3'; 
 const plus = 7;
 const celda_plus = this.W_R.plus(celda1, plus); 
 if(celda_plus) 
 	console.log(`▶️ PLUS celda: ${celda1} - plus: ${plus} ► ${celda_plus}`);
 
  ■■■■■■■■ RESERVAS-A-RANGOS()
 const rangos_reserva = this.W_R._reservas_a_rangos(dicc_api_foto.reservas);
 console.log(`▶️ RANGOS RESERVA ► \n${JSON.stringify(rangos_reserva)}`);
 
  ■■■■■■■■ LISTAR() - RANGOS CREADOS
 console.log(`▶️ RANGOS CREADOS \n ${this.W_R.listar()}`);
 
  ■■■■■■■■ GET_ITEMS() (Baldosas) (objetos myDivs)
 const elementos = this.W_R._get_items();
 if (elementos) console.log(`▶️ ELEMENTOS EN BALDOSAS ${Object.keys(elementos).length} elementos`);
  console.log(`ELEMENTOS EN BALDOSAS \n ${JSON.stringify(elementos)}`);
 
  ■■■■■■■■ GET_BOOLEAN_VALUES()
 const rango = 'rango_pares';
 let contenido = this.W_R?._get_boolean_values(rango, true);	 contenido es un diccionario {id_contenido:booleano,....}
 console.log(`▶️ DICC BOOLEANO DE RANGO '${rango}' ►\n  ${JSON.stringify(contenido)}`);
 
  ■■■■■■■■ VALUES - CONTENIDO
 contenido = this.W_R?._get_values(rango, false);			 contenido es un diccionario {id_contenido:booleano,....}
 console.log(`▶️ DICC CONTENIDO(EN BALDOSA) EN RANGO '${rango}' ►\n  ${JSON.stringify(contenido)}`);
 
  ■■■■■■■■ VALORES DE LAS CELDAS: 
 const celda = 'F0';
 contenido = this.W_R?._get_celda_value(celda);
 if(contenido){
 	console.log(`▶️ CELDA '${celda}' contenido id ► '${contenido.id}'`); ► 'mesa_0'
 }else{
 	console.log(`▶️ CELDA '${celda}' vacia :(`);
 }		
  ■■■■■■■■ contenido-to-celda-R
 const id_contenido = 'silla_7';
 const celda_de_contenido = 	this.W_R?._search_celda(id_contenido);
 console.log(`▶️ CONTENIDO '${id_contenido}' está en CELDA ► '${celda_de_contenido}'`);
 
  ■■■■■■■■ IS_R_VACIO??
 const es_vacio = this.eRdS?._is_vacio(rango);
 console.log(`▶️ RANGO '${rango}' está vacio? ► ${es_vacio}`);
 
  ■■■■■■■■ BUSCAR RANGO LIBRE
 const dimension = '4x5';
 const celda_inicio = 'A0';
 const rango_free = this.eRdS?._busca_dimension_free(dimension, celda_inicio);
 if (rango_free)
 	console.log(`✅ RANGO LIBRE en dimension ${dimension} , desde Celda ${celda_inicio} ► ${rango_free.celda_inicio} - ${rango_free.celda_fin}`);
 else
	 	console.log(`❌ NO HAY RANGO LIBRE en dimension ${dimension} , desde Celda ${celda_inicio}`);

  ■■■■■■■■ UNION / INTERSECCION
 const celdas_union = RnG._get_union('rango_fila_0','rango_fila_1');
	const celdas_intersección = RnG._get_interseccion('rango_columna_1','rango_fila_0');
	const celdas_intersección_2 = RnG._get_interseccion('rango_columna_1','rango_columna_2');
	const celdas_intersección_3 = RnG._get_interseccion('rango_columna_1','rango_columna_1');
	console.log(`• CELDAS-UNION: ${celdas_union} ➿ ${RnG._is_continuos(celdas_union)}`);
	console.log(`• CELDAS-INTERSECCION:${celdas_intersección} ➿ ${RnG._is_continuos(celdas_intersección)}`);
	console.log(`• CELDAS-INTERSECCION NULL:${celdas_intersección_2} ➿ ${RnG._is_continuos(celdas_intersección_2)} `);

  ■■■■■■■  👀 ES RANGO CONTINUO??
	RnG._is_continuos(celdas_union);

  ■■■■■■■  👀 ADD RANGO "A MANO"
RnG.add_rango('rango_prueba', rango_from_reservas_bdd[0]);


  ■■■■■■■ 👻👻 Tengo un Fantasma!!!! 👻👻
  // Crea un rango solo con dimension, sin celda_inicio, ni celda_fin, me permite DINAMISMO. 
  // juega con to_pull para cargarlo de datos.
  // 
const nombre_ghost = this._ghost({filas:3,columnas:4});
this.ghost_s[nombre_ghost];

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■


 ▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️▶️ FIN PRUEBAS CON RANGOS
```
*/
class Working_Rangos  extends Working_Celdas{
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        // * C L A S E  "Rango"
        // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        constructor(instancia_matriz_plana = null) {			
			if (!instancia_matriz_plana) return null;
			
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			super(instancia_matriz_plana);	
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

			// this.ref_matriz = instancia_matriz_plana;	// ► Puntero a la clase matriz. 
			this.d_rangos = {};							// ► Diccionario de rangos
			this.d_temporales = {}

			this._init_rangos_basicos(true, true, true, true, true);
        }
		/**
		 * Procesa un string con formato 'NxM' y devuelve un objeto con dimensiones.
		 * Basado en principios KISS para garantizar mantenibilidad.
		 * * @param {string} texto - Cadena en formato 'filasxcolumnas' (ej. '3x4')
		 * @returns {{filas: number, columnas: number}|null} Objeto con dimensiones o null si es inválido.
		 */
		_get_dimensiones_3x4(texto) {
			// 1. Verificación básica de entrada
			if (typeof texto !== 'string' || !texto.includes('x')) {
				return null;
			}
			// 2. Fragmentación y limpieza (Case Insensitive para mayor usabilidad)
			const partes = texto.toLowerCase().split('x');
			// 3. Validar que existan exactamente dos componentes
			if (partes.length !== 2) {
				return null;
			}
			// 4. Parseo numérico
			const filas = parseInt(partes[0], 10);
			const columnas = parseInt(partes[1], 10);
			// 5. Deben ser números enteros positivos
			const esValido = !isNaN(filas) && !isNaN(columnas) && filas > 0 && columnas > 0;
			
			// 6. Validación final: Deben pertenecer a la matriz.
			const ok  = this._dimension_OK({filas, columnas})
			if(ok) 
				return esValido ? { filas, columnas } : null;
			
			return null;

		}
		/**
		 * 
		 * @param {*} dimension 
		 */
        _dimension_to_f_x_c(dimension = '') {
			// ■ PROCESO SOBRE OBJETO {filas, columnas}
			if (typeof dimension === 'object' && dimension !== null) {
				const { filas, columnas } = dimension;
				if (Number.isInteger(filas) && filas > 0 && Number.isInteger(columnas) && columnas > 0) {
					return { filas, columnas };
				}else {
					return null;
				}
			}
			if (typeof dimension !== 'string') return null;
			if (dimension.trim() === '') return null;
			// ■ PROCESO SOBRE CADENA
			const match = dimension.toLowerCase().match(/^(\d+)x(\d+)$/);
			if (!match) return null;
			const filas = parseInt(match[1], 10);
			const columnas = parseInt(match[2], 10);
			if (filas === 0 || columnas === 0) return null;
			return { filas, columnas };
        }     
		
		/**
         * Indica si el valor recibido representa una dimensión ("3x4" o {filas, columnas}) o una celda ("C7").
         * @param {String|Object} valor
         * @returns {'dimension'|'celda'|false}
         */
        _dimension_or_celda(valor = '') {
			const es_dimension_objeto = (obj) => {
				if (!obj || typeof obj !== 'object') return false;
				const { filas, columnas } = obj;
				return Number.isInteger(filas) && filas > 0 && Number.isInteger(columnas) && columnas > 0;
			};

			if (typeof valor === 'string') {
				if (this._dimension_to_f_x_c(valor)) return 'dimension';
				if (this._celda_to_fc(valor)) return 'celda';
				return false;
			}
			return es_dimension_objeto(valor) ? 'dimension' : false;
		}

		/**
		 * ## Devuelve un nombre de rango único. Valida que no existe en this.dicc_rangos_
		 * @param {*} nombre_rango Nombre del rango sobre el que queremos tener un nombre único.
		 * ```javascript
		 * const nombre1 = this._nombre_unico('mi_rango'); ► 'mi_rango' (si no existe)
		 * const nombre2 = this._nombre_unico('mi_rango'); ► 'mi_rango_1' (si ya existe 'mi_rango') , ...
		 * const nombre3 = this._nombre_unico(''); ► 'rango_0' (si no existe)
		 * const nombre4 = this._nombre_unico(''); ► 'rango_1' (si ya existe 'rango_0')...
		 * const nombre5 = this._nombre_unico('pares', true); ► 'pares_0' (si no existe)
		 * const nombre6 = this._nombre_unico('pares', true); ► 'pares_1' (si ya existe 'pares_0')...
		 * ```
		 */
        _nombre_unico(nombre_rango = '', dicc_to_read=null ) {
			if(!nombre_rango) nombre_rango = 'rango';
			if (dicc_to_read==null) {
				dicc_to_read = this.d_rangos;			
			}
			nombre_rango = nombre_rango.trim();               
			const nombres_existentes = Object.keys(dicc_to_read);				
			let indice = 0;
			// ┌■ CASO 1: introduce 'nombre_rango'. 
			if (nombre_rango !== '') {
				let candidato = nombre_rango;				
				while (nombres_existentes.includes(candidato)) {
					indice += 1;
					candidato = `${nombre_rango}_${indice}`;
				}
				return nombres_existentes.includes(nombre_rango) ? false : candidato;
			}

			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

			// ┌■ CASO 2: 'NO' introduce nombre_rango, creo uno dinámicamente con la base 'rango_'.
			indice = 0;
			let candidato = `rango_${indice}`;
			while (nombres_existentes.includes(candidato)) {
					indice += 1;
					candidato = `rango_${indice}`;
			}
			return candidato;
        }
		
		/** ## Crea nombre secuencial del nombre_rango. Empieza la cuenta en nombre_rango_0  */
		_nombre_secuencial(nombre_rango, dicc_to_read=null){
			if(!nombre_rango) nombre_rango = 'rango';
			if (dicc_to_read==null) {
				dicc_to_read = this.d_rangos;			
			}
			nombre_rango = nombre_rango.trim();               
			const nombres_existentes = Object.keys(dicc_to_read);				
			
			let indice = 0;
			let candidato = nombre_rango+'_0';
			
			while (nombres_existentes.includes(candidato)) {
				candidato = `${nombre_rango}_${indice}`;
				indice += 1;
			}
			return candidato;
		}

		/**
		 * A partir de la celda de inicio y la dimensión devuelve las coordenadas de la celda fin en {fila, columna}
		 * @param {*} celda_inicio 
		 * @param {*} dimension 
		 * @returns 
		 */
        _get_celda_fin(celda_inicio, dimension) {
			try {
				const inicio = this._celda_to_fc(celda_inicio);
				const tam = this._dimension_to_f_x_c(dimension);
				if (!inicio || !tam) return null;
				const fin = {
					fila: inicio.fila + tam.filas - 1,
					columna: inicio.columna + tam.columnas - 1
				};
				return this._celda_to_fc(fin);				
			} catch (error) {
				return null;
			}			
        }
		
		/**
         * ### Devuelve la [ dimensión ] entre dos celdas en formato 'string' u 'object' {filas:int,columnas:int}
         * ### • 'celda_inicio' {String} y celda_fin {String} ► 'A0', 'B2', 'H0', 'M4', ...
         * ### • 'is_str' {Boolean} si es true devuelve la dimensión como cadena "filasxcolumnas". si false devuelve un objeto {filas:int, columnas:int}
		 * ```javascript
		 * const dim_str = this._get_dimension('B2', 'D4');  ► "3x3"
		 * const dim_obj = this._get_dimension('B2', 'D4', false); ► { filas: 3, columnas: 3 }
		 * const dim_obj = this._get_dimension('B2000', 'D4', false); ► null (celda inválida)
		 * ```   */
        _get_dimension(celda_inicio = 'A0', celda_fin = 'A0', b_get_str = true) { 
			try {
				const inicio = this._celda_to_fc(celda_inicio);
				const fin = this._celda_to_fc(celda_fin);
	
				if (!inicio || !fin) return null;
				if (!this._celda_OK(inicio) || !this._celda_OK(fin)) return null;
				// VARIABLES DE RETORNO
				const filas = Math.abs(fin.fila - inicio.fila) + 1;
				const columnas = Math.abs(fin.columna - inicio.columna) + 1;
				const dimension = { filas, columnas };
				// RETORNO
				return b_get_str ? `${filas}x${columnas}` : dimension;				
			} catch (error) {
				return null;
			}               
        }

		/** 
		 * ## Crea y retorna un Rango 'cerrado' con entrada en d_rangos. . . 
		 * ### • d_rangos[nombre_rango] = {celda_inicio:str, celda_fin:str}
		 * ### • No crea un [rango abierto], crea un [rango cerrado], con celda_inicio y celda_fin.
		 * ### • Si lo que necesitas es la 'dimensión' del rango tienes: {@link _get_dimension} si tienes celda-inicio y celda-fin 
		 * ```javascript
		 * this.api_crear_('rango_1', 'C4', '3x4') ► Crea un rango_1 que empieza en C4 y tiene una dimensión de 3x4 filas_x_columnas.
		 * const rango = this.api_crear_('', 'A0', '2x2') ► Crea un rango automático (rango_0, rango_1, ...) que empieza en A0 y tiene una dimensión de 2x2 filas_x_columnas.
		 * if (rango) console.log(`Rango creado ► ${JSON.stringify(rango)}`);
		 * ```	 */
        api_crear(nombre_rango = '', celda_inicio = 'A0', dimension = '1x1', is_basic=false, is_array=false) {
			// Valida
			const coord_ci = this._celda_to_fc(celda_inicio);
			const coord_cf = this._get_celda_fin(celda_inicio, dimension);
			if (!coord_ci || !coord_cf) return null;
			const celda_fin =  this.X_to_celda(coord_cf.fila, coord_cf.columna);

			try {
				const ci_cf = {
					celda_inicio: celda_inicio,
					celda_fin: celda_fin,
				};
				
				const dimension = this._get_dimension(celda_inicio, celda_fin, false);
				
				const ficha = this._get_ficha_vacia();
				// ┌•• Creo el rango asignandole la celda_inicio y celda_fin, con estas, se calcula el resto.
				this.d_rangos[nombre_rango] = ci_cf;			
				
				ficha.celda_inicio = ci_cf.celda_inicio;
				ficha.celda_fin = ci_cf.celda_fin;
				ficha.dimension = dimension;
				ficha.geo = this._get_geo(nombre_rango);
				ficha.items  = this._get_items(nombre_rango);
				ficha.values = this._get_values(nombre_rango, false, true);
				ficha.is_basic = is_basic;
				ficha.is_array = is_array;
				// ┌•• Creo el RANGO
				this.d_rangos[nombre_rango] = ficha;			
				

				// ┌•• Creo el rango asignandole la celda_inicio y celda_fin, con estas, se calcula el resto.
				// this.d_rangos[nombre_rango] = ci_cf;			
				
				// const geometria_relativa = this._get_geo(nombre_rango);		// celda:delta_x, delta_y
				// const valores = this._get_values(nombre_rango, false);		// celda:id    ►  Solo los que tienen valor.
				// const items   = this._get_items(nombre_rango);				// Celda:MyDiv
				// // const dimension = this._get_dimension(celda_inicio, celda_fin, false);
				// // const bool_values = this._get_boolean_values(nombre_rango);
				
				// // ┌•• IMPORTANTE: is_basic dice si un rango es generado en init_rangos_basicos o es de app.
				// // Por defecto, es de app para que haya que escribir explicitamente para hacer uno de init_rangos_basicos(filas, columnas, matriz, collection pares-impares)
				// // is_rinit permite trabajar solo con los rangos de inicio o base y los de app (reservas, temporales, etc....)
				// if (is_basic) 
				// 	this.d_rangos[nombre_rango] = {...ci_cf, dimension: dimension, geo:geometria_relativa, values:valores, items:items, is_basic:true};
				// else
				// 	this.d_rangos[nombre_rango] = {...ci_cf, dimension: dimension, geo:geometria_relativa, values:valores, items:items, is_basic:false};

				// ┌• Retorno
				return this.d_rangos[nombre_rango];
			} catch (error) {
				console.log(error);
				return null;				
			}
		}		

		/**
		 * ### Devuelve un rango del diccionario de rangos.
		 */
		api_read(nombre_rango , dicc_to_read = null) {
			if(!nombre_rango) return null;
			if (dicc_to_read == null) {
				dicc_to_read = this.d_rangos;			
			}
			try {
				nombre_rango = String(nombre_rango).trim();			
				return dicc_to_read[nombre_rango] || null;				
			} catch (error) {
				console.log(error);
				return null;
			}
        }		
		/**
		 * ### Actualiza una entrada en this.dicc_rangos_
		 * NO USADA
		 */
		api_update(nombre_rango, dimension = '1x1', celda_inicio = 'A0', dicc_to_update=null) {
			if(!nombre_rango) return;
			nombre_rango = nombre_rango.trim();
			if (dicc_to_update == null) {
					dicc_to_update = this.d_rangos;			
			}
			// VALIDACION
			const ficha_rango = this.api_read(nombre_rango, dicc_to_update);
			if(!ficha_rango);

			// INICIO - FIN en coordenadas.
			const inicio = this._celda_to_fc(celda_inicio);
			const fin 	= this._get_celda_fin(celda_inicio, dimension);
			if (!inicio || !fin) return false;
			if (!this._celda_OK(inicio) || !this._celda_OK(fin)) return false;
			
			dicc_to_update[nombre_rango] = {
				celda_inicio: this._fc_to_celda(inicio.fila, inicio.columna),
				celda_fin: this._fc_to_celda(fin.fila, fin.columna)
			};
			return dicc_to_update[nombre_rango];
		}
			
		/**
		 * ### Elimina un rango de this.dicc_rangos_	 
		 * ### Retorna el rango eliminado o false si hay error*/
		api_delete(nombre_rango, dicc_to_delete = null) {
			try {
				if(!nombre_rango) throw Error(`Falta 'nombre_rango' (Parametro Entrada)  `)
				if(dicc_to_delete === null) 
					dicc_to_delete = this.d_rangos;
				
				const rango = this.api_read(nombre_rango,  dicc_to_delete);
				if (!rango) throw Error(`Rango ${nombre_rango}, No Existe en el diccionario.`);					

				const retorno = dicc_to_delete[nombre_rango];
				delete dicc_to_delete[nombre_rango];
				return retorno || {};
				
			} catch (error) {
				console.log(`❌Error ::: api_delete() :::`, error);
				return false;
			}
        }		
		/**
		 * ### Devuelve el contenido de this.dicc_rangos_ 
		 * console.log(`◘ RANGOS CREADOS \n ${this.eRdS.listar()}`);
		 */
        listar(dicc_to_list) {
			if(!dicc_to_list) dicc_to_list = this.d_rangos;

			console.log( JSON.stringify(dicc_to_list, 2) );
        }

		/** ## Carga los valores 'desde' matriz_principal 'hasta' el Rango.values 
		 * ### Es conveniente hacer to_pull__ antes de operar con la propiedad 'values' del Rango porque el rango
		 * ### cuando se crea obtiene los valores de la matriz, pero [NO se actualiza]. to_pull__ corrige esto.
		 * ```javascript
		 * const valores = this._matriz_to_rango_('rango_matriz'); ► Actualiza d_rangos['rango_matriz'].values
		 * console.log(valores); ► {A0:'silla_0', A1:'mesa_0', B1:'silla_1'}
		 * ``` */
		to_pull(nombre_rango, show_all=true){
			try {
				const rango_en_d = this.api_read(nombre_rango);
				if(!rango_en_d) throw(`Rango: ${nombre_rango} Not Found`)
				let values_rango = {};
				if (Array.isArray(rango_en_d)){
					// Si el rango de nombre rangos es un array.
					// 🔥 Si el Rango "es un array" de Rangos, es posible que pueda ser pares/nones, u otro's. 
					// 🔥 para que funcione para 'todos', los items tienen que ser los items de cada rango y doy un acumulado.
					let sumatorio_values = {};
					for(const rango of rango_en_d){
						// Creo un rango anonimo que elimino inmediatamente.
						const new_nombre = this._nombre_secuencial('temporal');
						const new_rango = this.api_crear(new_nombre, rango.celda_inicio, rango.dimension, false, false);
						// get_values del rango anonimo
						// const new_values = new_rango.values;
						const new_values = this._get_values(new_nombre, false);
						this.api_delete(new_nombre)
						// acumulado de values.
						sumatorio_values = {...sumatorio_values, ...new_values};
					}	
					values_rango = sumatorio_values;
					
				}else{
					// Obtiene los valores de la matriz(hijos??).
					values_rango = this._get_values(nombre_rango , show_all);					
					// Reasignación para obtener los datos actualizados. 
					rango_en_d.values = values_rango || {};
				}

				return values_rango;			
			} catch (error) {
				console.log(error);
			}
		}	

		/** ### Hace pull a todos los Rangos Registrados */
		pull_all(){
			Object.keys(this.d_rangos).forEach(nombre_rango => { this.to_pull(nombre_rango); });
		}	
		
		/** ## Crea una entrada directa a d_rangos. 
		 * ### • key (string) ► nombre del rango. Si ='', crea un nombre 'rango_X' único para el rango.
		 * ### • valor ► es una ficha-rango completa.
		 * ### ■ devuelve 'key' si se completó con exito y false si no se completó con exito. 	*/
		add_rango(key, valor){
			if(valor && valor.celda_inicio && valor.celda_fin && valor.geo && valor.items  ){		
				// Si no Introduces nombre, creo uno para ti (rango_X)
				if(!key || typeof key != 'string' || key.trim() === ''){
					key = this._nombre_unico();
				}
				if( valor.is_basic != undefined )
					this.d_rangos[key] = {...valor, is_basic:false};
				else	
					this.d_rangos[key] = valor;
				return key;
			}		
		}

		/** ## Devuelve el div que corresponde a una celda en la matriz. */
		celda_to_baldosa(celda){
			const myDiv = this.ref_Salon[this.X_to_indice(celda)];
			if(myDiv) return myDiv?.elemento_div;
		}

		/** ## Hace una Copia de un rango registrado. 
		 * ### Devuelve el nuevo rango si ok y null si algo va mal. */
		_copy_rango(nombre_rango, new_nombre_rango, diccionario_to_inspect){
			// ┌• Seleccionamos el rango sobre el que trabajar.
			if (!diccionario_to_inspect)  diccionario_to_inspect = this.d_rangos;					
			// ┌• Valida si existe en this.d_rangos.
			const rango_a_copiar = this.api_read(nombre_rango);
			if (!rango_a_copiar) return null;

			//┌• Asigno el rango de uno al Nuevo Rango.
			diccionario_to_inspect[new_nombre_rango] = rango_a_copiar;	
			diccionario_to_inspect[new_nombre_rango].is_basic = false;	

			//
			return diccionario_to_inspect[new_nombre_rango];
		}

		/** Entra como nombre o como rango anonimo. Sale el nombre del rango. . . o creado o que ya existe */
		_nombrar_rango_anonimo(rango){
			let filas = -1;
			let columnas = -1;
			let valores_rango_ori = null;
			let rango_ori  = null

			if(typeof rango === 'string'){
				// ■ 'nombre_rango' de d_rangos
				rango_ori = this.api_read(rango);
				if(rango_ori){				
					filas = rango_ori.dimension.filas;
					columnas = rango_ori.dimension.columnas;
					// ┌■ cargo los valores en el rango, pero solo los que tienen datos.
					this.to_pull(rango, false);	
					return rango;
				}

			}else if (typeof rango === 'object'){
				if(rango.celda_inicio && rango.celda_fin && rango.geo ) {
					// ■ Objeto rango.
					const anonimo = this._nombre_secuencial('anonimo');		
					this.add_rango(anonimo, rango);
					// this.api_crear(anonimo, rango_ori.celda_inicio, rango_ori.dimension, false);							
					// this.api_delete(temporal);
					
					// Validacion estricta.
					// if(rango.items == this.d_rangos[anonimo])
					return anonimo;

				}
			}
			
		}
		
		/**
		 * ### Genera los rangos automáticos solicitados: Filas, Columnas, Matriz, Pares y Nones.
		 * 				Se debe llamar tras crear la matriz o si cambian sus dimensiones drásticamente.
		 * @param {Boolean} is_matriz , true, crea rango_matriz 
		 * @param {Boolean} filas , true, crea rango_fila_[0,1,2...]  , un rango_fila por cada fila de la matriz_plana. 
		 * @param {Boolean} columnas , true, crea rango_columna_[0,1,2...]  , un rango_fila por cada columna de la matriz_plana. 
		 * 
		 */
		_init_rangos_basicos(is_matriz=true, filas=true, columnas = true, pares = true, nones = true) {
			const MatriZ = this.ref_Salon.matriz_plana;
			if (MatriZ.length === 0) return;

			// const W_celda = new Working_Celdas(this.ref_matriz); // Para formatear nombres A1, B2...
			const total_filas = this.ref_Salon.total_filas();
			const total_cols = this.ref_Salon.columnas;
			const ultimo_indice = MatriZ.length - 1;

			// ┌•••••••••••••••••••••••••
			// ┌■ RANGO MATRIZ COMPLETA ... Desde (0,0) hasta la última celda real ocupada
			if (is_matriz) {
				const celda_i = this.X_to_celda(0, 0);
				const celda_f = this.X_to_celda(ultimo_indice);
				const dimension = this._get_dimension(celda_i, celda_f);
				this.api_crear('rango_matriz', celda_i, dimension, true);
			}
			
			// ┌•••••••••••••••••••••••••
			// ┌■ RANGOS POR COLUMNA
			if (columnas) {
				for (let c = 0; c < total_cols; c++) {
					const inicio = this.X_to_celda(0, c);
					let fin = inicio;
					for (let f = total_filas - 1; f >= 0; f--) {
						const indice = this.X_to_indice(f, c);
						if (indice !== false) {
							fin = this.X_to_celda(indice);
							break;
						}
					}
					// guardar_rango(`rango_columna_${c}`, inicio, fin);
					
					const dimension = this._get_dimension(inicio, fin);
					this.api_crear(`rango_columna_${c}`, inicio, dimension, true);
				}
			}
			
			// ┌•••••••••••••••••••••••••
			// ┌■ RANGOS POR FILA
			if (filas) {
				for (let f = 0; f < total_filas; f++) {
					const inicio = this.X_to_celda(f, 0);
					let fin = inicio;
					
					for (let c = total_cols - 1; c >= 0; c--) {
						const indice = this.X_to_indice(f, c);
						if (indice !== false) {
							fin = this.X_to_celda(indice);
							break;
						}
					}
					// guardar_rango(`rango_fila_${f}`, inicio, fin);
					const dimension = this._get_dimension(inicio, fin);
					this.api_crear(`rango_fila_${f}`, inicio, dimension, true);
				}
			}

			// ┌•••••••••••••••••••••••••
			// ┌■ PARES E IMPARES (NONES)
			if (pares || nones) {
				const coleccion_pares = [];
				const coleccion_nones = [];
				let celda='';
				for (let i = 0; i <= ultimo_indice; i++) {
					celda = this.X_to_celda(i);
					const entrada = { celda_inicio: celda, celda_fin: celda };

					if (i % 2 === 0 && pares) coleccion_pares.push(celda);
					if (i % 2 !== 0 && nones) coleccion_nones.push(celda);
				}
				
				// if (pares) this.d_rangos['rango_pares'] = coleccion_pares;
				const rangos_pares = coleccion_pares.map( (celda, index) => { return this.api_crear(`pares_${index}`, celda, {filas:1, columnas:1}, true) });
				if (rangos_pares) this.d_rangos['rango_nones'] = rangos_pares;
				
				// if (nones) this.d_rangos['rango_nones'] = coleccion_nones;
				const rangos_nones = coleccion_nones.map( (celda, index) => { return this.api_crear(`nones_${index}`, celda, {filas:1, columnas:1} , true) });
				if (rangos_nones) this.d_rangos['rango_pares'] = rangos_nones;

				coleccion_pares.forEach( (par, i) =>{ this.api_delete(`pares_${i}`); });
				coleccion_nones.forEach( (impar, i) =>{ this.api_delete(`nones_${i}`); });
				
			}
			// ■ Log
			console.log("​​​🧩​ Rangos Básicos ​Generados  • • • ✔️   listar() para ver");
			
	}

	/** ## Obtiene una Matriz relativa a un Rango que contiene la geometría del rango. . . 
	 * Usada en  {@link api_crear}  para la formación de un rango.
	 * ```javascript
	 * { 
	 * 'A0': { fila: 0, columna: 0, delta_y: 0, delta_x: 0 },
	 * 'B0': { fila: 0, columna: 1, delta_y: 0, delta_x: 1 },
	 * 'C0': { fila: 0, columna: 2, delta_y: 0, delta_x: 2 }, . . . }
	 * ```
	 */
	_get_geo(nombre_rango = '') {
		// ┌• Si 'nombre_rango' entra vacio el rango es toda la matriz.
		if (!nombre_rango || typeof nombre_rango !== 'string') nombre_rango = 'rango_matriz';
		// ┌• Y lo valido:
		const rango = this.api_read(nombre_rango);
		if (!rango) return null;
		// Cacho los datos que necesito para recorrer el bucle
		const fc_i = this._celda_to_fc(rango.celda_inicio);
		const fc_f = this._celda_to_fc(rango.celda_fin);
		if (!fc_i || !fc_f) return null;
		// const dimension = this._get_dimension(rango.celda_inicio, rango.celda_fin, false);
		// if (!dimension) return null;
		// ┌• Preparo el parametro de retorno y recorro el bucle:
		let dicc_retorno = {};		
		for (let fila = fc_i.fila; fila <= fc_f.fila; fila++) {
			for (let columna = fc_i.columna; columna <= fc_f.columna; columna++) {
				const celda = this._fc_to_celda(fila, columna);
				const ficha_geo = {
					// fila: fila,
					// columna: columna,
					delta_y: fila - fc_i.fila,
					delta_x: columna - fc_i.columna
				};
				dicc_retorno[celda] = ficha_geo
			}
		}

		return dicc_retorno;
	}

	/**
	 * ## Devuelve un diccionario {celda:myDiv}  con los objetos myDivs (Baldosas) del rango solicitado. 
	 * ### • Si una celda no tiene elemento asociado en this.matriz_plana se devuelve null.
	 * @param {String} nombre_rango Nombre del rango sobre el que vamos a trabajar.
	 * ```javascript
	 * const elementos = this.eRdS._get_items_(); ► ► {A0:myDiv, A1:myDiv, A2:myDiv, B0:myDiv, . . . ,H14:myDiv }
	 * const elementos_2 = this.eRdS._get_items_('rango_fila_2'); ► {B0:myDiv, B1:myDiv, B2:myDiv, C0:myDiv, . . . }
	 * ```	 */
	_get_items(nombre_rango = '', b_get_mydiv=false) {
		
		const MatriZ = this.ref_Salon.matriz_plana;

		if (!nombre_rango || typeof nombre_rango != 'string') 
			nombre_rango = 'rango_matriz';

		const rango_en_d = this.api_read(nombre_rango.trim());
		if (!rango_en_d) return null;
		
		// ┌•• •••••    •••••••••••
		// ┌■■ Array or Rectangular?
		if (Array.isArray(rango_en_d)){
			// 🔥 Si el Rango "es un array" de Rangos, es posible que pueda ser pares/nones, u otro's. 
			// 🔥 para que funcione para 'todos', los items tienen que ser los items de cada rango y doy un acumulado.
			let sumatorio_items = {};
			for(const rango of rango_en_d){
				const items = rango.items;
				sumatorio_items = {...sumatorio_items, ...items};
			}

			return sumatorio_items;
		}
		// ┌•••••••••••••••••••••••••••••••••••••••••••••••••
		// ┌■ Manejo especial para rangos de pares y nones
		// ┌•• Es especial porque no son rangos rectangulares, son colecciones de celdas.
		// if (nombre_rango == 'rango_pares' || nombre_rango == 'rango_nones') {
		// 	const resultado = {};
		// 	for (const celda of rango_en_d) {
		// 		const indice = this.X_to_indice(celda);
		// 		// ┌• Si el indice es false, la celda no pertenece a la matriz y devuelve null.
		// 		// ┌• Si el indice es válido, devuelve el elemento myDiv o null si no existe.
		// 		const elemento = (indice === false) ? null : (MatriZ[indice] ?? null);
		// 		// resultado[celda] = elemento;
		// 		resultado[celda] = elemento.elemento_div.id;
		// 	}
		// 	return resultado;
		// }

		
		// ┌•••••••••••••••••••••••
		// ┌■ Rangos rectangulares
		// ┌•••••••••••••••••••••••
		const inicio = this._celda_to_fc(rango_en_d.celda_inicio);
		const fin = this._celda_to_fc(rango_en_d.celda_fin);

		if (!inicio || !fin) return null;

		const fila_inicio = Math.min(inicio.fila, fin.fila);
		const fila_fin = Math.max(inicio.fila, fin.fila);
		const col_inicio = Math.min(inicio.columna, fin.columna);
		const col_fin = Math.max(inicio.columna, fin.columna);

		const resultado = {};

		for (let fila = fila_inicio; fila <= fila_fin; fila++) {
			for (let col = col_inicio; col <= col_fin; col++) {
				const celda = this._fc_to_celda(fila, col);
				const indice = this.X_to_indice(fila, col);
				// ┌• Si el indice es false, la celda no pertenece a la matriz y devuelve null.
				// ┌• Si el indice es válido, devuelve el elemento myDiv o null si no existe.
				const elemento = (indice === false) ? null : (MatriZ[indice] ?? null);
				

				if(b_get_mydiv){
					// ┌• Meto el objeto myDiv 
					resultado[celda] = elemento;
				}else{
					// ┌• Meto el id del elemento. (A0:'gran_salon_0')
					resultado[celda] = elemento.elemento_div.id;
				}	
			}
		}

		return resultado;
	}
	/**
	 * ### • Devuelve un dicc con el 'id del contenido' o el elemento en cada celda del rango.
	 * ### • Las celdas sin contenido devuelven false y las que no existen, null.
	 * ### • NOTA: b_get_elemento = true para los elementos ghost, no para los rangos ordinarios.
	 * ### • ES UN METODO FUNDACIONAL DE LOS 'RANGOS'
	 * @param {String} nombre_rango Nombre del rango del que queremos contenido.
	 * @param {Boolean} b_show_all Indica si se muestran todas las celdas (true) o solo las que tienen contenido (false).
	 * @param {Boolean} b_get_elemento true=devuelve el elemento y no el id. false=devuelve el id no el elemento.
	 * [RETORNO] diccionario o null si el rango no existe.
	 * ```javascript
	 * 1) const pares = this._get_values('rango_pares', false); // ►{E0:"mesa_9",G1:"silla_12",G2:"mesa_22",G3:"silla_5",C6:"silla_1"}
	 * 2) const nones = this._get_values('rango_nones', true); //  ►{A0:false,C0:false,E0:"mesa_9",G0:false,A1:false,C1:false,E1:false,...
	 * 3) const values = this._get_values('rango_1', false, true); // ► { A0:<element>,B0:<element>,E0:<element>, . . . }
	 * 4) const values = this._get_values('rango_1', true, true);  // ► { A0:<element>,A1:false,A2:false, B0:<element>, . . . }
	 * 5) const values = this._get_values('rango_1'); //  ► { A0:'silla_0',A1:false,A2:false, B0:'mesa_0', . . . }
	 * ```	 */
	_get_values(nombre_rango = '', b_show_all = true, b_get_elemento=false) {
		const dicc_celda_idbaldosa = this._get_items(nombre_rango);
		if (!dicc_celda_idbaldosa) return null;
		const d_values = {};
		for (const [celda, id_baldosa] of Object.entries(dicc_celda_idbaldosa)) {
			if (!id_baldosa) {
				d_values[celda] = false;
				continue;
			}
			const baldosa = document.getElementById(id_baldosa);
			if(!baldosa) continue;
			const el_sobre_ella = baldosa?.firstElementChild;
			if (b_show_all == true) {
				d_values[celda] = el_sobre_ella instanceof HTMLElement ? (el_sobre_ella?.id) : false;							
			}else if (b_show_all == false) {
				if (el_sobre_ella instanceof HTMLElement) {
					if(b_get_elemento)
						d_values[celda] = el_sobre_ella;
					else
						d_values[celda] = el_sobre_ella.id;
				}
			}
		}
		return d_values;
	} 

	

	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ FUNCIONES DE RANGOS ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
	
	/**
	 * ## Informa si cada celda de un rango tiene contenido dentro del objeto myDiv.
	 * ### • Si la celda no pertenece a la matriz devuelve null en su lugar.
	 * @param {String} nombre_rango Nombre del rango a recuperar.
	 * @param {Boolean} b_show_all true, Indica si se muestran todas las celdas del rango | false devuelve solo las celdas que tienen contenido.
	 * @returns {Object|null} Diccionario { celda: true|false } | null si el rango no existe.
	 * ```javascript
	 * let contenido = this._get_boolean_values(rango, false); ►{"E0":true,"G1":true,"G2":true,"G3":true,"C6":true}
	 * contenido = this._get_boolean_values(rango, true);  ►{"A0":false,"C0":false,"E0":true,"G0":false,"A1":false,"C1":false,"E1":false,...
	 */
	_get_boolean_values(nombre_rango = '', b_show_all = true) {
		const dicc_celda_idbaldosa = this._get_items(nombre_rango);
		if (!dicc_celda_idbaldosa) return null;
		const resultado = {};
		for (const [celda, id_baldosa] of Object.entries(dicc_celda_idbaldosa)) {
			if (id_baldosa === null) {
					resultado[celda] = null;
					continue;
			}
			const baldosa = document.getElementById(id_baldosa);
			if(!baldosa) continue;
			const nodo = baldosa?.elemento_div;
			if (b_show_all == true) {
				resultado[celda] = nodo instanceof HTMLElement ? nodo.childElementCount > 0 : false;
			}else if (b_show_all == false) {
				if (nodo.childElementCount > 0) resultado[celda] = true;				
			}
		}
		return resultado;
	}

	/**
	 * ### Devuelve el contenido (primer hijo) de la celda indicada o null si está vacía o no existe.
	 * @param {String} celda Nombre de la celda en cualquier notación válida heredada de Working_Celdas.
	 * @returns {HTMLElement|null} id del elemento contenido en la celda o null si no hay contenido o la celda no pertenece a la matriz.
	 * @example contenido = this._get_value_celda_('B7'); 	► 'silla_3'
	 */
	_get_celda_value(celda = '') {
		if (!celda || typeof celda !== 'string') return null;

		const indice = this.X_to_indice(celda);
		if (indice === false) return null;

		const myDiv = this.matriz_plana?.[indice];
		if (!myDiv || !myDiv.elemento_div) return null;

		const contenido = myDiv.elemento_div.firstElementChild;
		return contenido instanceof HTMLElement ? contenido : null;
	}

	

	/**
	 * ### Busca un id de contenido dentro de la matriz y devuelve la celda donde se encuentra.
	 * @param {String} id_contenido Identificador del contenido a localizar.
	 * @returns {String|null} Celda en formato "A0", "B7"... o null si no se encuentra.
	 */
	_search_celda(id_contenido = '') {
		if (!id_contenido || typeof id_contenido !== 'string') return null;
		const buscado = id_contenido.trim();

		const MatriZ = this.ref_Salon.matriz_plana;		

		if (!Array.isArray(MatriZ) || MatriZ.length === 0) return null;
		for (let i = 0; i < MatriZ.length; i++) {
			const myDiv = MatriZ[i];
			if (!myDiv || !myDiv.elemento_div) continue;
			const contenido = myDiv.elemento_div.firstElementChild;
			if (contenido instanceof HTMLElement && contenido.id === buscado) {
				return this.X_to_celda(i);
			}
		}
		return null;
	}
	
	/**
	 * ### Indica si todas las celdas del rango están vacías (sin id de contenido).
	 * @param {String} nombre_rango Nombre del rango a comprobar.
	 * @returns {Boolean|null} true si todas las celdas son null, false si hay algún id, null si el rango no existe.
	 * @example const isEmpty = this._is_vacio('rango_libre'); ► true = vacio | false = con contenido | null = rango no existe
	 */
	_is_vacio(nombre_rango = '') {
		const contenidos = this._get_values(nombre_rango);
		if (!contenidos) return null;
		return Object.values(contenidos).every((valor) => valor === false);
	}

	/**
	 * ### "Busca, el primer rango-free (sin hijos) de 'esta' dimensión, a partir de 'esta' celda".
	 * @param {String} dimension Texto con formato 'filasXcolumnas' (por ejemplo, '3x4').
	 * @param {String} celda_inicio Celda desde la que comenzar la búsqueda (por ejemplo, 'C2').
	 * ### Coordenadas de inicio y fin del rango libre, o null si no se encuentra.
	 * ```javascript 
	 * const rango_free = this._busca_dimension_free('3x4', 'C2'); ► { celda_inicio: 'D4', celda_fin: 'F6'
	 * ``` 	 */
	_busca_dimension_free(dimension = '', celda_inicio = 'A0') {
			// ■ Obtiene dimensiones del rango y celda de inicio en formato fila/columna
			const fxc_dimension = this?._dimension_to_f_x_c(dimension);
			const coord_ci = this?._celda_to_fc(celda_inicio);
	
			// ■ Valida datos
			if (!fxc_dimension || !coord_ci) return null;
	
			// ■ Cacha totales de la clase matriz_plana (ref_matriz_plana)
			const total_filas 	 = this.ref_Salon.total_filas();
			const total_columnas = this.ref_Salon.columnas;
	
			// ■ Valida dimension
			if (!Number.isInteger(total_filas) || !Number.isInteger(total_columnas)) return null;
			if (fxc_dimension.filas <= 0 || fxc_dimension.columnas <= 0) return null;
			if (fxc_dimension.filas > total_filas || fxc_dimension.columnas > total_columnas) return null;
	
			// ■ Proceso_Busqueda: Recorre todas las posibles posiciones de inicio del bloque
			for (let fila = coord_ci.fila; fila <= total_filas - fxc_dimension.filas; fila++) {
				const columna_inicio = fila === coord_ci.fila ? coord_ci.columna : 0;
				for (let columna = columna_inicio; columna <= total_columnas - fxc_dimension.columnas; columna++) {
					if (this.__es_bloque_libre(fila, columna, fxc_dimension.filas, fxc_dimension.columnas)) {
						const celda_i = this._fc_to_celda(fila, columna);
						const celda_f = this._fc_to_celda(fila + fxc_dimension.filas - 1, columna + fxc_dimension.columnas - 1);
						return { celda_inicio: celda_i, celda_fin: celda_f };
					}
				}
			}
			// ■ Si no se encuentra ningún bloque libre, devuelve null
			return null;
	}
	/**
	 * ### Recorre el rango pasado como argumento y comprueba si todas las celdas estan vacias. 
	 * ### usado en {@link _busca_dimension_free}
	 * @param {*} fila_inicio fila de la celda de inicio del rango.
	 * @param {*} columna_inicio columna de la celda de inicio del rango.
	 * @param {*} dim_rows altura del rango (número de filas).
	 * @param {*} dim_cols num_cols del rango (número de columnas).
	 * @returns true, si todas las celdas del rango estan vacias, false si alguna tiene contenido o no existe.
	 * ```javascript
	 * const is_free = this.__es_bloque_libre_(2, 3, 4, 5); ► true|false
	 * ```
	 */
	__es_bloque_libre(fila_inicio = 0, columna_inicio = 0, dim_rows = 1, dim_cols = 1) {
		// ┌•• Cachamos la MatriZ
		const MatriZ = this.ref_Salon.matriz_plana;

		if (dim_rows <= 0 || dim_cols <= 0) return false;

		for (let fila = fila_inicio; fila < fila_inicio + dim_rows; fila++) {
			for (let columna = columna_inicio; columna < columna_inicio + dim_cols; columna++) {
				// 1. Obtener índice matricial
				const indice = this.X_to_indice(fila, columna);
				if (indice === false) return false;
				// 2. Obtener el objeto MyDiv directamente de la referencia a la matriz
				const myDiv = MatriZ[indice];					
				// 3. Chequeo: Si encontramos UNA sola celda ocupada o inválida, el bloque no sirve.					
				const is_myDiv_vacio = Boolean(myDiv.elemento_div.children.length === 0);
				if (!is_myDiv_vacio) 
					return false; 				
			}
		}
		return true;
	}	
	/**
	 * ### Verifica de manera agnóstica si una baldosa (MyDiv) está vacía.
	 * ### Se considera vacía si el elemento DOM asociado no tiene hijos (Elementos HTML).
	 * @param {MyDiv} myDiv - El objeto de la estructura de datos (matriz_plana[i]).
	 * @returns {Boolean} true si está vacía, false si tiene contenido (mesa/silla) o error.
	 */
	_is_myDiv_vacio(myDiv) {
		// 1. Validaciones de seguridad (KISS: si no existe, no está vacía, es un error)
		if (!myDiv || !myDiv.elemento_div) return false;

		// 2. Comprobación de contenido DOM.
		// Usamos 'children.length' en lugar de 'hasChildNodes()'.
		// ¿Por qué? 'hasChildNodes' devuelve true si hay saltos de linea (texto vacío).
		// 'children' solo cuenta Elementos HTML (<div>, <img>, etc), que es lo que nos importa (Mesas/Sillas).
		return Boolean(myDiv.elemento_div.children.length === 0);
	}

	
	
	

	/** ## Devuelve: celda_i | celda_f | geo.delta_x | geo.delta_y | dimension.filas | dimension.columnas | celdas_valor | celdas_baldosa */
	__print_all_info(nombre_rango){
		const rango = this.api_read(nombre_rango);
		if(!rango) return null;
		const ficha = {
			celda_inicio:rango.celda_inicio,
			celda_fin:rango.celda_fin,
			dimension: {filas: rango.dimension.filas, columnas:rango.dimension.columnas},
			geo: {delta_x: rango.geo.delta_x, delta_y: rango.geo.delta_y},
			values: rango.values,
			items: rango.items,			
		}
		console.log(`${ficha.celda_inicio}`)
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
	 * ``` */
	_get_geometria_relativa(foto_reservas) {
		const arr_retorno = [];

		foto_reservas.forEach((reserva, i) => {
			
			// ┌• Cacho todos los IDs de la reserva			
			const mesas = Array.isArray(reserva?.mesas) ? reserva.mesas : [];
			const sillas = Array.isArray(reserva?.sillas) ? reserva.sillas : [];
			const ids_items = [...mesas, ...sillas].filter(Boolean);
			if (ids_items.length === 0) return [];

			// ┌••   •••••••••••••  •••••••••••••••••••
			// • • • Caso especial: reservas sin mesas. Las sillas se agrupan en línea
			// para compactar la geometría y facilitar el re_posicionamiento.
			if (mesas.length === 0 && sillas.length > 0) {
				const items_geometria = [];
				sillas.forEach((id, index) => {
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

			// ┌••   •••••••••••  •••••••••••••••••••
			// • • • Caso normal: Reservas Rectangulares.
			// ┌•• Calcular Mínimos y Máximos para definir el rango
			let minF = Infinity, maxF = -Infinity, minC = Infinity, maxC = -Infinity;
			const elementos_con_coordenadas = [];
			
			// ┌•• Recolectar coordenadas 
			ids_items.forEach(id => {
				// ┌•• Clase Rango para consultar la celda. Si la matriz está vacía, no se procesa.
				const celda = this._search_celda(id); 
				if (celda) {
					const fc = this._celda_to_fc(celda);
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
					const fc_item = this._celda_to_fc(celda_original);
					
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
	/** ## Devuelve un array de los nombres de las celdas de un rango */
	_get_celdas(nombre_rango){
		if(!nombre_rango) nombre_rango = 'rango_matriz';
		nombre_rango = nombre_rango.trim();
		
		// ┌• Valida si existe en this.d_rangos.
		const rango = this.api_read(nombre_rango);
		if (!rango) return null;
		
		// ┌• X Si viene un [ARRAY de Rangos]  🌶️🌶️
		if (Array.isArray(rango)) {
			const rango_filtrado = rango.filter(ran => typeof ran === 'string' && ran.trim() !== '');
			return rango_filtrado || this._get_ficha_vacia() || {};
		}
		
		// ┌• X Si viene como rango
		if (rango?.items && typeof rango.items === 'object') {
			return Object.keys(rango.items);
		}
		
		// ┌• X Si viene como nombre del rango
		const items = this._get_items(nombre_rango);
		return items ? Object.keys(items) : null;
	}	

		

	/**	## Entra un 'array de nombres de celda' y devuelve el menor izquierdo y el mayor derecho 
	 * ### {@link _get_union} devuelve el array de celdas por reserva, esta funcion devuelve celda_inicio y celda_fin de un array.
	 * con celda_inicio y celda_fin luego crearemos un rango a partir de la union de dos rangos. 
	 * De esta forma, la union de dos rangos da un Rango o una Collecction.
	 */
	__get_cicf_from_celdas(array_celdas){
		const ficha = this._get_ficha_vacia();
		
		// ■ Reserva con mesas: calculo el rango que abarca todas sus celdas.
		let minFila = Infinity; let maxFila = -Infinity; let minCol = Infinity; let maxCol = -Infinity;

		// ┌■ LOCALIZANDO LOS 'BORDES' DE LA CAJA: 
		// ┌• (minFila, minCol) = celda superior izquierda 
		// ┌• (maxFila, maxCol) = celda inferior derecha
		array_celdas.forEach(celda => {
			const fc = this._celda_to_fc(celda);
			if (!fc) return;
			if (fc.fila < minFila) minFila = fc.fila;
			if (fc.fila > maxFila) maxFila = fc.fila;
			if (fc.columna < minCol) minCol = fc.columna;
			if (fc.columna > maxCol) maxCol = fc.columna;
		});
		if (!Number.isFinite(minFila) || !Number.isFinite(minCol)) return;
		const celda_inicio = this._fc_to_celda(minFila, minCol);
		const celda_fin = this._fc_to_celda(maxFila, maxCol);
		const dimension = this._get_dimension(celda_inicio, celda_fin, false);
		if(celda_inicio && celda_fin && dimension) 
			return {celda_inicio, celda_fin};
		else
			return null;
	}

	/** ## De una celda-inicio y celda-fin conseguimos la dimensión y devolvemos un 'rango continuo' del Salon */
	_get_rango_from_cicf(celda_inicio = 'A0', celda_fin = 'C4'){
		// Valida
		const coord_ci = this._celda_to_fc(celda_inicio);
		const dimension = this._get_dimension(celda_inicio, celda_fin, false);
		const coord_cf = this._get_celda_fin(celda_inicio, dimension);
		if (!coord_ci || !coord_cf) return null;
		
		// const celda_fin =  this.X_to_celda(coord_cf.fila, coord_cf.columna);
		
		try {
			const ci_cf = {
				celda_inicio: celda_inicio,
				celda_fin: celda_fin,
			};
			
			// ┌■ TRUCO:: Creo una entrada en d_rangos 'floja' (solo con ci y cf), y a partir de ahí genero el resto y actualizo.
			// ┌•• Creo un nombre secuencial sobre 'temporal' para un rango temporal.
			const nombre_temp = this._nombre_secuencial('anonimo');
			if(!nombre_temp) throw(`Error en el nombre secuencial`);
			
			// ┌•• Creo el rango asignandole la celda_inicio y celda_fin, con estas, se calcula el resto.
			this.d_rangos[nombre_temp] = ci_cf;							
			// ┌•• Los otros elementos del rango se calculan sobre un rango creado:
			const geometria_relativa = this._get_geo(nombre_temp);		// celda:delta_x, delta_y
			const valores = this._get_values(nombre_temp, false);		// celda:id    ►  Solo los que tienen valor.
			const items   = this._get_items(nombre_temp);				// Celda:MyDiv
			
			// ┌•• Ficha de un Rango 
			const ficha = this._get_ficha_vacia(false);
				ficha.celda_inicio = ci_cf.celda_inicio;
				ficha.celda_fin = ci_cf.celda_fin;
				ficha.dimension = dimension;
				ficha.geo = geometria_relativa;
				ficha.values = valores;
				ficha.items = items;
	
			this.api_delete(nombre_temp);
			
			// ┌•• Devuelvo el rango No Registrado. Si lo quieres registrar es cosa tuya ;)
			return ficha ? ficha : null;

		} catch (error) {
			console.log(error);
			return null;				
		}
	}

	/** */
	_get_ficha_vacia(is_basic=false , is_array = false){
		const is_basic_value = (typeof is_basic === 'boolean') ? is_basic : false;
		const is_array_value = (typeof is_array === 'boolean') ? is_array : false;

		const ficha_rango = {
			celda_inicio:'',
			celda_fin:'',
			dimension: {filas: 0, columnas:0}, 
			geo:{}, 
			values:{}, 
			items:{}, 
			is_basic:is_basic_value,
			is_array:is_array_value,
		};
		return ficha_rango;
	}
	
	/** ## Crea un rango "temporal" en "this.d_termporales"
	 * ### Hay que llamar a [destruye_temporales] para eliminar pero puedes eliminar todos los temporales, uno solo o toda una familia.
	 */
	crear_temporal(celda_inicio, dimension){
		
		const nombre_temporal = this._nombre_secuencial('temporal');	
		if(!nombre_temporal) return null;		
		// ┌• Introduce en this.d_rangos y lo organiza en this.d_termporales	
		this.d_termporales[nombre_temporal] = this.api_crear(nombre_temporal, celda_inicio, dimension, false);		
		// ┌• Lo borro de d_rangos. De esta manera solo queda en this.d_termporales
		this.api_delete(nombre_temporal);	
		
		// ┌• Retorna el nombre del temporal creado en this.d_termporales
		return nombre_temporal;

	}
	/** ## Elimina 'rangos temporales'  de [d_rangos] y [rangos.temp] 
	 * ### [ Se crea un temporal con  {@link crear_temporal} ]
	 * ### 
	 * ### only_one:(str):  true  ► busca solo ese rango y si existe lo elimina.
	 * ###  				false ► Intenta eliminar toda la familia de este rango (startswith)
	 * ```javascript
	 * • destruye_temporales(); //Elimina todos los temporales.
	 * • destruye_temporales('temporal', true); // Elimina solo el rango 'temporal' (by Def)
	 * • destruye_temporales('temporal', false); // Elimina todos los rangos que empiecen por 'temporal'
	 * ``` 
	 * 	 */
	destruye_temporales(nombre_rango, only_one=true){
		const temporales = this.d_termporales;
		if(this.d_termporales == {}) return;

		if(!nombre_rango){
			// ┌■ Elimina 'todos' los temporales.
			Object.keys(temporales).forEach(nombre_temporal =>{
				this.api_delete(nombre_temporal, this.d_termporales);
			});		
			return;
		}
		if(nombre_rango && only_one){
			// ┌■ (byDef) - Elimina 'sólo este rango'. Si no existe no posa nada.
			this.api_delete(nombre_rango, this.d_termporales);

		}else if(nombre_rango && !only_one){
			// ┌■ Elimina la 'familia' (startswith)
			const criterio = nombre_rango.toLowerCase();
			Object.keys(temporales).forEach((nombre_temporal) => {
				if (nombre_temporal.toLowerCase().startsWith(criterio)) {
					this.api_delete(nombre_temporal, this.d_termporales);
				}
			});
		}

	}
	
	


	// get d_rangos(){ return this.d_rangos || {}; }
	get diccionario(){ return this.d_rangos || {}; }

}	// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ FIN CLASE  WORKING_RANGE

class Rango_Ghost extends Working_Rangos{
	/**
	 * ## Establece los Rangos Ghost y las operaciones que se pueden realizar con ellos. */
	constructor(instancia_matriz_plana = null) {			
		if (!instancia_matriz_plana) return null;		
		// ┌■ 
		super(instancia_matriz_plana);	

		// ┌•• Diccionario de rangos ghost.
		this.d_ghost = {};		
		
		// ┌•• copia de d_ghost en origen de posicion. y vale para 'volver atras' una acción.
		// ┌• . . . NOTA: Si hago mover_cursor varias veces, no tiene sentido que reflex tenga todos esos datos
		// ┌• . . . perdiendo el dato que lo cargó. reflex es una copia de d_ghost 
		this.reflex = {};		

		this.stt = {
			cut:false,		// true en 'cut_ghost()' y pone a false [copy].
			copy:false,		// true en 'copiar_ghost()' y pone a false [cut].
			paste:0,		// cuenta el numero de pastes realizados desde el ultimo 'cut_copy'. . . paste_ghost()
			cursor:'A0',	// la última posición del cursor. . . mover_cursor()
			name:'anonimous',  // El nombre del rango de donde viene o anonimous en caso de no venir de ningún rango con nombre.
		}

		/** 
		 * ## Dicc celda:elemento_dom . . . C3:{object de silla_1} de 'todos' los elementos pegados nuevos en el Salon con ghost.
		 * ## "Se llena" con llenar_buffer(). Cuando "se Pide" con vaciar_buffer(), "se Devuelve" pero tambien "se Vacía".
		 * DEBE SER USADO SOBRE TODO EN PEGAR_GHOST QUE ES DONDE SE CONSTRUYEN LOS ELEMENTOS NUEVOS 
		 * C3:{object de silla_1} de 'todos' los elementos generados y movidos con ghost		 * */
		this.buffer={};
    }

	/** ## Un Rango 'ghost' es un marco 'invisible' que se coloca sobre el Salon Cogiendo, Yendo, Viniendo y Pegando.
	 * ### • El parametro de entrada puede ser:
	 * #### 1- Dimension en formato '3x4' o {filas:int, columnas:int} , y generará un rango de 3 filas y 4 columnas desde 'A0'
	 * #### 2- Nombre_rango(string)  del diccionario de rangos. 'ghostiza' el rango posicionandose encima y tomando sus datos.
	 * #### 3- Un rango anonimo: { celda_inicio:str, celda_fin:str, dimension:{}, geo:{}, items:{}, values:{} }
	 * #### Devuelve el nombre del ghost recien creado o null. 
	 * ```javascript
	 * ghost('3x4');
	 * ghost({filas:3, columnas:4});
	 * ghost('rango_fila_0');	
	 * ghost({celda_inicio:'A0', celda_fin:'E2', dimension:{filas:3, columnas:5} , geo:{}, items:{}, values:{} });
	 * ```	 */
	_ghost(argumento){
		if(!argumento) return null;
		// ┌••••••••••••••••••••••••••••••••••••••••••
		// ┌• El parametro de entrada puede ser:
		// 		1- una dimension en formato '3x4' o {filas:int, columnas:int} 
		// 		2- nombre_rango(string)  or  un rango anonimo: { celda_inicio:str, celda_fin:str, dimension:{}, geo:{}, items:{}, values:{} }
		let filas =  -1;
		let columnas = -1;
		
		let rango_ori  = null;
		if (Array.isArray(argumento)) {
			// ┌■■ Puede ser: 'union' / 'pares' / 'nones' / 'sillas_ronin' / 'interseccion'
			// ┌■■ Entra un Array!!! de Rangos
			const new_ghost = this._crear_ghost_desde_array(argumento);
			if(!new_ghost) throw Error('ghost::: crear desde array error.')
			this.d_ghost.is_array = true;

		}else if(typeof argumento === 'string'){
			const dimension_es = this._get_dimensiones_3x4(argumento);
			if(dimension_es) {
				// ■ dimension '3x4'
				filas = dimension_es.filas;
				columnas = dimension_es.columnas;
				this._crear_ghost_desde_dimension(filas, columnas);

			} else{ 			
				// ■ 'nombre_rango' en d_rangos 
				// • rango_pares o rango_nones además de cualquier rango_fila, rango_columna,. . .
				rango_ori = this.api_read(argumento);

				if(rango_ori && Array.isArray(rango_ori)){
					// 🔥 Es rango basico array de Rangos (rango_pares, rango_nones) 🔥
					const values_argumento = this.to_pull(argumento);	
					const new_ghost = this._crear_ghost_desde_array(rango_ori);
					new_ghost.values = values_argumento;
					
					// Si es un array nombrado y es array cambia items y pasa a tener solo las celdas implicadas.
					let d_new_items={}
					Object.entries(new_ghost.items).forEach(([celda, baldosa])=>{
						const celdas_match = Object.keys(values_argumento);
						if(celdas_match.includes(celda)){
							d_new_items[celda] = baldosa;
						}
					});
					new_ghost.items = d_new_items;
					new_ghost.is_array = true;					
					
					this.d_ghost = new_ghost;			

				}else if(rango_ori && !Array.isArray(rango_ori)){				
					// Es un rango del diccionario de rangos 'd_rangos' REGULAR.  'SE GHOSTIZA ASIGNANDOSE A ghost despues de pull'.
					// filas = rango_ori.dimension.filas;
					// columnas = rango_ori.dimension.columnas;
					
					// ┌■ cargo los valores en el Rango, pero solo los que tienen datos.
					this.to_pull(argumento, false);	
					this.d_ghost = rango_ori;

					// 💦 💦 💦 💦 argumento es una Dimension {filas:3, columnas:4}
					// this._crear_ghost_desde_dimension(filas, columnas);
				}else{
					return this._get_ficha_vacia() || null;
				}
			}
		}else if (typeof argumento === 'object'){
			if(argumento.celda_inicio && argumento.celda_fin && argumento.geo ) {
				// ■ Objeto rango.
				rango_ori = argumento;
				this._crear_ghost_desde_rango(rango_ori);
			}else if(argumento.filas && argumento.columnas){
				// ■ Objeto dimension.
				filas = argumento?.filas;
				columnas = argumento?.columnas;
				this._crear_ghost_desde_dimension(filas, columnas);
			}
		}

		this.reflex	= this.d_ghost;
		
		this.stt.copy = true; this.stt.cut = false;
		this.stt.paste = 0;
		
		// Cursor solo se cambia en ghost(aquí) y en mover_cursor()
		this.stt.cursor = this.d_ghost.celda_inicio;

		// 🍏
		this.read_ghost('Ghost');
		// ┌■ RETORNO
		return this.d_ghost;
		
	}

	/** */
	_crear_ghost_desde_rango(rango_ori){
		// ┌■■ El proceso consiste en llenar de datos this.d_ghost(celda_inicio, celda_fin, dimension, geo, values, items)
		// ┌■■ Para esto creo un rango en d_rangos con crear, esto llena (celda_ini, celda_fin, dimension y geo.). Luego, reasigno values.
		const valores_rango_ori = rango_ori.values;
		// ┌• Aseguramos que le pasa los elementos en lugar de los id's... RECUERDA ► "ghost maneja elementos, rangos maneja id's"			
		let values_element_rango_ori=null;
		if (valores_rango_ori) {
			values_element_rango_ori = Object.fromEntries(
				Object.entries(valores_rango_ori).map(([celda, id]) => [
					celda, 
					this._X_to_element(id)
				])
			);
		}
		// rango_ori.values = values_element_rango_ori;
		// this.d_ghost = rango_ori;						
		const ghost_name = this._nombre_secuencial('ghost');					
		// ┌■■ Al Crear el Rango, coje los values del Salon y si el salon está vacio(cuando viene de bdd) pierde los values(={})
		this.d_ghost = this.api_crear(ghost_name, rango_ori.celda_inicio, rango_ori.dimension, false);			
		this.api_delete(ghost_name);
		// ┌■ Re-asigno 'values', pero ahora con los elementos_dom en lugar de con los 'id's'
		this.d_ghost.values = values_element_rango_ori;		// this.d_ghost.values = this._get_values(ghost_name, false, true);

		// ┌■ Retorno
		return this.d_ghost;
	}

	/** */
	_crear_ghost_desde_dimension(filas, columnas){
		// ┌•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
		// ┌• Si llego aquí, argumento es una dimension {filas:3, columnas:4}
		// El proceso es el siguiente:
		// • Se pone el cursor(celda_inicio) en A0. Se calcula la dimension y el rango. Luego se puede calcular geo, items y values
		// • 
		// ┌•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
		// simulo un Rango desde A0 para obtener geo.
		const new_dimension = {filas:filas, columnas:columnas};
		// ┌• Cuando llama a _ghost solo con dimension situa el cursor en  'A0'
		const ci = 'A0';
		const cf = this._get_celda_fin(ci, new_dimension);
		if(!cf) return null;
		const ghost_name = this._nombre_secuencial('ghost');		
		const ficha = this._get_ficha_vacia();
		
		// ┌■ Registro el Rango  con datos vacios
		this.d_rangos[ghost_name] = ficha;
		// ┌■ Relleno los datos necesarios para obtener geo, items y values. 
		this.d_rangos[ghost_name].celda_inicio = ci;
		this.d_rangos[ghost_name].celda_fin = cf;
		this.d_rangos[ghost_name].dimension = new_dimension;		

		// ┌■ Obtengo geo, items y values.
		const geo = this._get_geo(ghost_name);
		const items = this._get_items(ghost_name);
		// ┌■ 🔥 Values lo intenta cachar del salon(puede venir vacío)
		const values = this._get_values(ghost_name, false , true);
		
		// ┌■ Asigno los valores
		this.d_rangos[ghost_name].geo =  geo ? geo : {};
		this.d_rangos[ghost_name].items = items ? items : {};
		this.d_rangos[ghost_name].values = values ? values : {};
		
		// ┌■ Lo asigno a ghost 
		this.d_ghost = this.d_rangos[ghost_name];
		
		// ┌■ Lo Elimino de d_rangos
		this.api_delete(ghost_name);	
		
		// ┌■ Retorno
		return this.d_ghost;
	}

	/** ## Hace el tratamiento de array de un ghost {@link _ghost} */
	_crear_ghost_desde_array(argumento){
		const array_rangos = argumento;
		let sumatorio_values = {};
		let sumatorio_items = {};
		// Cachada del sumatorio de values e items del total de rangos.
		array_rangos.forEach(rango_x => {
			// Verificamos que el rango tenga la estructura esperada
			if (rango_x.values && rango_x.items) {
				// Fusionamos las propiedades de cada rango en los sumatorios
				sumatorio_values = { ...sumatorio_values, ...rango_x.values };
				sumatorio_items  = { ...sumatorio_items, ...rango_x.items };
			}
		});
		// Obtenemos las llaves (F0, B1, etc.) de cualquiera de los sumatorios
		const sumatorio_celdas = Object.keys(sumatorio_items);
		// Opcional: Validación simple
		if (Object.keys(sumatorio_values).length !== sumatorio_celdas.length) {
			console.log("⚠️ ghost::: Discrepancia entre valores e ítems . . . pero seguimos");
		}
		// sumatorio_values -> {F0: 'silla_13', B1: 'silla_2', ...} 
		// sumatorio_items  -> {F0: 'Gran-Salon_5', B1: 'Gran-Salon_9', ...}
		// sumatorio_celdas -> ["F0", "B1", "F1", "B6", "F6", "B7"]

		// ┌■ Obtengo la celda_inicio y celda_fin del supuesto rango_unico
		const cicf = this.__get_cicf_from_celdas(sumatorio_celdas);
		if(!cicf) throw Error('ghost::: calculo columna_inicio - columna-fin');
		
		// Monto el rango como si solo hubiera uno:
		const dimension_total = this._get_dimension(cicf.celda_inicio, cicf.celda_fin);
		
		// Creo el rango para 'cachar geo' y asignarle los valores e items asignados en sumatorio.
		const nombre_total = this._nombre_secuencial('universal');
		const rango_total = this.api_crear(nombre_total, cicf.celda_inicio,  dimension_total, false, true);
		if(!rango_total) throw Error('ghost::: Error en api_crear desde Array');
		this.api_delete(nombre_total);
		
		// const sumatorio_elementos_values = Object.values(sumatorio_values).map(value=>{ return this._X_to_element(value) });
		// const sumatorio_elementos_values = sumatorio_values.map(value=>{ return this._X_to_element(value) });
		// rango_total.values = sumatorio_elementos_values;
		rango_total.values = sumatorio_values;
		rango_total.items  = sumatorio_items;
		
		rango_total.is_basic = false;
		rango_total.is_array = true;

		this.d_ghost = rango_total;

		
		return this.d_ghost;
	}

	/** ### Devuelve el contenido actual del ghost */
    read_ghost(accion = '', separacion = 15) {
        const margin = '  ';

        const F = {
            reset: "\x1b[0m",
            bright: "\x1b[1m",
            dim: "\x1b[2m",
            underscore: "\x1b[4m",
            cyan: "\x1b[36m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            magenta: "\x1b[35m",
            red: "\x1b[31m",
            gray: "\x1b[90m",
            bgBlack: "\x1b[40m",
        };
		/** ### Devuelve un array de str con la linea que tiene que escribir, cruza celdas con values en Salon y Rango 
		 * ### • 1 llamada por 'Salon' y otra por 'Rango'		*/
        const representar_matriz = (array_celdas, arr_values=[]) => {
            const array_retorno_str = []
            const filas = [...new Set(array_celdas.map(c => c.replace(/[A-Z]/g, '')))].sort((a, b) => a - b);
            const columnas = [...new Set(array_celdas.map(c => c.replace(/[0-9]/g, '')))].sort();
            
			const ANCHO_CELDA = 3; // Fija la longitud máxima, p.ej. "A10 "
            
			filas.forEach(num => {
                const filaVisual = [];
                columnas.forEach(letra => {
                    const idCelda = `${letra}${num}`;
					const idCeldaPadded = idCelda.padEnd(ANCHO_CELDA, ' '); // Normaliza a 4 caracteres
					const id_celda_padded_centrada = centrar(idCelda, 5, ' ');
                    if (array_celdas.includes(idCelda)) {
                        if(arr_values.includes(idCelda))
                            filaVisual.push(`${F.bright}${F.green}${id_celda_padded_centrada}${F.reset}`);
                        else
                            filaVisual.push(id_celda_padded_centrada);
                    }else{
						// Mantiene la estructura si falta alguna celda intermedia
                        // filaVisual.push(' '.repeat(ANCHO_CELDA));
					}
                });
                const fila_str = `${margin}${filaVisual.join('|')}`;
                array_retorno_str.push(fila_str);
            });
            return array_retorno_str;
        };
		const centrar = (texto, longitud, relleno = " ") => {
			return texto
				.padStart(Math.floor((longitud + texto.length) / 2), relleno)
				.padEnd(longitud, relleno);
		};
		/** ### Entra un str y devuelve la longitud real sin los caracteres de color */
		const get_real_length = (str) => {
			// Esta regex busca el carácter de escape seguido de los corchetes y parámetros
			const ansiRegex = /\x1b\[[0-9;]*m/g;
			return str.replace(ansiRegex, '').length;
		};

        const g = this.d_ghost;

		// ┌■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ PREPARACIÓN DE DATOS 👻 		
		// ┌■■ Hay que cachar los datos del Salon y compararlos con los de Ghost:

		// ┌• espacio de separación entre las matrices(La separación dinámica)
		const GAP = ' '.repeat(separacion); 
        
		// ┌• Obtener  values e items  'en Salon'     
        const nombre_g = this._nombrar_rango_anonimo(this.d_ghost);
        const d_values_salon  = this._get_values(nombre_g, false, true);
        const d_items_salon = this._get_items(nombre_g, false);
        this.api_delete(nombre_g);

		// ┌• Array de string 'B4:silla_3','A4:mesa_1', . . .   del Salon
		let values_rango = '';
        for (let [c, el] of Object.entries(g.values)) values_rango +=(`${c}: ${el?.id ? el.id : el}, `);        
        
		// ┌• Array de celdas con valor del Salon(g.values)
		let arr_values = [];
        for (let c of Object.keys(g.values)) arr_values.push(c);
		
		// ┌• Asegura celda_inicio y celda_fin con el formato correcto
        if(typeof g.celda_inicio == 'object') g.celda_inicio = this.X_to_celda(g.celda_inicio);
        if(typeof g.celda_fin == 'object') g.celda_fin = this.X_to_celda(g.celda_fin);   

        // ┌• Necesito las celdas del 'Rango' para pasarlas a representar_matriz
        let celdas_rango = Object.keys(g.items);		
        
        // ┌• Necesito las celdas del 'Salon' para pasarlas a representar_matriz
        let values_salon = '';
        for (let [c, el] of Object.entries(d_values_salon)) values_salon +=(`${c}: ${el?.id}, `);
        let celdas_salon = [];
        for (let celda of Object.keys(d_items_salon)) celdas_salon.push(celda);        
        
        // ┌• Array de str de Salon - Rango_Ghost (CORREGIDO PARA USAR DATOS DEL SALON)
        const lineas_rango = representar_matriz(celdas_rango, arr_values || []);
        const lineas_salon = representar_matriz(celdas_salon, Object.keys(d_values_salon) || []);
		
		// ┌• Calcular la 'longitud max de las filas' de la MATRIZ
        const filas_totales = Math.max(lineas_rango.length, lineas_salon.length);
		const linea_s_to_print  = []
        for (let i = 0; i < filas_totales; i++) {
            const fila_R = lineas_rango[i] || ''; // Por si una matriz tiene menos filas
            const fila_S = lineas_salon[i] || '';
			const linea = `${fila_S}${GAP}${fila_R}`;			
			linea_s_to_print.push(linea);
        }

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ CALCULO DE ANCHOS 👻		
		// ┌■■ Longitud maxima de cada linea que suma de las matrices "Rango + Salon + separacion"
		let max_l = 0;
		linea_s_to_print.forEach(linea =>{max_l = Math.max(max_l, get_real_length(linea)) });
		const x_matriz = Math.floor((max_l - separacion) / 2);

		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ RENDERIZADO 👻        
        const BARRA = '■'.repeat(max_l+4);
		// ┌• Cabecera (Techo)
        console.log(`${F.bright}${F.green} ${BARRA}👻${F.reset} ► " ${F.red}${accion}${F.reset} "`);
		// ┌• Imprimir las matrices lado a lado
		linea_s_to_print.forEach(linea =>{console.log(linea)});
		// ┌• Imprime la Base de las Matrices:
		const under_salon = this.__generar_linea_formateada(x_matriz, 'SALON',  2);
		const under_rango = this.__generar_linea_formateada(x_matriz, 'RANGO',  2);
        console.log(` ${F.bright}${F.gray}${under_salon}${GAP}${under_rango}${F.reset}`);
        // ┌• Metadatos
        console.log(`${F.bright}${F.gray}┌■${F.reset} CELDA_INICIO: '${g.celda_inicio}'  ${F.gray}┌■${F.reset} CELDA_FIN: '${g.celda_fin}' \t${F.gray}┌■■${F.reset} DIMENSION: ( ${g.dimension.filas} x ${g.dimension.columnas} )  ${F.bright}${F.gray}┌■${F.reset} GEOMETRIA: ${g.geo ? 'Deltas :)' : 'NO DATA ⚠️'}   ${F.bright}${F.gray}┌■${F.reset} ITEMS: ${g.items ? 'Baldosas :)' : 'NO DATA ⚠️'}`);      
        console.log(`${F.bright}${F.gray}┌■${F.reset} CUT: ${this.stt.cut ? '✔️' : '❌' }  ${F.bright}${F.gray}┌■${F.reset} COPY: ${this.stt.copy ? '✔️' : '❌' }  ${F.gray}┌■■${F.reset}   Nº PASTEs: ${this.stt.paste}    ${F.bright}${F.gray}┌■■${F.reset} is_array: ${g.is_array}`);
        console.log(`${F.bright}${F.gray}┌■■${F.reset} VALUES RANGO: ${F.bright}${F.red}■ ${F.reset}${values_rango}${F.bright}${F.red}█▀▄█${F.reset}`);
        console.log(`${F.bright}${F.gray}┌■■${F.reset} VALUES SALON: ${F.bright}${F.red}■ ${F.reset}${values_salon}${F.bright}${F.red}█▀▄█${F.reset}`);
        console.log(`${F.bright}${F.gray} ${BARRA}${F.reset}\n`);
    }
	/**
	 * Genera una línea formateada tipo: ---- texto ----
	 * @param {number} x - La longitud total deseada de la cadena.
	 * @param {string} texto - El texto central (ej. "salon").
	 * @param {number} num_espacios - Cantidad de espacios totales (por defecto 2).
	 */
	__generar_linea_formateada(x, texto, num_espacios = 2) {
		const longitudTexto = texto.length;
		const totalGuiones = Math.max(0, x - longitudTexto - num_espacios);
		const izq = Math.floor(totalGuiones / 2);
		const der = totalGuiones - izq;
		const espacios = " ".repeat(Math.ceil(num_espacios / 2));
		return `${'▬'.repeat(izq)}${espacios}${texto}${espacios}${'▬'.repeat(der)}`;
	}
	
	/** ## EL FANTASMA 👻 SE MUEVE 
	 * ### Se re-calcular todos los valores de ghost excepto values, que queda con el anterior valor. 
	 * #### • esto provoca que se puedan asignar valores y luego pueda soltarlos. 
	 * ### Luego las acciones que se pueden hacer son cut, copy y paste sobre el Salon.
	 * ### mueves el cursor + cut o copy + mueves el cursor + paste.
	 * ### mueves el cursor + busca_free + mueves el cursor + busca_free....
	 */		
	// ┌• NOTA: "Al mover el cursor no relleno values para que no machaque los datos si antes he copiado o cortado."
	// ┌• Pero si actualizo las nuevas celdas con los valores teniendo en cuenta la posicion.
	// ficha.values = values 	|| {};		
	mover_cursor(celda_destino) {
		if(typeof celda_destino == 'string') celda_destino = celda_destino.trim();
		if(!celda_destino) celda_destino = 'A0';
		// 1. Pre-cálculo de coordenadas base (Optimización: Fuera del bucle)
		const pos_inicio = this.X_to_fc(this.d_ghost.celda_inicio);
		const pos_destino = this.X_to_fc(celda_destino);
		
		// Contenedores para la nueva estructura
		const new_values = {};
		const new_items = {};
		try {
			// Usamos 'geo' como mapa maestro de la estructura(es el único que tiene siempre todas las celdas del rango)
			// Además cuando se mueve el cursor, cambian las celdas, pero Los deltas permanecen constantes una vez calculados.
			// 'geo' se construye en ghost.
			for (const celda in this.d_ghost.geo) {
				const delta = this.d_ghost.geo[celda];
				
				// --- A. Cálculo de coordenadas ---				
				// Coordenada Antigua (Origen): Para recuperar el valor actual
				const fila_old = pos_inicio.fila + delta.delta_y;
				const col_old = pos_inicio.columna + delta.delta_x;
				const celda_old = this.X_to_celda(fila_old, col_old);
	
				// Coordenada Nueva (Destino): Para guardar en la nueva posición
				const fila_new = pos_destino.fila + delta.delta_y;
				const col_new = pos_destino.columna + delta.delta_x;
				const celda_new = this.X_to_celda(fila_new, col_new);
	
				// --- B. Transferencia de VALORES (Payload) ---
				// Si el ghost tiene algo capturado en la posición vieja, lo movemos a la nueva
				if (this.d_ghost.values[celda_old]) {
					new_values[celda_new] = this.d_ghost.values[celda_old];
				}
	
				// --- C. Actualización de ITEMS (Grid Destino) ---
				// Calculamos el ID del DOM correspondiente a la nueva celda
				// Asumimos el estándar: ID = "NombreContenedor_" + indice
				// Usamos X_to_indice para obtener el numero lineal de la baldosa
				const indice = this.X_to_indice(celda_new);
				// Nota: Verifica si tu prefijo es "Gran-Salon_" o variable. 
				// Si es dinámico, úsalo desde this.prefijo o similar. Aquí uso el estándar detectado.
				new_items[celda_new] = `Gran-Salon_${indice}`; 
			}
	
			// Actualización atómica del estado
			this.d_ghost.values = new_values;
			this.d_ghost.items = new_items;
			this.d_ghost.celda_inicio = celda_destino;
			
			// Recalcular celda_fin basándonos en la dimensión y el nuevo inicio
			// celda_fin = inicio + (filas-1, columnas-1)
			const fin_f = pos_destino.fila + (this.d_ghost.dimension.filas - 1);
			const fin_c = pos_destino.columna + (this.d_ghost.dimension.columnas - 1);
			this.d_ghost.celda_fin = this.X_to_celda(fin_f, fin_c);
			
			// ┌■ VARIABLES DE ESTADO DEL GHOST 💭💭
			// this.stt.cut = false; this.data.copy = true;
			this.stt.cursor = celda_destino;
			// 🍏
			this.reflex = this.d_ghost;
			this.read_ghost('Mover');
		
			// ┌• . . . NO CARGO REFLEX PQ ASÍ EN REFLEX ESTÁ EN LA POSICION INICIAL.
			// ┌• . . . NOTA: Si hago mover_cursor varias veces, no tiene sentido que reflex tenga todos esos datos
			// ┌• . . . perdiendo el dato que lo cargó. reflex es una copia de d_ghost y vale para volver atras una acción.
			
			// ┌• RETORNO
			return true;
			
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	/** ## obtiene las Coordenadas con offset.
	 * ### 'celda'(str) normalmente 'celda_inicio' de un rango.
	 * ### 'delta._y' es el desplazamiento vertical de la nueva-poisicion con respecto a la celda de entrada. 
	 * ### 'delta._x' es el desplazamiento horizontal de la nueva-poisicion con respecto a la celda de entrada. 
	 * ## [RETORNO] la celda resultado de aplicarle ese delta.
	 * ```javascript
	 * this.__get_coord_abs(A0, {delta_y:1, delta_x:0}) ► A1
	 * this.__get_coord_abs(A0, {delta_y:2, delta_x:0}) ► A2
	 * this.__get_coord_abs(A0, {delta_y:0, delta_x:1}) ► B0
	 * ``` 	 */
	_get_coord_abs(celda, delta){
		// USAMOS LA FUNCIÓN NATIVA: Convertimos "A2" -> {fila: 2, columna: 0}
		const pos = this.X_to_fc(celda);
		// Aplicamos el delta geométrico
		const nueva_columna = pos.columna + delta.delta_x;
		const nueva_fila = pos.fila + delta.delta_y;
		// Reconstruimos la coordenada string (0 -> A, 1 -> B...)
		// Nota: Si dispones de una función inversa tipo 'fc_to_X(f, c)', sería ideal usarla aquí.
		// const letra_columna = String.fromCharCode(nueva_columna + 65);
		const celda_retorno = this.X_to_celda(nueva_fila, nueva_columna);
		return celda_retorno ? celda_retorno : '';
	}

	/** ## Pone el cursor en 'A0' con una dimension '1x1' con values {}, solo items y geo y preparado para ser activado por ghost() */
	reset_ghost(){
		ficha = this._get_ficha_vacia();
		if(!ficha) return null;
		ficha.celda_inicio = 'A0';
		ficha.geo = {delta_y:0, delta_x:0};
		ficha.items = '🔥🔥 PENDIENTE, HAY QUE HACER UN first_baldosa Y UN last-baldosa DE RANGOS BASIC Y ASIGNARLO AQUI 🔥🔥';

		// ┌■ VARIABLES DE ESTADO DEL GHOST 💭💭
		this.stt.cut = false; this.stt.copy = false;
		this.stt.cursor = ficha.celda_inicio;
		this.stt.paste = 0;
		// 🍏
		this.read_ghost('Reset');
	}

	/** ## CORTA los 'Valores de Salon' donde está posicionado el ghost	 
	 * ### • Es responsabilidad del programador mover el cursor con 'mover_cursor' para CORTAR valores distintos.
	 * ### • VOY A INTENTAR 'CORTAR' LOS ELEMENTOS DIRECTAMENTE PORQUE GHOST VIVE EN EL DOM. NO SE GUARDA.
	*/
	
	cut_ghost() {
		const ghost_name = this._nombrar_rango_anonimo(this.d_ghost);
		try {
			// 1. Obtener los elementos del DOM directamente y no el id del elemento usando el tercer parámetro en true
			const elementos_r = this._get_values(ghost_name, false, true);
			// 2. Acción de CORTAR: Remover los elementos del DOM + Cachar celda:elemento en d_values.
			const d_values = {}
			if (elementos_r) {
				Object.keys(elementos_r).forEach(celda => {
					const el = elementos_r[celda];
					if (el && el.parentNode) {
						d_values[celda] = el;
						el.parentNode.removeChild(el);
					}
				});
			}
			// 3. Construir la estructura d_ghost requerida
			// Asumimos que this.celda_inicio, this.celda_fin, this.geo, etc., No cambian, sólo values.
			const Casper  = this.d_ghost;
			Casper.values = d_values || {};   // AQUI guardamos los elementos DOM extraídos
			Casper.is_basic = false;			// me aseguro.

			// ┌■ VARIABLES DE ESTADO DEL GHOST 💭💭
			this.stt.cut = true; this.stt.copy = false;
			this.stt.paste = 0;
			// this.stt.cursor = ficha.celda_inicio;

			// 🍏
			this.read_ghost('Cortar');
			this.api_delete(ghost_name);
			
			return d_values;		
		} catch (error) {
			console.log(error);
			this.api_delete(ghost_name);
			return false;			
		}
	}

	/** ## COPIA los valores de Salon donde está posicionado el ghost. es como hacer un ghost
	 * ### • Es responsabilidad del programador mover el cursor con 'mover_cursor' para COPIAR valores distintos.
	 * ### • VOY A INTENTAR 'CLONAR' LOS ELEMENTOS DIRECTAMENTE PORQUE GHOST VIVE EN EL DOM. NO SE GUARDA
	*/
	copy_ghost(){
		try {
			if(!this.d_ghost || !this.d_ghost.celda_inicio) return null;
			// TENGO QUE COPIAR LOS ELEMENTOS DEL SALON EN 'values', luego me quedo esperando que me muevan con 'mover_cursor'.
			
			const geo = this.d_ghost.geo;
			this.d_ghost.values = {};
			const baldosas = this.d_ghost.items;
			if(!baldosas) return;
			
			// Cacha los elementos del Salon directamente:
			const resultado = {};
			Object.entries(baldosas).forEach(([celda, id_baldosa]) => {
					if (!id_baldosa) {
						resultado[celda] = false;
						return;
					}
					const baldosa = document.getElementById(id_baldosa);
					if(!baldosa) return;	
					const contenido = baldosa?.firstElementChild;				
					
					// ► En caso de no haber contenido html devuelve false
					// resultado[celda] = contenido instanceof HTMLElement ? contenido?.id : false;	
					if(contenido instanceof HTMLElement){
						resultado[celda] = contenido;	
					}
					
			});
			// Asigno a ghost: "Copia"
			this.d_ghost.values = resultado ?  resultado : {};

			// ┌■ VARIABLES DE ESTADO DEL GHOST 💭💭
			this.stt.cut = false; this.stt.copy = true;
			this.stt.paste = 0;		
			// this.stt.cursor = ficha.celda_inicio;
			// 🍏
			this.read_ghost('Copiar');
			// ┌■ RETORNO
			return resultado;							
		} catch (error) {
			console.log(error);
			return false;	
		}
	}

	/** ### "PEGA los 'values' de ghost donde está posicionado el cursor."
	 * #### • Esto es así para que haya que 'mover' obligatoriamente el cursor para volver a pegarlo.
	 * #### • La variable de estado 'stt.pegar' indica el número de pegados desde la última cut, copy o ghost.
	 * #### • Cut solo permite '1 pegado' ( los elementos son movidos ).	 
	 * #### • Copy permite 'múltiples pegados' creando elementos nuevos.
	 * #### • Paste trabaja con [Arrays de Rangos], por lo que puede pegar pares, nones, . . .  
	 * */
	paste_ghost(b_machaca=true, copy_impuesto=null, cut_impuesto=null) {
		
		const Casper = this.d_ghost;
		
		// ┌■■ Logica sobre CUT & COPY: Se pueden imponer o venir de fabrica(sst.cut/copy)
		if(copy_impuesto!=null || cut_impuesto!=null){
			if(typeof copy_impuesto != 'boolean' || typeof cut_impuesto != 'boolean' ) throw Error(`Error de tipos Cut && Copy`)
			if(copy_impuesto == cut_impuesto) throw Error(`Error paste_ghost::: copy_impuesto: ${copy_impuesto} cut_impuesto: ${cut_impuesto}`)
			this.stt.cut  = cut_impuesto!=null  ? cut_impuesto : false;
			this.stt.copy = copy_impuesto!=null ? copy_impuesto : false;
		}
		const Cut = this.stt.cut;
		const Copy = this.stt.copy;
		
		// ┌■■ Validacion de Accion
		if(Copy && Cut) throw Error('Copy y Cut a False');
		if(!Copy && !Cut) throw Error('Copy y Cut a False');

		this.__paste_rango(Copy, Cut, b_machaca);
    }
	
	/** ### Realiza el paste cuando d_ghost representa "1 rango" ► is_array == false 
	 * #### Solo hace 'paste' de las celdas con valor. TENGO QUE AÑADIR UN 'modo-parche' que pegue el Rango entero, con las falses incluidas.
	 * #### Si viene de Cut tiene comportamiento diferente de si viene de Copy.
	 * #### Funciona para arrays porque actua sobre celdas:values
	 * */
	__paste_rango(Copy=false, Cut=false, b_machaca=true){
		try {
			const Casper = this.d_ghost;	
			const Salon  = this.ref_Salon;
			// ┌■ Iteramos sobre los valores definidos en el ghost (el contenido a pegar)
			const celda_s = Object.keys(Casper.values);

			// ┌• •••••••  ••••
			// ┌• PROCESAR DATOS
			celda_s.forEach( celda => {		
				// ┌• Elemento origen
				const player_fantasma = Casper.values[celda];      
				if (!player_fantasma) return;
				const id_player_fantasma = player_fantasma?.id ? player_fantasma.id : player_fantasma
				      
				// ┌• id de la baldosa desitno. . . calculado previamente en mover_cursor fantasma.
				const baldosa_fantasma = Casper.items[celda];
				if (!baldosa_fantasma) return;
				
				// ┌• Referencia al elemento del DOM (Baldosa destino)
				const baldosa_destino = document.getElementById(baldosa_fantasma);
				if (!baldosa_destino) return;
				
				// ┌•••••••••    •••••••    •••••••••••••
				// ┌• Lógica:    Machaca vs Espacio Vacío 🧠🧠				
				let proceder_pegado = false;
				if (b_machaca) {
					this.ref_Salon.api_vaciar_baldosa(baldosa_destino);
					proceder_pegado = true;
				} else {
					if (baldosa_destino.children.length === 0) {
						proceder_pegado = true;
					}
					// ┌• [ Si tiene hijos y no machaca ], no hacemos nada (proceder_pegado=false)
				}
				
				// ┌••                 ••••••••••••     •••
				// ┌■■ Ejecución de la Manipulación del DOM
				if (!proceder_pegado) throw ('. . . procesar_pegado = false, No se Puede Pegar');
				
				/** ### _what_player_menu devuelve: { tipo:(str) , elemento: < object > } */
				const menu_element = Salon?._what_player_menu(id_player_fantasma);					
				if(!menu_element) return; 	// . . . continue 				
				
				// ┌■■ Cut o Copy ??  🧠🧠									
				if(Cut && !Copy){
					// ┌• Si No Existe en el Salon lo Crea(lo saloniza).
					// const player = this._X_to_element(player_fantasma?.id);					

					const player = menu_element.elemento.cloneNode(true);
					if (player) {
						player.id = id_player_fantasma; 
						Salon._saloniza_elemento(player);
					}
					// ┌• Se deposita sobre la baldosa.
					baldosa_destino.appendChild(player);						
					
					// ┌■ BUFFER de elementos
					this.llenar_buffer(player);
					
				}else if(!Cut && Copy){					
					
					// ┌• Clonamos el nodo para mantener el ghost intacto para futuros pegados
					const new_player = menu_element.elemento.cloneNode(true);
					if (new_player) {
						new_player.id = Herramientas.get_dom_secuency(menu_element.tipo); 
						Salon._saloniza_elemento(new_player);
					}
					// ┌• Se deposita sobre la baldosa.
					baldosa_destino.appendChild(new_player);

					// ┌■ BUFFER de elementos					
					this.llenar_buffer(new_player);	
				}
			});
			// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
			// 🔥 DesPues de Pegado-from-Cut.  🔥 
			// 🔥 vaciar 'values' xa que NO SE VUELVA a PEGAR
			if(Cut && !Copy) this.d_ghost.values = {};
			
			// ┌■ VARIABLES DE ESTADO DEL GHOST 💭💭			
			this.stt.cut = Cut; 
			this.stt.copy = Copy;
			this.stt.paste +=1;
			// 🍏
			this.read_ghost('Paste');

			return true;
		} catch (error) {
			console.log(error);
			return false;	
		}
	}

	/**
	 * ### "Busca, el primer rango-free (sin hijos) de esta dimensión, a partir de esta celda y dentro de un rango".
	 * @param {String} dimension Texto con formato 'filasXcolumnas' (por ejemplo, '3x4').
	 * @param {String} celda_inicio Celda desde la que comenzar la búsqueda (por ejemplo, 'C2').
	 * @param {String} nombre_rango Nombre del rango donde se quiere buscar el bloque libre.
	 * @returns {{celda_inicio: String, celda_fin: String}|null} Coordenadas de inicio y fin del rango libre, o null si no se encuentra.
	 * @example const rango_free = this._buscar_free('3x4', 'C2', 'rango_matriz'); ► { celda_inicio: 'D4', celda_fin: 'F6' }
	 */
	_buscar_free(dimension = '', celda_inicio = 'A0', nombre_rango = 'rango_matriz') {
		const fxc_dimension = this?._dimension_to_f_x_c(dimension);
		const coord_ci = this?._celda_to_fc(celda_inicio);
		const celdas_rango = this._get_celdas(nombre_rango);

		if (!fxc_dimension || !coord_ci || !Array.isArray(celdas_rango) || celdas_rango.length === 0) return null;

		const celdas_ordenadas = celdas_rango
			.map(celda => ({ celda, fc: this._celda_to_fc(celda) }))
			.filter(item => item.fc)
			.sort((a, b) => (a.fc.fila - b.fc.fila) || (a.fc.columna - b.fc.columna))
			.map(item => item.celda);

		const celdas_set = new Set(celdas_ordenadas);

		for (const celda of celdas_ordenadas) {
			const fc = this._celda_to_fc(celda);
			if (!fc) continue;
			if (fc.fila < coord_ci.fila || (fc.fila === coord_ci.fila && fc.columna < coord_ci.columna)) continue;

			if (this.__is_free(celda, dimension, nombre_rango, celdas_set)) {
				const fc_fin = this._get_celda_fin(celda, dimension);
				const celda_fin = fc_fin ? this._fc_to_celda(fc_fin.fila, fc_fin.columna) : null;
				return celda_fin ? { celda_inicio: celda, celda_fin } : null;
			}
		}

		return null;
	}
	/**
	 * ### Recorre un bloque (por celdas) y comprueba si todas están vacías dentro del rango indicado.
	 * ### usado en {@link _buscar_free}
	 * @param {String} celda_inicio Celda de inicio del bloque.
	 * @param {String} dimension Dimensión del bloque (filasxcolumnas).
	 * @param {String} nombre_rango Nombre del rango donde se valida el bloque.
	 * @param {Set<String>|null} celdas_rango_set (opcional) Set con las celdas del rango para acelerar la validación.
	 * @returns {Boolean} true si todas las celdas del bloque están vacías y pertenecen al rango, false en caso contrario.
	 */
	__is_free(celda_inicio = 'A0', dimension = '', nombre_rango = 'rango_matriz', celdas_rango_set = null) {
		const fin_fc = this._get_celda_fin(celda_inicio, dimension);
		const celda_fin = fin_fc ? this._fc_to_celda(fin_fc.fila, fin_fc.columna) : null;
		if (!celda_fin) return false;

		const rango_obj = this._get_rango_from_cicf(celda_inicio, celda_fin);
		if (!rango_obj || !rango_obj.items) return false;

		const celdas_set = celdas_rango_set instanceof Set
			? celdas_rango_set
			: new Set(this._get_celdas(nombre_rango) || []);

		const celdas_bloque = Object.keys(rango_obj.items);
		if (celdas_bloque.length === 0) return false;

		for (const celda of celdas_bloque) {
			if (!celdas_set.has(celda)) return false;
			// if (!this._is_myDiv_vacio(rango_obj.items[celda])) return false;
			const myDiv = rango_obj.items[celda];
			const es_vacio = Boolean(myDiv.elemento_div.children.length === 0);
			
			// ┌• Devuelve false si tiene datos(no vacío) porque 'NO es rango libre'.
			if (!es_vacio) 
				return false;
		}

		return true;
	}	
	
	/** ## 4 ACCIONES: mover + cut + mover + paste */
	cut_paste(celda_origen, celda_destino='A0'){
		// Validamos si tenemos rango ghost
		try {
			const Casper = this.d_ghost
			// Validamos si tenemos rango ghost
			if(!Casper || Casper == {} )  throw('Error. No hay Fantasma!!');
			if(!Casper.celda_inicio || !Casper.celda_fin) throw('Error. No encuentro celda_inicio o celda_fin!!');
			if(!Casper.geo  || !Casper.items)  throw('Error. No encuentro geometria delta o items!!');
			if(!Casper.values || Casper.values == {}) throw('Error. No encuentro values!!');
			if(!celda_destino) throw('Error. Para mover y pegar tienes que tener celda_destino');
			if(celda_destino === celda_origen ) return;

			// Proceso:
			let ok = false;
			ok = this.mover_cursor(celda_origen)
			if(!ok) throw Error(`Error en "Mover" a celda-origen ${celda_origen}`);
			ok = this.cut_ghost();
			if(!ok) throw Error(`Error en "Cortar" celda-destino: ${celda_destino}`);
			ok = this.mover_cursor(celda_destino);
			if(!ok) throw Error(`Error "Mover" a celda-destino ${celda_destino}`);
			ok = this.paste_ghost();
			if(!ok) throw Error(`Error "Paste" en celda-destino ${celda_destino}`);
			return ok;

		} catch (error) {
			console.log(`Error Cut-Paste celda_destino( ${celda_destino} ):::` + error);
			return false;
		}
	}
	/** ## 4 ACCIONES: mover(celda_origen) + copy + mover(celda_destino) + paste 
	 * ### • copy siempre crea elementos nuevos.	*/
	copy_paste(celda_origen='A0', celda_destino='A0'){
		// Validamos si tenemos rango ghost
		try {
			const Casper = this.d_ghost
			// Validamos si tenemos rango ghost
			if(!Casper || Casper == {} )  throw('Error. No hay Fantasma!!');
			if(!Casper.celda_inicio || !Casper.celda_fin) throw('Error. No encuentro celda_inicio o celda_fin!!');
			if(!Casper.geo  || !Casper.items)  throw('Error. No encuentro geometria delta o items!!');
			if(!Casper.values || Casper.values == {}) throw('Error. No encuentro values!!');
			if(!celda_destino) throw('Error. Para mover y pegar tienes que tener celda_destino');
			if(celda_destino === celda_origen ) return;

			// Proceso:			
			let ok = false;
			ok = this.mover_cursor(celda_origen)
			if(!ok) throw Error(`Error en "Mover" a celda-origen ${celda_origen}`);
			ok = this.copy_ghost();
			if(!ok) throw Error(`Error en "Copiar" celda-origen: ${celda_origen}`);
			ok = this.mover_cursor(celda_destino);
			if(!ok) throw Error(`Error en "Mover" a celda-destino ${celda_destino}`);
			ok = this.paste_ghost();
			if(!ok) throw Error(`Error en "Paste" en celda-destino ${celda_destino}`);
			
			return ok;
		} catch (error) {
			console.log(`❌ Error Copy-Paste 👻, celda-destino ${celda_destino} :::` , error);
			return false;
		}
		
	}

	/** ## Mete el id del elemento nuevo introducido en el salon con nueva id en el buffer 
	 * 	*/
	llenar_buffer(elemento, celda){
		let id_el = '';
		if (typeof elemento == 'string' && elemento.trim != '') {
			id_el = elemento;
			elemento = document.getElementById(id_el);
			if(!elemento) return false;
		}else if(typeof elemento == 'object'){
			id_el = elemento?.id ? elemento.id : '';			
		}
		if (id_el) {
			// this.buffer[celda] = elemento.id;
			this.buffer[celda] = elemento;
			return true;
		}
	}

	/** ## Cuando se solicita el buffer se vacía el buffer */
	vaciar_buffer(){
		const buf = this.buffer;
		this.buffer = {};
		return buf || {};
	}
	
	/** ### • Si entra un "objeto-elemento" [lo retorna], 
	 * ### • Si entra un "id que está en el salon", [retorna el elemento]. 
	 * ### • Si entra un "id que no existe en el salon", [crea el elemento y lo saloniza].	 
	 * ```javascript
	 * const uno = X_to_elemento_(<element div>); // ► devuelve <element div>	
	 * const dos = X_to_elemento_('silla_1'): // ► devuelve <element div> si existe 'silla_1'
	 * const tres = X_to_elemento_('silla_1'); // ► crea <element div>, lo saloniza, lo devuelve.
	 * array_elementos.map(elemento=>{ _crear_y_salonizar(elemento) }); // ► si son ids, ahora son elementos, si son elementos, lo siguen siendo y si no existen los crea.
	 * ```	 * */
	_X_to_element(elemento){
		const Salon = this.ref_Salon;

		if (typeof elemento == 'string' && elemento.trim != '') {
			// Si entra como string lo trato como id, ahora vamos a ver si existe como Dom html en el Salon or hay que crearlo:
			const id_del_elemento = elemento;
			elemento = document.getElementById(id_del_elemento);
			// Si existe, lo Retorno, el objetivo de esta funcion es retornar un elemento si o si.
			if(elemento) return elemento;

			// Pasas por aqui sólo Si elemento no existe como DOM en Salon, es string ► me pasas un id a crear:
			// • creo un clon del elemento, le asigno el div pasado y  lo salonizo.
			const menu_element = Salon?._what_player_menu(id_del_elemento);					
			if(!menu_element) return; 	// . . . continue 
			const new_elemento = menu_element?.elemento?.cloneNode(true);
			new_elemento.id = id_del_elemento;
			 if(!new_elemento) return;  // . . . continue
			Salon._saloniza_elemento(new_elemento);
			return new_elemento;

		}else if(typeof elemento == 'object'){
			const id_del_elemento = elemento?.id ? elemento.id : '';			
			if(id_del_elemento) {
				return elemento;
			}else{
				// el elemento es un objeto pero no tiene id ► le asigno un id anonimo.
				const id_anonimo = Herramientas.get_dom_secuency('id_anonimo');
				elemento.id = id_anonimo;
				return elemento;
			}	
		}
	}
	
	
}

/** ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
 * ### CLASE HIJA DE RANGOS. Operaciones Especiales. 
 *  ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
*/
class Wedding_Rangos extends Rango_Ghost{
	/**
	 * ## Trata las operaciones que se pueden hacer con dos rangos. Macro de Trabajo sobre Rangos.
	 * ### Union, Intersección, _is_continuos, 	 */
	constructor(instancia_matriz_plana = null) {			
		if (!instancia_matriz_plana) return null;		
		// ┌■ 
		super(instancia_matriz_plana);	

		this.rangos = {app:{}, temp:{}, basic:{}};		
		// this.rangos_app = {};		/** ## Diccionario de rangos de salon. is_basic = false */
		// this.rangos_temp = {};		/** ## Diccionario de rangos temporales. Normalmente se crean y destruyen. Son is_basic = false */
		// this.rangos_basic = {};		/** ## Diccionario basicos(filas, columnas, rango_matriz, pares, nones) generados en el padre. is_basic = true */
		// this.rangos_ghost = {};		/** ## Diccionario fantasma(solo tiene dimension y geo)  */

		
    }	
	
	/**
	 * ## Calcula la unión de dos rangos y la devuelve como colección de celdas conectadas.
	 * ### • La salida no es un rango único, sino una colección de rangos.
	 * @param {String} nombre_rango_a
	 * @param {String} nombre_rango_b
	 * @returns {Array<Array<String>>|null} Colección de rangos (listas de celdas) o null si falla.
	 */
	_get_union(nombre_rango_a = '', nombre_rango_b = '') {
		// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
		// const celdas_a__ = obtener_celdas(nombre_rango_a);
		const celdas_a = this._get_celdas(nombre_rango_a);

		const celdas_b = this._get_celdas(nombre_rango_b);
		// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

		if (!celdas_a || !celdas_b) return null;

		const set_a = new Set(celdas_a);
		const set_b = new Set(celdas_b);
		// ┌••••••••••••••••••••••••
		// ┌•• LOGICA DEL NEGOCIO:
		// ┌••••••••••••••••••••••••
		// ┌■ Cacha las celdas compartidas.
		const compartidas = celdas_a.filter(celda => set_b.has(celda));
		
		// ┌■ Tiene Compartidas ❌ ► Devuelve un array de array con las celdas de cada rango. Esto preserva los rangos.
		if (compartidas.length === 0) {
			return [celdas_a, celdas_b];
		}		

		// ┌■ Tienen Compartidas ✔️ +  Totalmente Contenido ❔
		const a_en_b = celdas_a.every(celda => set_b.has(celda));
		const b_en_a = celdas_b.every(celda => set_a.has(celda));
		
		// ┌■ Tienen Compartidas ✔️ + Totalmente Contenido ✔️ ► Devuelve un Array con el Rango contenedor.
		if (a_en_b) return [celdas_b];
		if (b_en_a) return [celdas_a];	

		// ┌■ Tienen Compartidas ✔️ + Totalmente Contenido ❌ ► Devuelve todas las celdas en un array. No repetidos
		const union = [...new Set([...celdas_a, ...celdas_b])];
		return [union];
	}

	/**
	 * ## Calcula la intersección de dos rangos y la devuelve como colección de celdas conectadas.
	 * ### • La salida no es un rango único, sino una colección de rangos.
	 * @param {String} nombre_rango_a
	 * @param {String} nombre_rango_b
	 * @returns {Array<Array<String>>|null} Colección de rangos (listas de celdas) o null si falla.
	 */
	_get_interseccion(nombre_rango_a = '', nombre_rango_b = '') {

		// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
		const celdas_a = this._get_celdas(nombre_rango_a);		
		const celdas_b = this._get_celdas(nombre_rango_b);
		// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘

		if (!celdas_a || !celdas_b) return null;

		const set_b = new Set(celdas_b);
		const compartidas = celdas_a.filter(celda => set_b.has(celda));

		if (compartidas.length === 0) return null;

		const set_a = new Set(celdas_a);
		const a_en_b = celdas_a.every(celda => set_b.has(celda));
		const b_en_a = celdas_b.every(celda => set_a.has(celda));

		if (a_en_b || b_en_a) {
			const rango_grande = a_en_b ? celdas_b : celdas_a;
			const rango_pequeno = a_en_b ? celdas_a : celdas_b;
			const set_pequeno = new Set(rango_pequeno);
			const diferencia = rango_grande.filter(celda => !set_pequeno.has(celda));
			return diferencia.map(celda => [celda]);
		}

		return [compartidas];
	}

	/**
	 * ## Comprueba si un array de celdas forma un bloque continuo (sin saltos).
	 * @param {Array} array_celdas Ej: ['A0', 'A1', 'B0', 'B1']
	 * @returns {Boolean} true si es continuo, false en caso contrario.
	 */
	_is_continuos(array_celdas = []) {
		if (!Array.isArray(array_celdas) || array_celdas.length === 0) return false;

		const celdas_planas = array_celdas.flat();
		if (celdas_planas.length === 0) return false;

		const celdas = celdas_planas.filter(celda => typeof celda === 'string' && this.is_OK(celda));
		if (celdas.length !== celdas_planas.length) return false;

		const celdas_unicas = new Set(celdas);
		if (celdas_unicas.size !== celdas.length) return false;

		let minFila = Infinity;
		let maxFila = -Infinity;
		let minCol = Infinity;
		let maxCol = -Infinity;

		celdas.forEach(celda => {
			const fc = this._celda_to_fc(celda);
			if (!fc) return;
			if (fc.fila < minFila) minFila = fc.fila;
			if (fc.fila > maxFila) maxFila = fc.fila;
			if (fc.columna < minCol) minCol = fc.columna;
			if (fc.columna > maxCol) maxCol = fc.columna;
		});

		if (!Number.isFinite(minFila) || !Number.isFinite(minCol)) return false;

		const total_celdas = (maxFila - minFila + 1) * (maxCol - minCol + 1);
		if (total_celdas !== celdas.length) return false;

		for (let fila = minFila; fila <= maxFila; fila++) {
			for (let col = minCol; col <= maxCol; col++) {
				const celda = this._fc_to_celda(fila, col);
				if (!celda || !celdas_unicas.has(celda)) return false;
			}
		}
		return true;
	}

	
	

	/** ### Devuelve celdas_comunes, celdas_no_comunes, celdas_totales(celdas implicadas) de dos rangos */
    _celdas_comunes(rango_a, rango_b) {
        const a = this.api_read_diccionarios(rango_a);
        const b = this.api_read_diccionarios(rango_b);

        if (!a && !b) return null;

        const celdas_rango_a = rango_a?.geo ? Object.keys(rango_a.geo) : [];
        const celdas_rango_b = rango_b?.geo ? Object.keys(rango_b.geo) : [];

        // Casos base: si un rango no tiene celdas, el resultado es el otro rango
        if (celdas_rango_a.length > 0 && celdas_rango_b.length === 0) {
            return { comunes: [], totales: celdas_rango_a, no_comunes: celdas_rango_a };
        }
        if (celdas_rango_a.length === 0 && celdas_rango_b.length > 0) {
            return { comunes: [], totales: celdas_rango_b, no_comunes: celdas_rango_b };
        }

        const set_a = new Set(celdas_rango_a);
        const set_b = new Set(celdas_rango_b);

        // 1. Celdas Comunes: Intersección (presentes en ambos)
        const celdas_comunes = celdas_rango_a.filter(celda => set_b.has(celda));

        // 2. Celdas Totales: Unión (todas las celdas implicadas sin repetición)
        const celdas_totales = [...new Set([...celdas_rango_a, ...celdas_rango_b])];

        // 3. Celdas No Comunes: Diferencia Simétrica (en A o B, pero no en ambos)
        const set_comunes = new Set(celdas_comunes);
        const celdas_no_comunes = celdas_totales.filter(celda => !set_comunes.has(celda));

        return {
            comunes: celdas_comunes,
            totales: celdas_totales,
            no_comunes: celdas_no_comunes
        };
    }

	/** ### Analiza la relación espacial entre dos rangos 
	 * ```javascript
	 * const parentesco = this._get_tipo_relacion_('rango_matriz', rango_b); ► un nombre de rango y un objeto_rango
	 * const parentesco = this._get_tipo_relacion_('rango_matriz', 'rango_b'); ► dos nombres de rango
	 * const parentesco = this._get_tipo_relacion_(rango_a, rango_b); 	► dos object rango	 
	 * if(parentesco.type === 'CONTENIDO') {console.log(`MAYOR: ${parentesco.mayor} ■ MENOR: ${parentesco.menor}`)}
	 * else if(parentesco.type === 'SOLAPADOS'){console.log('Estan Solapados, tienen celdas en comun.')}
	 * else if(parentesco.type === 'ADYACCENTES'){console.log('Juntitos pero no Revueltos. No celdas en comun.')}
	 * else if(parentesco.type === 'SEPARADOS'){console.log('con Espacio de por medio. No celdas en comun.')}
	 * else {console.log('Typo de Relacion No Registrado')}
	 * ```
	*/
    _get_tipo_relacion(rango_a, rango_b) {
        const analisis = this._celdas_comunes(rango_a, rango_b);
        if (!analisis) return null;

        const { comunes } = analisis;
        const celdas_a = Object.keys(rango_a?.geo || {});
        const celdas_b = Object.keys(rango_b?.geo || {});

        // CASO 1: Hay celdas compartidas (Contenido o Solapado)
        if (comunes.length > 0) {
            // Si las comunes son igual al tamaño de alguno de los rangos, uno está dentro del otro
            if (comunes.length === celdas_a.length || comunes.length === celdas_b.length) {
                const a_es_mayor = celdas_a.length >= celdas_b.length;
                return {
                    type: "CONTENIDO",
                    mayor: a_es_mayor ? "rango_a" : "rango_b",
                    menor: a_es_mayor ? "rango_b" : "rango_a"
                };
            }
            return { type: "SOLAPADOS" };
        }

        // CASO 2: No hay celdas compartidas (Adyacentes o Separados)
        // Verificamos si alguna celda de A toca el borde de alguna de B
        const son_adyacentes = celdas_a.some(key_a => {
            const [y, x] = key_a.split('_').map(Number);
            // Definimos los 4 vecinos ortogonales (arriba, abajo, izquierda, derecha)
            const vecinos = [`${y - 1}_${x}`, `${y + 1}_${x}`, `${y}_${x - 1}`, `${y}_${x + 1}`];
            return vecinos.some(v => rango_b.geo[v]);
        });

        return {
            type: son_adyacentes ? "ADYACENTES" : "SEPARADOS"
        };
    }
	
	/** ## Devuelve la ficha rango. Si viene como nombre, Busca por todos los rangos   */
	api_read_diccionarios(rango){
		// ┌• Viene como ''. Le devuelvo todos los rangos de app.
		if(!rango) 
			return this.rangos.app
		
		// ┌• Viene como nombre de rango
		if(typeof rango == 'string') {			
			// ┌■■ 'd_rangos'
			const ppal = this.api_read(rango);
			if(ppal) return this.d_rangos[rango];
			
			// ┌■■ 'd_temporales'
			const in_temp = this.api_read(rango, this.d_termporales);
			if(in_temp) return this.d_termporales[rango];
		}
		
		// ┌• Viene con su ficha
		if(typeof rango === 'object' && rango.celda_inicio && rango.celda_fin && rango.dimension && rango.geo){
			return rango;
		}
		return null;
	}
	
	/** 🔥🔥
	 * ## Devuelve un sub-rango dentro del rango indicado, con dimensión y celda de inicio dadas.
	 * ### • Valida que la celda de inicio y la dimensión caben dentro del rango base.
	 * ### • Retorna el formato estándar de rango (get_ficha_vacia).
	 * @param {String} nombre_sub_rango Nombre del sub rango.
	 * @param {Object} dimension_sub {filas:int, columnas:int}
	 * @param {String} celda_inicio_sub Celda dentro del rango base.
	 * @returns {Object|null} Ficha de rango o null si no es válido.
	 */
	sub_rango(nombre_sub_rango = '', dimension_sub = { filas: 1, columnas: 1 }, celda_inicio_sub = 'A0') {
		try {
			if (!nombre_sub_rango || typeof nombre_sub_rango !== 'string') throw Error('Nombre de sub-rango no válido');
			nombre_sub_rango = nombre_sub_rango.trim();
			// Who Is sub-rango??? 🔥 🔥 
			
			// Cachamos la dimensión.
			const dim = this._dimension_to_f_x_c(dimension_sub);
			if (!dim) throw Error('Dimensión no válida');
						
			// Cachamos 'celda-inicio' y 'celda-fin'
			const fc_inicio = this._celda_to_fc(celda_inicio_sub);
			const fc_fin = this._get_celda_fin(celda_inicio_sub, `${dim.filas}x${dim.columnas}`);
			if (!fc_inicio || !fc_fin) throw Error('Celdas no válidas');
			
			// ┌• •••••    ••••• •••••                         •••••••••
			// ┌• Cacho el Rango-Base Sobre el que devolver el sub-rango. 
			const r_matriz = this.api_read('rango_matriz');
			// Convertimos a {fila,columna} 
			const fc_base_inicio = this._celda_to_fc(r_matriz.celda_inicio);
			const fc_base_fin = this._celda_to_fc(r_matriz.celda_fin);
			if (!fc_base_inicio || !fc_base_fin) throw Error('Celdas del rango base no válidas');

			// Cachamos los límites de la caja(rango-base).
			const minFila = Math.min(fc_base_inicio.fila, fc_base_fin.fila);
			const maxFila = Math.max(fc_base_inicio.fila, fc_base_fin.fila);
			const minCol = Math.min(fc_base_inicio.columna, fc_base_fin.columna);
			const maxCol = Math.max(fc_base_inicio.columna, fc_base_fin.columna);

			//┌■ Funcion anonima para validar que las celdas de inicio y 
			//┌■ fin del sub-rango están dentro de los límites del rango base.
			const dentro_base = (fc) => (
				fc.fila >= minFila
				&& fc.fila <= maxFila
				&& fc.columna >= minCol
				&& fc.columna <= maxCol
			);
			if (!dentro_base(fc_inicio) || !dentro_base(fc_fin)) throw Error('El sub-rango excede los límites del rango base');

			// ┌• • •  Cuando paso por aquí, ya tengo validado que la dimensión y la celda de inicio y fin del sub-rango son correctas y están dentro del rango base. Ahora sólo me queda cachar las celdas que hay dentro de ese sub-rango para devolver su ficha completa.

			const celda_fin = this._fc_to_celda(fc_fin.fila, fc_fin.columna);
			if (!celda_fin) throw Error('No puedo Calcular celda_fin del sub-rango');


			const sub_rango = this._get_rango_from_cicf(celda_inicio_sub, celda_fin);

			// ┌■ Retorno
			return sub_rango ? sub_rango : this._get_ficha_vacia();

		} catch (error) {
			console.log(`❌ Error ::: sub_rango() ::: ${error}`);
			return null;
		}
	}

	// 🔥🔥
	_is_celda_IN_rango(celda = '', argumento_rango = ''){
		if(!celda || typeof celda !== 'string') return null;		

	}

	// ■ El parametro de entrada puede ser:
	// 		1- una dimension en formato string '3x4'  o {filas:int, columnas:int}
	// 		2- nombre_rango(string)  
	//   	3- un rango anonimo: { celda_inicio:str, celda_fin:str, dimension:{}, geo:{}, items:{}, values:{} }
	//   	4- un array de rangos (union, pares, nones, interseccion, sillas_ronin)
	// DEVUELVE SIEMPRE UN RANGO (con su ficha completa) O ficha-vacía. 🔥🔥
	X_to_rango(argumento){
		let Ran = null;
		if(!argumento) return this._get_ficha_vacia();
		if (Array.isArray(argumento)) {
			// ┌■■ Puede ser: 'union' / 'pares' / 'nones' / 'sillas_ronin' / 'interseccion'
			// ┌■■ Entra un Array!!! de Rangos
			Ran = this._crear_ghost_desde_array(argumento);
		}else if(typeof argumento === 'string'){
			const dimension_es = this._get_dimensiones_3x4(argumento);
			if(dimension_es) {
				// ■ dimension '3x4'
				Ran = this._crear_ghost_desde_dimension(dimension_es.filas, dimension_es.columnas);
			} else{
				// ■ 'nombre_rango' en d_rangos
				Ran = this._crear_ghost_desde_rango(argumento);
			}
		}else if(typeof argumento === 'object' && argumento.celda_inicio && argumento.celda_fin && argumento.geo){
			// ■ Rango Anonimo con ficha completa.
			Ran = this._crear_ghost_desde_rango(argumento);
		}else{
			// ■ No se reconoce el formato de entrada.
			return this._get_ficha_vacia();;		
		}

		return Ran ? Ran : this._get_ficha_vacia();;
	}

	get basics(){return this.rangos.basic;}
	get app(){return this.rangos.app};
	get temp(){return this.d_termporales};
}

/** ## Clase para trabajar con Rangos especificamente de salon(reservas_a_rangos__ por ejemplo) */
class El_Rango_del_Salon extends Wedding_Rangos{
	constructor(instancia_Salon = null){
		if (!instancia_Salon) return null;		
		// ┌■ 
		super(instancia_Salon);	
		this.instancia_Salon = instancia_Salon;
		
		// this._init_rangos_basicos(true, true, true, true, true);
		
		/** ###  [ diccionario de rangos ] de las reservas creadas en Salon
		 ### • NOTA: Tienen que ser rangos 'temporales' pq las reservas son dinamicas... hay que "gestionarlo" */
		this.d_reservas = {}
	}

	
	/**
	 * ## Convierte reserva_s en rangos ({celda_inicio, celda_fin, dimension}).
	 * ###	Si la reserva no tiene mesas, devuelve únicamente las celdas ocupadas por sus sillas.
	 * @param {Array} arr_reservas Array de reservas [{mesas:[], sillas:[]}].
	 * ### RETORNO {Array|Boolean} Array de rangos normalizados o false si no hay datos suficientes.
	 * ```javascript
	 * 	reservas: [ {"mesas":["mesa_9"],"sillas":["silla_10","silla_11"]},
	 * 	{"mesas":["mesa_22","mesa_6"],"sillas":["silla_12","silla_5","silla_13","silla_7"]},
	 * 	{"mesas":[],"sillas":["silla_1", "silla_8"]} ]
	 * // RETORNO:
	 * [ {celda_inicio: D0, celda_fin: F0, dimension: '1x3', geo:{x}, items:{y}, values:{x} }, 
	 * {celda_inicio: G1 , celda_fin: H3 , dimension: '3x2',  geo:{x}, items:{y}. values:{x} }, 
	 * [ {celda_inicio: A1 , celda_fin: A1 , dimension: '1x1',  geo:{x}, items:{y}. values:{'silla_1'} }, 
	 *   {celda_inicio: A0 , celda_fin: A0 , dimension: '1x1',  geo:{x}, items:{y}. values:{'silla_8'} } ]	  
	 * ``` 	 */
	_reservas_a_rangos(arr_reservas = [], dicc_indices={} , dimension_aplicada=null) {
		try {			
			const Salon = this.ref_Salon;
			if (!Array.isArray(arr_reservas) || arr_reservas.length === 0) {throw('Array reservas de entrada Nulo o Sin Datos. Abort');}
			if (!dicc_indices || dicc_indices == {}) {throw('Diccionario de celda:indice Nulo o Sin Datos. Abort');}

			// 💡 La indea es que con la 'dimension' y el 'indice' se puede saber la celda de cada elemento.
			// Las dimensiones del Salon Actualmente
			let dimension = this._standard_dimension(dimension_aplicada);
			
			// ┌■■ Si no entra la dimension como parametro o x error, usa las dimensiones del 'Salon Actuales'.
			// [Esto hace que se pueda pasar a rango una reserva del "Salon" or de "BD".]
			if(!dimension) 
				dimension = this._standard_dimension(Salon.filas, Salon.columnas);

			let indice_s = dicc_indices;
			
			/** ### diccionario {B0:'silla_0', B1:'mesa_3', C12:'silla_1', . . . }  
			 * ## En cualquier dimesión que tenga te devuelve la celda a la que pertenece.
			*/
			const dicc_celda_elemento = {};
			Object.entries(indice_s).forEach(([elemento, indice]) =>{
				const celda = this._get_celda_CON_dimension_X(indice, dimension.columnas, dimension.filas);
				if(!celda) return;
				dicc_celda_elemento[celda] = elemento;				
			});
						
			// ┌••••••••••••••••••••••••
			// ■ array de rangos a devolver
			const array_rangos = [];
			// ┌••••••••••••••••••••••••
			// ┌•• LOGICA DEL NEGOCION: . . . Recorro cada reserva para calcular su rango.
			// ┌••••••••••••••••••••••••
			arr_reservas.forEach(reserva => {

				const mesas = Array.isArray(reserva?.mesas) ? reserva.mesas : [];
				const sillas = Array.isArray(reserva?.sillas) ? reserva.sillas : [];
				
				// ┌■■ La Reserva de 'Sillas Ronin': Se da como resultado un [Array de Rangos].
				// ┌■■ Cada silla genera un rango 1x1 independiente.
                if (mesas.length === 0 && sillas.length > 0) {
					const array_ronin = [];
                    sillas.forEach(silla => {
                        // Encontrar la celda donde está ubicada la silla actual
                        const entrada = Object.entries(dicc_celda_elemento).find(([celda, elemento]) => elemento === silla);
                        if (!entrada) return;                         
                        const [celda_silla, id_silla] = entrada;                        
                        // ⏳ Generando rango temporal 1x1 para la silla ⏳
                        const nombre_temp = this._nombre_secuencial('temporal');
                        const rango_temp = this.api_crear(nombre_temp, celda_silla, '1x1');                        
                        // Asignamos el 'value' específicamente para esta celda y silla (byHand)
                        rango_temp.values = { [celda_silla]: id_silla };                        
                        // ┌■ Introduzco el rango en el array de retorno
                        array_ronin.push(rango_temp);                        
                        // ⏳ Eliminar Temporal ⏳ 
                        this.api_delete(nombre_temp);
                    });
					// Si tenemos datos, insertamos el array en array_rangos
					if(array_ronin) array_rangos.push(array_ronin);                    
                    return; // (continue) salta a la siguiente reserva en el forEach
                }
				// ┌■■■ PREPARO EL DICC VALUES 
				// ┌• Junto mesas y sillas, filtro vacíos.
				const ids_reserva = [...mesas, ...sillas].filter(Boolean);				
				// ┌• Desmontamos el diccionario en pares [celda, elemento] y filtramos comprobando si el elemento existe en el array.
				const pares_reservados = Object.entries(dicc_celda_elemento).filter(([celda, elemento]) => ids_reserva.includes(elemento));
				// ┌• Ensamblamos (reconstruimos) el nuevo diccionario exclusivamente con las reservas confirmadas.
				// Resultado en dicc_reservas:
				// { E3: "silla_1", F3: "mesa_0", G3: "silla_0", E4: "silla_8", F4: "mesa_2", G4: "silla_11", F5: "silla_15" }
				const d_celda_elemento = Object.fromEntries(pares_reservados);
				
				// ┌■■■ NECESITO LOS DATOS PARA "CREAR UN RANGO" PARA TENER: [celda_inicio, celda_fin, dimension, geo e items]
				// ┌■ Obtengo las celdas ocupadas por esta reserva.... celdas_reserva =  ["E0","F0","D0",]
				const celdas_reserva = Object.keys(d_celda_elemento);

				const ci_cf = this.__get_cicf_from_celdas(celdas_reserva);			
				const dimension_rango = this._get_dimension(ci_cf.celda_inicio , ci_cf.celda_fin , false);

				// ⏳ Generando rangos temporales(Creados y borrados) ⏳
				const nombre_temp = this._nombre_secuencial('temporal');
				const rango_temp = this.api_crear(nombre_temp, ci_cf.celda_inicio, dimension_rango);
				rango_temp.values = d_celda_elemento;
				array_rangos.push(rango_temp);
				// ⏳ Eliminar  Temporales ⏳ 
				this.api_delete(nombre_temp);

			});
			
			// Retorno:
			return array_rangos.length > 0 ? array_rangos : false;

		} catch (error) {
			console.log(`❌ Error :::  reservas_a_rangos() ::: ${error}`);
			return null;	
		}
	}


	// Este metodo es de pruebas y tiene que ser borrado. aquí voy a poner todos los metodos llamados desde 
	// cargar_elementos_salon 
	__pruebas_union_interseccion(){
		// const this = this.Salon.eRdS || null;
		// if(!this) return null;
		
		// 👀 Quiero convertir la union en un rango.
		const celdas_union = this._get_union('rango_fila_0','rango_fila_1');

		celdas_union.forEach(ele =>{
			const ci_cf = this.__get_cicf_from_celdas(ele);
			if(ci_cf){
				const union_range = this._get_rango_from_cicf(ci_cf.celda_inicio , ci_cf.celda_fin);
				if(union_range){
					const union_name = this._nombre_secuencial('union');
					this.add_rango(union_name , union_range);
				}
			}
		});

		// 👀 ┌• interseccion fila - columna = 'Celda'
		const celdas_intersección = this._get_interseccion('rango_columna_1','rango_fila_0');
		// 👀 ┌• rangos que no tienen en comun = null
		const celdas_intersección_2 = this._get_interseccion('rango_columna_1','rango_columna_2');
		// 👀 ┌• rango con sigo = []
		const celdas_intersección_3 = this._get_interseccion('rango_columna_1','rango_columna_1');
		
		// 👀 ES RANGO CONTINUO.
		const es_rng_continuous =  this._is_continuos('rango_prueba');
		// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■	
		console.log('👀👀👀 PRUEBAS UNION-INTERSECCION 👀👀👀 ')
		console.log(`• CELDAS-UNION: ${celdas_union} ➿ ${this._is_continuos(celdas_union)} 
• CELDAS-INTERSECCION-1:${celdas_intersección} ➿ ${this._is_continuos(celdas_intersección)} 
• CELDAS-INTERSECCION-2 NULL:${celdas_intersección_2} ➿ ${this._is_continuos(celdas_intersección_2)}
• CELDAS-INTERSECCION-3 []:${celdas_intersección_3} ➿ ${this._is_continuos(celdas_intersección_3)} `);
	}

	
	/** ## Sobre-Escribe el método de la clase 'Wedding_Rangos' añadiendo el diccionario de reservas   */
	api_read_diccionarios(rango){
		// ┌• Viene como ''. Le devuelvo todos los rangos de app.
		if(!rango) 
			return this.d_reservas;
		
		// ┌• Viene como nombre de rango
		if(typeof rango == 'string') {			
			// ┌■■ 'd_rangos'
			const in_ppal = this.api_read(rango);
			if(in_ppal) return this.d_rangos[rango];
			
			// ┌■■ 'd_temporales'
			const in_temporales = this.api_read(rango, this.d_termporales);
			if(in_temporales) return this.d_termporales[rango];
			
			// ┌■■ 'd_temporales'
			const in_reservas = this.api_read(rango, this.d_reservas);
			if(in_reservas) return this.d_reservas[rango];
		}
		
		// ┌• Viene con su ficha
		if(typeof rango === 'object' && rango.celda_inicio && rango.celda_fin && rango.dimension && rango.geo){
			return rango;
		}
		return null;
	}
	/** ### SOBRE-ESCRIBE de Working_Rangos Hace pull a todos los Rangos Registrados */
	pull_all(){
		this.super();
		Object.keys(this.d_reservas).forEach(nombre_rango => { this.to_pull(nombre_rango); });
	}	
	
}

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ FIN CLASE  WORKING_RANGE

// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
// Side__Elementos: Sidebar de elementos (mesa/silla)
//  ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
class Side_Elementos {
	/**
	 * ### Inicializa el sidebar persistente de elementos del Salón.
	 * • Se mantiene vivo en el DOM para reutilizarlo muchas veces (KISS).
	 * @link e_Salon constructor
	 */
	constructor(salon = null, diccionario_elementos = null, icono_disparador = null, opciones = {}) {
		this.icono_disparador = icono_disparador;
		this.Salon = salon;
		this.diccionario_elementos = this._normaliza_elementos(diccionario_elementos);
		this.posicion = opciones.posicion ?? 'right';
		this.modo_tamano = opciones.modo_tamano ?? 'content';
		this.sidebar = null;
		this._estado = 'closed';
		this._ultimo_pointerdown = 0;
		this._bloqueo_movimiento = false;
		this._drag_handle = null;
		this._offset = {
			x: 0,
			y: 0,
		};
		this._drag = {
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
	 * ### Normaliza el diccionario de elementos para trabajar siempre con el mismo formato.
	 * @link constructor
	 */
	_normaliza_elementos(diccionario_elementos) {
		if (diccionario_elementos && Object.keys(diccionario_elementos).length > 0) {
			return Object.entries(diccionario_elementos).reduce((acc, [key, value]) => {
				if (typeof value === 'string') {
					acc[key] = { svg: value, dataTipo: key, baseId: `${key}_menu` };
					return acc;
				}
				acc[key] = {
					svg: value?.svg ?? '',
					dataTipo: value?.dataTipo ?? key,
					baseId: value?.baseId ?? `${key}_menu`,
					title: value?.title ?? '',
				};
				return acc;
			}, {});
		}

		Configuracion_Salon._asegurar_plantillas_menu();
		const mesa_item = document.querySelector('#mesa_menu');
		const silla_item = document.querySelector('#silla_menu');

		return {
			mesa: {
				svg: mesa_item?.querySelector('svg')?.outerHTML ?? '',
				dataTipo: mesa_item?.dataset?.tipo ?? 'mesa',
				baseId: mesa_item?.id ?? 'mesa_menu',
				title: mesa_item?.title ?? '',
			},
			silla: {
				svg: silla_item?.querySelector('svg')?.outerHTML ?? '',
				dataTipo: silla_item?.dataset?.tipo ?? 'silla',
				baseId: silla_item?.id ?? 'silla_menu',
				title: silla_item?.title ?? '',
			},
		};
	}

	/**
	 * ### Crea el sidebar una sola vez o reutiliza el existente para mantenerlo vivo.
	 * @link constructor
	 */
	_crear_sidebar() {
		const sidebar_existente = document.querySelector('[data-side-elementos="sidebar"]');
		if (sidebar_existente) {
			this.sidebar = sidebar_existente;
			this._sincronizar_sidebar_existente();
			return;
		}

		const sidebar = document.createElement('div');
		sidebar.dataset.sideElementos = 'sidebar';
		sidebar.dataset.sidePosition = this.posicion;
		sidebar.dataset.sideState = this._estado;
		sidebar.dataset.sideSizeMode = this.modo_tamano;
		sidebar.dataset.sideDragging = 'false';
		sidebar.dataset.sideLocked = 'false';

		const contenido = document.createElement('div');
		contenido.dataset.sideContent = 'lista';

		Object.entries(this.diccionario_elementos).forEach(([key, config]) => {
			const svg = config?.svg ?? '';
			if (!svg) return;
			const item = document.createElement('div');
			item.dataset.sideItem = key;
			item.classList.add('menu_to_clone');
			item.dataset.tipo = config?.dataTipo ?? key;
			item.id = `${config?.baseId ?? key}_sidebar`;
			item.title = config?.title || `Arrastra ${item.dataset.tipo} al Salón`;
			item.setAttribute('draggable', 'true');
			item.innerHTML = svg;
			contenido.appendChild(item);
			this._activar_drag(item);
		});

		sidebar.appendChild(contenido);
		this.sidebar = sidebar;
		this._asegurar_handle();
		document.body.appendChild(sidebar);
	}

	/**
	 * ### Sincroniza el sidebar reutilizado con el estado y los elementos actuales.
	 * @link _crear_sidebar
	 */
	_sincronizar_sidebar_existente() {
		if (!this.sidebar) return;
		this.sidebar.dataset.sidePosition = this.posicion;
		this.sidebar.dataset.sideState = this._estado;
		this.sidebar.dataset.sideSizeMode = this.modo_tamano;
		this.sidebar.dataset.sideDragging = 'false';
		this.sidebar.dataset.sideLocked = this._bloqueo_movimiento ? 'true' : 'false';
		this._aplicar_offset();
		this._asegurar_handle();

		const items = this.sidebar.querySelectorAll('[data-side-item]');
		items.forEach(item => this._activar_drag(item));
	}

	/**
	 * ### Asegura el indicador/handle de movimiento del sidebar.
	 * @link _crear_sidebar
	 */
	_asegurar_handle() {
		if (!this.sidebar) return;
		let handle = this.sidebar.querySelector('[data-side-handle]');
		if (!handle) {
			handle = document.createElement('button');
			handle.type = 'button';
			handle.dataset.sideHandle = 'true';
			handle.setAttribute('aria-label', 'Mover sidebar');
			handle.title = 'Arrastra para mover el sidebar';
			handle.innerHTML = '<i class="bi bi-disc-fill"></i>';
			this.sidebar.appendChild(handle);
		}
		this._drag_handle = handle;
	}

	/**
	 * ### Bloquea o desbloquea el movimiento del sidebar.
	 */
	set_bloqueo_movimiento(bloqueado = false) {
		this._bloqueo_movimiento = Boolean(bloqueado);
		if (!this.sidebar) return;
		this.sidebar.dataset.sideLocked = this._bloqueo_movimiento ? 'true' : 'false';
		if (this._bloqueo_movimiento) {
			this._resetear_drag();
			this.sidebar.dataset.sideDragging = 'false';
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
		if (!this.sidebar) return;
		this.sidebar.dataset.sidePosition = this.posicion;
		this._offset = { x: 0, y: 0 };
		this._resetear_drag();
		this._aplicar_offset();
	}

	/**
	 * ### Conecta eventos de icono y drag para abrir/cerrar y mover el sidebar.
	 * @link constructor
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
		const tablero = this.Salon;
		if (tablero?.toouch_me?.add_listeners_touchraton) {
			tablero.toouch_me.add_listeners_touchraton(item);
			return;
		}
		if (tablero?.dragStart) {
			item.addEventListener('dragstart', tablero.dragStart.bind(tablero));
		}
	}

	/**
	 * ### Abre el sidebar y activa el estado visual del icono (verde inmediato).
	 * @link _vincular_eventos
	 */
	abrir() {
		this._estado = 'open';
		this.sidebar.dataset.sideState = 'open';
		this.icono_disparador.dataset.sideActive = 'true';
		this.icono_disparador.setAttribute('aria-pressed', 'true');
	}

	/**
	 * ### Cierra el sidebar y desconecta la UI del icono.
	 * @link _vincular_eventos
	 */
	cerrar() {
		this._estado = 'closed';
		this.sidebar.dataset.sideState = 'closed';
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
		this._drag.activo = true;
		this._drag.inicio_x = event.clientX;
		this._drag.inicio_y = event.clientY;
		this._drag.rect_inicio = this.sidebar?.getBoundingClientRect() ?? null;
		this.sidebar.dataset.sideDragging = 'true';
		this.sidebar.setPointerCapture(event.pointerId);
	}

	/**
	 * ### Mueve el sidebar mientras se arrastra (vertical en left/right, horizontal en bottom).
	 * @link _vincular_eventos
	 */
	_on_pointer_move(event) {
		if (!this._drag.activo) return;
		const delta_x = event.clientX - this._drag.inicio_x;
		const delta_y = event.clientY - this._drag.inicio_y;
		const { deltaX, deltaY } = this._limitar_delta(delta_x, delta_y);
		this._drag.delta_x = deltaX;
		this._drag.delta_y = deltaY;

		if (this.posicion === 'right') {
			const delta = Math.max(0, this._drag.delta_x);
			this.sidebar.style.setProperty('--side-drag-x', `${delta}px`);
			this.sidebar.style.setProperty('--side-drag-y', `${this._drag.delta_y}px`);
		}

		if (this.posicion === 'left') {
			const delta = Math.min(0, this._drag.delta_x);
			this.sidebar.style.setProperty('--side-drag-x', `${delta}px`);
			this.sidebar.style.setProperty('--side-drag-y', `${this._drag.delta_y}px`);
		}

		if (this.posicion === 'bottom') {
			const delta = Math.max(0, this._drag.delta_y);
			this.sidebar.style.setProperty('--side-drag-y', `${delta}px`);
			this.sidebar.style.setProperty('--side-drag-x', `${this._drag.delta_x}px`);
		}
	}

	/**
	 * ### Finaliza el arrastre y decide si se cierra o se guarda la nueva posición.
	 * @link _vincular_eventos
	 */
	_on_pointer_up() {
		if (!this._drag.activo) return;
		const rect = this.sidebar?.getBoundingClientRect();
		const umbral_x = rect ? Math.max(24, rect.width * 0.2) : 40;
		const umbral_y = rect ? Math.max(24, rect.height * 0.2) : 40;
		const debe_cerrar =
			(this.posicion === 'right' && this._drag.delta_x > umbral_x) ||
			(this.posicion === 'left' && this._drag.delta_x < -umbral_x) ||
			(this.posicion === 'bottom' && this._drag.delta_y > umbral_y);

		this._drag.activo = false;
		this.sidebar.dataset.sideDragging = 'false';

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
		if (!this.sidebar || !this._drag.rect_inicio) return;
		const margen = 12;
		const rect = this._drag.rect_inicio;

		if (this.posicion === 'bottom') {
			const min_delta = -(rect.left - margen);
			const max_delta = window.innerWidth - rect.right - margen;
			const delta = this._clamp(this._drag.delta_x, min_delta, max_delta);
			this._offset.x += delta;
		} else {
			const min_delta = -(rect.top - margen);
			const max_delta = window.innerHeight - rect.bottom - margen;
			const delta = this._clamp(this._drag.delta_y, min_delta, max_delta);
			this._offset.y += delta;
		}

		this._aplicar_offset();
	}

	/**
	 * ### Aplica el offset persistente al CSS del sidebar.
	 * @link _consolidar_offset
	 */
	_aplicar_offset() {
		if (!this.sidebar) return;
		this.sidebar.style.setProperty('--side-offset-x', `${this._offset.x}px`);
		this.sidebar.style.setProperty('--side-offset-y', `${this._offset.y}px`);
	}

	/**
	 * ### Limita los deltas de arrastre para no sacar el sidebar de pantalla.
	 * @link _on_pointer_move
	 */
	_limitar_delta(delta_x, delta_y) {
		if (!this._drag.rect_inicio) return { deltaX: delta_x, deltaY: delta_y };
		const margen = 12;
		const rect = this._drag.rect_inicio;

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
		this._drag.delta_x = 0;
		this._drag.delta_y = 0;
		this._drag.rect_inicio = null;
		if (!this.sidebar) return;
		this.sidebar.style.setProperty('--side-drag-x', '0px');
		this.sidebar.style.setProperty('--side-drag-y', '0px');
	}
}



//  ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
/** ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
 * ### Responsable de unificar el manejo de ratón y touch para drag and drop.  🧠
 *              Recibe una referencia al tablero y encapsula toda la lógica de eventos. 🧠
 *  ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘
 */
class Touch_aMe {

	/**
	 * ✨ SOLUCION KISS PARA TOUCH EN MOVIL + PAPELERA
	 * 
	 * 🎯 PROBLEMA ORIGINAL:
	 *    • En móvil, document.elementFromPoint(x, y) devolvía el SVG dentro de la papelera,
	 *    • No el contenedor con data-tipo="exit", causando que no se detectara correctamente.
	 *    • Las baldosas sí funcionaban porque son elementos grandes sin SVGs internos.
	 *
	 * ✅ SOLUCIÓN IMPLEMENTADA (KISS):
	 *    1. Nuevo método: _obtener_contenedor_drop_real(elemento)
	 *       → Busca hacia arriba en el árbol DOM para encontrar el contenedor correcto
	 *       → Maneja papeleras (data-tipo), baldosas (class estiloBaldosas)
	 *       → Muy legible y mantenible por humanos
	 *
	 *    2. Simplificación en handleTouch_end():
	 *       → Elimina lógica redundante _get_baldosa_from_point
	 *       → Usa solo el nuevo método KISS unificado
	 *       → Comentarios humanos claros y emojis descriptivos
	 *
	 * 📝 VENTAJAS:
	 *    ✓ Funciona en móvil y escritorio
	 *    ✓ Maneja SVGs, spans y otros elementos dentro de contenedores
	 *    ✓ Código muy legible y fácil de mantener
	 *    ✓ Solo 1 responsabilidad por función (KISS)
	 */

        constructor(tablero){
                this.tablero = tablero;
                this.touchState = { draggedElement: null, activeDropTarget: null };
				this.tapThreshold = 10;
        }

        /**
         * ### Extrae una posición {x, y} unificada para eventos de ratón o táctiles.
         */
        get_coordenadas_evento(evento){
                if (!evento) return { x: 0, y: 0 };

                const touch = (evento.touches && evento.touches[0]) || (evento.changedTouches && evento.changedTouches[0]);
                if (touch) return { x: touch.clientX, y: touch.clientY };

                return { x: evento.clientX || 0, y: evento.clientY || 0 };
        }

        /**
         * ### Cachea el origen del drag para reutilizarlo en ratón o táctil.
         */
        get_origen_drag(elemento){
			if (!elemento || !this.tablero) return;
			this.tablero.objeto_drag = elemento;
			this.tablero.data_tipo = elemento.getAttribute('data-tipo') || '';
        }

        /**
         * ###  ​👂​👂 Añade manejadores de drag y touch al mismo elemento para escritorio y móvil.
		 * • Amplia y sustituye este codigo:\
		 * const items_html_to_matriz = document.querySelectorAll(".menu_to_clone");
		 * ​​​​​​​if (items_html_to_matriz.length > 0) {
		 * 		​items_html_to_matriz.forEach(el => el.addEventListener("dragstart", this.dragStart.bind(this)));
		 * ​​​​​​​}
         */
        add_listeners_touchraton(elemento){
                if (!elemento || !this.tablero) return;
                elemento.draggable = true;
                elemento.style.touchAction = 'none';

                elemento.removeEventListener('dragstart',  this.tablero.dragStart);
                elemento.removeEventListener('touchstart', this.handleTouch_start);
                elemento.removeEventListener('touchmove',  this.handleTouch_movimiento);
                elemento.removeEventListener('touchend',   this.handleTouch_end);
				window.removeEventListener('touchcancel', this.finalizarArrastre); // <--- ESTO SOLUCIONA EL BLOQUEO

                elemento.addEventListener('dragstart',  this.tablero.dragStart.bind(this.tablero));
                elemento.addEventListener('touchstart', this.handleTouch_start.bind(this), { passive: false });
                elemento.addEventListener('touchmove',  this.handleTouch_movimiento.bind(this), { passive: false });
                elemento.addEventListener('touchend',   this.handleTouch_end.bind(this) , { passive: false }  );
				window.addEventListener('touchcancel', this.finalizarArrastre.bind(this)); // <--- ESTO SOLUCIONA EL BLOQUEO
        }
		// 1. Definimos una función de limpieza única para cumplir con KISS
		finalizarArrastre() {
			this._cleanup_touch_preview();
			this._reset_touch_state();

			// Si aplicas clases CSS durante el drag, quítalas aquí
			// document.body.classList.remove('dragging-active');
			// ■■ Desbloquea el sidebar por si quedó enganchado tras un touchcancel.
			this.tablero?._set_bloqueo_sidebar(false);
			
			console.log("Drag finalizado o cancelado: Estado reseteado.");
		}

		/**
		 * ### Crea un clon visual para seguir el dedo sin alterar el DOM original.
		 */
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

		/**
		 * ### Obtiene la baldosa real bajo el punto indicado (x, y).
		 */
		_get_baldosa_from_point(x, y, fallbackTarget = null){
			const elements = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [];
			const baldosa = elements.find(elemento => elemento.classList && elemento.classList.contains('estiloBaldosas'));
			if (baldosa) return baldosa;

			if (fallbackTarget && fallbackTarget.closest) {
				return fallbackTarget.closest('.estiloBaldosas');
			}
			return null;
		}

		/**
		 * ### ✨ METODO KISS: Busca el contenedor drop correcto en la jerarquía
		 * Maneja tanto papeleras (exit) como baldosas.
		 * El SVG dentro de la papelera causa que elementFromPoint devuelva el SVG,
		 * así que buscamos hacia arriba en el árbol para encontrar el contenedor real.
		 * 
		 * @param {HTMLElement} elementoDetectado - Elemento que devolvió elementFromPoint(x,y)
		 * @returns {HTMLElement|null} - El contenedor drop correcto (papelera o baldosa)
		 */
		_obtener_contenedor_drop_real(elementoDetectado) {
			if (!elementoDetectado) return null;

			// ┌•••• 1️⃣ Primero: ¿Es un elemento con data-tipo (papelera)?
			// Si el mismo elemento tiene data-tipo, ya es lo que buscamos
			if (elementoDetectado.dataset && elementoDetectado.dataset.tipo) {
				return elementoDetectado;
			}

			// ┌•••• 2️⃣ Segundo: ¿Está dentro de un elemento con data-tipo?
			// Esto ocurre cuando SVG o un span está dentro de <div data-tipo="exit">
			const contenedorExit = elementoDetectado.closest('[data-tipo]');
			if (contenedorExit && contenedorExit.dataset.tipo) {
				return contenedorExit;
			}

			// ┌•••• 3️⃣ Tercero: ¿Es una baldosa?
			if (elementoDetectado.classList && elementoDetectado.classList.contains('estiloBaldosas')) {
				return elementoDetectado;
			}

			// ┌•••• 4️⃣ Cuarto: ¿Está dentro de una baldosa?
			const contenedorBaldosa = elementoDetectado.closest('.estiloBaldosas');
			if (contenedorBaldosa) {
				return contenedorBaldosa;
			}

			// ┌•••• Si nada de lo anterior, devolver null
			return null;
		}

		/**
		 * ### Mueve el clon visual siguiendo el dedo.
		 */
		_move_drag_preview(x, y){
			const preview = this.touchState.dragPreview;
			if (!preview) return;
			const left = x - this.touchState.offsetX;
			const top = y - this.touchState.offsetY;
			preview.style.transform = `translate3d(${left}px, ${top}px, 0)`;
		}

        /**
         * ### Gestiona el inicio de arrastre táctil.
         */
		handleTouch_start(evento){
                if (!evento) return;
                if (evento.cancelable) evento.preventDefault();
                const objetivo = evento.currentTarget;
				const { x, y } = this.get_coordenadas_evento(evento);
				const rect = objetivo.getBoundingClientRect();
				const offsetX = x - rect.left;
				const offsetY = y - rect.top;
				const preview = this._create_drag_preview(objetivo, rect);
                this.get_origen_drag(objetivo);
				// ■■ Bloquea el sidebar si estamos moviendo mesa/silla.
				if (this.tablero?._es_mesa_silla?.(this.tablero.data_tipo)) {
					this.tablero._set_bloqueo_sidebar(true);
				}
				const previousVisibility = objetivo.style.visibility;
				objetivo.style.visibility = 'hidden';
                this.touchState = {
					draggedElement: objetivo,
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
					pendingMove: null
				};
        }

        /**
         * ### Actualiza la zona potencial de drop durante el movimiento táctil.
         */
        handleTouch_movimiento(evento) {
			if (!evento || !this.touchState.draggedElement) return;
			
			// 1. Prevenir scroll (ya lo tenías)
			if (evento.cancelable) evento.preventDefault(); 

			const { x, y } = this.get_coordenadas_evento(evento);
			this.touchState.lastX = x;
			this.touchState.lastY = y;

			// Algoritmo de suavidad: hace que el elemento siga al dedo.🪑 ► 👈
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

        /**
         * ### Finaliza el arrastre táctil y ejecuta la misma lógica de drop que en escritorio.
		 * 				• Si el Drop funciona:  La lógica de Salon.js mueve el elemento en el DOM (nuevoPadre.appendChild(silla)). 
		 * 										Al limpiar los estilos, la silla se queda en la nueva casa.
		 * 				• Si el Drop falla: Tu lógica de Salon.js no hace nada. 
		 * 										La silla sigue siendo hija del Padre_Viejo. 
		 * 										Al limpiar los estilos (position: fixed fuera), la silla "aparece" de golpe en el Padre_Viejo.
         */
        handleTouch_end(evento) {
			// ┌•••• Si no estábamos arrastrando nada, salir.
			if (!this.touchState.draggedElement) return;

			// ┌•••• drag
			const el = this.touchState.draggedElement;
			
			// ┌•••• Referencia al padre original (por seguridad, aunque el DOM lo mantiene)
			const padreOriginal = el.parentElement;

			// ┌•••• Determinar dónde estamos soltando (Target)
			const coordenadas = this.get_coordenadas_evento(evento);
			let x = coordenadas.x;
			let y = coordenadas.y;
			if (!x && !y) {
				x = this.touchState.lastX || 0;
				y = this.touchState.lastY || 0;
			}
			const deltaX = x - this.touchState.startX;
			const deltaY = y - this.touchState.startY;
			// ■ Math.hypot asegura que:
			// 	 • No importa la dirección (el resultado siempre es positivo).
			// 	 • Mide el desplazamiento real en cualquier ángulo.
			const isTap = Math.hypot(deltaX, deltaY) <= this.tapThreshold;

			// ┌•••• Identificar elemento bajo el dedo (Baldosa destino)
			// ┌•••• •• Es vital •ocultar• temporalmente el elemento arrastrado para ver "qué hay debajo"
			if (this.touchState.dragPreview) {
				this.touchState.dragPreview.style.display = 'none';
			}
			// ┌••••
			let elementoDetectado = document.elementFromPoint(x, y);
			// ┌•••• Usar método KISS para obtener contenedor drop correcto
			let targetReal = this._obtener_contenedor_drop_real(elementoDetectado);

			if (this.touchState.dragPreview) {
				this.touchState.dragPreview.style.display = 'block';
			}
			// ┌•••• Si fue un tapeo y no un arrastre:
			if (isTap) {
				/**
				 * ┌•••• • ABORTAR ARRASTRE Y RESETEAR ESTADO
				 * Si el movimiento no superó el umbral, limpiamos el rastro del drag
				 * y disparamos un evento click nativo.
				 */
				this._cleanup_touch_preview();			
				this._reset_touch_state();
				/**
				 * ┌•••• • queueMicrotask: Ejecuta el click inmediatamente después de que el ciclo actual
				 * de JavaScript termine, pero antes de que el navegador vuelva a pintar la pantalla.
				 * Se usa para asegurar que el estado de 'touchState' esté limpio antes de que
				 * cualquier lógica externa del 'click' se ejecute.
				 */
				queueMicrotask(() => el.click());

				// ┌•••• • Detiene la ejecución para que no se procese como un evento de "soltar" (drop)
				this.tablero?._set_bloqueo_sidebar(false);
				return;
			}

			// ┌•••• Crear el evento sintético (simulación de HTML5 DragDrop)
			const syntheticEvent = this._buildSyntheticDropEvent(targetReal, el, { x, y });

			// ┌•••• Intentar realizar el DROP en el tablero
			let dropExitoso = false;

			if (this.tablero && targetReal) {
				// ■■ Detectar si el target es una papelera (exit)
				const isExit = targetReal.dataset && targetReal.dataset.tipo === 'exit';
				x
				if (isExit && this.tablero.drop_exit) {
					// ► Es una papelera, usar drop_exit
					syntheticEvent.target = targetReal; 
					dropExitoso = this.tablero.drop_exit(syntheticEvent);
					console.log(`📍 detectado: PAPELERA (exit) en ${targetReal.id}`);
				} else {
					// ► Es una baldosa, usar drop__over_matriz
					const baldosaDestino = this._get_baldosa_from_point(x, y, targetReal) || targetReal; 
					
					// Esta función debe devolver TRUE si movió la silla, FALSE si falló.
					if (this.tablero.drop_over_matriz) {
						// Inyectamos el target correcto en el evento sintético
						syntheticEvent.target = baldosaDestino; 
						dropExitoso = this.tablero.drop_over_matriz(syntheticEvent);

					}
				}
			}
			// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
			// ■■■ 🧠LOGICA DE RETORNO (CLEANUP)🧠 ■■■
			// Indiferentemente de si fue éxito o fallo, debemos limpiar el desorden visual.
			// Quitamos el clon visual y restauramos la visibilidad original
			this._cleanup_touch_preview();

			// b) Manejo del resultado
			if (dropExitoso) {
				// El método drop__over_matriz SE ENCARGÓ de hacer appendChild al nuevo padre.
				console.log("✅ Movimiento táctil exitoso");
				el.style.visibility = "visible";

			} else {
				// 🛑 FALLO (Baldosa llena, fuera de pantalla, etc.)
				// Como NO se hizo un appendChild nuevo, el elemento 'el' sigue siendo hijo de 'padreOriginal'.
				// Al quitarle el position: fixed (paso 5a), el navegador lo vuelve a pintar en su origen automáticamente.
				console.warn("⚠️ Movimiento inválido: El elemento vuelve a su origen.");
			}

			// 6. Resetear estado global
			this._reset_touch_state();
			this.tablero?._set_bloqueo_sidebar(false);


		}

		/**
		 * ## 
		 */
		_reset_touch_state(){
			this.touchState = {
					draggedElement: null, 		// ┌• Referencia al nodo DOM que se estaba intentando mover
					activeDropTarget: null, 	// ┌•  Referencia a la zona donde se podría haber soltado el objeto
					// ┌• Coordenadas originales donde se puso el dedo por primera vez 👉
					startX: 0, startY: 0,
					// ┌•  Últimas coordenadas registradas antes de soltar o cancelar
					lastX: 0, lastY: 0, 
					// ┌•  Distancia relativa entre el dedo y la esquina superior izquierda del elemento 👉↖️
					offsetX: 0,	 offsetY: 0,
					dragPreview: null,			// ┌• Referencia al nodo clonado/transparente que se muestra durante el arrastre
					previousVisibility: '',  	// ┌• Almacena el estilo 'visibility' original para restaurar el elemento tras ocultarlo
					rafId: null,				// ┌• ID del RequestAnimationFrame activo para poder cancelarlo y evitar fugas de memoria
					pendingMove: null			// ┌• Almacena el último evento de movimiento pendiente de ser procesado por el siguiente frame
				};

		}
		/**
		 * ### Elimina el elemento visual (fantasma) que seguía al dedo durante el intento de drag
		 * ### {@link handleTouch_end}
		 */
		_cleanup_touch_preview(){
			if (this.touchState.rafId) {
				cancelAnimationFrame(this.touchState.rafId);
			}
			if (this.touchState.dragPreview) {
				this.touchState.dragPreview.remove();
			}
			if (this.touchState.draggedElement) {
				this.touchState.draggedElement.style.visibility = this.touchState.previousVisibility || '';
			}
		}

        /**
         * ### Construye un objeto de evento mínimo para reutilizar la lógica de drop existente.
         */
        _buildSyntheticDropEvent(target, draggedElement, coords = {}){
			const dataTipo = (draggedElement && draggedElement.getAttribute('data-tipo')) || '';
			const { x = 0, y = 0 } = coords;
			return {
					preventDefault: () => {},
					target,
					clientX: x,
					clientY: y,
					dataTransfer: {
							getData: (key) => {
									if (key === 'text') return draggedElement ? draggedElement.id : '';
									if (key === 'tipo') return dataTipo;
									return '';
							}
					}
			};
        }
}		// ◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘◘ FIN CLASE  Touch_aMe
