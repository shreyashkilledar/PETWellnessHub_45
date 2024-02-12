import React, { useState } from "react";
import "./home.css";
import { Component } from "react";
import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import HomeCarousal from "./HomeCarousal";
import Swal from "sweetalert2";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      message: "",
      role: "",
    };
  }

  componentDidMount() {
    ApiService.fetchProducts().then((resp) => {
      this.setState({ products: resp.data });
      console.log(this.state.products);
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
              title: "product added to your cart successfully...",
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
        <HomeCarousal></HomeCarousal>
        <div className="d-flex flex-wrap  justify-content-center align-items-center mt-4">
          {this.state.products.map((p1) => (
            <div
              className="container m-2"
              key={p1.id}
              style={{ width: "16rem" }}
            >
              <div
                className="card mb-3 p-2 "
                style={{
                  height: "26rem",
                  boxShadow:
                    " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
                }}
              >
                <div>
                  <img
                    className="card-img-top "
                    src={p1.imgUrl}
                    style={{ width: "200px", height: "250px" }}
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p1.name}</h5>
                  <p className="card-text"> Price: Rs.{p1.price}/-</p>
                  <div className="col-6"></div>
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
                          Add
                        </button>
                      </div>
                    )}
                    <div className="col-5" style={{ width: "50%" }}>
                      <Link
                        className="btn  btn-primary w-100"
                        to={{
                          pathname: "/ProductDetail",
                          state: { proId: p1.id },
                        }}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr color="red" size="5"></hr>
        <div className="d-flex flex-wrap  justify-content-center align-items-center mt-4">
        <div className="card  w-25 col-4 mx-4 border-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img src="data:image/jpeg;base64,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"
                  style={{ width: "200px", height: "150px" }}
                  alt="Card image cap" />
              </div>
              <div className="col-md-8">
                <div className="card-body ">
                  <h5 className="card-title">Veternary</h5>
                  <p className="card-text">Professional medical care for your pet </p>
                  <a href="http://localhost:3000/vet" className="btn btn-primary ">Book an Appointment</a>
                </div>
              </div>
            </div>
          </div>
          <div className="card  w-25 col-4 mx-4 border-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img src="https://www.shutterstock.com/image-photo/chihuahua-dog-male-female-brown-260nw-729889414.jpg"
                  style={{ width: "150px", height: "150px" }}
                  alt="Card image cap" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Find Mate</h5>
                  <p className="card-text">Find perfect partner for your pet </p>
                  <a href="http://localhost:3000/breed" className="btn btn-primary">Book an Appointment</a>
                </div>
              </div>
            </div>
          </div>
          <div className="card  w-25  col-4 mx-4 border-5">
            <div className="row g-0">
              <div className="col-md-4">
                <img src="https://media.istockphoto.com/id/173656433/photo/border-collie-in-a-kennel.jpg?s=612x612&w=0&k=20&c=UX_8cz8SrU50WvYR1Q2EVkuR4Vx4hMASy7EZi4YKljs="
                  style={{ width: "150px", height: "150px" }}
                  alt="Card image cap" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Pet Hostels</h5>
                  <p className="card-text">Home away from home </p>
                  {/* <link className="btn btn-primary" to="/hostel">Book an Appointment</link> */}
                  <a href="http://localhost:3000/hostel" className="btn btn-primary">Book an Appointment</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;

{
  /* <h3 className="m-4">New Arrivals</h3>
        <div className="d-flex flex-wrap ">
          <div className="d-flex flex-row flex-wrap bd-highlight mb-3 container bg-gray" >
            
            {list1}
          </div>
        </div> */
}
