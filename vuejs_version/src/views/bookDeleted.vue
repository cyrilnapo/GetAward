<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BookService from '../services/BookService.js'
const router = useRouter()
const route = useRoute()

onMounted(() => {
  deleteBook()
})

async function deleteBook() {
  await BookService.deleteBook(route.params.id)
    .then((response) => {
      response.data.data
    })
    .catch((error) => console.log(error))
  router.push('/')
}
</script>
<template><div></div></template>
