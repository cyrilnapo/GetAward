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
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      axios
        .post('/api/login', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          console.log('Login successful')
          this.$router.push('/profile')
        })
        .catch((error) => {
          console.error('Login failed:', error)
        })
    }
  }
}
</script>
