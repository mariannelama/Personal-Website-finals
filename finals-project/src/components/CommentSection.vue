<template>
  <div class="comment-section">
    <h2>Leave a Comment</h2>
    <input
      type="text"
      v-model="name"
      placeholder="Your Name"
      class="input-field"
    />
    <textarea
      v-model="message"
      placeholder="Your Message"
      class="textarea"
    ></textarea>
    <button @click="submitComment" class="submit-button">Submit</button>

    <div v-if="comments.length">
      <h3>Comments</h3>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.name }}</strong>: {{ comment.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase credentials
const supabase = createClient(
  "https://ndiynsjjhrpcvokrkhdx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kaXluc2pqaHJwY3Zva3JraGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MTE5MjksImV4cCI6MjA1NjI4NzkyOX0.uBsCl7VxE8gz1f_monCym0oI7J98r5V76UqxbnDCfgg"
);

export default {
  data() {
    return {
      name: "",
      message: "",
      comments: [],
    };
  },
  methods: {
    async submitComment() {
      if (!this.name || !this.message) {
        alert("Please fill in all fields");
        return;
      }

      const { data, error } = await supabase.from("comments").insert([
        { name: this.name, message: this.message },
      ]);

      if (error) {
        console.error("Error submitting comment:", error.message);
      } else {
        this.comments.push(data[0]); // Add new comment to the list
        this.name = "";
        this.message = "";
      }
    },
    async fetchComments() {
      const { data, error } = await supabase.from("comments").select("*");

      if (!error) {
        this.comments = data;
      }
    },
  },
  mounted() {
    this.fetchComments();
  },
};
</script>

<style scoped>
.input-field,
.textarea {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
