<script setup>
const closeIcon = new URL(`@/assets/close.svg`, import.meta.url).href;

defineEmits(["close"]);
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <div type="button" class="icon-close" @click="$emit('close')">
          <img :src="closeIcon"  style="width: 1.5rem; height: 1.5rem" />
        </div>
      </div>
      <!-- Body -->
      <div>
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  overflow-x: hidden;
  color: black;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  width:60%;
  height: min-content;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}
.modal-header {
  display: flex;
  justify-content: end;
}
.modal-header img:hover {
  opacity: 0.85;
  cursor: pointer;
}

@media (max-width: 1300px) {
.modal-content {
    width: 90%;
  }
}

</style>
