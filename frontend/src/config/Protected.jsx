import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import userInfo from "./getUserDetails";
import { useDispatch } from "react-redux";

import { setAuthUser } from "../redux/slices/userSlice";


// this componet is used for check the user is login is authenticated or not (i use localstorage to save token and fetch token when we refres the page)
const Protected = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("todoid");
      if (token) {
        setIsAuthenticated(true);
        const temp = await userInfo(token);
        console.log("user info ----  ", temp);
        dispatch(setAuthUser(temp));
      } else {
        setIsAuthenticated(false);
        navigate("/");
      }
    })();
  }, [navigate]);

  if (isAuthenticated === null) {
    
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default Protected;
