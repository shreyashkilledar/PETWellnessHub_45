import react, { Component } from "react";
import ApiService from "../../service/ApiService";
import Swal from "sweetalert2";

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: "",
      total: 0,
      address: "",
    };
  }

  componentDidMount() {
    let loginData = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;

    if (loginData) {
      loginData = JSON.parse(loginData);

      if (loginData.id) {
        this.setState({ address: loginData.address });
        ApiService.fetchTotal(loginData.id).then((resp) => {
          this.setState({ total: resp.data });
          console.log("totallll " + this.state.total);
        });
      }
    }
  }

  onValueChange = (event) =>
    this.setState({
      payment: event.target.value,
    });

  sendData = (e) => {
    //API CALL
    e.preventDefault();

    let loginData = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;
    if (loginData) {
      loginData = JSON.parse(loginData);
      let PlaceOrder = {
        customerId: loginData.id,
        payMode: this.state.payment,
      };
      ApiService.sendOrder(PlaceOrder)
        .then((resp) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "order placed successfully...",
            showConfirmButton: false,
            timer: 1500,
          });

          this.props.history.push("/Order");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.data,
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    }
  };

  render() {
    return (
      <div>
        <div class="card col-6 m-5">
          <div class="card-header text-start">Delivery</div>
          <div class="card-body text-start">
            <p>Address : {this.state.address}</p>
            <cite title="Source Title">Delivery in 2 Days</cite>
          </div>
        </div>
        <form>
          <div className="col-6">
            <div className="d-flex justify-content-center">
              <div className="form-check w-25">
                <label>Payment Mode:</label>
                <br />
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="i1"
                  value="COD"
                  checked={this.state.payment === "COD"}
                  onChange={this.onValueChange}
                />
                <label class="form-check-label" for="i1">
                  COD
                </label>
                <br/>
                {/* <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="i2"
                  value="ONLINE"
                  checked={this.state.payment === "ONLINE"}
                  onChange={this.onValueChange}
                />
                <label class="form-check-label" for="i2">
                  Online
                </label> */}
                
              </div>
            </div>
            <button className="btn btn-success" onClick={this.sendData}>
              Place Order
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckOut;
