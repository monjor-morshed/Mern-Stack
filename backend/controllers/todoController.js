import { ToDoItem } from "../models/todoModel.js";
import mongoose from "mongoose";

// Create A ToDo
const createTodo = async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const todo = await ToDoItem.create({
            title,
            description,
            dueDate
        });
        return res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Show All Todos
const showTodos = async (req, res) => {
    try {
        const todos = await ToDoItem.find({}).sort({ createdAt: 1 });
        return res.status(200).json(todos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Show A Todo
const showTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await ToDoItem.findById(id);
        if(!todo){
            return res.status(404).json({error: "Todo Not Found."})
        }
        return res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit A Todo
const editTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await ToDoItem.findByIdAndUpdate(id, req.body);
        if(!todo){
            return res.status(404).json({error: "Todo Not Found."})
        }
        return res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//Delete A Todo
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await ToDoItem.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({error: "Todo Not Found."})
        }
        return res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { createTodo, showTodos, showTodo, editTodo, deleteTodo };
