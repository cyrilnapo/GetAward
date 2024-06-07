<script setup>
import { ref, onMounted } from 'vue'
import BookService from '../services/BookService.js'
import categoryService from '../services/CategoryService'

const imagePath = ref('')
const title = ref('')
const numberOfPages = ref('')
const editor = ref('')
const editionYear = ref('')
const categoryId = ref('')
const authorId = ref('')
const isAuthenticated = ref(false)
const userId = ref(null)
const authors = ref([])
const categories = ref([])

const checkAuthentication = () => {
  const token = localStorage.getItem('token')
  if (token) {
    const user = JSON.parse(localStorage.getItem('user'))
    userId.value = user.id
    isAuthenticated.value = true
  }
}

const fetchAuthors = async () => {
  try {
    const response = await BookService.getAuthors()
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
onMounted(() => {
  checkAuthentication()
  fetchAuthors()
  fetchCategories()
})

const handleSubmit = async (event) => {
  event.preventDefault()

  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('numberOfPages', numberOfPages.value)
  formData.append('pdfLink', 'pdfLink') // Assurez-vous de remplacer cela par une URL valide ou gérer cela côté backend
  formData.append('abstract', 'abstract') // Idem pour l'abstract
  formData.append('editor', editor.value)
  formData.append('editionYear', editionYear.value)
  formData.append('categoryId', categoryId.value)
  formData.append('imagePath', imagePath.value)
  formData.append('authorId', authorId.value)
  formData.append('userId', userId.value)

  try {
    const response = await BookService.createBook(formData)
    console.log('Livre ajouté avec succès:', response.data)
    window.location.href = '../UserBook'
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre:", error)
  }
}
</script>

<template>
  <div class="add">
    <form @submit="handleSubmit">
      <p>Image</p>
      <input type="text" v-model="imagePath" />
      <p>Titre</p>
      <input type="text" v-model="title" />
      <p>Nombre de pages</p>
      <input type="text" v-model="numberOfPages" />
      <p>Editeur</p>
      <input type="text" v-model="editor" />
      <p>Année d'édition</p>
      <input type="text" v-model="editionYear" />
      <div>
        <label for="author">Auteur </label>
        <select v-model="authorId" id="author" required>
          <option v-for="author in authors.data" :key="author.id" :value="author.id">
            {{ author.firstname }} {{ author.lastname }}
          </option>
        </select>
      </div>
      <div>
        <label for="category">Catégorie </label>
        <select v-model="categoryId" id="category" required>
          <option v-for="category in categories.data" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <button type="submit">Ajouter</button>
    </form>
  </div>
  <footer>Ce site a été créé par M.Velickovic, A.Zeqiri, C.Napoleone, Y.Cardis</footer>
</template>

<style scoped>
:root {
  --blue: #254441;
  --green: #43aa8b;
  --white: #eeeeee;
}

.add {
  width: 100%;
}

.add form {
  display: block;
  margin: auto;
}

.add form input {
  border: 0;
  background-color: var(--blue);
  color: var(--white);
  padding: 5px 10px 5px 10px;
}
</style>
