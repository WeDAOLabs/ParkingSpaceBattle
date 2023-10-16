<template>
  <div class="parkingList">
    <a-modal
      v-model:open="showFreeMintParkingModel"
      title="Mint Parking affirm"
      @ok="funcAffirmFreeMintParking"
    >
      <p>Mint Parking</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <a-modal
      v-model:open="showStickerModel"
      title="Sticker affirm"
      @ok="funcAffirmSticker"
    >
      <p>贴条...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <a-modal
      v-model:open="showChooseCarModel"
      title="Choose car"
      @ok="funcAffirmRobParking"
    >
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

    <a-modal
      v-model:open="showLeaveModel"
      title="Leave affirm"
      @ok="funcAffirmLeave"
    >
      <p>Leave affirm...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <div class="user-home" v-if="isUserHome">
      <a-row v-if="!isMinted" justify="space-around">
        <a-button size="large" class="buy-parking" @click="buyParkingPlace"
          >Buying Parking Place</a-button
        >
      </a-row>
      <a-row v-else justify="space-around">
        <a-col
          :span="4"
          v-for="(item, index) in userParkingStateList"
          :key="index"
        >
          <a-row
            justify="center"
            align="middle"
            class="parking-1"
            v-if="item === 1"
          >
          </a-row>
          <a-row
            justify="center"
            align="middle"
            class="parking-2"
            v-if="item === 2"
          >
            <a-col :span="24">
              <a-image :src="require('../assets/car.jpg')" :preview="false" />
            </a-col>
            <a-col :span="20">
              <div class="car-info">
                <a-row justify="left" align="middle">
                  <a-col :offset="4" :span="5">
                    <a-image
                      :src="require('../assets/id.png')"
                      :preview="false"
                    />
                  </a-col>
                  <a-col :offset="1" :span="5">
                    <span class="font-color">xxx</span>
                  </a-col>
                </a-row>
                <a-row justify="left" align="middle">
                  <a-col :offset="4" :span="5">
                    <a-image
                      :src="require('../assets/erc20_llt_mini.png')"
                      :preview="false"
                    />
                  </a-col>
                  <a-col :offset="1" :span="5">
                    <span class="font-color">123.001</span>
                  </a-col>
                </a-row>
              </div>
            </a-col>
            <a-col :span="24">
              <a-image
                width="50%"
                height="50%"
                class="pointer"
                @click="funcSticker(index)"
                :src="require('../assets/sticker_button02.png')"
                :preview="false"
              />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>

    <div class="friend-Home" v-else>
      <a-row justify="space-around">
        <a-col
          :span="4"
          v-for="(item, index) in userParkingStateList"
          :key="index"
        >
          <a-row
            justify="center"
            align="middle"
            class="parking-1"
            v-if="item === 1"
          >
            <a-col :span="24">
              <a-button
                size="large"
                type="primary"
                danger
                @click="funcRobParking(index)"
                >Park</a-button
              >
            </a-col>
          </a-row>
          <a-row
            justify="center"
            align="middle"
            class="parking-2"
            v-if="item === 2"
          >
            <a-col :span="24">
              <a-row justify="center" align="middle">
                <a-image :src="require('../assets/car.jpg')" :preview="false" />
              </a-row>
            </a-col>
            <a-col :span="20">
              <div class="car-info">
                <a-row justify="left" align="middle">
                  <a-col :offset="4" :span="5">
                    <a-image
                      :src="require('../assets/id.png')"
                      :preview="false"
                    />
                  </a-col>
                  <a-col :offset="1" :span="5">
                    <span class="font-color">xxx</span>
                  </a-col>
                </a-row>
              </div>
            </a-col>
          </a-row>
          <a-row
            justify="center"
            align="middle"
            class="parking-3"
            v-if="item === 3"
          >
            <a-col :span="24">
              <a-row justify="center" align="middle">
                <a-image :src="require('../assets/car.jpg')" :preview="false" />
              </a-row>
            </a-col>
            <a-col :span="20">
              <div class="car-info">
                <a-row justify="left" align="middle">
                  <a-col :offset="4" :span="5">
                    <a-image
                      :src="require('../assets/id.png')"
                      :preview="false"
                    />
                  </a-col>
                  <a-col :offset="1" :span="5">
                    <span class="font-color">xxx</span>
                  </a-col>
                </a-row>
                <a-row justify="left" align="middle">
                  <a-col :offset="4" :span="5">
                    <a-image
                      :src="require('../assets/erc20_llt_mini.png')"
                      :preview="false"
                    />
                  </a-col>
                  <a-col :offset="1" :span="5">
                    <span class="font-color">123.001</span>
                  </a-col>
                </a-row>
              </div>
            </a-col>
            <a-col :span="24">
              <a-button type="primary" @click="funcLeave(index)">离开</a-button>
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
import { homeData } from "../data/HomeData";
import { playerData } from "../data/PlayerData";
import { walletData } from "../data/WalletData";
import { GameEventWalletConnected } from "../events/GameEventWalletConnected";
import { Loading } from "../plugins/Loading";
import { contractData } from "../data/ContractData";
import { Toast } from "../plugins/Toast";
import { GameEventBuyParkings } from "../events/GameEventBuyParkings";
import { GameEventWalletAccountChanged } from "../events/GameEventWalletAccountChanged";
import { GameEventParkCar } from "../events/GameEventParkCar";
import { GameEventUnParkCar } from "../events/GameEventUnParkCar";

export default defineComponent({
  name: "ParkingList",

  setup() {
    onBeforeMount(() => {
      EventBus.instance.on(GameEventGoFriendHome.eventAsync, onPageRefresh);
      EventBus.instance.on(GameEventWalletConnected.eventAsync, onSignIn);
      EventBus.instance.on(GameEventBuyParkings.eventAsync, onParkingBought);
      EventBus.instance.on(
        GameEventWalletAccountChanged.eventAsync,
        refreshHome
      );
      EventBus.instance.on(GameEventParkCar.eventAsync, onParkCar);
      EventBus.instance.on(GameEventUnParkCar.eventAsync, onUnPackCar);
    });

    onUnmounted(() => {
      EventBus.instance.off(GameEventGoFriendHome.eventAsync, onPageRefresh);
      EventBus.instance.off(GameEventWalletConnected.eventAsync, onSignIn);
      EventBus.instance.off(GameEventBuyParkings.eventAsync, onParkingBought);
      EventBus.instance.off(
        GameEventWalletAccountChanged.eventAsync,
        refreshHome
      );
      EventBus.instance.off(GameEventParkCar.eventAsync, onParkCar);
      EventBus.instance.off(GameEventUnParkCar.eventAsync, onUnPackCar);
    });

    const onPageRefresh = async (address: any) => {
      Loading.open();
      isUserHome.value = address === GO_HOME;
      if (!isUserHome.value) {
        await refreshFriendHome();
      } else {
        await refreshHome();
      }
      Loading.close();
    };

    const onSignIn = async () => {
      Loading.open();
      await refreshHome();
      Loading.close();
    };

    const isMinted = ref(false);
    const isUserHome = ref(true);
    const userParkingStateIndex = ref(0);
    const showFreeMintParkingModel = ref(false);
    const showStickerModel = ref(false);
    const showChooseCarModel = ref(false);
    const showLeaveModel = ref(false);

    const userParkingStateList = ref([1, 2, 1, 1, 3]); // 0表示未mint 1表示车位空 2表示他人占用 3表示自己占用(3仅出现在朋友的车库)

    const funcFreeMintParking = (index: number) => {
      showFreeMintParkingModel.value = true;
      userParkingStateIndex.value = index;
    };

    const funcSticker = (index: number) => {
      showStickerModel.value = true;
      userParkingStateIndex.value = index;
    };

    const funcRobParking = async (index: number) => {
      const player = await playerData.getPlayerData(homeData.currentPlyer);
      const myData = await playerData.getPlayerData(walletData.address);
      if (!player || !myData) {
        return Promise.resolve();
      }

      const tokenId = player.parkings[index].tokenId;
      const carIndex = myData.cars.findIndex((car) => car.isEmpty);
      if (carIndex >= 0) {
        Loading.open();
        try {
          await contractData.lotLootContract.park(
            myData.cars[carIndex].tokenId,
            tokenId
          );
        } catch (e) {
          console.error(e);
          Loading.close();
        }
      } else {
        Toast.warn(`there's no car idle`);
      }
    };

    const funcLeave = async (index: number) => {
      const address = homeData.currentPlyer;
      const player = await playerData.getPlayerData(address);
      if (player) {
        const parking = player.parkings[index];
        if (parking && parking.carTokenId > 0) {
          Loading.open();
          try {
            await contractData.lotLootContract.unPark(parking.carTokenId);
          } catch (e) {
            console.error(e);
            Loading.close();
            Toast.error(`UnPark failed.`);
          }
        }
      }
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

    const refreshFriendHome = async () => {
      const player = await playerData.getPlayerData(homeData.currentPlyer);
      isMinted.value = player && player.hasParkings ? true : false;

      if (player)
        userParkingStateList.value = player.parkings.map(
          (parking) => parking.status
        );
    };

    const refreshHome = async () => {
      const player = await playerData.getPlayerData(walletData.address);
      isMinted.value = player && player.hasParkings ? true : false;

      if (player) {
        userParkingStateList.value = player.parkings.map(
          (parking) => parking.status
        );
      }
    };

    const buyParkingPlace = async () => {
      Loading.open();
      try {
        await contractData.parkingStoreContract.buyParkings();
      } catch (e) {
        Loading.close();
        Toast.error("Buy parking place failed.");
        console.error(e);
      }
    };

    const onParkingBought = async () => {
      Loading.close();
      await refreshHome();
    };

    const onParkCar = async () => {
      Loading.close();
      refreshFriendHome();
    };

    const onUnPackCar = async () => {
      Loading.close();
      if (homeData.isInHome) {
        await refreshHome();
      } else {
        await refreshFriendHome();
      }
    };

    return {
      userParkingStateIndex,
      showFreeMintParkingModel,
      showStickerModel,
      showChooseCarModel,
      showLeaveModel,
      userParkingStateList,
      isUserHome,
      isMinted,
      funcFreeMintParking,
      funcSticker,
      funcLeave,
      funcRobParking,
      funcAffirmSticker,
      funcAffirmRobParking,
      funcAffirmLeave,
      funcAffirmFreeMintParking,
      buyParkingPlace,
    };
  },
});
</script>
<style scoped>
.parkingList {
}

.pointer {
  cursor: pointer; /* 将光标形状设置为手型 */
}

.pointer:hover {
  cursor: pointer; /* 将光标形状设置为手型 */
}

.user-home {
  border: 1px solid #8ce6b0;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 1rem;
  box-sizing: content-box;
  background-color: #edfff3;
}

.friend-Home {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 1rem;
  box-sizing: content-box;
  background-color: #fff9e6;
}

.parking-1 {
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #f0faff;
  width: 220px;
  height: 290px;
  background-image: url("../assets/parking.jpg"); /* 替换 'your-image.jpg' 为你的图片文件名 */
  background-position: center; /* 图片在div中居中显示 */
}

.parking-2 {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #fff9e6;
  width: 220px;
  height: 290px;
  background-image: url("../assets/parking.jpg"); /* 替换 'your-image.jpg' 为你的图片文件名 */
  background-position: center; /* 图片在div中居中显示 */
}

.parking-3 {
  border: 1px solid #fa8072;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #ffe5e4;
  width: 220px;
  height: 290px;
  background-image: url("../assets/parking.jpg"); /* 替换 'your-image.jpg' 为你的图片文件名 */
  background-position: center; /* 图片在div中居中显示 */
}

.choose-car-margin {
  margin: 0.5rem;
}

.font-color {
  /*background-color: #343434;*/
  /*color: #c9c9c9;*/
  font-weight: bold;
}

.car-info {
  border: 1px solid #ffd77a;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #fff9e6;
  text-align: left;
}

.test02 {
  background-color: greenyellow;
}
</style>
