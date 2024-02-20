import React, { Component } from "react";
import ApiService from "../../service/admin/ApiService";
import Swal from "sweetalert2";
class ListAllProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      message: null,
    };
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.reloadProductList = this.reloadProductList.bind(this);
  }

  componentDidMount() {
    this.reloadProductList();
  }

  reloadProductList() {
    ApiService.fetchAllProducts().then((resp) => {
      this.setState({ products: resp.data });
      console.log(this.state.products);
    });
  }

  deleteProduct(productId) {
    ApiService.deleteProduct(productId)
      .then((res) => {
        this.setState({ message: "product deleted successfully." });
        this.setState({
          products: this.state.products.filter(
            (product) => product.id !== productId
          ),
        });
        console.log(this.state.products);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "product deleted successfully...",
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

  editProduct(id) {
    window.localStorage.setItem("productId", id);
    this.props.history.push("/admin/edit-product");
  }

  addProduct() {
    window.localStorage.removeItem("productId");
    this.props.history.push("/admin/product-add");
  }

  render() {
    return (
     <div>
         <h2 className="text-center">Product Details</h2>
         {/* <div className=" text-end">
           <button
            className="btn btn-primary mx-5 my-2"
            onClick={() => this.addProduct()}
          >
            Add Product
          </button>
       </div> */}
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th>Image</th> */}
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) => (
              <tr key={product.id}>
                {/* <td>{product.image}</td> */}
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.discount}</td>

                <td>
                  <button
                    className="btn btn-sm btn-danger m-2 w-75"
                    onClick={() => this.deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-primary m-2 w-75"
                    onClick={() => this.editProduct(product.id)}
                  >
                    Edit
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

export default ListAllProduct;
