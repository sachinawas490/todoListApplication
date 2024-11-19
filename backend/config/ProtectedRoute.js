import { json } from "express";
import jsonwebtoken from "jsonwebtoken";
const protectedRoute = async (req, res, next) => {
    try {
        console.log("protected");
        const token = await req.headers["authorization"].split(' ')[1]; // Extract token from header
        console.log("token   ", token);
      const { id } = await jsonwebtoken.verify(token, "myprivatekey");
      console.log("private id for backend ",id)
        req.userid = id;
       
        

   

    next(); // If token is valid, call next() to proceed to the next middleware or route handler
  } catch (error) {
    // Error handling, e.g., if token is not provided or is invalid
    return res.status(401).json({ message: "Unauthorized access by protected route" });
  }
};

export default protectedRoute;