<script setup>
import { ref } from "vue";
const PlayButton = new URL(`@/assets/playButton.svg`, import.meta.url).href;
const closeIcon = new URL(`@/assets/close.svg`, import.meta.url).href;

defineEmits(["delete"]);
defineProps({
  video: {
    type: Object,
    required: true,
  },
  showOverlay: {
    type: Boolean,
    required: false,
    default: true,
  },
  showClose: {
    type: Boolean,
    required: false,
    default: true,
  },
});

let playVideo = ref(false);
</script>

<template>
  <div :class="[{ scale: !showOverlay }, 'video-container']">
    <!-- Thumbnail -->
    <img
      :src="video.thumbnail"
      style="width: 100%; height: 100%; object-fit: cover"
      :alt="video.title"
    />
    <!-- Duration -->
    <div class="video-duration">
      {{ video.duration }}
    </div>

    <!-- Overlay + Video -->
    <div v-if="showOverlay">
      <div v-if="!playVideo" class="video-overlay" @click="playVideo = true">
        <img :src="PlayButton" />
      </div>
      <div v-else class="video">
        <iframe
          style="width: 100%; height: 100%"
          :src="`https://www.youtube.com/embed/${video.id}?autoplay=1`"
          allow="autoplay"
        >
        </iframe>
      </div>
    </div>

    <!-- Close -->
    <div
      v-if="showClose"
      class="video-close"
      @click.stop.prevent="$emit('delete')"
    >
      <img
        :src="closeIcon"
        style="width: 1.2rem; height: 1.2rem; filter: invert(1)"
      />
    </div>
  </div>
</template>

<style scoped>
.video-container {
  position: relative;
  display: flex;
  aspect-ratio: 16 / 9;
  cursor: pointer;
}
.scale {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
.scale:hover {
  transform: scale(1.03);
}

.video-duration {
  padding: 0.3rem;
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-weight: 700;
}
.video-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-overlay img {
  width: 20%;
  height: 20%;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: pointer;
}
.video-overlay img:hover {
  transform: scale(1.1);
}
.video-container .video {
  z-index: 50;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
}
.video-close {
  padding: 0.2rem;
  border-radius: 0.25rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  cursor: pointer;
}
.video-close:hover {
  background-color: rgb(54, 54, 54);
}
</style>
