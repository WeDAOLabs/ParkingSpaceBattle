<template>
  <div class="carList">
    <a-row justify="space-around">
      <!-- <a-col :span="4">
        <a-row justify="center" align="middle" class="car-0">
          <a-button @click="funcBuyCar">购买</a-button>
        </a-row>
      </a-col> -->
      <a-col
        :span="4"
        v-for="item in userCarStateList"
        :key="item.tokenId"
        class="carMargin"
      >
        <a-row
          justify="center"
          align="middle"
          class="car-0"
          v-if="item.status === 0"
        >
          <a-button @click="funcFreeMintCar()">Buy Car</a-button>
        </a-row>
        <a-row
          justify="center"
          align="middle"
          class="car-1"
          v-if="item.status === 1"
        >
          <a-col :span="24">
            <h2>车辆URL: XXX</h2>
            <h3>车辆ID: {{ item.tokenId }}</h3>
          </a-col>
          <a-col :span="12" v-if="!isHome">
            <a-button>去停车</a-button>
          </a-col>
          <a-col :span="12" v-if="isHome">
            <a-button>去升级</a-button>
          </a-col>
        </a-row>
        <a-row
          justify="center"
          align="middle"
          class="car-2"
          v-if="item.status === 2"
        >
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
import { defineComponent, ref, onBeforeMount, onUnmounted } from "vue";
import { CarStatus } from "../const/enum/CarStatus";
import { contractData } from "../data/ContractData";
import { homeData } from "../data/HomeData";
import { playerData } from "../data/PlayerData";
import { GameEventBuyCar } from "../events/GameEventBuyCar";
import { GameEventGoFriendHome } from "../events/GameEventGoFriendHome";
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
    });

    onUnmounted(() => {
      EventBus.instance.off(GameEventGoFriendHome.eventAsync, refreshCar);
      EventBus.instance.off(GameEventWalletConnected.eventAsync, refreshCar);
      EventBus.instance.off(GameEventBuyCar.eventAsync, refreshCar);
      EventBus.instance.off(
        GameEventWalletAccountChanged.eventAsync,
        refreshCar
      );
    });

    const refreshCar = async () => {
      Loading.close();
      const player = await playerData.getPlayerData(homeData.currentPlyer);
      isHome.value = homeData.isInHome;
      let cars = player
        ? player.cars.map((car) => {
            return { tokenId: car.tokenId, status: car.status };
          })
        : [];
      if (isHome.value) {
        cars.push({
          tokenId: 0,
          status: CarStatus.UN_MINT,
        });
      }

      //@ts-ignore
      userCarStateList.value = cars;
    };

    const userCarStateList = ref([]);
    const isHome = ref(true);

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

    const funcBuyCar = () => {};

    return {
      userCarStateList,
      funcFreeMintCar,
      funcBuyCar,
      isHome,
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

.carMargin {
  margin: 0.25rem 0.5rem;
}
</style>
