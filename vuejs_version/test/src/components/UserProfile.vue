<template>
  <div>
    <h2>User Profile</h2>
    <div v-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    axios
      .get('/api/users/' + this.$route.params.username)
      .then((response) => {
        this.user = response.data
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
  }
}
</script>
