<template>
  <ul>
    <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.name }}</li>
  </ul>

  <personal-profile/><br>
  <comment-form @commentAdded="refreshComments"/>
  <comment ref="commentComponent"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import Comment from './components/comment.vue'
import CommentForm from './components/commentform.vue'

const instruments = ref([])
const commentComponent = ref(null)

async function getInstruments() {
  const { data } = await supabase.from('instruments').select()
  instruments.value = data
}

onMounted(() => {
  getInstruments()
})

function refreshComments() {
  commentComponent.value.getComments() // Refresh comments when new comment is added
}
</script>