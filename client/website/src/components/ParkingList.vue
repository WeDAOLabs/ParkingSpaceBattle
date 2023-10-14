<template>
  <div class="parkingList">
    <a-row justify="space-around">
      <a-col :span="4" v-for="(item, index) in userParkingStateList" :key="index">
        <a-row justify="center" align="middle" class="parking-0" v-if="item===0">
          <a-button @click="funcFreeMintParking(index)">Free Mint</a-button>
        </a-row>
        <a-row justify="center" align="middle" class="parking-1" v-if="item===1">
          <h2>空车位</h2>
        </a-row>
        <a-row justify="center" align="middle" class="parking-2" v-if="item===2">
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
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "ParkingList",
  setup() {
    const userParkingStateList = ref([1, 2, 1, 0, 0]);// 0表示未mint 1表示车位空 2表示占用
    const funcFreeMintParking = (index) => {
      userParkingStateList.value[index] = 1;
    };

    const funcSticker = (index) => {
      userParkingStateList.value[index] = 1;
    };

    return {
      userParkingStateList,
      funcFreeMintParking,
      funcSticker
    };
  },
});
</script>

<style scoped>
.parking-0 {
  border: 1px solid #8ce6b0;
  border-radius: 0.5rem;
  height: 20rem;
  box-sizing: content-box;
  background-color: #edfff3;
}

.parking-1 {
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  height: 20rem;
  box-sizing: content-box;
  background-color: #f0faff;
}

.parking-2 {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  height: 20rem;
  box-sizing: content-box;
  background-color: #fff9e6;
}
</style>
