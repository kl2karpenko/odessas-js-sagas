import MainApi from '../main-api';

export default class OrderApi extends MainApi {
  createOrder = ({ orderList }) => {
    return this.post(`${this.mainApiRoute}/orders`, orderList);
  }

  createSingleOrder = ({ orderId }) => {
    return this.post(`${this.mainApiRoute}/orders`, { orderId });
  }

  createOrderUploader = ({ orderId }, progressHandler) => {
    return this.uploader(`${this.mainApiRoute}/orders`, { orderId }, progressHandler);
  }
}