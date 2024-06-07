<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Mot de Passe :</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="message" :class="{ 'error-message': isError }">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserService from '@/services/UserService'

const username = ref('')
const password = ref('')
const message = ref('')
const isError = ref(false)

const handleSubmit = () => {
  UserService.login(username.value, password.value)
    .then((response) => {
      window.location.reload()
      message.value = response.data.message
      isError.value = false
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.data))
      console.log('Token:', response.data.token)
    })
    .catch((error) => {
      message.value = error.response.data.message
      isError.value = true
    })
}
</script>

<style scoped>
.login {
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login h2 {
  text-align: center;
}

.login form div {
  margin-bottom: 15px;
}

.login label {
  display: block;
  margin-bottom: 5px;
}

.login input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.login button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
