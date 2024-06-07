<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BookService from '../services/BookService.js'

const route = useRoute()
const comment = ref('')
const note = ref()

const AddComment = async () => {
  const bookId = route.params.id
  try {
    // Adding a comment
    if (comment.value) {
      const response = await BookService.addComment(bookId, { comment: comment.value })
      console.log(response.data.message)
      // Clear the input after adding
      comment.value = ''
    }

    // Adding a note
    if (note.value) {
      const response = await BookService.addNote(bookId, { note: note.value })
      console.log(response.data.message)
      // Clear the input after adding
      note.value = ''
    }
  } catch (error) {
    console.error('Error adding comment or note:', error)
  }
}
</script>

<template>
  <div class="main">
    <input v-model="comment" id="comment" type="text" placeholder="Ajouter un commentaire..." />
    <input v-model="note" id="note" type="text" placeholder="Note (sur 5)" />
    <button @click="AddComment">PUBLIER</button>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#comment {
  width: 300px;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
}
#note {
  width: 70px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px;
}
button {
  padding: 10px 20px;
  background-color: rgb(37, 68, 65);
  color: #fff;
  border: none;
  cursor: pointer;
  width: 150px;
}
</style>
