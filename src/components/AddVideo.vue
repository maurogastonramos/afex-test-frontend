<script setup>
import { ref } from "vue";
import axios from "axios";
import { videosRef } from "@/firebase/init";
import { addDoc, query, where, getDocs } from "firebase/firestore";
import { showToast } from "@/utils/functions";

let videoUrl = ref(null);
let loading = ref(false);

async function handleAddVideo() {
  try {
    loading.value = true;

    const videoId = getIdFromUrl(videoUrl.value);

    const data = await fetchVideoData(videoId);
    const video = parseVideo(data);

    await checkIfExists(video);

    await saveVideo(video);
    showToast("Video agregado con éxito", "success");
    videoUrl.value = null;
  } catch (error) {
    console.log(error);
    showToast(error, "danger");
  } finally {
    loading.value = false;
  }
}

function getIdFromUrl(url) {
  // https://www.youtube.com/watch?v=WI4-HUn8dFc&t=989s to WI4-HUn8dFc
  // https://youtu.be/WI4-HUn8dFc to WI4-HUn8dFc
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  throw "Enlace inválido";
}
async function fetchVideoData(videoId) {
  const apiKey = "AIzaSyAI3cKGq8LZKSRACEIg5Os4Hl6opG2Yh9Y";
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`
  );
  if (data.pageInfo.totalResults == 0) throw "No se encontró el video";
  return data.items[0];
}
function parseVideo(video) {
  return {
    document_id: video.etag,
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    duration: parseDuration(video.contentDetails.duration),
    thumbnail: video.snippet.thumbnails.high.url,
    add_date: new Date(),
  };
}
function parseDuration(duration) {
  // "PT1H6M31S" to "1:06:31"
  return duration
    .replace(/PT|S/g, "")
    .replace(/H|M/g, ":")
    .split(":")
    .map((unit, index) => {
      if (index == 0) return unit;
      // [Minutes, Seconds] 1 digit to 2 digits
      return unit.replace(/^(\d)$/, "0$1");
    })
    .join(":");
}
async function checkIfExists(video) {
  const q = query(videosRef, where("id", "==", video.id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size > 0) throw "El video ya está agregado";
}
async function saveVideo(video) {
  await addDoc(videosRef, video);
}
</script>

<template>
  <div class="add-video-container">
    <span class="title">Añadir nuevo video</span>
    <div style="display: flex">
      <input type="text" placeholder="Añadir" v-model="videoUrl" />
      <button
        :disabled="loading || !videoUrl"
        class="button-primary"
        @click="handleAddVideo"
      >
        Añadir
      </button>
    </div>
  </div>
</template>

<style scoped>
.add-video-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-video-container .title {
  font-weight: 800;
  font-size: 1.5rem;
}

.add-video-container input {
  padding: 1rem;
  flex-grow: 1;
  border: 1px solid rgb(150, 150, 150);
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  outline: none;
  z-index: 10;
}
.add-video-container button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.add-video-container button:hover {
  opacity: 0.85;
}
</style>
