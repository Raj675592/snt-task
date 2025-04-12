
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 5500;

app.use(express.static(path.resolve())); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['attendee', 'organizer'], required: true },
  code: { type: String },
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.post('/user', async (req, res) => {
  try {
    const { name, email, password, role, code } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = new User({ name, email, password, role, code });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/feedback', async (req, res) => {
  try {
    const { name, email, rollno, feedback, rating } = req.body;

    if (!name || !email || !rollno || !feedback || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({ name, email, rollno, feedback, rating });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});