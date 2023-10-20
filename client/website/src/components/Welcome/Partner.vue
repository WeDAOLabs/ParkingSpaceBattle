<template>
  <div class="partners-module">
    <h2 class="gradient-color">PARTNERS</h2>
    <h4 class="partners-description">
      "Together, we are strong."
    </h4>
    <p class="partners-description">
      Our success would be the result of the collective efforts of numerous contributors, as reflected in our triangular logo design. This design symbolizes our dedication to shared values and mutual benefit.
    </p>
    <div class="partner-logos">
      <!-- Start: Add more sponsors here -->
      <div v-for="(sponsor, index) in sponsorLogos" :key="index" class="partner-logo">
        <div class="rectangle-decor">
          <img :src="sponsor.image" alt="Sponsor Logo" class="sponsor-image" />
        </div>
      </div>
      <!-- End: Add more sponsors here -->
    </div>
  </div>
</template>

<script setup>
const sponsorLogos = [
  { image: "https://via.placeholder.com/150x150" },
  { image: "https://via.placeholder.com/150x150" },
  // You can add more sponsors here as needed
];
</script>

<style scoped>
.partners-module {
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(240, 240, 240, 0.6);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  text-align: center;
}

h2 {
  font-size: 28px;
  margin-bottom: 1rem;
  color: #007bff;
}

.partners-description {
  margin-bottom: 1rem;
  color: #555;
}

.partner-logos {
  display: flex;
  justify-content: center; /* 居中对齐 */
  flex-wrap: wrap;
}

.partner-logo {
  margin: 10px;
}

.rectangle-decor {
  position: relative;
  width: 120px;
  height: 120px;
  background: linear-gradient(to right, rgba(0, 123, 255, 0.54), rgba(25, 190, 107, 0.5));
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  /*box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);*/
}

.sponsor-image {
  max-width: 100px;
  height: auto;
}

.rectangle-decor:hover {
  transform: scale(1.05);
}

.gradient-color {
  background: linear-gradient(to right, #007bff, #19be6b);
  -webkit-background-clip: text;
  color: transparent;
}

.divider {
  height: 3px;
  background: transparent linear-gradient(to right, #2db7f5, #19be6b);
}


</style>
