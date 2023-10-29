## Prueba Técnica - Backend

### Descripción

Este proyecto de backend se desarrolló como parte de una prueba técnica y se encarga de gestionar y servir datos relacionados con el consumo, pérdidas y costos por tramo y tipo de consumo. El backend se construyó utilizando **Express** y **TypeScript**, y se conecta a una base de datos **MySQL** para almacenar y recuperar la información.

### Características Principales

1. **TypeScript**: Se incorporó TypeScript para añadir un sistema de tipos al proyecto. Esto ayuda a detectar errores en tiempo de compilación y facilita la lectura y mantenimiento del código al proporcionar claridad sobre los tipos de datos que se manejan.

2. **SQL Parametrizado**: Para evitar vulnerabilidades como la inyección SQL, se implementaron consultas parametrizadas en todas las interacciones con la base de datos. Esto garantiza que los datos ingresados por el usuario se traten como valores y no como parte del SQL, lo que aumenta la seguridad.

3. **Rutas y Controladores**: La estructura del proyecto separa las rutas y la lógica de negocio en diferentes archivos. Las rutas manejan las solicitudes HTTP y redirigen la lógica al controlador correspondiente.

### Rutas API

#### General

- `GET /`: Verifica el estado del servidor.

#### Insertar Datos

- `POST /insert-perdidas-tramo`: Inserta datos de pérdidas por tramo.
- `POST /insert-costos-tramo`: Inserta datos de costos por tramo.
- `POST /insert-consumo-tramo`: Inserta datos de consumo por tramo.

#### Consultar Datos

- `GET /tramos/all`: Recupera todos los datos de tramos (consumo, pérdidas y costos sumados).
- `GET /cliente/all`: Recupera todos los datos del cliente segmentados por tipo de consumo.
- `GET /tramos-cliente/all`: Recupera las pérdidas por tipo de consumo y tramo.
- `GET /tramos`: Recupera datos de tramos filtrados por rango de fecha.
- `GET /cliente`: Recupera datos del cliente filtrados por rango de fecha.
- `GET /tramos-cliente`: Recupera pérdidas por tipo de consumo y tramo filtradas por rango de fecha.

### Cómo Correr el Proyecto

1. Clona el repositorio a tu máquina local.
2. Navega al directorio del proyecto.
3. Instala las dependencias usando `npm install`.
4. Asegúrate de tener configurada y corriendo tu base de datos MySQL.
5. Actualiza las credenciales de la base de datos en el archivo de configuración correspondiente.
6. Ejecuta el proyecto usando `npm start`.
7. Accede al servidor en `http://localhost:PORT` donde `PORT` es el puerto configurado para tu aplicación.

### Consideraciones Adicionales

- Se recomienda implementar mecanismos adicionales de seguridad como autenticación y autorización antes de desplegar esta API en un ambiente de producción.
