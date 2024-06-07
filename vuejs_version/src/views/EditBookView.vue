<template>
  <div>
    <h1>Modifier le Livre</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Titre </label>
        <input v-model="book.title" type="text" id="title" required />
      </div>
      <div>
        <label for="author">Auteur </label>
        <select v-model="book.authorId" id="author" required>
          <option v-for="author in authors.data" :key="author.id" :value="author.id">
            {{ author.firstname }} {{ author.lastname }}
          </option>
        </select>
      </div>
      <div>
        <label for="category">Catégorie </label>
        <select v-model="book.categoryId" id="category" required>
          <option v-for="category in categories.data" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="numberOfPages">Nombre de page</label>
        <input v-model="book.numberOfPages" type="number" id="numberOfPages" required />
      </div>
      <div>
        <label for="editionYear">Année d'édition</label>
        <input v-model="book.editionYear" type="number" id="editionYear" required />
      </div>
      <div>
        <label for="pdfLink">Lien PDF </label>
        <input v-model="book.pdfLink" type="url" id="pdfLink" required />
      </div>
      <button type="submit">Sauvegarder</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import bookService from '../services/BookService'
import categoryService from '../services/CategoryService'

const book = ref({
  id: null,
  title: '',
  authorId: null,
  categoryId: null,
  numberOfPages: null,
  editionYear: null,
  pdfLink: ''
})
const authors = ref([])
const categories = ref([])
const route = useRoute()
const router = useRouter()

const fetchBookDetails = async () => {
  try {
    const response = await bookService.getBook(route.params.id)
    Object.assign(book.value, response.data.data)
  } catch (error) {
    console.error('Error fetching book details:', error)
  }
}

const fetchAuthors = async () => {
  try {
    const response = await bookService.getAuthors()
    authors.value = response.data
  } catch (error) {
    console.error('Error fetching authors:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await categoryService.getCategories()
    categories.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const submitForm = async () => {
  try {
    await bookService.editBook(route.params.id, book.value)
    router.push('/AllBooksView')
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

onMounted(() => {
  fetchBookDetails()
  fetchAuthors()
  fetchCategories()
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
}

div {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
}

input,
select {
  padding: 8px;
  font-size: 14px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #43aa8b;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #3a8c7a;
}
</style>
