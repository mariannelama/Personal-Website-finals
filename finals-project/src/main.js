import { ref } from "vue";
import { supabase } from "../lib/supabaseClient"; // Ensure this path is correct

(async () => {
    const { data, error } = await supabase.from("comments").select("*");
    console.log("Test query:", data, error);
  })();

const name = ref("");
const newComment = ref("");
const comments = ref([]);

const submitComment = async () => {
  if (!name.value || !newComment.value) {
    console.log("Name or comment is empty!");
    return;
  }

  console.log("Submitting:", name.value, newComment.value);

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        name: name.value,
        comment: newComment.value,
      },
    ]);

  if (error) {
    console.error("Error inserting comment:", error);
  } else {
    console.log("Comment added:", data);
    comments.value.push(data[0]); // Update local state
    name.value = "";
    newComment.value = "";
  }
};