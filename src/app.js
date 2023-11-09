require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const { MongoClient } = require('mongodb');

async function ejecutarOperacionesCRUD() {
  const uri = process.env.MONGODB_URI; // Obtén la cadena de conexión desde las variables de entorno
  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
    await client.connect();
    const database = client.db('tareasDB');
    const tareasCollection = database.collection('tareas');

    // Create (Crear)
    const nuevaTarea = {
      "id": "5",
      "nombre": "Nueva Tarea",
      "descripcion": "Descripción de la nueva tarea",
      "fecha_creacion": new Date(),
      "fecha_vencimiento": new Date("2023-12-31"),
      "prioridad": "alta",
      "completada": false
    };
    const createResult = await tareasCollection.insertOne(nuevaTarea);
    console.log(`Tarea creada con el ID: ${createResult.insertedId}`);

    // Read (Leer)
    const tareas = await tareasCollection.find({}).toArray();
    console.log("Todas las tareas:");
    console.log(tareas);

    // Update (Actualizar)
    const filtro = { "id": "5" };
    const actualizacion = { $set: { "completada": true } };
    const updateResult = await tareasCollection.updateOne(filtro, actualizacion);
    console.log(`${updateResult.modifiedCount} documento(s) actualizado(s)`);

    // Delete (Eliminar)
    const deleteResult = await tareasCollection.deleteOne(filtro);
    console.log(`${deleteResult.deletedCount} documento(s) eliminado(s)`);
  } finally {
    await client.close();
  }
}

ejecutarOperacionesCRUD();
