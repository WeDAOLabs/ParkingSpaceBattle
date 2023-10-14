import { createApp } from "vue";
import App from "./App.vue";
// @ts-ignore
import Antd from "ant-design-vue";
import { ethers } from "ethers";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);

app.use(Antd);

app.config.globalProperties.$ethers = ethers;

app.mount("#app");
