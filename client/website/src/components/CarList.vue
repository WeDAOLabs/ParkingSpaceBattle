<template>
  <div class="carList">
    <a-row justify="space-around">
      <a-col :span="4" v-for="(item, index) in userCarStateList" :key="index">
        <a-row justify="center" align="middle" class="car-0" v-if="item === 0">
          <a-button @click="funcFreeMintCar(index)">Free Mint</a-button>
        </a-row>
        <a-row justify="center" align="middle" class="car-1" v-if="item === 1">
          <a-col :span="24">
            <h2>车辆URL: XXX</h2>
          </a-col>
          <a-col :span="12">
            <a-button>去停车</a-button>
          </a-col>
          <a-col :span="12">
            <a-button>去升级</a-button>
          </a-col>
        </a-row>
        <a-row justify="center" align="middle" class="car-2" v-if="item === 2">
          <a-col :span="24">
            <h2>车辆URL: XXX</h2>
          </a-col>
          <a-col :span="8">
            <a-button>查看</a-button>
          </a-col>
          <a-col :span="16">
            <p>预计收益: 321 LLT</p>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CarList",
  setup() {
    const userCarStateList = ref([2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1]); // 0表示未mint 1表示空闲 2表示停放

    const funcFreeMintCar = (index: any) => {
      userCarStateList.value[index] = 1;
    };

    return {
      userCarStateList,
      funcFreeMintCar,
    };
  },
});
</script>

<style scoped>
.car-0 {
  border: 1px solid #8ce6b0;
  border-radius: 0.5rem;
  height: 8rem;
  box-sizing: content-box;
  background-color: #edfff3;
}

.car-1 {
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  height: 8rem;
  box-sizing: content-box;
  background-color: #f0faff;
}

.car-2 {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  height: 8rem;
  box-sizing: content-box;
  background-color: #fff9e6;
}
</style>
