<template>
    <div>
        <navbarComponent class="custom-navbar"></navbarComponent>
        <section class="book_section layout_padding">
            <div class="container">
                <div class="heading_container">
                    <h2>
                        Book A Oyatsu
                    </h2>
                </div>
                <div class="row">
                    <div class="col-md-6" style="border-right: 1px solid #999;padding-right: 30px;">
                        <div class="form_container">
                            <form action="">
                                <div>
                                    <input type="email" class="form-control" placeholder="Your Email"
                                        v-model="forPayload.email" />
                                </div>
                                <div>
                                    <input type="text" class="form-control" placeholder="Your What'sApp Number"
                                        v-model="forPayload.phone" />
                                </div>
                                <div>
                                    <label for="form-control">Flavor :</label>
                                    <select class="form-control nice-select wide select-flavor" id="flavor-select"
                                        style="margin-bottom: 0px !important;" v-model="flavorObj.flavor">
                                        <option :value="data" v-for="(data, index) of listFlavor" :key="index">
                                            {{ data }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label for="form-control">Pack :</label>
                                    <input type="number" class="form-control" v-model="flavorObj.pack"
                                        style="margin-bottom:0px">
                                </div>
                                <div>
                                    <button type="button" class="btn btn-primary"
                                        style="border-radius: 5px;background-color:darkcyan;text-align: left;text-transform: none;padding: 10px 15px"
                                        @click="forList"><span>Submit item</span></button>&nbsp;

                                </div>
                                <div style="padding: 20px 0px">
                                    <q-table :title="`\u00A0 Payment Bill`" :data="listOfFlavor" row-key="id"
                                        hide-pagination :columns="columns">
                                        <template v-slot:top-right>
                                            <button type="button" class="btn btn-primary"
                                                style="border-radius: 5px;background-color:chocolate;text-align: left;text-transform: none;padding:7px 10px; margin-right:5px"
                                                @click="listOfFlavor = []"><span>Reset</span></button>
                                        </template>
                                        <template v-slot:body-cell-price="props">
                                            <q-td :props="props">
                                                {{ formatRupiah(props.value) ? formatRupiah(parseInt(props.value)) : '-' }}
                                            </q-td>
                                        </template>
                                        <template v-slot:body-cell-pack="props">
                                            <q-td :props="props">
                                                <q-badge color="green">
                                                    <q-icon name="add" @click="editValuePack(props.row, true)" />
                                                </q-badge>
                                                <b>&nbsp;{{ props.value }}&nbsp;</b>

                                                <q-badge color="red">
                                                    <q-icon name="remove" @click="editValuePack(props.row, false)" />
                                                </q-badge>

                                            </q-td>
                                        </template>
                                        <template v-slot:bottom-row>
                                            <q-tr>
                                                <q-td colspan="100%" class="text-right text-bold">
                                                    Total: {{formatRupiah(listOfFlavor.reduce((acc, row) => acc +
                                                        (row.price || 0), 0))}}
                                                </q-td>
                                            </q-tr>
                                        </template>
                                    </q-table>
                                </div>
                                <div>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile01" @change="onFileChange">
                                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                        <span>Total nya jadi segini, mohon di transfer dan upload buktinya yaaa !!! <br>
                                            ke Rekening : 12345 a/n
                                            Oyatsu</span>
                                    </div>
                                </div>
                                <div class="btn_box">
                                    <a href="javascript:void(0)" class="btn btn-warning" @click="orderItem" style="color:white;margin-top:5px;border-radius: 5px !important;">
                                        Order Now
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-6" style="padding-left: 30px;">
                        <div class="map_container ">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.179845363276!2d106.953797075784!3d-6.370767093619422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c3f5ad239bef%3A0x3f964a11110d743f!2sWhiley!5e0!3m2!1sen!2sid!4v1757409331451!5m2!1sen!2sid"
                                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footerComponent></footerComponent>
    </div>
</template>

<style scooped>
.custom-navbar {
    background-color: black !important;
}

.select-flavor {
    margin-bottom: 0px !important;
}
</style>

<script>
import axios from "axios";
import footerComponent from './../layouts/component/footer.vue'
import navbarComponent from './../layouts/component/navbar.vue'

export default {
    components: {
        footerComponent,
        navbarComponent
    },
    data() {
        return {
            flavorObj: {
                flavor: '',
                pack: 0
            },
            confirm: false,
            left2: true,
            listFlavor: ['Vanilla', 'Chocolate', 'Cheese'],
            columns: [],
            listOfFlavor: [],
            forPayload: {},
            url: process.env.VUE_APP_API_URL,
            year: 0,
            month: 0

        }
    },
    methods: {
        onFileChange(e, key) {
            this.forPayload.document = e.target.files[0];
        },
        async orderItem() {
            this.forPayload['flavor'] = this.listOfFlavor
            this.forPayload['status'] = 0 
            const formData = new FormData();

            this.forPayload.flavor = JSON.stringify(this.listOfFlavor)

            formData.append("sections", JSON.stringify(this.forPayload));
            if (this.forPayload.document && this.forPayload.document instanceof File) {
                formData.append("images",  this.forPayload.document, `${this.forPayload.document.name}`);
            }
            const url = `${this.url}/order/${this.year}/${this.month}`
            const result = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });

            if(result) {
                this.$q.notify({
                    type: 'positive',
                    message: 'Your Order Has been process'
                })
                this.flavorObj = {}
            }

        },
        editValuePack(obj, condition) {
            this.listOfFlavor = this.listOfFlavor.map(item => {
                if (item.flavor == obj.flavor) {

                    if (condition) item.pack = parseInt(item.pack) + 1;
                    else item.pack = parseInt(item.pack) - 1;

                    item.price = 70000 * parseInt(item.pack)
                }
                return item
            })
        },
        formatRupiah(angka, withPrefix = true) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(angka);
        },
        forList() {
            if (this.flavorObj.pack == 0) {
                this.$q.notify({
                    type: 'negative',
                    message: `Pack Cannot be Empty`
                })
                return
            }

            let condition = false
            if(this.listOfFlavor && this.listOfFlavor.length > 0) {
                condition = this.listOfFlavor.some(item => item.flavor == this.flavorObj.flavor)
            }
            
            this.listOfFlavor = this.listOfFlavor.map(item => {
                if (item.flavor == this.flavorObj.flavor) {
                    item.pack = parseInt(item.pack) + parseInt(this.flavorObj.pack)
                }
                return item
            })
          
            if (condition) return

            console.log($('#flavor-select').val())

            if(!this.flavorObj.flavor) this.flavorObj.flavor = $('#flavor-select').val()
            this.flavorObj.flavor = JSON.parse(JSON.stringify(this.flavorObj.flavor))

            this.listOfFlavor.push(this.flavorObj)
            this.listOfFlavor = this.listOfFlavor.map(item => {
                item['price'] = 70000 * parseInt(item.pack)
                return item
            })
             this.flavorObj = {
                flavor: '',
                pack: 0
            }
            const columnsTable = [
                { name: 'flavor', align: 'center', label: 'Flavor', field: 'flavor', sortable: true },
                { name: 'pack', align: 'center', label: 'Pack', field: 'pack', sortable: true },
                { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
            ]
            this.columns = columnsTable
        }
    },
    mounted() {
        const date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth()
    }
}

</script>