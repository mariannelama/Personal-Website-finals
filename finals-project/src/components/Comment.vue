<template>
  <h1>Comments</h1>
  <ul>
    <li v-for="comment in comments" :key="comment.id">
      <strong>{{ comment.name }}</strong>: {{ comment.comment }} ({{ new Date(comment.created_at).toLocaleString() }})
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';

const comments = ref([]);

async function getComments() {
  const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
  } else {
    comments.value = data;
  }
}

// Fetch comments when component is mounted
onMounted(() => {
  getComments();
});

// Listen for real-time updates
supabase
  .channel('comments')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, (payload) => {
    comments.value.unshift(payload.new);
  })
  .subscribe();
</script>