const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json(job);
};

const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json(job);
};

const getSingleJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`no job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

const updateJob = async (req, res) => {
  const { company, position } = req.body;
  const jobId = req.params.id;
  const userId = req.user.userId;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`no job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;

  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`no job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).send('removed');
};

module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};
