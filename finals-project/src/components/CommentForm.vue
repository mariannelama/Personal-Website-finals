<template>
  <div>
    <h2>Leave a Comment</h2>
    <p class="leave-message">Leave a message</p>
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
      <div v-if="submissionStatus" class="submission-message">
        {{ submissionStatus }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient'


const name = ref('');
const comment = ref('');
const submissionStatus = ref(null);

// Your Supabase URL and Key - IMPORTANT!
const tableName = 'comments'; // Name of your Supabase table

async function submitComment() {
  submissionStatus.value = "Submitting...";
  try {
    const { error } = await supabase
      .from(tableName)
      .insert([{ name: name.value, comment: comment.value }]);

    if (error) {
      console.error("Error inserting comment:", error);
      submissionStatus.value = "Error submitting comment. Please try again.";
    } else {
      submissionStatus.value = "Comment submitted successfully!";
      name.value = ''; // Clear form fields
      comment.value = '';
    }
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    submissionStatus.value = "An unexpected error occurred. Please try again later.";
  }
}
</script>

<style>
.leave-message {
  color: white;
  font-family: "Brush Script MT", cursive;
  font-size: 70px; /* Adjust as needed */
  margin: 0;
  transition: color 0.1s ease-in-out; /* Smooth transition effect */
}

.leave-message:hover {
  color: violet;
}

.submission-message {
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
}
</style>