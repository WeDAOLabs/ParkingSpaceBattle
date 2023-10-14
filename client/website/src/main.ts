import { createApp } from "vue";
import App from "./App.vue";
// @ts-ignore
import Antd from "ant-design-vue";
import { ethers } from "ethers";
import "ant-design-vue/dist/reset.css";
import { dataModels } from "./data/DataRegister";

const app = createApp(App);

app.use(Antd);

dataModels.forEach((dataModal) => dataModal.init());

app.config.globalProperties.$ethers = ethers;

app.mount("#app");
