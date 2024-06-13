const connection = require('../db/connection');

exports.createTask = (taskData, callback) => {
  const query = `INSERT INTO t_task SET ?`;
  connection.query(query, taskData, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

exports.enrollUserToTask = (userTaskData, callback) => {
  const query = `INSERT INTO t_usertask SET ?`;
  connection.query(query, userTaskData, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

exports.completeTask = (userId, taskId, completionDate, pointsEarned, callback) => {
  const query = `
    UPDATE t_usertask
    SET status = 'completed', completion_date = ?, points_earned = ?
    WHERE user_id = ? AND task_id = ?
  `;
  connection.query(query, [completionDate, pointsEarned, userId, taskId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

exports.getAllTasksWithCreators = (callback) => {
  const query = `
    SELECT t_task.id, t_task.name, t_task.theme, t_task.description, t_task.effort_level, t_task.start_date, t_task.end_date, t_user.username AS creator
    FROM t_task
    JOIN t_user ON t_task.creator_id = t_user.id
  `;
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

exports.getUsersByTask = (taskId, callback) => {
  const query = `
    SELECT t_user.username, t_user.email, t_usertask.status, t_usertask.completion_date, t_usertask.points_earned
    FROM t_usertask
    JOIN t_user ON t_usertask.user_id = t_user.id
    WHERE t_usertask.task_id = ?
  `;
  connection.query(query, [taskId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

exports.getCompletedTasksByUser = (userId, callback) => {
  const query = `
    SELECT t_task.name, t_task.description, t_usertask.completion_date, t_usertask.points_earned
    FROM t_usertask
    JOIN t_task ON t_usertask.task_id = t_task.id
    WHERE t_usertask.user_id = ? AND t_usertask.status = 'completed'
  `;
  connection.query(query, [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};
