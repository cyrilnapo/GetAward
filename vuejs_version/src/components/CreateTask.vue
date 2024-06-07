<template>
  <div>
    <h2>Create Task</h2>
    <form @submit.prevent="createTask">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="theme">Theme:</label>
        <input type="text" v-model="theme" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="description" required></textarea>
      </div>
      <div>
        <label for="effort_level">Effort Level:</label>
        <input type="number" v-model="effort_level" required />
      </div>
      <div>
        <label for="start_date">Start Date:</label>
        <input type="date" v-model="start_date" required />
      </div>
      <div>
        <label for="end_date">End Date:</label>
        <input type="date" v-model="end_date" required />
      </div>
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      theme: '',
      description: '',
      effort_level: '',
      start_date: '',
      end_date: ''
    }
  },
  methods: {
    createTask() {
      axios
        .post('/api/tasks', {
          name: this.name,
          theme: this.theme,
          description: this.description,
          effort_level: this.effort_level,
          start_date: this.start_date,
          end_date: this.end_date
        })
        .then((response) => {
          console.log('Task created successfully')
          this.$router.push('/tasks')
        })
        .catch((error) => {
          console.error('Error creating task:', error)
        })
    }
  }
}
</script>
