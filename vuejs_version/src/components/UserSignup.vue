<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import service from '../services/NoteService'


export default {
  data() {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    signup() {
      service
        .signupUser({
          username: this.username,
          password: this.password,
          email: this.email
        })
        .then((response) => {
          console.log('Signup successful')
          this.$router.push('/login')
        })
        .catch((error) => {
          console.error('Signup failed:', error)
        })
    }
  }
}
</script>
