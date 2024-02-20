import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import logimg from "../../images/logimg.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: " ",
      message: null,
      formErrors: {},
    };

    this.sendUser = this.sendUser.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onValueChange = (event) =>
    this.setState({
      role: event.target.value,
    });

  handleFormValidation() {
    const { email, password } = this.state;
    let formErrors = {};
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      formErrors["emailIdErr"] = "*Email id is required.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      formIsValid = false;
      formErrors["emailIdErr"] = "*Invalid email id.";
    }

    //password
    if (!password) {
      formIsValid = false;
      formErrors["passwordErr"] = "*password is required";
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password)
    ) {
      formIsValid = false;
      formErrors["passwordErr"] =
        "*password should contain atleast one special char and number.";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  sendUser = (e) => {
    e.preventDefault();
    if (this.handleFormValidation()) {
      let details = {
        email: this.state.email,
        password: this.state.password,
      };

      if (this.state.role === " ") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "please select your role please",
        });
      } else if (this.state.role === "admin") {
        ApiService.loginVendor(details)
          .then((resp) => {
            this.setState({ message: "Login successfully." });
            localStorage.removeItem("role");
            localStorage.removeItem("loginDetails");
            localStorage.clear();

            localStorage.setItem("role", this.state.role);
            localStorage.setItem("loginDetails", JSON.stringify(resp.data));
            let dataa = localStorage.getItem("role");

            Swal.fire({
              position: "center",
              icon: "success",
              title: this.state.message,
              showConfirmButton: false,
              timer: 1500,
            });

            this.props.history.push("/");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data,
            });

            this.props.history.push("/login");
          });
      } else if(this.state.role === "customer") {
        ApiService.loginCustomer(details)
          .then((resp) => {
            this.setState({ message: "Customer Login successfully." });
            localStorage.removeItem("role");
            localStorage.removeItem("loginDetails");
            localStorage.clear();

            localStorage.setItem("role", this.state.role);
            localStorage.setItem("loginDetails", JSON.stringify(resp.data));
            let dataa = localStorage.getItem("role");
            this.setState({ message: "Customer Login successfully !!!" });

            Swal.fire({
              position: "center",
              icon: "success",
              title: this.state.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.props.history.push("/");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you have entered wrong details..",
            });
            this.props.history.push("/login");
          });
      } else if(this.state.role === "provider") {
        ApiService.loginProvider(details)
          .then((resp) => {
            this.setState({ message: "Provider Login successfully." });
            localStorage.removeItem("role");
            localStorage.removeItem("loginDetails");
            localStorage.clear();

            localStorage.setItem("role", this.state.role);
            localStorage.setItem("loginDetails", JSON.stringify(resp.data));
            let dataa = localStorage.getItem("role");
            this.setState({ message: "Provider Login successfully !!!" });

            Swal.fire({
              position: "center",
              icon: "success",
              title: this.state.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.props.history.push("/");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "you have entered wrong details..",
            });
            this.props.history.push("/login");
          });
      }
    }
  };

  render() {
    const { passwordErr, emailIdErr } = this.state.formErrors;
    return (
      <div className="row">
        <div className="col-6">
          <img className="card-img-top" src={logimg} alt="Login image" />
        </div>
        <div className="col-5 pt-3">
          <div
            className="m-4 p-4 border"
            style={{
              height: "500px",
              boxShadow:
                " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
            }}
          >
            <h2 className="text-center">Login</h2>
            <form>
              <div className="form-group">
                <label>
                  <span className="text-danger">*</span>Email id:
                </label>
                <input
                  type="email"
                  placeholder="email id"
                  name="email"
                  className={
                    emailIdErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {emailIdErr && (
                  <div
                    className="text-start"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {emailIdErr}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <span className="text-danger">*</span>Password:
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className={
                    passwordErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {passwordErr && (
                  <div
                    className="text-start"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {passwordErr}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center w-100 my-3 p-2">
                <label className="mx-3">
                  <span className="text-danger">*</span>Role :{" "}
                </label>
                <div class="form-check">
                  <input
                    className="form-check-input mr-5 ml-3"
                    type="radio"
                    name="role"
                    id="i1"
                    value="admin"
                    checked={this.state.role === "admin"}
                    onChange={this.onValueChange}
                  />
                  <label class="form-check-label" for="i1">
                    Admin
                  </label>
                </div>
                <div className="form-check mx-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="i2"
                    value="customer"
                    checked={this.state.role === "customer"}
                    onChange={this.onValueChange}
                  />
                  <label class="form-check-label" for="i2">
                    Customer
                  </label>
                </div>
                <div className="form-check ml-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="i"
                    value="provider"
                    checked={this.state.role === "provider"}
                    onChange={this.onValueChange}
                  />
                  <label class="form-check-label" for="i2">
                    Provider
                  </label>
                </div>
              </div>
              <button className="btn btn-success" onClick={this.sendUser}>
                Login
              </button>
              <div className=" mt-3 d-flex flex-wrap justify-content-between">
                <div>
                  <Link className="" to="/user-forgot-password">
                    Forgot Password
                  </Link>
                </div>
                <div>
                  <Link className="" to="/register">
                    Click here
                  </Link>
                  <span className="px-2">to Register</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
