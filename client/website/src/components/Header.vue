<template>
    <div class="index">
      <a-row class="top-bar">
        <a-col :offset="1" :span="3">
          <a-row><h1>LOGO</h1></a-row>>
        </a-col>
        <a-col :offset="16" :span="2">
            <a-button v-if="!isLogin" @click="funcLogin">登录</a-button>
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
  
      const funcLogin = async () => {
        await walletData.signIn();
        isLogin.value = walletData.isAuth;
      };

      onBeforeMount(()=>{
    
});
  
      return {
        isLogin,
        userAddress,
        funcLogin
      };
    },
  });

  onBeforeMount(()=>{

  });
  </script>
  
  <style scoped>
  
  </style>