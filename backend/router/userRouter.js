import express from 'express';
const userRouter = express.Router();
import {register,login,userInfo} from '../controllers/userController.js'
import protectedRoute from '../config/ProtectedRoute.js';
// Route to handle user registration
userRouter.post('/register', register);

// Route to handle user login
userRouter.post('/login', login);
userRouter.get('/userInfo', protectedRoute,userInfo);
export default userRouter;
