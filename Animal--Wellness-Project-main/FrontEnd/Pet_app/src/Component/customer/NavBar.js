import React, { useState } from "react";
import { Link } from "react-router-dom";
import About from "./About";
import Cart from "./Cart";
import Chair from "./Food";
import Home from "./Home";
import Sofa from "./Clothes";
import Table from "./ProductDetail";
import License from "./License";

function NavBar() {
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
            <b><i>PetHub</i></b>
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
              <li className="nav-item ">
               
              <Link className="nav-link text-dark" to="/products">
                  Products
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Pets
                </a>
                <ul className="dropdown-menu">

                <Link className="dropdown-item" to="/buypet">
                  Buy Pet
                </Link>

                <Link className="dropdown-item" to="/addpet">
                  Sell your pet
                </Link>           
                </ul>
              </li>
              


              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
                </a>
                <ul className="dropdown-menu">

                <Link className="dropdown-item" to="/hostel">
                  Hostels
                </Link>

                <Link className="dropdown-item" to="/breed">
                  Breeding
                </Link>

                <Link className="dropdown-item" to="/vet">
                  Veternary
                </Link>
                <Link className="dropdown-item" to="/trainer">
                  Trainer
                </Link>
            
                </ul>
              </li>

              {loginData ? (
                <li>
                  <Link
                    className="nav-link text-dark   me-2"
                    to="/Cart"
                  >
                    Cart
                  </Link>
                </li>
              )
                : (
                  <li>

                  </li>
                )
              }

              {/* {loginData ? (
                <li>
                  <Link
                    className="nav-link text-dark  me-2"
                    to="/appointment"
                  >
                    Appointments
                  </Link>
                </li>
              )
                : (
                  <li>

                  </li>
                )
              } */}


            </ul>
          </div>
        </div>

<div className="nav nav-menu float-right">

<li>
  {loginData ? (

<Link
className="nav-link text-dark  me-2"
to="/Order"
>
MyOrders
</Link>

  )
    : (
      <div className="nav nav-menu float-right">
          <li>
          
          </li>
        </div>)

  }
</li>

</div>


        <div className="nav nav-menu float-right">

          <li>
            {loginData ? (

              <Link
                className="nav-link text-dark btn btn-sm btn-light me-2"
                to="/admin/edit-user"
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
export default NavBar;
