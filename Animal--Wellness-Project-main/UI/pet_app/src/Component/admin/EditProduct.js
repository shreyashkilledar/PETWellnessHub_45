import React, { Component } from "react";
import ApiService from "../../service/admin/ApiService";
import Swal from "sweetalert2";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      imgUrl: "",
      price: "",
      discount: "",
      category: "",
      message: null,
      formErrors: {},
    };
    this.saveProduct = this.saveProduct.bind(this);
    this.loadProduct = this.loadProduct.bind(this);
  }

  componentDidMount() {
    this.loadProduct();
  }

  loadProduct() {
    ApiService.fetchProductById(window.localStorage.getItem("productId")).then(
      (res) => {
        let product = res.data;
        console.log(product);
        this.setState({
          id: product.id,
          name: product.name,
          description: product.description,
          imgUrl: product.imgUrl,
          price: product.price,
          discount: product.discount,
          category: product.category,
        });
      }
    );
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onValueChange = (event) =>
    this.setState({
      category: event.target.value,
    });
  handleFormValidation() {
    const { name, description, price, imgUrl } = this.state;
    let formErrors = {};
    let formIsValid = true;
    if (!name) {
      formIsValid = false;
      formErrors["NameErr"] = "*Name is required.";
    }
    if (!imgUrl) {
      formIsValid = false;
      formErrors["ImgErr"] = "*ImageUrl is required.";
    }
    if (!price) {
      formIsValid = false;
      formErrors["PriceErr"] = "*enter the price.";
    } else if (!/^\d{0,8}[.]?\d{1,4}$/.test(price)) {
      formIsValid = false;
      formErrors["PriceErr"] = "*InvalidPrice.";
    }

    if (!description) {
      formIsValid = false;
      formErrors["DescErr"] = "*Description is required.";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  saveProduct = (e) => {
    e.preventDefault();
    if (this.handleFormValidation()) {
      let product = {
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        price: this.state.price,
        discount: this.state.discount,
        category: this.state.category,
      };
      ApiService.editProduct(product)
        .then((res) => {
          this.setState({ message: "product details updated successfully." });
          this.props.history.push("/admin/products");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "product updated successfully...",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.data.message,
            footer: '<a href="">Why do I have this issue?</a>',
          });
          this.props.history.push("/admin/products");
        });
    }
  };

  render() {
    const { NameErr, DescErr, PriceErr, ImgErr } = this.state.formErrors;
    return (
      <div className="container d-flex justify-content-center">
        <div
          className="m-4 p-4 border"
          style={{
            height: "750px",
            width: "550px",
            boxShadow:
              " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
          }}
        >
          <h2 className="text-center">Edit Product</h2>
          <form>
            <div className="form-group">
              <label>
                <span className="text-danger">*</span>Name:
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className={NameErr ? "form-control showError" : "form-control"}
                value={this.state.name}
                onChange={this.onChange}
              />
              {NameErr && (
                <div
                  className="text-start"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {NameErr}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>
                <span className="text-danger">*</span>Description:
              </label>
              <input
                placeholder="description"
                name="description"
                className={DescErr ? "form-control showError" : "form-control"}
                value={this.state.description}
                onChange={this.onChange}
              />
              {DescErr && (
                <div
                  className="text-start"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {DescErr}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>
                <span className="text-danger">*</span>image URL:
              </label>
              <input
                placeholder="image URL"
                name="imgUrl"
                className={ImgErr ? "form-control showError" : "form-control"}
                value={this.state.imgUrl}
                onChange={this.onChange}
              />
              {ImgErr && (
                <div
                  className="text-start"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {ImgErr}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>
                <span className="text-danger">*</span>Price:
              </label>
              <input
                placeholder="Price"
                name="price"
                className={PriceErr ? "form-control showError" : "form-control"}
                value={this.state.price}
                onChange={this.onChange}
              />
              {PriceErr && (
                <div
                  className="text-start"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {PriceErr}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Discount:</label>
              <input
                type="number"
                placeholder="Discount"
                name="discount"
                className="form-control"
                value={this.state.discount}
                onChange={this.onChange}
              />
            </div>

            <div class="form-check">
              <label>
                <span className="text-danger">*</span>Category:
              </label>
              <br />
              <input
                class="form-check-input"
                type="radio"
                name="category"
                id="i1"
                value="food"
                checked={this.state.category === "food"}
                onChange={this.onValueChange}
              />
              <label class="form-check-label" for="i1">
                Food
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="category"
                id="i2"
                value="cloths"
                checked={this.state.category === "cloths"}
                onChange={this.onValueChange}
              />
              <label class="form-check-label" for="i2">
                Cloths
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="category"
                id="i3"
                value="Bed&Sofa"
                checked={this.state.category === "Bed&Sofa"}
                onChange={this.onValueChange}
              />
              <label class="form-check-label" for="i3">
                Bed&Sofa
              </label>
            </div>

            <button className="btn btn-success" onClick={this.saveProduct}>
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProduct;
