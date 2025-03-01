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

export default {
  components: { Comment, CommentForm },

  data() {
    return {
      showComments: false,
      comments: []
    };
  },

  methods: {
    toggleComments() {
      this.showComments = !this.showComments;
    },
    addComment(comment) {
      this.comments.push(comment);
    }
  },

  watch: {
    showComments(newValue) {
      console.log("showComments changed to:", newValue);
    }
  }
};
</script>
