import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDczNzc2NjksImV4cCI6MTczODkzNTI2OX0.TFfSqdT9M2QqJxqgLROuXFIbTfBtYV8B2Vl4Gmeb7EI'
  }
})

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
  }
}
