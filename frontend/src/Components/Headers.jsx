import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Headers() {
  const navigate = useNavigate();
  function handleSignOut() {
    localStorage.removeItem("todoid");
    alert("SignOut successfully done");
    navigate("/");
  }
  return (
    <div className="navbar bg-slate-700 w-[98%] mx-auto shadow-md border border-slate-500 shadow-slate-600 rounded-2xl box-border mt-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/home/"}>
                Home<s></s>
              </Link>
            </li>
            <li>
              <Link to={"/home/todos"}>All Todo's</Link>
            </li>
            <li>
              <Link to={"/home/addtodos"}>add todo</Link>
            </li>
            <li>
              <button className="" onClick={() => handleSignOut()}>
                SignOut
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Todo Master</a>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}

export default Headers;
