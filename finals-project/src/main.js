import { createApp } from 'vue'
import App from './App.vue'
import './css/style.css' // Ensure your styles are applied
import CommentSection from './components/CommentSection.vue'

// Create and mount the Vue app
const app = createApp(App)

// Register components globally (optional, but not needed if using local registration in App.vue)
app.component('CommentSection', CommentSection)

app.mount('#app')