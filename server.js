import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cinema from './models/Cinema.js'; // Asegúrate de que el modelo esté definido correctamente
import cors from 'cors';

dotenv.config();

const app = express();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error al conectar MongoDB:', err));

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());

// ============================
// CRUD for Cinemas
// ============================

app.post('/cines', async (req, res) => {
  try {
    const cinema = new Cinema(req.body);
    await cinema.save();
    res.status(201).json(cinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/cines', async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.json(cinemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/cines/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(cinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/cines/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(cinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/cines/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// CRUD for Rooms and Movies in Cinemas
// ============================

// Agregar una sala a un cine
app.post('/cines/:id/salas', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });

    const room = {
      numero_sala: req.body.numero_sala,
      butacas: req.body.butacas || 100,
      pelicula: {
        titulo: req.body.pelicula.titulo,
        director: req.body.pelicula.director,
        duracion: req.body.pelicula.duracion,
        genero: req.body.pelicula.genero
      },
      horarios: req.body.horarios
    };

    cinema.salas.push(room);
    await cinema.save();
    res.status(201).json(cinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todas las salas de un cine
app.get('/cines/:id/salas', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(cinema.salas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una sala específica de un cine
app.get('/cines/:id/salas/:roomId', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });

    const room = cinema.salas.id(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar una sala de un cine
app.put('/cines/:id/salas/:roomId', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });

    const room = cinema.salas.id(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.set(req.body);
    await cinema.save();
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una sala de un cine
app.delete('/cines/:id/salas/:roomId', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });

    const room = cinema.salas.id(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.remove();
    await cinema.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Limpiar la base de datos (opcional)
app.delete('/clean-database', async (req, res) => {
  try {
    await Cinema.deleteMany({});
    res.status(200).send('Database cleaned');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
