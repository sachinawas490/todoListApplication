import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNewTodo } from "../redux/slices/userSlice";
function AddTodo() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marked, setMarked] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = { title, description, marked };

    // check for  - tile and description not empty
    if (!title && !description) {
      alert("Title and description are missing!");
      return;
    } else if (!title) {
      alert("Title is missing!");
      return;
    } else if (!description) {
      alert("Description is missing!");
      return;
    }

    try {
      const token = localStorage.getItem("todoid");

      if (token) {
        const response = await axios.post(
          "http://localhost:4000/todos/createtodo",
          todoData, // Pass the todo data here
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response for todo:", response.data);

        if (response.status === 201) {
          alert("Todo created successfully!");
          dispatch(setNewTodo(response.data.todo));

          setTitle("");
          setDescription("");
          setMarked(false);
          navigate("/home/todos");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Failed to create todo. Please try again.");
      if (error.response.status === 401) {
        alert("error occurs during create a todo ", error.response.message);
      }
    }
  };

  return (
    <div className="h-[86vh] flex flex-col items-center justify-center p-4 space-y-6 bg-gray-800 mt-3">
      <div className="text-center mb-5">
        <h1 className="text-[70px] font-bold text-gray-700">Add Todo</h1>
        <p className="text-gray-500 text-xl mt-2">
          Easily add new tasks to your Todo Master list.
        </p>
      </div>

      <div className="w-full max-w-lg bg-slate-700 border-2 border-pink-800 shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="marked"
            checked={marked}
            onChange={(e) => setMarked(e.target.checked)}
            className="w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
          />
          <div className="ml-5 text-gray-700">Marked for Completion</div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
