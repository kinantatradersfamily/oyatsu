window.$ = window.jQuery = require('jquery');
window.moment = require('moment');
require('./assets/vendor/bootstrap/dist/js/bootstrap.min');

import Vue from 'vue';
import Quasar from 'quasar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';

import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'admin-lte/dist/js/adminlte.min.js';

import App from './App.vue';
import router from './router';

Vue.use(Quasar);

new Vue({
  el: '#q-app',
  router,
  render: h => h(App)
});
