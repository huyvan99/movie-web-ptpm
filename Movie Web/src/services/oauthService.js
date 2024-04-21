import axios from 'axios'

const API_URL = "http://localhost:3002"
const oauthService = {
  login(params) {
    const data = {
      "email": params.email,
      "password": params.password
    }
    return axios.post(API_URL + '/users/login', data, {
      // headers: {
      //   'accept': 'application/json',
      //   'Content-Type': 'application/json' //x-www-form-urlencoded
      // }
    });
  },

  signup(params) {
    const data = {
      "name": params.name,
      "email": params.email,
      "password": params.password,
      "phoneNumber": params.phone,
      "address": params.address
    }
    return axios.post(API_URL + '/users/register', data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json' //x-www-form-urlencoded
      }
    });
  },

  getDataMovie(token) {
    return axios.get(API_URL + '/movies?size=100&page=1&searchString=', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },

  getDetailMovie(movieId) {
    return axios.get(API_URL + '/movies/' + movieId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    })
  },

  // getDataMoviePred(params) {
  //   return axios.get('https://faac-14-177-144-150.ngrok-free.app/' + params + '/false', {
  //     headers: {
  //       'accept': 'application/json',
  //       "ngrok-skip-browser-warning": "69420"
  //       //'Content-Type': 'application/json' //x-www-form-urlencoded
  //     }
  //   });
  // }

  getDataMoviePred(params) {
    return axios.get(API_URL + '/predictions/' + params, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      }
    });
  }

}
export { oauthService };
