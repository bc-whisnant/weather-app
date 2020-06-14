import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
});

Vue.config.productionTip = false

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
