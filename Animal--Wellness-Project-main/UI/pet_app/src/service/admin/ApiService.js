import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/admin";

class ApiService {
  addUser(user) {
    return axios.post(USER_API_BASE_URL + "/user-add", user);
  }

  fetchUserById(userId) {
    return axios.get(USER_API_BASE_URL + "/" + userId);
  }

  fetchAllUsers() {
    return axios.get(USER_API_BASE_URL + "/users");
  }

  fetchProviderById(userId) {
    return axios.get("http://localhost:8080/provider/" +userId);
  }

  fetchAllProviders() {
    return axios.get("http://localhost:8080/provider/providers");
  }
  editUser(user) {
    return axios.put(USER_API_BASE_URL + "/" + user.id, user);
  }

  editProvider(user) {
    return axios.put("http://localhost:8080/provider/" + user.id, user);
  }

  deleteUser(userId) {
    return axios.delete(USER_API_BASE_URL + "/" + userId);
  }

  deleteProvider(userId) {
    return axios.delete("http://localhost:8080/provider/" + userId);
  }

  deleteCustomer(userId) {
    return axios.delete("http://localhost:8080/admin/" + userId);
  }

  fetchAllProducts() {
    return axios.get(USER_API_BASE_URL + "/products");
  }

  addProduct(product) {
    return axios.post(USER_API_BASE_URL + "/product-add", product);
  }

  addHostel(hostel) {
    return axios.post("http://localhost:8080/hostel/hostel-add", hostel);
  }

  addVet(vet) {
    return axios.post("http://localhost:8080/vet/vet-add", vet);
  }

  addBreed(breed) {
    return axios.post("http://localhost:8080/breed/breed-add", breed);
  }

  fetchProductById(productId) {
    return axios.get(USER_API_BASE_URL + "/product/" + productId);
  }

  editProduct(product) {
    return axios.put(USER_API_BASE_URL + "/product/" + product.id, product);
  }

  deleteProduct(productId) {
    return axios.delete(USER_API_BASE_URL + "/product/" + productId);
  }
}

export default new ApiService();
