import express from 'express';
import route from './routes/todo_route';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/todo', route);

// Error Handling
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;