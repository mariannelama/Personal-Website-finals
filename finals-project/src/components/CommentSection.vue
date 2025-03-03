<template>
  <div class="comment-section">
    <h2 class="text-xl font-bold mb-2">Leave a Comment</h2>

    <!-- Comment Form -->
    <form @submit.prevent="submitComment" class="space-y-4">
      <div>
        <label for="name" class="block font-medium">Name:</label>
        <input 
          type="text" 
          id="name" 
          v-model="name" 
          required 
          class="w-full p-2 border rounded"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label for="comment" class="block font-medium">Comment:</label>
        <textarea 
          id="comment" 
          v-model="comment" 
          required 
          class="w-full p-2 border rounded"
          placeholder="Leave a message..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>

      <div v-if="submissionStatus" class="text-sm mt-2 text-green-600">
        {{ submissionStatus }}
      </div>
    </form>

    <!-- Comments Display -->
    <div v-if="comments.length > 0" class="mt-6">
      <h3 class="text-lg font-bold mb-2">Comments:</h3>
      <ul class="space-y-2">
        <li v-for="comment in comments" :key="comment.id" class="p-2 border-b">
          <strong>{{ comment.name }}</strong>: {{ comment.text }} ({{ formatTimestamp(comment.created_at) }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';

const name = ref('');
const comment = ref('');
const submissionStatus = ref(null);
const comments = ref([]);  // Store comments here
const tableName = 'comments';

// Fetch comments on component mount
onMounted(async () => {
  await fetchComments();
});

async function fetchComments() {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
  } else {
    comments.value = data;
  }
}

async function submitComment() {
  if (!name.value.trim() || !comment.value.trim()) {
    submissionStatus.value = "Please enter both name and comment.";
    return;
  }

  submissionStatus.value = "Submitting...";
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert([{ name: name.value, text: comment.value }])
      .select();  // Get back the inserted row

    if (error) {
      console.error("Supabase error:", error);
      submissionStatus.value = "Error submitting comment. Please try again.";
    } else {
      submissionStatus.value = "Comment submitted successfully!";
      comments.value.unshift(data[0]); // Add new comment to the top
      name.value = ''; 
      comment.value = ''; 
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    submissionStatus.value = "Unexpected error. Please try again.";
  }
}

// Format timestamp for readability
function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}
</script>

<style scoped>
.comment-section {
  max-width: 500px;
  font-size: medium;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
