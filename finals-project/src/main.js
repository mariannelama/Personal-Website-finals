import { createApp } from 'vue'
import App from './App.vue'
import './css/style.css' // Ensure your styles are applied
import CommentForm from './components/CommentForm.vue'
import Comment from './components/Comment.vue'

// Create and mount the Vue app
const app = createApp(App)
// Register components globally (optional, but not needed if using local registration in App.vue)
app.component('CommentForm', CommentForm)
app.component('Comment', Comment)
app.mount('#app')