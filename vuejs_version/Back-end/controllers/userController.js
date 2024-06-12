const userModel = require('../models/userModel');

exports.getUserProfile = (req, res) => {
  const { username } = req.params;
  userModel.getUserByUsername(username, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  userModel.getUserByUsername(username, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user || user.password !== password) return res.status(401).send('Invalid credentials');
    res.send('Login successful');
  });
};

exports.signupUser = (req, res) => {
  const userData = req.body;
  console.log('Received signup request with data:', userData);
  userModel.saveUser(userData, (err, result) => {
    if (err) {
      console.error('Error saving user:', err);
      return res.status(500).send(err);
    }
    res.send('User signed up successfully');
  });
};

