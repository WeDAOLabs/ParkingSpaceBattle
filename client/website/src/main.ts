import { createApp } from "vue";
import App from "./App.vue";
// @ts-ignore
import Antd from "ant-design-vue";
import { ethers } from "ethers";
import "ant-design-vue/dist/reset.css";
import { dataModels } from "./data/DataRegister";

const app = createApp(App);
app.use(Antd);
app.config.globalProperties.$ethers = ethers;

const startUp = async () => {
  for (let i = 0; i < dataModels.length; i++) {
    let dataModal = dataModels[i];
    await dataModal.init();
  }

  app.mount("#app");
};

startUp();
