import { ref } from "vue";
import { supabase } from "../lib/supabaseClient"; // Ensure this path is correct

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const timestamp = new Date().toLocaleString();
    const commentSection = document.getElementById('comments');
    const newComment = document.createElement('p');
    newComment.innerHTML = `<strong>${name}</strong> (${timestamp}): ${comment}`;
    commentSection.appendChild(newComment);
    // Optionally, clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
  });

  if (error) {
    console.error("Error inserting comment:", error);
  } else {
    console.log("Comment added:", data);
    comments.value.push(data[0]); // Update local state
    name.value = "";
    newComment.value = "";
  }