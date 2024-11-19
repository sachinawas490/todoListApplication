import express from "express";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;


// db 
import db from './config/db.js';
db();

// user -- ROuters
import userRouter from "./router/userRouter.js";
import todoRoute from "./router/todoRoutes.js";
app.use('/users',userRouter)

// todo's router
app.use('/todos', todoRoute);

app.listen(port, () => {
    console.log(`server is started at port ${port}`);
})