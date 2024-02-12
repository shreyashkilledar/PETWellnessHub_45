import React, { Component } from "react";
import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import orderimg from "../../images/orderimg.png";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      message: "",
      imgUrl: "",
      date: "",
      listItem: [],
      address: "",
      quantity: 0,
      total: 0,
    };
  }

  componentDidMount() {
    let userDetails = localStorage.getItem("loginDetails")
      ? localStorage.getItem("loginDetails")
      : null;
    if (userDetails) {
      userDetails = JSON.parse(userDetails);

      ApiService.fetchOrder(userDetails.id).then((response) => {
        this.setState({ items: response.data });

        this.setState({ listItem: this.state.items.list });
        this.setState({ quantity: this.state.items.quantity });
        this.setState({ address: this.state.items.address });
        this.setState({ date: this.state.items.date });
        this.setState({ total: this.state.items.total });
      });
    } else {
      this.setState = { message: "Please login to view Order" };
      alert(this.state.message);
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <img
              className="rounded mx-auto d-block"
              style={{ width: "80%" }}
              src={orderimg}
              alt="Order image"
            />

            <div
              className="w-75  p-2 d-flex flex-column justify-content-lg-start"
              style={{
                boxShadow:
                  " 2px 4px 0 rgba(0, 0, 0, 0.5), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
              }}
            >
              <div>
                <div className="" style={{ fontWeight: "bold" }}>
                  Your Order Booked on
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "3vh",
                    color: "red",
                  }}
                >
                  {this.state.date}
                </div>
              </div>
              <div>
                <div className="" style={{ fontWeight: "bold" }}>
                  Will deliver in 2 days at
                </div>
                <span
                  style={{
                    fontStyle: "italic",
                    fontSize: "3vh",
                    color: "red",
                  }}
                >
                  {this.state.address}
                </span>
              </div>

              <div>
                <div className="" style={{ fontWeight: "bold" }}>
                  items in order are
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "3vh",
                    color: "red",
                  }}
                >
                  {this.state.quantity}
                </div>
              </div>
              <div>
                <div className="" style={{ fontWeight: "bold" }}>
                  Total amount paid is
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "3vh",
                    color: "red",
                  }}
                >
                  {this.state.total}
                </div>
              </div>
            </div>
          </div>
          <div className="col-8 p-2">
            <div
              style={{
                boxShadow:
                  " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
              }}
            >
              <h1 style={{ color: "Highlight" }}>Your Orders</h1>
            </div>

            {this.state.listItem.map((ele) => (
              <div className="card p-2">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={ele.imgUrl}
                      className="img-fluid rounded-start"
                      alt="..."
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{ele.name}</h5>
                      <hr></hr>
                      <p className="card-text">{ele.description}</p>
                      <p className="card-text">
                        <small className="text-muted" />
                        {ele.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
