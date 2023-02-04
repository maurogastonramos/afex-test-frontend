// https://github.com/szboynono/mosha-vue-toastify
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
export function showToast(text, type) {
  createToast(text, {
    type: type,
    transition: "bounce",
    position: "top-center",
    showIcon: true,
  });
}
