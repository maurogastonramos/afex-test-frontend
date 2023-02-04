<script setup>
import { ref } from "vue";
import { videosRef } from "@/firebase/init";
import { query, onSnapshot, orderBy } from "firebase/firestore";
import Video from "./Video.vue";
import ModalDetailVideo from "./ModalDetailVideo.vue";
import ModalDeleteVideo from "./ModalDeleteVideo.vue";

let videos = ref([]);
let videoDetail = ref(null);
let videoDelete = ref(null);

async function fetchVideos() {
  const q = query(videosRef, orderBy("add_date"));
  onSnapshot(q, (querySnapshot) => {
    videos.value = videos.value.splice();
    querySnapshot.forEach((doc) => {
      videos.value.push({ ...doc.data(), document_id: doc.id });
    });
  });
}
fetchVideos();
</script>

<template>
  <div class="videos-container">
    <div v-for="video in videos" :key="video.id" class="video-container">
      <Video
        style="width: 100%"
        :video="video"
        :showOverlay="false"
        @click="videoDetail = video"
        @delete="videoDelete = video"
      ></Video>
    </div>
  </div>

  <ModalDetailVideo
    v-if="videoDetail"
    :video="videoDetail"
    @close="videoDetail = null"
  ></ModalDetailVideo>

  <ModalDeleteVideo
    v-if="videoDelete"
    :video="videoDelete"
    @close="videoDelete = null"
  ></ModalDeleteVideo>
</template>

<style scoped>
.videos-container {
  padding: 4rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4rem;
}

@media (max-width: 1120px) {
  .videos-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .videos-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
