import { Component } from "react";

class AddTrainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            gender:"",
            Experience:" ",
            fees:"",
            mobile:"",
            Address:"",

            message: null,
            message: "",
            formErrors: {},
        };
}
}