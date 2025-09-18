<template>
  <div>
    <div class="hero_area">
    <div class="bg-box">
      <img src="../assets/images/photo_sus.jpeg" alt="">
    </div>

    <navbar></navbar>
    <!-- header section strats -->
    <!-- end header section -->
    <!-- slider section -->
    <section class="slider_section ">
      <div id="customCarousel1" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(value, index) in list.section_1"
            :key="index"
            :class="{ active: index === 0 }"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-7 col-lg-6">
                  <div class="detail-box">
                    <h1>{{ value.title }}</h1>
                    <p>
                      {{ value.desc }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <ol class="carousel-indicators">
            <li
              v-for="(value, index) in list.section_1"
              :key="index"
              data-target="#customCarousel1"
              :data-slide-to="index"
              :class="{ active: index === 0 }"
            ></li>
          </ol>
        </div>
      </div>

    </section>
    <!-- end slider section -->
  </div>

  <!-- offer section -->

  <section class="offer_section layout_padding-bottom">
    <div class="offer_container">
      <div class="container ">
        <div class="row">
          <div class="col-md-6" v-for="(value, key) of list.section_2" :key="key">
            <div class="box ">
              <div class="img-box">
                <img :src="`${url}` + value.image" alt="">
              </div>
              <div class="detail-box">
                <h5>
                
                  {{value.title}}
                </h5>
                <h6>
                  <span>{{ value.desc }}</span>
                </h6>
                <router-link :to="{name: 'order'}">
                  Order Now <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029" style="enable-background:new 0 0 456.029 456.029;" xml:space="preserve">
                    <g>
                      <g>
                        <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                     c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                     C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                     c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                     C457.728,97.71,450.56,86.958,439.296,84.91z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                     c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                      </g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                  </svg>
                  </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- end offer section -->

  <!-- food section -->

  <section class="food_section layout_padding-bottom">
    <div class="container">
      <div class="heading_container heading_center">
        <h2>
          Our Menu
        </h2>
      </div>

      <div class="filters-content">
        <div class="row">
          <div class="col-sm-6 col-lg-4 all pizza" v-for="(value, key) of list.section_3" :key="key">
            <div class="box">
              <div>
                <div class="img-box">
                  <img :src="`${url}` + value.image" alt="preview" />
                </div>
                <div class="detail-box">
                  <h5>
                    {{value.title}}
                  </h5>
                  <p>
                   {{value.desc}}
                  </p>
                  <div class="options">
                    <h6>
                      Rp. {{ value.price }}
                    </h6>
                    <a href="javascript:void(0)">
                      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029" style="enable-background:new 0 0 456.029 456.029;" xml:space="preserve">
                        <g>
                          <g>
                            <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                         c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                         C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                         c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                         C457.728,97.71,450.56,86.958,439.296,84.91z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                         c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                          </g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- end food section -->

  <!-- about section -->

  <section class="about_section layout_padding" style="padding: 0px">
    <div class="container  ">
      <div class="row">
        <div class="col-md-6 ">
          <div class="img-box">
            <img :src="`${url}` + section4desc.image" alt="">
          </div>
        </div>
        <div class="col-md-6">
          <div class="detail-box">
            <div class="heading_container">
              <h2>
                {{ section4desc.title }}
              </h2>
            </div>
            <p>
             {{ section4desc.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- footer section -->
<footerComponent></footerComponent>
  </div>
</template>

<script>
import navbar from './../layouts/component/navbar.vue'
import footerComponent from './../layouts/component/footer.vue'
import axios from "axios";


export default {
  components: {
    navbar,
    footerComponent
  },
  name: 'PageIndex',

  data() {
    return {
      list: [],
      year: 0,
      url: process.env.VUE_APP_API_URL,
      section4desc: ''
    }
  },
  methods: {
    async getEvents () {
      const date = new Date()
      this.year = date.getFullYear()
      try {
        const res = await axios.get(`${this.url}/component/${this.year}`);
        const date = new Date()
        const month = date.getMonth()
        const year = date.getFullYear()
        this.list = res.data.message[year][month] ? res.data.message[year][month] : res.data.message[year][month-1]
        this.list = JSON.parse((JSON.stringify(this.list)))
        this.section4desc = this.list.section_4[this.list.section_4.length - 1]
      } catch (err) {
        this.$q.notify({type: 'negative', message: err})
      }
    }
  },
  mounted() {
    this.getEvents()
  }
}
</script>
