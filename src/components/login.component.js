import React, { useState, useEffect } from "react";
import { login } from "../functions/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/actions/user";

const intialLoginInfo = {
  username: "",
  password: "",
};

const LoginComponent = () => {
  const [userState, setUserState] = useState(intialLoginInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // call api
    login(userState)
      .then((res) => {
        // 1. set giá trị cho redux
        dispatch(loginSuccess(res.data));
        // 2. navigate to home screen
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>UserName</label>
          <input
            name="username"
            type="text"
            value={userState.username}
            onChange={(e) => onChange(e)}
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="text"
            value={userState.password}
            onChange={(e) => onChange(e)}
            className="form-control"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
