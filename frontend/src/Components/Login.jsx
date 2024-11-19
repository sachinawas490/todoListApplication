import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/slices/userSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  async function handleclick() {
    try {
      const response = await axios.post("http://localhost:4000/users/login", {
        username,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        alert("login successfully done");
        localStorage.setItem("todoid", response.data.token);
        dispatch(setAuthUser(response.data.user));
        navigate("/home");
      }
    } catch (error) {
      // if (error.response.status === 400) {
      alert("error occur during login !");
      // }
    }
  }
  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className="h-[50%]  flex flex-col bg-slate-800 w-[320px]  rounded-xl p-4    opacity-95 text-slate-150 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-cyan-600">
        <div className="text-center my-2 text-[30px] ">Signin</div>

        <div className="py-2">
          <div className="text-yellow-200">Username</div>
          <input
            type="text"
            placeholder="enter your username "
            value={username}
            name="username"
            className="w-full py-[2px] rounded-md px-2 bg-slate-50 text-slate-950"
            onChange={(e) => setusername(e.target.value)}
          />
        </div>

        <div className="py-2">
          <div className="text-yellow-200">password</div>
          <input
            type="password"
            placeholder="enter your password "
            value={password}
            name="name"
            className="w-full py-[2px] rounded-md px-2 bg-slate-50 text-slate-900"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="text-yellow-200 py-3">
          <div className="text-center">
            Don't have an Account?{" "}
            <button>
              <Link to={"/signup"}>Signup</Link>
            </button>
          </div>
          <button
            className="w-full mt-3 py-2 rounded-xl bg-slate-500"
            onClick={handleclick}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
