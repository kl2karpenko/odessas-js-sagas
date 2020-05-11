import MainApi from './main-api';

export default class ShopsApi extends MainApi {
  apiUrl = 'shops';

  getAllShops = () => {
    return fetch(`${this.api}${this.apiUrl}`).then(res => res.json()).catch(err => console.error)
  }
}