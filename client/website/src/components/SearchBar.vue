<template>
  <div class="search-bar">
    <a-row justify="left" align="middle">
      <a-col :offset="1" :span="1">
        <a-button v-if="showBackButton" @click="funcBack">返回</a-button>
      </a-col>
      <a-col :offset="1" :span="18">
        <a-input-search
          size="large"
          enter-button
          @search="funcOnSearch"
          allowClear
          v-model:value="searchValue"
          placeholder="input wallet address"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { GameEventGoFriendHome } from "../events/GameEventGoFriendHome";
import { EventBus } from "../plugins/EventBus";
import { walletData } from "../data/WalletData";
import { GO_HOME, REG_ETH_ADDRESS } from "../const/Constants";
import { Toast } from "../plugins/Toast";
import { playerData } from "../data/PlayerData";

export default defineComponent({
  name: "SearchBar",

  emits: ["query-and-submit"],

  setup() {
    const searchValue = ref();

    const showBackButton = ref(false);

    const funcBack = () => {
      EventBus.instance.emit(GameEventGoFriendHome.event, GO_HOME);
    };

    const funcOnSearch = async () => {
      if (!walletData.isAuth) {
        Toast.warn("SignIn first");
        return;
      }
      const inputValue = searchValue.value.trim();

      if (!REG_ETH_ADDRESS.test(inputValue)) {
        Toast.warn("It's not an address");
        return;
      }

      if (inputValue === walletData.address) {
        Toast.warn(`It's your address.`);
        return;
      }

      showBackButton.value = true;

      const playerDTO = await playerData.getPlayerData(inputValue, true);

      EventBus.instance.emit(
        GameEventGoFriendHome.event,
        inputValue,
        playerDTO
      );
    };

    return {
      showBackButton,
      searchValue,
      funcBack,
      funcOnSearch,
    };
  },
});
</script>

<style scoped>
.search-bar {
  padding: 0.5rem;
  margin-top: 5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border: 1px solid #abdcff;
  border-radius: 0.5rem;
  box-sizing: content-box;
  background-color: #f0faff;
}
</style>
