import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import regimg from "./../../images/regimg.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      Password: "",
      mobile: "",
      address: "",
      role:"",
      message: null,
      formErrors: {},
    };

    this.saveUser = this.saveUser.bind(this);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onValueChange = (event) =>
  this.setState({
    role: event.target.value,
  });

  handleFormValidation() {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      mobile,
      address,
    } = this.state;
    let formErrors = {};
    let formIsValid = true;

    //first name
    if (!firstName) {
      formIsValid = false;
      formErrors["firstNameErr"] = "*Name is required.";
    } else if (!/^[a-zA-Z ]{2,30}$/.test(firstName)) {
      formIsValid = false;
      formErrors["firstNameErr"] = "*Invalid Firstname.";
    }
    if (!address) {
      formIsValid = false;
      formErrors["addressErr"] = "*Address is required.";
    }
    if (!middleName) {
      formIsValid = false;
      formErrors["midddleNameErr"] = "*MiddleName is required.";
    } else if (!/^[a-zA-Z ]{2,30}$/.test(middleName)) {
      formIsValid = false;
      formErrors["midddleNameErr"] = "*Invalid Middlename.";
    }

    //last name
    if (!lastName) {
      formIsValid = false;
      formErrors["lastNameErr"] = "*LastName is required.";
    } else if (!/^[a-zA-Z ]{2,30}$/.test(lastName)) {
      formIsValid = false;
      formErrors["lastNameErr"] = "*Invalid Lastname.";
    }

    //Email
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

    //Phone number
    if (!mobile) {
      formIsValid = false;
      formErrors["phoneNoErr"] = "*Phone number is required.";
    } else {
      var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
      if (!mobPattern.test(mobile)) {
        formIsValid = false;
        formErrors["phoneNoErr"] = "*Invalid phone number.";
      }
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  saveUser = (e) => {
    e.preventDefault();
    if (this.handleFormValidation()) {
      let customer = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        mobile: this.state.mobile,
        address: this.state.address,
        middleName: this.state.middleName,
      };

      if (this.state.role === " ") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "please select your role please",
        });
      }
      else if (this.state.role === "customer"){

      ApiService.addUser(customer)
        .then((resp) => {
          this.setState({ message: "Customer Registered successfully." });

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
            text: err.response.data.message,
            footer: '<a href="">Why do I have this issue?</a>',
          });
          this.props.history.push("/register");
        });
      }
      else if (this.state.role === "provider"){


        ApiService.addProvider(customer)
          .then((resp) => {
            this.setState({ message: "Provider Registered successfully." });
  
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
              text: err.response.data.message,
              footer: '<a href="">Why do I have this issue?</a>',
            });
            this.props.history.push("/register");
          });
        }
    }
  };
  render() {
    const {
      firstNameErr,
      lastNameErr,
      passwordErr,

      emailIdErr,
      phoneNoErr,
      midddleNameErr,
      addressErr,
    } = this.state.formErrors;
    return (
      <div className=" row d-flex flex-row flex-wrap-reverse">
        <div className="col-6">
          <img className="card-img-top" src={regimg} alt="Card image cap" />
          <h2 className="text-center display-2">Register User</h2>
        </div>
        <div className="col-5 pt-3">
          <div
            className="m-4 p-4 border"
            style={{
              height: "700px",
              boxShadow:
                " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
            }}
          >
            <h2 className="text-center">Registration form</h2>
            <form className="">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="form-group" style={{ width: "48%" }}>
                  <label className="mt-4">
                    <span className="text-danger">*</span>First Name:
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className={
                      firstNameErr ? "form-control showError" : "form-control"
                    }
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                  {firstNameErr && (
                    <div
                      className="text-start"
                      style={{
                        color: "red",

                        fontSize: "12px",
                      }}
                    >
                      {firstNameErr}
                    </div>
                  )}
                </div>
                <div className="form-group" style={{ width: "48%" }}>
                  <label className="mt-4">
                    <span className="text-danger">*</span>Middle Name:
                  </label>
                  <input
                    placeholder="Middle Name"
                    name="middleName"
                    className={
                      midddleNameErr ? "form-control showError" : "form-control"
                    }
                    value={this.state.middleName}
                    onChange={this.onChange}
                  />
                  {midddleNameErr && (
                    <div
                      className="text-start"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {midddleNameErr}
                    </div>
                  )}
                </div>
              </div>
              <div
                className="form-group"
                justify-content-center
                style={{ width: "w-100" }}
              >
                <label>
                  <span className="text-danger">*</span>Last Name:
                </label>
                <input
                  placeholder="Last name"
                  name="lastName"
                  className={
                    lastNameErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
                {lastNameErr && (
                  <div
                    className="text-start"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {lastNameErr}
                  </div>
                )}
              </div>

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

              <div className="form-group">
                <label>
                  <span className="text-danger">*</span>Mobile:
                </label>
                <input
                  type="mob"
                  placeholder="Mobile"
                  name="mobile"
                  className={
                    phoneNoErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.mobile}
                  onChange={this.onChange}
                />
                {phoneNoErr && (
                  <div
                    className="text-start"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {phoneNoErr}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <span className="text-danger">*</span>Address:
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  className={
                    addressErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.address}
                  onChange={this.onChange}
                />
                {addressErr && (
                  <div
                    className="text-start"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {addressErr}
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
                    value="provider"
                    checked={this.state.role === "provider"}
                    onChange={this.onValueChange}
                  />
                  <label class="form-check-label" for="i1">
                    Provider
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
                
              </div>

              <button className="btn btn-success mt-2" onClick={this.saveUser}>
                Save
              </button>
              <div className=" mt-2 text-end">
                <Link className="" to="/login">
                  Click here
                </Link>
                <span className="px-2">to login</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
