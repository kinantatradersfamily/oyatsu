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
                    <div class="col-md-6">
                        <div class="form_container">
                            <div>
                                <input type="email" class="form-control" placeholder="Your Email"
                                    v-model="forPayload.email" />
                            </div>
                            <div>
                                <input type="number" class="form-control" placeholder="Your What'sApp Number"
                                    v-model="forPayload.phone" />
                            </div>
                        </div>
                        <div style="margin-bottom: 15px;">
                        <q-table :title="`\u00A0 Menu`" :data="mixFlavor" :columns="columnFlavor" row-key="id"  dense
                            hide-pagination>
                            <template v-slot:body-cell-pcs="props">
                                <q-td :props="props">
                                    <q-badge color="green">
                                        <q-icon name="add" @click="editMixValue(props.row, true)" />
                                    </q-badge>
                                    <b>&nbsp;{{ props.value }}&nbsp;</b>

                                    <q-badge color="red" v-if="props.value >= 1">
                                        <q-icon name="remove" @click="editMixValue(props.row, false)" />
                                    </q-badge>

                                </q-td>
                                </template>
                                <template v-slot:body-cell-action="props">
                                    <q-td :props="props">
                                        <a href="javascript:void(0)" class="btn btn-success" style="padding: 1px 10px; font-size: 10px;" @click="allPcs(props.row, true)">Add All</a>
                                        <a href="javascript:void(0)" class="btn btn-danger" style="padding: 1px 10px; font-size: 10px;margin-left: 10px;" @click="allPcs(props.row, false)">Delete All</a>
                                    </q-td>
                                </template>
                            </q-table>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <a href="javascript:void(0)" type="button" class="btn btn-primary"
                                style="border-radius: 5px;background-color:darkcyan;text-align: left;text-transform: none;padding: 5px 10px"
                                @click="forMix"><span>Submit</span></a>&nbsp;
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div style="padding: 0px 0px">
                                    <q-table :title="`\u00A0 Payment Bill`" :data="listOfFlavor" row-key="id"  dense   no-data-label="I didn't find anything for you"
      no-results-label="The filter didn't uncover any results"
                                        hide-pagination :columns="columns">
                                        <template v-slot:top-right>
                                            <span type="button"  href="javascript:void(0)" style="margin-right: 10px;text-decoration: underline;color:cadetblue"
                                                @click="listOfFlavor = []">Reset</span>
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

                                                <q-badge color="red" v-if="props.value >= 2">
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
                                         <template v-slot:no-data="{ icon, message, filter }">
                                            <div class="full-width row flex-center text-accent q-gutter-sm">
                                            <q-icon size="2em" name="sentiment_dissatisfied" />
                                            <span>
                                                Well this is sad... {{ message }}
                                            </span>
                                            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                                            </div>
                                        </template>
                                    </q-table>
                                </div>
                                <div>
                                    <div class="custom-file" style="margin-top: 20px;">
                                        <input type="file" class="custom-file-input" id="inputGroupFile01" @change="onFileChange">
                                        <label class="custom-file-label" for="inputGroupFile01">{{fileLabel}}</label>
                                    </div>
                                </div>
                                 <div class="callout callout-info" style="margin-top: 10px; margin-bottom: 30px;" v-if="listOfFlavor.length > 0">
                                            <span style="color: #2A4759">Total nya jadi segini, mohon di transfer dan upload buktinya yaaa !!!
                                            ke Rekening : 12345 a/n
                                            Oyatsu</span>
                                        </div>
                                <div class="btn_box">
                                    <a href="javascript:void(0)" class="btn btn-warning" @click="orderItem" style="color:white;margin-top:5px;border-radius: 5px !important;">
                                        Order Now
                                    </a>
                                </div>
                        <!-- <div class="map_container ">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.179845363276!2d106.953797075784!3d-6.370767093619422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c3f5ad239bef%3A0x3f964a11110d743f!2sWhiley!5e0!3m2!1sen!2sid!4v1757409331451!5m2!1sen!2sid"
                                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div> -->
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

            contentFlavor: 0,

            confirm: false,
            left2: true,

            listFlavor: ['Vanilla', 'Chocolate', 'Cheese', 'Mix'],
            columns: [],
            listOfFlavor: [],
            mixFlavor: [
                {
                    flavor: 'Creamcheese', pcs: 0, action: ''
                },
                 {
                    flavor: 'Cookies and Cream', pcs: 0, action: ''
                },
                 {
                    flavor: 'Chocolate', pcs: 0, action: ''
                },
                 {
                    flavor: 'Lemon Curd', pcs: 0, action: ''
                },
                 {
                    flavor: 'Lemongrass Yoghurt', pcs: 0, action: ''
                },
                 {
                    flavor: 'Vanilla', pcs: 0, action: ''
                },
                 {
                    flavor: 'Kolak', pcs: 0, action: ''
                },
            ],
            columnFlavor: [
                { name: 'flavor', align: 'center', label: 'Flavor', field: 'flavor', sortable: true },
                { name: 'pcs', align: 'center', label: 'Pcs', field: 'pcs', sortable: true },
                { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true },
            ],

            forPayload: {},

            url: process.env.VUE_APP_API_URL,
            main_price: process.env.OYATSU_PRICE,

            year: 0,
            month: 0,
            fileLabel: 'Choose file'

        }
    },
    methods: {
        allPcs(props, condition) {

            if(condition) {
                this.maxFlavor = this.mixFlavor.map(item => {
                    if(item.flavor == props.flavor) {
                        item.pcs = 7
                    }
    
                    return item
                })

                return
            }

            this.maxFlavor = this.mixFlavor.map(item => {
                if(item.flavor == props.flavor) {
                    item.pcs = 0
                }
            })

        },
        forMix() {
            const data = this.mixFlavor.map(item => item.pcs).reduce((a,b) => a+b)
            if(data < 7) return this.$q.notify({type: 'negative', message: 'item kamu ada yang kurang tuh, total harus berjumlah 7 ya'})
            if(data > 7) return this.$q.notify({type: 'negative', message: 'item kamu ada yang lebih tuh, total harus berjumlah 7 ya'})

            let condition = false
            let tempFlavor = ''

            let mix = 'Mix( '
            this.mixFlavor.forEach(item => {
                if(item.pcs == 7) {
                    tempFlavor = item.flavor
                    condition = true
                } else {
                    if(item.pcs > 0) {
                        mix += `${item.flavor} ${item.pcs}pcs | `
                    }
                }
            })
            mix += ' )'

           this.flavorObj.flavor = condition ? tempFlavor : mix  
           this.flavorObj.pack = 1

           this.listOfFlavor.push(this.flavorObj)
            this.listOfFlavor = this.listOfFlavor.map(item => {
                item['price'] = this.main_price * parseInt(item.pack)
                return item
            })
            const columnsTable = [
                { name: 'flavor', align: 'center', label: 'Flavor', field: 'flavor', sortable: true },
                { name: 'pack', align: 'center', label: 'Pack', field: 'pack', sortable: true },
                { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
            ]
            this.columns = columnsTable
            
            this.flavorObj = {
                flavor: '',
                pack: 0
            }


        },
        editMixValue(data, condition) {
            this.mixFlavor = this.mixFlavor.map(item => {
                if(item.flavor == data.flavor) {
                    if(condition)item.pcs++;
                    else --item.pcs;
                }
                return item
            })
        },
        onFileChange(e, key) {
            this.forPayload.document = e.target.files[0];
            this.fileLabel = e.target.files[0] ? e.target.files[0].name: 'image error';
        },
        async orderItem() {
            this.$q.loading.show()
            if(!this.forPayload.email) { 
                this.$q.loading.hide()
                return this.$q.notify({type: 'negative', message: 'Email kamu kosong, check lagi ya'})
            }
            if(!this.forPayload.phone) {
                this.$q.loading.hide()
                return this.$q.notify({type: 'negative', message: 'Nomor whatsapp kamu kosong, check lagi ya'})
            }
            if(this.listOfFlavor.length == 0) {
                this.$q.loading.hide()
                return this.$q.notify({type: 'negative', message: 'Orderan mu kosong, check lagi ya'})
            }

            if(!this.forPayload.document) {
                this.$q.loading.hide()
                return this.$q.notify({type: 'negative', message: 'Kamu belum upload bukti TF yaaa'})
            }


            this.forPayload['flavor'] = this.listOfFlavor
            this.forPayload['status'] = 0 
            const formData = new FormData();

            try{
                this.forPayload.flavor = JSON.stringify(this.listOfFlavor)
                formData.append("sections", JSON.stringify(this.forPayload));

                if (this.forPayload.document && this.forPayload.document instanceof File) {
                    formData.append("images",  this.forPayload.document, `${this.forPayload.document.name}`);
                }
                const url = `${this.url}/order/${this.year}/${this.month}`
                const result = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });

                if(result) {
                    this.$q.loading.hide()

                    this.$q.notify({
                        type: 'positive',
                        message: 'Your Order Has been process'
                    })
                    this.forPayload = {}
                    this.listOfFlavor = []
                    this.flavorObj = {}
                    this.fileLabel = ''
                    this.contentFlavor = 0
                    this.mixFlavor = [
                        {
                            flavor: 'Vanilla', pcs: 0
                        },
                        {
                            flavor: 'Chocolate', pcs: 0
                        },
                        {
                            flavor: 'Cheese', pcs: 0
                        },
                    ]
                } else {
                    this.$q.loading.hide()
                }
            } catch(err) {
                this.$q.loading.hide()
                this.$q.notify({
                    type: 'negative',
                    message: `${err}`
                })
            }
        },
        editValuePack(obj, condition) {
            this.listOfFlavor = this.listOfFlavor.map(item => {
                if (item.flavor == obj.flavor) {

                    if (condition) item.pack = parseInt(item.pack) + 1;
                    else item.pack = parseInt(item.pack) - 1;

                    item.price = this.main_price * parseInt(item.pack)
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
    },
    mounted() {
        const date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth()
    }
}

</script>