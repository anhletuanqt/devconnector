import axios from 'axios';

// axios.defaults.timeout = 15000;

// axios.interceptors.request.use(
//   async (config) => {
//     const session = await Auth.currentSession();

//     // TODO: how to handle the case if session is not valid?
//     if (session && session.isValid()) {
//       // axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

//       config.headers['Authorization'] = `Bearer ${session.getIdToken().getJwtToken()}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error.response);
//   }
// );

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response);
  }
);

const http = {
  request(config = {}) {
    return axios.request(config);
  },
  get(url, config = {}) {
    return axios.get(url, config);
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url, config = {}) {
    return axios.delete(url, config);
  }
};

export default http;
