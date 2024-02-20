import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./Component/customer/NavBar"
import Home from "./Component/customer/Home";
import About from "./Component/customer/About";
import License from "./Component/customer/License";
import Cart from "./Component/customer/Cart";
import Register from "./Component/customer/Register";
import Login from "./Component/customer/Login";
import Logout from "./Component/customer/Logout";

import CheckOut from "./Component/customer/CheckOut";
import ListAllUser from "./Component/admin/ListAllUsers";
import ListAllProviders from "./Component/admin/ListAllProviders";

import EditUser from "./Component/admin/EditUser";
import AddUser from "./Component/admin/AddUser";
import AdminNavBar from "./Component/admin/AdminNavBar";
import ProductDetail from "./Component/customer/ProductDetail";
import Order from "./Component/customer/Order";
import { useEffect, useState } from "react";
import Footer from "./Component/customer/Footer";


import ListAllProduct from "./Component/admin/ListAllProduct";
import AddProduct from "./Component/admin/AddProduct";
import EditProduct from "./Component/admin/EditProduct";
import ForgotPassword from "./Component/customer/ForgotPassword";

import ProviderNavBar from "./Component/customer/ProviderNavBar";
import AddHostel from "./Component/provider/AddHostel";
import AddBreed from "./Component/provider/AddBreed";
import EditProvider from "./Component/admin/EditProvider";
import Appointment from "./Component/customer/Appointment";
import Food from "./Component/customer/Food";
import Clothes from "./Component/customer/Clothes";
import OtherProducts from "./Component/customer/OtherProducts";
import AddVet from "./Component/provider/AddVet";
import AddTrainer from "./Component/provider/AddTrainer";
import ListTrainer from "./Component/customer/ListTrainer";
import Hostel from "./Component/customer/Hostel";
import Breed from "./Component/customer/Breed";



import AddPet from "./Component/provider/AddPet";
import BuyPet from "./Component/customer/BuyPet";
import AddPetCust from "./Component/customer/AddPetCust";

import Vet from "./Component/customer/Vet";
import HostelDetail from "./Component/customer/HostelDetails";
import Products from "./Component/customer/Products";
import BreedDetail from "./Component/customer/BreedDetails";
import VeterinaryDetail from "./Component/customer/VeterinaryDetails";


function App() {
  const [user, setuser] = useState(1);

  useEffect(() => {
    setuser(JSON.parse(localStorage.getItem("role") === "admin" ? 1 : localStorage.getItem("role") === "provider" ? 2 : 3));
  }, []);

  return (
    <div className="App">
      <Router>
      {user === 1 ? <AdminNavBar /> : user === 2 ? <ProviderNavBar /> : <NavBar />}
        {/* {user === 1 ? <NavBar /> : <AdminNavBar />} */}
        {/* {user === 1 ? <Chat /> : <></>} */}
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/About" component={About}></Route>
          <Route path="/License" component={License}></Route>
          <Route path="/Cart" component={Cart}></Route>
          <Route path="/Register" component={Register}></Route>
          <Route path="/Logout" component={Logout}></Route>
          <Route path="/Login" component={Login}></Route>
          <Route path="/ProductDetail" component={ProductDetail}></Route>
          <Route path="/clothes" component={Clothes}></Route>
          <Route path="/other" component={OtherProducts}></Route>
          <Route path="/CheckOut" component={CheckOut}></Route>
          <Route path="/Order" component={Order}></Route>
          <Route path="/food" component={Food}></Route>
          <Route path="/appointment" component={Appointment}></Route>
          <Route path="/hostel" component={Hostel}></Route>
          <Route path="/hosteldetails" component={HostelDetail}></Route>
          <Route path="/breed" component={Breed}></Route>
          <Route path="/breeddetails" component={BreedDetail}></Route>
          <Route path="/vet" component={Vet}></Route>
          <Route path="/veterinarydetails"component={VeterinaryDetail}></Route>
          
          <Route path="/products" component={Products}></Route>
        

          <Route path="/admin/dashboard" component={ListAllUser}></Route>
          <Route path="/provider/providers" component={ListAllProviders}></Route>
          <Route path="/admin/edit-user" component={EditUser}></Route>
          <Route path="/admin/user-add" component={AddUser}></Route>

          <Route path="/admin/products" component={ListAllProduct}></Route>
          <Route path="/admin/product-add" component={AddProduct}></Route>
          <Route path="/admin/edit-product" component={EditProduct}></Route>

          <Route path="/provider/edit-provider" component={EditProvider}></Route>
          <Route path="/provider/hostel-add" component={AddHostel}></Route>
          {/* <Route path="/provider/edit-hostel" component={EditHostel}></Route> */}

          {/* <Route path="/provider/breeds" component={ListAllBreed}></Route> */}
          
          
          <Route path="/provider/breed-add" component={AddBreed}></Route>
          <Route path="/provider/vet-add" component={AddVet}></Route>
          <Route path="/provider/trainer-add" component={AddTrainer}></Route>
          {/* <Route path="/provider/edit-breed" component={EditBreed}></Route> */}

          <Route path="/provider/pet-add" component={AddPet}></Route>
          <Route path="/buypet" component={BuyPet}></Route>
          <Route path="/addpet" component={AddPetCust}></Route> 

          <Route
            path="/user-forgot-password"
            component={ForgotPassword}
          ></Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
