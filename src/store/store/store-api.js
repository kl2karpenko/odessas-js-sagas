import MainApi from '../main-api';

export default class StoreApi extends MainApi {
  getAllShops = () => {
    return this.get(`${this.mainApiRoute}/shops`);
  }
}