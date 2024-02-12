import React, { Component } from "react";
import ApiService from "../../service/admin/ApiService";
import Swal from "sweetalert2";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: "",
      address: "",
      message: null,
    };
    this.saveUser = this.saveUser.bind(this);
  }

  saveUser = (e) => {
    e.preventDefault();
    let user = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
      address: this.state.address,
    };
    ApiService.addUser(user)
      .then((resp) => {
        this.setState({ message: "User added successfully." });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.state.message,
          showConfirmButton: false,
          timer: 1500,
        });
        this.props.history.push("/admin/dashboard");
      })
      .catch((err) => {
        alert(err.data.message);
        this.props.history.push("/admin/dashboard");
      });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="container d-flex justify-content-center">
        <div
          className="m-4 p-4 border"
          style={{
            width: "550px",
            height: "670px",
            boxShadow:
              " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
          }}
        >
          <h2 className="text-center">Register User</h2>
          <hr></hr>
          <form>
            <div className="d-flex flex-wrap justify-content-between">
              <div className="form-group" style={{ width: "48%" }}>
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group" style={{ width: "48%" }}>
                <label>Last Name:</label>
                <input
                  placeholder="Last name"
                  name="lastName"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Middle Name:</label>
              <input
                placeholder="Middle Name"
                name="middleName"
                className="form-control"
                value={this.state.middleName}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Email id:</label>
              <input
                type="email"
                placeholder="email id"
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Mobile:</label>
              <input
                type="mob"
                placeholder="Mobile"
                name="mobile"
                className="form-control"
                value={this.state.mobile}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                placeholder="Address"
                name="address"
                className="form-control"
                value={this.state.address}
                onChange={this.onChange}
              />
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

export default AddUser;
