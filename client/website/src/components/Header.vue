<template>
    <div>
      <a-row>
        <a-col :offset="1" :span="3">
          <a-image :width="438" :src="require('../assets/logo.jpg')" :preview="false"/>
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

      onBeforeMount(()=>{
    
});
  
      return {
        isLogin,
        userAddress,
        connectWallet
      };
    },
  });

  onBeforeMount(()=>{

  });
  </script>
  
  <style scoped>
  
  </style>