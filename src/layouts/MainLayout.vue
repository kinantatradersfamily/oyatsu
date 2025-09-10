<template>
  <div>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-nice-select/1.1.0/css/nice-select.min.css" integrity="sha512-CruCP+TD3yXzlvvijET8wV5WxxEh5H8P4cmz0RFbKK6FlZ2sYl3AEsKlLPHbniXKSrDdFewhbmBK5skbdsASbQ==" crossorigin="anonymous" />
    <router-view />
  </div>
</template>



<script>
require('../assets/css/style.css')
require('../assets/css/bootstrap.css')
require('../assets/css/responsive.css')

require('../assets/js/jquery-3.4.1.min.js')
require('../assets/js/bootstrap.js')
require('../assets/js/custom.js')

import "../assets/adminlte/css/skins/_all-skins.min.css";


export default {
  name: 'MainLayout',
  
  data () {
    return {
      // leftDrawerOpen: false, 
    }
  }
}
</script>
