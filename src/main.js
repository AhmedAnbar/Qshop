import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './quasar'
import Swal from 'sweetalert2'
import { fb } from './firebase'
import VueFirestore from 'vue-firestore'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.config.productionTip = false

window.Fire = new Vue()


window.Swal = Swal


let app = ''

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')    
  }
});



