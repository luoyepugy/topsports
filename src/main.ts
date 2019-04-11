import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import iView from "iview";

import "@/styles/index.less";

Vue.config.productionTip = false;

Vue.use(iView);

new Vue({
  render: h => h(App)
}).$mount("#app");
