import React from "react";
import { Component } from "react";
import ApiService from "../../service/ApiService";
import Swal from "sweetalert2";

class BreedDetail extends Component {
  state = {
    breed: {
      id: -1,
      name: "breed",
      price: 500,
      description: "",
      discount: 0.0,
      imgUrl: null,
      role: "",
    },
  };

  componentDidMount() {
    const proId = this.props.location.state.proId;

    ApiService.getBreedDetails(proId).then((response) => {
      this.setState({ breed: response.data });
    });
    let loginData = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;

    if (loginData) {
      loginData = JSON.parse(loginData);
      this.setState({ role: loginData.role });
    }
  }

  addtocart = () => {
    let loginData = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;

    if (loginData) {
      loginData = JSON.parse(loginData);

      if (loginData.id) {
        let cartData = {
          customerId: loginData.id,
          breedId: this.state.breed.id,
        };
        ApiService.addtoCardAPI(cartData)
          .then((resp) => {
            this.setState({ message: "Item Added to Cart !!!" });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "item added to cart...",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            alert(err.resp.data.message);
          });
      }
    } else {
      alert("please login");
    }
  };

  render() {
    return (
      <section className="mb-5">
        <div className="row p-3">
          <div className="col-md-6 mb-4 mb-md-0 mt-3 border border-dark">
            <div className="row hostel-gallery mx-1 mt-3">
              <div className="col-12 mb-0">
                <figure className="view overlay rounded z-depth-1 main-img">
                  <img
                    src={this.state.breed.imgUrl}
                    style={{ height: "600px", width: "600px" }}
                    className="img-fluid z-depth-1"
            
                  ></img>
                </figure>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-5 ">
            <h5>{this.state.breed.name}</h5>
            <p className="mb-2 text-muted text-uppercase small text-lg-left"></p>
            <p>
              <b>Rent: </b>Rs{this.state.breed.price}/-
            </p>
            <p>
              <b>Description :</b>
              {this.state.breed.description}
            </p>
            {this.state.role === "admin" ? (
              <></>
            ) : (
              <p>
                <button
                  type="button"
                  className="btn btn-success btn-md mr-1 mb-2"
                  onClick={() => this.addtocart()}
                >
                  <i className="fas fa-shopping-cart pr-2"></i>Add to cart
                </button>
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
}
export default BreedDetail;