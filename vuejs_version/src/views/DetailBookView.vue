<template>
  <div v-if="isLoggedIn">
    <div v-if="!loading && !error">
      <h2>{{ book.title }}</h2>
      <p>Auteur: {{ author.firstname }} {{ author.lastname }}</p>
      <p>Catégorie: {{ category.name }}</p>
      <p>Année de publication: {{ book.editionYear }}</p>
      <p>Pages: {{ book.numberOfPages }}</p>
      <p>Abstract: {{ book.abstract }}</p>
      <p>Note moyenne: {{ averageRating }}</p>
      <p>Ce livre a été ajouté par : {{ user.username }}</p>

      <a v-if="$route.name === 'deletePage'" :href="'/delete/' + book.id" class="delete-link"
        >Supprimer</a
      >
    </div>
    <div v-else-if="loading">Chargement en cours...</div>
    <div v-else>Erreur: {{ error }}</div>
    <CommentSection />
  </div>
  <div v-else>
    <div v-if="!loading && !error">
      <h2>{{ book.title }}</h2>
      <p>Année de publication: {{ book.editionYear }}</p>
      <p>Pages: {{ book.numberOfPages }}</p>
      <p>Abstract: {{ book.abstract }}</p>
    </div>
    <div v-else-if="loading">Chargement en cours...</div>
    <div v-else>Erreur: {{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BookService from '../services/BookService.js'
import UserService from '../services/UserService.js'
import CommentSection from '@/components/CommentSection.vue'

const book = ref({})
const category = ref({})
const author = ref({})
const loading = ref(true)
const error = ref(null)

const route = useRoute()

const loggedInUser = ref(JSON.parse(localStorage.getItem('user')))

const isLoggedIn = computed(() => {
  return loggedInUser.value !== null && loggedInUser.value !== undefined
})

const fetchBook = () => {
  BookService.getBook(route.params.id)
    .then((response) => {
      book.value = response.data.data
      loading.value = false
      if (isLoggedIn.value == true) {
        fetchCategory(response.data.data.categoryId)
        fetchAuthor(response.data.data.authorId)
        fetchUser(response.data.data.userId)
      }

      // Supprimez fetchRatings car il semble que vous n'utilisez pas les notes dans ce composant
    })
    .catch((error) => {
      loading.value = false
      error.value = 'Erreur lors de la récupération des informations du livre.'
    })
}

const fetchCategory = (categoryId) => {
  BookService.getCategory(categoryId)
    .then((response) => {
      category.value = response.data
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération de la catégorie:', error)
    })
}

const fetchAuthor = (authorId) => {
  BookService.getAuthor(authorId)
    .then((response) => {
      author.value = response.data.data
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'auteur :", error)
    })
}

const user = ref({})

const fetchUser = (userId) => {
  UserService.getUserById(userId)
    .then((response) => {
      user.value = response.data // Assurez-vous que response.data est l'objet utilisateur
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error)
    })
}

const averageRating = computed(() => {
  // Calculer la note moyenne si nécessaire
  return 'Non implémenté' // Remplacez cette valeur par votre calcul de note moyenne
})

onMounted(fetchBook)
</script>

<style scoped>
img {
  max-width: 35px;
}
</style>
