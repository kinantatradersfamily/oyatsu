<template>
    <div>
        <navbarComponent class="custom-navbar"></navbarComponent>
        <div class="q-px-lg q-pb-md" style="padding-top: 20px;margin-top: 20px;">
          <input type="text" class="form-control" placeholder="Please Insert Your Email" v-model="inputEmail">
          <br>
          <a href="javascript:void(0)" class="btn btn-primary" @click="getTracking()">Search</a>
            <template v-if="findStatus">
                <q-timeline color="secondary" style="margin-top: 20px;"> 
                  <q-timeline-entry heading>
                    Timeline heading
                  </q-timeline-entry>
      
                  <q-timeline-entry v-for="(item, index) of data" :key="index" :title="changeStatus(item.status)" :subtitle="moment(item.date).format('YYYY-MM-DD HH:mm')">
                    <div v-if="item.status == 0">
                       <div class="callout callout-info">
                            <h4 style="color: ;">Pesanan kamu lagi kita siapin ya!!</h4>
                            <p v-for="(pesanan, idx) of item.flavor" :key="idx">{{ pesanan.flavor }} - {{ pesanan.pack }} Packs</p>
                            <p><b>Total Harga Pesanan Kamu : {{ formatRupiah(item.total) }}</b></p>
                        </div>
                    </div>
                    <div v-if="item.status == 1">
                        <div class="callout callout-info">
                            <h3>Tungguin ya, Lagi Otw anter pesenan kamu nih !!! nanti aku chat ya kalo udah sampai</h3>
                        </div>
                    </div>
                    <div v-if="item.status == 2">
                        <div class="callout callout-info">
                            <h3>Selesai Dehh, jangan lupa instasory ya</h3>
                        </div>
                    </div>
                  </q-timeline-entry>
                </q-timeline>
            </template>
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
                const trackingList = await axios.get(`${this.url}/order/email/${email}/history`);

                if(trackingList.data.history.length > 0) {
                    this.findStatus = true
                    trackingList.data.history = trackingList.data.history.map(item => {
                        item.flavor = JSON.parse(JSON.stringify(item.flavor))
                        item.total = item.flavor.reduce((acc, flavor) => acc + flavor.price, 0)
                        return item
                    })
                    this.data = trackingList.data.history
                    console.log(this.data)
                }

            } catch (err) {
                console.error("Gagal mengambil data order:", err);
            }
        }
    },
}

</script>