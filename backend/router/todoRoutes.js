import express from 'express';
const todoRoute = express.Router();
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController.js';
import protectedRoute from '../config/ProtectedRoute.js';
// get all the todo's
todoRoute.post('/createtodo',protectedRoute, createTodo); // Create a new Todo
todoRoute.get('/gettodo',protectedRoute, getTodos); // Get all Todos for a user
todoRoute.put('/update/',protectedRoute, updateTodo); // Update a Todo
todoRoute.delete('/delete/:id',protectedRoute, deleteTodo); // Delete a Todo


export default todoRoute;