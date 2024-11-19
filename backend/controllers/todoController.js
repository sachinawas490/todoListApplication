import { todos } from "../models/todoModel.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const {  title, description,marked } = req.body;
      console.log("req for create ", req.userid, " --   ", req.body);
    if ( !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTodo = new todos({ userId:req.userid, title, description,marked });
    const savedTodo = await newTodo.save();

    res.status(201).json({ message: "Todo created successfully", todo: savedTodo });
  } catch (error) {
      console.log("error ",error)
    res.status(500).json({ message: "Error creating todo", error: error.message });
  }
};

// Get all todos for a specific user
export const getTodos = async (req, res) => {
  try {
    const  userId  = req.userid;
  console.log("u ",userId)
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userTodos = await todos.find({ userId });

    res.status(200).json({ todos: userTodos });
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error: error.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { _id, title, description, marked } = req.body;
    const userId = req.userid;  // Assuming `userid` is set in your request (e.g., by middleware)
 
    // Find the todo by its ID first
    const todo = await todos.findOne({ _id, userId }); // Ensure the todo belongs to the correct user
    if (!todo) {
      return res.status(404).json({ message: "Todo not found or doesn't belong to this user" });
    }
    
    // If the todo exists, update it
    try {
      const updatedTodo = await todos.updateOne(
        { _id },  // The condition to find the document
        { $set: { title, description, marked } }  // The fields to update
      );
      
      // Log the response from the update operation
      console.log(updatedTodo);

      if (updatedTodo.modifiedCount === 0) {
        return res.status(400).json({ message: "No changes made to the todo" });
      }

      res.status(200).json({ message: "Todo updated successfully" });
    } catch (updateError) {
      console.log(updateError);
      res.status(500).json({ message: "Error updating todo", error: updateError.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error processing the request", error: error.message });
  }
};


// Delete a todo

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the route parameter
    console.log("Deleting todo with ID: ", id);

    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const deletedTodo = await todos.deleteOne({_id:id}); // Delete by ID

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    console.log("Todo deleted successfully:", deletedTodo);
    res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
};


