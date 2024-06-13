const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

// User routes
router.get('/users/:username', userController.getUserProfile);
router.post('/login', userController.loginUser);
router.post('/signup', userController.signupUser);

// Task routes
router.post('/tasks', taskController.createTask);
router.post('/tasks/:taskId/enroll', taskController.enrollUserToTask);
router.put('/tasks/:taskId/complete', taskController.completeTask);
router.get('/tasks', taskController.getAllTasksWithCreators);
router.get('/tasks/:taskId/users', taskController.getUsersByTask);
router.get('/users/:userId/completed-tasks', taskController.getCompletedTasksByUser);

module.exports = router;
