<template>
  <div>
    <h1>Task Manager</h1>
    <router-link to="/create-task">Create Task</router-link>
    <TaskList />
  </div>
</template>

<script>
import TaskList from '../components/TaskList.vue'

export default {
  components: {
    TaskList
  }
}
</script>
