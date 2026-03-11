# 🍷 The Saloon (Salon Div_x_Div)

> **Sistema Visual de Gestión de Reservas y Distribución de Mesas.**

**The Saloon** es una aplicación web interactiva diseñada para gestionar la distribución de mesas y clientes en un restaurante o salón de eventos. Utiliza un sistema de **matriz dinámica** (Grid) que permite arrastrar y soltar (Drag & Drop) elementos para crear configuraciones de sala en tiempo real, gestionar reservas y tomar notas mediante voz.

![Status](https://img.shields.io/badge/Status-En_Desarrollo-yellow)
![Tech](https://img.shields.io/badge/Stack-Vanilla_JS_ES6-f7df1e)
![Style](https://img.shields.io/badge/Style-Bootstrap_5-7952b3)
![DB](https://img.shields.io/badge/DB-MariaDB-003545)

---

## 📋 Tabla de Contenidos
1. [Características Principales](#-características-principales)
2. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
3. [Estructura de Archivos](#-estructura-de-archivos)
4. [Instalación y Uso](#-instalación-y-uso)
5. [Modelo de Datos](#-modelo-de-datos)
6. [Contribución](#-contribución)

---

## 🚀 Características Principales

* **Matriz Dinámica (Grid):** Un tablero visual basado en baldosas (`divs`) que se adapta a diferentes tamaños de pantalla (Responsive).
* **Drag & Drop Nativo:** Arrastra mesas y sillas desde un menú lateral directamente al salón.
* **Lógica de Reservas Inteligente:**
    * Detecta automáticamente grupos de mesas adyacentes.
    * Escanea el entorno (Norte, Sur, Este, Oeste) de cada elemento para establecer relaciones.
* **Gestión de Detalles (PopOver):**
    * Click en una mesa/silla para ver o editar detalles.
    * **Reconocimiento de Voz:** Permite dictar notas (alergias, nombres) directamente al navegador.
* **Snapshots (Fotos):** Capacidad para guardar el estado completo del salón (configuración + reservas) en un JSON para persistencia histórica.
* **Interfaz Limpia:** Utiliza Bootstrap 5 y Offcanvas para una UI moderna y despejada.

---

## 🏗 Arquitectura del Proyecto

El núcleo del proyecto reside en `div_x_div.js` y `Salon.js`. Se ha utilizado una **Programación Orientada a Objetos (POO)** basada en herencia para mantener el código modular y escalable.

### Jerarquía de Clases

1.  **`Matriz_Plana` (Base):**
    * Gestiona la lógica matemática de una matriz unidimensional que se comporta como bidimensional.
    * Calcula índices, filas y columnas. No manipula el DOM directamente.

2.  **`Div_X_Div` (Extiende `Matriz_Plana`):**
    * Crea la representación visual. Genera los `divs` (baldosas) en el DOM.
    * Maneja los estilos CSS y los Tags/Flags de cada celda.

3.  **`Tablero_Drop` (Extiende `Div_X_Div`):**
    * Añade la capa de interactividad.
    * Gestiona los eventos `dragstart`, `dragover` y `drop`.
    * Controla el movimiento de elementos (Menú -> Salón, Salón -> Salón, Salón -> Papelera).

4.  **`e_Salon` (Extiende `Tablero_Drop`):**
    * **Clase Principal.** Contiene la lógica de negocio específica del restaurante.
    * Gestiona las **Reservas** (agrupación de mesas).
    * Maneja los **PopOvers** y la interacción con la API (Guardar/Cargar).
    * Controla el reconocimiento de voz y la lógica de colores por reserva.

---


## 📂 Estructura de Archivos

```text
salon_last_dance/
├── cliente_web/                  # Frontend estático
│   ├── imgs/                     # Iconos y gráficos del cliente
│   ├── css/                      # Hojas de estilo
│   │   ├── div_x_div.css         # Estilos base de la matriz
│   │   ├── estilo_popover.css    # Estilos del popover del salón
│   │   └── estilo_salon.css      # Estilos específicos del tema visual
│   ├── js/                       # Lógica de la interfaz
│   │   ├── Salon.js              # Lógica de negocio principal del salón
│   │   └── div_x_div.js          # Núcleo de matriz y Drag&Drop
│   ├── components/               # Fragmentos HTML reutilizables
│   │   ├── border-radius.htc
│   │   ├── form.html
│   │   └── navbar.html
│   └── index.html                # Punto de entrada de la aplicación
├── server/                       # Backend (estructura preparada)
│   ├── config/
│   ├── routes/
│   └── controllers/
├── db/
│   ├── schema.sql                # Esquema de la base de datos MariaDB
│   └── README.md                 # Documentación específica de BBDD
├── .env.example                  # Variables de entorno de muestra
├── .gitignore
└── README.md
```
