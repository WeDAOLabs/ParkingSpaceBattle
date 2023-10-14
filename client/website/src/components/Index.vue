<template>
  <div class="index">
    <a-row class="top-bar">
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
    <div v-else>
      <a-divider/>
      <a-row justify="space-around">

        <a-col :span="4" v-for="(item, index) in userCarPortStateList" :key="index">
          <a-row justify="center" align="middle" class="carport-0" v-if="item===0">
            <a-button @click="funcFreeMint(index)">Free Mint</a-button>
          </a-row>
          <a-row justify="center" align="middle" class="carport-1" v-if="item===1">
            <h2>空车位</h2>
          </a-row>
          <a-row justify="center" align="middle" class="carport-2" v-if="item===2">
            <a-col :span="24">
              <h3>当前车辆URL: xxx</h3>
            </a-col>
            <a-col :span="24">
              <a-button @click="funcSticker(index)">贴条</a-button>
            </a-col>
            <a-col :span="24">
              <p>预计收益: 123 LLT</p>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount, computed} from "vue";

export default defineComponent({
  name: "Index",
  setup() {
    const isLogin = ref(false);
    const userAddress = ref('0x12345');
    const userCarPortStateList = ref([1, 2, 1, 0, 0]);// 0表示未mint 1表示车位空 2表示占用

    const funcFreeMint = (index) => {
      userCarPortStateList.value[index] = 1;
    };

    const funcSticker = (index) => {
      userCarPortStateList.value[index] = 1;
    };

    const funcLogin = () => {
      isLogin.value = true;
    };

    return {
      isLogin,
      userAddress,
      userCarPortStateList,
      funcLogin,
      funcFreeMint,
      funcSticker
    };
  },
});
</script>

<style scoped>
.top-bar {
  margin-top: -40px;
}

.carport-0 {
  border: 1px solid #8ce6b0;
  border-radius: 0.5rem;
  height: 15rem;
  box-sizing: content-box;
  background-color: #edfff3;
}

.carport-1 {
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  height: 15rem;
  box-sizing: content-box;
  background-color: #f0faff;
}

.carport-2 {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  height: 15rem;
  box-sizing: content-box;
  background-color: #fff9e6;
}

</style>