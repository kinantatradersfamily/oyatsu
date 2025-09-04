import Vue from 'vue'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://4qkcdwqf-3000.asse.devtunnels.ms' })
Vue.prototype.$api = api
Vue.prototype.$axios = axios
