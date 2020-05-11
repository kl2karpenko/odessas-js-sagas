import MainApi from '../main-api';

export default class ProductApi extends MainApi {
  getProductInStore = ({ productId }) => {
    return fetch(`${this.mainApiRoute}/products/${productId}`).then(res => res.json()).catch(console.error)
  }

  getAllProducts = () => {
    return fetch(`${this.mainApiRoute}/products`).then(res => res.json()).catch(console.error)
  }
}