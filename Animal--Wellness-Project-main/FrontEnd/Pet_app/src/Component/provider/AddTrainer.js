import { Component } from "react";
import ApiService from "../../service/admin/ApiService";
import Swal from "sweetalert2";
class AddTrainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            firstname: "",
            lastname:"",
            gender:"",
            experience:" ",
            fees:"",
            contact:"",
            Address:"",
            message: null,
            message: "",
            formErrors: {},
        };
        this.saveProduct = this.saveProduct.bind(this);

}
nChange = (e) => this.setState({ [e.target.name]: e.target.value });

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
        name: this.state.name,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        price: this.state.price,
        address: this.state.address,
        pincode: this.state.pincode,
        contact: this.state.contact,
        
      };

      ApiService.addTrainer(product)
        .then((resp) => {
          this.setState({ message: "Trainer added successfully." });
          this.setState({
            id: resp.data.id,
          });
          console.log("id" + this.state.id);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "trainer added successfully...",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
            footer: '<a href="">Why do I have this issue?</a>',
          });
          this.props.history.push("/");
        });
    }
  };

render() {
    const { currentFile, progress, message, imageInfos } = this.state;
    const { NameErr, DescErr, FeesErr, ImgErr } = this.state.formErrors;
    return (
      <div 
      className="carousalimage7 d-flex justify-content-center"

      >
        <div
          className="bg-white m-4 p-4 border "
          style={{
            
            height: "700px",
            width: "550px",
            boxShadow:
              " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
          }}
        >
          <h2 className="text-center">Add Trainer</h2>
          <form>
            <div className="d-flex flex-wrap flex-column justify-content-between">
              <div className="form-group">
                <label>
                  <span className="text-danger">*</span>first Name:
                </label>
                <input
                  type="text"
                  placeholder="first name"
                  name="firstname"
                  className={
                    NameErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.firstname}
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
              </div>
              <div className="d-flex flex-wrap flex-column justify-content-between">
              <div className="form-group">
                <label>
                  <span className="text-danger">*</span>last Name:
                </label>
                <input
                  type="text"
                  placeholder="last name"
                  name="lastname"
                  className={
                    NameErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.lastname}
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
                  <span className="text-danger">*</span>Gender:
                </label>
                <br></br>
                <input type="radio" id="html" name="gender" value="Female"/>
                 <label for="html">Female</label>
                 <br></br>
                 <input type="radio" id="css" name="gender" value="Male"/>
                <label for="css">Male</label>
                </div>

<div className="row">
                <div className="form-group col-6">
                <label htmlFor="timeInput">
                  <span className="text-danger">*</span>Experience:
                </label>
                <input
                  placeholder="Experience"
                  type="year"
                  name="Experience"
                  className={
                    DescErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.experience}
                  onChange={this.onChange}
                />
                </div>
               
             
                </div>
                

              <div className="form-group">
                <label>
                  <span className="text-danger">*</span>Description:
                </label>
                <input
                  placeholder="description"
                  name="description"
                  className={
                    DescErr ? "form-control showError" : "form-control"
                  }
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
                  <span className="text-danger">*</span>Address:
                </label>
                <input
                  placeholder="address"
                  name="address"
                  className={
                    DescErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.address}
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
                  <span className="text-danger">*</span>Contact:
                </label>
                <input
                  placeholder="contact"
                  name="contact"
                  className={
                    DescErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.contact}
                  onChange={this.onChange}
                />
                </div>

              <button className="btn btn-success mt-4" onClick={this.saveTrainer}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AddTrainer;