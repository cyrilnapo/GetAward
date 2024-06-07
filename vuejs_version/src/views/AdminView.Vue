<template>
  <main>
    <h2>Liste de livres</h2>
    <input
      v-model="searchTerm"
      @input="handleSearch"
      type="text"
      placeholder="Rechercher un livre..."
    />
    <select v-model="selectedCategory">
      <option value="">Toutes les catégories</option>
      <option v-for="(category, categoryId) in categories" :key="categoryId" :value="categoryId">
        {{ category.name }}
      </option>
    </select>
    <div class="card">
      <BookCard
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        :author="authors[book.authorId]"
        :category="categories[book.categoryId]"
        :ratings="book.ratings"
        :user="users[book.userId]"
      />
    </div>
  </main>
  <footer>Ce site a été créé par M.Velickovic, A.Zeqiri, C.Napoleone, Y.Cardis</footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BookService from '../services/BookService.js'
import BookCard from '../components/BookCard.vue'
import UserService from '@/services/UserService.js'

const books = ref([])
const categories = ref({})
const authors = ref({})
const ratings = ref({})
const loading = ref(true)
const error = ref(null)
const searchTerm = ref('')
const selectedCategory = ref('')
const isAdmin = ref(false)

const checkAuthentication = () => {
  const token = localStorage.getItem('token')
  if (token) {
    const user = JSON.parse(localStorage.getItem('user'))
    isAdmin.value = user.isAdmin
  }
}

const fetchBooks = () => {
  BookService.getBooks()
    .then((response) => {
      books.value = response.data.data
      loading.value = false
      fetchCategories(response.data.data)
      fetchAuthors(response.data.data)
      fetchRatings(response.data.data)
      fetchUsers(response.data.data)
    })
    .catch((error) => {
      loading.value = false
      error.value = 'Erreur lors de la récupération des livres.'
    })
}

const fetchCategories = (booksData) => {
  const categoryIds = [...new Set(booksData.map((book) => book.categoryId))]
  categoryIds.forEach((categoryId) => {
    BookService.getCategory(categoryId)
      .then((response) => {
        categories.value[categoryId] = response.data
        console.log('Category loaded:', categoryId, response.data)

      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories:', error)
      })
  })
}

const fetchAuthors = (booksData) => {
  const authorIds = [...new Set(booksData.map((book) => book.authorId))]
  authorIds.forEach((authorId) => {
    BookService.getAuthor(authorId)
      .then((response) => {
        authors.value[authorId] = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des auteurs :', error)
      })
  })
}

const users = ref({})

const fetchUsers = (booksData) => {
  const userIds = [...new Set(booksData.map((book) => book.userId))]
  userIds.forEach((userId) => {
    UserService.getUserById(userId)
      .then((response) => {
        users.value[userId] = response.data // Assurez-vous que response.data est l'objet utilisateur
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error)
      })
  })
}

const fetchRatings = (booksData) => {
  const bookIds = booksData.map((book) => book.id)
  bookIds.forEach((bookId) => {
    BookService.getBookRatings(bookId)
      .then((response) => {
        const ratingsData = response.data.data
        const ratings = ratingsData.map((rating) => rating.note)
        const bookIndex = books.value.findIndex((book) => book.id === bookId)

        if (bookIndex !== -1) {
          books.value[bookIndex].ratings = ratings
        }

        console.log(`Book ID: ${bookId}`, ratingsData)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des notes :', error)
      })
  })
}

onMounted(fetchBooks
checkAuthentication()

)

const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesCategory = selectedCategory.value
      ? book.categoryId === parseInt(selectedCategory.value)
      : true
    return matchesSearch && matchesCategory
  })
})

const handleSearch = () => {}
</script>

<style scoped>
.card {
  margin: 10px;
}

footer {
  padding: 10%;
  text-align: center;
}
</style>
