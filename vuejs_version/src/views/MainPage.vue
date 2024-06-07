<script setup>
import HomeCards from './HomeCards.vue'
import HomeText from './HomeText.vue'
import Login from '@/components/Login.vue'
</script>

<template>
  <div class="main">
    <Login></Login>
    <HomeCards></HomeCards>
    <HomeText></HomeText>
  </div>
  <footer>Ce site a été créé par M.Velickovic, A.Zeqiri, C.Napoleone, Y.Cardis</footer>
</template>

<style>
.main {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
}
</style>
