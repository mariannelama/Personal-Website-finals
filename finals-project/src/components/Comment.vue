<template>
  <div>
    <h2 class="text-white mt-4">Comments:</h2>
    <div v-for="(comment, index) in comments" :key="index" class="bg-white p-2 rounded mt-2">
      <strong>{{ comment.name }}</strong>: {{ comment.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: Array
  }
};
</script>