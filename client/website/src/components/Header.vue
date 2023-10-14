<template>
  <div class="header">
    <a-row>
      <a-col :offset="1" :span="3">
        <a-image
          class="logo"
          :src="require('../assets/logo.jpg')"
          :preview="false"
        />
      </a-col>
      <a-col :offset="16" :span="2">
        <a-button v-if="!isLogin" @click="connectWallet">Sign In</a-button>
        <h3 v-else>{{ userAddress }}</h3>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, onUnmounted } from "vue";
import { StringUtil } from "../core/utils/StringUtil";
import { EventBus } from "../plugins/EventBus";
import { GameEventWalletConnected } from "../events/GameEventWalletConnected";
import { GameEventWalletDisconnect } from "../events/GameEventWalletDisconnect";
import { GameEventWalletChainChanged } from "../events/GameEventWalletChainChanged";
import { ChainID } from "../const/enum/Chain";
import { walletData } from "../data/WalletData";

export default defineComponent({
  name: "Header",

  components: {},
  setup() {
    const isLogin = ref(walletData.isAuth);
    const userAddress = ref(
      !StringUtil.isEmpty(walletData.address) ? walletData.address : "Sign In"
    );

    const connectWallet = async () => {
      const isChainValid = await walletData.isChainValid();
      if (!isChainValid) {
        // console.log("Please switch to the Polygon network")
        return Promise.resolve();
      }
      if (!StringUtil.isEmpty(walletData.address)) {
        console.warn("Wallet already connected");
        return Promise.resolve();
      }
      try {
        await walletData.connectWallet();
      } catch (e) {
        console.error("Connect wallet failed");
      }
    };

    onBeforeMount(() => {
      EventBus.instance.on(GameEventWalletConnected.event, onWalletConnect);
      EventBus.instance.on(GameEventWalletDisconnect.event, onWalletDisConnect);
      EventBus.instance.on(GameEventWalletChainChanged.event, onChainChanged);
    });

    onUnmounted(() => {
      EventBus.instance.off(GameEventWalletConnected.event, onWalletConnect);
      EventBus.instance.off(
        GameEventWalletDisconnect.event,
        onWalletDisConnect
      );
      EventBus.instance.off(GameEventWalletChainChanged.event, onChainChanged);
    });

    const onWalletConnect = () => {
      userAddress.value = walletData.address;
      isLogin.value = walletData.isAuth;
    };

    const onWalletDisConnect = () => {
      userAddress.value = "Sign In";
      isLogin.value = false;
    };

    const onChainChanged = (chainId: any) => {
      // TODO
      if (chainId === ChainID.Mumbai) {
        onWalletConnect();
      }
    };

    return {
      isLogin,
      userAddress,
      connectWallet,
    };
  },
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #c9c9c9; /* 页眉的背景颜色 */
  padding: 10px 0; /* 页眉的内边距 */
  text-align: center;
  z-index: 100; /* 控制页眉的层叠顺序 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 为页眉添加阴影效果 */
}

.logo {
  width: 50%;
  height: 50%;
}
</style>
