<script setup>
import Modal from "./base/Modal.vue";
import Video from "./Video.vue";

defineEmits(["close"]);
defineProps({
  video: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <Modal @close="$emit('close')">
    <template v-slot:body>
      <div class="modal-content">
        <div>
          <Video :video="video" :show-close="false"></Video>
        </div>
        <div class="video-data-container">
          <span class="title">
            {{ video.title }}
          </span>
          <div class="description">
            {{ video.description }}
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.modal-content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.video-data-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
.video-data-container .title {
  font-weight: 700;
  font-size: 1.3rem;
}
.video-data-container .description {
  max-height: 13rem;
  overflow-y: auto;
  overflow-wrap: break-word;
  white-space: pre-line;
}

@media (max-width: 850px) {
  .modal-content {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
