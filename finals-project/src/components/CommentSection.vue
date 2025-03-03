<template>
  <div>
    <h2>Leave a Comment</h2>
    <form @submit.prevent="submitComment">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="comment">Comment:</label>
        <textarea id="comment" v-model="comment" required></textarea>
      </div>
      <button type="submit">Submit</button>
      <div v-if="submissionStatus">{{ submissionStatus }}</div>
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
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

const name = ref("");
const comment = ref("");
const comments = ref([]);
const submissionStatus = ref("");

async function fetchComments() {
  const { data, error } = await supabase.from("comments").select("*").order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching comments:", error);
  } else {
    comments.value = data;
  }
}

async function submitComment() {
    if (!name || !newComment) return;
    
    const { data, error } = await supabase
        .from('comments') // Your table name
        .insert([{ name, comment: newComment, created_at: new Date() }]);

    if (error) {
        console.error('Error submitting comment:', error.message);
    } else {
        console.log('Comment added:', data);
        comments.push({ name, comment: newComment, timestamp: new Date() });
    }
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

onMounted(fetchComments);
</script>