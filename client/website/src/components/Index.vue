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
      <ParkingList/>
      <a-divider/>
      <CarList/>

    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount, computed} from "vue";
import ParkingList from "@/components/ParkingList.vue";
import CarList from "@/components/CarList.vue";

export default defineComponent({
  name: "Index",

  components: {ParkingList, CarList},
  setup() {
    const isLogin = ref(false);
    const userAddress = ref('0x12345');

    const showSkin = ref(false);


    const funcLogin = () => {
      isLogin.value = true;
    };

    // async function someAsyncOperation() {
    //   return new Promise((resolve, reject) => {
    //     // 模拟异步操作，比如网络请求
    //     setTimeout(() => {
    //       // 模拟操作成功，将结果返回
    //       resolve('操作成功！');
    //
    //       // 如果出现错误，可以使用 reject
    //       // reject('操作失败！');
    //     }, 2000);
    //   });
    // }
    //
    // async function funcLogin() {
    //   isLogin.value = true;
    //
    //   try {
    //     // 异步操作，比如网络请求、文件读取等
    //     showSkin.value = true;
    //     const result = await someAsyncOperation();
    //     console.log('操作结果:', result);
    //     showSkin.value = false;
    //   } catch (error) {
    //     console.error('发生错误:', error);
    //     showSkin.value = false;
    //   }
    // }

    // const funcLogin = async () => {
    //   try {
    //     showSkin.value = true;
    //     const result = await someAsyncOperation();
    //     console.log('操作结果:', result);
    //     showSkin.value = false;
    //     isLogin.value = true;
    //   } catch (error) {
    //     console.error('发生错误:', error);
    //   }
    // };
    //
    // const someAsyncOperation = async () => {
    //   return new Promise((resolve, reject) => {
    //     // 模拟异步操作，比如网络请求
    //     setTimeout(() => {
    //       // 模拟操作成功，将结果返回
    //       resolve('操作成功！');
    //
    //       // 如果出现错误，可以使用 reject
    //       // reject('操作失败！');
    //     }, 2000);
    //   });
    // };


    return {
      isLogin,
      userAddress,
      funcLogin
    };
  },
});
</script>

<style scoped>
.top-bar {
  margin-top: -40px;
}


</style>