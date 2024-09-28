import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cinema from './models/Cinema.js';
import Room from './models/Room.js';
import Movie from './models/Movie.js';
import Showtime from './models/Showtime.js';
import Seat from './models/Seat.js';

dotenv.config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error al conectar MongoDB:', err));


// Middleware para parsear JSON
app.use(bodyParser.json());

// ============================
// CRUD for Cinemas
// ============================
app.post('/cine', async (req, res) => {
  try {
    const cinema = new Cinema(req.body);
    await cinema.save();
    res.status(201).json(cinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/cine', async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.json(cinemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/cine/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(cinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/cine/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.json(cinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/cine/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findByIdAndDelete(req.params.id);
    if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// CRUD for Movies
// ============================
app.post('/peliculas', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/peliculas', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/peliculas/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/peliculas/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/peliculas/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// CRUD for Seats
// ============================
app.post('/butacas', async (req, res) => {
  try {
    const seat = new Seat(req.body);
    await seat.save();
    res.status(201).json(seat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/butacas', async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/butacas/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/butacas/:id', async (req, res) => {
  try {
    const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    res.json(seat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/butacas/:id', async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if (!seat) return res.status(404).json({ message: 'Seat not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============================
// CRUD for Showtimes
// ============================
app.post('/funciones', async (req, res) => {
  try {
    const showtime = new Showtime(req.body);
    await showtime.save();
    res.status(201).json(showtime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/funciones', async (req, res) => {
  try {
    const showtimes = await Showtime.find().populate('movie cinema seats'); // Populate the necessary fields
    res.json(showtimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/funciones/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id).populate('movie cinema seats');
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json(showtime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/funciones/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.json(showtime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/funciones/:id', async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) return res.status(404).json({ message: 'Showtime not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ============================
// CRUD for Rooms
// ============================

app.post('/salas', async (req, res) => {
  try {
    // Create a new room
    const room = new Room(req.body);
    await room.save();

    // After saving the room, update the corresponding cinema
    await Cinema.findByIdAndUpdate(req.body.cinema, { $push: { rooms: room._id } });

    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/salas', async (req, res) => {
  try {
    const rooms = await Room.find().populate('seats cinema'); // Populate the necessary fields
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/salas/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('seats cinema');
    if (!room) return res.status(404).json({ message: 'Sala no encontrada' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/salas/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ message: 'Sala no encontrada' });
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/salas/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Sala no encontrada' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Usar process.env.PORT con un valor predeterminado
const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});