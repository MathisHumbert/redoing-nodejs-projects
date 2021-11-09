const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

// get all
router.get('/', getAllTasks);

// post
router.post('/', createTask);

// get single data
router.get('/:id', getSingleTask);

// update single task
router.patch('/:id', updateTask);

// delete single task
router.delete('/:id', deleteTask);

module.exports = router;
