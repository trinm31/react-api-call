import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "./redux/actions/user";

import CreateComponent from "./components/create.component";
import EditComponent from "./components/edit.component";
import IndexComponent from "./components/index.component";
import LoginComponent from "./components/login.component";

function App() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutSuccess());
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" href="#">
            CRUD App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={() => logout()} className="nav-link">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<IndexComponent />}>
          <Route index element={<IndexComponent />} />
        </Route>
        <Route path="create" element={<CreateComponent />} />
        <Route path="edit/:id" element={<EditComponent />} />
        <Route path="login" element={<LoginComponent />} />
      </Routes>
    </>
  );
}

export default App;
