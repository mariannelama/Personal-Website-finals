<template>
  <div>
    <button @click="toggleCommentSection" class="btn">Get to know me</button>
    <div v-if="showComments">
      <CommentSection />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CommentSection from "./components/CommentSection.vue";

const showComments = ref(false);

function toggleCommentSection() {
  showComments.value = !showComments.value;
}
</script>

<style>
.btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
