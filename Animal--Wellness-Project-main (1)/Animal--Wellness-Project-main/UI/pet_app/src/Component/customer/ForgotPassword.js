import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import logimg from "../../images/logimg.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };

    this.sendMail = this.sendMail.bind(this);
  }

  sendMail = (e) => {
    e.preventDefault();
    Swal.fire("please wait it may take some time");
    let mail = this.state.email;
    ApiService.sendPasswordOnMail(mail)
      .then((resp) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: resp.data,
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("mail").value = "";
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <img className="card-img-top" src={logimg} alt="Login image" />
        </div>
        <div className="col-5 pt-3">
          <div
            className="m-4 p-4 border"
            style={{
              height: "380px",
              boxShadow:
                " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
            }}
          >
            <h2 className="text-center">Forgot Password</h2>
            <h4 className="text-center">Enter Your Email</h4>
            <form>
              <div className="form-group">
                <label>Email id:</label>
                <input
                  id="mail"
                  type="email"
                  placeholder="email id"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>

              <button className="btn btn-primary mt-2" onClick={this.sendMail}>
                Submit
              </button>
              <div className=" mt-3 d-flex flex-wrap justify-content-center">
                <div>
                  <Link className="" to="/login">
                    Click here
                  </Link>
                  <span className="px-2">to login</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
