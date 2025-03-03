<template>
  <section>
    <div id="appContainer" class="btn" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="1800">
      <button @click="toggleContent">Get to know me</button>
      <div v-if="showForm" id="app">
        <CommentSection />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import CommentSection from './components/CommentSection.vue';

const showForm = ref(false);

function toggleContent() {
  showForm.value = !showForm.value;
}
</script>
