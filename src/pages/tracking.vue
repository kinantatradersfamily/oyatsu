<template>
    <div>
        <navbarComponent class="custom-navbar"></navbarComponent>
        <div class="q-px-lg q-pb-md" style="padding-top: 20px;margin-top: 20px;">
          <input type="text" class="form-control" placeholder="Please Insert Your Email" v-model="inputEmail">
          <br>
          <a href="javascript:void(0)" class="btn btn-primary" @click="getTracking()">Search</a>
          <q-timeline color="secondary" v-if="findStatus" style="margin-top: 20px;"> 
            <q-timeline-entry heading>
              Timeline heading
            </q-timeline-entry>
      
            <q-timeline-entry
              :title="`${changeStatus(data[0].status)}`"
              :subtitle="`${moment(data[0].updated_at).format('YYYY-MM-DD HH:mm')}`"
            >
              <div>
                <ul>
                    <li v-for="(item, index) of JSON.parse(data[0].flavor)" :key="index">
                        {{ item.flavor }} - {{ item.pack }}Pcs
                    </li>
                    <b>Total : {{ formatRupiah(JSON.parse(data[0].flavor).reduce((a, b) => a.price + b.price)) }}</b>
                </ul>
              </div>
            </q-timeline-entry>
      
            <q-timeline-entry
              title="Event Title"
              subtitle="February 21, 1986"
              icon="delete"
            >
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </q-timeline-entry>
      
            
          </q-timeline>
        </div>
        <footerComponent></footerComponent>

    </div>
</template>

<style scoped>
.custom-navbar {
    background-color: black !important;
}
</style>

<script>
import axios from "axios";
import moment from 'moment'

import footerComponent from './../layouts/component/footer.vue'
import navbarComponent from './../layouts/component/navbar.vue'


export default {
    components: {
          footerComponent,
        navbarComponent
    },
    data() {
        return {
            moment,
            findStatus: false,
            url: process.env.VUE_APP_API_URL,
            inputEmail: '',
            data: {}
        }
    },
    methods: {
        formatRupiah(angka, withPrefix = true) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(angka);
        },
        changeStatus(data) {
            if(data == 0) return 'Proses'
            else if(data == 1) return 'Dianter'
            else return 'Selesai'
        },
       async getTracking() {
            try {
                const email = this.inputEmail;
                const result = await axios.get(`${this.url}/order/by-email/${email}`);
                if(result.data.length > 0) {
                    this.findStatus = true
                    this.data = result.data
                }

                console.log(result.data.length> 0)
            } catch (err) {
                console.error("Gagal mengambil data order:", err);
            }
        }
    },
}

</script>