import React, { useState } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import Cart from "./Cart";
import Chair from "./Food";
import Home from "./Home";
import Sofa from "./Clothes";
import Table from "./ProductDetail";

function ProviderNavBar() {
  let loginData = localStorage.getItem("loginDetails")
    ? localStorage.getItem("loginDetails")
    : null;
  if (loginData) {
    loginData = JSON.parse(loginData);
  }

  const editUser = () => {
    console.log(loginData);
    console.log(loginData.id);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-info sticky-top ">
        <div className="container-fluid ">
          <Link className="navbar-brand text-dark display-6" to="/">
            provider PetHub
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon border border-2 border-dark"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-dark"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/About">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/License">
                License
                </Link>
              </li>
              <li>
              <Link className="nav-link text-dark" to="/admin/product-add">
              Add Products
                </Link>
              </li>
              

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Add Services
                </a>
                <ul className="dropdown-menu">

                <li>
              <Link className="dropdown-item" to="/provider/hostel-add">
              Hostels
                </Link>
              </li>
                  

              <li>
              <Link className="dropdown-item" to="/provider/breed-add">
              Breeds
                </Link>
              </li>

              <li>
              <Link className="dropdown-item" to="/provider/vet-add">
              Veternary
                </Link>
              </li>
              <li>
              <Link className="dropdown-item" to="/provider/trainer-add">
              Trainer
                </Link>
              </li>

                </ul>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link active text-dark"
                  aria-current="page"
                  to="/"
                >
                  Product Requests
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link
                  className="nav-link active text-dark"
                  aria-current="page"
                  to="/"
                >
                  Appointments
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="nav nav-menu float-right">
          <li>
            {!loginData ? (

              <Link
                className="nav-link text-dark btn btn-sm btn-light me-2"
                to="/Register"
              >
                Signup
              </Link>

            )
              : (
                <li>
                </li>

              )
            }
          </li>

        </div>
        <div className="nav nav-menu float-right">
          <li>
            {loginData ? (

              <Link
                className="nav-link text-dark btn btn-sm btn-light me-2"
                to="/provider/edit-provider"
              >
                Profile
              </Link>

            )
              : (

                
                     <Link
                className="nav-link text-dark btn btn-sm btn-light me-2"
                to="/Register"
              >
                Signup
              </Link>
                
              )
            }
          </li>

        </div>
        <div className="nav nav-menu float-right">

          <li >
            {loginData ? (
              <Link
                className="nav-link text-dark btn btn-sm btn-light me-2"
                to="/Logout"
              >
                Logout
              </Link>
            )
              : (
                <Link
                  className="nav-link text-dark btn btn-sm btn-light me-2"
                  to="/Login"
                >
                  Login
                </Link>
              )
            }
          </li>
        </div>
      </nav>
    </div>
  );
}
export default ProviderNavBar;
