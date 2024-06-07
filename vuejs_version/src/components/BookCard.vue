<script setup>
import { ref, computed } from 'vue'

// Props définis
const props = defineProps({
  book: {
    type: Object,
    required: true,
    default: () => ({})
  },
  author: {
    type: Object,
    required: false,
    default: () => null
  },
  category: {
    type: Object,
    required: false,
    default: () => null
  },
  ratings: {
    type: Array,
    required: false,
    default: () => []
  },
  user: {
    type: Object,
    required: false,
    default: () => null
  }
})

// Calcul de la note moyenne
const averageRating = computed(() => {
  if (props.ratings.length === 0) return 0
  const total = props.ratings.reduce((acc, rating) => acc + rating, 0)
  return (total / props.ratings.length).toFixed(1)
})

// Récupération de l'utilisateur connecté depuis le localStorage
const loggedInUser = ref(JSON.parse(localStorage.getItem('user')))

// Vérification si l'utilisateur connecté peut supprimer le livre
const canDelete = computed(() => {
  return (
    loggedInUser.value &&
    (loggedInUser.value.id === props.book.userId || loggedInUser.value.isAdmin)
  )
})

const isLoggedIn = computed(() => {
  return loggedInUser.value !== null && loggedInUser.value !== undefined
})
</script>

<template>
  <div v-if="isLoggedIn">
    <div class="card" v-if="book && Object.keys(book).length > 0">
      <div v-if="$route.name === 'AllBooksView'">
        <a class="title" :href="'/DetailBookView/' + book.id">{{ book.title }}</a>
        <a class="user" :href="'/DetailUserView/' + book.userId">{{
          user ? user.username : 'Inconnu'
        }}</a>
        <p class="author" v-if="author">Auteur: {{ author.firstname }} {{ author.lastname }}</p>
        <p class="average_rating">Note moyenne: {{ averageRating }}</p>
      </div>
      <div v-else-if="$route.name === 'home'">
        <a class="title" :href="'/DetailBookView/' + book.id">{{ book.title }}</a>
        <p>Année d'appariton: {{ book.editionYear }}</p>
        <p>Editeur: {{ book.editor }}</p>
        <p>Nombre de page: {{ book.numberOfPages }}</p>
        <p class="category" v-if="category">Categorie: {{ category.name }}</p>
        <a :href="book.pdfLink" target="_blank">PDF Link</a>
      </div>

      <div v-else>
        <a class="title" :href="'/DetailBookView/' + book.id">{{ book.title }}</a>
        <a class="user" :href="'/DetailUserView/' + book.userId">{{
          user ? user.username : 'Inconnu'
        }}</a>
        <p class="category" v-if="category">Categorie: {{ category.name }}</p>
        <p class="average_rating">Note moyenne: {{ averageRating }}</p>
        <a :href="book.pdfLink" target="_blank">PDF Link</a>
        <a :href="'/edit/' + book.id" class="edit-link">Modifier</a>
        <a v-if="canDelete" :href="'/delete/' + book.id" class="delete-link">Supprimer</a>
        <a v-if="$route.name === 'deletePage'" :href="'/delete/' + book.id" class="delete-link"
          >Supprimer</a
        >
      </div>
    </div>
    <div v-else>
      <p>Loading book details...</p>
    </div>
  </div>
  <div v-else>
    <div class="card" v-if="book && Object.keys(book).length > 0">
      <div v-if="$route.name === 'AllBooksView'">
        <a class="title" :href="'/DetailBookView/' + book.id">{{ book.title }}</a>
      </div>
      <div v-else-if="$route.name === 'home'">
        <a class="title" :href="'/DetailBookView/' + book.id">{{ book.title }}</a>
        <p>Année d'appariton: {{ book.editionYear }}</p>
        <p>Editeur: {{ book.editor }}</p>
        <p>Nombre de page: {{ book.numberOfPages }}</p>
        <a :href="book.pdfLink" target="_blank">PDF Link</a>
      </div>

      <div v-else>
        <a class="title" :href="'/DetailBookView/' + book.id">{{ book.title }}</a>
        <a :href="book.pdfLink" target="_blank">PDF Link</a>
      </div>
    </div>
    <div v-else>
      <p>Loading book details...</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #254441;
  margin: auto;
  color: var(--white);
  padding: 15px;
  margin: 5px 0;
  display: inline-block;
  width: 250px;
}

.cards .card p {
  margin: 1px 0;
}

.card a {
  display: block;
  color: #43aa8b;
  margin-top: 10px;
  font-size: 14px;
}
</style>
