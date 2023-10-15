<template>
  <div class="parkingList">
    <a-modal v-model:open="showFreeMintParkingModel" title="Mint Parking affirm" @ok="funcAffirmFreeMintParking"
             :bodyStyle="{ maxHeight: '70vh', overflowY: 'auto' }">
      <p>Mint Parking</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <a-modal v-model:open="showStickerModel" title="Sticker affirm" @ok="funcAffirmSticker">
      <p>贴条...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <a-row justify="space-around">
      <a-col
          :span="4"
          v-for="(item, index) in userParkingStateList"
          :key="index"
      >
        <a-row
            justify="center"
            align="middle"
            class="parking-0"
            v-if="item === 0"
        >
          <a-button @click="funcFreeMintParking(index)">Free Mint</a-button>
        </a-row>
        <a-row
            justify="center"
            align="middle"
            class="parking-1"
            v-if="item === 1"
        >
          <h2>空车位</h2>
        </a-row>
        <a-row
            justify="center"
            align="middle"
            class="parking-2"
            v-if="item === 2"
        >
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

    const userParkingStateIndex = ref(0);
    const showFreeMintParkingModel = ref(false);
    const showStickerModel = ref(false);

    const userParkingStateList = ref([1, 2, 1, 0, 0]); // 0表示未mint 1表示车位空 2表示占用

    const funcFreeMintParking = (index: number) => {
      showFreeMintParkingModel.value = true;
      userParkingStateIndex.value = index;
    };

    const funcSticker = (index: number) => {
      showStickerModel.value = true;
      userParkingStateIndex.value = index;
    };

    const funcAffirmFreeMintParking = () => {
      showFreeMintParkingModel.value = false;
      userParkingStateList.value[userParkingStateIndex.value] = 1;
    };

    const funcAffirmSticker = () => {
      showStickerModel.value = false;
      userParkingStateList.value[userParkingStateIndex.value] = 1;
    };

    return {
      userParkingStateIndex,
      showFreeMintParkingModel,
      showStickerModel,
      userParkingStateList,
      funcFreeMintParking,
      funcSticker,
      funcAffirmFreeMintParking,
      funcAffirmSticker
    };
  },
});
</script>

<style scoped>

.parkingList {
  border: 1px solid #8ce6b0;
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  box-sizing: content-box;
  background-color: #edfff3;
}

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
