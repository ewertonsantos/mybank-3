"use strict";

import Vue from 'vue';
import axios from "axios";
// importa todos os servicos
import { obterServicos } from '../servicos'

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.headers.common['Access-Control-Allow-Origin'] = ['*']
// axios.defaults.headers.common["Access-Control-Allow-Methods: GET"]
// axios.defaults.headers("Access-Control-Allow-Methods: GET")
// axios.defaults.headers.common['Authorization'] = '*';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: 'http://localhost:8080/treinamento/'
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
const watch = new Vue({
  data() {
    return {
      // Serão populados programaticamente
      ready: false,
      http: null
      // Caso optemos por usar globalmente, precisamos atribuir em alguma propriedade aqui
    }
  }
})
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  Vue.axios = watch;
  window.axios = _axios;

  Object.defineProperties(Vue.prototype,{

    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
    $servicos: {
      get() {
        return watch
      }
    }
  });
};

Vue.use(Plugin)

export default Plugin;

const servicos = obterServicos(_axios) // Isso retorna a lista de servicos instalada
watch.http = servicos 
