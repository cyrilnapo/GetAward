<template>
  <div>
    <p>Nom d'utilisateur : {{ user.username }}</p>
    <p>Nombre de commentaires : {{ commentCount }}</p>
    <p>Nombre de livre : {{ bookCount }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import UserService from '../services/UserService.js'

const user = ref({})
const commentCount = ref(0)
const bookCount = ref(0)
const route = useRoute()

const fetchUser = () => {
  const userId = route.params.id

  UserService.getUserById(userId)
    .then((response) => {
      user.value = response.data
      fetchCommentCount(userId)
      fetchBookCount(userId)
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'utilisateur :", error)
    })
}

const fetchCommentCount = (userId) => {
  UserService.getCommentCount(userId)
    .then((response) => {
      commentCount.value = response.data.commentCount
      console.log(response.data.commentCount)
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération du nombre de commentaires :', error)
    })
}

const fetchBookCount = (userId) => {
  UserService.getBookCount(userId)
    .then((response) => {
      bookCount.value = response.data.bookCount
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération du nombre de livre ajouté :', error)
    })
}

onMounted(fetchUser)
</script>
