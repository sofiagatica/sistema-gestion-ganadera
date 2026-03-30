# 🐄 Agrossoft - Sistema de Gestión Ganadera

Sistema web completo para la gestión integral de explotaciones ganaderas, desarrollado con Angular. Permite administrar el inventario de ganado, ventas, historial sanitario y generar reportes detallados.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración](#-configuración)
- [Persistencia de Datos](#-persistencia-de-datos)
- [Desarrollo](#-desarrollo)
- [Construcción para Producción](#-construcción-para-producción)
- [Pruebas](#-pruebas)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características

- **Gestión de Inventario**: Registro completo de animales con caravana, datos de nacimiento, raza, peso y más
- **Control de Ventas**: Registro y seguimiento de transacciones comerciales
- **Historial Sanitario**: Gestión de vacunaciones, tratamientos y eventos sanitarios
- **Reportes y Estadísticas**: Visualización de stock por categoría, historial de comercialización y más
- **Interfaz Moderna**: Diseño responsive con animaciones suaves usando AOS (Animate On Scroll)
- **Persistencia Local**: Almacenamiento de datos en el navegador mediante localStorage
- **Navegación Intuitiva**: Sistema de rutas con múltiples secciones informativas

## 🛠 Tecnologías Utilizadas

- **Angular 20.3.0**: Framework principal
- **TypeScript 5.9.2**: Lenguaje de programación
- **RxJS 7.8.0**: Programación reactiva
- **AOS (Animate On Scroll) 2.3.4**: Animaciones en scroll
- **Angular Router**: Sistema de navegación
- **Karma & Jasmine**: Framework de testing

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js) o **yarn**
- **Angular CLI** (se instalará como dependencia del proyecto)

## 🚀 Instalación

1. **Clonar el repositorio** (o descargar el proyecto):
   ```bash
   git clone <url-del-repositorio>
   cd tesisweb
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Verificar la instalación**:
   ```bash
   ng version
   ```

## 💻 Uso

### Servidor de Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`. El servidor se recarga automáticamente cuando modificas los archivos fuente.

### Acceso a las Secciones

Una vez iniciado el servidor, puedes navegar a las siguientes secciones:

- **Inicio**: `http://localhost:4200/`
- **Acerca de**: `http://localhost:4200/about`
- **Funcionalidades**: `http://localhost:4200/funcionalidades`
- **Metodología**: `http://localhost:4200/metodologia`
- **Alta de Ganado**: `http://localhost:4200/alta-ganado`
- **Ventas**: `http://localhost:4200/ventas`
- **Gestión Sanitaria**: `http://localhost:4200/gestion-sanitaria`
- **Reportes**: `http://localhost:4200/reportes`

## 📁 Estructura del Proyecto

```
tesisweb/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes de la aplicación
│   │   │   ├── about/          # Página "Acerca de"
│   │   │   ├── alta-ganado/    # Formulario de alta de ganado
│   │   │   ├── footer/         # Pie de página
│   │   │   ├── funcionalidades/# Página de funcionalidades
│   │   │   ├── gestion-sanitaria/# Gestión de historial sanitario
│   │   │   ├── header/         # Encabezado de navegación
│   │   │   ├── home/           # Página principal
│   │   │   ├── icons/          # Componente de iconos
│   │   │   ├── metodologia/    # Página de metodología
│   │   │   ├── modal/          # Componente modal
│   │   │   ├── reportes/       # Página de reportes
│   │   │   └── ventas/         # Gestión de ventas
│   │   ├── services/           # Servicios de la aplicación
│   │   │   └── datos.service.ts # Servicio principal de datos
│   │   ├── app.ts              # Componente raíz
│   │   ├── app.routes.ts       # Configuración de rutas
│   │   ├── app.config.ts       # Configuración de la app
│   │   └── app.css             # Estilos globales
│   ├── index.html              # HTML principal
│   ├── main.ts                 # Punto de entrada
│   └── styles.css              # Estilos globales
├── public/                     # Archivos estáticos públicos
├── dist/                       # Build de producción (generado)
├── angular.json                # Configuración de Angular CLI
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Este archivo
```

## 🎯 Funcionalidades Principales

### 1. Alta de Ganado
- Registro de nuevos animales con información completa
- Campos: caravana, fecha de nacimiento, raza, peso, sexo, etc.
- Validación de datos y persistencia automática

### 2. Gestión de Ventas
- Registro de transacciones comerciales
- Asociación con animales por caravana
- Registro de compradores, montos y tipo de operación
- Historial completo de comercialización

### 3. Gestión Sanitaria
- Registro de vacunaciones
- Control de tratamientos médicos
- Historial sanitario por animal
- Fechas de próximas vacunaciones

### 4. Reportes
- Stock total de animales
- Clasificación por categorías (cría, recría, engorde)
- Historial de comercialización
- Estadísticas de ventas

### 5. Navegación y UI
- Diseño responsive
- Animaciones con AOS
- Navegación intuitiva entre secciones
- Componentes reutilizables

## 📜 Scripts Disponibles

### Desarrollo
```bash
npm start          # Inicia el servidor de desarrollo
ng serve           # Equivalente al anterior
```

### Construcción
```bash
npm run build      # Construye la aplicación para producción
ng build           # Equivalente al anterior
ng build --watch   # Construcción en modo watch
```

### Testing
```bash
npm test           # Ejecuta las pruebas unitarias
ng test            # Equivalente al anterior
```

### Utilidades
```bash
ng generate component nombre-componente  # Genera un nuevo componente
ng generate service nombre-servicio      # Genera un nuevo servicio
ng generate --help                       # Lista todos los comandos disponibles
```

## ⚙️ Configuración

### Configuración de Prettier

El proyecto incluye configuración de Prettier para mantener un código consistente:

```json
{
  "printWidth": 100,
  "singleQuote": true
}
```

### Configuración de TypeScript

Los archivos de configuración de TypeScript están en:
- `tsconfig.json`: Configuración base
- `tsconfig.app.json`: Configuración para la aplicación
- `tsconfig.spec.json`: Configuración para pruebas

## 💾 Persistencia de Datos

El sistema utiliza **localStorage** del navegador para persistir los datos. Los datos se guardan automáticamente cuando:

- Se agrega un nuevo animal
- Se registra una venta
- Se actualiza el historial sanitario
- Se modifica cualquier información

**Nota importante**: Los datos se almacenan localmente en el navegador. Si limpias el caché o cambias de navegador, los datos se perderán. Para producción, se recomienda implementar un backend con base de datos.

### Claves de localStorage utilizadas:
- `agrossoft_animales`: Lista de animales registrados
- `agrossoft_ventas`: Historial de ventas
- `agrossoft_historial`: Historial sanitario
- `agrossoft_historias_comercializacion`: Historial de comercialización

## 🔧 Desarrollo

### Generar un nuevo componente

```bash
ng generate component components/nombre-componente
```

### Generar un nuevo servicio

```bash
ng generate service services/nombre-servicio
```

### Estructura de un componente

Cada componente incluye:
- Archivo TypeScript (`.ts`): Lógica del componente
- Archivo HTML (`.html`): Template
- Archivo CSS (`.css`): Estilos del componente
- Opcionalmente: Archivo de pruebas (`.spec.ts`)

## 🏗 Construcción para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

O con configuración específica:

```bash
ng build --configuration production
```

Los archivos compilados se generarán en la carpeta `dist/agrossoft/browser/`.

### Optimizaciones incluidas:
- Minificación de código
- Tree-shaking
- Optimización de assets
- Hash en nombres de archivos para cache busting

## 🧪 Pruebas

El proyecto está configurado con Karma y Jasmine para pruebas unitarias.

```bash
npm test
```

Las pruebas se ejecutan en modo watch por defecto. Para ejecutar una vez:

```bash
ng test --watch=false
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Seguir las convenciones de Angular Style Guide
- Usar Prettier para formateo de código
- Escribir pruebas para nuevas funcionalidades
- Documentar código complejo

## 📝 Notas Adicionales

### AOS (Animate On Scroll)

El proyecto utiliza AOS para animaciones. Se carga desde CDN en `index.html` y se inicializa automáticamente en el componente raíz.

### Compatibilidad de Navegadores

La aplicación es compatible con navegadores modernos que soporten:
- ES6+
- LocalStorage API
- CSS3

### Próximas Mejoras Sugeridas

- [ ] Integración con backend API
- [ ] Autenticación de usuarios
- [ ] Exportación de reportes a PDF/Excel
- [ ] Búsqueda y filtros avanzados
- [ ] Gráficos y visualizaciones de datos
- [ ] Modo offline con Service Workers
- [ ] Sincronización en la nube

## 📄 Licencia

Este proyecto es privado y está destinado para uso académico/tésis.

## 👨‍💻 Autor

Desarrollado como parte de un proyecto de tesis.

## 📞 Soporte

Para preguntas o problemas, por favor abre un issue en el repositorio del proyecto.

---

**Versión**: 0.0.0  
**Última actualización**: 2024
