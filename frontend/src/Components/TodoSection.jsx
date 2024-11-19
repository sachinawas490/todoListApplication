import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTodos, setUpdatedTodo } from '../redux/slices/userSlice';

function TodoSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.user.todos);

  // model -- helper's
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedMarked, setUpdatedMarked] = useState(false);

  // Fetch all todos when updated
  useEffect(() => {
    getAllUser();
  }, []);

  // get all data (todos)
  async function getAllUser() {
    console.log('Fetching todos...');
    try {
      const token = localStorage.getItem('todoid');
      if (token) {
        const response = await axios.get('http://localhost:4000/todos/gettodo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          dispatch(setTodos(response.data.todos)); 
          console.log('Fetched todos:', response.data.todos);
        }
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  }

 
  const openModal = (todo) => {
    setSelectedTodo(todo);
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description);
    setUpdatedMarked(todo.marked);
    setIsModalOpen(true);
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // handle update
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('todoid');
      if (token && selectedTodo) {
        const response = await axios.put(
          `http://localhost:4000/todos/update`,
          {
            _id: selectedTodo._id, 
            title: updatedTitle,
            description: updatedDescription,
            marked: updatedMarked,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          alert('Todo updated successfully!');
         
          getAllUser(); 
          closeModal();
        }
      }
    } catch (error) {
       
      alert('Failed to update todo.',error);
    }
  };

  // handle for updation 
 const handleDelete = async () => {
  try {
    const token = localStorage.getItem('todoid');
    if (token && selectedTodo) {
      const response = await axios.delete(
        `http://localhost:4000/todos/delete/${selectedTodo._id}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Todo deleted successfully!');
      
        getAllUser(); 
        closeModal();
      }
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    alert('Failed to delete todo.');
  }
};


  return (
    <div className="min-h-[60vh] border-2 border-slate-800 p-4 overflow-y-scroll mt-3 mx-3 rounded-lg shadow-md shadow-yellow-500">
      
      <div className="w-full text-end">
        <button
          className="btn bg-yellow-950 shadow-md hover:shadow-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-900"
          onClick={() => getAllUser()}
        >
          Fetch Todos
        </button>
      </div>

     {/* ---------------------todo------------------------------- */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
    {todos.map((todo) => (
      <div
        key={todo._id}
        className="flex flex-col justify-between p-4 rounded-lg shadow-md bg-gray-700 border-2 border-gray-900 shadow-blue-950 hover:shadow-blue-700"
        style={{
          width: "100%", // Default width for small screens
          maxWidth: "280px", // Max width for larger screens
          height: "130px",
        }}
      >
        <h3 className="font-bold text-lg text-gray-900 overflow-x-auto">{todo.title}</h3>
        <div className="mt-2 flex justify-between items-center">
          <span
            className={`text-sm font-medium ${
              todo.marked ? "text-green-500" : "text-red-500"
            }`}
          >
            {todo.marked ? "Completed" : "Pending"}
          </span>
          <button
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
            onClick={() => openModal(todo)} // Open the modal with the selected todo
          >
            View
          </button>
        </div>
      </div>
    ))}
  </div>

     {/* ----------model ------------------------------------ */}
      {isModalOpen && selectedTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
          <div className="bg-blue-950  p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-bold">Todo Details</h2>
            <div className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className="w-full p-2 border  mt-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="w-full p-2 border rounded-md mt-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="flex items-center text-sm font-medium">Marked for Completion</label>
                <input
                  type="checkbox"
                  checked={updatedMarked}
                  onChange={(e) => setUpdatedMarked(e.target.checked)}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
              </div>

              {/* Buttons for update and delete */}
              <div className="flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Close modal button */}
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoSection;
