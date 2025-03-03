import { createApp } from 'vue'
import App from './App.vue'

import CommentSection from './components/CommentSection.vue'

import './assets/style.css';

const app = createApp(App)
const supabase = createClient(
    "https://your-supabase-url.supabase.co",
    "your-anon-key"
  );
  

app.component('comment-section', CommentSection)

app.mount('#app')