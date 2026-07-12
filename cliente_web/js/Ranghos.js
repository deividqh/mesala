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
	 * @param {number} indice - El índice del elemento en el array unidimensional (empezando en 0).
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
			const reservers = Array.isArray(reserva?.reservers) ? reserva.reservers : [];
			const clientes = Array.isArray(reserva?.clientes) ? reserva.clientes : [];
			const ids_items = [...reservers, ...clientes].filter(Boolean);
			if (ids_items.length === 0) return [];

			// ┌••   •••••••••••••  •••••••••••••••••••
			// • • • Caso especial: reservas sin mesas. Las sillas se agrupan en línea
			// para compactar la geometría y facilitar el re_posicionamiento.
			if (reservers.length === 0 && clientes.length > 0) {
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
	
	/** ## Crea un rango "temporal" en "this.d_temporales"
	 * ### Hay que llamar a [destruye_temporales] para eliminar pero puedes eliminar todos los temporales, uno solo o toda una familia.
	 */
	crear_temporal(celda_inicio, dimension){
		
		const nombre_temporal = this._nombre_secuencial('temporal');	
		if(!nombre_temporal) return null;		
		// ┌• Introduce en this.d_rangos y lo organiza en this.d_temporales	
		this.d_temporales[nombre_temporal] = this.api_crear(nombre_temporal, celda_inicio, dimension, false);		
		// ┌• Lo borro de d_rangos. De esta manera solo queda en this.d_temporales
		this.api_delete(nombre_temporal);	
		
		// ┌• Retorna el nombre del temporal creado en this.d_temporales
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
		const temporales = this.d_temporales;
		if(this.d_temporales == {}) return;

		if(!nombre_rango){
			// ┌■ Elimina 'todos' los temporales.
			Object.keys(temporales).forEach(nombre_temporal =>{
				this.api_delete(nombre_temporal, this.d_temporales);
			});		
			return;
		}
		if(nombre_rango && only_one){
			// ┌■ (byDef) - Elimina 'sólo este rango'. Si no existe no posa nada.
			this.api_delete(nombre_rango, this.d_temporales);

		}else if(nombre_rango && !only_one){
			// ┌■ Elimina la 'familia' (startswith)
			const criterio = nombre_rango.toLowerCase();
			Object.keys(temporales).forEach((nombre_temporal) => {
				if (nombre_temporal.toLowerCase().startsWith(criterio)) {
					this.api_delete(nombre_temporal, this.d_temporales);
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
				
				const menu_element = Salon?._what_player_menu(id_player_fantasma);					
				if(!menu_element) return; 	// . . . continue 	
				const idkey_menu = menu_element.dataset.id_key;
				if(!idkey_menu) return; 	// . . . continue 	
				
				// ┌■■ Cut o Copy ??  🧠🧠									
				if(Cut && !Copy){
					// ┌• Si No Existe en el Salon lo Crea(lo saloniza).
					// const player = this._X_to_element(player_fantasma?.id);					

					const player = menu_element.cloneNode(true);
					if (player) {
						player.id = id_player_fantasma; 
						Salon._saloniza_elemento(player);
					}
					// ┌• Se deposita sobre la baldosa.
					baldosa_destino.appendChild(player);						
					
					// ┌■ BUFFER de elementos(opcional)
					this.llenar_buffer(player);
					
				}else if(!Cut && Copy){					
					
					// ┌• Clonamos el nodo para mantener el ghost intacto para futuros pegados
					const new_player = menu_element.cloneNode(true);
					if (new_player) {
						new_player.id = Herramientas.get_dom_secuency(idkey_menu); 
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
			// Catalogo.get(id_del_elemento)
			
			if(!menu_element) return; 	// . . . continue 
			const new_elemento = menu_element.cloneNode(true);
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
			const in_temp = this.api_read(rango, this.d_temporales);
			if(in_temp) return this.d_temporales[rango];
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
	get temp(){return this.d_temporales};
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

				const reservers = Array.isArray(reserva?.reservers) ? reserva.reservers : [];
				const clientes = Array.isArray(reserva?.clientes) ? reserva.clientes : [];
				
				// ┌■■ La Reserva de 'Sillas Ronin': Se da como resultado un [Array de Rangos].
				// ┌■■ Cada silla genera un rango 1x1 independiente.
                if (reservers.length === 0 && clientes.length > 0) {
					const array_ronin = [];
                    clientes.forEach(cli => {
                        // Encontrar la celda donde está ubicada la silla actual
                        const entrada = Object.entries(dicc_celda_elemento).find(([celda, elemento]) => elemento === cli);
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
				const ids_reserva = [...reservers, ...clientes].filter(Boolean);				
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
			const in_temporales = this.api_read(rango, this.d_temporales);
			if(in_temporales) return this.d_temporales[rango];
			
			// ┌■■ 'reservas'
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
