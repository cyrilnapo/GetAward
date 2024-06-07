<template>
  <div>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <router-link :to="'/tasks/' + task.id">{{ task.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tasks: []
    }
  },
  created() {
    axios
      .get('/api/tasks')
      .then((response) => {
        this.tasks = response.data
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error)
      })
  }
}
</script>
