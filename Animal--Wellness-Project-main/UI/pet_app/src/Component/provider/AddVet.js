import React, { Component } from "react";
import ApiService from "../../service/admin/ApiService";
import Swal from "sweetalert2";
class AddVet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      clinicname: "",
      docname:"",
      opentime:"",
      closetime:"",
      description: "",
      imgUrl: "",
      address: "",
      pincode: "",
      contact:"",
      message: null,
      message: "",
      formErrors: {},
    };
    this.saveProduct = this.saveProduct.bind(this);
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onValueChange = (event) =>
    this.setState({
      category: event.target.value,
    });

  handleFormValidation() {
    const { clinicname, description,  imgUrl } = this.state;
    let formErrors = {};
    let formIsValid = true;
    if (!clinicname) {
      formIsValid = false;
      formErrors["NameErr"] = "*clinic Name is required.";
    }
    if (!imgUrl) {
      formIsValid = false;
      formErrors["ImgErr"] = "*ImageUrl is required.";
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
        clinicname: this.state.clinicname,
        docname: this.state.docname,
        opentime: this.state.opentime,
        closetime: this.state.closetime,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        address: this.state.address,
        pincode: this.state.pincode,
        contact: this.state.contact,
        
      };

      ApiService.addVet(product)
        .then((resp) => {
          this.setState({ message: "Vet added successfully." });
          this.setState({
            id: resp.data.id,
          });
          console.log("id" + this.state.id);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Vet added successfully...",
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
    const { NameErr, DescErr, PriceErr, ImgErr } = this.state.formErrors;
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
          <h2 className="text-center">Add Vet </h2>
          <form>
            <div className="d-flex flex-wrap flex-column justify-content-between">
              <div className="form-group">
                <label>
                  <span className="text-danger">*</span>Clinic Name:
                </label>
                <input
                  type="text"
                  placeholder="Clinic name"
                  name="clinicname"
                  className={
                    NameErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.clinicname}
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
                  <span className="text-danger">*</span>Doctor Name:
                </label>
                <input
                  placeholder="Doctor Name"
                  name="docname"
                  className={
                    DescErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.docname}
                  onChange={this.onChange}
                />
                </div>
<div className="row">
                <div className="form-group col-6">
                <label htmlFor="timeInput">
                  <span className="text-danger">*</span> Open Time:
                </label>
                <input
                  placeholder="Open Time"
                  type="time"
                  name="opentime"
                  className={
                    DescErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.opentime}
                  onChange={this.onChange}
                />

                </div>
                <div className="form-group col-5 ">
                <label htmlFor="timeInput">
                  <span className="text-danger">*</span>Close Time:
                </label>
                <input
                  placeholder="close time"
                  type="time"
                  name="closetime"
                  className={
                    DescErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.closetime}
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
                  <span className="text-danger">*</span>Pincode:
                </label>
                <input
                  placeholder="pincode"
                  name="pincode"
                  className={
                    DescErr ? "form-control showError" : "form-control"
                  }
                  value={this.state.pincode}
                  onChange={this.onChange}
                />
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

              <button className="btn btn-success mt-4" onClick={this.saveProduct}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddVet;
