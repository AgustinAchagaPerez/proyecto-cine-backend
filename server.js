import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import Cine from './models/Cine.js';
import Sala from './models/Sala.js';
import Pelicula from './models/Pelicula.js';
import Horario from './models/Horario.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error al conectar MongoDB:', err));

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());

// CRUD para Cine
app.post('/cines', async (req, res) => {
  try {
    const cine = new Cine(req.body);
    await cine.save();
    res.status(201).json(cine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/cines', async (req, res) => {
  try {
    const cines = await Cine.find().populate('salas');
    res.json(cines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/cines/:id', async (req, res) => {
  try {
    const cine = await Cine.findById(req.params.id).populate('salas');
    if (!cine) return res.status(404).json({ message: 'Cine no encontrado' });
    res.json(cine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/cines/:id', async (req, res) => {
  try {
    const cine = await Cine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cine) return res.status(404).json({ message: 'Cine no encontrado' });
    res.json(cine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/cines/:id', async (req, res) => {
  try {
    const cine = await Cine.findByIdAndDelete(req.params.id);
    if (!cine) return res.status(404).json({ message: 'Cine no encontrado' });
    res.json({ message: 'Cine eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CRUD para Sala
app.post('/cines/:cineId/salas', async (req, res) => {
  try {
    const sala = new Sala({ ...req.body, cine: req.params.cineId });
    await sala.save();

    // Agregar la sala al cine
    await Cine.findByIdAndUpdate(req.params.cineId, { $push: { salas: sala._id } });

    // Agregar la sala a la película
    await Pelicula.findByIdAndUpdate(req.body.pelicula, { $push: { salas: sala._id } });

    res.status(201).json(sala);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get('/salas', async (req, res) => {
  try {
    const salas = await Sala.find().populate('pelicula horarios');
    res.json(salas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/salas/:id', async (req, res) => {
  try {
    const sala = await Sala.findById(req.params.id).populate('pelicula horarios');
    if (!sala) return res.status(404).json({ message: 'Sala no encontrada' });
    res.json(sala);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/salas/:id', async (req, res) => {
  try {
    const sala = await Sala.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sala) return res.status(404).json({ message: 'Sala no encontrada' });
    res.json(sala);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/salas/:id', async (req, res) => {
  try {
    const sala = await Sala.findByIdAndDelete(req.params.id);
    if (!sala) return res.status(404).json({ message: 'Sala no encontrada' });
    res.json({ message: 'Sala eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CRUD para Pelicula
app.post('/peliculas', async (req, res) => {
  try {
    const pelicula = new Pelicula(req.body);
    await pelicula.save();
    res.status(201).json(pelicula);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/peliculas', async (req, res) => {
  try {
    const peliculas = await Pelicula.find().populate('salas');
    res.json(peliculas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/peliculas/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id).populate('salas');
    if (!pelicula) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(pelicula);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/peliculas/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pelicula) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(pelicula);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/peliculas/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
    if (!pelicula) return res.status(404).json({ message: 'Película no encontrada' });
    res.json({ message: 'Película eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CRUD para Horario
app.post('/salas/:salaId/horarios', async (req, res) => {
  try {
    const horario = new Horario({ ...req.body, sala: req.params.salaId });
    await horario.save();

    // Agregar el horario a la sala
    await Sala.findByIdAndUpdate(req.params.salaId, { $push: { horarios: horario._id } });
    res.status(201).json(horario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/horarios', async (req, res) => {
  try {
    const horarios = await Horario.find().populate('sala');
    res.json(horarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/horarios/:id', async (req, res) => {
  try {
    const horario = await Horario.findById(req.params.id).populate('sala');
    if (!horario) return res.status(404).json({ message: 'Horario no encontrado' });
    res.json(horario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/horarios/:id', async (req, res) => {
  try {
    const horario = await Horario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!horario) return res.status(404).json({ message: 'Horario no encontrado' });
    res.json(horario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/horarios/:id', async (req, res) => {
  try {
    const horario = await Horario.findByIdAndDelete(req.params.id);
    if (!horario) return res.status(404).json({ message: 'Horario no encontrado' });
    res.json({ message: 'Horario eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
