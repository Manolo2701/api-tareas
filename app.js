const express = require("express");
const fs = require("fs").promises;
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Ruta raíz: devuelve texto "Hola desde mi servidor Express"
app.get("/", (req, res) => {
  res.send("Hola desde mi servidor Express");
});

// Ruta API: devuelve el mismo JSON del ejercicio anterior
app.get("/api", (req, res) => {
  const data = {
    mensaje: "Bienvenido a la API",
    fecha: new Date().toISOString(),
  };

  res.status(200).json(data);
});

// app.get("/tareas", (req, res) => {
//   const tareas = fs.readFileSync("tareas.json", "utf8");
//   res.send(tareas);
// });

app.get("/tareas", async (req, res) => {
  try {
    const datos = await fs.readFile("tareas.json", "utf-8");
    const tareas = JSON.parse(datos);
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al leer las tareas" });
  }
});

// app.post("/tareas", (req, res) => {
//   // 1. Leer y parsear el archivo
//   var tareas = JSON.parse(fs.readFileSync("tareas.json", "utf8"));
//   // 2. Si no hay req.body.titulo -> error 400
//   if (!req.body.titulo) {
//     return res.status(400).json({ error: "El título es obligatorio" });
//   }
//   // 3. Crear nuevaTarea con id, titulo, completada
//   const nuevaTarea = {
//     id: Date.now(),
//     titulo: req.body.titulo,
//     completada: false,
//   };
//   // 4. Añadirla al array
//   tareas.push(nuevaTarea);
//   // 5. Guardar el array en el archivo (writeFileSync)
//   fs.writeFileSync("tareas.json", JSON.stringify(tareas, null, 2), "utf8");
//   // 6. Responder con 201 y la tarea creada
//   res.status(201).json(nuevaTarea);
// });

app.post("/tareas", async (req, res) => {
  try {
    const datos = await fs.readFile("tareas.json", "utf-8");
    const tareas = JSON.parse(datos);

    if (!req.body.titulo) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const nuevaTarea = {
      id: Date.now(),
      titulo: req.body.titulo,
      completada: false,
    };

    tareas.push(nuevaTarea);
    await fs.writeFile("tareas.json", JSON.stringify(tareas, null, 2), "utf-8");
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// app.put("/tareas/:id", (req, res) => {
//   const id = Number(req.params.id);
//   var tareas = JSON.parse(fs.readFileSync("tareas.json", "utf8"));
//   var tarea = tareas.find((t) => t.id === id);

//   if (!tarea) {
//     return res.status(404).json({ error: "Tarea no encontrada" });
//   }

//   if (req.body.titulo !== undefined) tarea.titulo = req.body.titulo;
//   if (req.body.completada !== undefined) tarea.completada = req.body.completada;

//   fs.writeFileSync("tareas.json", JSON.stringify(tareas, null, 2), "utf8");
//   res.json(tarea); // 200 por defecto, y envías la tarea modificada
// });

app.put("/tareas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const datos = await fs.readFile("tareas.json", "utf-8");
    const tareas = JSON.parse(datos);
    const tarea = tareas.find((t) => t.id === id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (req.body.titulo !== undefined) tarea.titulo = req.body.titulo;
    if (req.body.completada !== undefined)
      tarea.completada = req.body.completada;

    await fs.writeFile("tareas.json", JSON.stringify(tareas, null, 2), "utf-8");
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

// app.delete("/tareas/:id", (req, res) => {
//   const id = Number(req.params.id);

//   var tareas = JSON.parse(fs.readFileSync("tareas.json", "utf8"));
//   var tarea = tareas.find((t) => t.id === id);

//   if (!tarea) {
//     return res.status(404).json({ error: "Tarea no encontrada" });
//   }

//   const tareasActualizadas = tareas.filter((t) => t.id !== id);
//   fs.writeFileSync(
//     "tareas.json",
//     JSON.stringify(tareasActualizadas, null, 2),
//     "utf8",
//   );
//   res.json({ mensaje: "Tarea eliminada" });
// });

app.delete("/tareas/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const datos = await fs.readFile("tareas.json", "utf-8");
    const tareas = JSON.parse(datos);
    const tarea = tareas.find((t) => t.id === id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const tareasActualizadas = tareas.filter((t) => t.id !== id);
    await fs.writeFile(
      "tareas.json",
      JSON.stringify(tareasActualizadas, null, 2),
      "utf-8",
    );
    res.json("Tarea eliminada");
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
