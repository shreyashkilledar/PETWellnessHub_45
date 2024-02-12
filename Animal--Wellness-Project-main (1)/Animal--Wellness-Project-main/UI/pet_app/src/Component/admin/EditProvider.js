import React, { Component } from "react";
import ApiService from "../../service/admin/ApiService";
import Swal from "sweetalert2";
class EditProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      address: "",
      message: "",
      cartId: "",
      formErrors: {},
    };
    this.saveUser = this.saveUser.bind(this);
  }

  componentDidMount() {
    let userDetails = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      ApiService.fetchProviderById(userDetails.id).then((res) => {
        let user = res.data;
        console.log(user);

        this.setState({
          id: user.id,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          mobile: user.mobile,
          address: user.address,
        });
      });
    } else {
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
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
    if (!lastName) {
      formIsValid = false;
      formErrors["lastNameErr"] = "*LastName is required.";
    } else if (!/^[a-zA-Z ]{2,30}$/.test(lastName)) {
      formIsValid = false;
      formErrors["lastNameErr"] = "*Invalid Lastname.";
    }

    if (!email) {
      formIsValid = false;
      formErrors["emailIdErr"] = "*Email id is required.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      formIsValid = false;
      formErrors["emailIdErr"] = "*Invalid email id.";
    }
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
      let user = {
        id: this.state.id,
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        mobile: this.state.mobile,
        address: this.state.address,
      };
      ApiService.editProvider(user)
        .then((res) => {
          this.setState({ message: "User details updated successfully." });
          Swal.fire({
            position: "center",
            icon: "success",
            title: this.state.message,
            showConfirmButton: false,
            timer: 2000,
          });
          this.props.history.push("/");
        })
        .catch((err) => {
          console.error("in err ", err.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.data.message,
            footer: '<a href="">Why do I have this issue?</a>',
          });
          this.props.history.push("/");
        });
    }
  };

  render() {
    const {
      firstNameErr,
      lastNameErr,
      emailIdErr,
      phoneNoErr,
      midddleNameErr,
      addressErr,
      passwordErr,
    } = this.state.formErrors;
    return (
      <div className="container d-flex justify-content-center">
        <div
          className="m-4 p-4 border"
          style={{
            height: "700px",
            boxShadow:
              " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
          }}
        >
          <h2 className="text-center">Update Provider</h2>
          <form>
            <div className="d-flex flex-wrap justify-content-between mt-4">
              <div className="form-group" style={{ width: "48%" }}>
                <label>
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
                <label>
                  {" "}
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

            <button className="btn btn-success mt-3" onClick={this.saveUser}>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProvider;
