import React, { useState } from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Swal from "sweetalert2";

class OtherProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    ApiService.fetchProductChair().then((resp) => {
      this.setState({ products: resp.data });
      console.log(this.state.products);
    });
  }

  addtocart = (p1) => {
    console.log("clicked on Buy" + p1.id);
    console.log(localStorage.getItem("loginDetails"));

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
              position: "top-end",
              icon: "success",
              title: this.state.message,
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
      Swal.fire("please login");
    }
  };

  render() {
    return (
      <div>
        <h1>Other Products</h1>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {this.state.products.map((p1) => (
            <div className="container" key={p1.id} style={{ width: "16rem" }}>
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
                    <div className="col-5" style={{ width: "50%" }}>
                      <button
                        className="  btn btn-primary w-100"
                        onClick={() => this.addtocart(p1)}
                      >
                        Add
                      </button>
                    </div>
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
      </div>
    );
  }
}
export default OtherProducts;
