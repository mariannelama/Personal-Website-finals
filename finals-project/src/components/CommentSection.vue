<template>
    <div class="comment-section">
      <h2>Leave a Comment</h2>
      <form @submit.prevent="submitComment">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required class="form-control">
        </div>
        <div class="form-group">
          <label for="comment">Comment:</label>
          <textarea id="comment" v-model="comment" required class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <div v-if="submissionStatus" class="status-message">{{ submissionStatus }}</div>
      </form>
      
      <h2>Comments</h2>
      <ul v-if="comments.length > 0">
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.name }}</strong>: {{ comment.comment }}
        </li>
      </ul>
      <p v-else>No comments yet. Be the first to comment!</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../lib/supabaseClient';
  
  const name = ref('');
  const comment = ref('');
  const submissionStatus = ref(null);
  const comments = ref([]);
  const tableName = 'comments';
  
  async function fetchComments() {
    const { data, error } = await supabase.from(tableName).select();
    if (!error) {
      comments.value = data;
    }
  }
  
  async function submitComment() {
    submissionStatus.value = "Submitting...";
    const { error } = await supabase.from(tableName).insert([{ name: name.value, comment: comment.value }]);
    
    if (error) {
      submissionStatus.value = "Error submitting comment. Please try again.";
    } else {
      submissionStatus.value = "Comment submitted successfully!";
      name.value = '';
      comment.value = '';
      fetchComments(); // Refresh comments
    }
  }
  
  onMounted(fetchComments);
  </script>
  
  <style scoped>
  .comment-section {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .form-control {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .status-message {
    margin-top: 10px;
    font-weight: bold;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background: white;
    padding: 10px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  </style>