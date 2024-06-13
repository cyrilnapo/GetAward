const taskModel = require('../models/taskModel');

exports.createTask = (req, res) => {
  const taskData = req.body;
  taskModel.createTask(taskData, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Task created successfully');
  });
};

exports.enrollUserToTask = (req, res) => {
  const { taskId } = req.params;
  const userTaskData = { user_id: req.body.userId, task_id: taskId, status: 'enrolled' };
  taskModel.enrollUserToTask(userTaskData, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('User enrolled to task successfully');
  });
};

exports.completeTask = (req, res) => {
  const { taskId } = req.params;
  const { userId, completionDate, pointsEarned } = req.body;
  taskModel.completeTask(userId, taskId, completionDate, pointsEarned, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Task marked as completed');
  });
};

exports.getAllTasksWithCreators = (req, res) => {
  taskModel.getAllTasksWithCreators((err, tasks) => {
    if (err) return res.status(500).send(err);
    res.send(tasks);
  });
};

exports.getUsersByTask = (req, res) => {
  const { taskId } = req.params;
  taskModel.getUsersByTask(taskId, (err, users) => {
    if (err) return res.status(500).send(err);
    res.send(users);
  });
};

exports.getCompletedTasksByUser = (req, res) => {
  const { userId } = req.params;
  taskModel.getCompletedTasksByUser(userId, (err, tasks) => {
    if (err) return res.status(500).send(err);
    res.send(tasks);
  });
};
