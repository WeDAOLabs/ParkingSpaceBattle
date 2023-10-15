<template>
  <div class="index">
    <Header class="margin-top" />
    <div v-if="!isLogin">
      <a-divider />
      <a-row>
        <a-col :offset="5" :span="10">
          <WelcomePage />
        </a-col>
      </a-row>
    </div>
    <div v-else>
      <a-divider />
      <SearchBar />
      <a-divider />
      <ParkingList />
      <a-divider />
      <CarList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, onUnmounted } from "vue";
import Header from "./Header.vue";
import ParkingList from "./ParkingList.vue";
import SearchBar from "./SearchBar.vue";
import CarList from "./CarList.vue";
import WelcomePage from "./WelcomePage.vue";

import { walletData } from "../data/WalletData";
import { EventBus } from "../plugins/EventBus";
import { GameEventSample } from "../events/GameEventSample";
import { GameEventWalletDisconnect } from "../events/GameEventWalletDisconnect";
import { GameEventWalletConnected } from "../events/GameEventWalletConnected";
import { GameEventWalletAccountChanged } from "../events/GameEventWalletAccountChanged";

export default defineComponent({
  name: "Index",

  components: { WelcomePage, Header, ParkingList, CarList, SearchBar },
  setup() {
    const isLogin = ref(walletData.isAuth);

    onBeforeMount(() => {
      EventBus.instance.on(GameEventWalletConnected.event, onSignIn);
      EventBus.instance.on(GameEventWalletDisconnect.eventAsync, onSignOut);
      EventBus.instance.on(
        GameEventWalletAccountChanged.eventAsync,
        onAccountChanged
      );
    });

    onUnmounted(() => {
      EventBus.instance.off(GameEventWalletConnected.event, onSignIn);
      EventBus.instance.off(GameEventWalletDisconnect.eventAsync, onSignOut);
      EventBus.instance.off(
        GameEventWalletAccountChanged.eventAsync,
        onAccountChanged
      );
    });

    const onSignIn = () => {
      isLogin.value = true;
    };

    const onSignOut = () => {
      isLogin.value = false;
    };

    const onAccountChanged = () => {};

    return {
      isLogin,
    };
  },
});
</script>

<style scoped></style>
