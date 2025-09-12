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
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer>
      <q-page-container v-if="content == 'order'">
        <q-table :data="tableOrder">
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <a href="javascript:void(0)" @click="editStatus(props.row, false)"> 
                Update
              </a>
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
          <div class="text-h6">Medium</div>
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
export default {
  data() {
    return {
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
      currentMonth: new Date(),

      
      drawer: false,
      medium: false,
      condition: false,
      medium_second: false,
      url: process.env.VUE_APP_API_URL,
      
      year: 2025,
      month: 0,
      statusOrder: 0,
      
      content: '',
      
      bulan: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      list: [],
      table: [],
      listOrder: [],
      tableOrder: [],
      

      editValue: {},
      editValueStatus: {},

    }
  },
  methods: {
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
      } else {
        this.month = item
        this.tableOrder = this.listOrder[this.year][item] || []
        if(this.tableOrder.length > 0) {
          this.tableOrder = this.tableOrder.map(item => {
            item.action = ''
            return item
          })

          console.log(this.tableOrder)
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