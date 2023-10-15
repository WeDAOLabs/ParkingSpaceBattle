<template>
  <div class="parkingList">

    <div class="background-div"></div>

    <a-modal v-model:open="showFreeMintParkingModel" title="Mint Parking affirm" @ok="funcAffirmFreeMintParking">
      <p>Mint Parking</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <a-modal v-model:open="showStickerModel" title="Sticker affirm" @ok="funcAffirmSticker">
      <p>贴条...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <a-modal v-model:open="showChooseCarModel" title="Choose car" @ok="funcAffirmRobParking">
      <p>Choose Car...</p>
      <a-col :span="24" class="choose-car-margin">
        <a-button type="primary">Car1</a-button>
      </a-col>
      <a-col :span="24" class="choose-car-margin">
        <a-button>Car2</a-button>
      </a-col>
      <a-col :span="24" class="choose-car-margin">
        <a-button>Car3</a-button>
      </a-col>
    </a-modal>

    <a-modal v-model:open="showLeaveModel " title="Leave affirm" @ok="funcAffirmLeave">
      <p>Leave affirm...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <div class="user-home" v-if="isUserHome">
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
              <a-row justify="center" align="middle">
                <a-image
                    :src="require('../assets/car.jpg')"
                    :preview="false"
                />
              </a-row>
            </a-col>
            <a-col :span="18" class="parking-info">
              <a-row>
                <a-col :span="24">
                  <h3>当前车辆ID: xxx</h3>
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
        </a-col>
      </a-row>
    </div>

    <div class="friend-Home" v-else>
      <a-row justify="space-around">
        <a-col :span="4" v-for="(item, index) in userParkingStateList" :key="index">
          <a-row justify="center" align="middle" class="parking-0" v-if="item === 0">
            <h2>未铸造</h2>
          </a-row>
          <a-row justify="center" align="middle" class="parking-1" v-if="item === 1">
            <a-col :span="24">
              <h2>空车位</h2>
            </a-col>
            <a-col :span="24">
              <a-button @click="funcRobParking(index)">抢车位</a-button>
            </a-col>
          </a-row>
          <a-row justify="center" align="middle" class="parking-2" v-if="item === 2">
            <a-col :span="24">
              <a-row justify="center" align="middle">
                <a-image
                    :src="require('../assets/car.jpg')"
                    :preview="false"
                />
              </a-row>
              <h3>当前车辆ID: xxx</h3>
            </a-col>
            <a-col :span="24">
              <h3>Owner URL: xxx</h3>
            </a-col>
          </a-row>
          <a-row justify="center" align="middle" class="parking-3" v-if="item === 3">
            <a-col :span="24">
              <a-row justify="center" align="middle">
                <a-image
                    :src="require('../assets/car.jpg')"
                    :preview="false"
                />
              </a-row>
              <h3>当前车辆ID: xxx</h3>
            </a-col>
            <a-col :span="24">
              <a-button @click="funcLeave(index)">离开</a-button>
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
import { defineComponent, ref, onBeforeMount, onUnmounted } from "vue";
import { EventBus } from "../plugins/EventBus";
import { GameEventGoFriendHome } from "../events/GameEventGoFriendHome";
import { GO_HOME } from "../const/Constants";

export default defineComponent({
  name: "ParkingList",

  setup() {
    onBeforeMount(() => {
      EventBus.instance.on(GameEventGoFriendHome.event, onPageRefresh);
    });

    onUnmounted(() => {
      EventBus.instance.off(GameEventGoFriendHome.event, onPageRefresh);
    });

    const onPageRefresh = (address: any) => {
      if (address === GO_HOME) {
        isUserHome.value = true;
      } else {
        isUserHome.value = false;
      }
    };

    const isUserHome = ref(true);
    const userParkingStateIndex = ref(0);
    const showFreeMintParkingModel = ref(false);
    const showStickerModel = ref(false);
    const showChooseCarModel = ref(false);
    const showLeaveModel = ref(false);

    const userParkingStateList = ref([1, 2, 1, 3, 0]); // 0表示未mint 1表示车位空 2表示他人占用 3表示自己占用(3仅出现在朋友的车库)

    const funcFreeMintParking = (index: number) => {
      showFreeMintParkingModel.value = true;
      userParkingStateIndex.value = index;
    };

    const funcSticker = (index: number) => {
      showStickerModel.value = true;
      userParkingStateIndex.value = index;
    };

    const funcRobParking = (index: number) => {
      showChooseCarModel.value = true;
      userParkingStateIndex.value = index;
    };

    const funcLeave = (index: number) => {
      showLeaveModel.value = true;
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

    const funcAffirmRobParking = () => {
      showChooseCarModel.value = false;
      userParkingStateList.value[userParkingStateIndex.value] = 3;
    };

    const funcAffirmLeave = () => {
      showLeaveModel.value = false;
      userParkingStateList.value[userParkingStateIndex.value] = 1;
    };

    return {
      userParkingStateIndex,
      showFreeMintParkingModel,
      showStickerModel,
      showChooseCarModel,
      showLeaveModel,
      userParkingStateList,
      isUserHome,
      funcFreeMintParking,
      funcSticker,
      funcLeave,
      funcRobParking,
      funcAffirmSticker,
      funcAffirmRobParking,
      funcAffirmLeave,
      funcAffirmFreeMintParking,
    };
  },
});
</script>
<style scoped>

.parkingList {

}

.user-home {
  border: 1px solid #8ce6b0;
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  box-sizing: content-box;
  background-color: #edfff3;
}

.friend-Home {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 1rem;
  box-sizing: content-box;
  background-color: #fff9e6;
}

.parking-info-2 {
  height: auto;
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #fff9e6;
}

.parking-0 {
  border: 1px solid #8ce6b0;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #edfff3;
  width: 220px;
  height: 290px;
}

.parking-1 {
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #f0faff;
  width: 220px;
  height: 290px;
  background-image: url('../assets/parking.jpg'); /* 替换 'your-image.jpg' 为你的图片文件名 */
  background-position: center; /* 图片在div中居中显示 */
}

.parking-2 {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #fff9e6;
  width: 220px;
  height: 290px;
  background-image: url('../assets/parking.jpg'); /* 替换 'your-image.jpg' 为你的图片文件名 */
  background-position: center; /* 图片在div中居中显示 */
}

.parking-3 {
  border: 1px solid #fa8072;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #ffe5e4;
  width: 220px;
  height: 290px;
  background-image: url('../assets/parking.jpg'); /* 替换 'your-image.jpg' 为你的图片文件名 */
  background-position: center; /* 图片在div中居中显示 */

}

.choose-car-margin {
  margin: 0.5rem;
}
</style>
