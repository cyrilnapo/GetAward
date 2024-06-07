<template>
  <div>
    <h2>Task Detail</h2>
    <div v-if="task">
      <p>Name: {{ task.name }}</p>
      <p>Theme: {{ task.theme }}</p>
      <p>Description: {{ task.description }}</p>
      <p>Effort Level: {{ task.effort_level }}</p>
      <p>Start Date: {{ task.start_date }}</p>
      <p>End Date: {{ task.end_date }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      task: null
    }
  },
  created() {
    axios
      .get('/api/tasks/' + this.$route.params.taskId)
      .then((response) => {
        this.task = response.data
      })
      .catch((error) => {
        console.error('Error fetching task data:', error)
      })
  }
}
</script>
