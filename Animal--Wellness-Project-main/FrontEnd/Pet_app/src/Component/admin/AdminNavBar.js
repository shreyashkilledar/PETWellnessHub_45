import React from "react";
import { Link } from "react-router-dom";
import License from "../customer/License";

function AdminNavBar() {
  let loginData = localStorage.getItem("loginDetails")
    ? localStorage.getItem("loginDetails")
    : null;
  if (loginData) {
    loginData = JSON.parse(loginData);
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light sticky-top"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
           Peteria
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-dark" to="/License">
                License
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/dashboard"
                >
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/provider/providers"
                >
                  Providers
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/products"
                >
                  Manage products
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/products"
                >
                  Manage Services
                </Link>
              </li>
              */}
{/* 
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Hostels</a></li>

                  <li><a className="dropdown-item" href="#">Breeding</a></li>

                  <li><a className="dropdown-item" href="#">Grooming</a></li>


                </ul>
              </li> */}


            </ul>

          </div>
        </div>
        <div className="nav nav-menu float-right">
          <li className="nav-item">
            <Link className="nav-link text-dark btn btn-sm btn-light me-2" to="/logout">
              Logout
            </Link>
          </li>

        </div>
      </nav>
    </>
  );
}
export default AdminNavBar;
