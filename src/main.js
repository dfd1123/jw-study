import Vue from "vue";
import router from "./router";
import App from "./App.vue";
import dialogNmodal from "./plugins/dialogNmodal";

import vueScroll from "vuescroll/dist/vuescroll-native";
import "vuescroll/dist/vuescroll.css";

import ripple from "./directive/ripple";

import "./assets/css/temp.css";

Vue.config.productionTip = false;

Vue.use(dialogNmodal);

Vue.directive("bpripple", ripple);

Vue.use(vueScroll);

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
