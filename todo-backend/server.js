const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

// Middlewares — must come AFTER app = express()
app.use(cors());
app.use(express.json());

// Connect to MongoDB and only start the server once connected
mongoose.connect('mongodb://localhost:27017/todoapp')
    .then(() => {
        console.log('MongoDB connected');
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const todoModel = mongoose.model('Todo', todoSchema);

// Create Todo
app.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'title and description are required' });
        }
        const newTodo = new todoModel({ title, description });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// Get Todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// Update Todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = req.params.id;

        if (!title || !description) {
            return res.status(400).json({ error: 'title and description are required' });
        }
        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// Delete Todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTodo = await todoModel.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

// Server is started after MongoDB connection is successful.
