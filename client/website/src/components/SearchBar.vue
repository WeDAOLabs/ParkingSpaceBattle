<template>
  <div class="search-bar">
    <a-row justify="left" align="middle">
      <a-col :offset="1" :span="1" class="test01">
        <a-button v-if="showBackButton" @click="funcBack">返回</a-button>
      </a-col>

      <a-col :offset="1" :span="18" class="test02">
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
import { GO_HOME } from "../const/Constants";

export default defineComponent({
  name: "SearchBar",

  emits: ["query-and-submit"],

  setup() {
    const searchValue = ref();

    const showBackButton = ref(false);

    const funcBack = () => {
      EventBus.instance.emit(GameEventGoFriendHome.event, GO_HOME);
    };

    const funcOnSearch = () => {
      showBackButton.value = true;
      EventBus.instance.emit(GameEventGoFriendHome.event, searchValue.value);
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
  margin-top: 5rem;
}

/*.test01 {*/
/*  background-color: red;*/
/*}*/

/*.test02 {*/
/*  background-color: greenyellow;*/
/*}*/
</style>
