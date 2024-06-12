import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getNotes() {
    return apiClient.get('/api/notes')
  },
  getNote(id) {
    return apiClient.get('/api/notes/' + id)
  },
  createNote(newNote) {
    return apiClient.post('/api/notes/', newNote)
  },
  editNote(id, newNote) {
    return apiClient.put('/api/notes/' + id, newNote)
  },
  deleteNote(id) {
    return apiClient.delete('/api/notes/' + id)
  },
  signupUser(info){
    return apiClient.post('/api/signup', info)
  },
  login(username, password) {
    return apiClient.post('/api/login/', { username, password })
  }
}
