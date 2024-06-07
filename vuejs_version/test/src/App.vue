<template>
  <div id="app">
    <header>
      <h1>GetAward</h1>
      <nav>
        <router-link to="/">Home</router-link> | <router-link to="/tasks">Tasks</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Sign Up</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
header {
  background-color: #f0f0f0;
  padding: 20px;
}
nav {
  margin-top: 10px;
}
nav a {
  margin-right: 10px;
}
</style>
