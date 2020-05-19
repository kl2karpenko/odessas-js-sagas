import MainApi from '../main-api';

export default class OrderApi extends MainApi {
  createOrder = ({ orderList }) => {
    return fetch(`${this.mainApiRoute}/orders`, {
      method: 'post',
      body: JSON.stringify(orderList)
    }).then(res => res.json()).catch(console.error)
  }

  createSingleOrder = ({ order }) => {
    return fetch(`${this.mainApiRoute}/orders`, {
      method: 'PUT',
      body: JSON.stringify(order)
    }).then(res => res.json()).catch(console.error)
  }
}