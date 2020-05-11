import MainApi from '../main-api';

export default class StoreApi extends MainApi {
  getAllShops = () => {
    return fetch(`${this.mainApiRoute}/shops`).then(res => res.json()).catch(console.error)
  }
}