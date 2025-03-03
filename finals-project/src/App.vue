<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])

async function getInstruments() {
  const { data } = await supabase.from('instruments').select()
  instruments.value = data
}

onMounted(() => {
  getInstruments()
})
</script>


<template>
  <ul>
    <li v-for="components" :key="Comment.id">{{ Comment.name }}</li>
  </ul>

  <comment-form/>
  <comment/>
   

</template>