import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import VueHighlightJS from "vue-highlightjs";

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
