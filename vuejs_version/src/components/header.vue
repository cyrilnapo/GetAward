<template>
  <div class="login-component">
    <h2>{{ title }}</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script></script>

<style scoped>
.login-component {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-component h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login-component form {
  display: flex;
  flex-direction: column;
}

.login-component form div {
  margin-bottom: 10px;
}

.login-component form label {
  font-weight: bold;
}

.login-component form input {
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

.login-component form button {
  padding: 8px 15px;
  background-color: #43aa8b;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.login-component form button:hover {
  background-color: #43aa8b;
}
</style>
