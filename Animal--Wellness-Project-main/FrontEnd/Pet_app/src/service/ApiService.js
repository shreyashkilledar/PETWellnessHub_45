import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080";

class ApiService {
 fetchProducts() {
    return axios.get(USER_API_BASE_URL + "/products");
  }

  fetchHostels() {
    return axios.get(USER_API_BASE_URL + "/hostel/hostels");
  }
  fetchBreed()
  {
    return axios.get(USER_API_BASE_URL + "/breed/breeds");
  }
  fetchVeterinary()
  {
    return axios.get(USER_API_BASE_URL + "/vet/vets");
  }
  fetchTrainers(){
    return axios.get(USER_API_BASE_URL + "/trainers");
  }

  fetchProductById(productId) {
    return axios.get(USER_API_BASE_URL + "/" + productId);
  }

  fetchUserById(userId) {
    return axios.get(USER_API_BASE_URL + "/" + userId);
  }


  loginVendor(details) {
    return axios.post(USER_API_BASE_URL + "/admin", details);
  }

  loginCustomer(details) {
    return axios.post(USER_API_BASE_URL + "/user/customer", details);
  }

  loginProvider(details) {
    return axios.post(USER_API_BASE_URL + "/provider/verify-provider", details);
  }

  deleteUser(userId) {
    return axios.delete(USER_API_BASE_URL + "/" + userId);
  }

  addUser(customer) {
    return axios.post(USER_API_BASE_URL + "/user/user-add", customer);
  }

  addProvider(customer) {
    return axios.post(USER_API_BASE_URL + "/provider/provider-add", customer);
  }

  editUser(user) {
    return axios.put(USER_API_BASE_URL + "/" + user.id, user);
  }

  fetchProductsCart(customerId) {
    return axios.get(USER_API_BASE_URL + "/cart/items/" + customerId);
  }

  getCartIdOfUser(customerId) {
    return axios.get(USER_API_BASE_URL + "/cart/user-cart/" + customerId);
  }

  deleteProductFromCart(cartId, productId) {
    console.log("inside api service " + cartId + " " + productId);
    return axios.delete(
      USER_API_BASE_URL + "/cart/delete-item/" + cartId + "/" + productId
    );
  }

  fetchProductChair() {
    return axios.get(USER_API_BASE_URL + "/products/category/Chair");
  }

  fetchProductTable() {
    return axios.get(USER_API_BASE_URL + "/products/category/Table");
  }

  fetchProductSofa() {
    return axios.get(USER_API_BASE_URL + "/products/category/Sofa");
  }

  addtoCardAPI(cartData) {
    return axios.post(USER_API_BASE_URL + "/cart/add-product", cartData);
  }

  fetchTotal(customerID) {
    return axios.get(USER_API_BASE_URL + "/payment/total/" + customerID);
  }

  getProductDetails(proId) {
    return axios.get(USER_API_BASE_URL + "/products/details/" + proId);
  }

  getHostelDetails(proId) {
    return axios.get(USER_API_BASE_URL + "/hostel/" + proId);
  }
  getBreedDetails(proId)
  {
    return axios.get(USER_API_BASE_URL + "/breed/" + proId)
  }
  getVaterinaryDetails(proId)
  {
    return axios.get(USER_API_BASE_URL + "/vet/"+proId);
  }

  sendPasswordOnMail(email) {
    return axios.get(USER_API_BASE_URL + "/admin/get-password/" + email);
  }

  sendOrder(PlaceOrder) {
    return axios.post(USER_API_BASE_URL + "/payment/place", PlaceOrder);
  }

  fetchOrder(customerId) {
    return axios.get(USER_API_BASE_URL + "/order/my-order/" + customerId);
  }

  fetchPet()
  {
    return axios.get(USER_API_BASE_URL + "/breed/breeds");
  }

  buypet(cartData) {
    return axios.post(USER_API_BASE_URL + "/cart/add-pet", cartData);
  }

  fetchPetCart(customerId) {
    return axios.get(USER_API_BASE_URL + "/cart/pets/" + customerId);
  }
  

}

export default new ApiService();
