import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import cartimg from "../../images/cartimg.png";
import Swal from "sweetalert2";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total: 0,
      image: "",
      message: "",
      CartId: 0,
    };
  }

  componentDidMount() {
    let userDetails = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      console.log("login user id " + userDetails.id);
      ApiService.fetchProductsCart(userDetails.id).then((response) => {
        this.setState({ cart: response.data });
        console.log("cart data here" + this.state.cart);
      });
    } else {
      this.setState({ message: "Please login to view cart details" });
      console.log(this.state.message);
      alert("Please login to continue....");
      window.location.href = "/login";
    }
  }

  async deleteItemFormCart(productId) {
    let userDetails = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;

    if (userDetails) {
      userDetails = JSON.parse(userDetails);

      await ApiService.getCartIdOfUser(userDetails.id).then((response) => {
        this.setState({ CartId: response.data });
      });
      ApiService.deleteProductFromCart(this.state.CartId, productId);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "product deleted successfully...",
        showConfirmButton: false,
        timer: 1500,
      });

      window.location.reload(false);
    } else {
      this.setState({ message: "Something Wrong" });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }

  render() {
    return (
      <div className="d-flex flex-wrap">
        <div className="w-75">
          <h4>
            <b>Shopping Cart</b>
          </h4>
          {this.state.cart.map((ele) => (
            <div className="card">
              <div className="">
                <div className="cart">
                  <div className="title">
                    <div className=""></div>
                  </div>
                  <div className=" border-top border-bottom">
                    <div className="main d-flex flex-wrap justify-content-between align-items-center p-3">
                      <div
                        className=""
                        style={{ width: "175px", height: "175px" }}
                      >
                        <img className="img-fluid" src={ele.imgUrl} />
                      </div>
                      <div className="">
                        <div className=" text-muted">
                          {ele.name}
                          {/* {ele.id} */}
                        </div>
                      </div>
                      <div className="">x 1</div>
                      <div className="">
                        Price:{ele.price}
                        <span className="close"></span>
                      </div>
                      <div className="">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => this.deleteItemFormCart(ele.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="d-none">
                    {(this.state.total += ele.price)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div class=" summary cartSummaryBg py-2">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div class="row float-lg-left">
              <div class="col">TOTAL PRICE</div>
              <div class="col text-right h4">{this.state.total}</div>
            </div>
            {
              <Link className="btn btn-success m-2" to="/CheckOut">
                CHECKOUT
              </Link>
            }
          </div>
        </div>
        <div className="w-25">
          <img className="card-img-top" src={cartimg} alt="Cart image" />
        </div>
      </div>
    );
  }
}

export default Cart;
