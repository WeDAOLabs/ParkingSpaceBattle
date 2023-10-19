<template>
  <div class="footer-module">
    <div class="links">
      <div class="link">
        <a href="https://mumbai.polygonscan.com/address/0x4ddbf5ddf8819de761fc708f8a522d341e03cbe5" target="_blank">
          ContractAddress: 0x4ddbf5ddf8819de761fc708f8a522d341e03cbe5
        </a>
      </div>
      <div class="link">
        <a href="https://github.com/WeDAOLabs/ParkingSpaceBattle/blob/main/design/litepaper_en.md" target="_blank"> | WhitePaper</a>
      </div>
      <div class="link">
        <a href="https://twitter.com" target="_blank"> | X(Twitter)</a>
      </div>
      <div class="link">
        <a href="https://github.com/WeDAOLabs/ParkingSpaceBattle" target="_blank"> | GitHub</a>
      </div>
      <div class="link">
        <a href="" target="_blank"> | Privacy Concerns</a>
      </div>
      <div class="link">
        <a href="" target="_blank"> | Terms & Conditions</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// 你可以在此处添加链接的实际URL
</script>

<style scoped>
.footer-module {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

.links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.link a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
}

.link a:hover {
  text-decoration: underline;
}
</style>
