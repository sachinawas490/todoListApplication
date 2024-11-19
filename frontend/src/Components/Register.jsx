import axios from "axios";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [fullname, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleClick(e) {
    e.preventDefault();
    const user = { fullname, username, password };

    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        user
      );
      console.log("error -> ", response);
      if (response.status === 201) {
        alert("register successfully done");
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.message);
      }
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-[60%] flex flex-col bg-slate-800 w-[320px] rounded-xl p-4 border-fuchsia-600 text-slate-50 opacity-95 text-slate-150 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border">
        <div className="text-center my-2 text-[30px]">Signup</div>

        <div className="py-2">
          <div className="text-yellow-200">Full Name</div>
          <input
            type="text"
            placeholder="Enter your name"
            value={fullname}
            name="name"
            className="w-full py-[2px] rounded-md px-2 bg-slate-50 text-slate-900"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="py-2">
          <div className="text-yellow-200">Username</div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            name="username"
            className="w-full py-[2px] rounded-md px-2 bg-slate-50 text-slate-950"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="py-2">
          <div className="text-yellow-200">Password</div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            name="password"
            className="w-full py-[2px] rounded-md px-2 bg-slate-50 text-slate-900"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-yellow-200 py-3">
          Already have an Account?{" "}
          <button className="">
            <Link to={"/"}>Signin</Link>
          </button>
          <button
            className="w-full mt-3 py-2 rounded-xl bg-slate-500"
            onClick={handleClick}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
