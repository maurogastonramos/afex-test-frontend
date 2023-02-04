<script setup>
import { db } from "@/firebase/init";
import { doc, deleteDoc } from "firebase/firestore";
import { toRefs, ref } from "vue";
import { showToast } from "@/utils/functions";
import Modal from "./base/Modal.vue";

const emit = defineEmits(["close"]);
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});
const { video } = toRefs(props);

let loading = ref(false);

async function deleteVideo() {
  try {
    loading.value = true;
    await deleteDoc(doc(db, "videos", video.value.document_id));
    emit("close");
    showToast("Video eliminado con éxito", "success");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Modal @close="$emit('close')">
    <template v-slot:body>
      <div class="modal-content">
        <span> ¿Seguro que quieres eliminar este video? </span>
        <div class="actions">
          <button
            :disabled="loading"
            class="button-secondary"
            @click="$emit('close')"
          >
            Cancelar
          </button>
          <button
            :disabled="loading"
            class="button-primary"
            @click="deleteVideo"
          >
            Eliminar
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.modal-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3rem;
}
.modal-content span {
  font-weight: 700;
  font-size: 1.5rem;
}
.modal-content .actions {
  display: flex;
  justify-content: end;
  gap: 2rem;
}
.modal-content .actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
}
</style>
