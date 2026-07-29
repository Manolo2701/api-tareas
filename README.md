# API de Tareas

API REST para gestionar una lista de tareas, construida con **Node.js** y **Express**. Los datos se almacenan en un archivo JSON local.

## Endpoints

| Método | Ruta             | Descripción                    |
| ------ | ---------------- | ------------------------------ |
| GET    | /tareas          | Obtener todas las tareas       |
| POST   | /tareas          | Crear una nueva tarea          |
| PUT    | /tareas/:id      | Actualizar una tarea existente |
| DELETE | /tareas/:id      | Eliminar una tarea             |

## Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Manolo2701/api-tareas.git
