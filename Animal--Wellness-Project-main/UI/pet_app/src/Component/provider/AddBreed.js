import React, { Component, useState, useEffect } from "react";
import ApiService from "../../service/admin/ApiService";
import Swal from "sweetalert2";





class AddBreed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            type:"",
            breed:"",
            gender:"",
            age:"",
            weight:"",
            description: "",
            imgUrl: "",
            message: null,
            message: "",
            formErrors: {},
        };
        this.saveProduct = this.saveProduct.bind(this);
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


    handleSelectChange = (ev) =>
    this.setState({
        selectedValue: ev.target.value,
    });




    handleFormValidation() {
        const { name, description, age, imgUrl,type,breed,weight} = this.state;
        let formErrors = {};
        let formIsValid = true;
        if (!name) {
            formIsValid = false;
            formErrors["NameErr"] = "*Name is required.";
        }
        // if (!type) {
        //     formIsValid = false;
        //     formErrors["TypeErr"] = "*type is required.";
        // }
        // if (!breed) {
        //     formIsValid = false;
        //     formErrors["BreedErr"] = "*breed is required.";
        // }


        if (!imgUrl) {
            formIsValid = false;
            formErrors["ImgErr"] = "*ImageUrl is required.";
        }
        // if (!age) {
        //     formIsValid = false;
        //     formErrors["AgeErr"] = "*enter the age.";
        // } else if (!/^\d{0,8}[.]?\d{1,4}$/.test(age)) {
        //     formIsValid = false;
        //     formErrors["AgeErr"] = "*Invalidage.";
        // }
        // if (!weight) {
        //     formIsValid = false;
        //     formErrors["WeightErr"] = "*enter the weight.";
        // } else if (!/^\d{0,8}[.]?\d{1,4}$/.test(weight)) {
        //     formIsValid = false;
        //     formErrors["WeightErr"] = "*Invalidweight.";
        // }

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
                type: this.state.type,
                breed: this.state.breed,
                gender: this.state.gender,
                age: this.state.age,
                weight: this.state.weight,
                description: this.state.description,
                imgUrl: this.state.imgUrl,
            };

            ApiService.addBreed(product)
                .then((resp) => {
                    this.setState({ message: "breed added successfully." });
                    this.setState({
                        id: resp.data.id,
                    });
                    console.log("id" + this.state.id);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "breed added successfully...",
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
        const { currentFile, progress, message, imageInfos, type } = this.state;
        const { NameErr, DescErr, PriceErr, ImgErr } = this.state.formErrors;
        let secondSelectOptions;
        switch (type) {
            case "Dog":
                secondSelectOptions = (
                    <>
                        <option value="">Select dog breed</option>
                        <option value="golden retriever">golden retriever</option>
                        <option value="labrador retriever">labrador retriever</option>
                        <option value="beagle">beagle</option>
                        <option value="german shepherd">german shepherd</option>
                        <option value="poodle">poodle</option>
                    </>
                );
                break;
            case "Cat":
                secondSelectOptions = (
                    <>
                     <option value="">Select cat breed</option>
                        <option value="Abyssinian"> Abyssinian</option>
                        <option value="AmericanBobtail">American Bobtail</option>
                        <option value="AmericanCurl"> American Curl</option>
                        <option value="AmericanShorthai">American Shorthai</option>
                        <option value="Balinese"> Balinese</option>
                    </>
                );
                break;
            default:
                secondSelectOptions = <option>Please select pet type first</option>;
                break;
        }
        return (
            <div
                className="carousalimage6 d-flex justify-content-center"

            >
                <div
                    className="bg-white m-4 p-4 border "
                    style={{

                        height: "750px",
                        width: "550px",
                        boxShadow:
                            " 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.404)",
                    }}
                >
                    <h2 className="text-center">Add Breed </h2>
                    <form>
                        <div className="d-flex flex-wrap flex-column justify-content-between">
                            <div className="form-group">
                                <label>
                                    <span className="text-danger">*</span>Name:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className={
                                        NameErr ? "form-control showError" : "form-control"
                                    }
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
                                    <span className="text-danger">*</span>Pet Type:
                                </label>
                                <select class="form-select" name="type" value={this.state.type}  
                               onChange={this.onChange}>
                                    <option value="">Please select an option</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                </select>
                                <label>
                                    <span className="text-danger">*</span>Breed:
                                </label>

                                <select class="form-select" name="breed" value={this.state.breed}  
                               onChange={this.onChange}>{secondSelectOptions}</select>
                            </div>

                            <div className="form-group">
                                <label>
                                    <span className="text-danger">*</span>Gender:
                                </label>
                                <select class="form-select" name="gender" value={this.state.gender}  onChange={this.onChange}>
                                    <option value="">Please select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            
                            <div className="form-group">
                                <label><span className="text-danger">*</span>age:</label>
                                <input
                                    type="number"
                                    placeholder="age"
                                    name="age"
                                    className="form-control"
                                    value={this.state.age}
                                    onChange={this.onChange}
                                />
                            </div>

                            
                            <div className="form-group">
                                <label><span className="text-danger">*</span>Weight:</label>
                                <input
                                    type="number"
                                    placeholder="weight"
                                    name="weight"
                                    className="form-control"
                                    value={this.state.weight}
                                    onChange={this.onChange}
                                />
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

export default AddBreed;
