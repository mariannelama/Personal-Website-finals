<template>
  <div>
    <label for="name" class="block text-white">Your Name:</label>
    <input 
      type="text" 
      id="name" 
      v-model="name" 
      placeholder="Enter your name" 
      class="w-full p-2 rounded border" 
    />

    <label for="comment" class="block text-white mt-2">Your Comment:</label>
    <textarea 
      id="comment" 
      v-model="commentText" 
      placeholder="Leave a comment..." 
      class="w-full p-2 rounded border"
    ></textarea>

    <button @click="submitComment" class="bg-purple-600 text-white font-bold px-6 py-3 rounded-lg mt-2">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      commentText: "",
    };
  },
  methods: {
    submitComment() {
      if (this.name && this.commentText) {
        this.$emit("comment-submitted", { name: this.name, text: this.commentText });
        this.name = "";
        this.commentText = "";
      }
    }
  }
};
</script>