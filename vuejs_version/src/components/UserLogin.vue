<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import service from '../services/NoteService'

export default {
  setup() {
    const username = ref('')
    const password = ref('')

    const login = () => {
      service.login(username.value, password.value)
        .then((response) => {
          console.log('reussi')
        })
        .catch((error) => {
          console.log('erreur')
        })
    }

    return {
      username,
      password,
      login
    }
  }
}
</script>
