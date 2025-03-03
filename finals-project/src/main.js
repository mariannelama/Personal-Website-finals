import { createApp } from 'vue'
import App from './App.vue'

import CommentSection from './components/CommentSection.vue'

import './assets/style.css';

const app = createApp(App)

app.component('comment-section', CommentSection)

app.mount('#app')