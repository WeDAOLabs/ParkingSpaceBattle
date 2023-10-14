<template>
  <div class="index">
    <a-row class="topBar">
      <a-col :offset="1" :span="3">
        <h1>LOGO</h1>
      </a-col>
      <a-col :offset="16" :span="2">
        <a-button v-if="!isLogin" @click="funcLogin">登录</a-button>
        <h3 v-else>address:{{ userAddress }}</h3>
      </a-col>
    </a-row>

    <div v-if="!isLogin">
      <a-divider/>
      <a-row>
        <a-col :offset="5" :span="10">
          <h1>展示游戏大图介绍内容</h1>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row space-between>
        <a-col :span="4">
          <div>车位1</div>
        </a-col>
        <a-col :span="4">
          <div>车位2</div>
        </a-col>
        <a-col :span="4">
          <div>车位3</div>
        </a-col>
        <a-col :span="4">
          <div>车位4</div>
        </a-col>
        <a-col :span="4">
          <div>车位5</div>
        </a-col>

      </a-row>
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount} from "vue";

export default defineComponent({
  name: "Index",
  setup() {
    const isLogin = ref(false);
    const userAddress = ref('0x12345');

    const funcLogin = () => {
      isLogin.value = true;
    };

    return {
      isLogin,
      userAddress,
      funcLogin
    };
  },
});
</script>

<style scoped>
.topBar {
  margin-top: -40px;
}
</style>