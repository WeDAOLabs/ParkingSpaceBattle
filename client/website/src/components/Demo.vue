<template>
  <div class="demo">
    <h1>DataValue = {{ DataValue }}</h1>
    <a-button @click="changeDataValue">Change DataValue</a-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onBeforeMount} from "vue";

export default defineComponent({
  name: "Demo",
  setup() {
    const DataValue = ref("111");

    const changeDataValue = () => {
      DataValue.value = "222!";
    };

    // beforeMount hook
    // 生命周期: onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted
    onBeforeMount(() => {
      console.log("DemoComponents beforeMount hook");
    });

    return {
      DataValue,
      changeDataValue,
    };
  },
});
</script>

<style scoped>
</style>