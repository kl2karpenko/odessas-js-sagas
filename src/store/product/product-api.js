import MainApi from '../main-api';

export default class ProductApi extends MainApi {
  getProductInStore = ({ productId }) => {
    return this.get(`${this.mainApiRoute}/products/${productId}`);
  }

  getAllProducts = () => {
    return this.get(`${this.mainApiRoute}/products`);
  }
}