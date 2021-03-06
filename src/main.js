import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false;

// Font Awesome settings
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope, faUser, faKey)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Firebase config and app start
let app = '';

const config = {
  apiKey: process.env.VUE_APP_FB_APIKEY,
  authDomain: process.env.VUE_APP_FB_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASEURL,
  projectId: process.env.VUE_APP_FB_PROJECTID,
  storageBucket: process.env.VUE_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGINGSENDERID
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});
