# API de tareas

API REST de aprendizaje desarrollada con Node.js y Express para crear, consultar, actualizar y eliminar tareas. Los datos se guardan en un archivo JSON local.

> **Proyecto de práctica:** el almacenamiento en un archivo JSON es adecuado para este ejercicio, pero no para múltiples usuarios o despliegues de producción. No guardes información personal o sensible en los datos de ejemplo.

## Funcionalidades y endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/` | Mensaje de bienvenida |
| GET | `/api` | Respuesta de ejemplo con fecha |
| GET | `/tareas` | Devuelve todas las tareas |
| POST | `/tareas` | Crea una tarea |
| PUT | `/tareas/:id` | Actualiza título y/o estado |
| DELETE | `/tareas/:id` | Elimina una tarea |

### Crear una tarea

Envía una petición `POST /tareas` con JSON:

```json
{
  "titulo": "Repasar Express"
}
```

### Actualizar una tarea

Envía una petición `PUT /tareas/:id` con uno o ambos campos:

```json
{
  "titulo": "Repasar Express y REST",
  "completada": true
}
```

## Tecnologías

- Node.js
- Express
- CORS
- JSON como almacenamiento local

## Requisitos

Node.js y npm.

## Instalación y ejecución

```bash
git clone https://github.com/Manolo2701/api-tareas.git
cd api-tareas
npm install
npm start
```

La API escucha en `http://localhost:3000`.

## Datos

Las tareas se guardan en `tareas.json`. Haz una copia de seguridad si quieres conservar los cambios realizados durante la práctica. El archivo se modifica al crear, actualizar o eliminar tareas.

## Alcance

Este repositorio forma parte de ejercicios de aprendizaje de APIs REST con Express. No incluye autenticación ni una base de datos; no está diseñado para exponerse públicamente como servicio de producción.

## Autor

**Manuel Barbado**  
[GitHub](https://github.com/Manolo2701) · [LinkedIn](https://www.linkedin.com/in/manuel-ramiro-barbado-s%C3%A1nchez-7404b5345/)
