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
      
      <!-- Debugging: Add Console Log -->
      <button type="submit" class="btn btn-primary" @click="testClick">Submit</button>

      <div v-if="submissionStatus" class="mt-2">
        {{ submissionStatus }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';

const name = ref('');
const comment = ref('');
const submissionStatus = ref('');

function testClick() {
  console.log("Submit button clicked!");  // ✅ Check if this appears in the console
}

async function submitComment() {
  if (!name.value.trim() || !comment.value.trim()) {
    submissionStatus.value = "Please fill in both fields.";
    return;
  }

  submissionStatus.value = "Submitting...";
  try {
    const { error } = await supabase
      .from('comments')
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
    console.error("Unexpected error:", err);
    submissionStatus.value = "Unexpected error. Please try again.";
  }
}
</script>