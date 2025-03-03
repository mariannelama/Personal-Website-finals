<template>
  <div class="p-4">
    <!-- Button to toggle comment section -->
    <button @click="toggleComments" class="bg-purple-600 text-white font-bold px-6 py-3 rounded-lg">
      Get to Know Me
    </button>

    <!-- Comment Section (Hidden Until Clicked) -->
    <div v-if="showComments" class="mt-4 transition-opacity duration-300 ease-in-out">
      <CommentForm @comment-submitted="addComment" />
      <Comment :comments="comments" />
    </div>
  </div>
</template>

<script>
import Comment from './components/Comment.vue';
import CommentForm from './components/CommentForm.vue';

const app = Vue.createApp({
    data() {
        return {
            showForm: false, // Controls the visibility of the form
            name: "",
            newComment: "",
            comments: []
        };
    },
    methods: {
        toggleContent() {
            this.showForm = !this.showForm; // Toggles form visibility
        },
        addComment() {
            if (this.name && this.newComment) {
                const timestamp = new Date().toLocaleString();
                this.comments.push({
                    name: this.name,
                    text: this.newComment,
                    timestamp
                });
                this.name = "";
                this.newComment = "";
            } else {
                alert("Please enter your name and comment!");
            }
        }
    }
});

app.mount("#appContainer");
</script>