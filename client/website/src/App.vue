<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <Demo/>
</template>

<script setup lang="ts">
import {onBeforeMount} from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Demo from './components/Demo.vue';

const components = {
  Demo,
};

onBeforeMount(() => {
  const clientWidth = document.documentElement.clientWidth / 1280;
  const clientHeight = document.documentElement.clientHeight / 720;
  const clientZoom = clientHeight < clientWidth ? clientHeight : clientWidth;

  // 缩放
  document.documentElement.style.zoom = String(clientZoom);
  // background UI
  // document.documentElement.style.background = 'linear-gradient(30deg, #9FA5D5, #E8F5C8) no-repeat fixed';

});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
