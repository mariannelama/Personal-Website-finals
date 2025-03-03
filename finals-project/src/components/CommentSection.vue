<template>
    <div>
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
        <div v-if="submissionStatus" class="mt-2">
          {{ submissionStatus }}
        </div>
      </form>
  
      <h2>Comments</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.name }}</strong>: {{ comment.comment }} ({{ formatDate(comment.created_at) }})
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'
  
  const name = ref('')
  const comment = ref('')
  const comments = ref([])
  const submissionStatus = ref(null)
  
  async function fetchComments() {
    const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching comments:', error)
    } else {
      comments.value = data
    }
  }
  
  async function submitComment() {
    if (!name.value || !comment.value) return
  
    const { error } = await supabase.from('comments').insert([
      { name: name.value, comment: comment.value }
    ])
  
    if (error) {
      submissionStatus.value = 'Error submitting comment.'
      console.error('Error inserting comment:', error)
    } else {
      submissionStatus.value = 'Comment submitted successfully!'
      name.value = ''
      comment.value = ''
      fetchComments() // Refresh the list after submitting
    }
  }
  
  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString()
  }
  
  onMounted(fetchComments)
  </script>
  
  <style scoped>
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
  </style>
  