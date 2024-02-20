import React, { useState } from "react";
import "./home.css";
import { Component } from "react";
import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
//import ListAllBreeds from "./ListAllBreeds";

class ListAllVeterinary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vaterinary: [],
      message: "",
      role: "",
    };
  }

  componentDidMount() {
    ApiService.fetchVeterinary().then((resp) => {
      this.setState({ vaterinary: resp.data });
      console.log(this.state.vaterinary);
    });

    
    let loginData = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;
    if (loginData) {
      loginData = JSON.parse(loginData);
      this.setState({ role: loginData.role });
    }

    setTimeout(() => {
      const reloadCount = sessionStorage.getItem("reloadCount");
      if (reloadCount < 1) {
        sessionStorage.setItem("reloadCount", String(reloadCount + 1));
        window.location.reload();
      } else {
        sessionStorage.removeItem("reloadCount");
      }
    }, 800);
  }

  addtocart = (p1) => {
    let loginData = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;

    if (loginData) {
      loginData = JSON.parse(loginData);
      if (loginData.id) {
        let cartData = { customerId: loginData.id, productId: p1.id };
        ApiService.addtoCardAPI(cartData)
          .then((resp) => {
            this.setState({ message: "Item Added to Cart !!!" });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "your  appointment has been successfully booked...",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.resp.data.message,
              footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      }
    } else {
      alert("please login");
      window.location.href = "/login";
    }
  };

  render() {
    return (
      <>
        <h1>vaterinary List</h1>
        <div className="d-flex flex-wrap  justify-content-center align-items-center mt-4">
          {this.state.vaterinary.map((p1) => (
            <div
              className="container m-2"
              key={p1.id}
              style={{ width: "25rem" }}
            >
              <div
                className="card mb-3 p-2 "
                style={{
                  height: "30rem",
                  boxShadow:
                    " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
                }}
              >
                <div>
                  <img
                    className="card-img-top "
                    src={p1.imgUrl}
                    style={{ width: "50px", height: "50px" }}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p1.clinicname}</h5>
                  <p className="card-text"><b> DoctorName:</b> {p1.docname}</p>
                  <p className="card-text"> <b>Address:</b> {p1.address}</p>
                  <p className="card-text"> <b>Opentime:</b> {p1.opentime}</p>
                  <p className="card-text"> <b>Closetime:</b> {p1.closetime}</p>
                  <p className="card-text"> <b>ContactNo:</b> {p1.contact}</p>
                  <div className="col-7"></div>
                  <hr />

                  <div className="row d-flex justify-content-around ">
                    {this.state.role == "admin" ? (
                      <></>
                    ) : (
                      <div className="col-5" style={{ width: "50%" }}>
                        <button
                          className="  btn btn-primary w-100"
                          onClick={() => this.addtocart(p1)}
                        >
                          Book an Appointment
                        </button>
                      </div>
                    )}
                    {/* <div className="col-5" style={{ width: "50%" }}>
                      <Link
                        className="btn  btn-primary w-100 "
                        to={{
                          pathname: "/veterinarydetails",
                          state: { proId: p1.id },
                        }}
                      >
                        View vaterinary details
                      </Link> 
                     </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </>
    );
  }
}
export default ListAllVeterinary;