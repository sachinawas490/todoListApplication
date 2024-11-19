import React from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Protected from "./config/Protected";
import Home from "./Components/Home";
import HeroSection from "./Components/HeroSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoSection from "./Components/TodoSection";
import AddTodo from "./Components/AddTodo";

function App() {
  return (
    // routing
    <div
      className=" bg-cover h-screen text-slate-50 "
      style={{ backgroundPosition: "20% 30%" }}
    >
      <BrowserRouter>
        <Routes>
          {/* first page */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route
            path="/home"
            element={
              <Protected component={Home}>
                <Home />
              </Protected>
            }
          >
            <Route index element={<HeroSection />} />
            <Route path="todos" element={<TodoSection />} />
            <Route path="addtodos" element={<AddTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
