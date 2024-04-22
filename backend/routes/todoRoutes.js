import express from 'express';
import { createTodo, showTodos, showTodo, editTodo, deleteTodo } from "../controllers/todoController.js"

const router = express.Router()

// Create A ToDo
router.post('/', createTodo)

// Show All Todos
router.get('/', showTodos)

// Show A Todo
router.get('/:id', showTodo)

// Edit A Todo
router.put('/:id', editTodo)

//Delete A Todo
router.delete('/:id', deleteTodo)


export default router;