import React, { Component } from "react";
import ApiService from "../../service/admin/ApiService";
import Swal from "sweetalert2";

class ListAllProviders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: "default message",
    };
    this.deleteProvider = this.deleteProvider.bind(this);
    this.addUser = this.addUser.bind(this);
    this.reloadUserList = this.reloadUserList.bind(this);
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList() {
    ApiService.fetchAllProviders()
      .then((resp) => {
        this.setState({ users: resp.data });
        console.log(this.state.users);
      })
      .catch((err) => {
        console.error("in err ", err.response.data);
        alert(err.response.data.message);
      });
  }

  deleteProvider(userId) {
    ApiService.deleteProvider(userId)
      .then((res) => {
        this.setState({ message: "Provider deleted successfully." });
        this.setState({
          users: this.state.users.filter((user) => user.id !== userId),
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.state.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error("in err ", err.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  }

  addUser() {
    window.localStorage.removeItem("userId");
    this.props.history.push("/admin/user-add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Provider Details</h2>
        <div className="text-end"></div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>MiddleName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile</th>
              <th>Address</th>
              
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.middleName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.mobile}</td>
                <td>{user.address}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger m-2 w-75"
                    onClick={() => this.deleteProvider(user.id)}
                  >
                    Delete
                  </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListAllProviders;
