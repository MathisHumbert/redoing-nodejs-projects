const Task = require('../models/Tasks');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const tasks = await Task.create(req.body);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const tasks = await Task.findOne({ _id: req.params.id });
    if (!tasks) {
      return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const tasks = await Task.findOneAndDelete({ _id: req.params.id });
    if (!tasks) {
      return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const tasks = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!tasks) {
      return res.status(404).json({ msg: `No task with id: ${req.params.id}` });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
