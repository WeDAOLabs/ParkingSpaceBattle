<template>
  <div class="header">
    <a-row>
      <a-col :offset="1" :span="3">
        <a-image class="logo" :src="require('../assets/logo.jpg')" :preview="false"/>
      </a-col>
      <a-col :offset="16" :span="2">
        <a-button v-if="!isLogin" @click="connectWallet">Sign In</a-button>
        <h3 v-else>address:{{ userAddress }}</h3>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount} from "vue";
import {walletData} from '../data/WalletData';

export default defineComponent({
  name: "Header",

  components: {},
  setup() {
    const isLogin = ref(walletData.isAuth);
    const userAddress = ref('0x12345');

    const connectWallet = async () => {
      await walletData.signIn();
      isLogin.value = walletData.isAuth;
    };

    onBeforeMount(() => {

    });

    return {
      isLogin,
      userAddress,
      connectWallet
    };
  },
});

onBeforeMount(() => {

});
</script>

<style scoped>

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #c9c9c9; /* 页眉的背景颜色 */
  padding: 10px 0; /* 页眉的内边距 */
  text-align: center;
  z-index: 100; /* 控制页眉的层叠顺序 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 为页眉添加阴影效果 */
}

.logo {
  width: 50%;
  height: 50%;
}
</style>