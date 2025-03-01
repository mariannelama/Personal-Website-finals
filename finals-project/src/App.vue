<template>
  <div id="app">
    <button @click="toggleComments" class="btn">Get to know me</button>

    <CommentForm v-if="showComments" @add-comment="addComment" />
    <Comment v-if="showComments" :comments="comments" />
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
    addComment(commentData) {
      this.comments.push(commentData);
    }
  }
};
</script>

<style>
/* Add any necessary styles here */
</style>