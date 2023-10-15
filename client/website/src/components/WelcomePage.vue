<template>
  <div class="welcome-page">
    <a-row justify="left" align="middle">
      <a-col>
        <a-image
            class="logo"
            :src="require('../assets/logo_lotloot.jpg')"
            :preview="false"
        />
      </a-col>
    </a-row>
  </div>

</template>

<script>
export default {
  name: "WelcomePage"
}
</script>

<style scoped>
.welcome-page {
  margin-top: 3rem;
}
</style>