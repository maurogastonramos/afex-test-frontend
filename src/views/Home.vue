<script setup>
import AddVideo from "@/components/AddVideo.vue";
import ListVideos from "@/components/ListVideos.vue";
</script>

<template>
  <div class="container">
    <AddVideo />
    <ListVideos />
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
