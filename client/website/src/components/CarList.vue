<template>
  <div class="carList">
    <div class="list-div">
      <a-row justify="left" align="middle">
        <a-col :span="24" class="list-item-margin">
          <a-button size="large" @click="funcFreeMintCar">Buying Cars</a-button>
        </a-col>
      </a-row>

      <a-row v-if="userCarList.length" justify="left" align="middle">
        <a-col :span="2"><h3>URL</h3></a-col>
        <a-col :span="1"><h3>ID</h3></a-col>
        <a-col :span="3"><h3>Parking Address</h3></a-col>
        <a-col :span="2"><h3>Prospective Earnings</h3></a-col>
        <a-col :span="3"><h3>operation</h3></a-col>

        <a-col :offset="2" :span="2"><h3>URL</h3></a-col>
        <a-col :span="1"><h3>ID</h3></a-col>
        <a-col :span="3"><h3>Parking Address</h3></a-col>
        <a-col :span="2"><h3>Prospective Earnings</h3></a-col>
        <a-col :span="3"><h3>operation</h3></a-col>
      </a-row>
      <a-row align="middle">
        <a-col v-for="item in userCarList" :span="12" :index="item.tokenId">
          <a-row>
            <a-col v-if="index % 2 === 1" :span="1" class="list-item-margin">
            </a-col>

            <a-col :span="4" class="list-item-margin">
              <a-row justify="space-around" align="middle">
                <a-col :span="20">
                  <!--//TODO:静态图片-->
                  <div class="car-img">
                    <a-image
                      width="50px"
                      height="73"
                      :src="require('../assets/car.jpg')"
                      :preview="false"
                    />
                  </div>
                  <!--  <a-input size="large" v-model:value="item.URL"/>-->
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="2" class="list-item-margin list-item-text-align">
              <h3>{{ item.tokenId }}</h3>
            </a-col>
            <a-col :span="6" class="list-item-margin list-item-text-align">
              <h4>{{ item.ParkingAddress }}</h4>
            </a-col>
            <!-- <a-col :span="4" class="list-item-margin list-item-text-align">
              <h4>{{ item.ProspectiveEarnings }}</h4>
            </a-col> -->
            <a-col :span="4">
              <a-button
                v-if="item.ParkingAddress === 0"
                size="large"
                type="primary"
                danger
                @click="onUpgrade(item.tokenId)"
                >Upgrade
              </a-button>
              <a-button
                v-else
                size="large"
                type="primary"
                @click="onUnPackClick(item.tokenId)"
                >Leave
              </a-button>
              <!--            <a-button   icon="delete"-->
              <!--                      @click="buttonDeleteList(index,'learn')"/>-->
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, onUnmounted } from "vue";
import { CarStatus } from "../const/enum/CarStatus";
import { contractData } from "../data/ContractData";
import { homeData } from "../data/HomeData";
import { playerData } from "../data/PlayerData";
import { GameEventBuyCar } from "../events/GameEventBuyCar";
import { GameEventGoFriendHome } from "../events/GameEventGoFriendHome";
import { GameEventUnParkCar } from "../events/GameEventUnParkCar";
import { GameEventWalletAccountChanged } from "../events/GameEventWalletAccountChanged";
import { GameEventWalletConnected } from "../events/GameEventWalletConnected";
import { EventBus } from "../plugins/EventBus";
import { Loading } from "../plugins/Loading";
import { Toast } from "../plugins/Toast";

export default defineComponent({
  name: "CarList",
  setup() {
    onBeforeMount(() => {
      EventBus.instance.on(GameEventGoFriendHome.eventAsync, refreshCar);
      EventBus.instance.on(GameEventWalletConnected.eventAsync, refreshCar);
      EventBus.instance.on(GameEventBuyCar.eventAsync, refreshCar);
      EventBus.instance.on(
        GameEventWalletAccountChanged.eventAsync,
        refreshCar
      );
      EventBus.instance.on(GameEventUnParkCar.eventAsync, onUnPackCar);
    });

    onUnmounted(() => {
      EventBus.instance.off(GameEventGoFriendHome.eventAsync, refreshCar);
      EventBus.instance.off(GameEventWalletConnected.eventAsync, refreshCar);
      EventBus.instance.off(GameEventBuyCar.eventAsync, refreshCar);
      EventBus.instance.off(
        GameEventWalletAccountChanged.eventAsync,
        refreshCar
      );
      EventBus.instance.off(GameEventUnParkCar.eventAsync, onUnPackCar);
    });

    const isHome = ref(true);

    const refreshCar = async () => {
      Loading.close();
      const player = await playerData.getPlayerData(homeData.currentPlyer);
      isHome.value = homeData.isInHome;
      let cars = player
        ? player.cars.map((car) => {
            return {
              tokenId: car.tokenId,
              status: car.status,
              ParkingAddress: car.parkingTokenId,
              url: "0",
            };
          })
        : [];
      if (isHome.value) {
        // cars.push({
        //   url: "0",
        //   tokenId: 0,
        //   status: CarStatus.UN_MINT,
        //   ParkingAddress: 0,
        // });
      }
      //@ts-ignore
      userCarList.value = cars;
    };

    const userCarList = ref([]);

    const funcFreeMintCar = async () => {
      Loading.open();
      try {
        await contractData.carStoreContract.buyCar();
      } catch (e) {
        Loading.close();
        console.error(e);
        Toast.error("Buy car failed");
      }
    };

    const onUnPackClick = async (tokenId: number) => {
      if (!homeData.isInHome) {
        return Promise.resolve();
      }

      try {
        await contractData.lotLootContract.unPark(tokenId);
      } catch (e) {
        console.error(e);
        Loading.close();
        Toast.error(`UnPark failed.`);
      }
    };

    const onUnPackCar = async () => {
      Loading.close();
      await refreshCar();
    };

    const onUpgrade = async () => {
      Toast.warn(`Coming soon`);
      return Promise.resolve();
    };

    return {
      userCarList,
      funcFreeMintCar,
      isHome,
      onUnPackClick,
      onUpgrade,
    };
  },
});
</script>

<style scoped>
.list-div {
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  box-sizing: content-box;
  border: 1px solid #8ce6b0;
  background-color: #edfff3;
  /*border: 1px solid black;*/
  /*background-color: #9fe080;*/
}

.list-item-margin {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.list-item-text-align {
  text-align: left;
}

.car-img {
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #f0faff;
}

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

.carMargin {
  margin: 0.25rem 0.5rem;
}

.test01 {
  background-color: red;
}
</style>
