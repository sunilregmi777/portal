import axios from "axios";


const baseUrl = 'http://localhost:5000/';

const API = async (url, method, data) => {

    return axios({
      method: method,
      url: `${baseUrl}${url}`,
      data: data
    })
    .then((response) => {
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Unauthorized request!";
            break;
          case 400:
            message = "Bad Request!";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};


export default API;
