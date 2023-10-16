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
      <a-col v-if="!isLogin" :offset="16" :span="2">
        <a-button @click="connectWallet">Sign In</a-button>
      </a-col>
      <a-col v-else :offset="12" :span="8">
        <a-row align="middle">
          <a-col :offset="8" :span="2">
            <a href="https://www.twitter.com">
              <a-image
                  width="70%"
                  height="70%"
                  :src="require('../assets/twitter.png')"
                  :preview="false"
              />
            </a>
          </a-col>
          <a-col :offset="1" :span="2">
            <IconSvg icon-name="#icon-metamask"/>
          </a-col>
          <a-col :span="4">
            {{ userAddress }}
          </a-col>
          <a-col :offset="1" :span="2">
            <a-image
                width="70%"
                height="70%"
                :src="require('../assets/erc20_llt.jpg')"
                :preview="false"
            />
          </a-col>
          <a-col :span="3">
            {{ balanceOfLLT }} LLT
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount, onUnmounted} from "vue";
import {StringUtil} from "../core/utils/StringUtil";
import {EventBus} from "../plugins/EventBus";
import {GameEventWalletConnected} from "../events/GameEventWalletConnected";
import {GameEventWalletDisconnect} from "../events/GameEventWalletDisconnect";
import {GameEventWalletChainChanged} from "../events/GameEventWalletChainChanged";
import {ChainID} from "../const/enum/Chain";
import {walletData} from "../data/WalletData";
import {Toast} from "../plugins/Toast";
import {GameEventWalletAccountChanged} from "../events/GameEventWalletAccountChanged";
import IconSvg from "../components/IconSvg.vue";
import {contractData} from "../data/ContractData";

export default defineComponent({
  name: "Header",

  components: {IconSvg},
  setup() {
    const isLogin = ref(walletData.isAuth);
    const balanceOfLLT = ref("0");
    const userAddress = ref(
        !StringUtil.isEmpty(walletData.address)
            ? walletData.shortAddress
            : "Sign In"
    );

    const connectWallet = async () => {
      const isChainValid = await walletData.isChainValid();
      if (!isChainValid) {
        Toast.error("Please switch to the Polygon network");
        return Promise.resolve();
      }
      if (!StringUtil.isEmpty(walletData.address)) {
        Toast.warn("Wallet already connected");
        return Promise.resolve();
      }
      try {
        await walletData.connectWallet();
      } catch (e) {
        Toast.error("Connect wallet failed");
        console.error(e);
      }
    };

    onBeforeMount(() => {
      EventBus.instance.on(
          GameEventWalletConnected.eventAsync,
          onWalletConnect
      );
      EventBus.instance.on(
          GameEventWalletDisconnect.eventAsync,
          onWalletDisConnect
      );
      EventBus.instance.on(
          GameEventWalletChainChanged.eventAsync,
          onChainChanged
      );
      EventBus.instance.on(
          GameEventWalletAccountChanged.eventAsync,
          onAccountChange
      );
    });

    onUnmounted(() => {
      EventBus.instance.off(
          GameEventWalletConnected.eventAsync,
          onWalletConnect
      );
      EventBus.instance.off(
          GameEventWalletDisconnect.event,
          onWalletDisConnect
      );
      EventBus.instance.off(
          GameEventWalletChainChanged.eventAsync,
          onChainChanged
      );
      EventBus.instance.off(
          GameEventWalletAccountChanged.eventAsync,
          onAccountChange
      );
    });

    const onWalletConnect = () => {
      userAddress.value = walletData.shortAddress;
      isLogin.value = walletData.isAuth;

      refreshLLT();
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

    const onAccountChange = (account: string) => {
      if (!StringUtil.isEmpty(account)) {
        onWalletConnect();
      }
    };

    const refreshLLT = async () => {
      const token = await contractData.lltTokenContract.balanceOf(
          walletData.address
      );
      balanceOfLLT.value = token;
    };

    return {
      isLogin,
      userAddress,
      connectWallet,
      balanceOfLLT,
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
  background-color: rgba(255, 255, 204, 0.9); /* 页眉的背景颜色 */
  padding: 10px 0; /* 页眉的内边距 */
  text-align: center;
  z-index: 100; /* 控制页眉的层叠顺序 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 为页眉添加阴影效果 */
}

.logo-size {
  /*background-color: #1890ff;*/
  /*width: 50%;*/
  /*height: 50%;*/
}

.logo {
  width: 50%;
  height: 50%;
}

.test01 {
  background-color: red;
}
</style>
