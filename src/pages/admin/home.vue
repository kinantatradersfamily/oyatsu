<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" container style="height: 300px" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8" style="padding:0px 10px">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>
      <q-drawer v-model="drawer" show-if-above :width="200" :height="1000" :breakpoint="400">
        <q-scroll-area style="height: 100vh; margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding style="padding: 0px 10px;">
            <q-expansion-item icon="folder" :label="`Content`" expand-separator>
              <q-item v-ripple>
                <q-list padding style="padding: 0px 10px;">
                  <q-expansion-item icon="folder" :label="`${year}`" expand-separator>
                    <q-item v-ripple v-for="(item, index) in bulan" :key="index">
                      <q-item-section avatar>
                        <q-icon name="folder" />
                      </q-item-section>
                      <q-item-section @click="openTable(index, 'content')">
                        {{ item }}
                      </q-item-section>
                    </q-item>
                  </q-expansion-item>
                </q-list>
              </q-item>
            </q-expansion-item>
          </q-list>
          <q-list padding style="padding: 0px 10px;">
            <q-expansion-item icon="folder" :label="`Order`" expand-separator>
              <q-item v-ripple>
                <q-list padding style="padding: 0px 10px;">
                  <q-expansion-item icon="folder" :label="`${year}`" expand-separator>
                    <q-item v-ripple v-for="(item, index) in bulan" :key="index">
                      <q-item-section avatar>
                        <q-icon name="folder" />
                      </q-item-section>
                      <q-item-section @click="openTable(index, 'order')">
                        {{ item }}
                      </q-item-section>
                    </q-item>
                  </q-expansion-item>
                </q-list>
              </q-item>
            </q-expansion-item>
            <q-expansion-item icon="folder" :label="`Grafik`" expand-separator>
               <q-item v-ripple v-for="(data, index) of listOrder" :key="index">
                <q-item-section avatar>
                    <q-icon name="folder" />
                  </q-item-section>
                  <q-item-section @click="openTable(index, 'grafik')">
                    {{ index }}
                  </q-item-section>
               </q-item>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Oyatsu Admin</div>
            <div>@oyatsu</div>
          </div>
        </q-img>
      </q-drawer>
      <q-page-container v-if="content == 'grafik'">
        <div class="filter-grafik" style="padding: 20px;">
          <a href="javascript:void(0)" class="btn btn-primary" v-for="data in 12" :key="data" style="margin-right: 10px;" @click="dataFilterChart(data)">
             {{ bulan[data-1] }}
           </a>
        </div>
        <div class="q-pa-md">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </q-page-container>
      <q-page-container v-else-if="content == 'order'">
        <q-table :data="tableOrder" :rows-per-page-options="[0]"  class="my-sticky-virtscroll-table" virtual-scroll :pagination.sync="pagination" :virtual-scroll-sticky-size-start="48">
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <a href="javascript:void(0)" @click="editStatus(props.row, false)" class="btn btn-warning" v-if="props.row.status != 2"> 
                Update
              </a>
              <span v-else><a href="javascript:void(0)" disabled class="btn btn-primary" style="margin-left: 10px;">Update</a></span>
              <a v-if="props.row.status == 2 && (props.row.activated == undefined || props.row.activated == null )" href="javascript:void(0)" @click="editActivated(props.row, false)" class="btn btn-success" style="margin-left: 10px;"> 
                Activatied
              </a>
              <span v-else><a href="javascript:void(0)" disabled class="btn btn-primary" style="margin-left: 10px;">Activated</a></span>
            </q-td>
          </template>
           <template v-slot:body-cell-document="props">
            <q-td :props="props">
              <a :href="`${url}` + props.value" target="_blank"> {{ props.value }}</a>
            </q-td>
          </template>
          <template v-slot:body-cell-flavor="props">
            <q-td :props="props">
              <ul>
                <li v-for="(data, index) of JSON.parse(props.value)" :key="index">{{ data.flavor }} - {{ data.pack }}pcs - Rp{{ data.price }}</li>
              </ul>
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              {{ changeFormatStatus(props.value) }}
            </q-td>
          </template>
          <template v-slot:body-cell-created_at="props">
            <q-td :props="props">
              {{ moment(props.value).format('YYYY-MM-DD HH:mm:ss') }}
            </q-td>
          </template>
          <template v-slot:body-cell-updated_at="props">
            <q-td :props="props">
              {{ moment(props.value).format('YYYY-MM-DD HH:mm:ss') }}
            </q-td>
          </template>
        </q-table>
      </q-page-container>
      <q-page-container v-else>
        <div>
          <span>
            &nbsp; {{ year }} - {{ this.bulan[month] }}
          </span>
        </div>
        <div v-for="(value, key) in table" :key="key">
          <q-table :title="key" :data="value" row-key="name" no-data-label="I didn't find anything for you"
            :rows-per-page-options="[25, 50, 100]" hide-pagination>
            <template v-slot:top-right v-if="month >= currentMonth.getMonth()">
              <button class="btn btn-warning" @click="addRow(key)">
                Add Row
              </button>
            </template>
            <template v-slot:body-cell-image="props">
              <q-td :props="props">
                {{ props.value }}
              </q-td>
            </template>
            <template v-slot:body-cell="props">
              <q-td :props="props">
                {{ props.value ? props.value : '-' }}
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <button class="btn btn-success" @click="editRow(props.row, key)" v-if="month >= currentMonth.getMonth()">Edit</button>
                <span v-else>-</span>
              </q-td>
            </template>
          </q-table>
          <br>
          <br>
        </div>
      </q-page-container>
    </q-layout>

    <q-dialog
      v-model="medium_second"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Update Order</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <select name="" id="" v-model="statusOrder" class="form-control">
            <option value="0">proses</option>
            <option value="1">dianter</option>
            <option value="2">selesai</option>
          </select>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup @click="editStatus(null, true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="activatedOrderModal"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Updated Activated</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <select name="" id="" v-model="activatedOrder" class="form-control">
            <option value="false">Non-active</option>
            <option value="true">Active</option>
          </select>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup @click="editActivated(null, true)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw;">
        <div v-for="(isActive, key) in section" :key="key" >
          <div v-if="isActive" style="padding-top: 10px;">
            <div class="input-group mb-3" style="padding: 0px 10px;">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">title</span>
              </div>
              <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" v-model="sectionValue[key].title">
            </div>
            <div class="input-group mb-3" style="padding: 0px 10px;">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">desc</span>
              </div>
              <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" v-model="sectionValue[key].desc">
            </div>
            <div class="input-group mb-3" style="padding: 0px 10px;" v-if="section.tiga">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">price</span>
              </div>
              <input type="number" class="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" v-model="sectionValue[key].price">
            </div>
            <div class="input-group mb-3" style="padding: 0px 10px;" v-if="!section.satu">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="inputGroupFile01" @change="onFileChange($event, key)">
                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
              </div>
            </div>
            <hr>
          </div>
        </div>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Add" v-close-popup @click="create" v-if="condition"/>
          <q-btn flat label="Edit" v-close-popup @click="editSubmit" v-else/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment'
import Chart from "chart.js/auto";

export default {
  
  data() {
    return {
      moment,
      sectionValue: {
        satu: { section: 'section_1', title: '', desc: '', price: '', image: null },
        dua: { section: 'section_2', title: '', desc: '', price: '', image: null },
        tiga: { section: 'section_3', title: '', desc: '', price: '', image: null },
        empat: { section: 'section_4', title: '', desc: '', price: '', image: null }
      },
      dummySection: {
        section_1 :[],
        section_2 :[],
        section_3 :[],
        section_4 :[],
      },
      section: {
        satu: false,
        dua: false,
        tiga: false,
        empat: false
      },

      pagination: {
        rowsPerPage: 0
      },

      currentMonth: new Date(),

      
      drawer: false,
      medium: false,
      condition: false,
      medium_second: false,
      activatedOrder: 0,
      activatedOrderModal: false,

      myChart:null,

      url: process.env.VUE_APP_API_URL,
      
      year: 0,
      month: 0,
      statusOrder: 0,
      
      content: '',
      
      bulan: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      list: [],
      table: [],
      listOrder: [],
      tableOrder: [],

      grafikOrderArr: {},
      editValue: {},
      editValueStatus: {},

    }
  },
  methods: {
    dataFilterChart(data) {
      if(data == 'all') {
        this.grafikOrderArr.data = []

        for(const[key, value] of Object.entries(this.listOrder)) {
          for(const[key1, value1] of Object.entries(value)) {
            value1.forEach(item => {
              const data = JSON.parse(item.flavor).map(item => parseInt(item.pack)).reduce((a,b) => a + b)
              this.grafikOrderArr.data.push(data)
            })
          }
        }
        this.declareChart()
        return
      }

      const obj = this.listOrder[this.year]
      if(obj[data-1]) {
        this.grafikOrderArr.data = []
        this.grafikOrderArr.label = []

        obj[data-1].forEach(item => {
          const data = JSON.parse(item.flavor).map(item => parseInt(item.pack)).reduce((a,b) => a + b)
          this.grafikOrderArr.data.push(data)
        })
        const grafik = obj[data-1].map(item => moment(item.created_at).unix())
        this.grafikOrderArr.label.push(...grafik)
        this.declareChart()
      }
    },
    declareChart() {
      this.$nextTick(() => {
        if (this.myChart) {
          this.myChart.destroy();
        }

        const ctx = this.$refs.chartCanvas.getContext("2d");
        this.myChart = new Chart(ctx, {
          type: "line", 
          data: {
            labels: this.grafikOrderArr.label,
            datasets: [
              {
                label: "Order'an",
                data: this.grafikOrderArr.data,
              },
            ],
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
              x: {
                grid: {
                  display: false 
                },
                ticks: {
                  maxTicksLimit: 3,
                  callback: (value, index, ticks) => {
                    return moment(this.grafikOrderArr.label[index] * 1000).format('LL');
                  },
                }
              },
              y: {
                ticks: {
                  maxTicksLimit: 4
                },
                grid: {
                  display: false
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  title: (tooltipItems) => {
                    const data = tooltipItems[0]
                    return moment(data.label * 1000).format('YYYY-MM-DD HH:mm:ss');
                  },
                  label: (tooltipItem) => {
                    return `Jumlah: ${tooltipItem.parsed.y}`;
                  }
                }
              }
            }
          },
        });
      })
    
    },
   async editActivated(props, condition) {
      if(!condition) {
        this.activatedOrderModal = true;
        this.editValueStatus.id = props.id
        this.activatedOrder = props.activated
        return
      }
      try {
        const result = await axios.put(`${this.url}/order/${this.editValueStatus.id}/activated`, {
          activated: this.activatedOrder
        });
  
        if(result.data) {
          this.$q.notify({
            type: `positive`,
            message: `Orderan Berhasil di update`
          })
        }
      } catch(err) {
        this.$q.notify({
            type: `negative`,
            message: `${err.response.data.message}`
          })
      }
    },
    changeFormatStatus(data) {
        if(data == 0) return 'Proses'
        else if(data == 1) return 'Dianter'
        else return 'Selesai'
    },
    async editStatus(props, condition) {

      if(!condition) {
        this.medium_second = true;
        this.editValueStatus.id = props.id
        this.statusOrder = props.status
        return
      }
      try {
        const result = await axios.put(`${this.url}/order/${this.editValueStatus.id}`, {
          status: this.statusOrder
        });
  
        if(result.data) {
          this.$q.notify({
            type: `positive`,
            message: `Orderan Berhasil di update`
          })
        }
      } catch(err) {
        this.$q.notify({
            type: `negative`,
            message: `${err.response.data.message}`
          })
      }
    },
    editRow(props, value) {
      this.condition = false;
      let numb = value.match(/\d/g);
      numb = numb.join("");

      const data = props
      let obj = {}
      for(const [key, value] of Object.entries(data)) {
        if(value) {
          obj[key] = value 
        }
      }

      this.medium = true
      Object.keys(this.section).forEach(key => {
        this.section[key] = false;
      });

      const datax = {
        1: 'satu',
        2: 'dua',
        3: 'tiga',
        4: 'empat'
      };

      this.sectionValue[datax[numb]] = JSON.parse(JSON.stringify(obj))
      this.editValue = this.sectionValue[datax[numb]]
      this.editValue['section'] = value
      this.section[datax[numb]] = true;
    },
    async editSubmit() {
      try{
      const formData = new FormData();
      formData.append("title", this.editValue.title);
      formData.append("desc", this.editValue.desc);
      formData.append("section", this.editValue.section);

      if (this.editValue.image instanceof File) {
        formData.append(
          "images",this.editValue.image,`${this.editValue.section}_${this.editValue.image.name}`
        );
      }

      const result = await axios.put(`${this.url}/component/${this.editValue.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

        if(result.data.id) {
          this.$q.notify({
            type: 'positive',
            message: 'Success Update Data'
          })
        }
      } catch(err) {
        this.$q.notify({
          type: 'negative',
          message: `Failed to Update because ${err}`
        })
      }
    },
    addRow(value){
      this.condition = true;

     this.sectionValue = {
        satu: { section: 'section_1', title: '', desc: '', price: '', image: null },
        dua: { section: 'section_2', title: '', desc: '', price: '', image: null },
        tiga: { section: 'section_3', title: '', desc: '', price: '', image: null },
        empat: { section: 'section_4', title: '', desc: '', price: '', image: null }
      }
      let numb = value.match(/\d/g);
      numb = numb.join("");

      const data = {
        1: 'satu',
        2: 'dua',
        3: 'tiga',
        4: 'empat'
      };

      Object.keys(this.section).forEach(key => {
        this.section[key] = false;
      });

      this.section[data[numb]] = true;
      this.medium = true;
    },
    onFileChange(e, key) {
      this.sectionValue[key].image = e.target.files[0];
    },
    async create() {
      const formData = new FormData();
      const sections = Object.values(this.sectionValue)
        .filter(item => item.title || item.desc || item.price || item.image)
        .map(item => ({
          section: item.section,
          title: item.title || null,
          desc: item.desc || null,
          price: item.price || null,
          image: item.image ? null : null
        }));
        

      formData.append("sections", JSON.stringify(sections));
        Object.values(this.sectionValue).forEach((item, idx) => {
          if (item.image && item.image instanceof File) {
            formData.append("images", item.image, `${item.section}_${item.image.name}`);
          }
        });

      const url = `${this.url}/component/${this.year}/${this.month}`
      const result = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });

      if(result.data.success) {
          this.$q.notify({
            type: 'positive',
            message: 'Success Update Data'
          })
        } else {
          this.$q.notify({
            type: 'negative',
            message: `Failed Update Data because ${success.message}`
          })
        }
    },
    openTable(item, content) {
      this.content = content
      if(content == 'content') {
        this.month = item
        this.table = this.list[this.year][item] || this.dummySection
        if (Object.keys(this.table).length) {
          for (const [key, value] of Object.entries(this.table)) {
            if (this.table[key].length > 0) {
              this.table[key].forEach(item => {
                item.action = '';
              })
            }
          }
        }
      } else if(content == 'grafik') {
        this.dataFilterChart('all') 
      } else {
        this.month = item
        this.tableOrder = this.listOrder[this.year][item] || []
        if(this.tableOrder.length > 0) {
          this.tableOrder = this.tableOrder.map(item => {
            item.action = ''
            return item
          })
        }
      }
    },
    async getEvents() {
      try {
        const res = await axios.get(`${this.url}/component/${this.year}`)
        this.list = res.data.message;
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: `Failed to Update because ${err}`
        })
      }
    },
    async getEventsOrder() {
      try {
        const res = await axios.get(`${this.url}/order/${this.year}`)
        if(res && res.data) {
          this.listOrder = res.data.message
        }
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: `Failed to Update because ${err}`
        })
      }
    }
  },
  mounted() {
    const date = new Date()
    this.year = date.getFullYear()
    
    this.getEvents()
    this.getEventsOrder()
  }
}
</script>

<style scooped>
.q-layout-container.overflow-hidden.shadow-2.rounded-borders {
  height: 100vh !important;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

.q-table__container.q-table--horizontal-separator.column.no-wrap.q-table__card.q-table--no-wrap {
  padding: 10px;
}
</style>