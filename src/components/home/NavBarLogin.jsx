import React from 'react'
import { NavLink } from "react-router-dom";

function NavBarLogin() {
  return (
    <div>
        
        <div className="container-fluid">
        <div className="row">
          <div className="col-10 mx-auto">
            <nav className="navbar navbar-expand-lg ">
              <div className="container-fluid">
                <i className="bi bi-house-door-fill"></i>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"></li>

                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/about">
                        About
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/contact">
                        Contact us
                      </NavLink>
                    </li>
                  </ul>

                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Login
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item" to="/AdminLogin">
                          Admin Login
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="Login">
                          Employee Login
                        </NavLink>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/SignUp">
                          Creer un compte
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NavBarLogin